<?php

namespace App\Policies;

use App\Models\User;
use App\Models\MaintenanceTicket;
use App\Enums\UserRole;
use Illuminate\Auth\Access\HandlesAuthorization;

class MaintenanceTicketPolicy
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
            || $user->role === UserRole::HOUSEKEEPING
            || $user->can('view_any_maintenance_ticket');
    }

    public function view(User $user, MaintenanceTicket $ticket): bool
    {
        return $user->role === UserRole::RECEPTIONIST 
            || $user->role === UserRole::HOUSEKEEPING
            || $user->can('view_maintenance_ticket');
    }

    public function create(User $user): bool
    {
        return $user->role === UserRole::RECEPTIONIST 
            || $user->role === UserRole::HOUSEKEEPING
            || $user->can('create_maintenance_ticket');
    }

    public function update(User $user, MaintenanceTicket $ticket): bool
    {
        return $user->role === UserRole::RECEPTIONIST 
            || $user->role === UserRole::HOUSEKEEPING
            || $user->can('update_maintenance_ticket');
    }

    public function delete(User $user, MaintenanceTicket $ticket): bool
    {
        return $user->can('delete_maintenance_ticket');
    }

    public function deleteAny(User $user): bool
    {
        return $user->can('delete_any_maintenance_ticket');
    }
}
