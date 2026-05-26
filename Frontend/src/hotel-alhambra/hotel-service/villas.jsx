import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Footer from "../composant/footer";
import Header from "../composant/header";

const SERVICES = [
  { label: "Private Chef", desc: "Curated menus crafted daily" },
  { label: "Dedicated Butler", desc: "Discreet, 24-hour attendance" },
  { label: "Airport Transfer", desc: "Chauffeured in silence & style" },
  { label: "Spa In-Villa", desc: "Hammam rituals at your door" },
  { label: "Bespoke Experiences", desc: "Desert, medina & beyond" },
  { label: "Childcare", desc: "Trusted, certified caregivers" },
];

export default function Villas() {
  const [villasList, setVillasList] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function loadVillas() {
      try {
        setLoading(true);
        const res = await axios.get("/api/room-types");
        const filtered = res.data.filter((r) => r.category === "villa");
        setVillasList(filtered);
      } catch (err) {
        console.error("Error loading villas", err);
      } finally {
        setLoading(false);
      }
    }
    loadVillas();
  }, []);

  return (
    <>
      <style>{`
        @import url("https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Jost:wght@300;400;500&display=swap");

        :root {
          --gold: #b8975a;
          --gold-dark: #9a7a42;
          --gold-light: #d4b47a;
          --gold-pale: rgba(184,150,90,0.08);
          --cream: #f7f3ee;
          --cream-dark: #ede7df;
          --brown: #3b2e1e;
          --brown-light: #6b5c4c;
          --white: #fff;
        }

        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Jost', sans-serif; background: var(--cream); color: var(--brown); }

        /* ── HERO ── */
        .hero {
          position: relative;
          height: 100vh;
          overflow: hidden;
        }
        .hero-image {
          width: 100%; height: 100%;
          object-fit: cover;
          transform: scale(1.06);
          animation: heroZoom 10s ease forwards;
        }
        @keyframes heroZoom {
          to { transform: scale(1); }
        }
        .hero-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(
            160deg,
            rgba(0,0,0,0.1) 0%,
            rgba(20,10,2,0.55) 100%
          );
        }

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

        /* ── BOOKING BAR ── */
        .booking-bar {
          position: absolute;
          bottom: 40px; left: 50%;
          transform: translateX(-50%);
          background: white;
          display: flex;
          align-items: center;
          padding: 16px 20px;
          gap: 16px;
          width: 80%; max-width: 900px;
          box-shadow: 0 4px 40px rgba(0,0,0,0.18);
        }
        .booking-field { flex: 1; display: flex; flex-direction: column; gap: 4px; }
        .booking-field label {
          font-size: 0.62rem; letter-spacing: 0.12em;
          text-transform: uppercase; color: #aaa;
        }
        .booking-field input, .booking-field span {
          border: none; outline: none;
          font-family: 'Jost', sans-serif;
          font-size: 0.9rem; color: var(--brown); background: transparent;
        }
        .booking-divider { width: 1px; height: 40px; background: #e0d8cf; flex-shrink: 0; }
        .book-btn {
          background: var(--gold); color: white; border: none;
          padding: 14px 32px; cursor: pointer;
          font-family: 'Jost', sans-serif; font-size: 0.68rem;
          letter-spacing: 0.16em; text-transform: uppercase;
          transition: background 0.25s; white-space: nowrap;
        }
        .book-btn:hover { background: var(--gold-dark); }

        /* ── INTRO ── */
        .intro-section {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0;
          min-height: 420px;
        }
        .intro-text-col {
          padding: 90px 80px 90px 60px;
          display: flex; flex-direction: column; justify-content: center;
          background: white;
        }
        .intro-label {
          font-size: 0.62rem; letter-spacing: 0.24em;
          text-transform: uppercase; color: var(--gold);
          margin-bottom: 1.2rem;
        }
        .intro-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2rem, 3.5vw, 3rem);
          font-weight: 300;
          color: var(--brown);
          line-height: 1.15;
          margin-bottom: 1.4rem;
        }
        .intro-title em { font-style: italic; color: var(--gold); }
        .intro-body {
          font-size: 0.9rem; line-height: 1.95;
          color: var(--brown-light);
          max-width: 420px;
        }
        .intro-image-col {
          overflow: hidden;
          position: relative;
        }
        .intro-img {
          width: 100%; height: 100%;
          object-fit: cover;
          transition: transform 0.8s ease;
        }
        .intro-image-col:hover .intro-img { transform: scale(1.04); }
        .intro-badge {
          position: absolute;
          bottom: 32px; left: 32px;
          background: var(--brown);
          color: white;
          padding: 16px 24px;
          font-family: 'Cormorant Garamond', serif;
          font-size: 1rem;
          font-weight: 300;
          letter-spacing: 0.06em;
        }
        .intro-badge span {
          display: block;
          font-family: 'Jost', sans-serif;
          font-size: 0.6rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--gold-light);
          margin-top: 4px;
        }

        /* ── VILLAS ── */
        .villas-section { padding: 0; }

        .villa-block {
          display: grid;
          grid-template-columns: 1fr 1fr;
          margin-bottom: 4px;
          min-height: 620px;
        }
        .villa-block--reverse .villa-card { order: 2; }
        .villa-block--reverse .villa-image-col { order: 1; }

        /* IMAGE COLUMN */
        .villa-image-col {
          position: relative;
          overflow: hidden;
        }
        .villa-main-img {
          width: 100%; height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.8s ease;
        }
        .villa-image-col:hover .villa-main-img { transform: scale(1.04); }

        .villa-gallery {
          position: absolute;
          bottom: 16px; right: 16px;
          display: flex; gap: 8px;
        }
        .villa-thumb {
          width: 80px; height: 60px;
          object-fit: cover;
          border: 2px solid rgba(255,255,255,0.7);
          cursor: pointer;
          transition: border-color 0.2s;
        }
        .villa-thumb:hover { border-color: var(--gold); }

        .villa-guests-tag {
          position: absolute;
          top: 24px; left: 24px;
          background: rgba(59,46,30,0.82);
          backdrop-filter: blur(6px);
          color: white;
          padding: 8px 16px;
          font-size: 0.62rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          font-family: 'Jost', sans-serif;
        }

        /* CARD */
        .villa-card {
          padding: 70px 64px;
          background: var(--cream);
          display: flex; flex-direction: column; justify-content: center;
          position: relative;
          border-left: 1px solid rgba(184,150,90,0.15);
        }
        .villa-block--reverse .villa-card {
          border-left: none;
          border-right: 1px solid rgba(184,150,90,0.15);
        }

        .villa-index {
          font-family: 'Cormorant Garamond', serif;
          font-size: 7rem;
          font-weight: 300;
          color: var(--gold-pale);
          line-height: 1;
          position: absolute;
          top: 20px; right: 40px;
          letter-spacing: -0.03em;
          user-select: none;
          color: rgba(184,150,90,0.12);
        }

        .villa-size {
          font-size: 0.6rem;
          letter-spacing: 0.22em;
          color: var(--gold);
          text-transform: uppercase;
          margin-bottom: 0.6rem;
          display: flex; align-items: center; gap: 10px;
        }
        .villa-size::after {
          content: '';
          flex: 0 0 28px;
          height: 1px;
          background: var(--gold);
          opacity: 0.5;
        }

        .villa-name {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2rem, 3vw, 2.8rem);
          font-weight: 300;
          color: var(--brown);
          margin-bottom: 1.2rem;
          line-height: 1.08;
        }
        .villa-desc {
          font-size: 0.88rem; line-height: 2;
          color: var(--brown-light);
          margin-bottom: 1.8rem;
        }

        .villa-features {
          display: flex; flex-wrap: wrap; gap: 8px;
          margin-bottom: 2.2rem;
        }
        .villa-feature {
          font-size: 0.6rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--brown);
          padding: 5px 14px;
          border: 1px solid rgba(184,150,90,0.35);
          background: white;
        }

        .villa-actions {
          display: flex; align-items: center; gap: 1.8rem;
        }
        .villa-book-btn {
          background: var(--gold); color: white; border: none;
          padding: 13px 30px; cursor: pointer;
          font-family: 'Jost', sans-serif; font-size: 0.68rem;
          letter-spacing: 0.14em; text-transform: uppercase;
          transition: background 0.25s;
        }
        .villa-book-btn:hover { background: var(--gold-dark); }
        .villa-link {
          font-size: 0.68rem; letter-spacing: 0.1em;
          color: var(--brown-light); text-decoration: none;
          text-transform: uppercase; transition: color 0.2s;
          border-bottom: 1px solid transparent; padding-bottom: 2px;
        }
        .villa-link:hover { color: var(--gold); border-bottom-color: var(--gold); }

        /* ── SERVICES ── */
        .services-section {
          background: var(--brown);
          padding: 90px 60px;
        }
        .services-header {
          text-align: center;
          margin-bottom: 60px;
        }
        .services-label {
          font-size: 0.62rem; letter-spacing: 0.24em;
          text-transform: uppercase; color: var(--gold);
          margin-bottom: 1rem;
        }
        .services-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2rem, 4vw, 3rem);
          font-weight: 300; color: white;
          line-height: 1.1;
        }
        .services-title em { font-style: italic; color: var(--gold-light); }

        .services-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2px;
          max-width: 960px;
          margin: 0 auto;
        }
        .service-card {
          padding: 40px 36px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(184,150,90,0.12);
          transition: background 0.3s;
          position: relative;
          overflow: hidden;
        }
        .service-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0;
          width: 2px; height: 0;
          background: var(--gold);
          transition: height 0.4s ease;
        }
        .service-card:hover::before { height: 100%; }
        .service-card:hover { background: rgba(255,255,255,0.07); }

        .service-num {
          font-family: 'Cormorant Garamond', serif;
          font-size: 0.75rem;
          color: var(--gold);
          letter-spacing: 0.1em;
          margin-bottom: 1rem;
          opacity: 0.6;
        }
        .service-name {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.3rem; font-weight: 300;
          color: white; margin-bottom: 0.6rem;
        }
        .service-desc {
          font-size: 0.78rem; line-height: 1.7;
          color: rgba(255,255,255,0.45);
          letter-spacing: 0.02em;
        }

        /* ── FULLWIDTH BANNER ── */
        .banner {
          position: relative;
          height: 520px;
          overflow: hidden;
        }
        .banner-img {
          width: 100%; height: 100%;
          object-fit: cover;
          transform: scale(1.04);
          transition: transform 0.8s ease;
        }
        .banner:hover .banner-img { transform: scale(1); }
        .banner-overlay {
          position: absolute; inset: 0;
          background: rgba(20,10,2,0.48);
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          text-align: center; padding: 40px;
        }
        .banner-label {
          font-size: 0.62rem; letter-spacing: 0.28em;
          text-transform: uppercase; color: var(--gold-light);
          margin-bottom: 1.2rem;
        }
        .banner-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2rem, 5vw, 4rem);
          font-weight: 300; color: white;
          line-height: 1.1; margin-bottom: 1rem;
        }
        .banner-title em { font-style: italic; color: var(--gold-light); }
        .banner-divider {
          width: 40px; height: 1px;
          background: var(--gold); opacity: 0.7;
          margin: 0 auto 1.4rem;
        }
        .banner-sub {
          font-size: 0.78rem; letter-spacing: 0.14em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.55);
          margin-bottom: 2.4rem;
          max-width: 500px;
        }
        .banner-btn {
          background: transparent;
          border: 1px solid var(--gold);
          color: var(--gold);
          padding: 13px 40px;
          cursor: pointer;
          font-family: 'Jost', sans-serif;
          font-size: 0.68rem; letter-spacing: 0.18em;
          text-transform: uppercase; transition: all 0.25s;
        }
        .banner-btn:hover { background: var(--gold); color: white; }

        /* ── RESPONSIVE ── */
        @media (max-width: 960px) {
          .intro-section { grid-template-columns: 1fr; }
          .intro-image-col { height: 340px; }
          .intro-text-col { padding: 60px 32px; }
          .villa-block { grid-template-columns: 1fr; min-height: unset; }
          .villa-block--reverse .villa-card { order: 0; }
          .villa-block--reverse .villa-image-col { order: 0; }
          .villa-image-col { height: 360px; }
          .villa-card { padding: 48px 28px; }
          .services-grid { grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 600px) {
          .booking-bar { flex-direction: column; width: 90%; bottom: 20px; }
          .booking-divider { width: 100%; height: 1px; }
          .book-btn { width: 100%; padding: 1rem; }
          .services-grid { grid-template-columns: 1fr; }
          .villa-gallery { display: none; }
          .villa-actions { flex-direction: column; align-items: flex-start; gap: 1rem; }
        }
      `}</style>

      <div className="alhambra-root">
        <Header />

        {/* ── HERO ── */}
        <section className="hero">
          <img
            className="hero-image"
            src="https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=1800&q=80"
            alt="Alhambra Villas"
          />
          <div className="hero-overlay" />

          <div className="hero-content">
            <p className="hero-eyebrow">Alhambra · Private Collection</p>
            <h1 className="hero-title">
              The
              <em>Villas</em>
            </h1>
            <div className="hero-divider" />
            <p className="hero-sub">Private residence. Absolute freedom.</p>
          </div>
        </section>

        {/* ── INTRO ── */}
        <section className="intro-section">
          <div className="intro-text-col">
            <p className="intro-label">Private Residences</p>
            <h2 className="intro-title">
              A World Entirely<br /><em>Your Own</em>
            </h2>
            <p className="intro-body">
              The Alhambra Villas are not merely accommodations — they are private kingdoms.
              Each villa is a self-contained world, staffed and curated to your desires,
              where the boundaries between hotel luxury and the intimacy of home dissolve
              entirely. From walled gardens to rooftop terraces, every space breathes
              freedom, beauty, and discretion.
            </p>
          </div>
          <div className="intro-image-col">
            <img
              className="intro-img"
              src="https://images.unsplash.com/photo-1615880484746-a134be9a6ecf?w=900&q=80"
              alt="Villa interior"
            />
            <div className="intro-badge">
              3 Exclusive Villas
              <span>Available year-round</span>
            </div>
          </div>
        </section>

        {/* ── VILLAS ── */}
        <section className="villas-section">
          {loading ? (
            <div style={{ textAlign: "center", padding: "4rem", fontSize: "1.2rem", color: "var(--brown)" }}>
              Loading Villas...
            </div>
          ) : (
            villasList.map((villa, i) => (
              <div
                key={villa.id}
                className={`villa-block${i % 2 === 1 ? " villa-block--reverse" : ""}`}
              >
                <div className="villa-image-col">
                  <img
                    className="villa-main-img"
                    src={villa.hero_image || (villa.images && villa.images[0]) || "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1400&q=80"}
                    alt={villa.name}
                  />
                  <div className="villa-guests-tag">Up to {villa.capacity} Guests</div>
                </div>

                <div className="villa-card">
                  <span className="villa-index">0{i + 1}</span>
                  <p className="villa-size">{villa.size_sqm} m²</p>
                  <h2 className="villa-name">{villa.name}</h2>
                  <p className="villa-desc">{villa.description}</p>
                  <div className="villa-features">
                    {(villa.amenities || []).map((f) => (
                      <span key={f.id || f.name} className="villa-feature">{f.name}</span>
                    ))}
                    {(!villa.amenities || villa.amenities.length === 0) && (
                      <>
                        <span className="villa-feature">Private Pool</span>
                        <span className="villa-feature">Walled Garden</span>
                        <span className="villa-feature">Butler Service</span>
                      </>
                    )}
                  </div>
                  <div className="villa-actions">
                    <button
                      className="villa-book-btn"
                      onClick={() => navigate(`/room/${villa.slug}`)}
                    >
                      BOOK NOW
                    </button>
                    <Link to={`/room/${villa.slug}`} className="villa-link">
                      Discover →
                    </Link>
                  </div>
                </div>
              </div>
            ))
          )}
        </section>

        {/* ── SERVICES ── */}
        <section className="services-section">
          <div className="services-header">
            <p className="services-label">Exclusive to Villa Guests</p>
            <h2 className="services-title">
              Every Detail,<br /><em>Anticipated</em>
            </h2>
          </div>
          <div className="services-grid">
            {SERVICES.map((s, i) => (
              <div key={i} className="service-card">
                <p className="service-num">0{i + 1}</p>
                <h3 className="service-name">{s.label}</h3>
                <p className="service-desc">{s.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── FULL-WIDTH BANNER ── */}
        <div className="banner">
          <img
            className="banner-img"
            src="https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=1800&q=80"
            alt="Villa pool at dusk"
          />
          <div className="banner-overlay">
            <p className="banner-label">Begin your story</p>
            <h2 className="banner-title">
              Reserve Your<br /><em>Private Villa</em>
            </h2>
            <div className="banner-divider" />
            <p className="banner-sub">
              Our villa specialists are available to curate your stay in every detail.
            </p>
            <button
              className="banner-btn"
              onClick={() => navigate("/contact")}
            >
              CONTACT A SPECIALIST
            </button>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
}