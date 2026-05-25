<?php

namespace Tests\Feature;

use App\Models\Customer;
use App\Models\Room;
use App\Models\RoomType;
use App\Services\MaintenanceService;
use App\Services\ReservationService;
use App\Enums\MaintenanceStatus;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use Exception;

class MaintenanceBlockTest extends TestCase
{
    use RefreshDatabase;

    public function test_active_blocking_maintenance_ticket_prevents_reservation(): void
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

        $maintenanceService = app(MaintenanceService::class);
        $reservationService = app(ReservationService::class);

        // Open a blocking maintenance ticket
        $ticket = $maintenanceService->openTicket($room, 'Clogged Toilet', 'high', null, true);

        $this->assertNotNull($ticket);
        $this->assertEquals(MaintenanceStatus::PENDING, $ticket->status);
        $this->assertTrue($ticket->blocks_room);

        // Attempting to book the room should throw an exception due to active blocking maintenance
        $this->expectException(Exception::class);
        $reservationService->createReservation([
            'customer_id' => $customer->id,
            'check_in' => Carbon::today()->addDays(1)->format('Y-m-d'),
            'check_out' => Carbon::today()->addDays(3)->format('Y-m-d'),
            'total_price' => 2000.00,
            'status' => 'confirmed',
        ], [$room->id]);
    }
}
