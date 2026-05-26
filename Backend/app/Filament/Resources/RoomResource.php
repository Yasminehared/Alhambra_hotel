<?php

namespace App\Filament\Resources;

use App\Filament\Resources\RoomResource\Pages;
use App\Models\Room;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class RoomResource extends Resource
{
    protected static ?string $model = Room::class;

    protected static ?string $navigationIcon = 'heroicon-o-key';

    protected static ?string $navigationGroup = 'Hotel Management';

    protected static ?string $recordTitleAttribute = 'room_number';

    protected static ?int $navigationSort = 2;

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Section::make('Room Details')
                    ->description('Specify physical location and category within the palace.')
                    ->schema([
                        Forms\Components\Grid::make(3)->schema([
                            Forms\Components\Select::make('room_type_id')
                                ->relationship('roomType', 'name')
                                ->preload()
                                ->searchable()
                                ->required()
                                ->label(' / Category'),
                            Forms\Components\TextInput::make('room_number')
                                ->required()
                                ->placeholder('e.g. 104, V1')
                                ->maxLength(255),
                            Forms\Components\TextInput::make('floor')
                                ->required()
                                ->numeric()
                                ->default(1)
                                ->minValue(0)
                                ->label('Floor Number'),
                        ]),

                        Forms\Components\Grid::make(2)->schema([
                            Forms\Components\Select::make('status')
                                ->required()
                                ->options([
                                    'available' => 'Available (Clean & Ready)',
                                    'occupied' => 'Occupied (Guest inside)',
                                    'maintenance' => 'Maintenance (Repairing)',
                                    'out_of_service' => 'Out Of Service',
                                ])
                                ->native(false)
                                ->default('available'),
                            Forms\Components\Toggle::make('is_active')
                                ->label('Active & Rentable')
                                ->helperText('Disable to completely hide this room from front-office and booking channels.')
                                ->default(true)
                                ->required(),
                        ]),

                        Forms\Components\Select::make('amenities')
                            ->relationship('amenities', 'name')
                            ->multiple()
                            ->preload()
                            ->label('Amenities'),
                    ]),

                Forms\Components\Section::make('Staff Comments & Notes')
                    ->schema([
                        Forms\Components\Textarea::make('notes')
                            ->placeholder('e.g. Housekeeping mentions window issue. Extra pillows stored in closet.')
                            ->columnSpanFull()
                            ->rows(3),
                    ]),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('room_number')
                    ->searchable()
                    ->sortable()
                    ->weight('bold')
                    ->alignCenter(),
                Tables\Columns\TextColumn::make('roomType.name')
                    ->label('Category')
                    ->sortable()
                    ->searchable(),
                Tables\Columns\TextColumn::make('floor')
                    ->numeric()
                    ->sortable()
                    ->alignCenter(),
                Tables\Columns\TextColumn::make('status')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'available' => 'success',
                        'occupied' => 'danger',
                        'maintenance' => 'warning',
                        'out_of_service' => 'gray',
                        default => 'gray',
                    })
                    ->formatStateUsing(fn (string $state): string => match ($state) {
                        'available' => 'Available',
                        'occupied' => 'Occupied',
                        'maintenance' => 'Maintenance',
                        'out_of_service' => 'Out Of Service',
                        default => ucfirst($state),
                    })
                    ->sortable()
                    ->alignCenter(),
                Tables\Columns\IconColumn::make('is_active')
                    ->boolean()
                    ->label('Rentable')
                    ->sortable()
                    ->alignCenter(),
                Tables\Columns\TextColumn::make('updated_at')
                    ->dateTime('M d, Y H:i')
                    ->label('Last Updated')
                    ->sortable(),
            ])
            ->defaultSort('room_number', 'asc')
            ->filters([
                Tables\Filters\SelectFilter::make('room_type_id')
                    ->relationship('roomType', 'name')
                    ->label('Category'),
                Tables\Filters\SelectFilter::make('status')
                    ->options([
                        'available' => 'Available',
                        'occupied' => 'Occupied',
                        'maintenance' => 'Maintenance',
                        'out_of_service' => 'Out Of Service',
                    ]),
            ])
            ->actions([
                Tables\Actions\ActionGroup::make([
                    Tables\Actions\Action::make('put_in_maintenance')
                        ->label('Put in Maintenance')
                        ->icon('heroicon-o-wrench-screwdriver')
                        ->color('warning')
                        ->visible(fn (Room $record): bool => $record->status?->value === 'available')
                        ->form([
                            Forms\Components\TextInput::make('title')
                                ->required()
                                ->placeholder('e.g. AC Repair, Leak fix'),
                            Forms\Components\Select::make('priority')
                                ->options([
                                    'low' => 'Low',
                                    'medium' => 'Medium',
                                    'high' => 'High',
                                    'critical' => 'Critical',
                                ])
                                ->default('medium')
                                ->required(),
                            Forms\Components\Textarea::make('description')
                                ->placeholder('Add description (optional)'),
                            Forms\Components\Toggle::make('blocks_room')
                                ->label('Blocks Room from Bookings')
                                ->default(true),
                        ])
                        ->action(function (Room $record, array $data) {
                            try {
                                app(\App\Services\MaintenanceService::class)->openTicket(
                                    $record,
                                    $data['title'],
                                    $data['priority'],
                                    $data['description'],
                                    $data['blocks_room']
                                );
                                \Filament\Notifications\Notification::make()
                                    ->success()
                                    ->title('Maintenance Ticket Opened')
                                    ->body("Room {$record->room_number} is now in maintenance.")
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
            'index' => Pages\ListRooms::route('/'),
            'create' => Pages\CreateRoom::route('/create'),
            'edit' => Pages\EditRoom::route('/{record}/edit'),
        ];
    }
}
