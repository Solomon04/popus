<?php

namespace App\Http\Controllers;

use App\Enums\FundraiserStatus;
use App\Models\Activity;
use App\Models\Fundraiser;
use App\Models\Store;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Stripe\StripeClient;

class FundraiserController extends Controller
{
    public function __construct(protected StripeClient $stripeClient)
    {
    }

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

        $stripeExpressId = $this->stripeClient->accounts->create([
            'country' => 'US',
            'type' => 'express',
            'capabilities' => [
                'card_payments' => ['requested' => true],
                'transfers' => ['requested' => true],
            ],
        ])->id;

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
            'stripe_express_id' => $stripeExpressId,
        ]);

        return redirect()->route('show.fundraiser', ['fundraiser' => $fundraiser]);
    }

    public function show(Fundraiser $fundraiser)
    {
        $fundraiser->load(['stores' => ['orders', 'user'], 'organizer']);

        $leaderboard = $fundraiser->stores->sortByDesc(function (Store $store) {
            return $store->orders()->sum('total');
        })->values();
        $payoutDisabledReason = null;

        if ($fundraiser->stripe_express_id) {
            $stripeExpressAccount = $this->stripeClient->accounts->retrieve($fundraiser->stripe_express_id);
            if (! $stripeExpressAccount->payouts_enabled) {
                $payoutDisabledReason = 'We need you to verify more information in order to receives payouts via Stripe.';
            }
        }

        return Inertia::render('Organizer/FundraiserDetail', [
            'fundraiser' => $fundraiser,
            'stats' => [
                'revenue' => $fundraiser->revenue,
                'earnings' => $fundraiser->earnings,
                'total_orders' => $fundraiser->total_orders,
            ],
            'leaderboard' => $leaderboard,
            'activities' => Activity::all(),
            'active' => $fundraiser->status === FundraiserStatus::IN_PROGRESS,
            'past' => $fundraiser->status === FundraiserStatus::ENDED,
            'shared_url' => URL::signedRoute('join.fundraiser', ['fundraiser' => $fundraiser]),
            'payouts_disabled_reason' => $payoutDisabledReason,
        ]);
    }

    public function update(Fundraiser $fundraiser, Request $request)
    {
        $this->validate($request, [
            'organization_name' => ['string', 'max:255'],
            'activity_id' => ['exists:activities,id'],
            'start_date' => ['date'],
            'postal_code' => ['required'],
            'participant_count' => ['numeric'],
            'goal_amount' => ['numeric'],
        ]);

        if ($fundraiser->status === FundraiserStatus::ENDED) {
            return redirect()->route('show.fundraiser', ['fundraiser' => $fundraiser]);
        }

        if ($request->has('organization_name')) {
            $fundraiser->update(['name' => $request->input('organization_name')]);
        }

        if ($request->has('activity_id')) {
            $fundraiser->update(['activity_id' => $request->input('activity_id')]);
        }

        if ($request->has('postal_code')) {
            $fundraiser->update(['postal_code' => $request->input('postal_code')]);
        }

        if ($request->has('postal_code')) {
            $fundraiser->update(['postal_code' => $request->input('postal_code')]);
        }

        if ($request->has('participant_count') && ! $fundraiser->is_active) {
            $fundraiser->update(['participant_count' => $request->input('participant_count')]);
        }

        if ($request->has('start_date') && ! $fundraiser->is_active) {
            $startDate = Carbon::parse($request->input('start_date'));
            $fundraiser->update([
                'start_date' => $startDate->toDateString(),
                'end_date' => $startDate->addWeek()->toDateString(),
            ]);
        }

        if ($request->has('goal_amount') && ! $fundraiser->is_active) {
            $fundraiser->update(['participant_count' => $request->input('participant_count')]);
        }

        return back()->with('success', 'Your fundraiser has been updated.');
    }

    public function destroy(Fundraiser $fundraiser)
    {
        if ($fundraiser->status === FundraiserStatus::IN_PROGRESS) {
            $fundraiser->update([
                'end_date' => now(),
            ]);

            return redirect()->route('fundraisers');
        }

        $fundraiser->delete();

        return redirect()->route('fundraisers');
    }
}
