<?php

namespace App\Policies;

use App\Models\User;
use App\Models\Customer;
use App\Enums\UserRole;
use Illuminate\Auth\Access\HandlesAuthorization;

class CustomerPolicy
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
            || $user->can('view_any_customer');
    }

    public function view(User $user, Customer $customer): bool
    {
        return $user->role === UserRole::RECEPTIONIST 
            || $user->can('view_customer');
    }

    public function create(User $user): bool
    {
        return $user->role === UserRole::RECEPTIONIST 
            || $user->can('create_customer');
    }

    public function update(User $user, Customer $customer): bool
    {
        return $user->role === UserRole::RECEPTIONIST 
            || $user->can('update_customer');
    }

    public function delete(User $user, Customer $customer): bool
    {
        return $user->can('delete_customer');
    }

    public function deleteAny(User $user): bool
    {
        return $user->can('delete_any_customer');
    }
}
