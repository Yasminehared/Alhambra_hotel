<?php

namespace Tests\Feature;

use App\Models\Customer;
use App\Models\Reservation;
use App\Models\Room;
use App\Models\RoomType;
use App\Services\PaymentService;
use App\Enums\PaymentStatus;
use Carbon\Carbon;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class PaymentAllocationTest extends TestCase
{
    use RefreshDatabase;

    public function test_payment_allocation_transitions_reservation_payment_status(): void
    {
        $roomType = RoomType::create([
            'name' => 'Test Room Type',
            'slug' => 'test-room-type',
            'base_price' => 1000.00,
            'capacity' => 2,
        ]);

        $room = Room::create([
            'room_type_id' => $roomType->id,
            'room_number' => '101',
            'floor' => 1,
            'status' => 'available',
        ]);

        $customer = Customer::create([
            'first_name' => 'John',
            'last_name' => 'Doe',
            'email' => 'john.doe@example.com',
        ]);

        $reservation = Reservation::create([
            'customer_id' => $customer->id,
            'check_in' => Carbon::today()->addDays(1)->format('Y-m-d'),
            'check_out' => Carbon::today()->addDays(4)->format('Y-m-d'),
            'total_price' => 3000.00,
            'amount_paid' => 0.00,
            'status' => 'confirmed',
            'payment_status' => PaymentStatus::UNPAID,
        ]);
        $reservation->rooms()->attach($room->id, ['price_per_night' => 1000.00]);

        $paymentService = app(PaymentService::class);

        // 1. Record partial payment
        $payment1 = $paymentService->recordPayment($reservation, 1000.00, 'card');

        $reservation->refresh();
        $this->assertEquals(PaymentStatus::PARTIAL, $reservation->payment_status);
        $this->assertEquals(1000.00, floatval($reservation->amount_paid));

        // 2. Record full payment
        $payment2 = $paymentService->recordPayment($reservation, 2000.00, 'card');

        $reservation->refresh();
        $this->assertEquals(PaymentStatus::PAID, $reservation->payment_status);
        $this->assertEquals(3000.00, floatval($reservation->amount_paid));
    }
}
