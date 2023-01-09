<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Signifly\Shopify\Exceptions\ValidationException;
use Signifly\Shopify\Shopify;

class CreateShopifyWebhooksCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:shopify-create-webhooks';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Create the required Shopify Webhooks if they do not exist.';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle(Shopify $shopify)
    {
        $webhooks = $shopify->getWebhooks();
        if (app()->environment('local')) {
            return 0;
        }

        $orderFulfilledCount = $webhooks
            ->where('address', '=', route('shopify.webhook.order.fulfilled'))
            ->where('topic', '=', 'orders/fulfilled')
            ->count();

        if ($orderFulfilledCount === 0) {
            try {
                $shopify->createWebhook([
                    'address' => route('shopify.webhook.order.fulfilled'),
                    'topic' => 'orders/fulfilled',
                    'format' => 'json',
                ]);
                $this->comment('Added Order Fulfilled Webhook.');
            } catch (ValidationException $exception) {
                $this->error($exception->getMessage());
            }
        }

        $orderCancelledCount = $webhooks
            ->where('address', '=', route('shopify.webhook.order.cancelled'))
            ->where('topic', '=', 'orders/fulfilled')
            ->count();

        if ($orderCancelledCount === 0) {
            try {
                $shopify->createWebhook([
                    'address' => route('shopify.webhook.order.cancelled'),
                    'topic' => 'orders/cancelled',
                    'format' => 'json',
                ]);
                $this->comment('Added Order Cancelled Webhook.');
            } catch (ValidationException $exception) {
                $this->error($exception->getMessage());
            }
        }

        $orderDeletedCount = $webhooks
            ->where('address', '=', route('shopify.webhook.order.deleted'))
            ->where('topic', '=', 'orders/fulfilled')
            ->count();

        if ($orderDeletedCount === 0) {
            try {
                $shopify->createWebhook([
                    'address' => route('shopify.webhook.order.deleted'),
                    'topic' => 'orders/deleted',
                    'format' => 'json',
                ]);
                $this->comment('Added Order Deleted Webhook.');
            } catch (ValidationException $exception) {
                $this->error($exception->getMessage());
            }
        }

        return Command::SUCCESS;
    }
}
