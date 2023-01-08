<?php

namespace App\Models;

use App\Enums\FundraiserStatus;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Str;

class Fundraiser extends Model
{
    use HasFactory, SoftDeletes;

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

        static::deleting(function ($fundraiser) { // before delete() method call this
        $fundraiser->stores()->delete();
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
        'stripe_express_id',
        'stripe_express_connected',
    ];

    /**
     * The relations to eager load on every query.
     *
     * @var array
     */
    protected $with = ['activity'];

    /**
     * The accessors to append to the model's array form.
     *
     * @var array
     */
    protected $appends = ['start_time_iso8601', 'end_time_iso8601'];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'paid_out' => 'boolean',
        'stripe_express_connected' => 'boolean',
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

    public function payout(): HasOne
    {
        return $this->hasOne(Payout::class);
    }

    public function scopeFuture(Builder $query): Builder
    {
        return $query->where('start_date', '>', now()->toDateString())
            ->where('end_date', '>=', now()->toDateString());
    }

    public function scopeActive(Builder $query): Builder
    {
        return $query->where('start_date', '<=', now()->toDateString())
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
        $start = Carbon::parse($this->start_time_iso8601);
        $end = Carbon::parse($this->end_time_iso8601);

        if ($start->isPast() && $end->isPast()) {
            return FundraiserStatus::ENDED;
        }

        if ($start->isPast() && $end->isFuture()) {
            return FundraiserStatus::IN_PROGRESS;
        }

        return FundraiserStatus::UPCOMING;
    }

    public function getStartTimeIso8601Attribute()
    {
        $start = Carbon::parse($this->start_date);

        return $start->setTimezone('America/Los_Angeles')->setHour(0)->setMinute(0)->toIso8601String();
    }

    public function getEndTimeIso8601Attribute()
    {
        $end = Carbon::parse($this->end_date);

        return $end->setTimezone('America/Los_Angeles')->setHour(11)->setMinute(59)->toIso8601String();
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
            return $store->orders()->sum('sub_total');
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

    public function getIsActiveAttribute()
    {
        return $this->status === FundraiserStatus::IN_PROGRESS;
    }
}
