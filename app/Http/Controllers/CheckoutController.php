<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\CartItem;
use App\Models\Store;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Shippo;
use Shippo_Rate;
use Shippo_Shipment;

class CheckoutController extends Controller
{
    public function show(Store $store)
    {
        $store->load(['user']);

        /** @var Cart $cart */
        $cart = Cart::with(['items.product', 'store.user', 'address', 'customer'])->firstOrCreate(['session_id' => session()->getId(), 'store_id' => $store->id, 'active' => true], [
            'session_id' => session()->getId(),
            'store_id' => $store->id
        ]);

        return Inertia::render('Popup/Checkout', [
            'store' => $store,
            'cart' => $cart,
            'rates' => [] // to be set after the first step in the checkout form
        ]);
    }

    public function store(Store $store, Request $request)
    {
        Shippo::setApiKey(config('shippo.key'));

        /** @var Cart $cart */
        $cart = Cart::with(['items.product', 'store.user', 'address', 'customer'])->firstOrCreate(['session_id' => session()->getId(), 'store_id' => $store->id, 'active' => true], [
            'session_id' => session()->getId(),
            'store_id' => $store->id
        ]);

        $parcels = $cart->items->map(function (CartItem $cartItem) {
            return [
                'length' => 8,
                'width' => 8,
                'height' => 8,
                'distance_unit' => 'in',
                'weight' => 20,
                'mass_unit' => 'lb',
            ];
        });

        $shipment = Shippo_Shipment::create([
            'address_from' => config('shippo.address_from'),
            'address_to' => [
                'name' => $request->input('name'),
                'street1' => $request->input('address'),
                'street2' => $request->input('unit'),
                'city' => $request->input('city'),
                'state' => $request->input('state'),
                'zip' => $request->input('postal'),
                'country' => 'US',
                'email' => $request->input('email')
            ],
            'parcels' => $parcels->toArray(),
            'async' => false,
        ]);

        $rates = collect($shipment['rates'])->filter(fn($rate) => Str::lower($rate->provider) === 'ups')
            ->sortBy(fn($rate) => $rate['amount'])
            ->take(4);

        $rates = $rates->map(function ($rate){
            $shipmentOptions = [];
            $shipmentOptions['id'] = $rate['object_id'];
            $shipmentOptions['provider'] = $rate['provider'];
            $shipmentOptions['name'] = $rate['servicelevel']['name'];
            $shipmentOptions['amount'] = $rate['amount'];
            $shipmentOptions['days'] = $rate['estimated_days'];
            $shipmentOptions['image'] = $rate['provider_image_200'];
            $shipmentOptions['description'] = $rate['duration_terms'];
            return $shipmentOptions;
        })->values();

        return Inertia::render('Popup/Checkout', [
            'store' => $store,
            'cart' => $cart,
            'rates' => $rates
        ]);
    }
}
