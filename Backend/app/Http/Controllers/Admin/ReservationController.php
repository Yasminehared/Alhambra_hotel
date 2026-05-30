<?php

namespace App\Http\Controllers\Admin;

use App\Enums\ReservationStatus;
use App\Http\Controllers\Controller;
use App\Models\Reservation;
use App\Services\ReservationService;
use Illuminate\Http\Request;

class ReservationController extends Controller
{
    public function __construct(protected ReservationService $reservationService)
    {
    }

    public function index(Request $request)
    {
        $query = Reservation::with(['customer', 'rooms.roomType'])->latest();

        if ($status = $request->get('status')) {
            $dbStatus = match ($status) {
                'checked-in' => ReservationStatus::CHECKED_IN,
                'checked-out' => ReservationStatus::CHECKED_OUT,
                default => ReservationStatus::tryFrom($status),
            };
            if ($dbStatus) {
                $query->where('status', $dbStatus);
            }
        }

        if ($search = $request->get('q')) {
            $query->where(function ($q) use ($search) {
                $q->where('reference', 'like', "%{$search}%")
                    ->orWhereHas('customer', function ($c) use ($search) {
                        $c->where('first_name', 'like', "%{$search}%")
                            ->orWhere('last_name', 'like', "%{$search}%")
                            ->orWhere('email', 'like', "%{$search}%");
                    });
            });
        }

        $reservations = $query->paginate(15)->withQueryString();

        return view('admin.reservations.index', compact('reservations'));
    }

    public function confirm(Reservation $reservation)
    {
        $reservation->update([
            'status' => ReservationStatus::CONFIRMED,
            'confirmed_at' => now(),
        ]);

        return back()->with('success', "Reservation {$reservation->reference} confirmed.");
    }

    public function checkIn(Reservation $reservation)
    {
        try {
            $this->reservationService->checkIn($reservation);
            return back()->with('success', "Guest checked in — {$reservation->reference}.");
        } catch (\Exception $e) {
            return back()->with('error', $e->getMessage());
        }
    }

    public function checkOut(Reservation $reservation)
    {
        try {
            $this->reservationService->checkOut($reservation);
            return back()->with('success', "Guest checked out — {$reservation->reference}.");
        } catch (\Exception $e) {
            return back()->with('error', $e->getMessage());
        }
    }

    public function cancel(Reservation $reservation)
    {
        try {
            $this->reservationService->cancel($reservation);
            return back()->with('success', "Reservation {$reservation->reference} cancelled.");
        } catch (\Exception $e) {
            return back()->with('error', $e->getMessage());
        }
    }
}
