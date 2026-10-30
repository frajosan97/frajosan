<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('services', function (Blueprint $table) {
            $table->id();
            $table->string('icon');              // e.g. 'MessageSquare'
            $table->string('title');
            $table->string('slug')->unique();
            $table->string('tagline')->nullable();
            $table->longText('body')->nullable();// full content for detail page
            $table->string('image')->nullable();
            $table->enum('type', ['core', 'addon'])->default('core'); // maps to SERVICES vs OTHER_SERVICES
            $table->unsignedInteger('sort_order')->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('services');
    }
};