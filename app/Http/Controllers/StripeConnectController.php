<?php

namespace App\Http\Controllers;

use App\Models\Fundraiser;
use Illuminate\Redis\RedisManager;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Stripe\StripeClient;

class StripeConnectController extends Controller
{
    public function __construct(
        protected RedisManager $redisManager,
        protected StripeClient $stripeClient
    ) {
    }

    public function show(Fundraiser $fundraiser)
    {
        $user = $this->getCurrentUser();

        if ($fundraiser->organizer()->isNot($user)) {
            return redirect()->route('home');
        }

        if (! $fundraiser->stripe_express_id) {
            $stripeExpressId = $this->stripeClient->accounts->create([
                'country' => 'US',
                'type' => 'express',
            ])->id;

            $fundraiser->update(['stripe_express_id' => $stripeExpressId]);
        }

        if (! $fundraiser->stripe_express_connected) {
            $token = Str::random(20);
            $this->redisManager->client()->set($token, $fundraiser->stripe_express_id);

            $accountLink = $this->stripeClient->accountLinks->create([
                'account' => $fundraiser->stripe_express_id,
                'refresh_url' => route('connect.bank', ['fundraiser' => $fundraiser]),
                'return_url' => route('save.bank', ['token' => $token]),
                'type' => 'account_onboarding',
            ]);

            return Inertia::location($accountLink->url);
        }

        $loginLink = $this->stripeClient->accounts->createLoginLink($fundraiser->stripe_express_id);

        return Inertia::location($loginLink->url);
    }

    /**
     * Save a stripe connect account
     *
     * @param $token
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store($token)
    {
        $stripeExpressId = $this->redisManager->client()->get($token);

        if (! $stripeExpressId) {
            abort(404);
        }

        $fundraiser = Fundraiser::where('stripe_express_id', '=', $stripeExpressId)->firstOrFail();

        $fundraiser->update([
            'stripe_express_connected' => true,
        ]);

        return redirect()->route('show.fundraiser', ['fundraiser' => $fundraiser]);
    }
}
