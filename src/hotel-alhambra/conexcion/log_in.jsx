import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const GOLD = "#b8965a";
const DARK = "#1a1208";
const CREAM = "#fdf6ec";

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState("login"); // "login" | "register"
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setTimeout(() => setMounted(true), 30);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,400&family=Jost:wght@300;400;500&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Jost', sans-serif; background: ${CREAM}; color: ${DARK}; }

        /* ── NAVBAR ── */
        .navbar {
          display: flex; justify-content: space-between; align-items: center;
          padding: 0 2.5rem; height: 64px;
          background: rgba(26, 18, 8, 0.95);
          position: fixed; top: 0; left: 0; right: 0;
          z-index: 900; backdrop-filter: blur(6px);
        }
        .nav-logo {
          color: white; font-size: 1.4rem;
          font-family: 'Cormorant Garamond', serif;
          letter-spacing: 0.12em; text-decoration: none;
        }
        .nav-links { display: flex; gap: 0.25rem; align-items: center; }
        .nav-links a {
          padding: 6px 14px; text-decoration: none;
          color: rgba(255,255,255,0.82); font-weight: 400;
          font-size: 0.85rem; letter-spacing: 0.06em; text-transform: uppercase;
          border-radius: 3px; transition: color 0.2s, background 0.2s;
        }
        .nav-links a:hover, .nav-links a.active { color: ${GOLD}; background: rgba(184,150,90,0.08); }
        .nav-login a {
          color: ${GOLD}; text-decoration: none; font-size: 0.85rem;
          display: flex; align-items: center; gap: 6px;
          letter-spacing: 0.05em;
        }

        /* ── HERO ── */
        .hero {
          margin-top: 64px; position: relative; height: 420px; overflow: hidden;
        }
        .hero img {
          width: 100%; height: 100%; object-fit: cover;
          transform: scale(1.08);
          animation: heroZoom 8s ease-out forwards;
        }
        @keyframes heroZoom {
          from { transform: scale(1.08); }
          to   { transform: scale(1.0); }
        }
        .hero-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(to bottom, rgba(26,18,8,0.15), rgba(26,18,8,0.65));
          display: flex; flex-direction: column;
          align-items: center; justify-content: flex-end;
          padding-bottom: 3.5rem;
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

        /* ── CARD CONTAINER ── */
        .login-section {
          display: flex; justify-content: center;
          padding: 4rem 1.5rem 5rem;
          background: ${CREAM};
        }
        .login-card {
          background: white;
          border-radius: 8px;
          box-shadow: 0 8px 48px rgba(26,18,8,0.1);
          overflow: hidden;
          width: 100%; max-width: 860px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          opacity: ${mounted ? 1 : 0};
          transform: ${mounted ? 'translateY(0)' : 'translateY(36px)'};
          transition: opacity 0.75s ease, transform 0.75s ease;
        }

        /* ── LEFT PANEL (image) ── */
        .card-panel-img {
          position: relative; overflow: hidden; min-height: 520px;
        }
        .card-panel-img img {
          width: 100%; height: 100%; object-fit: cover;
          transition: transform 0.8s ease;
        }
        .card-panel-img:hover img { transform: scale(1.04); }
        .card-panel-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(to top, rgba(26,18,8,0.72) 0%, rgba(26,18,8,0.1) 60%);
          display: flex; flex-direction: column;
          justify-content: flex-end; padding: 2.5rem;
        }
        .panel-quote {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.35rem; font-weight: 300; font-style: italic;
          color: white; line-height: 1.55; margin-bottom: 1rem;
          opacity: 0; animation: fadeUp 0.9s 0.8s both;
        }
        .panel-divider {
          width: 36px; height: 1px; background: ${GOLD}; margin-bottom: 0.8rem;
          opacity: 0; animation: fadeUp 0.9s 0.9s both;
        }
        .panel-sub {
          font-size: 0.7rem; letter-spacing: 0.2em; text-transform: uppercase;
          color: rgba(255,255,255,0.65);
          opacity: 0; animation: fadeUp 0.9s 1s both;
        }

        /* ── RIGHT PANEL (form) ── */
        .card-panel-form {
          padding: 3rem 2.8rem;
          display: flex; flex-direction: column;
        }
        .form-brand {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.15rem; color: ${GOLD};
          letter-spacing: 0.18em; margin-bottom: 2rem;
          opacity: 0; animation: fadeUp 0.8s 0.6s both;
        }

        /* ── TABS ── */
        .form-tabs {
          display: flex; margin-bottom: 2rem;
          border-bottom: 1px solid rgba(184,150,90,0.2);
          opacity: 0; animation: fadeUp 0.8s 0.7s both;
        }
        .form-tab {
          flex: 1; text-align: center;
          padding: 10px 0;
          font-size: 0.75rem; letter-spacing: 0.12em; text-transform: uppercase;
          color: #aaa; cursor: pointer; border: none; background: none;
          border-bottom: 2px solid transparent;
          margin-bottom: -1px;
          transition: color 0.25s, border-color 0.25s;
        }
        .form-tab.active { color: ${DARK}; border-bottom-color: ${GOLD}; }
        .form-tab:hover:not(.active) { color: ${GOLD}; }

        /* ── FORM ELEMENTS ── */
        .form-group {
          margin-bottom: 1.4rem;
          opacity: 0; animation: fadeUp 0.8s both;
        }
        .form-group:nth-child(1) { animation-delay: 0.8s; }
        .form-group:nth-child(2) { animation-delay: 0.9s; }
        .form-group:nth-child(3) { animation-delay: 1.0s; }
        .form-group:nth-child(4) { animation-delay: 1.05s; }

        .form-label {
          display: block;
          font-size: 0.62rem; letter-spacing: 0.2em; text-transform: uppercase;
          color: ${GOLD}; margin-bottom: 6px;
        }
        .form-input-wrap { position: relative; }
        .form-input {
          width: 100%; padding: 12px 16px;
          font-family: 'Jost', sans-serif; font-size: 0.88rem;
          border: 1px solid #ddd; border-radius: 3px;
          color: ${DARK}; background: white; outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .form-input:focus {
          border-color: ${GOLD};
          box-shadow: 0 0 0 3px rgba(184,150,90,0.12);
        }
        .form-input::placeholder { color: #ccc; }

        .pass-toggle {
          position: absolute; right: 14px; top: 50%; transform: translateY(-50%);
          background: none; border: none; cursor: pointer;
          color: #aaa; font-size: 0.78rem; letter-spacing: 0.06em;
          transition: color 0.2s;
        }
        .pass-toggle:hover { color: ${GOLD}; }

        .form-hint {
          text-align: right; margin-top: 6px;
        }
        .form-hint a {
          font-size: 0.72rem; color: #aaa; text-decoration: none;
          letter-spacing: 0.04em; transition: color 0.2s;
        }
        .form-hint a:hover { color: ${GOLD}; }

        /* ── SUBMIT BUTTON ── */
        .form-submit {
          width: 100%; padding: 14px;
          background: ${DARK}; color: white; border: none;
          border-radius: 3px;
          font-family: 'Jost', sans-serif;
          font-size: 0.75rem; font-weight: 600;
          letter-spacing: 0.14em; text-transform: uppercase;
          cursor: pointer; transition: background 0.25s, transform 0.15s;
          position: relative; overflow: hidden;
          opacity: 0; animation: fadeUp 0.8s 1.1s both;
        }
        .form-submit:hover { background: ${GOLD}; }
        .form-submit:active { transform: scale(0.985); }
        .form-submit.loading { pointer-events: none; }
        .submit-inner {
          display: flex; align-items: center; justify-content: center; gap: 10px;
        }
        .spinner {
          width: 14px; height: 14px;
          border: 2px solid rgba(255,255,255,0.3);
          border-top-color: white;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
        }
        @keyframes spin { to { transform: rotate(360deg); } }

        /* ── DIVIDER ── */
        .form-or {
          display: flex; align-items: center; gap: 12px;
          margin: 1.5rem 0;
          opacity: 0; animation: fadeUp 0.8s 1.15s both;
        }
        .form-or::before, .form-or::after {
          content: ''; flex: 1; height: 1px; background: rgba(184,150,90,0.2);
        }
        .form-or span { font-size: 0.65rem; color: #ccc; letter-spacing: 0.1em; }

        /* ── SOCIAL BUTTONS ── */
        .social-btns {
          display: grid; grid-template-columns: 1fr 1fr; gap: 10px;
          opacity: 0; animation: fadeUp 0.8s 1.2s both;
        }
        .social-btn {
          padding: 11px 14px;
          border: 1px solid #e0e0e0; border-radius: 3px;
          background: white; cursor: pointer;
          font-family: 'Jost', sans-serif; font-size: 0.75rem;
          color: ${DARK}; letter-spacing: 0.05em;
          display: flex; align-items: center; justify-content: center; gap: 8px;
          transition: border-color 0.2s, background 0.2s;
        }
        .social-btn:hover { border-color: ${GOLD}; background: rgba(184,150,90,0.04); }
        .social-icon { font-size: 14px; }

        /* ── REGISTER EXTRA ── */
        .form-row {
          display: grid; grid-template-columns: 1fr 1fr; gap: 12px;
        }

        /* ── FOOTER ── */
        footer { background: ${DARK}; color: rgba(255,255,255,0.75); padding: 3.5rem 2rem 1.5rem; }
        .footer-top { display: flex; justify-content: center; margin-bottom: 2.5rem; }
        .footer-brand { font-family: 'Cormorant Garamond', serif; font-size: 1.6rem; color: white; letter-spacing: 0.14em; }
        .footer-divider { border: none; border-top: 1px solid rgba(184,150,90,0.35); margin-bottom: 2.5rem; }
        .footer-grid {
          display: grid; grid-template-columns: repeat(auto-fit, minmax(190px, 1fr));
          gap: 2rem; max-width: 1100px; margin: 0 auto 2.5rem;
        }
        .footer-col h4 {
          font-family: 'Jost', sans-serif; font-size: 0.7rem; font-weight: 600;
          color: ${GOLD}; text-transform: uppercase; letter-spacing: 0.14em; margin: 0 0 0.9rem;
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

        @media (max-width: 680px) {
          .login-card { grid-template-columns: 1fr; }
          .card-panel-img { min-height: 200px; }
          .card-panel-form { padding: 2rem 1.6rem; }
          .form-row { grid-template-columns: 1fr; }
          .nav-links a { padding: 6px 8px; font-size: 0.75rem; }
        }
      `}</style>

      {/* ── NAVBAR ── */}
      <nav className="navbar">
        <Link to="/" className="nav-logo">✦ ALHAMBRA ✦</Link>
        <div className="nav-links">
          <Link to="/hebergement">Hébergement</Link>
          <Link to="/restaurant">Restaurant</Link>
          <Link to="/spa">Spa</Link>
          <Link to="/about">About Us</Link>
          <Link to="/contact">Contact</Link>
        </div>
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
        <img
          src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1400&q=80"
          alt="Alhambra Hotel"
        />
        <div className="hero-overlay">
          <p className="hero-label">Alhambra · Tanger</p>
          <h1 className="hero-title">MEMBER ACCESS</h1>
        </div>
      </div>

      {/* ── LOGIN SECTION ── */}
      <div className="login-section">
        <div className="login-card">

          {/* LEFT — image panel */}
          <div className="card-panel-img">
            <img
              src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80"
              alt="Alhambra Suite"
            />
            <div className="card-panel-overlay">
              <p className="panel-quote">"Where every stay becomes a story worth telling."</p>
              <div className="panel-divider" />
              <p className="panel-sub">Alhambra · Tanger, Maroc</p>
            </div>
          </div>

          {/* RIGHT — form panel */}
          <div className="card-panel-form">
            <p className="form-brand">✦ ALHAMBRA ✦</p>

            {/* Tabs */}
            <div className="form-tabs">
              <button className={`form-tab ${tab === "login" ? "active" : ""}`} onClick={() => setTab("login")}>Sign In</button>
              <button className={`form-tab ${tab === "register" ? "active" : ""}`} onClick={() => setTab("register")}>Create Account</button>
            </div>

            {tab === "login" && (
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label className="form-label">Email Address</label>
                  <input
                    className="form-input"
                    type="email"
                    placeholder="your@email.com"
                    value={form.email}
                    onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Password</label>
                  <div className="form-input-wrap">
                    <input
                      className="form-input"
                      type={showPass ? "text" : "password"}
                      placeholder="••••••••"
                      value={form.password}
                      onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                      required
                      style={{ paddingRight: "60px" }}
                    />
                    <button type="button" className="pass-toggle" onClick={() => setShowPass(s => !s)}>
                      {showPass ? "Hide" : "Show"}
                    </button>
                  </div>
                  <div className="form-hint"><a href="#">Forgot password?</a></div>
                </div>

                <button type="submit" className={`form-submit ${loading ? "loading" : ""}`}>
                  <span className="submit-inner">
                    {loading && <span className="spinner" />}
                    {loading ? "Signing in…" : "Sign In to My Account"}
                  </span>
                </button>

                <div className="form-or"><span>or continue with</span></div>

                <div className="social-btns">
                  <button type="button" className="social-btn">
                    <span className="social-icon">G</span> Google
                  </button>
                  <button type="button" className="social-btn">
                    <span className="social-icon">f</span> Facebook
                  </button>
                </div>
              </form>
            )}

            {tab === "register" && (
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <div className="form-row">
                    <div>
                      <label className="form-label">First Name</label>
                      <input className="form-input" type="text" placeholder="Ahmed" required />
                    </div>
                    <div>
                      <label className="form-label">Last Name</label>
                      <input className="form-input" type="text" placeholder="Benali" required />
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Email Address</label>
                  <input className="form-input" type="email" placeholder="your@email.com" required />
                </div>
                <div className="form-group">
                  <label className="form-label">Password</label>
                  <div className="form-input-wrap">
                    <input
                      className="form-input"
                      type={showPass ? "text" : "password"}
                      placeholder="Min. 8 characters"
                      required
                      style={{ paddingRight: "60px" }}
                    />
                    <button type="button" className="pass-toggle" onClick={() => setShowPass(s => !s)}>
                      {showPass ? "Hide" : "Show"}
                    </button>
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Confirm Password</label>
                  <input className="form-input" type="password" placeholder="Repeat password" required />
                </div>

                <button type="submit" className={`form-submit ${loading ? "loading" : ""}`}>
                  <span className="submit-inner">
                    {loading && <span className="spinner" />}
                    {loading ? "Creating account…" : "Create My Account"}
                  </span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

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