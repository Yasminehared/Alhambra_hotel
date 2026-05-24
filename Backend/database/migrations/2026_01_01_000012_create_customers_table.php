<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('customers', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->nullable()->constrained()->nullOnDelete();
            $table->string('first_name');
            $table->string('last_name');
            $table->string('email')->unique();
            $table->string('phone')->nullable();
            $table->string('nationality')->nullable();
            $table->string('country_code', 5)->nullable();   // ISO 2-letter country code
            $table->string('passport_number')->nullable();
            $table->boolean('is_vip')->default(false);
            $table->text('notes')->nullable();               // internal staff notes
            $table->timestamps();

            $table->index(['email']);
            $table->index(['is_vip']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('customers');
    }
};
