<?php

namespace App\Filament\Widgets;

use App\Enums\PaymentStatus;
use App\Enums\ReservationStatus;
use App\Models\Payment;
use App\Models\Reservation;
use Filament\Widgets\StatsOverviewWidget as BaseWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;

class RevenueOverviewWidget extends BaseWidget
{
    protected static ?int $sort = 3;

    protected function getStats(): array
    {
        $startOfMonth = now()->startOfMonth();

        $monthCollected = Payment::where('payment_status', PaymentStatus::PAID)
            ->where('amount', '>', 0)
            ->whereDate('paid_at', '>=', $startOfMonth)
            ->sum('amount');

        $totalBookedRevenue = Reservation::whereIn('status', [
            ReservationStatus::CONFIRMED,
            ReservationStatus::CHECKED_IN,
            ReservationStatus::CHECKED_OUT,
        ])->sum('total_price');

        $totalCollectedOverall = Payment::where('payment_status', PaymentStatus::PAID)
            ->sum('amount');

        $outstandingRevenue = max(0, $totalBookedRevenue - $totalCollectedOverall);

        return [
            Stat::make('MTD Revenue Collected', number_format($monthCollected, 2) . ' MAD')
                ->description('Payments received this month')
                ->descriptionIcon('heroicon-m-banknotes')
                ->color('success'),
            Stat::make('Total Booked Revenue', number_format($totalBookedRevenue, 2) . ' MAD')
                ->description('All confirmed/active bookings total')
                ->descriptionIcon('heroicon-m-calendar')
                ->color('info'),
            Stat::make('Outstanding Balance', number_format($outstandingRevenue, 2) . ' MAD')
                ->description('Booked amount yet to be collected')
                ->descriptionIcon('heroicon-m-credit-card')
                ->color($outstandingRevenue > 0 ? 'warning' : 'success'),
        ];
    }
}
