<?php

namespace App\Actions;

use App\Models\Reservation;
use App\Services\ReservationService;

class CreateReservationAction
{
    protected ReservationService $reservationService;

    public function __construct(ReservationService $reservationService)
    {
        $this->reservationService = $reservationService;
    }

    public function execute(array $data, array $roomIds): Reservation
    {
        return $this->reservationService->createReservation($data, $roomIds);
    }
}
