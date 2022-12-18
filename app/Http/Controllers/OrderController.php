<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreOrderRequest;
use Illuminate\Http\Request;
use Stripe\StripeClient;

class OrderController extends Controller
{
    public function __construct(protected StripeClient $stripeClient)
    {
    }

    // Login or Create an Account via Get Started
    // I should be able to add to my cart
    // I should be able to order from a store
    // I should be able to create a fundraiser
    // I should be able to view a fundraiser
    // I should be able to view my dashboard
    // I should be able to join a fundraiser

    public function store(StoreOrderRequest $request)
    {
        $token = $this->stripeClient->tokens->retrieve($request->get('stripe_token'));
        $customer = $this->stripeClient->customers->create([
            'email' => $request->get('email'),
            'name' => $request->get('first_name') . ' ' . $request->get('last_name'),
            'phone' => $request->get('phone')
        ]);
        $tok = $customer->sources->create([
            'source' => $token->id,
        ]);

        return redirect();
    }
}
