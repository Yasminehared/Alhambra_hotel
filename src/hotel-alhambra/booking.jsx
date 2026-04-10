import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const GOLD = "#b8965a";
const DARK = "#1a1208";
const CREAM = "#fdf6ec";

const rooms = [
  {
    name: "Superior Room",
    price: 7500,
    size: "55 m²",
    bed: "Queen Bed",
    guests: 2,
    view: "Garden View",
    img: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=900&q=80",
    features: ["Free Wi-Fi", "Air Conditioning", "Minibar", "Safe", "Flat-screen TV", "En-suite Bathroom"],
    description:
      "A refined retreat offering garden views and timeless Moroccan-inspired décor. The Superior Room blends comfort with elegance, featuring bespoke furnishings, premium linens, and a marble bathroom.",
  },
  {
    name: "Deluxe Room",
    price: 8500,
    size: "60 m²",
    bed: "Queen Bed",
    guests: 2,
    view: "Partial Sea View",
    img: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=900&q=80",
    features: ["Free Wi-Fi", "Air Conditioning", "Nespresso Machine", "Minibar", "Safe", "Bathrobe & Slippers"],
    description:
      "An elevated experience with partial sea views over the Strait of Gibraltar. The Deluxe Room features a sitting area, premium amenities, and hand-crafted details that echo the Alhambra's storied heritage.",
  },
  {
    name: "Deluxe Premier Room",
    price: 9500,
    size: "68 m²",
    bed: "King Bed",
    guests: 2,
    view: "Sea View",
    img: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=900&q=80",
    features: ["Free Wi-Fi", "Nespresso Machine", "Minibar", "Private Terrace", "Deep Soaking Tub", "Turn-down Service"],
    description:
      "Wake to panoramic views of the Mediterranean from your private terrace. The Deluxe Premier Room is our finest standard offering — an oasis of calm with a deep soaking tub and curated in-room amenities.",
  },
  {
    name: "Junior Suite",
    price: 11000,
    size: "80 m²",
    bed: "King Bed",
    guests: 3,
    view: "Sea & Strait View",
    img: "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=900&q=80",
    features: ["Free Wi-Fi", "Separate Living Room", "Private Terrace", "Espresso Machine", "Butler Service", "Daily Fruit Basket"],
    description:
      "A separate living room, a private terrace, and sweeping views across the Strait of Gibraltar. The Junior Suite is crafted for those who desire space, serenity, and a touch of the extraordinary.",
  },
  {
    name: "Alhambra Suite",
    price: 15000,
    size: "140 m²",
    bed: "King Bed",
    guests: 4,
    view: "Panoramic Ocean View",
    img: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=900&q=80",
    features: ["Free Wi-Fi", "Grand Living Room", "Dining Area", "Private Plunge Pool", "24h Butler", "Champagne on Arrival", "Spa Access"],
    description:
      "Our crown jewel. The Alhambra Suite commands 140 m² of pure luxury with a private plunge pool, panoramic ocean terrace, and dedicated butler. An experience that transcends the ordinary.",
  },
];

