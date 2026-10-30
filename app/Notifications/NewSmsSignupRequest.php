<?php

namespace App\Notifications;

use App\Models\SmsSignupRequest;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class NewSmsSignupRequest extends Notification
{
    public function __construct(public SmsSignupRequest $signup)
    {
    }

    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
            ->subject('New SMS signup request')
            ->line("Name: {$this->signup->name}")
            ->line("Email: {$this->signup->email}")
            ->line("Phone: {$this->signup->phone}")
            ->line('Business: ' . ($this->signup->business_name ?: '—'))
            ->action('View in admin', url("/admin/sms-signups/{$this->signup->id}"));
    }
}