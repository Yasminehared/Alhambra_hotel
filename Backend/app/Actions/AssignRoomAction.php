<?php

namespace App\Actions;

use App\Models\Reservation;
use App\Models\Room;
use App\Enums\RoomStatus;
use App\Enums\ReservationStatus;
use App\Services\RoomAvailabilityService;
use App\Services\PricingService;
use Illuminate\Support\Facades\DB;
use Exception;
use Carbon\Carbon;

class AssignRoomAction
{
    protected RoomAvailabilityService $availabilityService;
    protected PricingService $pricingService;

    public function __construct(RoomAvailabilityService $availabilityService, PricingService $pricingService)
    {
        $this->availabilityService = $availabilityService;
        $this->pricingService = $pricingService;
    }

    /**
     * Assign a new set of rooms to a reservation.
     */
    public function execute(Reservation $reservation, array $newRoomIds): void
    {
        DB::transaction(function () use ($reservation, $newRoomIds) {
            $checkIn = Carbon::parse($reservation->check_in);
            $checkOut = Carbon::parse($reservation->check_out);

            // Get currently blocked room IDs for these dates
            $blockedRoomIds = $this->availabilityService->getBlockedRoomIds($checkIn, $checkOut);
            $currentRoomIds = $reservation->rooms()->pluck('rooms.id')->toArray();

            // Re-blocked IDs are those blocked, minus the ones currently assigned to this reservation
            $otherBlockedIds = array_diff($blockedRoomIds, $currentRoomIds);

            foreach ($newRoomIds as $roomId) {
                if (in_array($roomId, $otherBlockedIds)) {
                    throw new Exception("Room ID {$roomId} is not available for the requested dates.");
                }
            }

            // Also check out_of_service status for the new rooms
            $outOfService = Room::whereIn('id', $newRoomIds)
                ->where('status', RoomStatus::OUT_OF_SERVICE)
                ->exists();
            if ($outOfService) {
                throw new Exception("One or more of the new rooms are out of service.");
            }

            // If reservation is currently CHECKED_IN, revert old rooms status to available
            if ($reservation->status === ReservationStatus::CHECKED_IN) {
                $reservation->rooms()->update(['status' => RoomStatus::AVAILABLE]);
            }

            // Detach current rooms
            $reservation->rooms()->detach();

            // Calculate new pricing and attach new rooms
            $breakdown = $this->pricingService->calculate($newRoomIds, $checkIn, $checkOut);
            foreach ($breakdown['rooms'] as $item) {
                $reservation->rooms()->attach($item['room_id'], [
                    'price_per_night' => $item['price_per_night'],
                ]);
            }

            // Update total price of the reservation
            $reservation->update(['total_price' => $breakdown['total']]);

            // If reservation is currently CHECKED_IN, update new rooms status to occupied
            if ($reservation->status === ReservationStatus::CHECKED_IN) {
                Room::whereIn('id', $newRoomIds)->update(['status' => RoomStatus::OCCUPIED]);
            }
        });
    }
}
