<?php

namespace App\Services;

use App\Models\Cart;
use App\Models\CartItem;
use Illuminate\Session\Store;

class CartManager
{
    /**
     * CartManager constructor.
     *
     * @param  Store  $sessionStore
     * @param  Cart  $cart
     */
    public function __construct(public Store $sessionStore, public Cart $cart)
    {
    }

    /**
     * Get the current session cart
     *
     * @return Cart
     */
    public function getCart(): Cart
    {
        $cart = Cart::with('items.product', 'store.user', 'address', 'customer')->where([
            'session_id' => $this->sessionStore->getId(),
            'active' => true,
        ])->first();

        if (null === $cart) {
            $this->sessionStore->regenerateToken();

            return $this->cart->create(['session_id' => $this->sessionStore->getId()])->load('items');
        }

        return $cart;
    }

    /**
     * Returns true if the cart is empty (doesn't contain items)
     *
     * @return bool
     */
    public function isEmpty(): bool
    {
        $cart = $this->getCart();

        return $cart->items()->count() === 0;
    }

    /**
     * Returns true if the cart is not empty (contains items)
     *
     * @return bool
     */
    public function isNotEmpty(): bool
    {
        $cart = $this->getCart();

        return $cart->items()->count() === 0;
    }

    /**
     * Completely destroys the cart: removes all related models (cart, item, etc) from the DB
     */
    public function destroy(): void
    {
        $cart = $this->getCart();
        $cart->forceDelete();
    }

    /**
     * Add an item to the cart (or adds the quantity if the product is already in the cart)
     *
     * @param  int  $id
     * @param  int  $qty
     * @return CartItem Returns the item object that has been created (or updated)
     */
    public function addItem(int $id, int $qty = 1): CartItem
    {
        $cart = $this->getCart();

        return $cart->items()->updateOrCreate([
            'product_id' => $id,
            'quantity' => $qty,
        ]);
    }

    /**
     * Removes an item from the cart
     *
     * @param  int  $id
     */
    public function removeItem(int $id): void
    {
        $cart = $this->getCart();

        $cart->items()->where('product_id', '=', $id)->delete();

        $cart->refresh();
        // If a cart is about to be completely cleared, we will want to remove any associated store ids with it too.
        if ($cart->items->count() === 0) {
            $cart->update(['store_id' => null]);
        }
    }
}
