<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\Store;
use Illuminate\Http\Request;

class CartController extends Controller
{
    public function store(Request $request, Store $store)
    {
        $this->validate($request, [
            'product_id' => ['required', 'exists:products,id'],
            'quantity' => ['numeric'],
        ]);

        /** @var Cart $cart */
        $cart = Cart::with(['items.product', 'store.user', 'address', 'customer'])->firstOrCreate(['session_id' => session()->getId(), 'store_id' => $store->id, 'active' => true], [
            'session_id' => session()->getId(),
            'store_id' => $store->id,
        ]);

        $cart->addItem($request->get('product_id'), $request->get('quantity'));

        return back()->with('message', 'added item to cart');
    }

    public function delete(Request $request, Store $store)
    {
        $this->validate($request, [
            'product_id' => ['required', 'exists:products,id'],
        ]);

        /** @var Cart $cart */
        $cart = Cart::with(['items.product', 'store.user', 'address', 'customer'])->firstOrCreate(['session_id' => session()->getId(), 'store_id' => $store->id, 'active' => true], [
            'session_id' => session()->getId(),
            'store_id' => $store->id,
        ]);

        $cart->removeItem($request->get('product_id'));

        return back()->with('message', 'Removed item from cart');
    }
}
