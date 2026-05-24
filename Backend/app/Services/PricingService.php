<?php

namespace App\Services;

use App\Models\Room;
use App\Models\RoomType;
use Carbon\Carbon;

class PricingService
{
    /**
     * Calculate total price for one or more rooms over a date range.
     *
     * @param array<int> $roomIds
     */
    public function calculate(array $roomIds, Carbon $checkIn, Carbon $checkOut): array
    {
        $nights = max(1, $checkIn->diffInDays($checkOut));
        $rooms = Room::with('roomType')->whereIn('id', $roomIds)->get();
        $breakdown = [];
        $total = 0;

        foreach ($rooms as $room) {
            $pricePerNight = (float) $room->roomType->base_price;
            $subtotal = $pricePerNight * $nights;
            $total += $subtotal;

            $breakdown[] = [
                'room_id'         => $room->id,
                'room_number'     => $room->room_number,
                'room_type'       => $room->roomType->name,
                'price_per_night' => $pricePerNight,
                'nights'          => $nights,
                'subtotal'        => round($subtotal, 2),
            ];
        }

        return [
            'nights'        => $nights,
            'rooms'         => $breakdown,
            'total'         => round($total, 2),
            'currency'      => 'MAD',
        ];
    }

    /**
     * Calculate price per night for a single room.
     */
    public function pricePerNight(Room $room): float
    {
        return (float) $room->roomType->base_price;
    }
}
