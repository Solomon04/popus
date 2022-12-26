<?php

namespace App\Http\Controllers;

use App\Enums\OrderStatus;
use App\Helpers\Money;
use App\Http\Requests\StoreOrderRequest;
use App\Models\Cart;
use App\Models\CartItem;
use App\Models\Customer;
use App\Models\Order;
use App\Models\Store;
use App\Services\CartManager;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Signifly\Shopify\Exceptions\ValidationException;
use Signifly\Shopify\Shopify;
use Stripe\Card;
use Stripe\PaymentMethod;
use Stripe\StripeClient;

class OrderController extends Controller
{
    public function __construct(protected StripeClient $stripeClient, protected Shopify $shopify)
    {
    }

    // Login or Create an Account via Get Started
    // I should be able to create a fundraiser
    // I should be able to view a fundraiser
    // I should be able to view my dashboard
    // I should be able to join a fundraiser

    // TODO: Handle edge cases: What happens if an order is deleted / what happens if an order is cancelled / what happens if an order is fulfilled?
    public function store(StoreOrderRequest $request, Store $store)
    {
        /** @var Cart $cart */
        $cart = Cart::with(['items.product', 'store.user', 'address', 'customer'])->firstOrCreate(['session_id' => session()->getId(), 'store_id' => $store->id, 'active' => true], [
            'session_id' => session()->getId(),
            'store_id' => $store->id
        ]);

        $subtotal = $cart->items->sum(function ($item){
            return $item->quantity * $item->product->price;
        });

        try {
            $rate = \Shippo_Rate::retrieve($request->input('rate'));

        }catch (\Shippo_Error $exception){
            return back()->with('error', 'failure');
        }

        $shippingTotal = $rate['amount'];
        $taxTotal = ($shippingTotal + $subtotal) *  0.0725;

        $total = round($subtotal + $taxTotal + $shippingTotal, 2);

        $customer = $cart->customer()->updateOrCreate(['email' => $request->input('email')], [
            'email' => $request->input('email'),
            'name' => $request->input('first_name') . ' ' . $request->input('last_name'),
            'phone' => $request->input('phone'),
        ]);


        /** @var PaymentMethod $paymentMethod */
        $paymentMethod = $this->stripeClient->paymentMethods->create([
            'type' => 'card',
            'card' => [
                'token' => $request->input('stripe_token'),
            ]
        ]);

        $cart->address()->create([
            'address' => $request->input('address'),
            'unit' => $request->input('unit'),
            'city' => $request->input('city'),
            'state' => $request->input('state'),
            'postal' => $request->input('postal'),
            'last_name' => $request->input('last_name'),
            'first_name' => $request->input('first_name'),
            'country' => 'USA'
        ]);

        $cart->rate()->create([
            'shippo_id' => $rate['object_id'],
            'provider' => $rate['provider'],
            'name' => $rate['servicelevel']['name'],
            'amount' => $rate['amount'],
            'days' => $rate['estimated_days'],
            'image' => $rate['provider_image_200'],
            'description' => $rate['duration_terms'],
        ]);

        $cart->paymentMethod()->create([
            'stripe_payment_method_id' => $paymentMethod->id,
            'brand' => $paymentMethod->card->brand,
            'exp_month' => $paymentMethod->card->exp_month,
            'exp_year' => $paymentMethod->card->exp_year,
            'last4' => $paymentMethod->card->last4,
        ]);

        $paymentIntent = $this->stripeClient->paymentIntents->create([
            'amount' => Money::dollarsToCents($total),
            'currency' => 'usd',
            'payment_method_types' => ['card'],
            'payment_method' => $paymentMethod->id,
            'confirm' => true,
            'capture_method' => 'manual',
        ]);

        /** @var Order $order */
        $order = $cart->order()->create([
            'stripe_payment_id' => $paymentIntent->id,
            'store_id' => $store->id,
            'sub_total' => $subtotal,
            'shipping_total' => $shippingTotal,
            'tax_total' => $taxTotal,
            'total' => $total,
            'status' => OrderStatus::PENDING,
            'customer_id' => $customer->id
        ]);

        $order->payment()->create([
            'stripe_payment_id' => $paymentIntent->id,
            'stripe_price' => $paymentIntent->amount,
            'stripe_status' => $paymentIntent->status,
        ]);

        $lineItems = $cart->items->map(function (CartItem $cartItem){
            return [
                'variant_id' => $cartItem->product->shopify_product_id,
                'quantity' => $cartItem->quantity
            ];
        })->toArray();

        $shopifyOrder = $this->shopify->createOrder([
            'line_items' => $lineItems,
            'customer' => [
                'first_name' => $request->input('first_name'),
                'last_name' => $request->input('last_name'),
                'email' => $request->input('email'),
                'phone' => '+1' . $request->input('phone'),
                'addresses' => [
                    [
                        "address1" => $request->input('address'),
                        "city" => $request->input('city'),
                        "province" => $request->input('state'),
                        "zip" => $request->input('postal'),
                        "last_name" => $request->input('last_name'),
                        "first_name" => $request->input('first_name'),
                        "country" => 'USA'
                    ]
                ]
            ],
            'transactions' => [
                [
                    "kind" => "sale",
                    "status" => "success",
                    "amount" => $total
                ],
                [
                    "kind" => "shipping",
                    "status" => "success",
                    "amount" => $shippingTotal
                ],
            ],
            'currency' => 'USD',
            'total_tax' => round($taxTotal, 2),
            'shipping_address' => [
                "address1" => $request->input('address'),
                "city" => $request->input('city'),
                "province" => $request->input('state'),
                "zip" => $request->input('postal'),
                "last_name" => $request->input('last_name'),
                "first_name" => $request->input('first_name'),
                "country" => 'USA'
            ],
            'billing_address' =>   [
                "address1" => $request->input('address'),
                "city" => $request->input('city'),
                "province" => $request->input('state'),
                "zip" => $request->input('postal'),
                "last_name" => $request->input('last_name'),
                "first_name" => $request->input('first_name'),
                "country" => 'USA'
            ]
        ]);

        $order->update([
            'shopify_order_id' => $shopifyOrder->id
        ]);

        $cart->update(['active' => false]);

        return redirect()->route('show.order', ['store' => $store, 'order' => $order]);
    }

    public function show(Store $store, Order $order)
    {
        $order->load(['customer',
            'cart' => [
                'items.product',
                'address',
                'paymentMethod',
                'rate'
            ]
        ]);

        return Inertia::render('Popup/Summary', [
            'store' => $store,
            'order' => $order
        ]);
    }
}
