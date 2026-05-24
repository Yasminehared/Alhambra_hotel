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

export default function BookingPage() {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const room = ROOMS.find((r) => r.id === Number(roomId));

  if (!room) return <p style={{ padding: "100px 40px" }}>Room not found</p>;

  return (
    <div style={{ minHeight: "100vh", background: "#f7f3ee", paddingTop: "80px", fontFamily: "Jost, sans-serif" }}>

      {/* BACK */}
      <div style={{ padding: "24px 40px 0" }}>
        <button
          onClick={() => navigate(-1)}
          style={{
            background: "none", border: "none", cursor: "pointer",
            fontFamily: "Jost, sans-serif", fontSize: "0.75rem",
            letterSpacing: "0.12em", color: "#3b2e1e", textTransform: "uppercase",
          }}
        >
          ← Back
        </button>
      </div>

      {/* MAIN GRID */}
      <div style={{
        display: "grid", gridTemplateColumns: "1fr 1fr",
        gap: "0", margin: "32px 40px 80px", background: "#fff",
      }}>

        {/* LEFT — IMAGE + ROOM INFO */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <img
            src={room.image} alt={room.name}
            style={{ width: "100%", height: "320px", objectFit: "cover", display: "block" }}
          />
          <div style={{ padding: "40px", borderRight: "1px solid #ede8e1" }}>
            <p style={{ fontSize: "0.65rem", letterSpacing: "0.18em", color: "#b8975a", textTransform: "uppercase", marginBottom: "0.6rem" }}>
              ALHAMBRA HOTEL
            </p>
            <h2 style={{ fontFamily: "Cormorant Garamond, serif", fontWeight: 300, fontSize: "2.2rem", color: "#3b2e1e", marginBottom: "1.5rem" }}>
              {room.name}
            </h2>

            {/* DETAILS */}
            {[
              { label: "Check-in", value: "From 3:00 PM" },
              { label: "Check-out", value: "Until 12:00 PM" },
              { label: "Bed type", value: "King Size" },
              { label: "Surface", value: "45 m²" },
              { label: "View", value: "Garden & Pool" },
            ].map((item) => (
              <div key={item.label} style={{
                display: "flex", justifyContent: "space-between",
                padding: "10px 0", borderBottom: "1px solid #f0ebe3",
              }}>
                <span style={{ fontSize: "0.78rem", color: "#999", letterSpacing: "0.08em" }}>{item.label}</span>
                <span style={{ fontSize: "0.82rem", color: "#3b2e1e" }}>{item.value}</span>
              </div>
            ))}

            {/* PRICE */}
            <div style={{ marginTop: "2rem", display: "flex", alignItems: "baseline", gap: "8px" }}>
              <span style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "2.4rem", fontWeight: 300, color: "#b8975a" }}>
                {room.price}
              </span>
              <span style={{ fontSize: "0.7rem", color: "#999", letterSpacing: "0.1em" }}>MAD / NIGHT</span>
            </div>
          </div>
        </div>

        {/* RIGHT — FORM */}
        <div style={{ padding: "48px 48px" }}>
          <h3 style={{ fontFamily: "Cormorant Garamond, serif", fontWeight: 300, fontSize: "1.8rem", color: "#3b2e1e", marginBottom: "2rem" }}>
            Your Reservation
          </h3>

          {/* DATES */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "20px" }}>
            <div>
              <label style={labelStyle}>Check-in</label>
              <input type="date" style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Check-out</label>
              <input type="date" style={inputStyle} />
            </div>
          </div>

          {/* GUESTS */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "20px" }}>
            <div>
              <label style={labelStyle}>Adults</label>
              <select style={inputStyle}>
                {[1, 2, 3, 4].map((n) => <option key={n}>{n}</option>)}
              </select>
            </div>
            <div>
              <label style={labelStyle}>Children</label>
              <select style={inputStyle}>
                {[0, 1, 2, 3].map((n) => <option key={n}>{n}</option>)}
              </select>
            </div>
          </div>

          {/* PERSONAL INFO */}
          <div style={{ marginBottom: "20px" }}>
            <label style={labelStyle}>Full Name</label>
            <input type="text" placeholder="Your full name" style={inputStyle} />
          </div>
          <div style={{ marginBottom: "20px" }}>
            <label style={labelStyle}>Email</label>
            <input type="email" placeholder="your@email.com" style={inputStyle} />
          </div>
          <div style={{ marginBottom: "20px" }}>
            <label style={labelStyle}>Phone</label>
            <input type="tel" placeholder="+212 600 000 000" style={inputStyle} />
          </div>

          {/* SPECIAL REQUESTS */}
          <div style={{ marginBottom: "32px" }}>
            <label style={labelStyle}>Special Requests</label>
            <textarea
              placeholder="Any special requests or notes..."
              rows={3}
              style={{ ...inputStyle, resize: "none", lineHeight: 1.6 }}
            />
          </div>

          {/* SUBMIT */}
          <button
            style={{
              width: "100%", background: "#b8975a", color: "#fff",
              border: "none", padding: "16px", cursor: "pointer",
              fontFamily: "Jost, sans-serif", fontSize: "0.75rem",
              letterSpacing: "0.16em", textTransform: "uppercase",
              transition: "background 0.2s",
            }}
            onMouseEnter={(e) => (e.target.style.background = "#9a7a42")}
            onMouseLeave={(e) => (e.target.style.background = "#b8975a")}
          >
            Confirm Reservation
          </button>

          <p style={{ marginTop: "1rem", fontSize: "0.72rem", color: "#aaa", textAlign: "center", lineHeight: 1.6 }}>
            Free cancellation up to 48 hours before arrival
          </p>
        </div>
      </div>
    </div>
  );
}

const labelStyle = {
  display: "block",
  fontSize: "0.65rem",
  letterSpacing: "0.12em",
  textTransform: "uppercase",
  color: "#999",
  marginBottom: "6px",
};

const inputStyle = {
  width: "100%",
  padding: "10px 12px",
  border: "1px solid #e8e0d5",
  fontFamily: "Jost, sans-serif",
  fontSize: "0.85rem",
  color: "#3b2e1e",
  background: "#faf8f5",
  outline: "none",
  appearance: "none",
};