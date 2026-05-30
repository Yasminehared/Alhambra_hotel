<?php

namespace App\Services;

use App\Enums\MaintenanceStatus;
use App\Enums\ReservationStatus;
use App\Enums\RoomStatus;
use App\Models\Room;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Collection;

class RoomAvailabilityService
{
    /**
     * Get all rooms available for a given date range and optional type filter.
     */
    public function getAvailableRooms(
        Carbon $checkIn,
        Carbon $checkOut,
        ?int $roomTypeId = null
    ): Collection {
        $query = Room::query()
            ->where('rooms.is_active', true)
            ->where('rooms.status', '!=', RoomStatus::OUT_OF_SERVICE)
            ->whereNotIn('rooms.id', $this->getBlockedRoomIds($checkIn, $checkOut))
            ->with('roomType', 'amenities');

        if ($roomTypeId) {
            $query->where('rooms.room_type_id', $roomTypeId);
        }

        return $query->get();
    }

    /**
     * Check if a specific list of room IDs are all available for the date range.
     */
    public function areRoomsAvailable(array $roomIds, Carbon $checkIn, Carbon $checkOut): bool
    {
        $blockedIds = $this->getBlockedRoomIds($checkIn, $checkOut);

        foreach ($roomIds as $roomId) {
            if (in_array($roomId, $blockedIds)) {
                return false;
            }
        }

        // Also verify none are out_of_service
        return Room::whereIn('rooms.id', $roomIds)
            ->where('rooms.status', RoomStatus::OUT_OF_SERVICE)
            ->doesntExist();
    }

    /**
     * Return IDs of rooms that are blocked for a given date range,
     * either by an active reservation or an active maintenance ticket.
     */
    public function getBlockedRoomIds(Carbon $checkIn, Carbon $checkOut): array
    {
        $reservedRoomIds = $this->getRoomIdsWithOverlappingReservations($checkIn, $checkOut);
        $maintenanceRoomIds = $this->getRoomIdsUnderMaintenance($checkIn, $checkOut);

        return array_unique(array_merge($reservedRoomIds, $maintenanceRoomIds));
    }

    /**
     * Get room IDs that have overlapping confirmed/active reservations.
     */
    private function getRoomIdsWithOverlappingReservations(Carbon $checkIn, Carbon $checkOut): array
    {
        $cancelledStatuses = [ReservationStatus::CANCELLED->value, ReservationStatus::NO_SHOW->value];

        return \DB::table('reservation_rooms')
            ->join('reservations', 'reservation_rooms.reservation_id', '=', 'reservations.id')
            ->whereNotIn('reservations.status', $cancelledStatuses)
            ->where(function ($q) use ($checkIn, $checkOut) {
                $q->where(function ($inner) use ($checkIn, $checkOut) {
                    // Existing booking starts within requested range
                    $inner->where('reservations.check_in', '<', $checkOut)
                          ->where('reservations.check_out', '>', $checkIn);
                });
            })
            ->pluck('reservation_rooms.room_id')
            ->unique()
            ->values()
            ->all();
    }

    /**
     * Get room IDs currently under active/blocking maintenance.
     */
    private function getRoomIdsUnderMaintenance(Carbon $checkIn, Carbon $checkOut): array
    {
        $activeStatuses = [MaintenanceStatus::PENDING->value, MaintenanceStatus::IN_PROGRESS->value];

        return \DB::table('maintenance_tickets')
            ->where('blocks_room', true)
            ->whereIn('status', $activeStatuses)
            ->pluck('room_id')
            ->unique()
            ->values()
            ->all();
    }

    /**
     * Get a human-readable reason why a room is blocked, if any.
     */
    public function getBlockReason(int $roomId, Carbon $checkIn, Carbon $checkOut): ?string
    {
        $cancelledStatuses = [ReservationStatus::CANCELLED->value, ReservationStatus::NO_SHOW->value];

        $hasReservation = \DB::table('reservation_rooms')
            ->join('reservations', 'reservation_rooms.reservation_id', '=', 'reservations.id')
            ->where('reservation_rooms.room_id', $roomId)
            ->whereNotIn('reservations.status', $cancelledStatuses)
            ->where('reservations.check_in', '<', $checkOut)
            ->where('reservations.check_out', '>', $checkIn)
            ->exists();

        if ($hasReservation) {
            return 'Room is already reserved for these dates.';
        }

        $hasMaintenance = \DB::table('maintenance_tickets')
            ->where('room_id', $roomId)
            ->where('blocks_room', true)
            ->whereIn('status', [MaintenanceStatus::PENDING->value, MaintenanceStatus::IN_PROGRESS->value])
            ->exists();

        if ($hasMaintenance) {
            return 'Room is blocked for maintenance.';
        }

        return null;
    }
}
