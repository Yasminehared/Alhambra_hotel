<?php

namespace App\Http\Controllers\Admin;

use App\Enums\RoomStatus;
use App\Http\Controllers\Controller;
use App\Models\Room;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class RoomController extends Controller
{
    public function index(Request $request)
    {
        $query = Room::with('roomType')->where('is_active', true)->orderBy('room_number');

        if ($status = $request->get('status')) {
            $enum = RoomStatus::tryFrom($status);
            if ($enum) {
                $query->where('status', $enum);
            }
        }

        if ($floor = $request->get('floor')) {
            $query->where('floor', $floor);
        }

        $rooms = $query->get()->groupBy('floor');

        return view('admin.rooms.index', compact('rooms'));
    }

    public function update(Request $request, Room $room)
    {
        $validated = $request->validate([
            'status' => ['required', Rule::enum(RoomStatus::class)],
            'housekeeping_status' => ['nullable', 'string', 'max:50'],
            'notes' => ['nullable', 'string', 'max:1000'],
        ]);

        $room->update($validated);

        return back()->with('success', "Room {$room->room_number} updated.");
    }
}
