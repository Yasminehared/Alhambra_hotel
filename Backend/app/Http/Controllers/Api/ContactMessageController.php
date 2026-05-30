<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ContactMessage;
use App\Enums\UserRole;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ContactMessageController extends Controller
{
    /**
     * Store a new contact message (Public).
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name'    => ['required', 'string', 'max:255'],
            'email'   => ['required', 'email', 'max:255'],
            'phone'   => ['nullable', 'string', 'max:30'],
            'subject' => ['required', 'string', 'max:255'],
            'message' => ['required', 'string', 'max:5000'],
        ]);

        $message = ContactMessage::create($validated);

        return response()->json([
            'success' => true,
            'message' => 'Your message has been received. Thank you.',
            'data'    => $message
        ], 201);
    }

    /**
     * Display a listing of all messages (Admin & Receptionist only).
     */
    public function index()
    {
        $user = Auth::user();
        if (!$user || $user->role !== UserRole::ADMIN) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        // Mark messages as read if necessary, or just return them
        $messages = ContactMessage::orderByDesc('created_at')->get();

        return response()->json($messages);
    }

    /**
     * Add a reply to a contact message (Admin & Receptionist only).
     */
    public function reply(Request $request, ContactMessage $message)
    {
        $user = Auth::user();
        if (!$user || $user->role !== UserRole::ADMIN) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $validated = $request->validate([
            'reply' => ['required', 'string', 'max:5000'],
        ]);

        $message->update([
            'reply'  => $validated['reply'],
            'status' => 'replied',
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Reply saved successfully.',
            'data'    => $message
        ]);
    }

    /**
     * Delete a contact message (Admin & Receptionist only).
     */
    public function destroy(ContactMessage $message)
    {
        $user = Auth::user();
        if (!$user || $user->role !== UserRole::ADMIN) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $message->delete();

        return response()->json([
            'success' => true,
            'message' => 'Message deleted successfully.'
        ]);
    }
}
