<?php

namespace Tests\Feature;

use App\Models\Customer;
use App\Models\Room;
use App\Models\RoomType;
use App\Models\Reservation;
use App\Enums\ReservationStatus;
use Carbon\Carbon;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ReservationApiTest extends TestCase
{
    use RefreshDatabase;

    private function createSetup(): array
    {
        $roomType = RoomType::create([
            'name' => 'Superior Suite',
            'slug' => 'superior-suite',
            'base_price' => 1200.00,
            'capacity' => 2,
        ]);

        $room = Room::create([
            'room_type_id' => $roomType->id,
            'room_number' => '201',
            'floor' => 2,
            'status' => 'available',
            'is_active' => true,
        ]);

        return [$roomType, $room];
    }

    public function test_can_create_reservation_via_api(): void
    {
        [$roomType, $room] = $this->createSetup();

        $response = $this->postJson('/api/reservations', [
            'check_in' => Carbon::tomorrow()->toDateString(),
            'check_out' => Carbon::tomorrow()->addDays(2)->toDateString(),
            'adults' => 2,
            'children' => 0,
            'full_name' => 'Jane Doe',
            'email' => 'jane.doe@example.com',
            'phone' => '1234567890',
            'special_requests' => 'Allergic to peanuts.',
        ]);

        $response->assertStatus(201);
        $response->assertJsonStructure([
            'message',
            'reservation' => [
                'id',
                'customer_id',
                'check_in',
                'check_out',
                'total_price',
                'rooms',
                'customer',
            ]
        ]);

        $this->assertDatabaseHas('customers', [
            'email' => 'jane.doe@example.com',
            'first_name' => 'Jane',
            'last_name' => 'Doe',
        ]);

        $this->assertDatabaseHas('reservations', [
            'total_price' => 2400.00, // 2 nights * 1200
        ]);
    }

    public function test_api_reservation_fails_when_no_rooms_available(): void
    {
        [$roomType, $room] = $this->createSetup();

        // Let's reserve the only room we have
        $customer = Customer::create([
            'first_name' => 'John',
            'last_name' => 'Smith',
            'email' => 'john@example.com',
        ]);

        $existingReservation = Reservation::create([
            'customer_id' => $customer->id,
            'check_in' => Carbon::tomorrow()->toDateString(),
            'check_out' => Carbon::tomorrow()->addDays(2)->toDateString(),
            'total_price' => 2400.00,
            'status' => ReservationStatus::CONFIRMED,
        ]);
        $existingReservation->rooms()->attach($room->id, ['price_per_night' => 1200.00]);

        // Try booking the same dates via api
        $response = $this->postJson('/api/reservations', [
            'check_in' => Carbon::tomorrow()->toDateString(),
            'check_out' => Carbon::tomorrow()->addDays(2)->toDateString(),
            'adults' => 2,
            'children' => 0,
            'full_name' => 'Jane Doe',
            'email' => 'jane.doe@example.com',
            'phone' => '1234567890',
        ]);

        $response->assertStatus(422);
        $response->assertJsonValidationErrors(['check_in']);
        $response->assertJsonFragment([
            'message' => 'No rooms available for the selected dates and capacity.',
        ]);
    }

    public function test_api_reservation_validation_fails_with_invalid_data(): void
    {
        $response = $this->postJson('/api/reservations', [
            'check_in' => 'not-a-date',
            'check_out' => 'not-a-date',
            'adults' => 0, // must be at least 1
            'children' => -1, // must be at least 0
            'full_name' => '',
            'email' => 'invalid-email',
        ]);

        $response->assertStatus(422);
        $response->assertJsonValidationErrors([
            'check_in',
            'check_out',
            'adults',
            'children',
            'full_name',
            'email',
        ]);
    }
}
