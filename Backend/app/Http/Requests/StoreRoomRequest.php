<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreRoomRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'room_type_id' => 'required|exists:room_types,id',
            'room_number' => 'required|string|unique:rooms,room_number,' . ($this->room?->id ?? 'NULL'),
            'floor' => 'required|integer|min:0',
            'status' => 'required|string|in:available,occupied,maintenance,out_of_service',
            'is_active' => 'boolean',
        ];
    }
}
