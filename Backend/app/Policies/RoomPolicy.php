<?php

namespace App\Policies;

use App\Models\User;
use App\Models\Room;
use App\Enums\UserRole;
use Illuminate\Auth\Access\HandlesAuthorization;

class RoomPolicy
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
            || $user->can('view_any_room');
    }

    public function view(User $user, Room $room): bool
    {
        return $user->role === UserRole::RECEPTIONIST 
            || $user->role === UserRole::HOUSEKEEPING
            || $user->can('view_room');
    }

    public function create(User $user): bool
    {
        return $user->can('create_room');
    }

    public function update(User $user, Room $room): bool
    {
        return $user->role === UserRole::RECEPTIONIST 
            || $user->role === UserRole::HOUSEKEEPING
            || $user->can('update_room');
    }

    public function delete(User $user, Room $room): bool
    {
        return $user->can('delete_room');
    }

    public function deleteAny(User $user): bool
    {
        return $user->can('delete_any_room');
    }
}
