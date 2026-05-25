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

    protected function handleRecordUpdate(\Illuminate\Database\Eloquent\Model $record, array $data): \Illuminate\Database\Eloquent\Model
    {
        $roomIds = $data['rooms'] ?? [];
        unset($data['rooms']);

        try {
            \Illuminate\Support\Facades\DB::transaction(function () use ($record, $data, $roomIds) {
                // Update reservation fields (including check-in / check-out dates)
                $record->update($data);

                // Re-assign rooms (which checks availability and updates prices)
                app(\App\Actions\AssignRoomAction::class)->execute($record, $roomIds);
            });

            return $record;
        } catch (\Exception $e) {
            \Filament\Notifications\Notification::make()
                ->danger()
                ->title('Update Failed')
                ->body($e->getMessage())
                ->send();

            $this->halt();
        }
    }
}
