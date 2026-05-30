@extends('admin.layouts.app')

@section('title', 'Maintenance')
@section('page-title', 'Maintenance')

@section('content')
<div class="card" style="margin-bottom:1.5rem;">
    <div class="card__header">
        <h2 class="card__title">New Ticket</h2>
    </div>
    <div style="padding:1.5rem;">
        <form method="POST" action="{{ route('admin.maintenance.store') }}" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:1rem;align-items:end;">
            @csrf
            <div class="form-group">
                <label>Room</label>
                <select name="room_id" class="form-control" required>
                    @foreach($rooms as $room)
                        <option value="{{ $room->id }}">Room {{ $room->room_number }}</option>
                    @endforeach
                </select>
            </div>
            <div class="form-group">
                <label>Title</label>
                <input type="text" name="title" class="form-control" required>
            </div>
            <div class="form-group">
                <label>Priority</label>
                <select name="priority" class="form-control">
                    <option value="low">Low</option>
                    <option value="medium" selected>Medium</option>
                    <option value="high">High</option>
                    <option value="critical">Critical</option>
                </select>
            </div>
            <div class="form-group">
                <label><input type="checkbox" name="blocks_room" value="1" checked> Blocks room</label>
            </div>
            <button type="submit" class="btn btn-gold">Create Ticket</button>
        </form>
    </div>
</div>

<div class="card">
    <div class="card__header">
        <h2 class="card__title">Tickets</h2>
    </div>
    <div class="table-wrap">
        <table class="admin-table">
            <thead>
                <tr>
                    <th>Room</th>
                    <th>Title</th>
                    <th>Priority</th>
                    <th>Status</th>
                    <th>Assigned</th>
                    <th>Update</th>
                </tr>
            </thead>
            <tbody>
                @forelse($tickets as $ticket)
                    <tr>
                        <td>{{ $ticket->room?->room_number }}</td>
                        <td>{{ $ticket->title }}</td>
                        <td>{{ ucfirst($ticket->priority) }}</td>
                        <td><span class="badge badge-{{ $ticket->status->value === 'in_progress' ? 'pending' : $ticket->status->value }}">{{ $ticket->status->label() }}</span></td>
                        <td>{{ $ticket->assigned_to ?? '—' }}</td>
                        <td>
                            <form method="POST" action="{{ route('admin.maintenance.update', $ticket) }}" class="actions-inline">
                                @csrf @method('PUT')
                                <select name="status" class="form-control" style="width:auto;font-size:0.75rem;">
                                    @foreach(\App\Enums\MaintenanceStatus::cases() as $s)
                                        @if($s->value !== 'cancelled')
                                            <option value="{{ $s->value }}" @selected($ticket->status === $s)>{{ $s->label() }}</option>
                                        @endif
                                    @endforeach
                                </select>
                                <input type="text" name="assigned_to" class="form-control" placeholder="Assignee" value="{{ $ticket->assigned_to }}" style="width:100px;font-size:0.75rem;">
                                <button type="submit" class="btn btn-gold btn-sm">Save</button>
                            </form>
                        </td>
                    </tr>
                @empty
                    <tr><td colspan="6">No tickets.</td></tr>
                @endforelse
            </tbody>
        </table>
    </div>
    <div class="pagination">{{ $tickets->links() }}</div>
</div>
@endsection
