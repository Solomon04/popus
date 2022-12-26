<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PaymentMethod extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var string[]
     */
    protected $fillable = [
        'cart_id',
        'stripe_payment_method_id',
        'brand',
        'exp_month',
        'exp_year',
        'last4',
        'is_default',
    ];

    public function cart(): BelongsTo
    {
        return $this->belongsTo(Cart::class);
    }
}
