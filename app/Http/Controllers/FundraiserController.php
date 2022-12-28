<?php

namespace App\Http\Controllers;

use App\Models\Activity;
use App\Models\Fundraiser;
use App\Models\Store;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class FundraiserController extends Controller
{
    public function index()
    {
        $user = $this->getCurrentUser();
        $fundraisers = Fundraiser::withCount(['stores'])->where('organizer_id', '=', $user->id)->get();
        $fundraisers->append(['total_orders', 'earnings', 'revenue']);

        return Inertia::render('Organizer/FundraiserDashboard', [
            'fundraisers' => $fundraisers,
            'can_create_fundraiser' => $user->fundraisers()->scopes(['future'])->doesntExist() || $user->fundraisers()->scopes(['active'])->doesntExist(),
        ]);
    }

    public function create()
    {
        $user = $this->getCurrentUser();

        if ($user) {
            if ($user->fundraisers()->scopes(['future'])->exists() || $user->fundraisers()->scopes(['active'])->exists()) {
                return redirect()->route('fundraisers');
            }
        }

        return Inertia::render('GetStarted', [
            'activities' => Activity::all(),
        ]);
    }

    public function store(Request $request)
    {
        $user = $this->getCurrentUser();
        $this->validate($request, [
            'organization_name' => ['required', 'string', 'max:255'],
            'activity_id' => ['required', 'exists:activities,id'],
            'start_date' => ['required', 'date'],
            'postal_code' => ['required'],
            'participant_count' => ['required', 'numeric'],
            'goal_amount' => ['required', 'numeric'],
        ]);

        $startDate = Carbon::parse($request->input('start_date'));

        $fundraiser = Fundraiser::create([
            'organizer_id' => $user->id,
            'name' => $request->input('organization_name'),
            'activity_id' => $request->input('activity_id'),
            'start_date' => $startDate->toDateString(),
            'end_date' => $startDate->addWeek()->toDateString(),
            'goal_amount' => (int) $request->input('goal_amount'),
            'participant_count' => $request->input('participant_count'),
            'postal_code' => $request->input('postal_code'),
            'code' => Str::random(6),
        ]);

        return redirect()->route('show.fundraiser', ['fundraiser' => $fundraiser]);
    }

    public function show(Fundraiser $fundraiser)
    {
        $fundraiser->load(['stores' => ['orders', 'user'], 'organizer']);

        $leaderboard = $fundraiser->stores->sortByDesc(function (Store $store) {
            return $store->orders()->sum('total');
        })->values();

        return Inertia::render('Organizer/FundraiserDetail', [
            'fundraiser' => $fundraiser,
            'stats' => [
                'revenue' => $fundraiser->revenue,
                'earnings' => $fundraiser->earnings,
                'total_orders' => $fundraiser->total_orders,
            ],
            'leaderboard' => $leaderboard,
        ]);
    }
}
