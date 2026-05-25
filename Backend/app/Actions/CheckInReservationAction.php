<?php

namespace App\Actions;

use App\Models\Reservation;
use App\Services\ReservationService;

class CheckInReservationAction
{
    protected ReservationService $reservationService;

    public function __construct(ReservationService $reservationService)
    {
        $this->reservationService = $reservationService;
    }

    public function execute(Reservation $reservation): void
    {
        $this->reservationService->checkIn($reservation);
    }
}