export default function BookingPage() {
  const [modal, setModal] = useState(null);
  const [visible, setVisible] = useState(false);
  const [closing, setClosing] = useState(false);
  const [selectedDate, setSelectedDate] = useState({ checkin: "", checkout: "" });

  const openModal = (room) => {
    setModal(room);
    setClosing(false);
    setTimeout(() => setVisible(true), 10);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setClosing(true);
    setVisible(false);
    setTimeout(() => {
      setModal(null);
      setClosing(false);
      document.body.style.overflow = "";
    }, 350);
  };

  useEffect(() => {
    const handleKey = (e) => { if (e.key === "Escape") closeModal(); };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,400&family=Jost:wght@300;400;500&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        body { font-family: 'Jost', sans-serif; background: ${CREAM}; color: ${DARK}; }

        /* ── NAVBAR (matching ContactPage) ── */
        .navbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 2.5rem;
          height: 64px;
          background: rgba(26, 18, 8, 0.95);
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 900;
          backdrop-filter: blur(6px);
        }
        .nav-logo {
          color: white;
          font-size: 1.4rem;
          font-family: 'Cormorant Garamond', serif;
          letter-spacing: 0.12em;
          text-decoration: none;
        }
          .nav-login a {
  color: white;
  text-decoration: none;
  font-size: 0.85rem;
  display: flex;
  align-items: center;
  gap: 6px;
}

.nav-login a:hover {
  color: #b8965a;
}
        .nav-links { display: flex; gap: 0.25rem; align-items: center; }
        .nav-links a {
          padding: 6px 14px;
          text-decoration: none;
          color: rgba(255,255,255,0.82);
          font-weight: 400;
          font-size: 0.85rem;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          border-radius: 3px;
          transition: color 0.2s, background 0.2s;
        }
        .nav-links a:hover, .nav-links a.active { color: ${GOLD}; background: rgba(184,150,90,0.08); }

        /* ── HERO ── */
        .hero {
          margin-top: 64px;
          position: relative;
          height: 380px;
          overflow: hidden;
        }
        .hero img {
          width: 100%; height: 100%;
          object-fit: cover;
          transform: scale(1.08);
          animation: heroZoom 8s ease-out forwards;
        }
        @keyframes heroZoom {
          from { transform: scale(1.08); }
          to   { transform: scale(1.0); }
        }
        .hero-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(to bottom, rgba(26,18,8,0.2), rgba(26,18,8,0.55));
          display: flex; flex-direction: column;
          align-items: center; justify-content: flex-end;
          padding-bottom: 3rem;
        }
        .hero-label {
          font-size: 0.7rem; letter-spacing: 0.3em; text-transform: uppercase;
          color: ${GOLD}; margin-bottom: 0.6rem;
          animation: fadeUp 0.8s 0.2s both;
        }
        .hero-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2rem, 5vw, 3.2rem);
          font-weight: 300; color: white;
          letter-spacing: 0.18em; text-align: center;
          animation: fadeUp 0.8s 0.4s both;
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* ── DATE BAR ── */
        .date-bar {
          background: white;
          border-bottom: 1px solid rgba(184,150,90,0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1.5rem;
          padding: 1.2rem 2rem;
          flex-wrap: wrap;
          animation: fadeUp 0.8s 0.6s both;
        }
        .date-bar label {
          font-size: 0.65rem; letter-spacing: 0.18em; text-transform: uppercase;
          color: ${GOLD}; display: block; margin-bottom: 4px;
        }
        .date-bar input {
          padding: 8px 14px;
          font-family: 'Jost', sans-serif;
          font-size: 0.9rem;
          border: 1px solid #ddd; border-radius: 3px;
          color: ${DARK}; outline: none;
          transition: border-color 0.2s;
        }
        .date-bar input:focus { border-color: ${GOLD}; }
        .date-bar-sep { width: 1px; height: 40px; background: rgba(184,150,90,0.25); }
        .date-bar-cta {
          padding: 10px 28px;
          background: ${GOLD}; color: white;
          border: none; border-radius: 3px;
          font-family: 'Jost', sans-serif;
          font-size: 0.75rem; font-weight: 600;
          letter-spacing: 0.12em; text-transform: uppercase;
          cursor: pointer; transition: background 0.2s;
        }
        .date-bar-cta:hover { background: #a07a45; }

        /* ── ROOMS SECTION ── */
        .rooms-section {
          max-width: 1000px;
          margin: 0 auto;
          padding: 3.5rem 1.5rem 5rem;
        }
        .section-label {
          font-size: 0.65rem; letter-spacing: 0.3em; text-transform: uppercase;
          color: ${GOLD}; margin-bottom: 0.5rem;
          animation: fadeUp 0.8s 0.7s both;
        }
        .section-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(1.6rem, 3vw, 2.2rem);
          font-weight: 300; margin-bottom: 2.5rem;
          animation: fadeUp 0.8s 0.8s both;
        }

        /* ── ROOM CARD ── */
        .room-card {
          display: grid;
          grid-template-columns: 360px 1fr;
          background: white;
          border-radius: 6px;
          overflow: hidden;
          margin-bottom: 1.8rem;
          box-shadow: 0 4px 24px rgba(0,0,0,0.07);
          opacity: 0;
          transform: translateY(28px);
          transition: transform 0.35s ease, box-shadow 0.3s;
          animation: cardIn 0.65s forwards;
        }
        .room-card:hover { transform: translateY(-3px); box-shadow: 0 12px 40px rgba(0,0,0,0.12); }

        @keyframes cardIn {
          to { opacity: 1; transform: translateY(0); }
        }
        .room-card:nth-child(1) { animation-delay: 0.1s; }
        .room-card:nth-child(2) { animation-delay: 0.2s; }
        .room-card:nth-child(3) { animation-delay: 0.3s; }
        .room-card:nth-child(4) { animation-delay: 0.4s; }
        .room-card:nth-child(5) { animation-delay: 0.5s; }

        .room-img-wrap {
          position: relative; overflow: hidden; cursor: pointer;
        }
        .room-img-wrap img {
          width: 100%; height: 100%;
          object-fit: cover;
          transition: transform 0.6s ease;
          display: block;
        }
        .room-img-wrap:hover img { transform: scale(1.06); }
        .room-img-overlay {
          position: absolute; inset: 0;
          background: rgba(26,18,8,0);
          transition: background 0.3s;
          display: flex; align-items: center; justify-content: center;
        }
        .room-img-wrap:hover .room-img-overlay { background: rgba(26,18,8,0.28); }
        .room-img-btn {
          opacity: 0; transform: scale(0.85);
          transition: opacity 0.3s, transform 0.3s;
          padding: 10px 22px;
          background: rgba(184,150,90,0.9);
          color: white; border: none;
          font-family: 'Jost', sans-serif;
          font-size: 0.75rem; letter-spacing: 0.12em; text-transform: uppercase;
          border-radius: 3px; cursor: pointer;
        }
        .room-img-wrap:hover .room-img-btn { opacity: 1; transform: scale(1); }

        .room-body {
          padding: 2rem 2.2rem;
          display: flex; flex-direction: column; justify-content: space-between;
        }
        .room-tag {
          font-size: 0.6rem; letter-spacing: 0.22em; text-transform: uppercase;
          color: ${GOLD}; margin-bottom: 0.4rem;
        }
        .room-name {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.55rem; font-weight: 400;
          margin-bottom: 0.8rem; line-height: 1.2;
        }
        .room-meta {
          display: flex; gap: 1.5rem; flex-wrap: wrap;
          margin-bottom: 1rem;
        }
        .room-meta span {
          font-size: 0.78rem; color: #7a6a58;
          display: flex; align-items: center; gap: 5px;
        }
        .room-meta span::before { content: '·'; color: ${GOLD}; font-size: 1rem; }
        .room-meta span:first-child::before { content: none; }
        .room-desc {
          font-size: 0.82rem; color: #6a5a4a;
          line-height: 1.75; margin-bottom: 1.4rem;
          display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .room-footer {
          display: flex; align-items: flex-end; justify-content: space-between;
          border-top: 1px solid rgba(184,150,90,0.18); padding-top: 1.2rem;
        }
        .room-price-label { font-size: 0.6rem; letter-spacing: 0.15em; text-transform: uppercase; color: #aaa; margin-bottom: 3px; }
        .room-price { font-family: 'Cormorant Garamond', serif; font-size: 1.6rem; font-weight: 400; }
        .room-price span { font-family: 'Jost', sans-serif; font-size: 0.75rem; color: #aaa; margin-left: 4px; }
        .room-btn {
          padding: 12px 26px;
          background: ${DARK}; color: white;
          border: none; border-radius: 3px;
          font-family: 'Jost', sans-serif;
          font-size: 0.75rem; font-weight: 600;
          letter-spacing: 0.1em; text-transform: uppercase;
          cursor: pointer;
          transition: background 0.2s;
        }
        .room-btn:hover { background: ${GOLD}; }

        /* ── MODAL ── */
        .modal-backdrop {
          position: fixed; inset: 0; z-index: 1000;
          background: rgba(26,18,8,0);
          display: flex; align-items: center; justify-content: center;
          padding: 1.5rem;
          transition: background 0.35s ease;
          pointer-events: none;
        }
        .modal-backdrop.visible { background: rgba(26,18,8,0.7); pointer-events: all; }

        .modal {
          background: white;
          border-radius: 8px;
          max-width: 880px;
          width: 100%;
          max-height: 90vh;
          overflow-y: auto;
          display: grid;
          grid-template-columns: 1fr 1fr;
          opacity: 0;
          transform: translateY(40px) scale(0.97);
          transition: opacity 0.35s ease, transform 0.35s ease;
        }
        .modal.visible { opacity: 1; transform: translateY(0) scale(1); }

        .modal-img {
          position: relative; min-height: 360px;
          border-radius: 8px 0 0 8px;
          overflow: hidden;
        }
        .modal-img img {
          width: 100%; height: 100%; object-fit: cover; display: block;
        }
        .modal-img-caption {
          position: absolute; bottom: 0; left: 0; right: 0;
          background: linear-gradient(transparent, rgba(26,18,8,0.7));
          padding: 2rem 1.5rem 1.2rem;
          color: white;
        }
        .modal-img-caption h3 {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.5rem; font-weight: 300;
        }

        .modal-body { padding: 2.2rem; display: flex; flex-direction: column; gap: 1.4rem; }

        .modal-close {
          position: absolute; top: 1rem; right: 1rem;
          background: rgba(26,18,8,0.5); color: white;
          border: none; border-radius: 50%;
          width: 36px; height: 36px;
          font-size: 1.1rem; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          transition: background 0.2s;
        }
        .modal-close:hover { background: rgba(26,18,8,0.85); }

        .modal-label {
          font-size: 0.6rem; letter-spacing: 0.25em; text-transform: uppercase;
          color: ${GOLD};
        }
        .modal-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.8rem; font-weight: 300; line-height: 1.2;
        }
        .modal-meta {
          display: flex; flex-wrap: wrap; gap: 0.7rem;
        }
        .modal-badge {
          background: ${CREAM};
          border: 1px solid rgba(184,150,90,0.3);
          padding: 5px 12px; border-radius: 3px;
          font-size: 0.75rem; color: #6a5a4a;
        }
        .modal-desc { font-size: 0.85rem; line-height: 1.8; color: #6a5a4a; }

        .modal-features-title {
          font-size: 0.6rem; letter-spacing: 0.2em; text-transform: uppercase;
          color: ${GOLD}; margin-bottom: 0.6rem;
        }
        .modal-features {
          display: grid; grid-template-columns: 1fr 1fr; gap: 6px;
        }
        .modal-feature {
          font-size: 0.78rem; color: ${DARK};
          display: flex; align-items: center; gap: 7px;
        }
        .modal-feature::before {
          content: '';
          width: 5px; height: 5px;
          background: ${GOLD}; border-radius: 50%; flex-shrink: 0;
        }

        .modal-footer {
          border-top: 1px solid rgba(184,150,90,0.15);
          padding-top: 1.2rem;
          display: flex; align-items: center; justify-content: space-between;
        }
        .modal-price-block .lbl { font-size: 0.6rem; letter-spacing: 0.15em; text-transform: uppercase; color: #aaa; }
        .modal-price-block .amt { font-family: 'Cormorant Garamond', serif; font-size: 1.7rem; }
        .modal-price-block .per { font-size: 0.7rem; color: #aaa; margin-left: 4px; }
        .modal-select-btn {
          padding: 13px 30px;
          background: ${GOLD}; color: white;
          border: none; border-radius: 3px;
          font-family: 'Jost', sans-serif;
          font-size: 0.75rem; font-weight: 600;
          letter-spacing: 0.12em; text-transform: uppercase;
          cursor: pointer; transition: background 0.2s;
        }
        .modal-select-btn:hover { background: #a07a45; }

        /* ── FOOTER (matching ContactPage) ── */
        footer { background: ${DARK}; color: rgba(255,255,255,0.75); padding: 3.5rem 2rem 1.5rem; }
        .footer-top { display: flex; justify-content: center; margin-bottom: 2.5rem; }
        .footer-brand { font-family: 'Cormorant Garamond', serif; font-size: 1.6rem; color: white; letter-spacing: 0.14em; }
        .footer-divider { border: none; border-top: 1px solid rgba(184,150,90,0.35); margin-bottom: 2.5rem; }
        .footer-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(190px, 1fr));
          gap: 2rem; max-width: 1100px; margin: 0 auto 2.5rem;
        }
        .footer-col h4 {
          font-family: 'Jost', sans-serif;
          font-size: 0.7rem; font-weight: 600; color: ${GOLD};
          text-transform: uppercase; letter-spacing: 0.14em; margin: 0 0 0.9rem;
        }
        .footer-col p, .footer-col a {
          display: block; font-size: 0.8rem; line-height: 1.7;
          color: rgba(255,255,255,0.65); text-decoration: none; margin-bottom: 4px; transition: color 0.2s;
        }
        .footer-col a:hover { color: ${GOLD}; }
        .newsletter-row { display: flex; gap: 8px; margin-top: 0.5rem; }
        .newsletter-row input {
          flex: 1; padding: 10px 12px; font-size: 0.8rem; font-family: 'Jost', sans-serif;
          border: 1px solid rgba(255,255,255,0.2); border-radius: 3px;
          background: rgba(255,255,255,0.06); color: white; outline: none;
        }
        .newsletter-row input::placeholder { color: rgba(255,255,255,0.35); }
        .newsletter-row input:focus { border-color: ${GOLD}; }
        .newsletter-row button {
          padding: 10px 16px; background: ${GOLD}; border: none; color: white;
          font-size: 0.75rem; font-family: 'Jost', sans-serif; font-weight: 600;
          letter-spacing: 0.08em; text-transform: uppercase; border-radius: 3px;
          cursor: pointer; transition: background 0.2s;
        }
        .newsletter-row button:hover { background: #a07a45; }
        .social-links { display: flex; gap: 10px; flex-wrap: wrap; margin-top: 0.5rem; }
        .social-links a {
          display: inline-block; padding: 6px 14px;
          border: 1px solid rgba(184,150,90,0.4); border-radius: 3px;
          font-size: 0.75rem; color: rgba(255,255,255,0.65) !important;
          letter-spacing: 0.05em; transition: border-color 0.2s, color 0.2s, background 0.2s;
        }
        .social-links a:hover { border-color: ${GOLD}; color: ${GOLD} !important; background: rgba(184,150,90,0.08); }
        .footer-bottom-bar {
          border-top: 1px solid rgba(255,255,255,0.08); padding-top: 1.2rem;
          display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 0.5rem;
          max-width: 1100px; margin: 0 auto;
          font-size: 0.72rem; color: rgba(255,255,255,0.35);
        }
        .footer-bottom-bar a { color: rgba(255,255,255,0.35); text-decoration: none; margin: 0 8px; transition: color 0.2s; }
        .footer-bottom-bar a:hover { color: ${GOLD}; }

        @media (max-width: 760px) {
          .room-card { grid-template-columns: 1fr; }
          .room-img-wrap { height: 240px; }
          .modal { grid-template-columns: 1fr; }
          .modal-img { min-height: 240px; border-radius: 8px 8px 0 0; }
          .nav-links a { padding: 6px 8px; font-size: 0.75rem; }
        }
      `}</style>

     <nav className="navbar">
  <Link to="/" className="nav-logo">✦ ALHAMBRA ✦</Link>

  <div className="nav-links">
    <Link to="/hebergement" className="active">Hébergement</Link>
    <Link to="/restaurant">Restaurant</Link>
    <Link to="/spa">Spa</Link>
    <Link to="/about">About Us</Link>
    <Link to="/contact">Contact</Link>
  </div>

  {/* ✅ LOGIN */}
<div className="nav-login" style={{ display: "flex", alignItems: "center", gap: "20px" }}>
  <Link to="/dashboard" style={{ color: "white", textDecoration: "none", fontSize: "0.85rem", display: "flex", alignItems: "center", gap: "6px", transition: "color 0.2s" }}
    onMouseEnter={e => e.currentTarget.style.color = "#b8965a"}
    onMouseLeave={e => e.currentTarget.style.color = "white"}
  >
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" rx="1"/>
      <rect x="14" y="3" width="7" height="7" rx="1"/>
      <rect x="3" y="14" width="7" height="7" rx="1"/>
      <rect x="14" y="14" width="7" height="7" rx="1"/>
    </svg>
    Dashboard
  </Link>
  <Link to="/login" style={{ color: "white", textDecoration: "none", fontSize: "0.85rem", display: "flex", alignItems: "center", gap: "6px", transition: "color 0.2s" }}
    onMouseEnter={e => e.currentTarget.style.color = "#b8965a"}
    onMouseLeave={e => e.currentTarget.style.color = "white"}
  >
    👤 Login
  </Link>
</div>
</nav>
      {/* ── HERO ── */}
      <div className="hero">
        <img src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1400&q=80" alt="Alhambra Hotel" />
        <div className="hero-overlay">
          <p className="hero-label">Alhambra · Tanger</p>
          <h1 className="hero-title">SELECT YOUR STAY</h1>
        </div>
      </div>

      {/* ── DATE BAR ── */}
      <div className="date-bar">
        <div>
          <label>Check-in</label>
          <input type="date" value={selectedDate.checkin} onChange={e => setSelectedDate(d => ({ ...d, checkin: e.target.value }))} />
        </div>
        <div className="date-bar-sep" />
        <div>
          <label>Check-out</label>
          <input type="date" value={selectedDate.checkout} onChange={e => setSelectedDate(d => ({ ...d, checkout: e.target.value }))} />
        </div>
        <div className="date-bar-sep" />
        <div>
          <label>Guests</label>
          <input type="number" min={1} max={6} defaultValue={2} style={{ width: 80 }} />
        </div>
        <button className="date-bar-cta">Check Availability</button>
      </div>

      {/* ── ROOMS ── */}
      <section className="rooms-section">
        <p className="section-label">Our Accommodations</p>
        <h2 className="section-title">Rooms & Suites</h2>

        {rooms.map((room, i) => (
          <div className="room-card" key={i}>
            <div className="room-img-wrap" onClick={() => openModal(room)}>
              <img src={room.img} alt={room.name} />
              <div className="room-img-overlay">
                <button className="room-img-btn">View Details</button>
              </div>
            </div>
            <div className="room-body">
              <div>
                <p className="room-tag">{room.view}</p>
                <h3 className="room-name">{room.name}</h3>
                <div className="room-meta">
                  <span>{room.size}</span>
                  <span>{room.bed}</span>
                  <span>Up to {room.guests} guests</span>
                </div>
                <p className="room-desc">{room.description}</p>
              </div>
              <div className="room-footer">
                <div>
                  <p className="room-price-label">From</p>
                  <p className="room-price">MAD {room.price.toLocaleString()}<span>/ night</span></p>
                </div>
                <button className="room-btn" onClick={() => openModal(room)}>Select Room</button>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* ── MODAL ── */}
      {modal && (
        <div className={`modal-backdrop ${visible ? "visible" : ""}`} onClick={closeModal}>
          <div className={`modal ${visible ? "visible" : ""}`} onClick={e => e.stopPropagation()}>
            <div className="modal-img" style={{ position: "relative" }}>
              <img src={modal.img} alt={modal.name} />
              <div className="modal-img-caption">
                <p style={{ fontSize: "0.6rem", letterSpacing: "0.25em", textTransform: "uppercase", color: GOLD, marginBottom: "0.3rem" }}>
                  {modal.view}
                </p>
                <h3>{modal.name}</h3>
              </div>
              <button className="modal-close" onClick={closeModal}>✕</button>
            </div>

            <div className="modal-body">
              <div>
                <p className="modal-label">Room Details</p>
                <h2 className="modal-title">{modal.name}</h2>
              </div>

              <div className="modal-meta">
                <span className="modal-badge">{modal.size}</span>
                <span className="modal-badge">{modal.bed}</span>
                <span className="modal-badge">Up to {modal.guests} guests</span>
                <span className="modal-badge">{modal.view}</span>
              </div>

              <p className="modal-desc">{modal.description}</p>

              <div>
                <p className="modal-features-title">Room Amenities</p>
                <div className="modal-features">
                  {modal.features.map((f, i) => (
                    <span className="modal-feature" key={i}>{f}</span>
                  ))}
                </div>
              </div>

              <div className="modal-footer">
                <div className="modal-price-block">
                  <p className="lbl">From</p>
                  <p className="amt">MAD {modal.price.toLocaleString()}<span className="per">/ night</span></p>
                </div>
                <button className="modal-select-btn" onClick={closeModal}>Reserve This Room</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── FOOTER ── */}
      <footer>
        <div className="footer-top">
          <span className="footer-brand">✦ ALHAMBRA ✦</span>
        </div>
        <hr className="footer-divider" />
        <div className="footer-grid">
          <div className="footer-col">
            <h4>Adresse</h4>
            <p>Km 5, Route Malabata</p>
            <p>Tanger 90000, Maroc</p>
          </div>
          <div className="footer-col">
            <h4>Contact</h4>
            <p>+212 (0) 5 000 0000</p>
            <a href="mailto:info@hotel-alhambra.ma">info@hotel-alhambra.ma</a>
            <a href="mailto:reservations@hotel-alhambra.ma">reservations@hotel-alhambra.ma</a>
          </div>
          <div className="footer-col">
            <h4>Horaires Réception</h4>
            <p>Lun – Ven : 08h00 – 20h00</p>
            <p>Sam – Dim : 09h00 – 18h00</p>
            <p>Concierge : 24h/24, 7j/7</p>
          </div>
          <div className="footer-col">
            <h4>Explorer</h4>
            <Link to="/hebergement">Hébergement</Link>
            <Link to="/restaurant">Restaurant</Link>
            <Link to="/spa">Spa & Bien-être</Link>
            <Link to="/about">Notre Histoire</Link>
            <Link to="/contact">Nous Contacter</Link>
          </div>
          <div className="footer-col">
            <h4>Newsletter</h4>
            <p>Recevez nos offres exclusives et actualités.</p>
            <div className="newsletter-row">
              <input type="email" placeholder="Votre e-mail" />
              <button>OK</button>
            </div>
          </div>
          <div className="footer-col">
            <h4>Suivez-Nous</h4>
            <p>Rejoignez notre communauté en ligne.</p>
            <div className="social-links">
              <a href="#">Facebook</a>
              <a href="#">Instagram</a>
              <a href="#">LinkedIn</a>
              <a href="#">X</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom-bar">
          <span>© 2026 Hôtel Alhambra Tanger — Tous droits réservés</span>
          <div>
            <a href="#">Conditions Générales</a>
            <a href="#">Politique de Confidentialité</a>
            <a href="#">Mentions Légales</a>
          </div>
        </div>
      </footer>
    </>
  );
}