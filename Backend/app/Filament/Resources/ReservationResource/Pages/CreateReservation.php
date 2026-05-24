<?php

namespace App\Filament\Resources\ReservationResource\Pages;

use App\Filament\Resources\ReservationResource;
use App\Models\Reservation;
use Filament\Resources\Pages\CreateRecord;
use Filament\Notifications\Notification;

class CreateReservation extends CreateRecord
{
    protected static string $resource = ReservationResource::class;

    protected function beforeCreate(): void
    {
        $data = $this->data;
        
        $hasOverlap = Reservation::overlapping(
            $data['room_id'],
            $data['check_in'],
            $data['check_out']
        )->exists();

        if ($hasOverlap) {
            Notification::make()
                ->danger()
                ->title('Double-Booking Prevented')
                ->body('The selected room is already booked for the chosen date range. Please select another room or alternative dates.')
                ->persistent()
                ->send();

            $this->halt();
        }
    }
}
