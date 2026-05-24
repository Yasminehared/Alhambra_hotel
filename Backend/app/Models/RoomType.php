<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class RoomType extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'slug',
        'category',
        'description',
        'short_description',
        'base_price',
        'capacity',
        'size_sqm',
        'images',
        'hero_image',
        'is_active',
        'sort_order',
    ];

    protected $casts = [
        'images'      => 'array',
        'base_price'  => 'decimal:2',
        'is_active'   => 'boolean',
        'capacity'    => 'integer',
        'size_sqm'    => 'integer',
        'sort_order'  => 'integer',
    ];

    // ─── Relationships ─────────────────────────────────────────────
    public function rooms(): HasMany
    {
        return $this->hasMany(Room::class);
    }

    // ─── Scopes ────────────────────────────────────────────────────
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    public function scopeByCategory($query, string $category)
    {
        return $query->where('category', $category);
    }

    // ─── Helpers ───────────────────────────────────────────────────
    public function getFormattedPriceAttribute(): string
    {
        return 'MAD ' . number_format($this->base_price, 0, '.', ',');
    }

    public function getAvailableRoomsCount(): int
    {
        return $this->rooms()->where('status', 'available')->count();
    }
}
