<?php

namespace App\Jobs;

use App\Models\Fundraiser;
use App\Notifications\FundraiserEndedNotification;
use App\Notifications\FundraiserStartedNotification;
use Carbon\Carbon;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Thomasjohnkane\Snooze\Models\ScheduledNotification as SnoozeModel;
use Thomasjohnkane\Snooze\ScheduledNotification;

class UpdateFundraiserReminders implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct(public Fundraiser $fundraiser)
    {
        //
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        $startDate = Carbon::parse($this->fundraiser->start_time_iso8601);
        $endDate = Carbon::parse($this->fundraiser->end_time_iso8601);

        if ($startDate->isFuture()) {
            SnoozeModel::where('meta->type', FundraiserStartedNotification::class)
                ->where('meta->fundraiser', $this->fundraiser->uuid)
                ->get()
                ->each(fn ($model) => ScheduledNotification::find($model->id)->reschedule($startDate->toDateTime()));
        }

        if ($endDate->isFuture()) {
            SnoozeModel::where('meta->type', FundraiserEndedNotification::class)
                ->where('meta->fundraiser', $this->fundraiser->uuid)
                ->get()
                ->each(fn ($model) => ScheduledNotification::find($model->id)->reschedule($endDate->toDateTime()));
        }
    }
}
