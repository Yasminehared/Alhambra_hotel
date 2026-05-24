<?php

namespace App\Filament\Resources\ReservationResource\Pages;

use App\Filament\Resources\ReservationResource;
use App\Models\Reservation;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;
use Filament\Notifications\Notification;

class EditReservation extends EditRecord
{
    protected static string $resource = ReservationResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }

    protected function beforeSave(): void
    {
        $data = $this->data;

        $hasOverlap = Reservation::overlapping(
            $data['room_id'],
            $data['check_in'],
            $data['check_out']
        )->where('id', '!=', $this->record->id)->exists();

        if ($hasOverlap) {
            Notification::make()
                ->danger()
                ->title('Double-Booking Prevented')
                ->body('The updated dates or room selection overlaps with an existing booking. Modification halted.')
                ->persistent()
                ->send();

            $this->halt();
        }
    }
}
