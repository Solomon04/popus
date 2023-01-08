<?php

namespace App\Notifications;

use App\Models\Fundraiser;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use Stripe\AccountLink;

class SetupPayoutMethodNotification extends Notification
{
    use Queueable;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct(public Fundraiser $fundraiser, public AccountLink $accountLink)
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
        $message = " Hi {$this->fundraiser->organizer->first_name}, we need you to connect your bank account so we can send your fundraiser earnings.";

        return (new MailMessage)
            ->bcc(config('mail.cc'))
            ->subject('Required Action for Popups Gives ‼️')
            ->line($message)
            ->action('Connect Bank Account', $this->accountLink->url)
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
