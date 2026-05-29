<?php

namespace Tests\Feature;

use App\Models\User;
use App\Models\Customer;
use App\Models\ContactMessage;
use App\Enums\UserRole;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class UserSyncAuditTest extends TestCase
{
    use RefreshDatabase;

    /**
     * Test registration API creates User and linked Customer and signs them in.
     */
    public function test_user_can_register_successfully(): void
    {
        $response = $this->postJson('/api/register', [
            'first_name'            => 'Samir',
            'last_name'             => 'Belhaj',
            'email'                 => 'samir@example.com',
            'password'              => 'securedpassword123',
            'password_confirmation' => 'securedpassword123',
        ]);

        $response->assertStatus(201);
        $response->assertJson([
            'success' => true,
            'data' => [
                'user' => [
                    'name'  => 'Samir Belhaj',
                    'email' => 'samir@example.com',
                    'role'  => 'customer',
                ]
            ]
        ]);

        $this->assertDatabaseHas('users', [
            'email' => 'samir@example.com',
            'name'  => 'Samir Belhaj',
            'role'  => 'customer',
        ]);

        $this->assertDatabaseHas('customers', [
            'email'      => 'samir@example.com',
            'first_name' => 'Samir',
            'last_name'  => 'Belhaj',
        ]);

        $this->assertAuthenticated();
    }

    /**
     * Test blocked users cannot log in.
     */
    public function test_blocked_user_cannot_login(): void
    {
        $user = User::create([
            'name'       => 'Blocked User',
            'email'      => 'blocked@example.com',
            'password'   => bcrypt('password'),
            'role'       => UserRole::CUSTOMER,
            'is_blocked' => true,
        ]);

        $response = $this->postJson('/api/login', [
            'email'    => 'blocked@example.com',
            'password' => 'password',
        ]);

        $response->assertStatus(403);
        $response->assertJson([
            'success' => false,
            'message' => 'Your account has been blocked. Please contact support.',
        ]);

        $this->assertGuest();
    }

    /**
     * Test middleware blocks active session immediately.
     */
    public function test_middleware_blocks_active_session_of_blocked_user(): void
    {
        $user = User::create([
            'name'       => 'User',
            'email'      => 'test@example.com',
            'password'   => bcrypt('password'),
            'role'       => UserRole::CUSTOMER,
            'is_blocked' => false,
        ]);

        // Simulates request while active
        $response = $this->actingAs($user)->getJson('/api/me');
        $response->assertStatus(200);

        // Now block the user
        $user->update(['is_blocked' => true]);

        // Next request must be rejected with 403 and logged out
        $response2 = $this->actingAs($user)->getJson('/api/me');
        $response2->assertStatus(403);
        $response2->assertJsonStructure(['success', 'message', 'code']);
    }

    /**
     * Test authenticated user can update their profile settings.
     */
    public function test_user_can_update_own_profile(): void
    {
        $user = User::create([
            'name'     => 'Old Name',
            'email'    => 'old@example.com',
            'password' => bcrypt('password'),
            'role'     => UserRole::CUSTOMER,
        ]);

        $response = $this->actingAs($user)->putJson('/api/profile', [
            'name'             => 'New Name',
            'email'            => 'new@example.com',
            'phone'            => '+212 600000000',
            'nationality'      => 'Moroccan',
            'passport_number'  => 'DZ998877',
            'password'         => 'newpassword123',
            'password_confirmation' => 'newpassword123',
        ]);

        $response->assertStatus(200);
        $response->assertJson([
            'success' => true,
            'data' => [
                'user' => [
                    'name'  => 'New Name',
                    'email' => 'new@example.com',
                ]
            ]
        ]);

        $this->assertDatabaseHas('users', [
            'id'    => $user->id,
            'name'  => 'New Name',
            'email' => 'new@example.com',
        ]);

        $this->assertDatabaseHas('customers', [
            'user_id'         => $user->id,
            'email'           => 'new@example.com',
            'phone'           => '+212 600000000',
            'nationality'     => 'Moroccan',
            'passport_number' => 'DZ998877',
        ]);
    }

    /**
     * Test Contact Us Form submission and message persistence.
     */
    public function test_guest_can_submit_contact_message(): void
    {
        $response = $this->postJson('/api/contact', [
            'name'    => 'John Doe',
            'email'   => 'john@example.com',
            'phone'   => '+12345678',
            'subject' => 'Reservation Inquiry',
            'message' => 'Hello, I want to book a villa next month.',
        ]);

        $response->assertStatus(201);
        $this->assertDatabaseHas('contact_messages', [
            'name'    => 'John Doe',
            'email'   => 'john@example.com',
            'subject' => 'Reservation Inquiry',
            'status'  => 'unread',
        ]);
    }

    /**
     * Test admin can manage contact messages (list, reply, delete).
     */
    public function test_admin_can_manage_contact_messages(): void
    {
        $admin = User::create([
            'name'     => 'Admin',
            'email'    => 'admin@example.com',
            'password' => bcrypt('password'),
            'role'     => UserRole::ADMIN,
        ]);

        $msg = ContactMessage::create([
            'name'    => 'John Doe',
            'email'   => 'john@example.com',
            'subject' => 'Inquiry',
            'message' => 'Test message text.',
        ]);

        // Admin list
        $response = $this->actingAs($admin)->getJson('/api/contact-messages');
        $response->assertStatus(200);
        $response->assertJsonCount(1);

        // Admin reply
        $response2 = $this->actingAs($admin)->putJson("/api/contact-messages/{$msg->id}/reply", [
            'reply' => 'This is an email response.',
        ]);
        $response2->assertStatus(200);
        $this->assertDatabaseHas('contact_messages', [
            'id'     => $msg->id,
            'status' => 'replied',
            'reply'  => 'This is an email response.',
        ]);

        // Admin delete
        $response3 = $this->actingAs($admin)->deleteJson("/api/contact-messages/{$msg->id}");
        $response3->assertStatus(200);
        $this->assertDatabaseMissing('contact_messages', ['id' => $msg->id]);
    }

    /**
     * Test admin user management operations.
     */
    public function test_admin_user_directory_operations(): void
    {
        $admin = User::create([
            'name'     => 'Admin User',
            'email'    => 'admin@example.com',
            'password' => bcrypt('password'),
            'role'     => UserRole::ADMIN,
        ]);

        $customer = User::create([
            'name'     => 'Customer User',
            'email'    => 'cust@example.com',
            'password' => bcrypt('password'),
            'role'     => UserRole::CUSTOMER,
        ]);

        // Admin update user role
        $res1 = $this->actingAs($admin)->putJson("/api/users/{$customer->id}/role", [
            'role' => 'receptionist',
        ]);
        $res1->assertStatus(200);
        $this->assertDatabaseHas('users', ['id' => $customer->id, 'role' => 'receptionist']);

        // Admin block user
        $res2 = $this->actingAs($admin)->putJson("/api/users/{$customer->id}/block");
        $res2->assertStatus(200);
        $this->assertDatabaseHas('users', ['id' => $customer->id, 'is_blocked' => true]);

        // Admin delete user
        $res3 = $this->actingAs($admin)->deleteJson("/api/users/{$customer->id}");
        $res3->assertStatus(200);
        $this->assertDatabaseMissing('users', ['id' => $customer->id]);
    }
}
