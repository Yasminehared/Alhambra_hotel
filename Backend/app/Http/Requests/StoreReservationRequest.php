<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreReservationRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true; // Access authorization is delegated to Policies
    }

    public function rules(): array
    {
        return [
            'check_in' => 'required|date|after_or_equal:today',
            'check_out' => 'required|date|after:check_in',
            'customer_id' => 'required|exists:customers,id',
            'room_ids' => 'required|array|min:1',
            'room_ids.*' => 'required|exists:rooms,id',
            'adults' => 'integer|min:1',
            'children' => 'integer|min:0',
            'special_requests' => 'nullable|string',
            'payment_method' => 'nullable|string|in:cash,card,bank_transfer,online',
            'source' => 'nullable|string|in:direct,booking.com,expedia,airbnb',
        ];
    }
}
