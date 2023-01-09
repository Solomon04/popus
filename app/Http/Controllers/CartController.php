<?php

namespace App\Http\Controllers;

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

        $cart = $this->getCurrentCart($store);

        $cart->addItem($request->get('product_id'), $request->get('quantity'));

        return back()->with('message', 'added item to cart');
    }

    public function delete(Request $request, Store $store)
    {
        $this->validate($request, [
            'product_id' => ['required', 'exists:products,id'],
        ]);

        $cart = $this->getCurrentCart($store);

        $cart->removeItem($request->get('product_id'));

        return back()->with('message', 'Removed item from cart');
    }
}
