<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\RoomType;
use App\Models\Room;
use App\Models\Customer;
use App\Models\Reservation;
use App\Models\MaintenanceTicket;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Create Default Users
        $admin = User::updateOrCreate(
            ['email' => 'admin@alhambra.com'],
            [
                'name' => 'Alhambra Admin',
                'password' => Hash::make('password'),
                'email_verified_at' => now(),
                'role' => 'admin',
            ]
        );

        $receptionist = User::updateOrCreate(
            ['email' => 'receptionist@alhambra.com'],
            [
                'name' => 'Alhambra Receptionist',
                'password' => Hash::make('password'),
                'email_verified_at' => now(),
                'role' => 'receptionist',
            ]
        );

        $housekeeping = User::updateOrCreate(
            ['email' => 'housekeeping@alhambra.com'],
            [
                'name' => 'Alhambra Housekeeping',
                'password' => Hash::make('password'),
                'email_verified_at' => now(),
                'role' => 'housekeeping',
            ]
        );

        // 2. Seed Room Types
        $roomTypesData = [
            [
                'name' => 'Superior Room',
                'slug' => 'superior-room',
                'category' => 'room',
                'description' => 'Sober, elegant and contemporary oriental setting. Refinement, comfort and premium service.',
                'short_description' => 'Elegant comfort with contemporary oriental decor.',
                'base_price' => 1800.00,
                'capacity' => 2,
                'size_sqm' => 35,
                'amenities' => ['King or Twin Bed', 'City View', 'En-Suite Bathroom', 'Free Wi-Fi', 'Minibar', 'Safe'],
                'images' => ['https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1200&q=80'],
                'hero_image' => 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1200&q=80',
                'sort_order' => 1,
            ],
            [
                'name' => 'Deluxe Room',
                'slug' => 'deluxe-room',
                'category' => 'room',
                'description' => '55 square meters of elegance, luxury and intimacy with breathtaking interior design.',
                'short_description' => 'Spacious luxury with premium garden view settings.',
                'base_price' => 2400.00,
                'capacity' => 2,
                'size_sqm' => 55,
                'amenities' => ['King Bed', 'Garden View', 'Soaking Tub', 'Pillow Menu', 'Espresso Machine', 'Free Wi-Fi'],
                'images' => ['https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1200&q=80'],
                'hero_image' => 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1200&q=80',
                'sort_order' => 2,
            ],
            [
                'name' => 'Deluxe Premier Room',
                'slug' => 'deluxe-premier-room',
                'category' => 'room',
                'description' => 'Subtle oriental refinement with pool and garden views, designed for exceptional comfort and prestige.',
                'short_description' => 'Prestige room with private balcony and pool view.',
                'base_price' => 2900.00,
                'capacity' => 2,
                'size_sqm' => 65,
                'amenities' => ['King Bed', 'Pool View', 'Private Terrace', 'Butler on Call', 'Marble Bathroom', 'Free Wi-Fi'],
                'images' => ['https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&q=80'],
                'hero_image' => 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&q=80',
                'sort_order' => 3,
            ],
            [
                'name' => 'Junior Suite',
                'slug' => 'junior-suite',
                'category' => 'suite',
                'description' => 'Harmonious blend of Moroccan craftsmanship and contemporary luxury with a separate living area.',
                'short_description' => 'Authentic luxury suite with separate sitting space.',
                'base_price' => 4200.00,
                'capacity' => 2,
                'size_sqm' => 75,
                'amenities' => ['King Bed', 'Living Area', 'Garden View', 'Rainfall Shower', '24h Room Service', 'Free Wi-Fi'],
                'images' => ['https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=1200&q=80'],
                'hero_image' => 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=1200&q=80',
                'sort_order' => 4,
            ],
            [
                'name' => 'Senior Suite',
                'slug' => 'senior-suite',
                'category' => 'suite',
                'description' => 'Authentic zellige tilework, a private terrace, and a deep soaking bath carved in white marble.',
                'short_description' => 'Spacious suite with custom artisan detail work.',
                'base_price' => 5500.00,
                'capacity' => 4,
                'size_sqm' => 110,
                'amenities' => ['King Bed', 'Private Terrace', 'Marble Bath', 'Butler Service', 'Walk-in Closet', 'Free Wi-Fi'],
                'images' => ['https://images.unsplash.com/photo-1590490360182-c33d57733427?w=1200&q=80'],
                'hero_image' => 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=1200&q=80',
                'sort_order' => 5,
            ],
            [
                'name' => 'Royal Suite',
                'slug' => 'royal-suite',
                'category' => 'suite',
                'description' => 'Cedar-wood ceilings, a private hammam, dedicated butler, and sweeping views of the medina.',
                'short_description' => 'Palatial penthouse with private hammam.',
                'base_price' => 8500.00,
                'capacity' => 4,
                'size_sqm' => 185,
                'amenities' => ['Master Bedroom', 'Private Hammam', 'Double Living Room', 'Panoramic View', 'Private Bar', 'Dedicated Butler'],
                'images' => ['https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=1200&q=80'],
                'hero_image' => 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=1200&q=80',
                'sort_order' => 6,
            ],
            [
                'name' => 'Presidential Suite',
                'slug' => 'presidential-suite',
                'category' => 'suite',
                'description' => 'An entire floor with two bedrooms, private dining, a rooftop plunge pool, and bespoke Moroccan art.',
                'short_description' => 'The ultimate luxury estate covering an entire floor.',
                'base_price' => 12500.00,
                'capacity' => 6,
                'size_sqm' => 280,
                'amenities' => ['Two Bedrooms', 'Rooftop Plunge Pool', 'Private Dining', 'Exclusive Art', 'Private Gym Access', 'Dedicated Chef'],
                'images' => ['https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1200&q=80'],
                'hero_image' => 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1200&q=80',
                'sort_order' => 7,
            ],
            [
                'name' => 'Garden Villa',
                'slug' => 'garden-villa',
                'category' => 'villa',
                'description' => 'Nestled within a private walled garden of jasmine and orange blossom with a secluded heated pool.',
                'short_description' => 'Private sovereign garden retreat with pool.',
                'base_price' => 12000.00,
                'capacity' => 4,
                'size_sqm' => 220,
                'amenities' => ['Private Heated Pool', 'Walled Garden', '2 Bedrooms', 'Butler Service', 'Outdoor Fireplace', 'Private Dining'],
                'images' => ['https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1200&q=80'],
                'hero_image' => 'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1200&q=80',
                'sort_order' => 8,
            ],
            [
                'name' => 'Riad Villa',
                'slug' => 'riad-villa',
                'category' => 'villa',
                'description' => 'An entire traditional riad with a mosaic courtyard, private hammam, and rooftop terrace.',
                'short_description' => 'Authentic riad offering private luxury and service.',
                'base_price' => 18000.00,
                'capacity' => 6,
                'size_sqm' => 340,
                'amenities' => ['Mosaic Courtyard', 'Private Hammam', '3 Bedrooms', 'Full Staff', 'Rooftop Lounge', 'Moroccan Tea Salon'],
                'images' => ['https://images.unsplash.com/photo-1602343168117-bb8ffe3e2e9f?w=1200&q=80'],
                'hero_image' => 'https://images.unsplash.com/photo-1602343168117-bb8ffe3e2e9f?w=1200&q=80',
                'sort_order' => 9,
            ],
            [
                'name' => 'Palais Villa',
                'slug' => 'palais-villa',
                'category' => 'villa',
                'description' => 'A complete private palace — five bedrooms, two pools, a cinema room, and a private chef.',
                'short_description' => 'Grand custom private palace with ultimate amenities.',
                'base_price' => 35000.00,
                'capacity' => 10,
                'size_sqm' => 580,
                'amenities' => ['2 Private Pools', '5 Bedrooms', 'Private Chef', 'Cinema Room', 'Grand Reception Hall', '24h Concierge Service'],
                'images' => ['https://images.unsplash.com/photo-1580977276076-ae4b8c219b8e?w=1200&q=80'],
                'hero_image' => 'https://images.unsplash.com/photo-1580977276076-ae4b8c219b8e?w=1200&q=80',
                'sort_order' => 10,
            ],
        ];

        $createdRoomTypes = [];
        $roomTypeAmenities = [];
        foreach ($roomTypesData as $data) {
            $amenities = $data['amenities'] ?? [];
            unset($data['amenities']);
            $roomType = RoomType::create($data);
            $createdRoomTypes[$data['slug']] = $roomType;
            $roomTypeAmenities[$roomType->id] = $amenities;
        }

        // Create unique amenities in the database
        $allAmenityNames = [];
        foreach ($roomTypeAmenities as $amenities) {
            $allAmenityNames = array_merge($allAmenityNames, $amenities);
        }
        $allAmenityNames = array_unique($allAmenityNames);

        $createdAmenities = [];
        foreach ($allAmenityNames as $name) {
            $createdAmenities[$name] = \App\Models\Amenity::firstOrCreate([
                'name' => $name,
                'slug' => Str::slug($name),
            ]);
        }

        // 3. Seed Rooms
        $roomsData = [
            // Superior Rooms
            ['room_number' => '101', 'floor' => 1, 'slug' => 'superior-room'],
            ['room_number' => '102', 'floor' => 1, 'slug' => 'superior-room'],
            ['room_number' => '103', 'floor' => 1, 'slug' => 'superior-room'],
            ['room_number' => '104', 'floor' => 1, 'slug' => 'superior-room'],

            // Deluxe Rooms
            ['room_number' => '201', 'floor' => 2, 'slug' => 'deluxe-room'],
            ['room_number' => '202', 'floor' => 2, 'slug' => 'deluxe-room'],
            ['room_number' => '203', 'floor' => 2, 'slug' => 'deluxe-room'],

            // Deluxe Premier Rooms
            ['room_number' => '301', 'floor' => 3, 'slug' => 'deluxe-premier-room'],
            ['room_number' => '302', 'floor' => 3, 'slug' => 'deluxe-premier-room'],

            // Suites
            ['room_number' => '401', 'floor' => 4, 'slug' => 'junior-suite'],
            ['room_number' => '402', 'floor' => 4, 'slug' => 'junior-suite'],
            ['room_number' => '501', 'floor' => 5, 'slug' => 'senior-suite'],
            ['room_number' => '601', 'floor' => 6, 'slug' => 'royal-suite'],
            ['room_number' => '701', 'floor' => 7, 'slug' => 'presidential-suite'],

            // Villas
            ['room_number' => 'V1', 'floor' => 1, 'slug' => 'garden-villa'],
            ['room_number' => 'V2', 'floor' => 1, 'slug' => 'riad-villa'],
            ['room_number' => 'V3', 'floor' => 1, 'slug' => 'palais-villa'],
        ];

        $allRooms = [];
        foreach ($roomsData as $r) {
            $roomType = $createdRoomTypes[$r['slug']];
            $room = Room::create([
                'room_type_id' => $roomType->id,
                'room_number' => $r['room_number'],
                'floor' => $r['floor'],
                'status' => 'available',
            ]);
            $allRooms[] = $room;

            // Attach amenities for this room type
            $amenityNames = $roomTypeAmenities[$roomType->id] ?? [];
            foreach ($amenityNames as $name) {
                if (isset($createdAmenities[$name])) {
                    $room->amenities()->attach($createdAmenities[$name]->id);
                }
            }
        }

        // 4. Seed Customers
        $customersData = [
            [
                'first_name' => 'Sophia',
                'last_name' => 'Loren',
                'email' => 'sophia@example.com',
                'phone' => '+39 333 456789',
                'nationality' => 'Italian',
                'country_code' => 'IT',
                'passport_number' => 'YA9876543',
                'is_vip' => true,
                'notes' => 'Prefers garden views and sparkling water.',
            ],
            [
                'first_name' => 'John',
                'last_name' => 'Smith',
                'email' => 'john.smith@example.com',
                'phone' => '+1 555 0199',
                'nationality' => 'American',
                'country_code' => 'US',
                'passport_number' => 'US1234567',
                'is_vip' => false,
                'notes' => 'Corporate frequent traveler.',
            ],
            [
                'first_name' => 'Yasmine',
                'last_name' => 'Hared',
                'email' => 'yasmine.hared@example.com',
                'phone' => '+212 661 123456',
                'nationality' => 'Moroccan',
                'country_code' => 'MA',
                'passport_number' => 'MA5566778',
                'is_vip' => true,
                'notes' => 'Prefers Riad Villa, loves local traditional tea.',
            ],
            [
                'first_name' => 'Liam',
                'last_name' => 'Neeson',
                'email' => 'liam@example.com',
                'phone' => '+44 7911 123456',
                'nationality' => 'Irish',
                'country_code' => 'IE',
                'passport_number' => 'IE4455221',
                'is_vip' => true,
                'notes' => 'Needs maximum privacy and security arrangements.',
            ],
            [
                'first_name' => 'Jean',
                'last_name' => 'Dupont',
                'email' => 'jean.dupont@example.com',
                'phone' => '+33 6 1234 5678',
                'nationality' => 'French',
                'country_code' => 'FR',
                'passport_number' => 'FR8899776',
                'is_vip' => false,
            ]
        ];

        $customers = [];
        foreach ($customersData as $c) {
            $customers[] = Customer::create($c);
        }

        // 5. Seed Reservations
        // Completed/Checked-out historical reservation
        $res1 = Reservation::create([
            'reference' => 'RES-20260101-H12A',
            'customer_id' => $customers[1]->id, // John Smith
            'check_in' => now()->subDays(15)->format('Y-m-d'),
            'check_out' => now()->subDays(10)->format('Y-m-d'),
            'adults' => 2,
            'children' => 0,
            'status' => 'checked_out',
            'payment_status' => 'paid',
            'payment_method' => 'card',
            'total_price' => 9000.00, // 5 nights x 1800
            'amount_paid' => 9000.00,
            'source' => 'booking.com',
            'special_requests' => 'Quiet room preferred.',
            'checked_in_at' => now()->subDays(15)->setHour(14),
            'checked_out_at' => now()->subDays(10)->setHour(11),
        ]);
        $res1->rooms()->attach($allRooms[0]->id, ['price_per_night' => 1800.00]);

        // Active/Checked-in reservation
        $occupiedRoom = $allRooms[4]; // Room 202 (Deluxe)
        $occupiedRoom->update(['status' => 'occupied']);
        $res2 = Reservation::create([
            'reference' => 'RES-20260215-F456',
            'customer_id' => $customers[0]->id, // Sophia Loren
            'check_in' => now()->subDays(2)->format('Y-m-d'),
            'check_out' => now()->addDays(3)->format('Y-m-d'),
            'adults' => 1,
            'children' => 0,
            'status' => 'checked_in',
            'payment_status' => 'paid',
            'payment_method' => 'online',
            'total_price' => 12000.00, // 5 nights x 2400
            'amount_paid' => 12000.00,
            'source' => 'direct',
            'special_requests' => 'VIP Airport pickup requested.',
            'checked_in_at' => now()->subDays(2)->setHour(15),
        ]);
        $res2->rooms()->attach($occupiedRoom->id, ['price_per_night' => 2400.00]);

        // Upcoming confirmed reservation
        $reservedRoom = $allRooms[14]; // Villa V2 (Riad Villa)
        $res3 = Reservation::create([
            'reference' => 'RES-20260220-Y890',
            'customer_id' => $customers[2]->id, // Yasmine Hared
            'check_in' => now()->addDays(2)->format('Y-m-d'),
            'check_out' => now()->addDays(7)->format('Y-m-d'),
            'adults' => 4,
            'children' => 2,
            'status' => 'confirmed',
            'payment_status' => 'partial',
            'payment_method' => 'bank_transfer',
            'total_price' => 90000.00, // 5 nights x 18000
            'amount_paid' => 45000.00,
            'source' => 'direct',
            'special_requests' => 'Wants extra mint tea preparation ingredients and traditional Moroccan cookies upon arrival.',
            'confirmed_at' => now()->subDays(1),
        ]);
        $res3->rooms()->attach($reservedRoom->id, ['price_per_night' => 18000.00]);

        // Pending upcoming reservation
        $res4 = Reservation::create([
            'reference' => 'RES-20260225-P098',
            'customer_id' => $customers[3]->id, // Liam Neeson
            'check_in' => now()->addDays(10)->format('Y-m-d'),
            'check_out' => now()->addDays(14)->format('Y-m-d'),
            'adults' => 2,
            'children' => 0,
            'status' => 'pending',
            'payment_status' => 'unpaid',
            'total_price' => 34000.00, // 4 nights x 8500
            'amount_paid' => 0.00,
            'source' => 'direct',
            'special_requests' => 'Strict confidentiality, separate elevator usage.',
        ]);
        $res4->rooms()->attach($allRooms[11]->id, ['price_per_night' => 8500.00]);

        // 6. Seed Maintenance Tickets
        $maintenanceRoom = $allRooms[1]; // Room 102 (Superior)
        $maintenanceRoom->update(['status' => 'maintenance']);
        MaintenanceTicket::create([
            'room_id' => $maintenanceRoom->id,
            'title' => 'AC leakage in bathroom ceiling',
            'description' => 'Water dripping slowly from the AC outlet above the sink. Needs immediate technician repair.',
            'status' => 'in_progress',
            'priority' => 'critical',
            'assigned_to' => 'Technician Khalid',
            'blocks_room' => true,
            'reported_at' => now()->subDay(),
        ]);

        // Resolved ticket
        MaintenanceTicket::create([
            'room_id' => $allRooms[2]->id, // Room 103
            'title' => 'Broken window handle',
            'description' => 'Window handle in the bedroom is loose and won\'t lock fully.',
            'status' => 'resolved',
            'priority' => 'low',
            'assigned_to' => 'Technician Khalid',
            'blocks_room' => false,
            'resolution_notes' => 'Replaced window handle latch and tightened hinges. Working perfectly.',
            'reported_at' => now()->subDays(5),
            'resolved_at' => now()->subDays(4),
        ]);
    }
}
