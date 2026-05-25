<?php

namespace App\DTOs;

class MaintenanceData
{
    public function __construct(
        public readonly int $room_id,
        public readonly string $title,
        public readonly ?string $description = null,
        public readonly string $priority = 'medium',
        public readonly ?string $assigned_to = null,
        public readonly bool $blocks_room = false
    ) {}

    public static function fromRequest(array $data): self
    {
        return new self(
            room_id: (int) $data['room_id'],
            title: $data['title'],
            description: $data['description'] ?? null,
            priority: $data['priority'] ?? 'medium',
            assigned_to: $data['assigned_to'] ?? null,
            blocks_room: (bool) ($data['blocks_room'] ?? false)
        );
    }

    public function toArray(): array
    {
        return [
            'room_id' => $this->room_id,
            'title' => $this->title,
            'description' => $this->description,
            'priority' => $this->priority,
            'assigned_to' => $this->assigned_to,
            'blocks_room' => $this->blocks_room,
        ];
    }
}
