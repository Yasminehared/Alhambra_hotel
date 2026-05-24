<?php

namespace App\Filament\Resources;

use App\Filament\Resources\ReservationResource\Pages;
use App\Models\Reservation;
use App\Models\Room;
use App\Models\Customer;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Forms\Get;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Validation\ValidationException;

class ReservationResource extends Resource
{
    protected static ?string $model = Reservation::class;

    protected static ?string $navigationIcon = 'heroicon-o-calendar-days';

    protected static ?string $navigationGroup = 'Hotel Management';

    protected static ?string $recordTitleAttribute = 'reference';

    protected static ?int $navigationSort = 4;

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Section::make('Reservation Metadata')
                    ->description('Automatically generated references and booking channels.')
                    ->schema([
                        Forms\Components\Grid::make(3)->schema([
                            Forms\Components\TextInput::make('reference')
                                ->disabled()
                                ->dehydrated(false)
                                ->placeholder('Generated on save...')
                                ->label('Reservation Reference'),
                            Forms\Components\Select::make('source')
                                ->required()
                                ->options([
                                    'direct' => 'Direct (Phone/Walk-in/Website)',
                                    'booking.com' => 'Booking.com',
                                    'expedia' => 'Expedia',
                                    'airbnb' => 'Airbnb',
                                ])
                                ->native(false)
                                ->default('direct'),
                            Forms\Components\Select::make('status')
                                ->required()
                                ->options([
                                    'pending' => 'Pending Confirmation',
                                    'confirmed' => 'Confirmed (Booked)',
                                    'checked_in' => 'Checked In (Active)',
                                    'checked_out' => 'Checked Out (Departed)',
                                    'cancelled' => 'Cancelled',
                                    'no_show' => 'No Show',
                                ])
                                ->native(false)
                                ->default('pending'),
                        ]),
                    ]),

                Forms\Components\Section::make('Guest & Room Selection')
                    ->description('Link this reservation to a customer profile and physical room.')
                    ->schema([
                        Forms\Components\Grid::make(2)->schema([
                            Forms\Components\Select::make('customer_id')
                                ->relationship('customer')
                                ->getOptionLabelFromRecordUsing(fn (Customer $record) => "{$record->first_name} {$record->last_name} ({$record->email})")
                                ->searchable()
                                ->preload()
                                ->required()
                                ->label('Select Guest Profile'),
                            Forms\Components\Select::make('room_id')
                                ->relationship('room')
                                ->getOptionLabelFromRecordUsing(fn (Room $record) => "Room {$record->room_number} — {$record->roomType->name} ({$record->status})")
                                ->searchable()
                                ->preload()
                                ->required()
                                ->label('Select Physical Room')
                                ->helperText('Only available rooms can be booked. Ensure dates do not overlap.'),
                        ]),

                        Forms\Components\Grid::make(2)->schema([
                            Forms\Components\DatePicker::make('check_in')
                                ->required()
                                ->native(false)
                                ->live()
                                ->label('Arrival Date (Check-in)'),
                            Forms\Components\DatePicker::make('check_out')
                                ->required()
                                ->native(false)
                                ->live()
                                ->after('check_in')
                                ->label('Departure Date (Check-out)'),
                        ]),

                        Forms\Components\Grid::make(2)->schema([
                            Forms\Components\TextInput::make('adults')
                                ->required()
                                ->numeric()
                                ->default(1)
                                ->minValue(1)
                                ->placeholder('Adults count'),
                            Forms\Components\TextInput::make('children')
                                ->required()
                                ->numeric()
                                ->default(0)
                                ->minValue(0)
                                ->placeholder('Children count'),
                        ]),
                    ]),

