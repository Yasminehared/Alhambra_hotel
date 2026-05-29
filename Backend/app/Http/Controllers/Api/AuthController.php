<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class AuthController extends Controller
{
    /**
     * Handle user authentication.
     */
    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email'    => ['required', 'email'],
            'password' => ['required'],
        ]);

        if (Auth::attempt($credentials)) {
            $user = Auth::user();

            if ($user->is_blocked) {
                Auth::guard('web')->logout();
                if ($request->hasSession()) {
                    $request->session()->invalidate();
                    $request->session()->regenerateToken();
                }
                return response()->json([
                    'success' => false,
                    'message' => 'Your account has been blocked. Please contact support.',
                ], 403);
            }

            // Regenerate session to prevent session fixation attacks
            if ($request->hasSession()) {
                $request->session()->regenerate();
            }

            // ─── Security Audit: Successful Login ─────────────────────────
            Log::channel('security')->info('Successful login', [
                'user_id'    => $user->id,
                'email'      => $user->email,
                'role'       => $user->role ? $user->role->value : 'customer',
                'ip'         => $request->ip(),
                'user_agent' => $request->userAgent(),
                'timestamp'  => now()->toIso8601String(),
            ]);

            return response()->json([
                'success' => true,
                'data' => [
                    'user' => [
                        'id'    => $user->id,
                        'name'  => $user->name,
                        'email' => $user->email,
                        'role'  => $user->role ? $user->role->value : 'customer',
                    ],
                ],
                'message' => 'Logged in successfully.',
            ]);
        }

        // ─── Security Audit: Failed Login Attempt ─────────────────────────
        Log::channel('security')->warning('Failed login attempt', [
            'email'      => $credentials['email'],
            'ip'         => $request->ip(),
            'user_agent' => $request->userAgent(),
            'timestamp'  => now()->toIso8601String(),
        ]);

        return response()->json([
            'success' => false,
            'message' => 'The provided credentials do not match our records.',
            'errors' => [
                'email' => ['The provided credentials do not match our records.'],
            ]
        ], 422);
    }

    /**
     * Handle user logout.
     */
    public function logout(Request $request)
    {
        $user = Auth::user();

        Auth::guard('web')->logout();

        if ($request->hasSession()) {
            $request->session()->invalidate();
            $request->session()->regenerateToken();
        }

        // ─── Security Audit: Logout ────────────────────────────────────────
        if ($user) {
            Log::channel('security')->info('User logged out', [
                'user_id'   => $user->id,
                'email'     => $user->email,
                'ip'        => $request->ip(),
                'timestamp' => now()->toIso8601String(),
            ]);
        }

        return response()->json([
            'success' => true,
            'message' => 'Logged out successfully.',
        ]);
    }

    /**
     * Retrieve the currently authenticated user session.
     */
    public function me(Request $request)
    {
        $user = Auth::user();

        if ($user) {
            $customer = \App\Models\Customer::where('user_id', $user->id)
                ->orWhere('email', $user->email)
                ->first();

            return response()->json([
                'success' => true,
                'data' => [
                    'user' => [
                        'id'              => $user->id,
                        'name'            => $user->name,
                        'email'           => $user->email,
                        'role'            => $user->role ? $user->role->value : 'customer',
                        'phone'           => $customer ? $customer->phone : '',
                        'nationality'     => $customer ? $customer->nationality : '',
                        'passport_number' => $customer ? $customer->passport_number : '',
                    ],
                ],
            ]);
        }

        return response()->json([
            'success' => false,
            'message' => 'Unauthenticated.',
        ], 401);
    }

    /**
     * Handle user registration.
     */
    public function register(Request $request)
    {
        $validated = $request->validate([
            'first_name' => ['required', 'string', 'max:255'],
            'last_name'  => ['required', 'string', 'max:255'],
            'email'      => ['required', 'string', 'email', 'max:255', 'unique:users,email'],
            'password'   => ['required', 'string', 'min:8', 'confirmed'],
        ]);

        $user = \App\Models\User::create([
            'name'     => $validated['first_name'] . ' ' . $validated['last_name'],
            'email'    => $validated['email'],
            'password' => bcrypt($validated['password']),
            'role'     => \App\Enums\UserRole::CUSTOMER,
        ]);

        // Find or create customer details
        \App\Models\Customer::updateOrCreate(
            ['email' => $validated['email']],
            [
                'user_id'    => $user->id,
                'first_name' => $validated['first_name'],
                'last_name'  => $validated['last_name'],
            ]
        );

        Auth::login($user);

        if ($request->hasSession()) {
            $request->session()->regenerate();
        }

        // Security Audit: User Registered
        Log::channel('security')->info('New user registered', [
            'user_id'    => $user->id,
            'email'      => $user->email,
            'ip'         => $request->ip(),
            'user_agent' => $request->userAgent(),
            'timestamp'  => now()->toIso8601String(),
        ]);

        return response()->json([
            'success' => true,
            'data' => [
                'user' => [
                    'id'    => $user->id,
                    'name'  => $user->name,
                    'email' => $user->email,
                    'role'  => 'customer',
                ],
            ],
            'message' => 'Registered successfully.',
        ], 201);
    }
}
