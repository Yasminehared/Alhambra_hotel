<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\MaintenanceTicket;
use App\Models\Room;
use App\Enums\MaintenanceStatus;
use App\Enums\UserRole;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;

class MaintenanceController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        if (!$user || $user->role !== UserRole::ADMIN) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $tickets = MaintenanceTicket::with('room.roomType')->orderByDesc('created_at')->get();

        $data = $tickets->map(function ($t) {
            // Map DB status to frontend status
            $statusVal = $t->status->value; // pending, in_progress, resolved
            $frontendStatus = match ($statusVal) {
                'in_progress' => 'in-progress',
                'resolved'    => 'completed',
                default       => 'pending',
            };

            // Map DB priority to frontend priority
            $priorityVal = $t->priority; // low, medium, high, critical
            $frontendPriority = match ($priorityVal) {
                'critical' => 'urgent',
                default    => $priorityVal,
            };

            // Infer category based on title keywords
            $titleLower = strtolower($t->title);
            $category = 'cosmetic';
            if (str_contains($titleLower, 'ac') || str_contains($titleLower, 'cool') || str_contains($titleLower, 'heat')) {
                $category = 'hvac';
            } elseif (str_contains($titleLower, 'leak') || str_contains($titleLower, 'water') || str_contains($titleLower, 'plumb') || str_contains($titleLower, 'drain') || str_contains($titleLower, 'shower')) {
                $category = 'plumbing';
            } elseif (str_contains($titleLower, 'elect') || str_contains($titleLower, 'outlet') || str_contains($titleLower, 'spark') || str_contains($titleLower, 'light') || str_contains($titleLower, 'reader')) {
                $category = 'electrical';
            } elseif (str_contains($titleLower, 'window') || str_contains($titleLower, 'door') || str_contains($titleLower, 'lock') || str_contains($titleLower, 'bed') || str_contains($titleLower, 'chair') || str_contains($titleLower, 'desk')) {
                $category = 'furniture';
            }

            return [
                'id'            => 'M-' . str_pad($t->id, 4, '0', STR_PAD_LEFT),
                'db_id'         => $t->id,
                'room'          => (int)$t->room->room_number,
                'title'         => $t->title,
                'category'      => $category,
                'priority'      => $frontendPriority,
                'status'        => $frontendStatus,
                'reportedBy'    => $t->created_by ? 'Staff (ID ' . $t->created_by . ')' : 'Housekeeping',
                'assignedTo'    => $t->assigned_to ?? 'Unassigned',
                'reportedDate'  => $t->reported_at ? $t->reported_at->toDateString() : $t->created_at->toDateString(),
                'completedDate' => $t->resolved_at ? $t->resolved_at->toDateString() : null,
                'img'           => $t->room->roomType->hero_image ?? 'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=600&q=80',
                'location'      => 'Room ' . $t->room->room_number,
                'estimatedCost' => 1200, // mock/derived value
                'description'   => $t->description ?? '',
                'note'          => $t->resolution_notes ?? 'No resolution notes.',
            ];
        });

        return response()->json($data);
    }

    public function store(Request $request)
    {
        $user = Auth::user();
        if (!$user || $user->role !== UserRole::ADMIN) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $validated = $request->validate([
            'room'        => 'required|integer', // room_number
            'title'       => 'required|string|max:255',
            'description' => 'nullable|string',
            'priority'    => ['required', 'string', Rule::in(['low', 'medium', 'high', 'urgent'])],
            'blocks_room' => 'nullable|boolean',
        ]);

        $room = Room::where('room_number', $validated['room'])->first();

        if (!$room) {
            return response()->json([
                'message' => 'Room not found.',
                'errors'  => ['room' => ['Room not found.']]
            ], 422);
        }

        // Map frontend priority to DB priority
        $dbPriority = match ($validated['priority']) {
            'urgent' => 'critical',
            default  => $validated['priority'],
        };

        $ticket = MaintenanceTicket::create([
            'room_id'     => $room->id,
            'title'       => $validated['title'],
            'description' => $validated['description'] ?? null,
            'priority'    => $dbPriority,
            'status'      => 'pending',
            'blocks_room' => $validated['blocks_room'] ?? true,
            'reported_at' => now(),
        ]);

        return response()->json([
            'message' => 'Ticket created successfully.',
            'ticket'  => $ticket,
        ], 201);
    }

    public function update(Request $request, MaintenanceTicket $ticket)
    {
        $user = Auth::user();
        if (!$user || $user->role !== UserRole::ADMIN) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $validated = $request->validate([
            'status'           => ['required', 'string', Rule::in(['pending', 'in-progress', 'completed'])],
            'assigned_to'      => 'nullable|string|max:255',
            'resolution_notes' => 'nullable|string',
        ]);

        // Map status
        $dbStatus = match ($validated['status']) {
            'in-progress' => 'in_progress',
            'completed'   => 'resolved',
            default       => 'pending',
        };

        $ticket->status = $dbStatus;

        if (isset($validated['assigned_to'])) {
            $ticket->assigned_to = $validated['assigned_to'];
        }

        if ($dbStatus === 'resolved') {
            $ticket->resolution_notes = $validated['resolution_notes'] ?? 'Resolved via dashboard.';
            $ticket->resolved_at = now();
        } else {
            $ticket->resolved_at = null;
        }

        $ticket->save();

        return response()->json([
            'message' => 'Ticket updated successfully.',
            'ticket'  => $ticket,
        ]);
    }
}
