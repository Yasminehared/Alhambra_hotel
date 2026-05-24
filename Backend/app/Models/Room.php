<?php

namespace App\Models;

use App\Enums\RoomStatus;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Room extends Model
{
    use HasFactory;

    protected $fillable = [
        'room_type_id',
        'room_number',
        'floor',
        'status',
        'notes',
        'is_active',
    ];

    protected $casts = [
        'floor'     => 'integer',
        'is_active' => 'boolean',
        'status'    => RoomStatus::class,
    ];

    // ─── Relationships ─────────────────────────────────────────────
    public function roomType(): BelongsTo
    {
        return $this->belongsTo(RoomType::class);
    }

    public function reservations(): BelongsToMany
    {
        return $this->belongsToMany(Reservation::class, 'reservation_rooms')
                    ->withTimestamps();
    }

    public function amenities(): BelongsToMany
    {
        return $this->belongsToMany(Amenity::class, 'room_amenity');
    }

    public function maintenanceTickets(): HasMany
    {
        return $this->hasMany(MaintenanceTicket::class);
    }

    // ─── Scopes ────────────────────────────────────────────────────
    public function scopeAvailable($query)
    {
        return $query->where('status', RoomStatus::AVAILABLE);
    }

    public function scopeOccupied($query)
    {
        return $query->where('status', RoomStatus::OCCUPIED);
    }

    public function scopeInMaintenance($query)
    {
        return $query->where('status', RoomStatus::MAINTENANCE);
    }

    // ─── Helpers ───────────────────────────────────────────────────
    public function isAvailable(): bool
    {
        return $this->status === RoomStatus::AVAILABLE;
    }

    public function getStatusLabelAttribute(): string
    {
        return $this->status->label();
    }

    public function getStatusColorAttribute(): string
    {
        return $this->status->color();
    }
}
