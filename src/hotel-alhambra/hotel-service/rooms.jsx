import { useState } from "react";
import { Search, User, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import "./rooms.css";

const ROOMS = [
  {
    id: 1,
    name: "Superior Room",
    description:
      "In a sober, elegant and contemporary oriental setting, the superior rooms embody refinement, comfort and premium service.",
    image:
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1200&q=80",
    reverse: false,
  },
  {
    id: 2,
    name: "Deluxe Room",
    description:
      "Each deluxe room offers 55 square meters of elegance, luxury and intimacy with breathtaking interior design.",
    image:
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1200&q=80",
    reverse: true,
  },
  {
    id: 3,
    name: "Deluxe Premier Room",
    description:
      "A subtle oriental refinement with pool and garden views, designed for exceptional comfort and prestige.",
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&q=80",
    reverse: false,
  },
];

export default function Rooms() {
  const [arrival, setArrival] = useState("27 February 2026");
  const [departure, setDeparture] = useState("28 February 2026");
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="alhambra-root">

{/* ── NAVBAR ── */}
<nav className="navbar">
  <div className="nav-logo">✦ Alhambra ✦</div>

  <ul className="nav-links">
  <li><Link to="/">HÉBERGEMENT</Link></li>
  <li><Link to="/restaurants">RESTAURANTS</Link></li>
  <li><Link to="/about-us">À PROPOS DE NOUS</Link></li>
  <li><Link to="/contact">CONTACTEZ-NOUS</Link></li>
</ul>

  <div className="nav-icons">
    <Search size={18} />
    <User size={18} />
    <ShoppingBag size={18} />
  </div>
  <button
    className="nav-menu"
    onClick={() => setMenuOpen((o) => !o)}
  >
    {menuOpen ? "✕" : "☰"}
  </button>

  {/* ── MOBILE MENU ── */}
  <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
    <button
      onClick={() => setMenuOpen(false)}
      style={{
        position: "absolute",
        top: 20,
        right: 24,
        background: "none",
        border: "none",
        color: "#fff",
        fontSize: "1.8rem",
        cursor: "pointer",
      }}
    >
      ✕
    </button>
    <a href="#" onClick={() => setMenuOpen(false)}>
      HÉBERGEMENT
    </a>
    <a href="#" onClick={() => setMenuOpen(false)}>
      RESTAURANTS
    </a>
    <a href="#" onClick={() => setMenuOpen(false)}>
      À PROPOS DE NOUS
    </a>
    <a href="#" onClick={() => setMenuOpen(false)}>
      CONTACTEZ-NOUS
    </a>
  </div>
</nav>
      {/* ── HERO ── */}
      <section className="hero">
        <div className="hero-overlay" />
        <img
          className="hero-image"
          src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1600&q=80"
          alt="Luxury Room"
        />

        <div className="booking-bar">
          <div className="booking-field">
            <label>Arrival</label>
            <input
              value={arrival}
              onChange={(e) => setArrival(e.target.value)}
            />
          </div>

          <div className="booking-divider" />

          <div className="booking-field">
            <label>Departure</label>
            <input
              value={departure}
              onChange={(e) => setDeparture(e.target.value)}
            />
          </div>

          <div className="booking-divider" />

          <div className="booking-field">
            <label>Rooms & Guests</label>
            <span>1 Room / 2 Guests</span>
          </div>

          <button className="book-btn">BOOK NOW</button>
        </div>
      </section>

      {/* ── SECTION HEADER ── */}
      <section className="section-header">
        <div className="section-arrow">↓</div>
        <h1 className="section-title">THE ALHAMBRA ROOMS</h1>
        <p className="section-subtitle">LIVE THE ELEGANCE AT ALHAMBRA</p>
      </section>

      {/* ── ROOMS ── */}
      <section className="rooms-section">
        {ROOMS.map((room) => (
          <div
            key={room.id}
            className={`room-block ${room.reverse ? "room-block--reverse" : ""}`}
          >
            <div className="room-card">
              <h2 className="room-name">{room.name}</h2>
              <p className="room-desc">{room.description}</p>
              <a href="#" className="room-link">
                READ MORE →
              </a>
              <button className="room-book-btn">BOOK NOW</button>
            </div>

            <div className="room-image-wrap">
              <img src={room.image} alt={room.name} className="room-img" />
            </div>
          </div>
        ))}
      </section>

      {/* ── FOOTER ── */}
      <footer className="footer">
        <div className="footer-logo">✦ ALHAMBRA ✦</div>

        <nav className="footer-nav">
          {["Notre Histoire", "About Us", "Contact Us", "Conditions Générales"].map((l) => (
            <a key={l} href="#">{l}</a>
          ))}
        </nav>

        <div className="footer-bottom">
          <div>
            <h4>Contact</h4>
            <p>Km 5, Route Malabata, Tanger 90000</p>
            <p>+212 600000000</p>
          </div>

          <div>
            <h4>Newsletter</h4>
            <input type="email" placeholder="Votre adresse email" />
          </div>

          <div>
            <h4>Suivez-Nous</h4>
            <p>Facebook · Instagram · X</p>
          </div>
        </div>
      </footer>
    </div>
  );
}