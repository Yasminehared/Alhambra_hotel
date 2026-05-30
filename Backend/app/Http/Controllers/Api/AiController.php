<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class AiController extends Controller
{
    public function chat(Request $request)
    {
        $message = strtolower($request->input('message', ''));
        
        $reply = $this->getSmartReply($message);
        
        return response()->json([
            'reply' => $reply
        ]);
    }

    private function getSmartReply($message)
    {
        // Simple but smart knowledge-based response system
        if (Str::contains($message, ['hello', 'hi', 'hey', 'bonjour', 'salam'])) {
            return "Hello! Welcome to Alhambra Hotel. I'm your virtual concierge. How can I assist you with your stay or booking today?";
        }

        if (Str::contains($message, ['room', 'chamber', 'suite', 'villa', 'stay', 'price'])) {
            return "We offer a variety of luxury accommodations including Deluxe Rooms, Junior Suites, and Private Villas. You can browse them in our 'Stay' section. Prices start from $250/night for standard rooms. Would you like me to show you the available types?";
        }

        if (Str::contains($message, ['book', 'reserve', 'reservation'])) {
            return "To make a reservation, you can go to our 'Booking' page or select a specific room from the 'Stay' section. Our booking process is simple and secure. Do you need help with specific dates?";
        }

        if (Str::contains($message, ['location', 'where', 'address', 'tanger', 'tangier'])) {
            return "Alhambra Hotel is located in the beautiful city of Tangier, Morocco, overlooking the Mediterranean Sea. Our address is: 123 Boulevard de la Corniche, Tangier. It's a perfect spot for both business and leisure.";
        }

        if (Str::contains($message, ['food', 'restaurant', 'eat', 'dinner', 'breakfast'])) {
            return "We have three world-class restaurants serving Mediterranean, Traditional Moroccan, and International cuisines. Breakfast is served from 7:00 AM to 10:30 AM daily. Would you like to see our menus?";
        }

        if (Str::contains($message, ['contact', 'phone', 'email', 'help'])) {
            return "You can reach our reception 24/7 at +212 5 39 12 34 56 or email us at contact@alhambra-hotel.com. We're always here to help!";
        }

        if (Str::contains($message, ['thank', 'merci', 'shukran'])) {
            return "You're very welcome! Is there anything else I can do for you? I'm here to make your experience at Alhambra exceptional.";
        }

        return "That's an interesting question! While I'm still learning, I can certainly help you with room bookings, restaurant info, or general questions about the hotel. Could you please provide more details?";
    }
}
