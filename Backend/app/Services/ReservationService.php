<?php

namespace App\Services;

use App\Models\Reservation;
use App\Enums\ReservationStatus;
use App\Enums\RoomStatus;
use App\Enums\PaymentStatus;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use Exception;

class ReservationService
{
    protected RoomAvailabilityService $availabilityService;

    public function __construct(RoomAvailabilityService $availabilityService)
    {
        $this->availabilityService = $availabilityService;
    }

    /**
     * Create a reservation with rooms.
     */
    public function createReservation(array $data, array $roomIds): Reservation
    {
        $checkIn = Carbon::parse($data['check_in']);
        $checkOut = Carbon::parse($data['check_out']);

        if ($checkIn->isAfter($checkOut) || $checkIn->equalTo($checkOut)) {
            throw new Exception('Check-in date must be before check-out date.');
        }

        return DB::transaction(function () use ($data, $roomIds, $checkIn, $checkOut) {
            // Verify room availability
            if (!$this->availabilityService->areRoomsAvailable($roomIds, $checkIn, $checkOut)) {
                throw new Exception('One or more selected rooms are not available for the requested dates.');
            }

            // Create reservation
            $reservation = Reservation::create($data);

            // Fetch pricing / details and attach rooms
            $pricingService = app(PricingService::class);
            $breakdown = $pricingService->calculate($roomIds, $checkIn, $checkOut);

            foreach ($breakdown['rooms'] as $item) {
                $reservation->rooms()->attach($item['room_id'], [
                    'price_per_night' => $item['price_per_night'],
                ]);
            }

            return $reservation;
        });
    }

    /**
     * Check in a reservation.
     */
    public function checkIn(Reservation $reservation): void
    {
        if ($reservation->status !== ReservationStatus::CONFIRMED) {
            throw new Exception('Only confirmed reservations can be checked in.');
        }

        DB::transaction(function () use ($reservation) {
            $reservation->update([
                'status' => ReservationStatus::CHECKED_IN,
                'checked_in_at' => now(),
            ]);

            // Update rooms status to occupied
            $reservation->rooms()->update(['status' => RoomStatus::OCCUPIED]);
        });
    }

    /**
     * Check out a reservation.
     */
    public function checkOut(Reservation $reservation): void
    {
        if ($reservation->status !== ReservationStatus::CHECKED_IN) {
            throw new Exception('Only checked-in reservations can be checked out.');
        }

        DB::transaction(function () use ($reservation) {
            $reservation->update([
                'status' => ReservationStatus::CHECKED_OUT,
                'checked_out_at' => now(),
            ]);

            // Update rooms status back to available
            $reservation->rooms()->update(['status' => RoomStatus::AVAILABLE]);
        });
    }

    /**
     * Cancel a reservation.
     */
    public function cancel(Reservation $reservation): void
    {
        if (in_array($reservation->status, [ReservationStatus::CHECKED_OUT, ReservationStatus::CANCELLED])) {
            throw new Exception('This reservation cannot be cancelled.');
        }

        DB::transaction(function () use ($reservation) {
            $reservation->update([
                'status' => ReservationStatus::CANCELLED,
                'cancelled_at' => now(),
            ]);

            // Update rooms status to available
            $reservation->rooms()->update(['status' => RoomStatus::AVAILABLE]);
        });
    }
}
