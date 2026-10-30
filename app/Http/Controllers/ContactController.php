<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreContactRequest;
use App\Models\ContactMessage;
use App\Models\Product;
use App\Models\Service;
use App\Notifications\Contact\NewContactMessage;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Notification;
use Illuminate\Support\Facades\RateLimiter;
use Inertia\Inertia;
use Inertia\Response;

class ContactController extends Controller
{
    /**
     * Recipient(s) for new-contact email notifications.
     * Falls back to config('mail.from.address').
     */
    private function recipients(): array
    {
        return config('site.contact_recipients', [
            config('mail.from.address', 'info@frajosantech.co.ke'),
        ]);
    }

    public function index(): Response
    {
        return Inertia::render('contact', [
            'products' => Product::query()
                ->active()
                ->ordered()
                ->get(['id', 'icon', 'title', 'slug', 'tagline']),

            'services' => Service::query()
                ->active()
                ->ordered()
                ->get(['id', 'icon', 'title', 'slug', 'tagline', 'type']),

            'meta' => [
                'can_submit' => true,
                'form_nonce' => now()->timestamp,
                'recaptcha_enabled' => (bool) config('services.recaptcha.enabled', false),
            ],
        ]);
    }

    /* ────────────────────────── STORE ────────────────────────── */

    public function store(StoreContactRequest $request): RedirectResponse
    {
        /*
         * Rate-limit: 3 submissions per 10 minutes per IP.
         * Prevents bots and accidental double-submits.
         */
        $key = 'contact-submit:' . $request->ip();
        if (RateLimiter::tooManyAttempts($key, 3)) {
            $seconds = RateLimiter::availableIn($key);

            return back()
                ->withErrors([
                    'message' => "Too many submissions. Please try again in {$seconds} seconds.",
                ])
                ->withInput();
        }

        // Optional reCAPTCHA v3 verification
        if (config('services.recaptcha.enabled', false)) {
            if (!$this->verifyRecaptcha($request->input('g-recaptcha-response'), $request->ip())) {
                return back()
                    ->withErrors(['message' => 'Captcha verification failed. Please try again.'])
                    ->withInput();
            }
        }

        $data = $request->validated();

        /*
         * Snapshot the human-readable title of the selected item.
         * Stored in the existing `catalog_name` column so admin still sees
         * what was picked even if the product/service is later renamed.
         */
        $catalogTitle = null;
        if (!empty($data['catalog_type']) && !empty($data['catalog_id'])) {
            $catalogTitle = $data['catalog_type'] === 'product'
                ? Product::whereKey($data['catalog_id'])->value('title')
                : Service::whereKey($data['catalog_id'])->value('title');
        }

        // Persist
        try {
            $message = ContactMessage::create([
                'name' => $data['name'],
                'email' => $data['email'],
                'phone' => $data['phone'],
                'organization' => $data['organization'] ?? null,
                'catalog_type' => $data['catalog_type'] ?? null,
                'catalog_id' => $data['catalog_id'] ?? null,
                'catalog_name' => $catalogTitle,
                'message' => $data['message'],
                'ip_address' => $request->ip(),
                'user_agent' => substr((string) $request->userAgent(), 0, 500),
                'referrer' => substr((string) $request->headers->get('referer'), 0, 500),
                'status' => 'new',
            ]);
        } catch (\Throwable $e) {
            Log::error('Contact message save failed', [
                'error' => $e->getMessage(),
                'email' => $data['email'] ?? null,
            ]);

            return back()
                ->withErrors(['message' => 'Something went wrong saving your message. Please try again.'])
                ->withInput();
        }

        RateLimiter::hit($key, 600);

        // Notify the office (queued — won't slow down the request)
        try {
            Notification::route('mail', $this->recipients())
                ->notify(new NewContactMessage($message));
        } catch (\Throwable $e) {
            // Never fail the user-facing flow because email hiccupped.
            Log::warning('Contact notification failed', [
                'contact_message_id' => $message->id,
                'error' => $e->getMessage(),
            ]);
        }

        // Optional auto-reply to the sender:
        // Mail::to($message->email)->queue(new ContactAutoReply($message));

        return redirect()
            ->route('contact.show')
            ->with('success', 'Thank you! Your message has been received.');
    }

    /* ────────────────────────── HELPERS ────────────────────────── */

    private function verifyRecaptcha(?string $token, ?string $ip): bool
    {
        if (empty($token)) {
            return false;
        }

        $secret = config('services.recaptcha.secret');
        if (empty($secret)) {
            return true; // fail-open when misconfigured
        }

        try {
            $response = Http::asForm()
                ->timeout(5)
                ->post('https://www.google.com/recaptcha/api/siteverify', [
                    'secret' => $secret,
                    'response' => $token,
                    'remoteip' => $ip,
                ]);

            $body = $response->json();

            return ($body['success'] ?? false) && ($body['score'] ?? 0) >= 0.5;
        } catch (\Throwable $e) {
            Log::warning('reCAPTCHA verify failed', ['error' => $e->getMessage()]);
            return true; // fail-open on network error
        }
    }
}