<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('testimonies', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('role');              // e.g. 'Principal, Kitui Boys High School'
            $table->string('image')->nullable(); // path or URL to avatar
            $table->text('quote');               // the testimonial body
            $table->unsignedTinyInteger('rating')->default(5); // optional star rating
            $table->unsignedInteger('sort_order')->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('testimonies');
    }
};