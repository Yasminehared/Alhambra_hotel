<?php

namespace App\Filament\Resources\ReservationResource\Pages;

use App\Filament\Resources\ReservationResource;
use App\Models\Reservation;
use Filament\Resources\Pages\CreateRecord;
use Filament\Notifications\Notification;

class CreateReservation extends CreateRecord
{
    protected static string $resource = ReservationResource::class;

    protected function handleRecordCreation(array $data): \Illuminate\Database\Eloquent\Model
    {
        $roomIds = $data['rooms'] ?? [];
        unset($data['rooms']);

        try {
            return app(\App\Services\ReservationService::class)->createReservation($data, $roomIds);
        } catch (\Exception $e) {
            \Filament\Notifications\Notification::make()
                ->danger()
                ->title('Booking Failed')
                ->body($e->getMessage())
                ->send();

            $this->halt();
        }
    }
}
