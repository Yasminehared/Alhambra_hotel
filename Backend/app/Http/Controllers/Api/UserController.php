<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Customer;
use App\Enums\UserRole;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\Rule;

class UserController extends Controller
{
    /**
     * Display a listing of all users (Admin only).
     */
    public function index()
    {
        $user = Auth::user();
        if (!$user || $user->role !== UserRole::ADMIN) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        return response()->json(User::orderBy('name')->get());
    }

    /**
     * Update a user's role (Admin only).
     */
    public function updateRole(Request $request, User $user)
    {
        $admin = Auth::user();
        if (!$admin || $admin->role !== UserRole::ADMIN) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $validated = $request->validate([
            'role' => ['required', Rule::enum(UserRole::class)],
        ]);

        // Prevent admin from removing their own admin role
        if ($admin->id === $user->id && $validated['role'] !== 'admin') {
            return response()->json(['message' => 'You cannot demote yourself from Administrator.'], 400);
        }

        $user->update(['role' => $validated['role']]);

        Log::channel('security')->info('User role updated by admin', [
            'admin_id'   => $admin->id,
            'target_id'  => $user->id,
            'new_role'   => $validated['role'],
            'timestamp'  => now()->toIso8601String(),
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Role updated successfully.',
            'user'    => $user,
        ]);
    }

    /**
     * Toggle the blocked status of a user (Admin only).
     */
    public function toggleBlock(User $user)
    {
        $admin = Auth::user();
        if (!$admin || $admin->role !== UserRole::ADMIN) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        // Prevent admin from blocking themselves
        if ($admin->id === $user->id) {
            return response()->json(['message' => 'You cannot block your own administrator account.'], 400);
        }

        $user->update(['is_blocked' => !$user->is_blocked]);

        Log::channel('security')->warning('User block status toggled by admin', [
            'admin_id'   => $admin->id,
            'target_id'  => $user->id,
            'is_blocked' => $user->is_blocked,
            'timestamp'  => now()->toIso8601String(),
        ]);

        return response()->json([
            'success' => true,
            'message' => $user->is_blocked ? 'User blocked successfully.' : 'User unblocked successfully.',
            'user'    => $user,
        ]);
    }

    /**
     * Delete a user (Admin only).
     */
    public function destroy(User $user)
    {
        $admin = Auth::user();
        if (!$admin || $admin->role !== UserRole::ADMIN) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        // Prevent admin from deleting themselves
        if ($admin->id === $user->id) {
            return response()->json(['message' => 'You cannot delete your own administrator account.'], 400);
        }

        // The user_id constraint has nullOnDelete(), so the customer profile will persist.
        $user->delete();

        Log::channel('security')->warning('User account deleted by admin', [
            'admin_id'   => $admin->id,
            'target_id'  => $user->id,
            'timestamp'  => now()->toIso8601String(),
        ]);

        return response()->json([
            'success' => true,
            'message' => 'User deleted successfully.',
        ]);
    }

    /**
     * Update the currently authenticated user's profile.
     */
    public function updateProfile(Request $request)
    {
        $user = Auth::user();
        if (!$user) {
            return response()->json(['message' => 'Unauthenticated'], 401);
        }

        $validated = $request->validate([
            'name'             => ['required', 'string', 'max:255'],
            'email'            => ['required', 'string', 'email', 'max:255', Rule::unique('users')->ignore($user->id)],
            'phone'            => ['nullable', 'string', 'max:30'],
            'nationality'      => ['nullable', 'string', 'max:100'],
            'passport_number'  => ['nullable', 'string', 'max:50'],
            'password'         => ['nullable', 'string', 'min:8', 'confirmed'],
        ]);

        DB::beginTransaction();
        try {
            // Update User fields
            $user->name = $validated['name'];
            $user->email = $validated['email'];
            if (!empty($validated['password'])) {
                $user->password = Hash::make($validated['password']);
            }
            $user->save();

            // Find or create linked Customer
            $names = explode(' ', trim($validated['name']), 2);
            $firstName = $names[0];
            $lastName = $names[1] ?? $names[0];

            Customer::updateOrCreate(
                ['email' => $validated['email']],
                [
                    'user_id'         => $user->id,
                    'first_name'      => $firstName,
                    'last_name'       => $lastName,
                    'phone'           => $validated['phone'] ?? null,
                    'nationality'     => $validated['nationality'] ?? null,
                    'passport_number' => $validated['passport_number'] ?? null,
                ]
            );

            DB::commit();

            return response()->json([
                'success' => true,
                'data' => [
                    'user' => [
                        'id'    => $user->id,
                        'name'  => $user->name,
                        'email' => $user->email,
                        'role'  => $user->role ? $user->role->value : 'customer',
                    ]
                ],
                'message' => 'Profile updated successfully.'
            ]);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'success' => false,
                'message' => 'Failed to update profile: ' . $e->getMessage()
            ], 500);
        }
    }
}
