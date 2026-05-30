<?php

namespace App\Http\Controllers\Admin;

use App\Enums\MaintenanceStatus;
use App\Http\Controllers\Controller;
use App\Models\MaintenanceTicket;
use App\Models\Room;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class MaintenanceController extends Controller
{
    public function index(Request $request)
    {
        $query = MaintenanceTicket::with('room.roomType')->latest();

        if ($status = $request->get('status')) {
            $db = match ($status) {
                'in-progress' => MaintenanceStatus::IN_PROGRESS,
                'completed' => MaintenanceStatus::RESOLVED,
                default => MaintenanceStatus::tryFrom($status),
            };
            if ($db) {
                $query->where('status', $db);
            }
        }

        $tickets = $query->paginate(12)->withQueryString();
        $rooms = Room::orderBy('room_number')->get(['id', 'room_number']);

        return view('admin.maintenance.index', compact('tickets', 'rooms'));
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'room_id' => ['required', 'exists:rooms,id'],
            'title' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'priority' => ['required', Rule::in(['low', 'medium', 'high', 'critical'])],
            'blocks_room' => ['nullable', 'boolean'],
        ]);

        MaintenanceTicket::create([
            ...$validated,
            'status' => MaintenanceStatus::PENDING,
            'blocks_room' => $request->boolean('blocks_room', true),
            'reported_at' => now(),
            'created_by' => auth()->id(),
        ]);

        return back()->with('success', 'Maintenance ticket created.');
    }

    public function update(Request $request, MaintenanceTicket $ticket)
    {
        $validated = $request->validate([
            'status' => ['required', Rule::enum(MaintenanceStatus::class)],
            'assigned_to' => ['nullable', 'string', 'max:255'],
            'resolution_notes' => ['nullable', 'string'],
        ]);

        $ticket->status = MaintenanceStatus::from($validated['status']);
        $ticket->assigned_to = $validated['assigned_to'] ?? $ticket->assigned_to;
        if ($validated['resolution_notes'] ?? null) {
            $ticket->resolution_notes = $validated['resolution_notes'];
        }

        if ($ticket->status === MaintenanceStatus::RESOLVED) {
            $ticket->resolved_at = now();
        } else {
            $ticket->resolved_at = null;
        }

        $ticket->save();

        return back()->with('success', 'Ticket updated.');
    }
}
