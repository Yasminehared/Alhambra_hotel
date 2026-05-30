@extends('admin.layouts.app')

@section('title', 'Rooms')
@section('page-title', 'Room Status')

@section('content')
<div class="card" style="margin-bottom:1.5rem;">
    <div class="card__header">
        <form method="GET" style="display:flex;gap:0.75rem;flex-wrap:wrap;">
            <select name="status" class="form-control" style="width:auto;">
                <option value="">All statuses</option>
                @foreach(\App\Enums\RoomStatus::cases() as $status)
                    <option value="{{ $status->value }}" @selected(request('status') === $status->value)>{{ $status->label() }}</option>
                @endforeach
            </select>
            <button type="submit" class="btn btn-gold">Filter</button>
        </form>
    </div>
</div>

@foreach($rooms as $floor => $floorRooms)
    <div class="card" style="margin-bottom:1.5rem;">
        <div class="card__header">
            <h2 class="card__title">Floor {{ $floor }}</h2>
        </div>
        <div class="room-grid">
            @foreach($floorRooms as $room)
                <div class="room-tile">
                    <div class="room-tile__num">{{ $room->room_number }}</div>
                    <small style="color:var(--text-muted)">{{ $room->roomType?->name }}</small>
                    <p style="margin:0.5rem 0;"><span class="badge badge-{{ $room->status->value }}">{{ $room->status->label() }}</span></p>
                    <form method="POST" action="{{ route('admin.rooms.update', $room) }}">
                        @csrf @method('PUT')
                        <select name="status" class="form-control" style="font-size:0.75rem;margin-bottom:0.35rem;">
                            @foreach(\App\Enums\RoomStatus::cases() as $s)
                                <option value="{{ $s->value }}" @selected($room->status === $s)>{{ $s->label() }}</option>
                            @endforeach
                        </select>
                        <button type="submit" class="btn btn-gold btn-sm" style="width:100%;">Update</button>
                    </form>
                </div>
            @endforeach
        </div>
    </div>
@endforeach
@endsection
