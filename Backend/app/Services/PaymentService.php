<?php

namespace App\Services;

use App\Enums\PaymentStatus;
use App\Models\Payment;
use App\Models\Reservation;
use Illuminate\Support\Facades\DB;

class PaymentService
{
    /**
     * Record a new payment against a reservation.
     * Automatically recalculates and updates reservation payment_status.
     */
    public function recordPayment(
        Reservation $reservation,
        float $amount,
        string $paymentMethod,
        ?string $notes = null
    ): Payment {
        return DB::transaction(function () use ($reservation, $amount, $paymentMethod, $notes) {
            $payment = Payment::create([
                'reservation_id' => $reservation->id,
                'amount'         => $amount,
                'payment_method' => $paymentMethod,
                'payment_status' => PaymentStatus::PAID,
                'notes'          => $notes,
                'paid_at'        => now(),
            ]);

            $this->syncPaymentStatus($reservation);

            return $payment;
        });
    }

    /**
     * Recalculate and sync the reservation's payment_status based on all payments.
     */
    public function syncPaymentStatus(Reservation $reservation): void
    {
        $totalPaid = $reservation->payments()
            ->where('payment_status', PaymentStatus::PAID)
            ->sum('amount');

        $reservation->amount_paid = $totalPaid;

        $status = match(true) {
            $totalPaid <= 0                                 => PaymentStatus::UNPAID,
            $totalPaid >= (float) $reservation->total_price => PaymentStatus::PAID,
            default                                         => PaymentStatus::PARTIAL,
        };

        $reservation->payment_status = $status;
        $reservation->save();
    }

    /**
     * Process a refund for a reservation.
     */
    public function refund(Reservation $reservation, float $amount, ?string $notes = null): Payment
    {
        return DB::transaction(function () use ($reservation, $amount, $notes) {
            $payment = Payment::create([
                'reservation_id' => $reservation->id,
                'amount'         => -abs($amount),
                'payment_method' => 'refund',
                'payment_status' => PaymentStatus::REFUNDED,
                'notes'          => $notes,
                'paid_at'        => now(),
            ]);

            $this->syncPaymentStatus($reservation);

            return $payment;
        });
    }
}
