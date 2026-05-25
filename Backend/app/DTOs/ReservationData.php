<?php

namespace App\DTOs;

class ReservationData
{
    public function __construct(
        public readonly string $check_in,
        public readonly string $check_out,
        public readonly int $customer_id,
        public readonly array $room_ids,
        public readonly int $adults = 1,
        public readonly int $children = 0,
        public readonly ?string $special_requests = null,
        public readonly ?string $payment_method = null,
        public readonly ?string $source = 'direct'
    ) {}

    public static function fromRequest(array $data): self
    {
        return new self(
            check_in: $data['check_in'],
            check_out: $data['check_out'],
            customer_id: (int) $data['customer_id'],
            room_ids: $data['room_ids'] ?? [],
            adults: (int) ($data['adults'] ?? 1),
            children: (int) ($data['children'] ?? 0),
            special_requests: $data['special_requests'] ?? null,
            payment_method: $data['payment_method'] ?? null,
            source: $data['source'] ?? 'direct'
        );
    }

    public function toArray(): array
    {
        return [
            'check_in' => $this->check_in,
            'check_out' => $this->check_out,
            'customer_id' => $this->customer_id,
            'adults' => $this->adults,
            'children' => $this->children,
            'special_requests' => $this->special_requests,
            'payment_method' => $this->payment_method,
            'source' => $this->source,
        ];
    }
}
