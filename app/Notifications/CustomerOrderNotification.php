<?php

namespace App\Notifications;

use App\Models\Order;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class CustomerOrderNotification extends Notification
{
    use Queueable;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct(public Order $order)
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
     * @return MailMessage
     */
    public function toMail($notifiable)
    {
        $subject = "Thank you for supporting {$this->order->store->user->first_name}'s fundraiser! 🙏";
        $message = "{$this->order->store->user->first_name} is grateful to receive your support. Popus Gives will be delivering your order in the next couple of weeks.";
        $url = route('show.order', ['store' => $this->order->store, 'order' => $this->order]);

        return (new MailMessage)
                    ->subject($subject)
                    ->line($message)
                    ->action('Track My Order', $url)
                    ->line('Thank you for using our Popus Gives!');
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
