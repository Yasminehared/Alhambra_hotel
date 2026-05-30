<?php

namespace App\Filament\Resources;

use App\Filament\Resources\MaintenanceTicketResource\Pages;
use App\Models\MaintenanceTicket;
use App\Models\Room;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use App\Enums\MaintenanceStatus;

class MaintenanceTicketResource extends Resource
{
    protected static ?string $model = MaintenanceTicket::class;

    protected static ?string $navigationIcon = 'heroicon-o-wrench-screwdriver';

    protected static ?string $navigationGroup = 'Hotel Management';

    protected static ?string $recordTitleAttribute = 'title';

    protected static ?int $navigationSort = 5;

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Section::make('Ticket Details')
                    ->description('Specify room and issues that need repair.')
                    ->schema([
                        Forms\Components\Grid::make(2)->schema([
                            Forms\Components\Select::make('room_id')
                                ->relationship('room')
                                ->getOptionLabelFromRecordUsing(
                                    fn (Room $record) =>
                                        "Room {$record->room_number} — {$record->roomType->name} ({$record->status->label()})"
                                )
                                ->searchable()
                                ->preload()
                                ->required()
                                ->label('Affected Room'),
                            Forms\Components\TextInput::make('title')
                                ->required()
                                ->placeholder('e.g. AC leaking, Broken shower handle')
                                ->maxLength(255),
                        ]),

                        Forms\Components\Textarea::make('description')
                            ->placeholder('Describe the issue in detail to help our technicians...')
                            ->columnSpanFull()
                            ->rows(4),
                    ]),

                Forms\Components\Section::make('Assignments & Scheduling')
                    ->schema([
                        Forms\Components\Grid::make(3)->schema([
                            Forms\Components\Select::make('status')
                                ->required()
                                ->options(MaintenanceStatus::options())
                                ->native(false)
                                ->default(MaintenanceStatus::PENDING->value),
                            Forms\Components\Select::make('priority')
                                ->required()
                                ->options([
                                    'low' => 'Low Priority',
                                    'medium' => 'Medium Priority',
                                    'high' => 'High Priority',
                                    'critical' => 'Critical (Immediate attention)',
                                ])
                                ->native(false)
                                ->default('medium'),
                            Forms\Components\TextInput::make('assigned_to')
                                ->placeholder('e.g. Technician Khalid')
                                ->maxLength(255)
                                ->label('Assigned Technician'),
                        ]),

                        Forms\Components\Grid::make(2)->schema([
                            Forms\Components\DateTimePicker::make('reported_at')
                                ->required()
                                ->native(false)
                                ->default(now())
                                ->label('Reported At'),
                            Forms\Components\DateTimePicker::make('resolved_at')
                                ->native(false)
                                ->label('Resolved At'),
                        ]),

                        Forms\Components\Toggle::make('blocks_room')
                            ->label('Blocks Room from Reservations')
                            ->helperText('Enable this if the room is unrentable until this issue is resolved. This automatically moves the room to "Maintenance" status.')
                            ->default(true)
                            ->required(),
                    ]),

                Forms\Components\Section::make('Resolution Log')
                    ->schema([
                        Forms\Components\Textarea::make('resolution_notes')
                            ->placeholder('e.g. Replaced leaking valve. Re-tested and verified working.')
                            ->columnSpanFull()
                            ->rows(3)
                            ->label('Resolution Notes'),
                    ]),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('room.room_number')
                    ->label('Room')
                    ->sortable()
                    ->alignCenter()
                    ->weight('bold'),
                Tables\Columns\TextColumn::make('title')
                    ->searchable()
                    ->sortable(),
                Tables\Columns\TextColumn::make('status')
                    ->badge()
                    ->sortable()
                    ->alignCenter(),
                Tables\Columns\TextColumn::make('priority')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'low' => 'gray',
                        'medium' => 'info',
                        'high' => 'warning',
                        'critical' => 'danger',
                        default => 'gray',
                    })
                    ->formatStateUsing(fn (string $state): string => ucfirst($state))
                    ->sortable()
                    ->alignCenter(),
                Tables\Columns\TextColumn::make('assigned_to')
                    ->label('Assigned To')
                    ->searchable()
                    ->sortable(),
                Tables\Columns\IconColumn::make('blocks_room')
                    ->boolean()
                    ->label('Blocking')
                    ->sortable()
                    ->alignCenter(),
                Tables\Columns\TextColumn::make('reported_at')
                    ->dateTime('M d, H:i')
                    ->label('Reported')
                    ->sortable(),
                Tables\Columns\TextColumn::make('resolved_at')
                    ->dateTime('M d, H:i')
                    ->label('Resolved')
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->defaultSort('reported_at', 'desc')
            ->filters([
                Tables\Filters\SelectFilter::make('status')
                    ->options(MaintenanceStatus::options()),
                Tables\Filters\SelectFilter::make('priority')
                    ->options([
                        'low' => 'Low',
                        'medium' => 'Medium',
                        'high' => 'High',
                        'critical' => 'Critical',
                    ]),
                Tables\Filters\TernaryFilter::make('blocks_room')
                    ->label('Blocking Tickets Only'),
            ])
            ->actions([
                Tables\Actions\ActionGroup::make([
                    Tables\Actions\Action::make('mark_in_progress')
                        ->label('Mark In Progress')
                        ->icon('heroicon-o-play')
                        ->color('info')
                        ->visible(fn (MaintenanceTicket $record): bool => $record->status === MaintenanceStatus::PENDING)
                        ->action(function (MaintenanceTicket $record) {
                            try {
                                app(\App\Services\MaintenanceService::class)->updateStatus(
                                    $record,
                                    \App\Enums\MaintenanceStatus::IN_PROGRESS,
                                    auth()->user()
                                );
                                \Filament\Notifications\Notification::make()
                                    ->success()
                                    ->title('Ticket In Progress')
                                    ->body("Maintenance ticket has been marked in progress.")
                                    ->send();
                            } catch (\Exception $e) {
                                \Filament\Notifications\Notification::make()
                                    ->danger()
                                    ->title('Error')
                                    ->body($e->getMessage())
                                    ->send();
                            }
                        }),
                    Tables\Actions\Action::make('resolve')
                        ->label('Resolve Ticket')
                        ->icon('heroicon-o-check-circle')
                        ->color('success')
                        ->visible(fn (MaintenanceTicket $record): bool => in_array($record->status, [MaintenanceStatus::PENDING, MaintenanceStatus::IN_PROGRESS]))
                        ->form([
                            Forms\Components\Textarea::make('resolution_notes')
                                ->required()
                                ->placeholder('Provide resolution details...'),
                        ])
                        ->action(function (MaintenanceTicket $record, array $data) {
                            try {
                                app(\App\Services\MaintenanceService::class)->resolve(
                                    $record,
                                    $data['resolution_notes'],
                                    auth()->user()
                                );
                                \Filament\Notifications\Notification::make()
                                    ->success()
                                    ->title('Ticket Resolved')
                                    ->body("Maintenance ticket has been resolved.")
                                    ->send();
                            } catch (\Exception $e) {
                                \Filament\Notifications\Notification::make()
                                    ->danger()
                                    ->title('Error')
                                    ->body($e->getMessage())
                                    ->send();
                            }
                        }),
                    Tables\Actions\EditAction::make(),
                    Tables\Actions\DeleteAction::make(),
                ])
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getRelations(): array
    {
        return [];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListMaintenanceTickets::route('/'),
            'create' => Pages\CreateMaintenanceTicket::route('/create'),
            'edit' => Pages\EditMaintenanceTicket::route('/{record}/edit'),
        ];
    }
}
