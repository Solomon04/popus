<?php

namespace App\Models;

use App\Enums\FundraiserStatus;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
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
        'activity_id',
        'goal_amount',
        'participant_count',
        'code',
        'paid_out',
        'postal_code',
    ];

    /**
     * The relations to eager load on every query.
     *
     * @var array
     */
    protected $with = ['activity'];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
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
     * A fundraiser has many popup stores.
     *
     * @return HasMany
     */
    public function stores(): HasMany
    {
        return $this->hasMany(Store::class);
    }

    public function activity(): BelongsTo
    {
        return $this->belongsTo(Activity::class);
    }

    public function scopeFuture(Builder $query): Builder
    {
        return $query->where('start_date', '>', now()->toDateString())
            ->where('end_date', '>', now()->toDateString());
    }

    public function scopeActive(Builder $query): Builder
    {
        return $query->where('start_date', '<', now()->toDateString())
            ->where('end_date', '>', now()->toDateString());
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

    public function getStatusAttribute()
    {
        $start = Carbon::parse($this->start_date);
        $end = Carbon::parse($this->end_date);

        if ($start->isPast() && $end->isPast()) {
            return FundraiserStatus::ENDED;
        }

        if ($start->isPast() && $end->isFuture()) {
            return FundraiserStatus::IN_PROGRESS;
        }

        return FundraiserStatus::UPCOMING;
    }

    /**
     * @return Store[]|\Illuminate\Database\Eloquent\Collection|mixed
     */
    public function getLeaderboardAttribute()
    {
        return $this->stores->load('user')->sortByDesc(function (Store $store) {
            return $store->progress['current'];
        })->values();
    }

    public function getRevenueAttribute(): float
    {
        $revenue = $this->stores->sum(function (Store $store) {
            return $store->orders()->sum('total');
        });

        return round($revenue, 2);
    }

    public function getEarningsAttribute(): float
    {
        return round($this->revenue / PHP_ROUND_HALF_DOWN, 2);
    }

    public function getTotalOrdersAttribute(): int
    {
        return $this->stores->sum(function (Store $store) {
            return $store->orders()->count();
        });
    }
}
