<?php

namespace Tests\Feature;

use App\Models\Customer;
use App\Models\Room;
use App\Models\RoomType;
use App\Services\ReservationService;
use App\Enums\ReservationStatus;
use Carbon\Carbon;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use Exception;

class ReservationWorkflowTest extends TestCase
{
    use RefreshDatabase;

    public function test_reservation_creation_with_multiple_rooms_transaction(): void
    {
        $roomType = RoomType::create([
            'name' => 'Test Room Type',
            'slug' => 'test-room-type',
            'base_price' => 1000.00,
            'capacity' => 2,
        ]);

        $room1 = Room::create([
            'room_type_id' => $roomType->id,
            'room_number' => '101',
            'floor' => 1,
            'status' => 'available',
        ]);

        $room2 = Room::create([
            'room_type_id' => $roomType->id,
            'room_number' => '102',
            'floor' => 1,
            'status' => 'available',
        ]);

        $customer = Customer::create([
            'first_name' => 'John',
            'last_name' => 'Doe',
            'email' => 'john.doe@example.com',
        ]);

        $service = app(ReservationService::class);

        $checkIn = Carbon::today()->addDays(2);
        $checkOut = Carbon::today()->addDays(5);

        // Verify successful multi-room reservation creation
        $reservation = $service->createReservation([
            'customer_id' => $customer->id,
            'check_in' => $checkIn->format('Y-m-d'),
            'check_out' => $checkOut->format('Y-m-d'),
            'total_price' => 6000.00, // 3 nights * 2 rooms * 1000
            'status' => 'confirmed',
        ], [$room1->id, $room2->id]);

        $this->assertNotNull($reservation);
        $this->assertEquals(6000.00, floatval($reservation->total_price));
        $this->assertCount(2, $reservation->rooms);

        // Verify that trying to book the same rooms again for overlapping dates throws exception
        $this->expectException(Exception::class);
        $service->createReservation([
            'customer_id' => $customer->id,
            'check_in' => $checkIn->format('Y-m-d'),
            'check_out' => $checkOut->format('Y-m-d'),
            'total_price' => 3000.00,
            'status' => 'confirmed',
        ], [$room1->id]);
    }
}
