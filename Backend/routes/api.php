<?php

// routes/api.php
use App\Http\Controllers\Api\ReservationController;
use App\Http\Controllers\Api\RoomController;
use App\Http\Controllers\Api\MaintenanceController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\ContactMessageController;
use Illuminate\Support\Facades\Route;

// Auth API
Route::post('/login',           [AuthController::class, 'login'])->middleware('throttle:5,1');
Route::post('/register',        [AuthController::class, 'register'])->middleware('throttle:5,1');
Route::post('/logout',          [AuthController::class, 'logout']);
Route::get('/me',               [AuthController::class, 'me']);

// Public Guest Catalog & Booking APIs
Route::post('/reservations',        [ReservationController::class, 'store'])->middleware('throttle:10,1');
Route::get('/room-types',           [RoomController::class, 'roomTypes']);
Route::get('/room-types/{slug}',     [RoomController::class, 'roomTypeDetail']);
Route::post('/contact',             [ContactMessageController::class, 'store'])->middleware('throttle:10,1');

// Protected Admin Console APIs (Requires Session Auth)
Route::middleware('auth')->group(function() {
    // Current user profile settings
    Route::put('/profile',         [UserController::class, 'updateProfile']);

    Route::get('/reservations',    [ReservationController::class, 'index']);
    Route::put('/reservations/{reservation}/check-in', [ReservationController::class, 'checkIn']);
    Route::put('/reservations/{reservation}/check-out', [ReservationController::class, 'checkOut']);
    Route::put('/reservations/{reservation}/cancel', [ReservationController::class, 'cancel']);
    Route::put('/reservations/{reservation}/confirm', [ReservationController::class, 'confirm']);

    Route::get('/rooms',           [RoomController::class, 'index']);
    Route::put('/rooms/{room}',    [RoomController::class, 'update']);

    Route::get('/maintenance-tickets',        [MaintenanceController::class, 'index']);
    Route::post('/maintenance-tickets',       [MaintenanceController::class, 'store']);
    Route::put('/maintenance-tickets/{ticket}', [MaintenanceController::class, 'update']);

    // Admin & Staff inbox
    Route::get('/contact-messages',             [ContactMessageController::class, 'index']);
    Route::put('/contact-messages/{message}/reply', [ContactMessageController::class, 'reply']);
    Route::delete('/contact-messages/{message}', [ContactMessageController::class, 'destroy']);

    Route::get('/payments', function() {
        $user = request()->user();
        $roleVal = $user->role ? $user->role->value : 'customer';
        if ($roleVal !== 'admin' && $roleVal !== 'receptionist') {
            return response()->json(['message' => 'Unauthorized'], 403);
        }
        return response()->json(\App\Models\Payment::with('reservation.customer')->orderByDesc('created_at')->get());
    });

    // User Directory Administration
    Route::get('/users',           [UserController::class, 'index']);
    Route::put('/users/{user}/role', [UserController::class, 'updateRole']);
    Route::put('/users/{user}/block', [UserController::class, 'toggleBlock']);
    Route::delete('/users/{user}', [UserController::class, 'destroy']);
});

