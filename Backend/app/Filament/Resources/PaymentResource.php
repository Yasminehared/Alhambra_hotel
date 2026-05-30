<?php

namespace App\Filament\Resources;

use App\Filament\Resources\PaymentResource\Pages;
use App\Models\Payment;
use App\Enums\PaymentStatus;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class PaymentResource extends Resource
{
    protected static ?string $model = Payment::class;

    protected static ?string $navigationIcon = 'heroicon-o-credit-card';

    protected static ?string $navigationGroup = 'Finance';

    protected static ?int $navigationSort = 1;

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Section::make('Payment Information')
                    ->description('Details of the financial transaction.')
                    ->schema([
                        Forms\Components\Grid::make(2)->schema([
                            Forms\Components\Select::make('reservation_id')
                                ->relationship('reservation', 'reference')
                                ->getOptionLabelFromRecordUsing(fn ($record) => "{$record->reference} — {$record->customer->first_name} {$record->customer->last_name}")
                                ->searchable()
                                ->preload()
                                ->required()
                                ->label('Reservation'),
                            Forms\Components\TextInput::make('amount')
                                ->numeric()
                                ->prefix('MAD')
                                ->required()
                                ->label('Amount'),
                        ]),
                        Forms\Components\Grid::make(3)->schema([
                            Forms\Components\Select::make('payment_method')
                                ->options([
                                    'cash' => 'Cash',
                                    'card' => 'Credit/Debit Card',
                                    'bank_transfer' => 'Bank Transfer',
                                    'online' => 'Online Gateway Payment',
                                    'refund' => 'Refund',
                                ])
                                ->native(false)
                                ->required()
                                ->label('Payment Method'),
                            Forms\Components\Select::make('payment_status')
                                ->options(PaymentStatus::options())
                                ->native(false)
                                ->required()
                                ->default(PaymentStatus::PAID->value)
                                ->label('Status'),
                            Forms\Components\DateTimePicker::make('paid_at')
                                ->default(now())
                                ->native(false)
                                ->required()
                                ->label('Paid At'),
                        ]),
                        Forms\Components\Textarea::make('notes')
                            ->placeholder('Payment notes...')
                            ->columnSpanFull()
                            ->rows(3),
                    ])
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('transaction_reference')
                    ->searchable()
                    ->sortable()
                    ->weight('bold')
                    ->label('Reference'),
                Tables\Columns\TextColumn::make('reservation.reference')
                    ->searchable()
                    ->sortable()
                    ->label('Reservation'),
                Tables\Columns\TextColumn::make('reservation.customer')
                    ->label('Guest')
                    ->formatStateUsing(fn ($record) => $record->reservation?->customer?->first_name . ' ' . $record->reservation?->customer?->last_name),
                Tables\Columns\TextColumn::make('amount')
                    ->money('MAD')
                    ->sortable()
                    ->alignEnd(),
                Tables\Columns\TextColumn::make('payment_method')
                    ->badge()
                    ->color('info')
                    ->formatStateUsing(fn ($state) => ucfirst($state))
                    ->sortable()
                    ->alignCenter(),
                Tables\Columns\TextColumn::make('payment_status')
                    ->badge()
                    ->sortable()
                    ->alignCenter(),
                Tables\Columns\TextColumn::make('paid_at')
                    ->dateTime('M d, Y H:i')
                    ->sortable(),
            ])
            ->defaultSort('created_at', 'desc')
            ->filters([
                Tables\Filters\SelectFilter::make('payment_method')
                    ->options([
                        'cash' => 'Cash',
                        'card' => 'Credit/Debit Card',
                        'bank_transfer' => 'Bank Transfer',
                        'online' => 'Online Gateway',
                        'refund' => 'Refund',
                    ]),
                Tables\Filters\SelectFilter::make('payment_status')
                    ->options(PaymentStatus::options()),
            ])
            ->actions([
                Tables\Actions\ActionGroup::make([
                    Tables\Actions\Action::make('refund')
                        ->label('Process Refund')
                        ->icon('heroicon-o-arrow-path')
                        ->color('danger')
                        ->visible(fn (Payment $record): bool => $record->amount > 0 && $record->payment_status === PaymentStatus::PAID)
                        ->form([
                            Forms\Components\TextInput::make('amount')
                                ->numeric()
                                ->required()
                                ->maxValue(fn (Payment $record) => (float)$record->amount)
                                ->label('Refund Amount (MAD)'),
                            Forms\Components\Textarea::make('notes')
                                ->placeholder('Reason for refund...'),
                        ])
                        ->action(function (Payment $record, array $data) {
                            try {
                                app(\App\Services\PaymentService::class)->refund(
                                    $record->reservation,
                                    (float) $data['amount'],
                                    $data['notes']
                                );
                                \Filament\Notifications\Notification::make()
                                    ->success()
                                    ->title('Refund Recorded')
                                    ->body('The refund has been successfully recorded.')
                                    ->send();
                            } catch (\Exception $e) {
                                \Filament\Notifications\Notification::make()
                                    ->danger()
                                    ->title('Refund Failed')
                                    ->body($e->getMessage())
                                    ->send();
                            }
                        }),
                    Tables\Actions\ViewAction::make(),
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
            'index' => Pages\ListPayments::route('/'),
            'create' => Pages\CreatePayment::route('/create'),
            'edit' => Pages\EditPayment::route('/{record}/edit'),
        ];
    }
}
