<?php

namespace App\Models;

use App\Enums\FundraiserStatus;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Str;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class Store extends Model implements HasMedia
{
    use HasFactory, InteractsWithMedia;

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
        'user_id',
        'fundraiser_id',
        'uuid',
        'avatar',
        'description',
    ];

    /**
     * The accessors to append to the model's array form.
     *
     * @var array
     */
    protected $appends = ['progress', 'is_active'];

    /**
     * A popup store belongs to one user.
     *
     * @return BelongsTo
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * A popup store belongs to a fundraiser.
     *
     * @return BelongsTo
     */
    public function fundraiser(): BelongsTo
    {
        return $this->belongsTo(Fundraiser::class);
    }

    /**
     * A store can have multiple orders
     *
     * @return HasMany
     */
    public function orders(): HasMany
    {
        return $this->hasMany(Order::class);
    }

    /**
     * Get the progress of the store
     *
     * @return float[]|int[]
     */
    public function getProgressAttribute()
    {
        $current = $this->orders()->sum('total') / PHP_ROUND_HALF_DOWN;

        return [
            'goal_amount' => $this->fundraiser->goal_amount,
            'current' => $current,
        ];
    }

    /**
     * @return Store[]|\Illuminate\Database\Eloquent\Collection|mixed
     */
    public function getLeaderboardAttribute()
    {
        return $this->fundraiser->stores->load('user')->sortByDesc(function (Store $store) {
            return $store->progress['current'];
        })->values();
    }

    public function getIsActiveAttribute(): bool
    {
        return $this->fundraiser->status == FundraiserStatus::IN_PROGRESS;
    }
}
