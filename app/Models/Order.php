<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Order extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<string>
     */
    protected $fillable = [
        'cart_id',
        'shopify_order_id',
        'stripe_payment_id',
        'customer_id',
        'store_id',
        'sub_total',
        'shipping_total',
        'total'
    ];

    /**
     * An order belongs to a customer
     *
     * @return BelongsTo
     */
    public function customer(): BelongsTo
    {
        return $this->belongsTo(Customer::class);
    }

    /**
     * An order has a single cart
     *
     * @return BelongsTo
     */
    public function cart(): BelongsTo
    {
        return $this->belongsTo(Cart::class);
    }

    /**
     * An order can belong to a store
     *
     * @return BelongsTo
     */
    public function store(): BelongsTo
    {
        return $this->belongsTo(Store::class);
    }

    /**
     * Convert the amount as cents to dollars
     *
     * @param $price
     * @return float|int
     */
    public function getTotalAttribute($price)
    {
        return $price / 100;
    }

    /**
     * Set the amount as cents from dollars
     *
     * @param $price
     */
    public function setTotalAttribute($price)
    {
        $this->attributes['total'] = $price * 100;
    }
}
