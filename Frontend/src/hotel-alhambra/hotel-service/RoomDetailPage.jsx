import { useParams, useNavigate } from "react-router-dom";

const CATEGORIES = [
  {
    key: "rooms",
    label: "Rooms",
    tagline: "Refined Comfort",
    heroImage: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1400&q=80",
    intro:
      "Each room at Alhambra is a carefully composed sanctuary — where contemporary elegance meets the warmth of Moroccan craftsmanship. From Superior to Deluxe Premier, every space is designed to make you feel both at home and far from the ordinary.",
    from: "From €180 / night",
    items: [
      {
        name: "Superior Room",
        size: "35 m²",
        desc: "Sober, elegant and contemporary oriental setting. Refinement, comfort and premium service.",
        image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80",
        features: ["King or Twin Bed", "City View", "En-Suite Bathroom", "Free Wi-Fi"],
        link: "/rooms",
      },
      {
        name: "Deluxe Room",
        size: "55 m²",
        desc: "55 square meters of elegance, luxury and intimacy with breathtaking interior design.",
        image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80",
        features: ["King Bed", "Garden View", "Soaking Tub", "Pillow Menu"],
        link: "/rooms",
      },
      {
        name: "Deluxe Premier Room",
        size: "65 m²",
        desc: "Subtle oriental refinement with pool and garden views, designed for exceptional comfort and prestige.",
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",
        features: ["King Bed", "Pool View", "Private Terrace", "Butler on Call"],
        link: "/rooms",
      },
    ],
  },
  {
    key: "suites",
    label: "Suites",
    tagline: "Elevated Living",
    heroImage: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=1400&q=80",
    intro:
      "The Alhambra Suites are singular worlds — intimate sanctuaries shaped by centuries of Moroccan artistry, enveloped in the finest materials and attended by discreet, personalised service. Each suite is an art of living beyond the ordinary.",
    from: "From €420 / night",
    items: [
      {
        name: "Junior Suite",
        size: "75 m²",
        desc: "Harmonious blend of Moroccan craftsmanship and contemporary luxury with a separate living area.",
        image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&q=80",
        features: ["King Bed", "Living Area", "Garden View", "Rainfall Shower"],
        link: "/suites",
      },
      {
        name: "Senior Suite",
        size: "110 m²",
        desc: "Authentic zellige tilework, a private terrace, and a deep soaking bath carved in white marble.",
        image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&q=80",
        features: ["King Bed", "Private Terrace", "Marble Bath", "Butler Service"],
        link: "/suites",
      },
      {
        name: "Royal Suite",
        size: "185 m²",
        desc: "Cedar-wood ceilings, a private hammam, dedicated butler, and sweeping views of the medina.",
        image: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&q=80",
        features: ["Master Bedroom", "Private Hammam", "Double Living Room", "Panoramic View"],
        link: "/suites",
      },
      {
        name: "Presidential Suite",
        size: "280 m²",
        desc: "An entire floor with two bedrooms, private dining, a rooftop plunge pool, and bespoke Moroccan art.",
        image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80",
        features: ["Two Bedrooms", "Rooftop Plunge Pool", "Private Dining", "Exclusive Art"],
        link: "/suites",
      },
    ],
  },
  {
    key: "villas",
    label: "Villas",
    tagline: "Private Kingdoms",
    heroImage: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=1400&q=80",
    intro:
      "The Alhambra Villas are not merely accommodations — they are private kingdoms. Each villa is a self-contained world, staffed and curated to your desires, where the boundaries between hotel luxury and the intimacy of home dissolve entirely.",
    from: "From €1,200 / night",
    items: [
      {
        name: "Garden Villa",
        size: "220 m²",
        desc: "Nestled within a private walled garden of jasmine and orange blossom with a secluded heated pool.",
        image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800&q=80",
        features: ["Private Heated Pool", "Walled Garden", "2 Bedrooms", "Butler Service"],
        link: "/villas",
      },
      {
        name: "Riad Villa",
        size: "340 m²",
        desc: "An entire traditional riad with a mosaic courtyard, private hammam, and rooftop terrace.",
        image: "https://images.unsplash.com/photo-1602343168117-bb8ffe3e2e9f?w=800&q=80",
        features: ["Mosaic Courtyard", "Private Hammam", "3 Bedrooms", "Full Staff"],
        link: "/villas",
      },
      {
        name: "Palais Villa",
        size: "580 m²",
        desc: "A complete private palace — five bedrooms, two pools, a cinema room, and a private chef.",
        image: "https://images.unsplash.com/photo-1580977276076-ae4b8c219b8e?w=800&q=80",
        features: ["2 Private Pools", "5 Bedrooms", "Private Chef", "Cinema Room"],
        link: "/villas",
      },
    ],
  },
];

const ROOMS = [
  {
    id: 1,
    name: "Superior Room",
    description:
      "In a sober, elegant and contemporary oriental setting, the superior rooms embody refinement, comfort and premium service.",
    image:
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1200&q=80",
  },
  {
    id: 2,
    name: "Deluxe Room",
    description:
      "Each deluxe room offers 55 square meters of elegance, luxury and intimacy with breathtaking interior design.",
    image:
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1200&q=80",
  },
  {
    id: 3,
    name: "Deluxe Premier Room",
    description:
      "A subtle oriental refinement with pool and garden views, designed for exceptional comfort and prestige.",
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&q=80",
  },
];

