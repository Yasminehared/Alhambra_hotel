import { useState } from "react";
import { Search, User, ShoppingBag, Menu } from "lucide-react";

const GOLD = "#b8965a";
const CREAM = "#f5f0e8";
const DARK = "#1a1208";

const NAV_LINKS = [
  "Stay",
  "Restaurants",
  "About us",
  "Contact us",
];

const ROOMS_DATA = [
  {
    id: "rooms",
    label: "ROOMS",
    tag: "Discover Our Rooms",
    desc: "Designed with the distinctive elegance of Jacques Garcia, all our rooms are distinguished by meticulous balance and harmony, delicately blending Moroccan and Andalusian influences.",
    images: [
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&q=80",
      "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=300&q=80",
      "https://images.unsplash.com/photo-1560185127-6ed189bf02f4?w=300&q=80",
    ],
    layout: "right",
  },
  {
    id: "suites",
    label: "SUITES",
    tag: "Discover Our Suites",
    desc: "Emblems of the union between contemporary elegance by Jacques Garcia and the refinement of Moroccan interiors, our Suites range from 70 to 110 m².",
    images: [
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&q=80",
      "https://images.unsplash.com/photo-1629140727571-9b5c6f6267b4?w=300&q=80",
      "https://images.unsplash.com/photo-1540518614846-7eded433c457?w=300&q=80",
    ],
    layout: "left",
  },
  {
    id: "villas",
    label: "VILLAS",
    tag: "Discover Our Villas",
    desc: "Nestled amidst lush gardens, five private villas deliver the excellence of the setting, embodying the voluptuousness of Arabo-Moorish style, masterfully orchestrated.",
    images: [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&q=80",
      "https://images.unsplash.com/photo-1584132915807-fd1f5fbc078f?w=300&q=80",
      "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=300&q=80",
    ],
    layout: "right",
  },
];

