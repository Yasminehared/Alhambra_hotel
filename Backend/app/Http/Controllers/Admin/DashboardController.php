<?php

namespace App\Http\Controllers\Admin;

use App\Enums\MaintenanceStatus;
use App\Enums\ReservationStatus;
use App\Enums\RoomStatus;
use App\Http\Controllers\Controller;
use App\Models\MaintenanceTicket;
use App\Models\Payment;
use App\Models\Reservation;
use App\Models\Room;
use Carbon\Carbon;

class DashboardController extends Controller
{
    public function index()
    {
        if (auth()->user()->hasRole('housekeeping')) {
            return redirect()->route('admin.maintenance.index');
        }

        $today = Carbon::today();

        $rooms = Room::with('roomType')->where('is_active', true)->get();

        $stats = [
            'total_rooms' => $rooms->count(),
            'available' => $rooms->where('status', RoomStatus::AVAILABLE)->count(),
            'occupied' => $rooms->where('status', RoomStatus::OCCUPIED)->count(),
            'maintenance' => $rooms->where('status', RoomStatus::MAINTENANCE)->count(),
            'check_ins_today' => Reservation::whereDate('check_in', $today)
                ->whereIn('status', [ReservationStatus::CONFIRMED, ReservationStatus::CHECKED_IN])
                ->count(),
            'check_outs_today' => Reservation::whereDate('check_out', $today)
                ->whereIn('status', [ReservationStatus::CHECKED_IN, ReservationStatus::CONFIRMED])
                ->count(),
            'pending_reservations' => Reservation::where('status', ReservationStatus::PENDING)->count(),
            'revenue_month' => Payment::whereMonth('paid_at', $today->month)
                ->whereYear('paid_at', $today->year)
                ->sum('amount'),
            'open_tickets' => MaintenanceTicket::whereIn('status', [
                MaintenanceStatus::PENDING,
                MaintenanceStatus::IN_PROGRESS,
            ])->count(),
        ];

        $recentReservations = Reservation::with(['customer', 'rooms.roomType'])
            ->latest()
            ->limit(8)
            ->get();

        $urgentTickets = MaintenanceTicket::with('room')
            ->whereIn('status', [MaintenanceStatus::PENDING, MaintenanceStatus::IN_PROGRESS])
            ->orderByRaw("FIELD(priority, 'critical', 'high', 'medium', 'low')")
            ->limit(5)
            ->get();

        return view('admin.dashboard.index', compact('stats', 'recentReservations', 'urgentTickets', 'rooms'));
    }
}
