<?php

namespace App\Notifications;

use App\Helpers\Money;
use App\Models\Payout;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use Stripe\LoginLink;

class PayoutInitiatedNotification extends Notification implements ShouldQueue
{
    use Queueable;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct(public Payout $payout, public LoginLink $loginLink)
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
        $message = 'We have sent a payment of $'.Money::centsToDollars($this->payout->amount).' to your bank account.';

        return (new MailMessage)
            ->bcc(config('mail.cc'))
            ->subject('Hey its pay day! 💰')
            ->line($message)
            ->action('View My Payouts', $this->loginLink->url)
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
