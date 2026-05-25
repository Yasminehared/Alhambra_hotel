<?php

namespace App\Models;

use App\Enums\PaymentStatus;
use App\Traits\HasReference;
use App\Traits\HasAuditColumns;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Payment extends Model
{
    use HasFactory, HasReference, HasAuditColumns;

    protected $fillable = [
        'reservation_id',
        'amount',
        'payment_method',
        'payment_status',
        'transaction_reference',
        'notes',
        'paid_at',
    ];

    protected $casts = [
        'amount' => 'decimal:2',
        'payment_status' => PaymentStatus::class,
        'paid_at' => 'datetime',
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($payment) {
            if (empty($payment->transaction_reference)) {
                $payment->transaction_reference = self::generateUniqueReference('TXN-', 'transaction_reference');
            }
        });
    }

    public function reservation(): BelongsTo
    {
        return $this->belongsTo(Reservation::class);
    }
}
