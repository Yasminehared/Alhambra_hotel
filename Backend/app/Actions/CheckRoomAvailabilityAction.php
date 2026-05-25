<?php

namespace App\Actions;

use App\Services\RoomAvailabilityService;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Collection;

class CheckRoomAvailabilityAction
{
    protected RoomAvailabilityService $availabilityService;

    public function __construct(RoomAvailabilityService $availabilityService)
    {
        $this->availabilityService = $availabilityService;
    }

    public function execute(string $checkIn, string $checkOut, ?int $roomTypeId = null): Collection
    {
        return $this->availabilityService->getAvailableRooms(
            Carbon::parse($checkIn),
            Carbon::parse($checkOut),
            $roomTypeId
        );
    }
}
