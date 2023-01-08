<?php

namespace App\Http\Controllers\Webhook;

use App\Enums\OrderStatus;
use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\Request;
use Stripe\StripeClient;

class ShopifyWebhookController extends Controller
{
    public function __construct(protected StripeClient $stripeClient)
    {
    }

    public function orderFulfilled(Request $request)
    {
        // confirm the payment intent
        $order = Order::where('shopify_order_id', '=', $request->input('id'))->firstOrFail();
        $paymentIntent = $this->stripeClient->paymentIntents->retrieve($order->payment->stripe_payment_id);
        $paymentIntent = $paymentIntent->capture();

        $order->update([
            'status' => OrderStatus::CONFIRMED,
        ]);

        $order->payment()->update([
            'stripe_status' => $paymentIntent->status,
        ]);

        return response('Successfully fulfilled an order.');
    }

    public function orderDeleted(Request $request)
    {
        // cancel the payment intent and refund order
        $order = Order::where('shopify_order_id', '=', $request->input('id'))->firstOrFail();

        $paymentIntent = $this->stripeClient->paymentIntents->retrieve($order->payment->stripe_payment_id);
        $paymentIntent = $paymentIntent->cancel();

        $order->update([
            'status' => OrderStatus::REFUNDED,
        ]);

        $order->payment()->update([
            'stripe_status' => $paymentIntent->status,
        ]);

        return response('Successfully fulfilled an order.');
    }

    public function orderCancelled(Request $request)
    {
        // cancel the payment intent and refund order
        $order = Order::where('shopify_order_id', '=', $request->input('id'))->firstOrFail();

        $paymentIntent = $this->stripeClient->paymentIntents->retrieve($order->payment->stripe_payment_id);
        $paymentIntent = $paymentIntent->cancel();

        $order->update([
            'status' => OrderStatus::REFUNDED,
        ]);

        $order->payment()->update([
            'stripe_status' => $paymentIntent->status,
        ]);

        return response('Successfully fulfilled an order.');
    }
}
