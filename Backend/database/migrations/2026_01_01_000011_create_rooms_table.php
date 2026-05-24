<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('rooms', function (Blueprint $table) {
            $table->id();
            $table->foreignId('room_type_id')->constrained()->cascadeOnDelete();
            $table->string('room_number')->unique();        // e.g. "101", "302"
            $table->unsignedTinyInteger('floor')->default(1);
            $table->string('status')->default('available');
            $table->text('notes')->nullable();             // internal staff notes
            $table->boolean('is_active')->default(true);
            $table->timestamps();

            $table->index(['status']);
            $table->index(['room_type_id', 'status']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('rooms');
    }
};
