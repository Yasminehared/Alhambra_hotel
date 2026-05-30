<?php

namespace App\Enums;

use Filament\Support\Contracts\HasLabel;
use Filament\Support\Contracts\HasColor;

enum UserRole: string implements HasLabel, HasColor
{
    case ADMIN = 'admin';
    case RECEPTIONIST = 'receptionist';
    case HOUSEKEEPING = 'housekeeping';
    case CUSTOMER = 'customer';

    public function getLabel(): ?string
    {
        return $this->label();
    }

    public function getColor(): string|array|null
    {
        return $this->color();
    }

    public function label(): string
    {
        return match($this) {
            self::ADMIN        => 'Administrator',
            self::RECEPTIONIST => 'Receptionist',
            self::HOUSEKEEPING => 'Housekeeping Staff',
            self::CUSTOMER     => 'Customer / Guest',
        };
    }

    public function color(): string
    {
        return match($this) {
            self::ADMIN        => 'danger',
            self::RECEPTIONIST => 'success',
            self::HOUSEKEEPING => 'warning',
            self::CUSTOMER     => 'info',
        };
    }

    /** @return array<string, string> [value => label] for Filament selects */
    public static function options(): array
    {
        return array_column(
            array_map(fn (self $case) => ['value' => $case->value, 'label' => $case->label()], self::cases()),
            'label',
            'value'
        );
    }
}
