<?php

namespace Tests\Feature;

use App\Models\User;
use App\Models\Reservation;
use App\Models\Customer;
use App\Enums\UserRole;
use App\Enums\ReservationStatus;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class RolePermissionTest extends TestCase
{
    use RefreshDatabase;

    public function test_admin_can_perform_any_action_on_reservations(): void
    {
        $admin = User::create([
            'name' => 'Admin User',
            'email' => 'admin@example.com',
            'password' => bcrypt('password'),
            'role' => UserRole::ADMIN,
        ]);

        $customer = Customer::create([
            'first_name' => 'John',
            'last_name' => 'Doe',
            'email' => 'john@example.com',
        ]);

        $reservation = Reservation::create([
            'customer_id' => $customer->id,
            'check_in' => now()->toDateString(),
            'check_out' => now()->addDays(2)->toDateString(),
            'total_price' => 2000.00,
            'status' => ReservationStatus::PENDING,
        ]);

        $this->assertTrue($admin->can('viewAny', Reservation::class));
        $this->assertTrue($admin->can('view', $reservation));
        $this->assertTrue($admin->can('create', Reservation::class));
        $this->assertTrue($admin->can('update', $reservation));
        $this->assertTrue($admin->can('delete', $reservation));
    }

    public function test_receptionist_can_view_create_and_update_reservations_but_cannot_delete(): void
    {
        $receptionist = User::create([
            'name' => 'Receptionist User',
            'email' => 'recep@example.com',
            'password' => bcrypt('password'),
            'role' => UserRole::RECEPTIONIST,
        ]);

        $customer = Customer::create([
            'first_name' => 'John',
            'last_name' => 'Doe',
            'email' => 'john@example.com',
        ]);

        $reservation = Reservation::create([
            'customer_id' => $customer->id,
            'check_in' => now()->toDateString(),
            'check_out' => now()->addDays(2)->toDateString(),
            'total_price' => 2000.00,
            'status' => ReservationStatus::PENDING,
        ]);

        $this->assertTrue($receptionist->can('viewAny', Reservation::class));
        $this->assertTrue($receptionist->can('view', $reservation));
        $this->assertTrue($receptionist->can('create', Reservation::class));
        $this->assertTrue($receptionist->can('update', $reservation));
        $this->assertFalse($receptionist->can('delete', $reservation));
    }

    public function test_housekeeping_cannot_view_create_update_or_delete_reservations(): void
    {
        $housekeeping = User::create([
            'name' => 'Housekeeping User',
            'email' => 'house@example.com',
            'password' => bcrypt('password'),
            'role' => UserRole::HOUSEKEEPING,
        ]);

        $customer = Customer::create([
            'first_name' => 'John',
            'last_name' => 'Doe',
            'email' => 'john@example.com',
        ]);

        $reservation = Reservation::create([
            'customer_id' => $customer->id,
            'check_in' => now()->toDateString(),
            'check_out' => now()->addDays(2)->toDateString(),
            'total_price' => 2000.00,
            'status' => ReservationStatus::PENDING,
        ]);

        $this->assertFalse($housekeeping->can('viewAny', Reservation::class));
        $this->assertFalse($housekeeping->can('view', $reservation));
        $this->assertFalse($housekeeping->can('create', Reservation::class));
        $this->assertFalse($housekeeping->can('update', $reservation));
        $this->assertFalse($housekeeping->can('delete', $reservation));
    }
}