const SUITES = [
  {
    id: 4,
    name: "Junior Suite",
    size: "75 m²",
    description:
      "The Junior Suite offers a harmonious blend of Moroccan craftsmanship and contemporary luxury. A separate living area, hand-carved stucco walls, and panoramic garden views create an atmosphere of serene indulgence.",
    features: ["King Bed", "Living Area", "Garden View", "Rainfall Shower"],
    image:
      "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=1200&q=80",
    reverse: false,
  },
  {
    id: 5,
    name: "Senior Suite",
    size: "110 m²",
    description:
      "An exceptional retreat spanning 110 square meters of refined opulence. Adorned with authentic zellige tilework, a private terrace overlooking the riad courtyard, and a deep soaking bath carved in white marble.",
    features: ["King Bed", "Private Terrace", "Marble Bath", "Butler Service"],
    image:
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=1200&q=80",
    reverse: true,
  },
  {
    id: 6,
    name: "Royal Suite",
    size: "185 m²",
    description:
      "The pinnacle of Alhambra hospitality. This palatial suite features a double living room with ornate cedar-wood ceilings, a private hammam, dedicated butler, and sweeping views of the medina and Atlas mountains beyond.",
    features: ["Master Bedroom", "Private Hammam", "Double Living Room", "Panoramic View"],
    image:
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=1200&q=80",
    reverse: false,
  },
  {
    id: 7,
    name: "Presidential Suite",
    size: "280 m²",
    description:
      "The ultimate expression of Andalusian grandeur. Occupying an entire floor, with two bedrooms, a private dining room, a rooftop plunge pool, and bespoke Moroccan art commissioned exclusively for this retreat.",
    features: ["Two Bedrooms", "Rooftop Plunge Pool", "Private Dining", "Exclusive Art"],
    image:
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1200&q=80",
    reverse: true,
  },
];

const VILLAS = [
  {
    id: 8,
    name: "Garden Villa",
    size: "220 m²",
    guests: "Up to 4 Guests",
    description:
      "Nestled within a private walled garden of jasmine and orange blossom, the Garden Villa offers a sovereign retreat from the world. A secluded heated pool, shaded terraces, and hand-painted Fassi tilework compose a sanctuary of absolute tranquility.",
    features: ["Private Heated Pool", "Walled Garden", "2 Bedrooms", "Outdoor Dining", "Fireplace", "Butler Service"],
    image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1400&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&q=80",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80",
    ],
    reverse: false,
  },
  {
    id: 9,
    name: "Riad Villa",
    size: "340 m²",
    guests: "Up to 6 Guests",
    description:
      "An entire traditional riad reimagined as a private villa. Centred around a mosaic courtyard with a plashing fountain, this residence unfolds across three bedrooms, a private hammam, a rooftop terrace with panoramic medina views, and a full kitchen staffed at your discretion.",
    features: ["Mosaic Courtyard", "Private Hammam", "3 Bedrooms", "Rooftop Terrace", "Private Kitchen", "Full Staff"],
    image: "https://images.unsplash.com/photo-1602343168117-bb8ffe3e2e9f?w=1400&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600&q=80",
      "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=600&q=80",
    ],
    reverse: true,
  },
  {
    id: 10,
    name: "Palais Villa",
    size: "580 m²",
    guests: "Up to 10 Guests",
    description:
      "The most coveted address at Alhambra. The Palais Villa is a complete private palace — five bedrooms, a grand reception hall adorned with antique Moroccan lanterns, two pools, a cinema room, a private chef, and a personal concierge available around the clock. An experience with no equal.",
    features: ["2 Private Pools", "5 Bedrooms", "Private Chef", "Cinema Room", "Reception Hall", "24h Concierge"],
    image: "https://images.unsplash.com/photo-1580977276076-ae4b8c219b8e?w=1400&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1529408686214-b48b8532f72c?w=600&q=80",
      "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=600&q=80",
    ],
    reverse: false,
  },
];

export default function RoomDetailPage() {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const room = ROOMS.find((r) => r.id === Number(roomId));

  if (!room) return <p style={{ padding: "100px 40px" }}>Room not found</p>;

  return (
    <div style={{ minHeight: "100vh", background: "#f7f3ee", paddingTop: "80px" }}>

      {/* BACK BUTTON */}
      <div style={{ padding: "24px 40px 0" }}>
        <button
          onClick={() => navigate(-1)}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            fontFamily: "Jost, sans-serif",
            fontSize: "0.75rem",
            letterSpacing: "0.12em",
            color: "#3b2e1e",
            textTransform: "uppercase",
          }}
        >
          ← Back
        </button>
      </div>

      {/* HERO IMAGE */}
      <div style={{ margin: "24px 40px 0", overflow: "hidden", height: "500px" }}>
        <img
          src={room.image}
          alt={room.name}
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
        />
      </div>

      {/* CONTENT */}
      <div style={{ padding: "48px 40px 80px", maxWidth: "700px" }}>
        <p style={{ fontSize: "0.7rem", letterSpacing: "0.18em", color: "#b8975a", textTransform: "uppercase", marginBottom: "1rem" }}>
          ALHAMBRA HOTEL
        </p>
        <h1 style={{ fontFamily: "Cormorant Garamond, serif", fontWeight: 300, fontSize: "3rem", color: "#3b2e1e", marginBottom: "1.5rem" }}>
          {room.name}
        </h1>
        <p style={{ fontSize: "0.95rem", lineHeight: 1.9, color: "#6b5c4c", marginBottom: "2.5rem" }}>
          {room.description}
        </p>

        <button
          onClick={() => navigate(`/booking/${room.id}`)}
          style={{
            background: "#b8975a",
            color: "#fff",
            border: "none",
            padding: "14px 36px",
            cursor: "pointer",
            fontFamily: "Jost, sans-serif",
            fontSize: "0.75rem",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            transition: "background 0.2s",
          }}
          onMouseEnter={(e) => (e.target.style.background = "#9a7a42")}
          onMouseLeave={(e) => (e.target.style.background = "#b8975a")}
        >
          BOOK NOW
        </button>
      </div>
    </div>
  );
}