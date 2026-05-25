<?php

namespace App\Models;

use App\Enums\MaintenanceStatus;
use App\Enums\RoomStatus;
use App\Traits\HasAuditColumns;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class MaintenanceTicket extends Model
{
    use HasFactory, HasAuditColumns;

    protected $fillable = [
        'room_id',
        'title',
        'description',
        'status',
        'priority',
        'assigned_to',
        'blocks_room',
        'resolution_notes',
        'reported_at',
        'resolved_at',
    ];

    protected $casts = [
        'blocks_room' => 'boolean',
        'status' => MaintenanceStatus::class,
        'reported_at' => 'datetime',
        'resolved_at' => 'datetime',
    ];

    protected static function booted()
    {
        // On Create/Update: Sync room status if it blocks the room
        static::saved(function ($ticket) {
            $ticket->syncRoomStatus();
        });

        static::deleted(function ($ticket) {
            $ticket->syncRoomStatus();
        });
    }

    public function syncRoomStatus(): void
    {
        $room = $this->room;
        if (!$room) return;

        // Check if there are any active blocking tickets for this room
        $hasActiveBlocking = self::where('room_id', $this->room_id)
            ->where('blocks_room', true)
            ->whereIn('status', [MaintenanceStatus::PENDING->value, MaintenanceStatus::IN_PROGRESS->value])
            ->exists();

        if ($hasActiveBlocking) {
            if ($room->status !== RoomStatus::MAINTENANCE) {
                $room->update(['status' => RoomStatus::MAINTENANCE]);
            }
        } else {
            // No active blocking tickets. If the room was under maintenance, restore it to available
            if ($room->status === RoomStatus::MAINTENANCE) {
                $room->update(['status' => RoomStatus::AVAILABLE]);
            }
        }
    }

    // ─── Relationships ─────────────────────────────────────────────
    public function room(): BelongsTo
    {
        return $this->belongsTo(Room::class);
    }

    public function logs(): HasMany
    {
        return $this->hasMany(MaintenanceLog::class);
    }

    // ─── Scopes ────────────────────────────────────────────────────
    public function scopeActive($query)
    {
        return $query->whereIn('status', [MaintenanceStatus::PENDING, MaintenanceStatus::IN_PROGRESS]);
    }

    public function scopeBlocking($query)
    {
        return $query->where('blocks_room', true)->whereIn('status', [MaintenanceStatus::PENDING, MaintenanceStatus::IN_PROGRESS]);
    }

    // ─── Helpers ───────────────────────────────────────────────────
    public function resolve(string $notes = null): void
    {
        $this->update([
            'status' => MaintenanceStatus::RESOLVED,
            'resolution_notes' => $notes,
            'resolved_at' => now(),
        ]);
    }
}
