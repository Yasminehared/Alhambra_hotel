<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Customer extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'first_name',
        'last_name',
        'email',
        'phone',
        'nationality',
        'country_code',
        'passport_number',
        'is_vip',
        'notes',
    ];

    protected $casts = [
        'is_vip' => 'boolean',
    ];

    // ─── Relationships ─────────────────────────────────────────────
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function reservations(): HasMany
    {
        return $this->hasMany(Reservation::class);
    }

    // ─── Scopes ────────────────────────────────────────────────────
    public function scopeVip($query)
    {
        return $query->where('is_vip', true);
    }

    // ─── Helpers ───────────────────────────────────────────────────
    public function getFullNameAttribute(): string
    {
        return "{$this->first_name} {$this->last_name}";
    }

    public function getInitialsAttribute(): string
    {
        return strtoupper(substr($this->first_name, 0, 1) . substr($this->last_name, 0, 1));
    }

    public function getTotalSpentAttribute(): float
    {
        return $this->reservations()
            ->where('payment_status', 'paid')
            ->sum('total_price');
    }

    public function getReservationsCountAttribute(): int
    {
        return $this->reservations()->count();
    }
}
