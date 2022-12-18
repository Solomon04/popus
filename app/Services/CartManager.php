<?php


namespace App\Services\Commerce;


use App\Contracts\Commerce\CartManagerContract;
use App\Models\Cart;
use App\Models\CartItem;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Session\Store;
use Illuminate\Support\Collection;

class CartManager
{

    public function __construct(protected Store $sessionStore)
    {
        $this->sessionStore = $sessionStore;
    }


    /**
     * Get the current session cart
     *
     * @return Collection
     */
    public function getCart(): Collection
    {
        if (! $this->sessionStore->get('cart') instanceof Collection) {
            $this->sessionStore->put('cart', collect());
        }

        return $this->sessionStore->get('cart');
    }

    /**
     * Returns true if the cart is empty (doesn't contain items)
     *
     * @return bool
     */
    public function isEmpty(): bool
    {
        return $this->getCart()->isEmpty();
    }

    /**
     * Returns true if the cart is not empty (contains items)
     *
     * @return bool
     */
    public function isNotEmpty(): bool
    {
        return $this->getCart()->isNotEmpty();
    }


    /**
     * Completely destroys the cart: removes all related models (cart, item, etc) from the DB
     */
    public function clear(): void
    {
        $this->sessionStore->remove('cart');
    }

    /**
     * Add an item to the cart (or adds the quantity if the product is already in the cart)
     *
     * @param int $id
     * @param int $qty
     *
     * @return  Returns the item object that has been created (or updated)
     */
    public function addItem(int $id, int $qty = 1)
    {
        $cart = $this->getCart();
        $cart->push($id);

        return $this->sessionStore->push('cart');
    }

    /**
     * Removes an item from the cart
     *
     * @param int $id
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
