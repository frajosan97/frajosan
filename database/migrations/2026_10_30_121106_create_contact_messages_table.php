<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('contact_messages', function (Blueprint $table) {
            $table->id();

            // Sender
            $table->string('name', 120);
            $table->string('email', 180);
            $table->string('phone', 30);
            $table->string('organization', 180)->nullable();

            // What they're interested in
            $table->enum('catalog_type', ['product', 'service'])->nullable();
            $table->unsignedBigInteger('catalog_id')->nullable();
            $table->string('catalog_name', 180)->nullable(); // snapshot for reporting

            // Body
            $table->text('message');

            // Metadata
            $table->string('ip_address', 45)->nullable();
            $table->string('user_agent', 500)->nullable();
            $table->string('referrer', 500)->nullable();

            // Workflow
            $table->enum('status', ['new', 'read', 'replied', 'archived'])->default('new');
            $table->timestamp('read_at')->nullable();
            $table->timestamp('replied_at')->nullable();
            $table->foreignId('replied_by')->nullable()->constrained('users')->nullOnDelete();
            $table->text('internal_notes')->nullable();

            $table->timestamps();

            $table->index(['status', 'created_at']);
            $table->index('email');
            $table->index(['catalog_type', 'catalog_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('contact_messages');
    }
};