                Forms\Components\Section::make('Payment & Financials')
                    ->schema([
                        Forms\Components\Grid::make(3)->schema([
                            Forms\Components\TextInput::make('total_price')
                                ->required()
                                ->numeric()
                                ->prefix('MAD')
                                ->placeholder('e.g. 9000.00'),
                            Forms\Components\TextInput::make('amount_paid')
                                ->required()
                                ->numeric()
                                ->default(0)
                                ->prefix('MAD')
                                ->placeholder('e.g. 4500.00'),
                            Forms\Components\Select::make('payment_status')
                                ->required()
                                ->options([
                                    'unpaid' => 'Unpaid',
                                    'partial' => 'Partial Payment',
                                    'paid' => 'Fully Paid',
                                    'refunded' => 'Refunded',
                                ])
                                ->native(false)
                                ->default('unpaid'),
                        ]),

                        Forms\Components\Select::make('payment_method')
                            ->options([
                                'cash' => 'Cash',
                                'card' => 'Credit/Debit Card',
                                'bank_transfer' => 'Bank Transfer',
                                'online' => 'Online Gateway Payment',
                            ])
                            ->native(false)
                            ->nullable()
                            ->label('Payment Method Used'),
                    ]),

                Forms\Components\Section::make('Additional Information & Staff Notes')
                    ->schema([
                        Forms\Components\Textarea::make('special_requests')
                            ->placeholder('e.g. Early check-in requested. Honeymoon setting. Extra towels.')
                            ->columnSpanFull()
                            ->rows(3)
                            ->label('Special Guest Requests'),
                        Forms\Components\Textarea::make('internal_notes')
                            ->placeholder('Confidential staff comments, flight numbers, VIP warnings...')
                            ->columnSpanFull()
                            ->rows(3)
                            ->label('Internal Office Notes'),
                    ]),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('reference')
                    ->searchable()
                    ->sortable()
                    ->weight('bold'),
                Tables\Columns\TextColumn::make('customer')
                    ->label('Guest Name')
                    ->formatStateUsing(fn ($record) => $record->customer->first_name . ' ' . $record->customer->last_name)
                    ->searchable(['first_name', 'last_name'])
                    ->sortable(),
                Tables\Columns\TextColumn::make('room.room_number')
                    ->label('Room')
                    ->sortable()
                    ->alignCenter(),
                Tables\Columns\TextColumn::make('check_in')
                    ->date('M d, Y')
                    ->sortable(),
                Tables\Columns\TextColumn::make('check_out')
                    ->date('M d, Y')
                    ->sortable(),
                Tables\Columns\TextColumn::make('duration_in_nights')
                    ->label('Nights')
                    ->alignCenter(),
                Tables\Columns\TextColumn::make('status')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'pending' => 'warning',
                        'confirmed' => 'info',
                        'checked_in' => 'success',
                        'checked_out' => 'gray',
                        'cancelled' => 'danger',
                        'no_show' => 'danger',
                        default => 'gray',
                    })
                    ->formatStateUsing(fn (string $state): string => match ($state) {
                        'pending' => 'Pending',
                        'confirmed' => 'Confirmed',
                        'checked_in' => 'Checked In',
                        'checked_out' => 'Checked Out',
                        'cancelled' => 'Cancelled',
                        'no_show' => 'No Show',
                        default => ucfirst($state),
                    })
                    ->sortable()
                    ->alignCenter(),
                Tables\Columns\TextColumn::make('total_price')
                    ->money('MAD')
                    ->sortable()
                    ->alignEnd(),
                Tables\Columns\TextColumn::make('payment_status')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'unpaid' => 'danger',
                        'partial' => 'warning',
                        'paid' => 'success',
                        'refunded' => 'gray',
                        default => 'gray',
                    })
                    ->formatStateUsing(fn (string $state): string => ucfirst($state))
                    ->sortable()
                    ->alignCenter(),
            ])
            ->defaultSort('created_at', 'desc')
            ->filters([
                Tables\Filters\SelectFilter::make('status')
                    ->options([
                        'pending' => 'Pending',
                        'confirmed' => 'Confirmed',
                        'checked_in' => 'Checked In',
                        'checked_out' => 'Checked Out',
                        'cancelled' => 'Cancelled',
                        'no_show' => 'No Show',
                    ]),
                Tables\Filters\SelectFilter::make('payment_status')
                    ->options([
                        'unpaid' => 'Unpaid',
                        'partial' => 'Partial',
                        'paid' => 'Paid',
                        'refunded' => 'Refunded',
                    ]),
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),
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
            'index' => Pages\ListReservations::route('/'),
            'create' => Pages\CreateReservation::route('/create'),
            'edit' => Pages\EditReservation::route('/{record}/edit'),
        ];
    }
}
