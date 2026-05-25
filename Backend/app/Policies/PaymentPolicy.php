<?php

namespace App\Policies;

use App\Models\User;
use App\Models\Payment;
use App\Enums\UserRole;
use Illuminate\Auth\Access\HandlesAuthorization;

class PaymentPolicy
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
            || $user->can('view_any_payment');
    }

    public function view(User $user, Payment $payment): bool
    {
        return $user->role === UserRole::RECEPTIONIST 
            || $user->can('view_payment');
    }

    public function create(User $user): bool
    {
        return $user->role === UserRole::RECEPTIONIST 
            || $user->can('create_payment');
    }

    public function update(User $user, Payment $payment): bool
    {
        return $user->can('update_payment');
    }

    public function delete(User $user, Payment $payment): bool
    {
        return $user->can('delete_payment');
    }

    public function deleteAny(User $user): bool
    {
        return $user->can('delete_any_payment');
    }
}
