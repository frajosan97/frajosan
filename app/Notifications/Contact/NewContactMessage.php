<?php

namespace App\Notifications\Contact;

use App\Models\ContactMessage;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class NewContactMessage extends Notification implements ShouldQueue
{
    use Queueable;

    public function __construct(public ContactMessage $contactMessage)
    {
    }

    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    public function toMail(object $notifiable): MailMessage
    {
        $m = $this->contactMessage;
        $interest = $m->catalog_name
            ? "{$m->catalog_type} — {$m->catalog_name}"
            : 'General inquiry';

        return (new MailMessage)
            ->subject("New contact: {$m->name} — {$interest}")
            ->greeting('New contact message')
            ->line("**From:** {$m->name} ({$m->email})")
            ->line("**Phone:** {$m->phone}")
            ->line("**Organization:** " . ($m->organization ?: '—'))
            ->line("**Interest:** {$interest}")
            ->line('---')
            ->line($m->message)
            ->line('---')
            ->action('View in admin', url("/admin/contact-messages/{$m->id}"))
            ->salutation('— Frajosan Technologies');
    }
}