<?php

namespace App\Notifications;

use App\Models\Fundraiser;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class FundraiserEndedNotification extends Notification
{
    use Queueable;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct(public Fundraiser $fundraiser)
    {
        //
    }

    /**
     * Get the notification's delivery channels.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function via($notifiable)
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return \Illuminate\Notifications\Messages\MailMessage
     */
    public function toMail($notifiable)
    {
        $message = "Hi {$this->fundraiser->organizer->first_name}, we want to inform you that your fundraiser has now ended. "
            .'We will be sending a payout to your account in the next 48 hours.';

        return (new MailMessage)
            ->subject('Your fundraiser has ended')
            ->bcc(config('mail.cc'))
            ->line($message)
            ->action('View Fundraiser', route('show.fundraiser', ['fundraiser' => $this->fundraiser]))
            ->line('Thank you for using Popus Gives!');
    }

    /**
     * Get the array representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function toArray($notifiable)
    {
        return [
            //
        ];
    }
}
