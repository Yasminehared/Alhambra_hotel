<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('room_types', function (Blueprint $table) {
            $table->id();
            $table->string('name');                         // e.g. "Royal Suite"
            $table->string('slug')->unique();               // e.g. "royal-suite"
            $table->string('category')->default('room');    // room | suite | villa
            $table->text('description')->nullable();
            $table->text('short_description')->nullable();
            $table->decimal('base_price', 10, 2);           // price per night (MAD)
            $table->unsignedTinyInteger('capacity')->default(2); // max guests
            $table->unsignedSmallInteger('size_sqm')->nullable(); // room size in m²
            $table->json('images')->nullable();             // array of image URLs
            $table->string('hero_image')->nullable();       // main hero image URL
            $table->boolean('is_active')->default(true);
            $table->unsignedTinyInteger('sort_order')->default(0);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('room_types');
    }
};
