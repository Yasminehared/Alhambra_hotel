<?php

namespace Tests\Feature;

use App\Models\Customer;
use App\Models\Reservation;
use App\Models\Room;
use App\Models\RoomType;
use App\Services\RoomAvailabilityService;
use Carbon\Carbon;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class RoomAvailabilityTest extends TestCase
{
    use RefreshDatabase;

    public function test_room_availability_overlap_detection(): void
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

        // Create an overlapping reservation
        $checkIn = Carbon::today()->addDays(5);
        $checkOut = Carbon::today()->addDays(10);

        $reservation = Reservation::create([
            'customer_id' => $customer->id,
            'check_in' => $checkIn->format('Y-m-d'),
            'check_out' => $checkOut->format('Y-m-d'),
            'total_price' => 5000.00,
            'status' => 'confirmed',
        ]);
        $reservation->rooms()->attach($room->id, ['price_per_night' => 1000.00]);

        $service = app(RoomAvailabilityService::class);

        // Test date range inside the reservation
        $this->assertFalse(
            $service->areRoomsAvailable([$room->id], Carbon::today()->addDays(6), Carbon::today()->addDays(8))
        );

        // Test date range starting before but ending inside
        $this->assertFalse(
            $service->areRoomsAvailable([$room->id], Carbon::today()->addDays(3), Carbon::today()->addDays(7))
        );

        // Test date range starting inside but ending after
        $this->assertFalse(
            $service->areRoomsAvailable([$room->id], Carbon::today()->addDays(7), Carbon::today()->addDays(12))
        );

        // Test completely separate date range
        $this->assertTrue(
            $service->areRoomsAvailable([$room->id], Carbon::today()->addDays(11), Carbon::today()->addDays(15))
        );
    }
}
