<?php

namespace App\Http\Controllers;

use App\Enums\Shipping;
use App\Models\Cart;
use App\Models\CartItem;
use App\Models\Store;
use Artesaos\SEOTools\SEOTools;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Shippo;
use Shippo_Shipment;

class CheckoutController extends Controller
{
    public function __construct(protected SEOTools $seo)
    {
    }

    public function show(Store $store)
    {
        $title = "{$store->user->first_name}'s Pop-Up Store - Checkout";
        $description = 'Click here to buy gourmet popcorn and 50% of your purchase benefits the fundraiser.';
        $this->seo->setTitle($title);
        $this->seo->setDescription($description);
        $this->seo->opengraph()->setTitle($title);
        $this->seo->opengraph()->setDescription($description);
        $store->load(['user']);

        /** @var Cart $cart */
        $cart = Cart::with(['items.product', 'store.user', 'address', 'customer'])->firstOrCreate(['session_id' => session()->getId(), 'store_id' => $store->id, 'active' => true], [
            'session_id' => session()->getId(),
            'store_id' => $store->id,
        ]);

        return Inertia::render('Popup/Checkout', [
            'store' => $store,
            'cart' => $cart,
            'rates' => [], // to be set after the first step in the checkout form
        ]);
    }

    public function store(Store $store, Request $request)
    {
        Shippo::setApiKey(config('shippo.key'));

        /** @var Cart $cart */
        $cart = Cart::with(['items.product', 'store.user', 'address', 'customer'])->firstOrCreate(['session_id' => session()->getId(), 'store_id' => $store->id, 'active' => true], [
            'session_id' => session()->getId(),
            'store_id' => $store->id,
        ]);

        $weight = $cart->items->sum(function (CartItem $cartItem) {
            return $cartItem->product->weight * $cartItem->quantity;
        });

        $totalItems = $cart->items->sum(function (CartItem $cartItem) {
            return $cartItem->quantity;
        });

        $parcel = [
            'length' => $totalItems > 3 ? Shipping::LARGE_BOX_DIMENSIONS : Shipping::REGULAR_BOX_DIMENSIONS,
            'width' => $totalItems > 3 ? Shipping::LARGE_BOX_DIMENSIONS : Shipping::REGULAR_BOX_DIMENSIONS,
            'height' => $totalItems > 3 ? Shipping::LARGE_BOX_DIMENSIONS : Shipping::REGULAR_BOX_DIMENSIONS,
            'distance_unit' => 'in',
            'weight' => $weight,
            'mass_unit' => 'lb',
        ];

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
                'email' => $request->input('email'),
            ],
            'parcels' => $parcel,
            'async' => false,
        ]);

        $rates = collect($shipment['rates'])->filter(fn ($rate) => Str::lower($rate->provider) === 'ups')
            ->sortBy(fn ($rate) => $rate['amount'])
            ->take(4);

        $rates = $rates->map(function ($rate) {
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
            'rates' => $rates,
        ]);
    }
}
