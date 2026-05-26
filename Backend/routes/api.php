<?php

// routes/api.php
use App\Http\Controllers\Api\ReservationController;
use App\Http\Controllers\Api\RoomController;
use App\Http\Controllers\Api\MaintenanceController;
use App\Http\Controllers\Api\AuthController;
use Illuminate\Support\Facades\Route;

// Auth API
Route::post('/login',           [AuthController::class, 'login']);
Route::post('/logout',          [AuthController::class, 'logout']);
Route::get('/me',               [AuthController::class, 'me']);

// Public Guest Catalog & Booking APIs
Route::post('/reservations',        [ReservationController::class, 'store']);
Route::get('/room-types',           [RoomController::class, 'roomTypes']);
Route::get('/room-types/{slug}',     [RoomController::class, 'roomTypeDetail']);

// Protected Admin Console APIs (Requires Session Auth)
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
        return response()->json(\App\Models\Payment::with('reservation.customer')->orderByDesc('created_at')->get());
    });

    Route::get('/users', function() {
        $user = request()->user();
        $roleVal = $user->role ? $user->role->value : 'customer';
        if ($roleVal !== 'admin') {
            return response()->json(['message' => 'Unauthorized'], 403);
        }
        return response()->json(\App\Models\User::orderBy('name')->get());
    });
});

