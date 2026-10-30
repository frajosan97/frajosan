<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('sms_signup_requests', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email');
            $table->string('phone', 30);
            $table->string('business_name')->nullable();

            // Lifecycle tracking
            $table->enum('status', ['pending', 'contacted', 'approved', 'rejected'])
                ->default('pending');
            $table->text('notes')->nullable();

            // Audit
            $table->string('ip_address', 45)->nullable();
            $table->string('user_agent')->nullable();

            // When the sales/onboarding team reached out
            $table->timestamp('contacted_at')->nullable();
            $table->timestamp('processed_at')->nullable();

            // Link to a user once the account is actually created
            $table->foreignId('user_id')->nullable()->constrained()->nullOnDelete();

            $table->timestamps();

            $table->index('status');
            $table->index('email');
            $table->index('phone');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('sms_signup_requests');
    }
};