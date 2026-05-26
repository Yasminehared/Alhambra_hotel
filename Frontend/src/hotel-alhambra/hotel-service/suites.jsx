import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Footer from "../composant/footer";
import Header from "../composant/header";

const AMENITIES = [
  { icon: "✦", label: "Private Butler" },
  { icon: "✦", label: "24h Concierge" },
  { icon: "✦", label: "Luxury Amenities" },
];

export default function Suites() {
  const [suitesList, setSuitesList] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function loadSuites() {
      try {
        setLoading(true);
        const res = await axios.get("/api/room-types");
        const filtered = res.data.filter((r) => r.category === "suite");
        setSuitesList(filtered);
      } catch (err) {
        console.error("Error loading suites", err);
      } finally {
        setLoading(false);
      }
    }
    loadSuites();
  }, []);

  return (
    <>
      <style>{`
        @import url("https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Jost:wght@300;400;500&display=swap");

        :root {
          --gold: #b8975a;
          --gold-dark: #9a7a42;
          --gold-light: #d4b47a;
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
          transform: scale(1.04);
          animation: heroZoom 8s ease forwards;
        }
        @keyframes heroZoom {
          to { transform: scale(1); }
        }
        .hero-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(
            to bottom,
            rgba(0,0,0,0.18) 0%,
            rgba(20,12,4,0.45) 100%
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
          color: rgb(255, 255, 255);
          text-transform: uppercase;
        }

        /* ── DECORATIVE LINE ── */
        .deco-line {
          display: flex;
          align-items: center;
          gap: 1rem;
          justify-content: center;
          margin: 0 auto 2rem;
          width: 200px;
        }
        .deco-line::before,
        .deco-line::after {
          content: '';
          flex: 1;
          height: 1px;
          background: var(--gold-light);
          opacity: 0.6;
          }
        .deco-diamond {
          width: 6px; height: 6px;
          background: var(--gold-light);
          transform: rotate(45deg);
          flex-shrink: 0;
        }

        /* ── INTRO SECTION ── */
        .intro-section {
          text-align: center;
          padding: 100px 20px 70px;
          max-width: 720px;
          margin: 0 auto;
        }
        .intro-label {
          font-size: 0.65rem;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--gold);
          margin-bottom: 1.4rem;
        }
        .intro-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2.2rem, 5vw, 3.8rem);
          font-weight: 300;
          color: var(--brown);
          line-height: 1.15;
          margin-bottom: 1.6rem;
        }
        .intro-title em { font-style: italic; color: var(--gold); }
        .intro-text {
          font-size: 0.92rem;
          line-height: 1.95;
          color: var(--brown-light);
          max-width: 580px;
          margin: 0 auto;
        }

        /* ── AMENITIES STRIP ── */
        .amenities-strip {
          background: var(--brown);
          padding: 36px 40px;
          display: flex;
          justify-content: center;
          gap: 0;
          flex-wrap: wrap;
        }
        .amenity-item {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 32px;
          border-right: 1px solid rgba(184,150,90,0.2);
          color: rgba(255,255,255,0.82);
          font-size: 0.72rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          white-space: nowrap;
        }
        .amenity-item:last-child { border-right: none; }
        .amenity-icon { color: var(--gold); font-size: 0.55rem; }

        /* ── SUITES ── */
        .suites-section { padding: 80px 0 60px; }

        .suite-block {
          display: grid;
          grid-template-columns: 1fr 1fr;
          margin-bottom: 4px;
          min-height: 560px;
        }
        .suite-block--reverse .suite-card { order: 2; }
        .suite-block--reverse .suite-image-wrap { order: 1; }

        .suite-card {
          padding: 70px 64px;
          background: white;
          display: flex;
          flex-direction: column;
          justify-content: center;
          position: relative;
        }
        .suite-card::before {
          content: '';
          position: absolute;
          top: 40px; left: 64px;
          width: 32px; height: 2px;
          background: var(--gold);
        }

        .suite-number {
          font-family: 'Cormorant Garamond', serif;
          font-size: 5rem;
          font-weight: 300;
          color: rgba(184,150,90,0.1);
          line-height: 1;
          position: absolute;
          top: 28px; right: 40px;
          letter-spacing: -0.02em;
          user-select: none;
        }

        .suite-size {
          font-size: 0.62rem;
          letter-spacing: 0.2em;
          color: var(--gold);
          text-transform: uppercase;
          margin-bottom: 1rem;
        }
        .suite-name {
          font-family: 'Cormorant Garamond', serif;
          font-size: 2.6rem;
          font-weight: 300;
          color: var(--brown);
          margin-bottom: 1.2rem;
          line-height: 1.1;
        }
        .suite-desc {
          font-size: 0.9rem;
          line-height: 1.95;
          color: var(--brown-light);
          margin-bottom: 1.8rem;
        }

        .suite-features {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 2rem;
        }
        .suite-feature {
          font-size: 0.62rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--brown);
          padding: 5px 14px;
          border: 1px solid rgba(184,150,90,0.35);
          background: transparent;
        }

        .suite-actions {
          display: flex;
          align-items: center;
          gap: 2rem;
        }
        .suite-book-btn {
          background: var(--gold); color: white; border: none;
          padding: 13px 30px; cursor: pointer;
          font-family: 'Jost', sans-serif; font-size: 0.68rem;
          letter-spacing: 0.14em; text-transform: uppercase;
          transition: background 0.25s;
        }
        .suite-book-btn:hover { background: var(--gold-dark); }
        
        .suite-image-wrap {
          overflow: hidden;
          position: relative;
        }
        .suite-img {
          width: 100%; height: 100%;
          object-fit: cover; display: block;
          transition: transform 0.7s ease;
        }
        .suite-image-wrap:hover .suite-img { transform: scale(1.05); }

        /* ── QUOTE BANNER ── */
        .quote-banner {
          background: var(--cream-dark);
          padding: 80px 40px;
          text-align: center;
          position: relative;
          overflow: hidden;
        }
        .quote-text {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(1.4rem, 3.5vw, 2.4rem);
          font-weight: 300;
          font-style: italic;
          color: var(--brown);
          max-width: 760px;
          margin: 0 auto 1.4rem;
          line-height: 1.5;
          position: relative;
          z-index: 1;
        }
        .quote-author {
          font-size: 0.65rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--gold);
        }

        /* ── CTA STRIP ── */
        .cta-strip {
          background: var(--brown);
          padding: 70px 40px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2rem;
          text-align: center;
        }
        .cta-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(1.8rem, 4vw, 3rem);
          font-weight: 300;
          color: white;
          letter-spacing: 0.04em;
        }
        .cta-title em { font-style: italic; color: var(--gold-light); }
        .cta-sub {
          font-size: 0.75rem;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.45);
        }
        
        /* ── RESPONSIVE ── */
        @media (max-width: 900px) {
          .suite-block {
            grid-template-columns: 1fr;
            min-height: unset;
          }
          .suite-block--reverse .suite-card { order: 0; }
          .suite-block--reverse .suite-image-wrap { order: 0; }
          .suite-card { padding: 48px 28px; }
          .suite-card::before { left: 28px; }
          .suite-image-wrap { height: 320px; }
          .amenity-item { padding: 10px 18px; }
        }
        @media (max-width: 600px) {
          .amenities-strip { gap: 0; }
          .amenity-item {
            border-right: none;
            border-bottom: 1px solid rgba(184,150,90,0.2);
            width: 50%;
            justify-content: center;
          }
          .suite-actions { flex-direction: column; align-items: flex-start; gap: 1rem; }
        }
      `}</style>

      <div className="alhambra-root">
        <Header />

        {/* ── HERO ── */}
        <section className="hero">
            <div className="hero-overlay" />
          <img
            className="hero-image"
            src="https://images.unsplash.com/photo-1602002418082-a4443e081dd1?w=1800&q=80"
            alt="Alhambra Suites"
          />
        
          <div className="hero-content">
            <p className="hero-eyebrow">Alhambra · Suites Collection</p>
            <h1 className="hero-title">
              The <em>Suites</em>
            </h1>
              <div className="hero-divider" />
            <p className="hero-sub">An art of living beyond the ordinary</p>
          </div>
        </section>

        {/* ── INTRO ── */}
        <section className="intro-section">
          <p className="intro-label">Ultimate Luxury</p>
          <div className="deco-line">
            <div className="deco-diamond" />
          </div>
          <h2 className="intro-title">
            Where <em>Andalusian</em> Heritage<br />Meets Modern Prestige
          </h2>
          <p className="intro-text">
            Each Alhambra suite is a singular world — an intimate sanctuary shaped by
            centuries of Moroccan artistry, enveloped in the finest materials and attended
            by discreet, personalised service. From the Junior Suite to the Presidential,
            every detail has been curated for those who seek the extraordinary.
          </p>
        </section>

        {/* ── AMENITIES STRIP ── */}
        <div className="amenities-strip">
          {AMENITIES.map((a, i) => (
            <div key={i} className="amenity-item">
              <span className="amenity-icon">{a.icon}</span>
              {a.label}
            </div>
          ))}
        </div>

        {/* ── SUITES ── */}
        <section className="suites-section">
          {loading ? (
            <div style={{ textAlign: "center", padding: "4rem", fontSize: "1.2rem", color: "var(--brown)" }}>
              Loading Suites...
            </div>
          ) : (
            suitesList.map((suite, i) => (
              <div
                key={suite.id}
                className={`suite-block${i % 2 === 1 ? " suite-block--reverse" : ""}`}
              >
                <div className="suite-card">
                  <span className="suite-number">0{i + 1}</span>
                  <p className="suite-size">{suite.size_sqm} m²</p>
                  <h2 className="suite-name">{suite.name}</h2>
                  <p className="suite-desc">{suite.description}</p>
                  <div className="suite-features">
                    {(suite.amenities || []).map((f) => (
                      <span key={f.id || f.name} className="suite-feature">{f.name}</span>
                    ))}
                    {(!suite.amenities || suite.amenities.length === 0) && (
                      <>
                        <span className="suite-feature">King Bed</span>
                        <span className="suite-feature">Private Terrace</span>
                        <span className="suite-feature">Marble Bath</span>
                      </>
                    )}
                  </div>
                  <div className="suite-actions">
                    <button
                      className="suite-book-btn"
                      onClick={() => navigate(`/room/${suite.slug}`)}
                    >
                      BOOK NOW
                    </button>
                  </div>
                </div>

                <div className="suite-image-wrap">
                  <img
                    src={suite.hero_image || (suite.images && suite.images[0]) || "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=1200&q=80"}
                    alt={suite.name}
                    className="suite-img"
                  />
                </div>
              </div>
            ))
          )}
        </section>

        {/* ── QUOTE BANNER ── */}
        <div className="quote-banner">
          <p className="quote-text">
            "To stay at Alhambra is not merely to sleep in a room —
            it is to inhabit a moment of beauty suspended in time."
          </p>
          <p className="quote-author">— The Alhambra Promise</p>
        </div>

        {/* ── CTA ── */}
        <div className="cta-strip">
          <p className="cta-sub">Reserve your exclusive sanctuary</p>
          <h3 className="cta-title">
            Begin Your <em>Alhambra</em> Experience
          </h3>
        </div>

        <Footer />
      </div>
    </>
  );
}