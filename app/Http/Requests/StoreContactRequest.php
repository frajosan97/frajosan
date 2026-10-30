<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Validator;

class StoreContactRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'min:2', 'max:120'],
            'email' => ['required', 'email:rfc,dns', 'max:180'],
            'phone' => ['required', 'string', 'min:9', 'max:30', 'regex:/^[0-9+\s\-()]+$/'],
            'organization' => ['nullable', 'string', 'max:180'],

            'catalog_type' => ['nullable', 'in:product,service'],
            'catalog_id' => [
                'nullable',
                'integer',
                'required_with:catalog_type',
                Rule::when(
                    $this->input('catalog_type') === 'product',
                    [Rule::exists('products', 'id')->where('is_active', true)],
                ),
                Rule::when(
                    $this->input('catalog_type') === 'service',
                    [Rule::exists('services', 'id')->where('is_active', true)],
                ),
            ],

            'message' => ['required', 'string', 'min:10', 'max:4000'],

            // Honeypot — must stay empty (bots fill it in)
            'website' => ['nullable', 'max:0'],

            // reCAPTCHA v3 token (optional — remove if not used)
            'g-recaptcha-response' => ['nullable', 'string'],
        ];
    }

    public function messages(): array
    {
        return [
            'website.max' => 'Spam detected.',
            'phone.regex' => 'The phone number format is invalid.',
            'catalog_id.*' => 'The selected item is no longer available.',
            'message.min' => 'Please give us a bit more detail (at least 10 characters).',
        ];
    }

    public function withValidator(Validator $validator): void
    {
        $validator->after(function (Validator $v) {
            // Time-trap: reject submissions completed in under 2 seconds.
            $started = (int) $this->input('form_started_at', 0);
            if ($started > 0 && (time() - $started) < 2) {
                $v->errors()->add('message', 'Submission too fast. Please try again.');
            }

            // Block obvious spam phrases in the body
            $spam = ['viagra', 'casino', 'crypto giveaway', 'loan approval', 'click here to win'];
            $body = strtolower((string) $this->input('message'));
            foreach ($spam as $needle) {
                if (str_contains($body, $needle)) {
                    $v->errors()->add('message', 'Your message looks like spam. Please rewrite.');
                    break;
                }
            }
        });
    }

    public function prepareForValidation(): void
    {
        $this->merge([
            'name' => trim((string) $this->input('name')),
            'email' => strtolower(trim((string) $this->input('email'))),
            'phone' => trim((string) $this->input('phone')),
        ]);
    }
}