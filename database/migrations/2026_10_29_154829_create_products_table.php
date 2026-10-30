<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {

    public function up(): void
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('icon');              // e.g. 'BarChart3'
            $table->string('title');
            $table->string('slug')->unique();    // URL-friendly identifier for detail page
            $table->string('tagline');           // short card description
            $table->longText('body')->nullable();// full content shown on detail page
            $table->string('image')->nullable(); // optional hero image for detail page
            $table->unsignedInteger('sort_order')->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};