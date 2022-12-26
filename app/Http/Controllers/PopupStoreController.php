<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\Product;
use App\Models\Store;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PopupStoreController extends Controller
{
    public function show(Store $store)
    {
        $store->load(['user', 'fundraiser']);
        $store->append(['leaderboard']);

        /** @var Cart $cart */
        $cart = Cart::with(['items.product', 'store.user', 'address', 'customer'])->firstOrCreate([  'session_id' => session()->getId(), 'store_id' => $store->id, 'active' => true], [
            'session_id' => session()->getId(),
            'store_id' => $store->id
        ]);

        $products = Product::active()->take(6)->get();
        return Inertia::render('Popup/Store', [
            'products' => $products,
            'store' => $store,
            'cart' => $cart
        ]);
    }
}
