import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Header from "./composant/header";
import Footer from "./composant/footer";

const GOLD = "#b8965a";
const DARK = "#1a1208";
const CREAM = "#fdf6ec";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "Reservation", message: "" });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setTimeout(() => setMounted(true), 30);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post("/api/contact", form);
      setSent(true);
    } catch (err) {
      alert("Failed to send message: " + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,400&family=Jost:wght@300;400;500&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Jost', sans-serif; background: ${CREAM}; color: ${DARK}; }

        
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

        /* ── INFO STRIP ── */
        .info-strip {
          background: white;
          border-bottom: 1px solid rgba(184,150,90,0.18);
          display: flex; justify-content: center; flex-wrap: wrap;
          gap: 0;
          animation: fadeUp 0.8s 0.5s both;
        }
        .info-item {
          display: flex; align-items: center; gap: 14px;
          padding: 1.6rem 2.8rem;
          border-right: 1px solid rgba(184,150,90,0.12);
          transition: background 0.2s;
        }
        .info-item:last-child { border-right: none; }
        .info-item:hover { background: rgba(184,150,90,0.04); }
        .info-icon {
          width: 40px; height: 40px; border-radius: 50%;
          border: 1px solid rgba(184,150,90,0.35);
          display: flex; align-items: center; justify-content: center;
          font-size: 1rem; flex-shrink: 0;
          color: ${GOLD};
        }
        .info-text-label {
          font-size: 0.58rem; letter-spacing: 0.2em; text-transform: uppercase;
          color: ${GOLD}; margin-bottom: 3px;
        }
        .info-text-val {
          font-size: 0.82rem; color: ${DARK}; line-height: 1.5;
        }

        /* ── MAIN CONTENT ── */
        .contact-section {
          max-width: 1100px; margin: 0 auto;
          padding: 4rem 1.5rem 5rem;
          display: grid; grid-template-columns: 1fr 1.55fr; gap: 3.5rem;
        }

        /* ── LEFT COL ── */
        .left-col {
          opacity: ${mounted ? 1 : 0};
          transform: ${mounted ? 'translateY(0)' : 'translateY(30px)'};
          transition: opacity 0.75s ease, transform 0.75s ease;
        }
        .section-label {
          font-size: 0.65rem; letter-spacing: 0.3em; text-transform: uppercase;
          color: ${GOLD}; margin-bottom: 0.5rem;
        }
        .section-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(1.7rem, 3vw, 2.3rem); font-weight: 300;
          line-height: 1.25; margin-bottom: 1.2rem;
        }
        .section-body {
          font-size: 0.83rem; color: #6a5a4a; line-height: 1.85;
          margin-bottom: 2.2rem;
        }
        .gold-divider {
          width: 44px; height: 1px; background: ${GOLD};
          margin-bottom: 2.2rem;
        }

        /* team card */
        .team-cards { display: flex; flex-direction: column; gap: 1rem; }
        .team-card {
          display: flex; align-items: center; gap: 14px;
          padding: 1rem 1.2rem;
          background: white; border-radius: 5px;
          border: 1px solid rgba(184,150,90,0.18);
          transition: box-shadow 0.25s, transform 0.25s;
          opacity: 0; animation: fadeUp 0.7s both;
        }
        .team-card:nth-child(1) { animation-delay: 0.7s; }
        .team-card:nth-child(2) { animation-delay: 0.85s; }
        .team-card:nth-child(3) { animation-delay: 1.0s; }
        .team-card:hover { box-shadow: 0 6px 28px rgba(26,18,8,0.09); transform: translateY(-2px); }
        .team-avatar {
          width: 46px; height: 46px; border-radius: 50%;
          background: rgba(184,150,90,0.12);
          border: 1px solid rgba(184,150,90,0.3);
          display: flex; align-items: center; justify-content: center;
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.05rem; color: ${GOLD}; flex-shrink: 0;
        }
        .team-name { font-size: 0.88rem; font-weight: 500; margin-bottom: 2px; }
        .team-role {
          font-size: 0.68rem; letter-spacing: 0.1em; text-transform: uppercase;
          color: ${GOLD};
        }
        .team-contact { font-size: 0.75rem; color: #aaa; margin-top: 3px; }

        /* map block */
        .map-block {
          margin-top: 2.2rem; border-radius: 5px; overflow: hidden;
          border: 1px solid rgba(184,150,90,0.2);
          opacity: 0; animation: fadeUp 0.7s 1.1s both;
        }
        .map-placeholder {
          height: 200px; background: #f5efe4;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          gap: 8px; cursor: pointer;
          transition: background 0.2s;
        }
        .map-placeholder:hover { background: #ede5d5; }
        .map-pin { font-size: 2rem; }
        .map-label {
          font-size: 0.7rem; letter-spacing: 0.15em; text-transform: uppercase;
          color: ${GOLD};
        }
        .map-address { font-size: 0.78rem; color: #7a6a58; }

        /* ── RIGHT COL — FORM ── */
        .form-card {
          background: white; border-radius: 8px;
          box-shadow: 0 8px 48px rgba(26,18,8,0.09);
          padding: 2.8rem;
          opacity: ${mounted ? 1 : 0};
          transform: ${mounted ? 'translateY(0)' : 'translateY(30px)'};
          transition: opacity 0.75s 0.15s ease, transform 0.75s 0.15s ease;
        }
        .form-card-label {
          font-size: 0.6rem; letter-spacing: 0.25em; text-transform: uppercase;
          color: ${GOLD}; margin-bottom: 0.4rem;
          opacity: 0; animation: fadeUp 0.7s 0.6s both;
        }
        .form-card-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.65rem; font-weight: 300; margin-bottom: 1.8rem;
          opacity: 0; animation: fadeUp 0.7s 0.7s both;
        }

        .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
        .form-group {
          margin-bottom: 1.3rem;
          opacity: 0; animation: fadeUp 0.7s both;
        }
        .fg1 { animation-delay: 0.8s; }
        .fg2 { animation-delay: 0.85s; }
        .fg3 { animation-delay: 0.9s; }
        .fg4 { animation-delay: 0.95s; }
        .fg5 { animation-delay: 1.0s; }
        .fg6 { animation-delay: 1.05s; }

        .form-label {
          display: block;
          font-size: 0.6rem; letter-spacing: 0.2em; text-transform: uppercase;
          color: ${GOLD}; margin-bottom: 6px;
        }
        .form-input, .form-select, .form-textarea {
          width: 100%; padding: 12px 16px;
          font-family: 'Jost', sans-serif; font-size: 0.87rem;
          border: 1px solid #e0dbd4; border-radius: 3px;
          color: ${DARK}; background: white; outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
          appearance: none;
        }
        .form-input:focus, .form-select:focus, .form-textarea:focus {
          border-color: ${GOLD};
          box-shadow: 0 0 0 3px rgba(184,150,90,0.12);
        }
        .form-input::placeholder, .form-textarea::placeholder { color: #ccc; }
        .form-textarea { resize: vertical; min-height: 130px; line-height: 1.65; }
        .select-wrap { position: relative; }
        .select-wrap::after {
          content: '▾'; position: absolute; right: 14px; top: 50%;
          transform: translateY(-50%); color: ${GOLD}; pointer-events: none; font-size: 0.8rem;
        }
        .form-select { cursor: pointer; padding-right: 36px; }

        /* subject chips */
        .chip-row {
          display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 1.3rem;
          opacity: 0; animation: fadeUp 0.7s 0.93s both;
        }
        .chip {
          padding: 7px 16px; border-radius: 20px;
          border: 1px solid rgba(184,150,90,0.3);
          font-size: 0.72rem; color: #7a6a58;
          cursor: pointer; transition: all 0.2s; background: white;
          font-family: 'Jost', sans-serif; letter-spacing: 0.04em;
        }
        .chip.active { background: ${DARK}; color: white; border-color: ${DARK}; }
        .chip:hover:not(.active) { border-color: ${GOLD}; color: ${GOLD}; }

        /* submit */
        .form-submit {
          width: 100%; padding: 14px;
          background: ${DARK}; color: white; border: none; border-radius: 3px;
          font-family: 'Jost', sans-serif; font-size: 0.75rem; font-weight: 600;
          letter-spacing: 0.14em; text-transform: uppercase;
          cursor: pointer; transition: background 0.25s, transform 0.15s;
          opacity: 0; animation: fadeUp 0.7s 1.1s both;
        }
        .form-submit:hover { background: ${GOLD}; }
        .form-submit:active { transform: scale(0.985); }
        .submit-inner { display: flex; align-items: center; justify-content: center; gap: 10px; }
        .spinner {
          width: 14px; height: 14px;
          border: 2px solid rgba(255,255,255,0.3);
          border-top-color: white; border-radius: 50%;
          animation: spin 0.7s linear infinite;
        }
        @keyframes spin { to { transform: rotate(360deg); } }

        /* success */
        .success-box {
          text-align: center; padding: 3rem 2rem;
          animation: fadeUp 0.6s both;
        }
        .success-icon {
          width: 64px; height: 64px; border-radius: 50%;
          background: rgba(184,150,90,0.1); border: 1px solid rgba(184,150,90,0.4);
          display: flex; align-items: center; justify-content: center;
          margin: 0 auto 1.4rem; font-size: 1.6rem; color: ${GOLD};
        }
        .success-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.8rem; font-weight: 300; margin-bottom: 0.7rem;
        }
        .success-body { font-size: 0.83rem; color: #7a6a58; line-height: 1.8; }
        .success-reset {
          margin-top: 1.8rem; padding: 11px 28px;
          background: none; border: 1px solid rgba(184,150,90,0.4);
          color: ${GOLD}; border-radius: 3px;
          font-family: 'Jost', sans-serif; font-size: 0.72rem;
          letter-spacing: 0.12em; text-transform: uppercase;
          cursor: pointer; transition: all 0.2s;
        }
        .success-reset:hover { background: ${GOLD}; color: white; }

        /* ── FOOTER ── */
       

        @media (max-width: 820px) {
          .contact-section { grid-template-columns: 1fr; gap: 2.5rem; }
          .form-row { grid-template-columns: 1fr; }
          .info-item { padding: 1.2rem 1.6rem; }
          .nav-links a { padding: 6px 8px; font-size: 0.75rem; }
        }
      `}</style>

      {/* ── NAVBAR ── */}
        <Header />
      {/* ── HERO ── */}
      <div className="hero">
        <img
          src="https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1400&q=80"
          alt="Alhambra Hotel"
        />
        <div className="hero-overlay">
          <p className="hero-label">Alhambra · Tanger</p>
          <h1 className="hero-title">CONTACT US</h1>
        </div>
      </div>

      {/* ── INFO STRIP ── */}
      <div className="info-strip">
        {[
          { icon: "📍", label: "Address", val: "Km 5, Route Malabata, Tanger 90000" },
          { icon: "📞", label: "Reservations", val: "+212 (0) 5 000 0000" },
          { icon: "✉️", label: "Email", val: "info@hotel-alhambra.ma" },
          { icon: "🕐", label: "Concierge", val: "24h / 7 days a week" },
        ].map((item, i) => (
          <div className="info-item" key={i}>
            <div className="info-icon">{item.icon}</div>
            <div>
              <p className="info-text-label">{item.label}</p>
              <p className="info-text-val">{item.val}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ── MAIN ── */}
      <div className="contact-section">

        {/* LEFT */}
        <div className="left-col">
          <p className="section-label">Get in Touch</p>
          <h2 className="section-title">We'd Love to<br />Hear From You</h2>
          <div className="gold-divider" />
          <p className="section-body">
            Whether you're planning a stay, a private event, or simply wish to enquire
            about our services — our team is at your disposal. We pride ourselves on
            responding to every message with care and within 24 hours.
          </p>

          {/* Team cards */}
          <div className="team-cards">
            {[
              { initials: "SR", name: "Sofia Rachidi", role: "Guest Relations Manager", contact: "sofia@hotel-alhambra.ma" },
              { initials: "YB", name: "Youssef Benali", role: "Reservations Director", contact: "+212 (0) 5 000 0001" },
              { initials: "LA", name: "Leila Amrani", role: "Events & Concierge", contact: "events@hotel-alhambra.ma" },
            ].map((p, i) => (
              <div className="team-card" key={i}>
                <div className="team-avatar">{p.initials}</div>
                <div>
                  <p className="team-name">{p.name}</p>
                  <p className="team-role">{p.role}</p>
                  <p className="team-contact">{p.contact}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Map placeholder */}
          <div className="map-block">
            <a
              href="https://maps.google.com/?q=Km+5+Route+Malabata+Tanger+Maroc"
              target="_blank"
              rel="noreferrer"
              style={{ textDecoration: "none" }}
            >
              <div className="map-placeholder">
                <span className="map-pin">📍</span>
                <p className="map-label">View on Map</p>
                <p className="map-address">Km 5, Route Malabata · Tanger</p>
              </div>
            </a>
          </div>
        </div>

        {/* RIGHT — form */}
        <div className="form-card">
          {!sent ? (
            <>
              <p className="form-card-label">Send a Message</p>
              <h3 className="form-card-title">How Can We Assist You?</h3>

              {/* Subject chips */}
              <div className="chip-row">
                {["Reservation", "Events", "Spa & Wellness", "Restaurant", "Other"].map((s) => (
                  <button
                    key={s}
                    type="button"
                    className={`chip ${form.subject === s ? "active" : ""}`}
                    onClick={() => setForm(f => ({ ...f, subject: s }))}
                  >{s}</button>
                ))}
              </div>

              <form onSubmit={handleSubmit}>
                <div className="form-group form-row fg1">
                  <div>
                    <label className="form-label">Full Name</label>
                    <input className="form-input" type="text" placeholder="Ahmed Benali" required
                      value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
                  </div>
                  <div>
                    <label className="form-label">Email Address</label>
                    <input className="form-input" type="email" placeholder="your@email.com" required
                      value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
                  </div>
                </div>

                <div className="form-group form-row fg2">
                  <div>
                    <label className="form-label">Phone (optional)</label>
                    <input className="form-input" type="tel" placeholder="+212 6 00 00 00 00"
                      value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} />
                  </div>
                  <div>
                    <label className="form-label">Preferred Language</label>
                    <div className="select-wrap">
                      <select className="form-select">
                        <option>English</option>
                        <option>Français</option>
                        <option>العربية</option>
                        <option>Español</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="form-group fg3">
                  <label className="form-label">Message</label>
                  <textarea className="form-textarea"
                    placeholder="Tell us how we can help you..."
                    value={form.message}
                    onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                    required
                  />
                </div>

                <button type="submit" className="form-submit" disabled={loading}>
                  <span className="submit-inner">
                    {loading && <span className="spinner" />}
                    {loading ? "Sending your message…" : "Send Message"}
                  </span>
                </button>
              </form>
            </>
          ) : (
            <div className="success-box">
              <div className="success-icon">✓</div>
              <h3 className="success-title">Message Received</h3>
              <p className="success-body">
                Thank you for reaching out to Hôtel Alhambra.<br />
                A member of our team will be in touch within 24 hours.
              </p>
              <button className="success-reset" onClick={() => { setSent(false); setForm({ name: "", email: "", phone: "", subject: "", message: "" }); }}>
                Send Another Message
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ── FOOTER ── */}
        <Footer />
    </>
  );
}