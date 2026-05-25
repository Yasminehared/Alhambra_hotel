<?php

namespace App\Filament\Widgets;

use App\Enums\ReservationStatus;
use App\Models\Reservation;
use Filament\Widgets\StatsOverviewWidget as BaseWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;

class ActiveReservationsWidget extends BaseWidget
{
    protected static ?int $sort = 2;

    protected function getStats(): array
    {
        $today = now()->startOfDay();

        $todayCheckIns = Reservation::whereDate('check_in', $today)
            ->whereIn('status', [ReservationStatus::CONFIRMED, ReservationStatus::CHECKED_IN])
            ->count();

        $todayCheckOuts = Reservation::whereDate('check_out', $today)
            ->where('status', ReservationStatus::CHECKED_IN)
            ->count();

        $activeGuests = Reservation::where('status', ReservationStatus::CHECKED_IN)->count();

        return [
            Stat::make('Today\'s Check-Ins', $todayCheckIns)
                ->description('Expected arrivals today')
                ->descriptionIcon('heroicon-m-arrow-right-end-on-rectangle')
                ->color('info'),
            Stat::make('Today\'s Check-Outs', $todayCheckOuts)
                ->description('Expected departures today')
                ->descriptionIcon('heroicon-m-arrow-left-start-on-rectangle')
                ->color('warning'),
            Stat::make('Active In-House Guests', $activeGuests)
                ->description('Guests currently in rooms')
                ->descriptionIcon('heroicon-m-user-group')
                ->color('success'),
        ];
    }
}
