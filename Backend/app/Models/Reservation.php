<?php

namespace App\Models;

use App\Enums\PaymentStatus;
use App\Enums\ReservationStatus;
use App\Traits\HasReference;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Reservation extends Model
{
    use HasFactory, HasReference;

    protected $fillable = [
        'reference',
        'customer_id',
        'check_in',
        'check_out',
        'adults',
        'children',
        'status',
        'payment_status',
        'payment_method',
        'total_price',
        'amount_paid',
        'source',
        'special_requests',
        'internal_notes',
        'confirmed_at',
        'checked_in_at',
        'checked_out_at',
        'cancelled_at',
    ];

    protected $casts = [
        'check_in' => 'date',
        'check_out' => 'date',
        'adults' => 'integer',
        'children' => 'integer',
        'total_price' => 'decimal:2',
        'amount_paid' => 'decimal:2',
        'status' => ReservationStatus::class,
        'payment_status' => PaymentStatus::class,
        'confirmed_at' => 'datetime',
        'checked_in_at' => 'datetime',
        'checked_out_at' => 'datetime',
        'cancelled_at' => 'datetime',
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($reservation) {
            if (empty($reservation->reference)) {
                $reservation->reference = self::generateUniqueReference('RES-', 'reference');
            }
        });
    }

    // ─── Relationships ─────────────────────────────────────────────
    public function customer(): BelongsTo
    {
        return $this->belongsTo(Customer::class);
    }

    public function rooms(): BelongsToMany
    {
        return $this->belongsToMany(Room::class, 'reservation_rooms')
                    ->withPivot('price_per_night')
                    ->withTimestamps();
    }

    public function payments(): HasMany
    {
        return $this->hasMany(Payment::class);
    }

    // ─── Scopes ────────────────────────────────────────────────────
    public function scopePending($query)
    {
        return $query->where('status', ReservationStatus::PENDING);
    }

    public function scopeConfirmed($query)
    {
        return $query->where('status', ReservationStatus::CONFIRMED);
    }

    public function scopeCheckedIn($query)
    {
        return $query->where('status', ReservationStatus::CHECKED_IN);
    }

    public function scopeCheckedOut($query)
    {
        return $query->where('status', ReservationStatus::CHECKED_OUT);
    }

    public function scopeActiveBookings($query)
    {
        return $query->whereNotIn('status', [ReservationStatus::CANCELLED, ReservationStatus::NO_SHOW]);
    }

    // ─── Helpers ───────────────────────────────────────────────────
    public function getDurationInNightsAttribute(): int
    {
        if (!$this->check_in || !$this->check_out) {
            return 0;
        }
        return $this->check_in->diffInDays($this->check_out);
    }

    public function getStatusLabelAttribute(): string
    {
        return $this->status->label();
    }

    public function getPaymentStatusLabelAttribute(): string
    {
        return $this->payment_status->label();
    }
}
