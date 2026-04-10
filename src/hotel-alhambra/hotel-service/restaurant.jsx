import { useState } from "react";
import { Search, User, ShoppingBag } from "lucide-react";
import "./rooms.css";
import "./restaurants-extra.css";

const NAV_LINKS = [
  { label: "HÉBERGEMENT" },
  { label: "RESTAURANTS" },
  { label: "À PROPOS DE NOUS" },
  { label: "CONTACTEZ-NOUS" },
];

const CUISINE_TABS = [
  "MAROCAINE",
  "ITALIENNE",
  "INDIENNE",
  "JAPONAISE",
  "TURQUE",
  "LE BAR HALAL",
];

const CUISINE_DATA = [
  {
    big: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80",
    sm1: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&q=80",
    sm2: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400&q=80",
    desc: "Des lieux uniques, chacun avec sa propre identité culinaire. L'originalité d'un menu contemporain combinée à une cuisine gastronomique vous offre des saveurs riches de la nature.",
  },
  {
    big: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80",
    sm1: "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=400&q=80",
    sm2: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&q=80",
    desc: "La cuisine italienne vous invite à un voyage sensoriel au cœur de la Méditerranée, avec des pâtes fraîches, des pizzas artisanales et des vins soigneusement sélectionnés.",
  },
  {
    big: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800&q=80",
    sm1: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&q=80",
    sm2: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400&q=80",
    desc: "Des épices envoûtantes, des currys parfumés et des saveurs indiennes authentiques vous transportent dans un voyage culinaire inoubliable.",
  },
  {
    big: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&q=80",
    sm1: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&q=80",
    sm2: "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=400&q=80",
    desc: "Sushis, sashimis et spécialités japonaises préparés avec rigueur et précision, dans le respect de la tradition culinaire du Japon.",
  },
  {
    big: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800&q=80",
    sm1: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&q=80",
    sm2: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&q=80",
    desc: "Kebabs grillés, mezzes généreux et pâtisseries orientales composent la richesse de la cuisine turque, servie dans un cadre chaleureux.",
  },
  {
    big: "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=800&q=80",
    sm1: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400&q=80",
    sm2: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&q=80",
    desc: "Cocktails créatifs sans alcool, mocktails rafraîchissants et boissons artisanales dans un cadre élégant. Notre bar halal est ouvert tous les soirs.",
  },
];

