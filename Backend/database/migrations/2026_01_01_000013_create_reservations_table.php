<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('reservations', function (Blueprint $table) {
            $table->id();
            $table->string('reference')->unique();          // e.g. "RES-20260001"
            $table->foreignId('customer_id')->constrained()->cascadeOnDelete();
            $table->date('check_in');
            $table->date('check_out');
            $table->unsignedTinyInteger('adults')->default(1);
            $table->unsignedTinyInteger('children')->default(0);
            $table->string('status')->default('pending');
            $table->string('payment_status')->default('unpaid');
            $table->string('payment_method')->nullable();   // cash | card | bank_transfer | online
            $table->decimal('total_price', 10, 2);
            $table->decimal('amount_paid', 10, 2)->default(0);
            $table->string('source')->default('direct');    // direct | booking.com | expedia | airbnb
            $table->text('special_requests')->nullable();
            $table->text('internal_notes')->nullable();     // staff-only notes
            $table->timestamp('confirmed_at')->nullable();
            $table->timestamp('checked_in_at')->nullable();
            $table->timestamp('checked_out_at')->nullable();
            $table->timestamp('cancelled_at')->nullable();
            $table->timestamps();

            // Indexes for performance
            $table->index(['status']);
            $table->index(['check_in', 'check_out']);
            $table->index(['customer_id']);
            $table->index(['reference']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('reservations');
    }
};
