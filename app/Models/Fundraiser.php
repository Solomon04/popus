<?php

namespace App\Models;

use App\Enums\FundraiserStatus;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Str;

class Fundraiser extends Model
{
    use HasFactory;

    /**
     * Bootstrap the model and its traits.
     *
     * @return void
     */
    protected static function boot()
    {
        parent::boot();
        self::creating(function ($model) {
            $model->uuid = Str::uuid();
        });
    }

    /**
     * The attributes that are mass assignable.
     *
     * @var array<string>
     */
    protected $fillable = [
        'uuid',
        'organizer_id',
        'name',
        'start_date',
        'end_date',
        'activity',
        'affiliation',
        'goal',
        'participant_count',
        'code',
        'paid_out',
        'city',
        'state',
        'postal_code'
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array
     */
    protected $casts = [
        'start_time' => 'datetime',
        'end_time' => 'datetime',
        'paid_out' => 'boolean',
    ];

    /**
     * Get the owner of the fundraiser
     *
     * @return BelongsTo
     */
    public function organizer(): BelongsTo
    {
        return $this->belongsTo(User::class, 'organizer_id');
    }

    /**
     * Convert the goal as cents to dollars (Stripe requires cents)
     *
     * @param $price
     * @return float|int
     */
    public function getGoalAttribute($price)
    {
        return $price / 100;
    }

    /**
     * Set the goal as cents from dollars (Stripe requires cents)
     *
     * @param $price
     */
    public function setGoalAttribute($price)
    {
        $this->attributes['goal'] = $price * 100;
    }

    /**
     * Get the current status of a fundraiser.
     *
     * @return FundraiserStatus
     */
    public function getStatusAttribute()
    {
        $hasStarted = $this->start_date->isPast();
        $hasEnded = $this->end_date->isPast();
        if($hasStarted && $hasEnded){
            return FundraiserStatus::ENDED;
        }elseif($hasStarted && !$hasEnded){
            return FundraiserStatus::IN_PROGRESS;
        }else {
            return FundraiserStatus::UPCOMING;
        }
    }
}
