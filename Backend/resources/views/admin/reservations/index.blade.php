@extends('admin.layouts.app')

@section('title', 'Reservations')
@section('page-title', 'Reservations')

@section('content')
<div class="card" style="margin-bottom:1.5rem;">
    <div class="card__header">
        <form method="GET" style="display:flex;gap:0.75rem;flex-wrap:wrap;align-items:flex-end;">
            <div class="form-group" style="margin:0;">
                <label>Search</label>
                <input type="text" name="q" class="form-control" value="{{ request('q') }}" placeholder="Guest, ref, email…">
            </div>
            <div class="form-group" style="margin:0;">
                <label>Status</label>
                <select name="status" class="form-control">
                    <option value="">All</option>
                    @foreach(['pending','confirmed','checked-in','checked-out','cancelled'] as $s)
                        <option value="{{ $s }}" @selected(request('status') === $s)>{{ ucfirst(str_replace('-', ' ', $s)) }}</option>
                    @endforeach
                </select>
            </div>
            <button type="submit" class="btn btn-gold">Filter</button>
        </form>
    </div>
</div>

<div class="card">
    <div class="card__header">
        <h2 class="card__title">All Reservations ({{ $reservations->total() }})</h2>
    </div>
    <div class="table-wrap">
        <table class="admin-table">
            <thead>
                <tr>
                    <th>Reference</th>
                    <th>Guest</th>
                    <th>Room</th>
                    <th>Check-in</th>
                    <th>Check-out</th>
                    <th>Status</th>
                    <th>Total</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                @forelse($reservations as $res)
                    @php $room = $res->rooms->first(); @endphp
                    <tr>
                        <td><strong>{{ $res->reference }}</strong></td>
                        <td>
                            {{ $res->customer?->first_name }} {{ $res->customer?->last_name }}<br>
                            <small style="color:var(--text-muted)">{{ $res->customer?->email }}</small>
                        </td>
                        <td>{{ $room ? '#' . $room->room_number . ' — ' . $room->roomType?->name : '—' }}</td>
                        <td>{{ $res->check_in?->format('d M Y') }}</td>
                        <td>{{ $res->check_out?->format('d M Y') }}</td>
                        <td><span class="badge badge-{{ $res->status->value }}">{{ $res->status->label() }}</span></td>
                        <td>{{ number_format($res->total_price, 0) }} MAD</td>
                        <td>
                            <div class="actions-inline">
                                @if($res->status->value === 'pending')
                                    <form method="POST" action="{{ route('admin.reservations.confirm', $res) }}">@csrf
                                        <button class="btn btn-gold btn-sm">Confirm</button>
                                    </form>
                                @endif
                                @if(in_array($res->status->value, ['confirmed', 'pending']))
                                    <form method="POST" action="{{ route('admin.reservations.check-in', $res) }}">@csrf
                                        <button class="btn btn-ghost btn-sm">Check in</button>
                                    </form>
                                @endif
                                @if($res->status->value === 'checked_in')
                                    <form method="POST" action="{{ route('admin.reservations.check-out', $res) }}">@csrf
                                        <button class="btn btn-ghost btn-sm">Check out</button>
                                    </form>
                                @endif
                                @if(!in_array($res->status->value, ['cancelled', 'checked_out']))
                                    <form method="POST" action="{{ route('admin.reservations.cancel', $res) }}" onsubmit="return confirm('Cancel this reservation?')">@csrf
                                        <button class="btn btn-danger btn-sm">Cancel</button>
                                    </form>
                                @endif
                            </div>
                        </td>
                    </tr>
                @empty
                    <tr><td colspan="8">No reservations found.</td></tr>
                @endforelse
            </tbody>
        </table>
    </div>
    <div class="pagination">{{ $reservations->links() }}</div>
</div>
@endsection
