<?php

namespace App\Policies;

use App\Models\User;
use App\Models\Reservation;
use App\Enums\UserRole;
use Illuminate\Auth\Access\HandlesAuthorization;

class ReservationPolicy
{
    use HandlesAuthorization;

    public function before(User $user, string $ability): ?bool
    {
        if ($user->role === UserRole::ADMIN || $user->hasRole('admin')) {
            return true;
        }
        return null;
    }

    public function viewAny(User $user): bool
    {
        return $user->role === UserRole::RECEPTIONIST 
            || $user->can('view_any_reservation');
    }

    public function view(User $user, Reservation $reservation): bool
    {
        return $user->role === UserRole::RECEPTIONIST 
            || $user->can('view_reservation');
    }

    public function create(User $user): bool
    {
        return $user->role === UserRole::RECEPTIONIST 
            || $user->can('create_reservation');
    }

    public function update(User $user, Reservation $reservation): bool
    {
        return $user->role === UserRole::RECEPTIONIST 
            || $user->can('update_reservation');
    }

    public function delete(User $user, Reservation $reservation): bool
    {
        return $user->can('delete_reservation');
    }

    public function deleteAny(User $user): bool
    {
        return $user->can('delete_any_reservation');
    }
}
