<?php

namespace App\Enums;

enum UserRole: string
{
    case ADMIN = 'admin';
    case RECEPTIONIST = 'receptionist';
    case HOUSEKEEPING = 'housekeeping';
    case CUSTOMER = 'customer';

    public function label(): string
    {
        return match($this) {
            self::ADMIN => 'Administrator',
            self::RECEPTIONIST => 'Receptionist',
            self::HOUSEKEEPING => 'Housekeeping staff',
            self::CUSTOMER => 'Customer / Guest',
        };
    }
}
