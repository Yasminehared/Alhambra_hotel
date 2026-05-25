<?php

namespace App\Filament\Widgets;

use App\Enums\RoomStatus;
use App\Models\Room;
use Filament\Widgets\StatsOverviewWidget as BaseWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;

class OccupancyRateWidget extends BaseWidget
{
    protected static ?int $sort = 1;

    protected function getStats(): array
    {
        $totalRooms = Room::where('is_active', true)->count();
        $occupiedRooms = Room::where('is_active', true)->where('status', RoomStatus::OCCUPIED)->count();
        $availableRooms = Room::where('is_active', true)->where('status', RoomStatus::AVAILABLE)->count();
        $maintenanceRooms = Room::where('is_active', true)->where('status', RoomStatus::MAINTENANCE)->count();

        $occupancyRate = $totalRooms > 0 ? round(($occupiedRooms / $totalRooms) * 100, 1) : 0;

        return [
            Stat::make('Occupancy Rate', "{$occupancyRate}%")
                ->description('Active guest occupancy rate')
                ->descriptionIcon('heroicon-m-arrow-trending-up')
                ->color($occupancyRate > 70 ? 'success' : ($occupancyRate > 30 ? 'warning' : 'info')),
            Stat::make('Available Rooms', $availableRooms)
                ->description('Rooms clean & ready for booking')
                ->descriptionIcon('heroicon-m-key')
                ->color('success'),
            Stat::make('Rooms in Maintenance', $maintenanceRooms)
                ->description('Rooms blocked for repairs')
                ->descriptionIcon('heroicon-m-wrench-screwdriver')
                ->color('warning'),
        ];
    }
}