export default function AboutUs() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [arrival, setArrival] = useState("27 February 2026");
  const [departure, setDeparture] = useState("28 February 2026");
  const [rooms, setRooms] = useState("1 room / 2 guests");

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Jost:wght@300;400;500&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --gold: ${GOLD};
          --cream: ${CREAM};
          --dark: ${DARK};
          --text: #3a2e1e;
        }

        body { font-family: 'Jost', sans-serif; background: var(--cream); color: var(--text); }

         /* ── NAVBAR ── */
        .navbar {
          position: fixed; top: 0; left: 0; right: 0; z-index: 999;
          display: flex; align-items: center; justify-content: space-between;
          padding: 0 2.5rem; height: 64px;
          background: rgba(187, 167, 143, 0.85);
          backdrop-filter: blur(10px);
          border-bottom: 1px solid rgba(227, 195, 153, 0.2);
        }
 
        .nav-side {
          display: flex;
          align-items: center;
          gap: 2rem;
          flex: 1;
        }
 
        .nav-side.right {
          justify-content: flex-end;
          gap: 1.5rem;
        }
 
        .nav-links {
          display: flex;
          gap: 2rem;
          list-style: none;
        }
 
        .nav-links a {
          color: rgba(255,255,255,0.8);
          text-decoration: none;
          font-size: 0.7rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          font-family: 'Jost', sans-serif;
          font-weight: 400;
          transition: color 0.2s;
        }
 
        .nav-links a:hover { color: var(--gold); }
 
        .nav-logo {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.5rem;
          color: #fff;
          letter-spacing: 0.12em;
          font-weight: 300;
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          white-space: nowrap;
        }
 
        .nav-divider {
          width: 1px;
          height: 16px;
          background: rgba(184,150,90,0.35);
        }
        .icons{
        background: transparent;
  border: none;
  outline: none;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(255,255,255,0.7);}
       
        .nav-menu {
          display: none;
          background: none;
          border: none;
          cursor: pointer;
          color: #fff;
          font-size: 1.3rem;
        }
        /* ── HERO ── */
        .hero {
          position: relative; height: 100vh; min-height: 600px;
          background: url('https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1600&q=90') center/cover no-repeat;
        }
        .hero::after {
          content: ''; position: absolute; inset: 0;
          background: linear-gradient(to bottom, rgba(26,18,8,0.45) 0%, rgba(26,18,8,0.15) 50%, rgba(26,18,8,0.55) 100%);
        }
        .booking-bar {
          position: absolute; bottom: 0; left: 50%; transform: translateX(-50%);
          z-index: 2; width: 90%; max-width: 860px; background: rgba(245,240,232,0.97);
          display: flex; align-items: center; flex-wrap: wrap; gap: 0;
          box-shadow: 0 8px 40px rgba(0,0,0,0.25);
        }
        .booking-field {
          flex: 1; min-width: 160px; padding: 1rem 1.4rem;
          border-right: 1px solid #ddd;
        }
        .booking-field label { display: block; font-size: 0.6rem; letter-spacing: 0.14em; text-transform: uppercase; color: #999; margin-bottom: 0.3rem; }
        .booking-field input, .booking-field select {
          border: none; background: none; font-family: 'Cormorant Garamond', serif;
          font-size: 0.95rem; color: var(--dark); width: 100%; outline: none; cursor: pointer;
        }
        .book-btn {
          padding: 1rem 2rem; background: var(--gold); color: #fff; border: none;
          font-size: 0.7rem; letter-spacing: 0.16em; text-transform: uppercase;
          font-family: 'Jost', sans-serif; cursor: pointer;
          transition: background 0.25s; white-space: nowrap;
          min-width: 140px; height: 100%;
        }
        .book-btn:hover { background: #9a7a46; }

        /* ── SECTIONS ── */
        .section-intro {
          text-align: center; padding: 5rem 1rem 3rem;
        }
        .section-intro .eyebrow {
          font-size: 0.65rem; letter-spacing: 0.2em; text-transform: uppercase;
          color: var(--gold); margin-bottom: 0.6rem; display: block;
        }
        .section-intro h2 {
          font-family: 'Cormorant Garamond', serif; font-size: clamp(1.8rem,3vw,2.4rem);
          font-weight: 400; letter-spacing: 0.06em; color: var(--dark);
        }

        .stay-feature {
          display: grid; grid-template-columns: 1fr 1fr; max-width: 1100px;
          margin: 0 auto 5rem; gap: 3rem; align-items: center; padding: 0 2rem;
        }
        .stay-feature img { width: 100%; height: 420px; object-fit: cover; }
        .stay-feature p { font-size: 0.9rem; line-height: 1.85; color: #5a4a38; font-weight: 300; }

        /* ── ROOM BLOCKS ── */
        .room-block { max-width: 1100px; margin: 0 auto 6rem; padding: 0 2rem; }
        .room-block.left .inner { flex-direction: row-reverse; }
        .room-block .inner { display: flex; gap: 2rem; align-items: stretch; }

        .room-main-img { flex: 1.4; min-width: 0; }
        .room-main-img img { width: 100%; height: 400px; object-fit: cover; display: block; }

        .room-side { flex: 1; display: flex; flex-direction: column; gap: 1.5rem; justify-content: space-between; }
        .room-side .text-box {
          background: var(--cream); padding: 2rem;
          border: 1px solid rgba(184,150,90,0.2);
        }
        .room-side .text-box h3 {
          font-family: 'Cormorant Garamond', serif; font-size: 1.6rem;
          color: var(--gold); letter-spacing: 0.08em; margin-bottom: 0.8rem;
        }
        .room-side .text-box p { font-size: 0.85rem; line-height: 1.8; color: #5a4a38; font-weight: 300; }
        .discover-link {
          display: inline-block; margin-top: 1rem; font-size: 0.65rem;
          letter-spacing: 0.16em; text-transform: uppercase; color: var(--dark);
          text-decoration: none; border-bottom: 1px solid var(--gold); padding-bottom: 2px;
          transition: color 0.2s;
        }
        .discover-link:hover { color: var(--gold); }

        .room-thumb-row { display: flex; gap: 0.75rem; }
        .room-thumb-row img { flex: 1; height: 160px; object-fit: cover; }

        /* ── FOOTER ── */
        .footer-nav {
          display: flex; justify-content: center; gap: 3rem;
          padding: 3rem 2rem 2rem; border-top: 1px solid rgba(184,150,90,0.25);
        }
        .footer-nav a {
          font-size: 0.65rem; letter-spacing: 0.14em; text-transform: uppercase;
          color: var(--text); text-decoration: none;
        }
        .footer-nav a:hover { color: var(--gold); }

        .footer-bottom {
          display: flex; flex-wrap: wrap; gap: 2rem;
          padding: 2rem; border-top: 1px solid rgba(184,150,90,0.15);
          max-width: 1200px; margin: 0 auto;
        }
        .footer-col { flex: 1; min-width: 200px; }
        .footer-col h4 { font-size: 0.6rem; letter-spacing: 0.18em; text-transform: uppercase; color: var(--gold); margin-bottom: 0.8rem; }
        .footer-col p, .footer-col a { font-size: 0.8rem; line-height: 1.8; color: #7a6a58; text-decoration: none; display: block; }
        .footer-col a:hover { color: var(--gold); }

        .newsletter-form { display: flex; gap: 0; margin-top: 0.5rem; }
        .newsletter-form input {
          flex: 1; padding: 0.55rem 0.8rem; border: 1px solid #ddd;
          font-family: 'Jost', sans-serif; font-size: 0.75rem; outline: none;
          background: #fff;
        }
        .newsletter-form button {
          padding: 0.55rem 1rem; background: var(--gold); color: #fff;
          border: none; font-size: 0.6rem; letter-spacing: 0.1em; text-transform: uppercase;
          cursor: pointer; font-family: 'Jost', sans-serif;
        }

        .footer-copy {
          text-align: center; padding: 1.5rem; font-size: 0.7rem; color: #aaa;
          border-top: 1px solid rgba(184,150,90,0.1);
        }

        /* ── MOBILE MENU ── */
        .mobile-menu {
          display: none; position: fixed; inset: 0; z-index: 998;
          background: rgba(26,18,8,0.97); flex-direction: column;
          align-items: center; justify-content: center; gap: 2rem;
        }
        .mobile-menu.open { display: flex; }
        .mobile-menu a {
          color: #fff; text-decoration: none; font-family: 'Cormorant Garamond', serif;
          font-size: 2rem; font-weight: 300; letter-spacing: 0.08em;
          transition: color 0.2s;
        }
        .mobile-menu a:hover { color: var(--gold); }

        /* ── RESPONSIVE ── */
        @media (max-width: 768px) {
          .nav-links { display: none; }
          .nav-menu { display: block; }
          .booking-bar { width: 95%; flex-direction: column; }
          .booking-field { border-right: none; border-bottom: 1px solid #ddd; width: 100%; }
          .book-btn { width: 100%; padding: 1rem; }
          .stay-feature { grid-template-columns: 1fr; }
          .room-block .inner { flex-direction: column !important; }
          .room-thumb-row img { height: 110px; }
          .footer-nav { flex-wrap: wrap; gap: 1.2rem; justify-content: center; }
          .room-main-img img { height: 260px; }
        }
      `}</style>

      {/* ── NAVBAR ── */}
      <nav className="navbar">
        <div className="nav-side">
          <ul className="nav-links">
            {NAV_LINKS.slice(0, 2).map((l) => (
              <li key={l}>
                <a href="#">{l}</a>
              </li>
            ))}
          </ul>
        </div>

        <div className="nav-logo">✦ Alhambra ✦</div>

        <div className="nav-side right">
          <ul className="nav-links">
            {NAV_LINKS.slice(2).map((l) => (
              <li key={l}>
                <a href="#">{l}</a>
              </li>
            ))}
          </ul>
          <div className="nav-divider" />
          <button aria-label="Search" className="icons">
            <Search size={18} />
          </button>

          <button aria-label="User" className="icons">
            <User size={18} />
          </button>
          <button aria-label="Cart" className="icons">
            <ShoppingBag size={18} />
          </button>
          <button
            className="nav-menu"
            onClick={() => setMenuOpen((o) => !o)}
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
      </nav>

      {/* MOBILE MENU */}
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
        {NAV_LINKS.map((l) => (
          <a key={l} href="#" onClick={() => setMenuOpen(false)}>
            {l}
          </a>
        ))}
      </div>

      {/* HERO */}
      <section className="hero">
        <div className="booking-bar">
          <div className="booking-field">
            <label>Arrival</label>
            <input
              type="text"
              value={arrival}
              onChange={(e) => setArrival(e.target.value)}
            />
          </div>
          <div className="booking-field">
            <label>Departure</label>
            <input
              type="text"
              value={departure}
              onChange={(e) => setDeparture(e.target.value)}
            />
          </div>
          <div className="booking-field">
            <label>Rooms &amp; Guests</label>
            <input
              type="text"
              value={rooms}
              onChange={(e) => setRooms(e.target.value)}
            />
          </div>
          <button className="book-btn">Book Now</button>
        </div>
      </section>

      {/* STAY INTRO */}
      <div className="section-intro">
        <span className="eyebrow">✦</span>
        <h2>STAY</h2>
        <p
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            color: GOLD,
            fontSize: "1rem",
            letterSpacing: "0.12em",
            marginTop: "0.4rem",
          }}
        >
          LIVE THE ELEGANCE AT THE ALHAMBRA
        </p>
      </div>

      {/* STAY FEATURE */}
      <div className="stay-feature">
        <img
          src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=85"
          alt="Hotel lobby"
        />
        <div>
          <p>
            Bearing the exquisite touch of Jacques Garcia's Arab-Moorish décor,
            Bensur Marrakech unveils 38 rooms, 28 Junior Suites, 5 Lounges, 5
            Suites, and 5 Private Villas, each epitomizing the essence of
            Moroccan living. Singular with their charm, these exclusive
            sanctuaries present us a timeless interlude in a realm brimming with
            emotion and authenticity.
          </p>
        </div>
      </div>

      {/* ROOM BLOCKS */}
      {ROOMS_DATA.map((room) => (
        <div
          key={room.id}
          className={`room-block ${room.layout === "left" ? "left" : ""}`}
        >
          <div className="inner">
            <div className="room-main-img">
              <img src={room.images[0]} alt={room.label} />
            </div>
            <div className="room-side">
              <div className="text-box">
                <h3>{room.label}</h3>
                <p>{room.desc}</p>
                <a href="#" className="discover-link">
                  {room.tag} ›
                </a>
              </div>
              <div className="room-thumb-row">
                <img src={room.images[1]} alt="" />
                <img src={room.images[2]} alt="" />
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* FOOTER NAV */}
      <footer>
        <div style={{ textAlign: "center", padding: "2rem 0 1rem" }}>
          <span
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "2rem",
              color: GOLD,
            }}
          >
            ✦ ALHAMBRA ✦
          </span>
        </div>
        <nav className="footer-nav">
          {[
            "Notre Histoire",
            "About Us",
            "Contact Us",
            "Conditions Générales",
          ].map((l) => (
            <a key={l} href="#">
              {l}
            </a>
          ))}
        </nav>

        <div className="footer-bottom">
          <div className="footer-col">
            <h4>Contact</h4>
            <p>Km 5, Route Malabata, Tanger 90000</p>
            <p>Téléphone: +212 (0) 5 000 0000</p>
            <a href="#">info@hotel-tanger.com</a>
            <a href="#">Hotel.tanger.00@gmail.com</a>
          </div>
          <div className="footer-col">
            <h4>Suivez Notre Actualité</h4>
            <p style={{ marginBottom: "0.5rem" }}>
              Inscrivez-vous à notre newsletter
            </p>
            <div className="newsletter-form">
              <input type="email" placeholder="Votre adresse email" />
              <button>→</button>
            </div>
          </div>
          <div className="footer-col">
            <h4>Suivez-Nous</h4>
            <div style={{ display: "flex", gap: "1rem", marginTop: "0.5rem" }}>
              {["f", "in", "ig", "𝕏"].map((s) => (
                <a key={s} href="#" style={{ fontSize: "1rem", color: GOLD }}>
                  {s}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="footer-copy">© Hotel Tanger · Made with ❤ ·</div>
      </footer>
    </>
  );
}
