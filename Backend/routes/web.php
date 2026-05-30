<?php

use App\Http\Controllers\Admin\AuthController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\MaintenanceController;
use App\Http\Controllers\Admin\PaymentController;
use App\Http\Controllers\Admin\ReservationController;
use App\Http\Controllers\Admin\RoomController;
use App\Http\Controllers\Admin\UserController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return redirect()->route('admin.login');
});

Route::prefix('admin')->name('admin.')->group(function () {
    Route::middleware('guest')->group(function () {
        Route::get('login', [AuthController::class, 'showLogin'])->name('login');
        Route::post('login', [AuthController::class, 'login'])->name('login.submit');
    });

    Route::middleware(['auth', 'staff'])->group(function () {
        Route::post('logout', [AuthController::class, 'logout'])->name('logout');

        Route::get('/', [DashboardController::class, 'index'])->name('dashboard');

        Route::middleware('role:admin,receptionist')->group(function () {
            Route::get('reservations', [ReservationController::class, 'index'])->name('reservations.index');
            Route::post('reservations/{reservation}/confirm', [ReservationController::class, 'confirm'])->name('reservations.confirm');
            Route::post('reservations/{reservation}/check-in', [ReservationController::class, 'checkIn'])->name('reservations.check-in');
            Route::post('reservations/{reservation}/check-out', [ReservationController::class, 'checkOut'])->name('reservations.check-out');
            Route::post('reservations/{reservation}/cancel', [ReservationController::class, 'cancel'])->name('reservations.cancel');

            Route::get('payments', [PaymentController::class, 'index'])->name('payments.index');
        });

        Route::middleware('role:admin,receptionist,housekeeping')->group(function () {
            Route::get('rooms', [RoomController::class, 'index'])->name('rooms.index');
            Route::put('rooms/{room}', [RoomController::class, 'update'])->name('rooms.update');
        });

        Route::middleware('role:admin,housekeeping')->group(function () {
            Route::get('maintenance', [MaintenanceController::class, 'index'])->name('maintenance.index');
            Route::post('maintenance', [MaintenanceController::class, 'store'])->name('maintenance.store');
            Route::put('maintenance/{ticket}', [MaintenanceController::class, 'update'])->name('maintenance.update');
        });

        Route::middleware('role:admin')->group(function () {
            Route::get('users', [UserController::class, 'index'])->name('users.index');
        });
    });
});
