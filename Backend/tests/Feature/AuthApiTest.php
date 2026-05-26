<?php

namespace Tests\Feature;

use App\Models\User;
use App\Enums\UserRole;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AuthApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_user_can_login_with_correct_credentials(): void
    {
        $user = User::create([
            'name'     => 'Test User',
            'email'    => 'test@example.com',
            'password' => bcrypt('password'),
            'role'     => UserRole::ADMIN,
        ]);

        $response = $this->postJson('/api/login', [
            'email'    => 'test@example.com',
            'password' => 'password',
        ]);

        $response->assertStatus(200);
        $response->assertJson([
            'success' => true,
            'data' => [
                'user' => [
                    'email' => 'test@example.com',
                    'role'  => 'admin',
                ],
            ],
        ]);

        $this->assertAuthenticatedAs($user);
    }

    public function test_user_cannot_login_with_incorrect_password(): void
    {
        $user = User::create([
            'name'     => 'Test User',
            'email'    => 'test@example.com',
            'password' => bcrypt('password'),
            'role'     => UserRole::RECEPTIONIST,
        ]);

        $response = $this->postJson('/api/login', [
            'email'    => 'test@example.com',
            'password' => 'wrongpassword',
        ]);

        $response->assertStatus(422);
        $response->assertJson([
            'success' => false,
        ]);

        $this->assertGuest();
    }

    public function test_can_retrieve_current_authenticated_user_profile(): void
    {
        $user = User::create([
            'name'     => 'Test User',
            'email'    => 'test@example.com',
            'password' => bcrypt('password'),
            'role'     => UserRole::HOUSEKEEPING,
        ]);

        $response = $this->actingAs($user)->getJson('/api/me');

        $response->assertStatus(200);
        $response->assertJson([
            'success' => true,
            'data' => [
                'user' => [
                    'email' => 'test@example.com',
                    'role'  => 'housekeeping',
                ],
            ],
        ]);
    }

    public function test_guest_retrieving_profile_gets_unauthorized(): void
    {
        $response = $this->getJson('/api/me');

        $response->assertStatus(401);
        $response->assertJson([
            'success' => false,
            'message' => 'Unauthenticated.',
        ]);
    }

    public function test_user_can_logout(): void
    {
        $user = User::create([
            'name'     => 'Test User',
            'email'    => 'test@example.com',
            'password' => bcrypt('password'),
            'role'     => UserRole::ADMIN,
        ]);

        $response = $this->actingAs($user)->postJson('/api/logout');

        $response->assertStatus(200);
        $response->assertJson([
            'success' => true,
            'message' => 'Logged out successfully.',
        ]);

        $this->assertGuest();
    }
}
