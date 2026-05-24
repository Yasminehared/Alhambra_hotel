<?php

namespace App\Filament\Resources;

use App\Filament\Resources\CustomerResource\Pages;
use App\Models\Customer;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class CustomerResource extends Resource
{
    protected static ?string $model = Customer::class;

    protected static ?string $navigationIcon = 'heroicon-o-users';

    protected static ?string $navigationGroup = 'Hotel Management';

    protected static ?string $recordTitleAttribute = 'email';

    protected static ?int $navigationSort = 3;

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Section::make('Personal Information')
                    ->description('Primary customer profile details.')
                    ->schema([
                        Forms\Components\Grid::make(2)->schema([
                            Forms\Components\TextInput::make('first_name')
                                ->required()
                                ->placeholder('e.g. Yasmine')
                                ->maxLength(255),
                            Forms\Components\TextInput::make('last_name')
                                ->required()
                                ->placeholder('e.g. Hared')
                                ->maxLength(255),
                        ]),

                        Forms\Components\Grid::make(3)->schema([
                            Forms\Components\TextInput::make('nationality')
                                ->placeholder('e.g. Moroccan')
                                ->maxLength(255),
                            Forms\Components\TextInput::make('country_code')
                                ->placeholder('e.g. MA')
                                ->maxLength(5)
                                ->label('Country ISO Code'),
                            Forms\Components\TextInput::make('passport_number')
                                ->placeholder('e.g. AB123456')
                                ->maxLength(255),
                        ]),
                    ]),

                Forms\Components\Section::make('Contact & System Binding')
                    ->description('Contact channels and links to their user login accounts.')
                    ->schema([
                        Forms\Components\Grid::make(3)->schema([
                            Forms\Components\TextInput::make('email')
                                ->email()
                                ->required()
                                ->placeholder('e.g. customer@example.com')
                                ->maxLength(255),
                            Forms\Components\TextInput::make('phone')
                                ->tel()
                                ->placeholder('e.g. +212 661 123456')
                                ->maxLength(255),
                            Forms\Components\Select::make('user_id')
                                ->relationship('user', 'name')
                                ->preload()
                                ->searchable()
                                ->label('Associated Portal User')
                                ->helperText('Link to a portal login account if registered.'),
                        ]),
                    ]),

                Forms\Components\Section::make('Classification & Notes')
                    ->schema([
                        Forms\Components\Toggle::make('is_vip')
                            ->label('VIP Status')
                            ->helperText('Flagging this customer will highlight all their reservations on the timeline.')
                            ->default(false),
                        Forms\Components\Textarea::make('notes')
                            ->placeholder('Special preferences, allergies, security requests...')
                            ->columnSpanFull()
                            ->rows(3),
                    ]),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('fullName')
                    ->label('Guest Name')
                    ->searchable(['first_name', 'last_name'])
                    ->sortable(['first_name'])
                    ->weight('bold'),
                Tables\Columns\TextColumn::make('email')
                    ->searchable()
                    ->sortable(),
                Tables\Columns\TextColumn::make('phone')
                    ->searchable()
                    ->sortable(),
                Tables\Columns\TextColumn::make('nationality')
                    ->searchable()
                    ->sortable(),
                Tables\Columns\TextColumn::make('passport_number')
                    ->label('Passport')
                    ->searchable()
                    ->toggleable(isToggledHiddenByDefault: true),
                Tables\Columns\IconColumn::make('is_vip')
                    ->boolean()
                    ->label('VIP')
                    ->sortable()
                    ->alignCenter(),
                Tables\Columns\TextColumn::make('reservations_count')
                    ->label('Bookings')
                    ->badge()
                    ->color('info')
                    ->alignCenter(),
            ])
            ->defaultSort('created_at', 'desc')
            ->filters([
                Tables\Filters\TernaryFilter::make('is_vip')
                    ->label('VIP Status Only'),
                Tables\Filters\Filter::make('has_user')
                    ->query(fn ($query) => $query->whereNotNull('user_id'))
                    ->label('Has Web Account'),
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
            'index' => Pages\ListCustomers::route('/'),
            'create' => Pages\CreateCustomer::route('/create'),
            'edit' => Pages\EditCustomer::route('/{record}/edit'),
        ];
    }
}
