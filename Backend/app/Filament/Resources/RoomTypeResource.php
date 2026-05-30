<?php

namespace App\Filament\Resources;

use App\Filament\Resources\RoomTypeResource\Pages;
use App\Models\RoomType;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Forms\Set;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Support\Str;

class RoomTypeResource extends Resource
{
    protected static ?string $model = RoomType::class;

    protected static ?string $navigationIcon = 'heroicon-o-home-modern';

    protected static ?string $navigationGroup = 'Hotel Management';

    protected static ?string $recordTitleAttribute = 'name';

    protected static ?int $navigationSort = 1;

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Section::make('General Information')
                    ->description('Define the essential properties of this room type.')
                    ->schema([
                        Forms\Components\Grid::make(2)->schema([
                            Forms\Components\TextInput::make('name')
                                ->required()
                                ->live(onBlur: true)
                                ->afterStateUpdated(fn (Set $set, ?string $state) => $set('slug', Str::slug($state)))
                                ->placeholder('e.g. Royal Suite')
                                ->maxLength(255),
                            Forms\Components\TextInput::make('slug')
                                ->required()
                                ->unique(ignoreRecord: true)
                                ->maxLength(255)
                                ->placeholder('e.g. royal-suite'),
                        ]),

                        Forms\Components\Grid::make(3)->schema([
                            Forms\Components\Select::make('category')
                                ->required()
                                ->options([
                                    'room' => 'Room',
                                    'suite' => 'Suite',
                                    'villa' => 'Villa',
                                ])
                                ->native(false),
                            Forms\Components\TextInput::make('base_price')
                                ->required()
                                ->numeric()
                                ->prefix('MAD')
                                ->placeholder('e.g. 1800.00'),
                            Forms\Components\TextInput::make('capacity')
                                ->required()
                                ->numeric()
                                ->default(2)
                                ->minValue(1)
                                ->placeholder('Max guests'),
                        ]),
                    ]),

                Forms\Components\Section::make('Physical Details & Media')
                    ->description('Room size, list of amenities, and aesthetic image attachments.')
                    ->schema([
                        Forms\Components\Grid::make(2)->schema([
                            Forms\Components\TextInput::make('size_sqm')
                                ->numeric()
                                ->label('Size (m²)')
                                ->placeholder('e.g. 45')
                                ->suffix('m²'),
                            Forms\Components\TextInput::make('sort_order')
                                ->required()
                                ->numeric()
                                ->default(0)
                                ->label('Display Sort Order'),
                        ]),

                        Forms\Components\TagsInput::make('amenities')
                            ->placeholder('New amenity...')
                            ->separator(',')
                            ->columnSpanFull(),
                    Forms\Components\FileUpload::make('hero_image')
                        ->label('Hero Image (Main Card / Banner)')
                        ->image()
                        ->directory('gallery')
                        ->columnSpanFull(),

                    Forms\Components\FileUpload::make('images')
                        ->label('Gallery Images')
                        ->multiple()
                        ->image()
                        ->directory('gallery')
                        ->reorderable()
                        ->columnSpanFull()
                    ]),

                Forms\Components\Section::make('Descriptions & Status')
                    ->schema([
                        Forms\Components\Textarea::make('short_description')
                            ->placeholder('A brief 1-sentence sales pitch...')
                            ->maxLength(500)
                            ->columnSpanFull(),
                        Forms\Components\RichEditor::make('description')
                            ->placeholder('The rich storytelling description of this sanctuary...')
                            ->columnSpanFull(),
                        Forms\Components\Toggle::make('is_active')
                            ->label('Visible on Frontend')
                            ->default(true)
                            ->required(),
                    ]),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('name')
                    ->searchable()
                    ->sortable()
                    ->weight('bold'),
                Tables\Columns\TextColumn::make('category')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'room' => 'info',
                        'suite' => 'warning',
                        'villa' => 'success',
                        default => 'gray',
                    })
                    ->formatStateUsing(fn (string $state): string => ucfirst($state))
                    ->sortable(),
                Tables\Columns\TextColumn::make('base_price')
                    ->money('MAD')
                    ->sortable()
                    ->alignEnd(),
                Tables\Columns\TextColumn::make('capacity')
                    ->numeric()
                    ->label('Guests')
                    ->sortable()
                    ->alignCenter(),
                Tables\Columns\TextColumn::make('size_sqm')
                    ->label('Size')
                    ->suffix(' m²')
                    ->sortable()
                    ->alignCenter(),
                Tables\Columns\IconColumn::make('is_active')
                    ->boolean()
                    ->label('Active')
                    ->sortable()
                    ->alignCenter(),
                Tables\Columns\TextColumn::make('sort_order')
                    ->label('Order')
                    ->numeric()
                    ->sortable()
                    ->alignCenter(),
            ])
            ->defaultSort('sort_order', 'asc')
            ->filters([
                Tables\Filters\SelectFilter::make('category')
                    ->options([
                        'room' => 'Room',
                        'suite' => 'Suite',
                        'villa' => 'Villa',
                    ]),
                Tables\Filters\TernaryFilter::make('is_active')
                    ->label('Visible Active Only'),
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
            'index' => Pages\ListRoomTypes::route('/'),
            'create' => Pages\CreateRoomType::route('/create'),
            'edit' => Pages\EditRoomType::route('/{record}/edit'),
        ];
    }
}
