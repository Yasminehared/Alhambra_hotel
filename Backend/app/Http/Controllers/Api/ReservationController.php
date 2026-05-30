<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Reservation;
use App\Models\Customer;
use App\Services\ReservationService;
use App\Services\RoomAvailabilityService;
use App\Services\PricingService;
use App\Enums\UserRole;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class ReservationController extends Controller
{
    protected ReservationService $reservationService;
    protected RoomAvailabilityService $availabilityService;
    protected PricingService $pricingService;

    public function __construct(
        ReservationService $reservationService,
        RoomAvailabilityService $availabilityService,
        PricingService $pricingService
    ) {
        $this->reservationService = $reservationService;
        $this->availabilityService = $availabilityService;
        $this->pricingService = $pricingService;
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'check_in'         => 'required|date|after_or_equal:today',
            'check_out'        => 'required|date|after:check_in',
            'adults'           => 'required|integer|min:1|max:4',
            'children'         => 'required|integer|min:0|max:3',
            'full_name'        => 'required|string|max:255',
            'email'            => 'required|email|max:255',
            'phone'            => 'nullable|string|max:30',
            'special_requests' => 'nullable|string|max:1000',
            'room_type_id'     => 'nullable|integer|exists:room_types,id',
        ]);

        try {
            $checkIn = Carbon::parse($validated['check_in']);
            $checkOut = Carbon::parse($validated['check_out']);
            $capacityNeeded = (int)$validated['adults'] + (int)$validated['children'];

            // Find available rooms
            $availableRooms = $this->availabilityService->getAvailableRooms($checkIn, $checkOut);

            // Filter rooms by capacity and optional room_type_id
            $matchingRooms = $availableRooms->filter(function ($room) use ($capacityNeeded, $validated) {
                if (!empty($validated['room_type_id']) && $room->room_type_id != $validated['room_type_id']) {
                    return false;
                }
                return $room->roomType->capacity >= $capacityNeeded;
            })->sortBy(function ($room) {
                return $room->roomType->base_price;
            });

            if ($matchingRooms->isEmpty()) {
                return response()->json([
                    'message' => 'No rooms available for the selected dates and capacity.',
                    'errors' => [
                        'check_in' => ['No rooms available for the selected dates and capacity.']
                    ]
                ], 422);
            }

            // Assign the room with the lowest base price that fits the capacity
            $roomToAssign = $matchingRooms->first();

            // Calculate total price
            $pricing = $this->pricingService->calculate([$roomToAssign->id], $checkIn, $checkOut);
            $totalPrice = $pricing['total'];

            // Find or create customer
            $names = explode(' ', trim($validated['full_name']), 2);
            $firstName = $names[0];
            $lastName = $names[1] ?? $names[0];

            $customer = Customer::firstOrCreate(
                ['email' => $validated['email']],
                [
                    'first_name' => $firstName,
                    'last_name' => $lastName,
                    'phone' => $validated['phone'],
                ]
            );

            // Prepare reservation data
            $reservationData = [
                'customer_id'      => $customer->id,
                'check_in'         => $validated['check_in'],
                'check_out'        => $validated['check_out'],
                'adults'           => $validated['adults'],
                'children'         => $validated['children'],
                'special_requests' => $validated['special_requests'] ?? null,
                'total_price'      => $totalPrice,
                'amount_paid'      => 0.00,
                'status'           => 'pending',
                'payment_status'   => 'unpaid',
                'source'           => 'direct',
            ];

            // Create using ReservationService
            $reservation = $this->reservationService->createReservation($reservationData, [$roomToAssign->id]);

            return response()->json([
                'message'     => 'Reservation created successfully.',
                'reservation' => $reservation->load('rooms', 'customer'),
            ], 201);

        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to create reservation.',
                'error'   => $e->getMessage(),
            ], 400);
        }
    }

    public function index()
    {
        $user = Auth::user();
        if (!$user) {
            return response()->json(['message' => 'Unauthenticated'], 401);
        }

        $roleVal = $user->role ? $user->role->value : 'customer';

        if ($roleVal !== 'admin' && $roleVal !== 'customer') {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $query = Reservation::with(['rooms.roomType', 'customer']);

        if ($roleVal === 'customer') {
            $customer = Customer::where('user_id', $user->id)
                ->orWhere('email', $user->email)
                ->first();
            if ($customer) {
                $query->where('customer_id', $customer->id);
            } else {
                return response()->json([]);
            }
        }

        $reservations = $query->orderByDesc('created_at')->get();

        $data = $reservations->map(function ($res) {
            $firstRoom = $res->rooms->first();
            
            // Map DB status to frontend status
            $statusVal = $res->status ? $res->status->value : 'pending'; // pending, confirmed, checked_in, checked_out, cancelled, no_show
            $frontendStatus = match ($statusVal) {
                'checked_in'  => 'checked-in',
                'checked_out' => 'checked-out',
                default       => $statusVal,
            };

            // Map DB source to frontend source
            $sourceVal = strtolower($res->source ?? 'direct');
            $frontendSource = match ($sourceVal) {
                'booking.com' => 'Booking.com',
                'expedia'     => 'Expedia',
                'airbnb'      => 'Airbnb',
                default       => 'Direct',
            };

            return [
                'id'          => $res->reference ?? ('RES-' . str_pad($res->id, 4, '0', STR_PAD_LEFT)),
                'db_id'       => $res->id,
                'room'        => $firstRoom ? (int)$firstRoom->room_number : 0,
                'roomName'    => $firstRoom ? $firstRoom->roomType->name : 'N/A',
                'floor'       => $firstRoom ? $firstRoom->floor : 0,
                'guest'       => $res->customer ? ($res->customer->first_name . ' ' . $res->customer->last_name) : 'Guest',
                'email'       => $res->customer ? $res->customer->email : '',
                'phone'       => $res->customer ? $res->customer->phone : '',
                'checkin'     => $res->check_in ? $res->check_in->toDateString() : '',
                'checkout'    => $res->check_out ? $res->check_out->toDateString() : '',
                'nights'      => (int)$res->duration_in_nights,
                'guests'      => (int)($res->adults + $res->children),
                'status'      => $frontendStatus,
                'payment'     => $res->payment_status ? $res->payment_status->value : 'unpaid',
                'source'      => $frontendSource,
                'price'       => $firstRoom ? (float)$firstRoom->roomType->base_price : 0.0,
                'total'       => (float)$res->total_price,
                'img'         => ($firstRoom && $firstRoom->roomType->hero_image) 
                                 ? $firstRoom->roomType->hero_image 
                                 : 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&q=80',
                'requests'    => $res->special_requests ?? '',
                'created'     => $res->created_at ? $res->created_at->toDateString() : '',
                'nationality' => $res->customer ? ($res->customer->nationality ?? 'Moroccan') : 'Moroccan',
                'vip'         => $res->customer ? (bool)$res->customer->vip : false,
            ];
        });

        return response()->json($data);
    }

    public function checkIn(Reservation $reservation)
    {
        return response()->json(['message' => 'Unauthorized operation. Only Confirm and Cancel are permitted.'], 403);
    }

    public function checkOut(Reservation $reservation)
    {
        return response()->json(['message' => 'Unauthorized operation. Only Confirm and Cancel are permitted.'], 403);
    }

    public function cancel(Reservation $reservation)
    {
        $user = Auth::user();
        if (!$user || $user->role !== UserRole::ADMIN) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        try {
            $this->reservationService->cancel($reservation);
            return response()->json([
                'success' => true,
                'message' => 'Cancelled successfully.',
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage(),
            ], 400);
        }
    }

    public function confirm(Reservation $reservation)
    {
        $user = Auth::user();
        if (!$user || $user->role !== UserRole::ADMIN) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        try {
            $reservation->update([
                'status' => \App\Enums\ReservationStatus::CONFIRMED,
                'confirmed_at' => now(),
            ]);
            return response()->json([
                'success' => true,
                'message' => 'Reservation confirmed successfully.',
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage(),
            ], 400);
        }
    }
}

