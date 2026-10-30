<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreSmsSignupRequest;
use App\Models\SmsSignupRequest;
use App\Notifications\NewSmsSignupRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Notification;

class SmsSignupController extends Controller
{
    public function store(StoreSmsSignupRequest $request): RedirectResponse
    {
        try {
            $signup = SmsSignupRequest::create([
                ...$request->validated(),
                'status' => 'pending',
                'ip_address' => $request->ip(),
                'user_agent' => substr((string) $request->userAgent(), 0, 255),
            ]);
        } catch (\Throwable $e) {
            report($e);

            Log::error('SMS signup request failed to save', [
                'error' => $e->getMessage(),
                'email' => $request->input('email'),
            ]);

            return back()->with(
                'error',
                'Something went wrong while saving your request. Please try again.'
            );
        }

        // Notifications must never break the user's submission.
        try {
            $salesAddress = config('mail.sales_address');

            if ($salesAddress) {
                Notification::route('mail', $salesAddress)
                    ->notify(new NewSmsSignupRequest($signup));
            } else {
                Log::warning('mail.sales_address is not configured; skipping sales notification', [
                    'sms_signup_request' => $signup->id,
                ]);
            }
        } catch (\Throwable $e) {
            Log::warning('SMS signup notification failed', [
                'sms_signup_request' => $signup->id,
                'error' => $e->getMessage(),
            ]);
        }

        return back()->with(
            'success',
            'Thanks! We received your request and will contact you within 1 business day.'
        );
    }
}