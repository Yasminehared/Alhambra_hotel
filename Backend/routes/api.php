<?php

// routes/api.php
use App\Http\Controllers\Api\ReservationController;
use App\Http\Controllers\Api\RoomController;
use App\Http\Controllers\Api\MaintenanceController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\ContactMessageController;
use Illuminate\Support\Facades\Route;

// ─── Public Auth Routes ────────────────────────────────────────────────────
Route::post('/login',    [AuthController::class, 'login'])->middleware('throttle:5,1');
Route::post('/register', [AuthController::class, 'register'])->middleware('throttle:5,1');

// /me is intentionally public — returns null user for guest sessions (used by AuthContext on boot)
Route::get('/me', [AuthController::class, 'me']);

// ─── Public Guest Catalog & Booking APIs ──────────────────────────────────
Route::post('/reservations', [ReservationController::class, 'store'])->middleware('throttle:10,1');
Route::get('/room-types',    [RoomController::class, 'roomTypes']);
Route::get('/room-types/{slug}', [RoomController::class, 'roomTypeDetail']);
Route::post('/contact',      [ContactMessageController::class, 'store'])->middleware('throttle:10,1');

// ─── Protected Routes (Requires Active Session) ───────────────────────────
Route::middleware('auth')->group(function () {
    // Logout requires an active session
    Route::post('/logout', [AuthController::class, 'logout']);

    // Current user profile
    Route::put('/profile', [UserController::class, 'updateProfile']);

    // Reservation operations
    Route::get('/reservations',                              [ReservationController::class, 'index']);
    Route::put('/reservations/{reservation}/check-in',       [ReservationController::class, 'checkIn']);
    Route::put('/reservations/{reservation}/check-out',      [ReservationController::class, 'checkOut']);
    Route::put('/reservations/{reservation}/cancel',         [ReservationController::class, 'cancel']);
    Route::put('/reservations/{reservation}/confirm',        [ReservationController::class, 'confirm']);

    // Room management
    Route::get('/rooms',        [RoomController::class, 'index']);
    Route::put('/rooms/{room}', [RoomController::class, 'update']);

    // Maintenance tickets
    Route::get('/maintenance-tickets',              [MaintenanceController::class, 'index']);
    Route::post('/maintenance-tickets',             [MaintenanceController::class, 'store']);
    Route::put('/maintenance-tickets/{ticket}',     [MaintenanceController::class, 'update']);

    // Contact messages inbox (admin / receptionist)
    Route::get('/contact-messages',                           [ContactMessageController::class, 'index']);
    Route::put('/contact-messages/{message}/reply',           [ContactMessageController::class, 'reply']);
    Route::delete('/contact-messages/{message}',              [ContactMessageController::class, 'destroy']);

    // Payments ledger (admin only)
    Route::get('/payments', function () {
        $user = request()->user();
        if (!$user || $user->role !== \App\Enums\UserRole::ADMIN) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }
        return response()->json(
            \App\Models\Payment::with('reservation.customer')->orderByDesc('created_at')->get()
        );
    });

    // User directory (admin only — enforced inside controller)
    Route::get('/users',                 [UserController::class, 'index']);
    Route::put('/users/{user}/role',     [UserController::class, 'updateRole']);
    Route::put('/users/{user}/block',    [UserController::class, 'toggleBlock']);
    Route::delete('/users/{user}',       [UserController::class, 'destroy']);
});

