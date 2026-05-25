<?php

namespace Tests\Feature;

use App\Models\Customer;
use App\Models\Room;
use App\Models\RoomType;
use App\Models\Reservation;
use App\Services\ReservationService;
use App\Enums\ReservationStatus;
use App\Enums\RoomStatus;
use Carbon\Carbon;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use Exception;

class CheckInCheckOutTest extends TestCase
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
        ]);

        $customer = Customer::create([
            'first_name' => 'Yasmine',
            'last_name' => 'Hared',
            'email' => 'yasmine@example.com',
        ]);

        return [$room, $customer];
    }

    public function test_confirmed_reservation_check_in_success(): void
    {
        [$room, $customer] = $this->createSetup();
        $service = app(ReservationService::class);

        $reservation = Reservation::create([
            'customer_id' => $customer->id,
            'check_in' => Carbon::today()->toDateString(),
            'check_out' => Carbon::today()->addDays(2)->toDateString(),
            'total_price' => 2400.00,
            'status' => ReservationStatus::CONFIRMED,
        ]);
        $reservation->rooms()->attach($room->id, ['price_per_night' => 1200.00]);

        $service->checkIn($reservation);

        $reservation->refresh();
        $room->refresh();

        $this->assertEquals(ReservationStatus::CHECKED_IN, $reservation->status);
        $this->assertNotNull($reservation->checked_in_at);
        $this->assertEquals(RoomStatus::OCCUPIED, $room->status);
    }

    public function test_unconfirmed_reservation_check_in_fails(): void
    {
        [$room, $customer] = $this->createSetup();
        $service = app(ReservationService::class);

        $reservation = Reservation::create([
            'customer_id' => $customer->id,
            'check_in' => Carbon::today()->toDateString(),
            'check_out' => Carbon::today()->addDays(2)->toDateString(),
            'total_price' => 2400.00,
            'status' => ReservationStatus::PENDING,
        ]);
        $reservation->rooms()->attach($room->id, ['price_per_night' => 1200.00]);

        $this->expectException(Exception::class);
        $service->checkIn($reservation);
    }

    public function test_checked_in_reservation_check_out_success(): void
    {
        [$room, $customer] = $this->createSetup();
        $service = app(ReservationService::class);

        $reservation = Reservation::create([
            'customer_id' => $customer->id,
            'check_in' => Carbon::today()->subDays(2)->toDateString(),
            'check_out' => Carbon::today()->toDateString(),
            'total_price' => 2400.00,
            'status' => ReservationStatus::CHECKED_IN,
        ]);
        $reservation->rooms()->attach($room->id, ['price_per_night' => 1200.00]);
        $room->update(['status' => RoomStatus::OCCUPIED]);

        $service->checkOut($reservation);

        $reservation->refresh();
        $room->refresh();

        $this->assertEquals(ReservationStatus::CHECKED_OUT, $reservation->status);
        $this->assertNotNull($reservation->checked_out_at);
        $this->assertEquals(RoomStatus::AVAILABLE, $room->status);
    }
}
