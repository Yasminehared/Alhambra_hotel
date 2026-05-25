<?php

namespace App\Filament\Resources\PaymentResource\Pages;

use App\Filament\Resources\PaymentResource;
use Filament\Actions;
use Filament\Resources\Pages\CreateRecord;

class CreatePayment extends CreateRecord
{
    protected static string $resource = PaymentResource::class;

    protected function handleRecordCreation(array $data): \Illuminate\Database\Eloquent\Model
    {
        $reservation = \App\Models\Reservation::findOrFail($data['reservation_id']);

        try {
            return app(\App\Services\PaymentService::class)->recordPayment(
                $reservation,
                (float) $data['amount'],
                $data['payment_method'],
                $data['notes'] ?? null
            );
        } catch (\Exception $e) {
            \Filament\Notifications\Notification::make()
                ->danger()
                ->title('Payment Recording Failed')
                ->body($e->getMessage())
                ->send();

            $this->halt();
        }
    }
}
