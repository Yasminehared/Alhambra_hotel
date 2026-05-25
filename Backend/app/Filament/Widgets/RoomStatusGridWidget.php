<?php

namespace App\Filament\Widgets;

use App\Models\Room;
use Filament\Widgets\Widget;

class RoomStatusGridWidget extends Widget
{
    protected static ?int $sort = 5;

    protected int | string | array $columnSpan = 'full';

    protected static string $view = 'filament.widgets.room-status-grid-widget';

    public function getRooms()
    {
        return Room::with('roomType')
            ->where('is_active', true)
            ->orderBy('room_number', 'asc')
            ->get();
    }
}
