<?php

namespace App\Filament\Widgets;

use App\Enums\MaintenanceStatus;
use App\Models\MaintenanceTicket;
use Filament\Tables;
use Filament\Tables\Table;
use Filament\Widgets\TableWidget as BaseWidget;

class MaintenanceAlertsWidget extends BaseWidget
{
    protected static ?int $sort = 4;

    protected int | string | array $columnSpan = 'full';

    public function table(Table $table): Table
    {
        return $table
            ->query(
                MaintenanceTicket::query()
                    ->where('blocks_room', true)
                    ->whereIn('status', [MaintenanceStatus::PENDING, MaintenanceStatus::IN_PROGRESS])
                    ->with('room')
            )
            ->columns([
                Tables\Columns\TextColumn::make('room.room_number')
                    ->label('Room Number')
                    ->weight('bold')
                    ->alignCenter(),
                Tables\Columns\TextColumn::make('title')
                    ->label('Issue Description')
                    ->searchable(),
                Tables\Columns\TextColumn::make('priority')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'low' => 'gray',
                        'medium' => 'info',
                        'high' => 'warning',
                        'critical' => 'danger',
                        default => 'gray',
                    })
                    ->formatStateUsing(fn ($state) => ucfirst($state))
                    ->alignCenter(),
                Tables\Columns\TextColumn::make('status')
                    ->badge()
                    ->color(fn ($state): string => match ($state?->value ?? $state) {
                        'pending' => 'warning',
                        'in_progress' => 'info',
                        default => 'gray',
                    })
                    ->formatStateUsing(fn ($state) => ucfirst($state?->value ?? $state))
                    ->alignCenter(),
                Tables\Columns\TextColumn::make('reported_at')
                    ->dateTime('M d, H:i')
                    ->label('Reported At'),
            ])
            ->heading('Active Room-Blocking Maintenance Issues');
    }
}
