import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Footer from "../composant/footer";
import Header from "../composant/header";

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
  const navigate = useNavigate();

  return (
    <>
      <style>{`
        @import url("https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;600&family=Jost:wght@300;400;500&display=swap");

        :root {
          --gold: #b8975a;
          --gold-dark: #9a7a42;
          --cream: #f7f3ee;
          --brown: #3b2e1e;
          --white: #fff;
        }

        * { margin: 0; padding: 0; box-sizing: border-box; }

        body { font-family: 'Jost', sans-serif; background: var(--cream); color: var(--brown); }

        .hero { position: relative; height: 100vh; }
        .hero-image { width: 100%; height: 100%; object-fit: cover; }
        .hero-overlayy { position: absolute; inset: 0; background: rgba(0,0,0,0.3); }

        /* ── HERO CONTENT ── */
        .hero-content {
          position: absolute;
          bottom: 160px;
          left: 8%;
          animation: fadeUp 1.3s ease 0.4s both;
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .hero-eyebrow {
          font-size: 0.62rem;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: var(--gold-light);
          margin-bottom: 1rem;
          font-family: 'Jost', sans-serif;
        }
        .hero-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(3.5rem, 9vw, 7.5rem);
          font-weight: 300;
          color: white;
          line-height: 0.95;
          letter-spacing: 0.02em;
          margin-bottom: 1.4rem;
        }
        .hero-title em {
          font-style: italic;
          color: var(--gold-light);
          display: block;
        }
        .hero-divider {
          width: 48px; height: 1px;
          background: var(--gold);
          margin-bottom: 1.2rem;
        }
        .hero-sub {
          font-size: 0.78rem;
          letter-spacing: 0.16em;
          color: rgba(255,255,255,0.6);
          text-transform: uppercase;
        }


        /* ── BOOKING BAR (ON HERO) ── */
        .booking-bar {
          position: absolute;
          bottom: 40px;
          left: 50%;
          transform: translateX(-50%);
          background: white;
          display: flex;
          align-items: center;
          padding: 16px 20px;
          gap: 16px;
          width: 80%;
          max-width: 900px;
          box-shadow: 0 4px 24px rgba(0,0,0,0.12);
        }

        .booking-field { flex: 1; display: flex; flex-direction: column; gap: 4px; }
        .booking-field label { font-size: 0.65rem; letter-spacing: 0.1em; text-transform: uppercase; color: #999; }
        .booking-field input, .booking-field span {
          border: none; outline: none;
          font-family: 'Jost', sans-serif;
          font-size: 0.9rem; color: var(--brown); background: transparent;
        }
        .booking-divider { width: 1px; height: 40px; background: #ddd; flex-shrink: 0; }
        .book-btn {
          background: var(--gold); color: white; border: none;
          padding: 14px 28px; cursor: pointer;
          font-family: 'Jost', sans-serif; font-size: 0.7rem;
          letter-spacing: 0.12em; text-transform: uppercase;
          transition: background 0.2s; white-space: nowrap;
        }
        .book-btn:hover { background: var(--gold-dark); }

        .section-header { text-align: center; padding: 80px 20px 60px; }
        .section-arrow { font-size: 1.5rem; color: var(--gold); margin-bottom: 1rem; }
        .section-title {
          font-size: 3rem; font-family: 'Cormorant Garamond', serif;
          font-weight: 300; color: var(--brown); margin-bottom: 0.8rem;
        }
        .section-subtitle { color: var(--gold); letter-spacing: 0.18em; font-size: 0.75rem; text-transform: uppercase; }

        .rooms-section { padding: 20px 40px 60px; }

        .room-block {
          display: grid;
          grid-template-columns: 1fr 1fr;
          margin-bottom: 60px;
          min-height: 480px;
        }

        .room-block--reverse .room-card { order: 2; }
        .room-block--reverse .room-image-wrap { order: 1; }

        .room-card {
          padding: 60px; background: white;
          display: flex; flex-direction: column; justify-content: center;
        }
        .room-name {
          font-size: 2.4rem; color: var(--gold);
          font-family: 'Cormorant Garamond', serif;
          font-weight: 300; margin-bottom: 1rem;
        }
        .room-desc { margin-bottom: 1.5rem; line-height: 1.9; font-size: 0.92rem; color: #6b5c4c; }
        .room-link {
          font-size: 0.7rem; letter-spacing: 0.1em;
          color: var(--brown); text-decoration: none;
          margin-bottom: 1.5rem; display: inline-block; transition: color 0.2s;
        }
        .room-link:hover { color: var(--gold); }
        .room-book-btn {
          width: fit-content; background: var(--gold); color: white;
          border: none; padding: 12px 28px; cursor: pointer;
          font-family: 'Jost', sans-serif; font-size: 0.7rem;
          letter-spacing: 0.12em; text-transform: uppercase; transition: background 0.2s;
        }
        .room-book-btn:hover { background: var(--gold-dark); }

        .room-image-wrap { overflow: hidden; }
        .room-img { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform 0.5s ease; }
        .room-image-wrap:hover .room-img { transform: scale(1.04); }

        @media (max-width: 768px) {
          .booking-bar { flex-direction: column; width: 90%; bottom: 20px; }
          .booking-divider { width: 100%; height: 1px; }
          .book-btn { width: 100%; padding: 1rem; }
          .room-block { grid-template-columns: 1fr; min-height: unset; }
          .room-block--reverse .room-card { order: 0; }
          .room-block--reverse .room-image-wrap { order: 0; }
          .room-card { padding: 32px 24px; }
          .section-title { font-size: 2rem; }
          .rooms-section { padding: 20px 16px 40px; }
        }
      `}</style>

      <div className="alhambra-root">
        <Header />

        <section className="hero">
          <div className="hero-overlayy" />
          <img
            className="hero-image"
            src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1600&q=80"
            alt="Luxury Room"
          />
          
          <div className="hero-content">
            <p className="hero-eyebrow">Alhambra · Rooms Collection</p>
            <h1 className="hero-title">
              The
              <em>Rooms</em>
            </h1>
            <div className="hero-divider" />
            <p className="hero-sub">Private. Elegant. Unforgettable.</p>
          </div>
        </section>

        <section className="section-header">
          <div className="section-arrow">↓</div>
          <h1 className="section-title">THE ALHAMBRA ROOMS</h1>
          <p className="section-subtitle">LIVE THE ELEGANCE AT ALHAMBRA</p>
        </section>

        <section className="rooms-section">
          {ROOMS.map((room) => (
            <div
              key={room.id}
              className={`room-block${room.reverse ? " room-block--reverse" : ""}`}
            >
              <div className="room-card">
                <h2 className="room-name">{room.name}</h2>
                <p className="room-desc">{room.description}</p>
                <Link to={`/room/${room.id}`} className="room-link">
                  READ MORE →
                </Link>
                <button className="room-book-btn" onClick={() => navigate(`/room/${room.id}`)}>
                  BOOK NOW
                </button>
              </div>
              <div className="room-image-wrap">
                <img src={room.image} alt={room.name} className="room-img" />
              </div>
            </div>
          ))}
        </section>

        <Footer />
      </div>
    </>
  );
}