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

    // ─── Accessors & Sanitizers ───────────────────────────────────
    public function getDescriptionAttribute($value): string
    {
        if (empty($value)) {
            return '';
        }

        // 1. Keep only safe HTML tags
        $allowedTags = ['p', 'br', 'strong', 'em', 'ul', 'li', 'img', 'h1', 'h2', 'h3', 'h4', 'a', 'span'];
        $cleaned = strip_tags($value, $allowedTags);

        // 2. Strip data-trix-* attributes
        $cleaned = preg_replace('/\s*data-trix-[a-zA-Z0-9\-]+="[^"]*"/i', '', $cleaned);
        $cleaned = preg_replace('/\s*data-trix-[a-zA-Z0-9\-]+=\'[^\']*\'/i', '', $cleaned);

        // 3. Strip attachment classes or other trix-specific attributes
        $cleaned = preg_replace('/\s*class="[^"]*attachment[^"]*"/i', '', $cleaned);
        $cleaned = preg_replace('/\s*class=\'[^\']*attachment[^\']*\'/i', '', $cleaned);

        return trim($cleaned);
    }

    public function getHeroImageAttribute($value): ?string
    {
        if (empty($value)) {
            return null;
        }
        if (str_starts_with($value, 'http://') || str_starts_with($value, 'https://')) {
            return $value;
        }
        // Only return absolute URL for API/Frontend requests, keep original relative path for Filament/Admin
        if (request()->is('api/*') || request()->expectsJson()) {
            return asset('storage/' . $value);
        }
        return $value;
    }

    public function getImagesAttribute($value): array
    {
        $images = is_array($value) ? $value : (is_string($value) ? json_decode($value, true) : []);
        if (!is_array($images)) {
            return [];
        }

        if (request()->is('api/*') || request()->expectsJson()) {
            return array_map(function ($img) {
                if (empty($img)) {
                    return '';
                }
                if (str_starts_with($img, 'http://') || str_starts_with($img, 'https://')) {
                    return $img;
                }
                return asset('storage/' . $img);
            }, $images);
        }

        return $images;
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
