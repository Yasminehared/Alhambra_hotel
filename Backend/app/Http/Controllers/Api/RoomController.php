<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Room;
use App\Enums\RoomStatus;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class RoomController extends Controller
{
    public function index()
    {
        $rooms = Room::with([
            'roomType', 
            'amenities', 
            'reservations' => function ($query) {
                $query->where('status', \App\Enums\ReservationStatus::CHECKED_IN);
            }, 
            'reservations.customer'
        ])->get();

        $data = $rooms->map(function ($room) {
            $activeRes = $room->reservations->first();
            $features = $room->amenities->pluck('name')->toArray();

            return [
                'id'           => (int)$room->room_number,
                'db_id'        => $room->id,
                'name'         => $room->roomType->name,
                'floor'        => $room->floor,
                'type'         => $room->roomType->category, // standard, deluxe, suite, villa
                'status'       => $room->status === RoomStatus::MAINTENANCE ? 'cleaning' : $room->status->value, // map maintenance/dirty states
                'housekeeping' => $room->housekeeping_status, // clean, dirty
                'guest'        => $activeRes ? $activeRes->customer->full_name : null,
                'img'          => $room->roomType->hero_image ?? 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&q=80',
                'checkin'      => $activeRes ? $activeRes->check_in->toDateString() : null,
                'checkout'     => $activeRes ? $activeRes->check_out->toDateString() : null,
                'nights'       => $activeRes ? $activeRes->duration_in_nights : null,
                'features'     => !empty($features) ? $features : ['Wifi HD', 'TV LCD', 'Mini-bar'],
                'price'        => (float)$room->roomType->base_price,
                'note'         => $room->notes ?? 'Ready',
            ];
        });

        return response()->json($data);
    }

    public function update(Request $request, Room $room)
    {
        $validated = $request->validate([
            'status'              => ['nullable', 'string', Rule::in(['available', 'occupied', 'maintenance', 'cleaning'])],
            'housekeeping_status' => ['nullable', 'string', Rule::in(['clean', 'dirty'])],
            'notes'               => ['nullable', 'string', 'max:1000'],
        ]);

        if (isset($validated['status'])) {
            // Map 'cleaning' back to maintenance/available or custom status if needed
            $statusVal = $validated['status'];
            if ($statusVal === 'cleaning') {
                $room->status = RoomStatus::AVAILABLE;
                $room->housekeeping_status = 'dirty';
            } else {
                $room->status = RoomStatus::from($statusVal);
            }
        }

        if (isset($validated['housekeeping_status'])) {
            $room->housekeeping_status = $validated['housekeeping_status'];
        }

        if (isset($validated['notes'])) {
            $room->notes = $validated['notes'];
        }

        $room->save();

        return response()->json([
            'message' => 'Room updated successfully.',
            'room'    => $room,
        ]);
    }

    public function roomTypes()
    {
        $types = \App\Models\RoomType::orderBy('sort_order')->get();
        return response()->json($types);
    }

    public function roomTypeDetail($idOrSlug)
    {
        $type = \App\Models\RoomType::where('id', $idOrSlug)
            ->orWhere('slug', $idOrSlug)
            ->first();

        if (!$type) {
            return response()->json(['message' => 'Room type not found'], 404);
        }
            
        return response()->json($type);
    }
}
