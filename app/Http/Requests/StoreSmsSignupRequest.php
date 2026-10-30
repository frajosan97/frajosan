<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreSmsSignupRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'min:2', 'max:120'],
            'email' => [
                'required',
                'string',
                'email:rfc,dns',
                'max:180',
                Rule::unique('sms_signup_requests', 'email')
                    ->whereIn('status', ['pending', 'contacted']),
            ],
            'phone' => [
                'required',
                'string',
                'max:30',
                'regex:/^(\+?254|0)[\s\-]?7[\s\-]?\d{2}[\s\-]?\d{3}[\s\-]?\d{3}$/',
            ],
            'business_name' => ['nullable', 'string', 'max:180'],
        ];
    }

    public function messages(): array
    {
        return [
            'email.unique' => 'We already have a pending request for this email. Our team will be in touch shortly.',
            'phone.regex' => 'Please enter a valid Kenyan phone number (e.g. +254 7XX XXX XXX).',
        ];
    }

    protected function prepareForValidation(): void
    {
        if ($this->filled('email')) {
            $this->merge(['email' => strtolower(trim((string) $this->input('email')))]);
        }

        if ($this->filled('phone')) {
            $this->merge(['phone' => $this->normalizePhone((string) $this->input('phone'))]);
        }
    }

    private function normalizePhone(string $phone): string
    {
        $digits = preg_replace('/\D/', '', $phone);

        if (str_starts_with($digits, '0')) {
            $digits = '254' . substr($digits, 1);
        }

        if (str_starts_with($digits, '7') && strlen($digits) === 9) {
            $digits = '254' . $digits;
        }

        return '+' . $digits;
    }
}