<?php

namespace App\Policies;

use App\Models\User;
use App\Models\ContactMessage;
use App\Enums\UserRole;
use Illuminate\Auth\Access\HandlesAuthorization;

class ContactMessagePolicy
{
    use HandlesAuthorization;

    public function before(User $user, string $ability): ?bool
    {
        if ($user->role === UserRole::ADMIN) {
            return true;
        }
        return null;
    }

    public function viewAny(User $user): bool
    {
        return false;
    }

    public function view(User $user, ContactMessage $contactMessage): bool
    {
        return false;
    }

    public function create(User $user): bool
    {
        return false;
    }

    public function update(User $user, ContactMessage $contactMessage): bool
    {
        return false;
    }

    public function delete(User $user, ContactMessage $contactMessage): bool
    {
        return false;
    }

    public function deleteAny(User $user): bool
    {
        return false;
    }
}
