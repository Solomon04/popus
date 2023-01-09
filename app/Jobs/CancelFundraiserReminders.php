<?php

namespace App\Jobs;

use App\Models\Fundraiser;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Thomasjohnkane\Snooze\Models\ScheduledNotification as SnoozeModel;
use Thomasjohnkane\Snooze\ScheduledNotification;

class CancelFundraiserReminders implements ShouldQueue
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
        SnoozeModel::where('meta->fundraiser', $this->fundraiser->uuid)
            ->get()
            ->each(fn ($model) => ScheduledNotification::find($model->id)->cancel());
    }
}
