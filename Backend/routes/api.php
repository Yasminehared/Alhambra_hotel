<?php

// routes/api.php
use App\Http\Controllers\Api\ReservationController;
use App\Http\Controllers\Api\RoomController;
use App\Http\Controllers\Api\MaintenanceController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\AiController;
use App\Models\User;
use App\Models\Payment;
use Illuminate\Support\Facades\Route;

// AI Assistant (Stateless)
Route::post('/ai/chat', [AiController::class, 'chat']);

// Auth & Protected Routes (Stateful/Session-based)
Route::middleware('web')->group(function() {
    // Auth API
    Route::get('/csrf-cookie',      function() { return response()->noContent(); });
    Route::post('/login',           [AuthController::class, 'login']);
    Route::post('/logout',          [AuthController::class, 'logout']);
    Route::get('/me',               [AuthController::class, 'me']);

    // Public Guest Catalog & Booking APIs (Session might be used for guest tracking)
    Route::post('/reservations',        [ReservationController::class, 'store']);
    Route::get('/room-types',           [RoomController::class, 'roomTypes']);
    Route::get('/room-types/{slug}',     [RoomController::class, 'roomTypeDetail']);

    // Protected Admin Console APIs
    Route::middleware('auth')->group(function() {
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

        Route::get('/payments', function() {
            $user = request()->user();
            $roleVal = $user->role ? $user->role->value : 'customer';
            if ($roleVal !== 'admin' && $roleVal !== 'receptionist') {
                return response()->json(['message' => 'Unauthorized'], 403);
            }
            return response()->json(Payment::with('reservation.customer')->orderByDesc('created_at')->get());
        });

        Route::get('/users', function() {
            $user = request()->user();
            $roleVal = $user->role ? $user->role->value : 'customer';
            if ($roleVal !== 'admin') {
                return response()->json(['message' => 'Unauthorized'], 403);
            }
            return response()->json(User::orderBy('name')->get());
        });
    });
});
