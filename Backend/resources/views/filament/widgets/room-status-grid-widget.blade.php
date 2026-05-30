<x-filament-widgets::widget>
    <x-filament::section>
        <x-slot name="heading">
            Room Status Live Grid
        </x-slot>

        <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mt-2">
            @foreach ($this->getRooms() as $room)
                @php
                    $status = $room->status?->value;
                    $bgClass = match ($status) {
                        'available' => 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-400 dark:border-emerald-800',
                        'occupied' => 'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/30 dark:text-rose-400 dark:border-rose-800',
                        'maintenance' => 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/30 dark:text-amber-400 dark:border-amber-800',
                        'out_of_service' => 'bg-slate-100 text-slate-700 border-slate-300 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700',
                        default => 'bg-gray-50 text-gray-700 border-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700',
                    };
                    $dotColor = match ($status) {
                        'available' => 'bg-emerald-500',
                        'occupied' => 'bg-rose-500',
                        'maintenance' => 'bg-amber-500',
                        'out_of_service' => 'bg-slate-500',
                        default => 'bg-gray-500',
                    };
                @endphp
                
                <div class="flex flex-col justify-between p-4 border rounded-xl shadow-sm transition-all duration-300 hover:scale-105 hover:shadow-md {{ $bgClass }}">
                    <div class="flex items-center justify-between mb-2">
                        <span class="text-xl font-bold tracking-tight">Room {{ $room->room_number }}</span>
                        <span class="flex h-3.5 w-3.5 relative">
                            <span class="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 {{ $dotColor }}"></span>
                            <span class="relative inline-flex rounded-full h-3.5 w-3.5 {{ $dotColor }}"></span>
                        </span>
                    </div>
                    <div class="mt-2 text-xs font-semibold uppercase tracking-wider opacity-90">
                        {{ $room->roomType->name }}
                    </div>
                    <div class="mt-1 text-xs opacity-75">
                        Floor {{ $room->floor }}
                    </div>
                    <div class="mt-4 flex items-center justify-between">
                        <span class="text-xs font-bold uppercase tracking-widest">
                            {{ $room->status?->label() ?? ucfirst($status) }}
                        </span>
                    </div>
                </div>
            @endforeach
        </div>
    </x-filament::section>
</x-filament-widgets::widget>
