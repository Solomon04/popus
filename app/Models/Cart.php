<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Cart extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<string>
     */
    protected $fillable = [
        'session_id',
        'active',
        'store_id',
        'customer_id',
    ];


    /**
     * A cart can have many items
     *
     * @return HasMany
     */
    public function items(): HasMany
    {
        return $this->hasMany(CartItem::class, 'cart_id');
    }

    /**
     * A cart can belong to a store
     *
     * @return BelongsTo
     */
    public function store(): BelongsTo
    {
        return $this->belongsTo(Store::class);
    }

    /**
     * A cart has an order
     *
     * @return HasOne
     */
    public function order(): HasOne
    {
        return $this->hasOne(Order::class);
    }

    /**
     * A cart has an address
     *
     * @return HasOne
     */
    public function address(): HasOne
    {
        return $this->hasOne(Address::class);
    }

    /**
     * A cart belongs to a customer
     *
     * @return BelongsTo
     */
    public function customer(): BelongsTo
    {
        return $this->belongsTo(Customer::class);
    }

    public function paymentMethod(): HasOne
    {
        return $this->hasOne(PaymentMethod::class);
    }

    public function rate(): HasOne
    {
        return $this->hasOne(Rate::class);
    }

    /**
     * Returns true if the cart is not empty (contains items)
     *
     * @return bool
     */
    public function isNotEmpty(): bool
    {
        return $this->items()->count() === 0;
    }

    /**
     * Scope a query to only include users of a given type.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @param  mixed  $type
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeCurrentCart($query, $sessionId, $storeId)
    {
        return $query->where('store_id', $storeId)
            ->where('session_id', $sessionId)
            ->where('active', true);
    }

    /**
     * Add an item to the cart (or adds the quantity if the product is already in the cart)
     *
     * @param int $id
     * @param int $qty
     *
     * @return CartItem Returns the item object that has been created (or updated)
     */
    public function addItem(int $id, int $qty = 1): CartItem
    {
        return $this->items()->updateOrCreate([
            'product_id' => $id,
            'quantity' => $qty
        ]);
    }

    /**
     * Removes an item from the cart
     *
     * @param int $id
     */
    public function removeItem(int $id): void
    {
        $this->items()->where('product_id', '=', $id)->delete();
    }

}
