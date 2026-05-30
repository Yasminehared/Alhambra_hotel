<?php

namespace App\Filament\Resources\ServiceClientResource\Pages;

use App\Filament\Resources\ServiceClientResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListServiceClientMessages extends ListRecords
{
    protected static string $resource = ServiceClientResource::class;

    protected function getHeaderActions(): array
    {
        return [];
    }
}
