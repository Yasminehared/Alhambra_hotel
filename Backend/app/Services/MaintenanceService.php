<?php

namespace App\Services;

use App\Enums\MaintenanceStatus;
use App\Enums\RoomStatus;
use App\Models\MaintenanceLog;
use App\Models\MaintenanceTicket;
use App\Models\Room;
use App\Models\User;
use Illuminate\Support\Facades\DB;

class MaintenanceService
{
    /**
     * Open a new maintenance ticket and optionally block the room.
     */
    public function openTicket(
        Room $room,
        string $title,
        string $priority = 'medium',
        ?string $description = null,
        bool $blocksRoom = true,
        ?string $assignedTo = null
    ): MaintenanceTicket {
        return DB::transaction(function () use ($room, $title, $priority, $description, $blocksRoom, $assignedTo) {
            $ticket = MaintenanceTicket::create([
                'room_id'     => $room->id,
                'title'       => $title,
                'description' => $description,
                'status'      => MaintenanceStatus::PENDING,
                'priority'    => $priority,
                'blocks_room' => $blocksRoom,
                'assigned_to' => $assignedTo,
                'reported_at' => now(),
            ]);

            if ($blocksRoom) {
                $room->update(['status' => RoomStatus::MAINTENANCE]);
            }

            return $ticket;
        });
    }

    /**
     * Update the status of a ticket and log the transition.
     */
    public function updateStatus(
        MaintenanceTicket $ticket,
        MaintenanceStatus $newStatus,
        ?User $actor = null,
        ?string $notes = null
    ): MaintenanceTicket {
        return DB::transaction(function () use ($ticket, $newStatus, $actor, $notes) {
            $fromStatus = $ticket->status->value;

            $ticket->update(['status' => $newStatus]);

            MaintenanceLog::create([
                'maintenance_ticket_id' => $ticket->id,
                'user_id'               => $actor?->id,
                'from_status'           => $fromStatus,
                'to_status'             => $newStatus->value,
                'notes'                 => $notes,
            ]);

            // Sync room status after ticket update
            $ticket->syncRoomStatus();

            return $ticket->fresh();
        });
    }

    /**
     * Resolve a ticket and add resolution notes.
     */
    public function resolve(
        MaintenanceTicket $ticket,
        ?string $resolutionNotes = null,
        ?User $actor = null
    ): MaintenanceTicket {
        return DB::transaction(function () use ($ticket, $resolutionNotes, $actor) {
            $fromStatus = $ticket->status->value;

            $ticket->update([
                'status'           => MaintenanceStatus::RESOLVED,
                'resolution_notes' => $resolutionNotes,
                'resolved_at'      => now(),
            ]);

            MaintenanceLog::create([
                'maintenance_ticket_id' => $ticket->id,
                'user_id'               => $actor?->id,
                'from_status'           => $fromStatus,
                'to_status'             => MaintenanceStatus::RESOLVED->value,
                'notes'                 => $resolutionNotes,
            ]);

            $ticket->syncRoomStatus();

            return $ticket->fresh();
        });
    }

    /**
     * Get all active blocking tickets for a room.
     */
    public function getActiveBlockingTickets(Room $room)
    {
        return $room->maintenanceTickets()
            ->where('blocks_room', true)
            ->whereIn('status', [MaintenanceStatus::PENDING, MaintenanceStatus::IN_PROGRESS])
            ->get();
    }
}
