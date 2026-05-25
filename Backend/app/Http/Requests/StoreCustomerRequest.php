<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreCustomerRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|email|unique:customers,email,' . ($this->customer?->id ?? 'NULL'),
            'phone' => 'nullable|string|max:30',
            'nationality' => 'nullable|string|max:100',
            'country_code' => 'nullable|string|size:2',
            'passport_number' => 'nullable|string|max:50|unique:customers,passport_number,' . ($this->customer?->id ?? 'NULL'),
            'is_vip' => 'boolean',
            'notes' => 'nullable|string',
        ];
    }
}
