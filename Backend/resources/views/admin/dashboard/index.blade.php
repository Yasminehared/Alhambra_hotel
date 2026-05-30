@extends('admin.layouts.app')

@section('title', 'Dashboard')
@section('page-title', 'Palace Overview')

@section('content')
<div class="stats-grid">
    <div class="stat-card">
        <div class="stat-card__label">Total Rooms</div>
        <div class="stat-card__value">{{ $stats['total_rooms'] }}</div>
    </div>
    <div class="stat-card">
        <div class="stat-card__label">Available</div>
        <div class="stat-card__value">{{ $stats['available'] }}</div>
    </div>
    <div class="stat-card">
        <div class="stat-card__label">Occupied</div>
        <div class="stat-card__value">{{ $stats['occupied'] }}</div>
    </div>
    <div class="stat-card">
        <div class="stat-card__label">In Maintenance</div>
        <div class="stat-card__value">{{ $stats['maintenance'] }}</div>
    </div>
    <div class="stat-card">
        <div class="stat-card__label">Check-ins Today</div>
        <div class="stat-card__value">{{ $stats['check_ins_today'] }}</div>
    </div>
    <div class="stat-card">
        <div class="stat-card__label">Check-outs Today</div>
        <div class="stat-card__value">{{ $stats['check_outs_today'] }}</div>
    </div>
    <div class="stat-card">
        <div class="stat-card__label">Pending Bookings</div>
        <div class="stat-card__value">{{ $stats['pending_reservations'] }}</div>
    </div>
    <div class="stat-card">
        <div class="stat-card__label">Revenue (Month)</div>
        <div class="stat-card__value">{{ number_format($stats['revenue_month'], 0) }} MAD</div>
    </div>
</div>

<div style="display:grid;grid-template-columns:1fr 1fr;gap:1.5rem;">
    <div class="card">
        <div class="card__header">
            <h2 class="card__title">Recent Reservations</h2>
            <a href="{{ route('admin.reservations.index') }}" class="btn btn-ghost btn-sm">View all</a>
        </div>
        <div class="table-wrap">
            <table class="admin-table">
                <thead>
                    <tr>
                        <th>Ref</th>
                        <th>Guest</th>
                        <th>Status</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    @forelse($recentReservations as $res)
                        <tr>
                            <td>{{ $res->reference }}</td>
                            <td>{{ $res->customer?->first_name }} {{ $res->customer?->last_name }}</td>
                            <td><span class="badge badge-{{ $res->status->value }}">{{ $res->status->label() }}</span></td>
                            <td>{{ number_format($res->total_price, 0) }} MAD</td>
                        </tr>
                    @empty
                        <tr><td colspan="4">No reservations yet.</td></tr>
                    @endforelse
                </tbody>
            </table>
        </div>
    </div>

    <div class="card">
        <div class="card__header">
            <h2 class="card__title">Open Maintenance</h2>
            <a href="{{ route('admin.maintenance.index') }}" class="btn btn-ghost btn-sm">View all</a>
        </div>
        <div class="table-wrap">
            <table class="admin-table">
                <thead>
                    <tr>
                        <th>Room</th>
                        <th>Issue</th>
                        <th>Priority</th>
                    </tr>
                </thead>
                <tbody>
                    @forelse($urgentTickets as $ticket)
                        <tr>
                            <td>{{ $ticket->room?->room_number }}</td>
                            <td>{{ Str::limit($ticket->title, 40) }}</td>
                            <td>{{ ucfirst($ticket->priority) }}</td>
                        </tr>
                    @empty
                        <tr><td colspan="3">No open tickets.</td></tr>
                    @endforelse
                </tbody>
            </table>
        </div>
    </div>
</div>
@endsection
