<?php

namespace App\Console\Commands;

use App\Helpers\Money;
use App\Models\Fundraiser;
use App\Notifications\PayoutInitiatedNotification;
use App\Notifications\SetupPayoutMethodNotification;
use Illuminate\Console\Command;
use Illuminate\Redis\RedisManager;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use Stripe\StripeClient;

class SendPayoutsCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:send-payouts';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Automatically send out payments for fundraisers that have ended.';

    public function __construct(protected StripeClient $stripeClient, protected RedisManager $redisManager)
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $fundraisers = Fundraiser::where('paid_out', '=', false)
            ->where('end_date', '<', now()->toDateTimeString())
            ->whereHas('stores.orders')
            ->get();

        $fundraisers->each(function (Fundraiser $fundraiser) {
            if (! $fundraiser->stripe_express_id) {
                $stripeExpressAccount = $this->stripeClient->accounts->create([
                    'country' => 'US',
                    'type' => 'express',
                ]);

                $fundraiser->update(['stripe_express_id' => $stripeExpressAccount->id]);
                Log::info("Created a Stripe Express account for {$fundraiser->name}.", [
                    'account' => $stripeExpressAccount,
                    'fundraiser' => $fundraiser,
                ]);
            }

            $stripeExpressAccount = $this->stripeClient->accounts->retrieve($fundraiser->stripe_express_id);

            if (! $stripeExpressAccount->payouts_enabled || ! $fundraiser->stripe_express_connected) {
                $token = Str::random(20);
                $this->redisManager->client()->set($token, $fundraiser->stripe_express_id);
                $accountLink = $this->stripeClient->accountLinks->create([
                    'account' => $fundraiser->stripe_express_id,
                    'refresh_url' => route('connect.bank', ['fundraiser' => $fundraiser]),
                    'return_url' => route('save.bank', ['token' => $token]),
                    'type' => 'account_onboarding',
                ]);

                Log::info("Stripe express not found, payout was skipped. We sent a Stripe Express Account Link for {$fundraiser->name}.", [
                    'account_link' => $accountLink,
                    'fundraiser' => $fundraiser,
                ]);
                $fundraiser->organizer->notify(new SetupPayoutMethodNotification($fundraiser, $accountLink));

                return;
            }

            $totalEarnings = Money::dollarsToCents($fundraiser->earnings);

            $transfer = $this->stripeClient->transfers->create([
                'amount' => $totalEarnings,
                'currency' => 'usd',
                'destination' => $fundraiser->stripe_express_id,
            ]);

            $payout = $fundraiser->payout()->create([
                'stripe_transfer_id' => $transfer->id,
                'amount' => $transfer->amount,
            ]);

            $loginLink = $this->stripeClient->accounts->createLoginLink($fundraiser->stripe_express_id);

            $fundraiser->organizer->notify(new PayoutInitiatedNotification($payout, $loginLink));
            Log::info("We sent a payout of {$fundraiser->earnings} to {$fundraiser->name}.", [
                'payout' => $payout,
                'fundraiser' => $fundraiser,
                'transfer' => $transfer,
            ]);
        });

        return Command::SUCCESS;
    }
}
