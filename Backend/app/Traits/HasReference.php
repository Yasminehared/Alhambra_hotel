<?php

namespace App\Traits;

use Illuminate\Support\Str;

trait HasReference
{
    /**
     * Generate a unique reference.
     *
     * @param string $prefix
     * @param string $column
     * @return string
     */
    public static function generateUniqueReference(string $prefix = 'REF-', string $column = 'reference'): string
    {
        $datePart = date('Ymd');
        $randomPart = strtoupper(Str::random(4));
        $ref = $prefix . $datePart . '-' . $randomPart;

        while (self::where($column, $ref)->exists()) {
            $randomPart = strtoupper(Str::random(4));
            $ref = $prefix . $datePart . '-' . $randomPart;
        }

        return $ref;
    }
}