export default function Restaurants() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [reservationDate, setReservationDate] = useState("01 Mars 2026");

  const cuisine = CUISINE_DATA[activeTab];

  return (
    <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;600&family=Jost:wght@300;400;500&display=swap');

:root {
  --gold: #b8975a;
  --gold-dark: #9a7a42;
  --cream: #f7f3ee;
  --brown: #3b2e1e;
  --white: #fff;
}

* { margin:0; padding:0; box-sizing:border-box; }
body { font-family:'Jost', sans-serif; background:var(--cream); color:var(--brown); }

/* NAVBAR */
.navbar { position:fixed; top:0; left:0; right:0; z-index:999; display:flex; align-items:center; justify-content:space-between; padding:0 2.5rem; height:64px; background:rgba(187,167,143,0.85); backdrop-filter:blur(10px); border-bottom:1px solid rgba(227,195,153,0.2);}
.nav-links { display:flex; gap:2rem; list-style:none; }
.nav-links a { color:rgba(255,255,255,0.85); text-decoration:none; font-size:0.7rem; letter-spacing:0.14em; text-transform:uppercase; transition:color 0.2s; }
.nav-links a:hover { color:var(--gold); }
.nav-logo { font-family:'Cormorant Garamond', serif; font-size:1.5rem; color:#fff; position:absolute; left:50%; transform:translateX(-50%); }
.nav-divider { width:1px; height:16px; background:rgba(184,150,90,0.35);}
.icons, .nav-menu { background:none; border:none; cursor:pointer; color:#fff; }
.nav-menu { display:none; font-size:1.3rem; }
.nav-side.right { display:flex; align-items:center; gap:1.5rem; }

/* MOBILE MENU */
.mobile-menu { display:none; position:fixed; inset:0; z-index:998; background:rgba(26,18,8,0.97); flex-direction:column; align-items:center; justify-content:center; gap:2rem;}
.mobile-menu.open { display:flex; }
.mobile-menu a { color:#fff; font-family:'Cormorant Garamond', serif; font-size:2rem; text-decoration:none;}
.mobile-menu a:hover { color:var(--gold);}
.close-btn { position:absolute; top:20px; right:24px; background:none; border:none; color:#fff; font-size:1.8rem; cursor:pointer; }

/* HERO */
.hero { position:relative; height:80vh; }
.hero-image { width:100%; height:100%; object-fit:cover; }

/* INTRO */
.intro { text-align:center; padding:80px 20px 40px;}
.intro h1 { font-family:'Cormorant Garamond', serif; font-size:2.5rem; color:var(--brown); margin-bottom:0.5rem;}
.intro p { color:#6b5c4c; font-size:1rem; max-width:700px; margin:0 auto;}

/* FOOD SHOWCASE */
.food-showcase img { width:100%; height:auto; margin:40px 0; }

/* RESERVATION BAR */
.reservation-bar { display:flex; justify-content:center; align-items:center; gap:1rem; margin-bottom:40px; }
.reservation-bar input { padding:0.5rem 1rem; }
.reservation-bar span { font-size:0.85rem; }
.reservation-bar button { background:var(--gold); color:#fff; border:none; padding:0.5rem 1rem; cursor:pointer; }

/* SLIDER */
.slider { text-align:center; margin:40px 0; }
.slider img { width:80%; max-width:600px; height:auto; margin:20px 0; }

/* CUISINE TABS */
.cuisine { text-align:center; margin:40px 0; }
.cuisine .tabs { display:flex; justify-content:center; gap:1rem; flex-wrap:wrap; margin-bottom:20px; }
.cuisine button { padding:0.5rem 1rem; border:none; background:#eee; cursor:pointer; }
.cuisine button.active { background:var(--gold); color:#fff; }

/* FOOTER */
.footer { background:#eee7dd; padding:60px 40px; text-align:center; }
.footer-logo { font-family:'Cormorant Garamond', serif; font-size:2rem; color:var(--gold); margin-bottom:2rem; }
.footer-nav { display:flex; justify-content:center; gap:2.5rem; flex-wrap:wrap; margin-bottom:2rem; }
.footer-nav a { text-decoration:none; color:var(--brown); font-size:0.65rem; text-transform:uppercase;}
.footer-nav a:hover { color:var(--gold);}
.footer-bottom { display:grid; grid-template-columns:repeat(3,1fr); gap:2rem; border-top:1px solid rgba(184,150,90,0.2); padding-top:2rem;}
.footer-bottom h4 { font-size:0.6rem; text-transform:uppercase; color:var(--gold); margin-bottom:0.8rem;}
.footer-bottom p, .footer-bottom input { font-size:0.82rem; color:#7a6a58;}
.footer-bottom input { padding:0.5rem; border:1px solid #ddd; width:100%; }
.footer-copy { margin-top:2rem; font-size:0.75rem; color:#aaa; }

/* RESPONSIVE */
@media (max-width:768px) {
  .nav-links { display:none; }
  .nav-menu { display:block; }
  .cuisine .tabs { flex-direction:column; }
  .slider img { width:100%; }
  .footer-bottom { grid-template-columns:1fr; gap:1.5rem; }
}
  /* ── restaurants-extra.css ─────────────────────────────────────
   Classes used ONLY in Restaurants.jsx.
   rooms.css handles: navbar, mobile-menu, hero, section-header,
   booking-bar, footer.
   This file adds the rest.
──────────────────────────────────────────────────────────────── */

/* EYEBROW */
.rest-eyebrow {
  font-size: 0.68rem;
  letter-spacing: 0.2em;
  color: var(--gold);
  text-transform: uppercase;
  margin-bottom: 0.4rem;
}

/* FOOD SHOWCASE */
.rest-showcase {
  width: 100%;
  line-height: 0;
}
.rest-showcase img {
  width: 100%;
  height: clamp(220px, 38vw, 520px);
  object-fit: cover;
  display: block;
}

/* SLIDER SECTION */
.rest-slider-section {
  padding: 60px 40px;
  max-width: 1200px;
  margin: 0 auto;
}
.rest-slider-card {
  position: relative;
  display: flex;
  align-items: stretch;
  gap: 0;
  background: #fff;
  box-shadow: 0 2px 20px rgba(59,46,30,0.07);
}
.rest-slider-img-wrap {
  width: 55%;
  flex-shrink: 0;
}
.rest-slider-img-wrap img {
  width: 100%;
  height: 340px;
  object-fit: cover;
  display: block;
}
.rest-slider-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 40px 48px;
  gap: 1.2rem;
}
.rest-slider-info h2 {
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.6rem;
  font-weight: 400;
  color: var(--brown);
  line-height: 1.3;
}
.rest-slider-info a {
  font-size: 0.68rem;
  letter-spacing: 0.15em;
  color: var(--gold);
  text-decoration: none;
  text-transform: uppercase;
}
.rest-slider-info a:hover { color: var(--gold-dark); }
.rest-slider-nav {
  position: absolute;
  bottom: 16px;
  right: 20px;
  display: flex;
  gap: 8px;
}
.rest-slider-nav button {
  background: none;
  border: 1px solid var(--gold);
  color: var(--gold);
  width: 32px;
  height: 32px;
  font-size: 1.1rem;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
}
.rest-slider-nav button:hover {
  background: var(--gold);
  color: #fff;
}

/* SABO FEATURE */
.rest-feature {
  background: #f0ebe3;
  padding: 70px 40px;
}
.rest-feature-inner {
  max-width: 1100px;
  margin: 0 auto;
}
.rest-feature-header {
  text-align: center;
  margin-bottom: 3rem;
}
.rest-feature-header h2 {
  font-family: 'Cormorant Garamond', serif;
  font-size: clamp(1.4rem, 2.5vw, 2rem);
  font-weight: 400;
  color: var(--brown);
  letter-spacing: 0.05em;
}
.rest-feature-header p {
  font-size: 0.68rem;
  letter-spacing: 0.18em;
  color: var(--gold);
  margin-top: 0.5rem;
  text-transform: uppercase;
}
.rest-feature-body {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3.5rem;
  align-items: center;
}
.rest-feature-img img {
  width: 100%;
  height: 400px;
  object-fit: cover;
  display: block;
}
.rest-feature-text {
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  color: #6b5c4c;
  font-size: 0.9rem;
  line-height: 1.85;
}

/* CUISINE TABS */
.rest-cuisine {
  padding: 70px 40px;
  background: var(--cream);
}
.rest-cuisine-inner {
  max-width: 1100px;
  margin: 0 auto;
}
.rest-cuisine-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 2rem;
  border-bottom: 1px solid rgba(184,150,90,0.2);
  padding-bottom: 1rem;
}
.rest-tab {
  padding: 7px 18px;
  border: 1px solid transparent;
  background: none;
  color: var(--brown);
  font-family: 'Jost', sans-serif;
  font-size: 0.68rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.2s;
}
.rest-tab:hover { border-color: var(--gold); color: var(--gold); }
.rest-tab.active {
  border-color: var(--gold);
  background: var(--gold);
  color: #fff;
}
.rest-cuisine-gallery {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 1rem;
}
.rest-gallery-big img {
  width: 100%;
  height: 360px;
  object-fit: cover;
  display: block;
}
.rest-gallery-small {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.rest-gallery-small img {
  width: 100%;
  height: calc((360px - 1rem) / 2);
  object-fit: cover;
  display: block;
}
.rest-cuisine-desc {
  margin-top: 1.5rem;
  font-size: 0.9rem;
  color: #6b5c4c;
  line-height: 1.85;
  max-width: 720px;
}

/* ── RESPONSIVE ──────────────────────────────────────────────── */
@media (max-width: 900px) {
  .rest-slider-section { padding: 40px 20px; }
  .rest-slider-card { flex-direction: column; }
  .rest-slider-img-wrap { width: 100%; }
  .rest-slider-img-wrap img { height: 260px; }
  .rest-slider-info { padding: 24px 28px; }

  .rest-feature { padding: 48px 20px; }
  .rest-feature-body { grid-template-columns: 1fr; gap: 2rem; }
  .rest-feature-img img { height: 280px; }

  .rest-cuisine { padding: 48px 20px; }
  .rest-cuisine-gallery { grid-template-columns: 1fr; }
  .rest-gallery-big img { height: 260px; }
  .rest-gallery-small { flex-direction: row; }
  .rest-gallery-small img { height: 130px; flex: 1; }
}

@media (max-width: 600px) {
  .rest-showcase img { height: 200px; }

  .rest-slider-img-wrap img { height: 200px; }
  .rest-slider-info { padding: 20px; }
  .rest-slider-info h2 { font-size: 1.2rem; }

  .rest-feature-header h2 { font-size: 1.2rem; }
  .rest-feature-img img { height: 220px; }

  .rest-cuisine-tabs { gap: 0.3rem; }
  .rest-tab { padding: 5px 10px; font-size: 0.6rem; }

  .rest-gallery-small { flex-direction: column; }
  .rest-gallery-small img { height: 160px; }
}

        `}</style>,
    <div className="alhambra-root">

      {/* ── NAVBAR ── */}
      <nav className="navbar">
        <div className="nav-side">
          <ul className="nav-links">
            {NAV_LINKS.slice(0, 2).map((l) => (
              <li key={l.label}><a href="#">{l.label}</a></li>
            ))}
          </ul>
        </div>

        <div className="nav-logo">✦ Alhambra ✦</div>

        <div className="nav-side right">
          <ul className="nav-links">
            {NAV_LINKS.slice(2).map((l) => (
              <li key={l.label}><a href="#">{l.label}</a></li>
            ))}
          </ul>
          <div className="nav-divider" />
          <button aria-label="Search" className="icons"><Search size={18} /></button>
          <button aria-label="User" className="icons"><User size={18} /></button>
          <button aria-label="Cart" className="icons"><ShoppingBag size={18} /></button>
          <button className="nav-menu" onClick={() => setMenuOpen((o) => !o)}>
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
      </nav>

      {/* MOBILE MENU */}
      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        <button
          onClick={() => setMenuOpen(false)}
          style={{ position: "absolute", top: 20, right: 24, background: "none", border: "none", color: "#fff", fontSize: "1.8rem", cursor: "pointer" }}
        >✕</button>
        {NAV_LINKS.map((l) => (
          <a key={l.label} href="#" onClick={() => setMenuOpen(false)}>{l.label}</a>
        ))}
      </div>

      {/* ── HERO ── */}
      <section className="hero">
        <div className="hero-overlay" />
        <img
          className="hero-image"
          src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1400&q=80"
          alt="Restaurants Hero"
        />
      </section>

      {/* ── INTRO ── */}
      <section className="section-header">
        <div className="section-arrow">↓</div>
        <p className="rest-eyebrow">LES MEILLEURES RESTAURANTS</p>
        <h1 className="section-title">RESTAURANTS</h1>
        <p className="section-subtitle">
          Alhambra abrite cinq restaurants et bars, chacun offrant une variété d'ambiances
          pour s'adapter à toutes les humeurs et envies. Laissez-vous transporter dans un
          voyage culinaire unique et découvrez des saveurs qui éveillent tous vos sens.
        </p>
      </section>

      {/* ── FOOD SHOWCASE ── */}
      <section className="rest-showcase">
        <img
          src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1400&q=80"
          alt="Gastronomic showcase"
        />
      </section>

      {/* ── RESERVATION BAR ── */}
      <section className="booking-bar">
        <div className="booking-field">
          <label>Date de réservation</label>
          <input
            value={reservationDate}
            onChange={(e) => setReservationDate(e.target.value)}
          />
        </div>
        <div className="booking-divider" />
        <div className="booking-field">
          <label>Restaurant &amp; Personnes</label>
          <span>1 restaurant / 2 pers.</span>
        </div>
        <button className="book-btn">RÉSERVEZ<br />MAINTENANT</button>
      </section>

      {/* ── SABO SLIDER CARD ── */}
      <section className="rest-slider-section">
        <div className="rest-slider-card">
          <div className="rest-slider-img-wrap">
            <img
              src="https://images.unsplash.com/photo-1559339352-11d035aa65de?w=900&q=80"
              alt="SABO Restaurant"
            />
          </div>
          <div className="rest-slider-info">
            <h2>SABO BY JEAN-FRANÇOIS<br />PIÈGE</h2>
            <a href="#">DÉCOUVREZ <span>›</span></a>
          </div>
          <div className="rest-slider-nav">
            <button aria-label="Précédent">‹</button>
            <button aria-label="Suivant">›</button>
          </div>
        </div>
      </section>

      {/* ── SABO FEATURE ── */}
      <section className="rest-feature">
        <div className="rest-feature-inner">
          <div className="rest-feature-header">
            <h2>SABO BY JEAN-FRANÇOIS PIÈGE</h2>
            <p>LA NOUVELLE TABLE RAFFINÉE ET FESTIVE DU HOTEL TANGER</p>
          </div>
          <div className="rest-feature-body">
            <div className="rest-feature-img">
              <img
                src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=700&q=80"
                alt="Chef Jean-François Piège"
              />
            </div>
            <div className="rest-feature-text">
              <p>
                Le Alhambra et Jean-François Piège poursuivent leur collaboration avec
                l'ouverture de SABO, table mêlant savoir-faire français et richesse des
                produits marocains.
              </p>
              <p>
                SABO, restaurant à la scénographie spectaculaire, vous propose une
                expérience gastronomique exclusive, inspirée des codes de la Haute Époque.
                Un menu comme un récit d'art aux saveurs subtiles, où chaque détail – du
                décor au menu – raconte une histoire.
              </p>
              <p>
                SABO est donc un restaurant à part entière où la haute cuisine se veut
                festive et joyeuse.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── CUISINE TABS ── */}
      <section className="rest-cuisine">
        <div className="rest-cuisine-inner">
          <div className="rest-cuisine-tabs">
            {CUISINE_TABS.map((tab, i) => (
              <button
                key={tab}
                className={`rest-tab${i === activeTab ? " active" : ""}`}
                onClick={() => setActiveTab(i)}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="rest-cuisine-gallery">
            <div className="rest-gallery-big">
              <img src={cuisine.big} alt={CUISINE_TABS[activeTab]} />
            </div>
            <div className="rest-gallery-small">
              <img src={cuisine.sm1} alt="Plat 1" />
              <img src={cuisine.sm2} alt="Plat 2" />
            </div>
          </div>

          <p className="rest-cuisine-desc">{cuisine.desc}</p>
        </div>
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
          <div className="footer-col">
            <h4>Contact</h4>
            <p>Km 5, Route Malabata, Tanger 90000</p>
            <p>Téléphone: +212 (0) 5 000 0000</p>
            <a href="#" style={{ display: "block", fontSize: "0.82rem", color: "#7a6a58" }}>info@hotel-tanger.com</a>
            <a href="#" style={{ display: "block", fontSize: "0.82rem", color: "#7a6a58" }}>Hotel.tanger.00@gmail.com</a>
          </div>
          <div className="footer-col">
            <h4>Suivez Notre Actualité</h4>
            <p style={{ marginBottom: "0.5rem", fontSize: "0.82rem" }}>Inscrivez-vous à notre newsletter</p>
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <input type="email" placeholder="Votre adresse email" style={{ flex: 1, padding: "0.5rem", border: "1px solid #ddd", fontSize: "0.82rem" }} />
              <button style={{ background: "var(--gold)", border: "none", color: "#fff", padding: "0 1rem", cursor: "pointer" }}>→</button>
            </div>
          </div>
          <div className="footer-col">
            <h4>Suivez-Nous</h4>
            <div style={{ display: "flex", gap: "1rem", marginTop: "0.5rem" }}>
              {["f", "in", "ig", "𝕏"].map((s) => (
                <a key={s} href="#" style={{ fontSize: "1rem", color: "var(--gold)" }}>{s}</a>
              ))}
            </div>
          </div>
        </div>

        <div className="footer-copy">© Hotel Tanger · Made with ❤</div>
      </footer>
    </div>
  );
}
