<?php

namespace Tests\Feature;

use App\Models\Customer;
use App\Models\Room;
use App\Models\RoomType;
use App\Models\Reservation;
use App\Models\MaintenanceTicket;
use App\Enums\ReservationStatus;
use App\Enums\RoomStatus;
use Carbon\Carbon;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AdminApiTest extends TestCase
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
            'status' => RoomStatus::AVAILABLE,
            'is_active' => true,
        ]);

        return [$roomType, $room];
    }

    public function test_can_list_rooms_via_api(): void
    {
        [$roomType, $room] = $this->createSetup();

        $response = $this->getJson('/api/rooms');

        $response->assertStatus(200);
        $response->assertJsonFragment([
            'id' => 201,
            'name' => 'Superior Suite',
            'floor' => 2,
            'status' => 'available',
            'housekeeping' => 'clean',
        ]);
    }

    public function test_can_update_room_details_via_api(): void
    {
        [$roomType, $room] = $this->createSetup();

        $response = $this->putJson("/api/rooms/{$room->id}", [
            'status' => 'maintenance',
            'housekeeping_status' => 'dirty',
            'notes' => 'Needs painting.',
        ]);

        $response->assertStatus(200);
        $room->refresh();

        $this->assertEquals(RoomStatus::MAINTENANCE, $room->status);
        $this->assertEquals('dirty', $room->housekeeping_status);
        $this->assertEquals('Needs painting.', $room->notes);
    }

    public function test_can_list_maintenance_tickets_via_api(): void
    {
        [$roomType, $room] = $this->createSetup();

        $ticket = MaintenanceTicket::create([
            'room_id' => $room->id,
            'title' => 'AC Leak',
            'description' => 'Leaking in room 201',
            'status' => 'pending',
            'priority' => 'high',
            'blocks_room' => true,
        ]);

        $response = $this->getJson('/api/maintenance-tickets');

        $response->assertStatus(200);
        $response->assertJsonFragment([
            'title' => 'AC Leak',
            'room' => 201,
            'status' => 'pending',
            'priority' => 'high',
        ]);
    }

    public function test_can_create_maintenance_ticket_via_api(): void
    {
        [$roomType, $room] = $this->createSetup();

        $response = $this->postJson('/api/maintenance-tickets', [
            'room' => 201,
            'title' => 'Broken mirror',
            'description' => 'Bathroom vanity mirror cracked.',
            'priority' => 'low',
            'blocks_room' => false,
        ]);

        $response->assertStatus(201);
        $this->assertDatabaseHas('maintenance_tickets', [
            'title' => 'Broken mirror',
            'priority' => 'low',
            'blocks_room' => false,
        ]);
    }

    public function test_can_update_maintenance_ticket_via_api(): void
    {
        [$roomType, $room] = $this->createSetup();

        $ticket = MaintenanceTicket::create([
            'room_id' => $room->id,
            'title' => 'AC Leak',
            'description' => 'Leaking in room 201',
            'status' => 'pending',
            'priority' => 'high',
            'blocks_room' => true,
        ]);

        $response = $this->putJson("/api/maintenance-tickets/{$ticket->id}", [
            'status' => 'in-progress',
            'assigned_to' => 'John Doe',
        ]);

        $response->assertStatus(200);
        $ticket->refresh();

        $this->assertEquals(\App\Enums\MaintenanceStatus::IN_PROGRESS, $ticket->status);
        $this->assertEquals('John Doe', $ticket->assigned_to);
    }
}
