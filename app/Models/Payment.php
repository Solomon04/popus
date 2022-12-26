<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Payment extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var string[]
     */
    protected $fillable = [
        'stripe_payment_id',
        'stripe_price',
        'stripe_status',
        'stripe_refund_id',
        'order_id',
    ];

    public function order(): BelongsTo
    {
        return $this->belongsTo(Order::class);
    }
}
