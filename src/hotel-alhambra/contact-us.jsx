import React, { useState } from "react";

const GOLD  = "#b8965a";
const CREAM = "#fdf6ec";
const DARK  = "#1a1208";

const NAV_LINKS = ["Rooms", "Dining", "Experiences", "Contact"];

export default function ContactUs() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    message: "",
  });

  const [menuOpen, setMenuOpen] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!form.email || !form.message) {
      alert("Veuillez remplir les champs obligatoires (e-mail et message).");
      return;
    }
    console.log(form);
    alert("Message envoyé !");
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;600&family=Jost:wght@300;400;500&display=swap');

        :root {
          --gold:  ${GOLD};
          --cream: ${CREAM};
          --dark:  ${DARK};
          --text:  #3a2e1e;
        }

        *, *::before, *::after {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: 'Jost', sans-serif;
          background: var(--cream);
          color: var(--text);
        }

        /* ── NAVBAR ── */
        .navbar {
          position: fixed; top: 0; left: 0; right: 0; z-index: 999;
          display: flex; align-items: center; justify-content: space-between;
          padding: 0 2.5rem; height: 64px;
          background: rgba(26,18,8,0.85);
          backdrop-filter: blur(10px);
          border-bottom: 1px solid rgba(184,150,90,0.2);
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
 
        .nav-icon {
          color: rgba(255,255,255,0.7);
          cursor: pointer;
          font-size: 1rem;
          transition: color 0.2s;
        }
 
        .nav-icon:hover { color: var(--gold); }
 
        .nav-hamburger {
          display: none;
          background: none;
          border: none;
          cursor: pointer;
          color: #fff;
          font-size: 1.3rem;
        }
        /* ── CONTACT SECTION ── */
        .contact-section {
          display: flex;
          padding: 60px 50px;
          gap: 50px;
          align-items: flex-start;
        }

        .contact-image img {
          width: 100%;
          max-width: 420px;
          object-fit: cover;
          display: block;
        }

        /* ── FORM ── */
        .contact-form { flex: 1; }

        .contact-form h3 {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.6rem;
          font-weight: 400;
          letter-spacing: 0.05em;
          margin-bottom: 1.5rem;
          color: var(--dark);
        }

        .form-row {
          display: flex;
          gap: 15px;
          margin-bottom: 15px;
        }

        .contact-form input,
        .contact-form textarea {
          width: 100%;
          padding: 12px 14px;
          border: 1px solid #d4c4a8;
          background: #fff;
          font-family: 'Jost', sans-serif;
          font-size: 0.85rem;
          color: var(--text);
          outline: none;
          transition: border-color 0.2s;
        }

        .contact-form input:focus,
        .contact-form textarea:focus {
          border-color: var(--gold);
        }

        .contact-form textarea {
          height: 130px;
          resize: vertical;
          margin-bottom: 20px;
        }

        .contact-form .submit-btn {
          padding: 13px 28px;
          background: var(--gold);
          border: none;
          color: #fff;
          cursor: pointer;
          font-family: 'Jost', sans-serif;
          font-size: 0.78rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          transition: background 0.2s, transform 0.15s;
        }

        .contact-form .submit-btn:hover {
          background: #a07a45;
          transform: translateY(-1px);
        }

        /* ── MAP ── */
        .map { margin-top: 40px; }

        .map iframe {
          width: 100%;
          height: 300px;
          border: none;
          display: block;
        }

        /* ── FOOTER ── */
        .footer {
          text-align: center;
          padding: 20px;
          background: #f5f0e8;
          font-size: 0.8rem;
          letter-spacing: 0.05em;
          color: #7a6a52;
          margin-top: 40px;
        }

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
          .nav-hamburger { display: block; }

          .contact-section { flex-direction: column; padding: 30px 20px; }
          .contact-image img { max-width: 100%; }
          .form-row { flex-direction: column; }
          .hero-overlay h1 { font-size: 1.5rem; }
        }
      `}</style>

      {/* ── NAVBAR ── */}
      <nav className="navbar">
 
        <div className="nav-side">
          <ul className="nav-links">
            {NAV_LINKS.slice(0, 2).map(l => (
              <li key={l}><a href="#">{l}</a></li>
            ))}
          </ul>
        </div>
 
        <div className="nav-logo">✦ Alhambra ✦</div>
 
        <div className="nav-side right">
          <ul className="nav-links">
            {NAV_LINKS.slice(2).map(l => (
              <li key={l}><a href="#">{l}</a></li>
            ))}
          </ul>
          <div className="nav-divider" />
          <span className="nav-icon">🔍</span>
          <span className="nav-icon">👤</span>
          <button className="nav-hamburger" onClick={() => setMenuOpen(o => !o)}>
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
 
      </nav>

      {/* MOBILE MENU */}
      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        <button onClick={() => setMenuOpen(false)} style={{ position: "absolute", top: 20, right: 24, background: "none", border: "none", color: "#fff", fontSize: "1.8rem", cursor: "pointer" }}>✕</button>
        {NAV_LINKS.map(l => <a key={l} href="#" onClick={() => setMenuOpen(false)}>{l}</a>)}
      </div>


      {/* ── PAGE ── */}
      <div className="contact-container">

        {/* HERO */}
        <div className="hero">
          <div className="hero-overlay">
            <h1>CONTACT THE ALHAMBRA</h1>
            <p>A PALACE AT THE FOOT OF ATLAS MOUNTAINS</p>
          </div>
        </div>

        {/* CONTACT SECTION */}
        <div className="contact-section">

          <div className="contact-image">
            <img src="/images/pool.jpg" alt="Hôtel" />
          </div>

          <div className="contact-form">
            <h3>Contactez-nous</h3>

            <div className="form-row">
              <input
                type="text"
                name="firstName"
                placeholder="Prénom *"
                value={form.firstName}
                onChange={handleChange}
              />
              <input
                type="text"
                name="lastName"
                placeholder="Nom *"
                value={form.lastName}
                onChange={handleChange}
              />
            </div>

            <div className="form-row">
              <input
                type="tel"
                name="phone"
                placeholder="Téléphone"
                value={form.phone}
                onChange={handleChange}
              />
              <input
                type="email"
                name="email"
                placeholder="E-mail *"
                value={form.email}
                onChange={handleChange}
              />
            </div>

            <textarea
              name="message"
              placeholder="Message *"
              value={form.message}
              onChange={handleChange}
            />

            <button className="submit-btn" onClick={handleSubmit}>
              NOUS CONTACTER
            </button>
          </div>

        </div>

        {/* MAP */}
        <div className="map">
          <iframe
            title="map"
            src="https://www.google.com/maps?q=tanger&output=embed"
          />
        </div>

        {/* FOOTER NAV */}
      <footer>
        <div style={{ textAlign: "center", padding: "2rem 0 1rem" }}>
          <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2rem", color: GOLD }}>✦ ALHAMBRA ✦</span>
        </div>
        <nav className="footer-nav">
          {["Notre Histoire", "About Us", "Contact Us", "Conditions Générales"].map(l => (
            <a key={l} href="#">{l}</a>
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
            <p style={{ marginBottom: "0.5rem" }}>Inscrivez-vous à notre newsletter</p>
            <div className="newsletter-form">
              <input type="email" placeholder="Votre adresse email" />
              <button>→</button>
            </div>
          </div>
          <div className="footer-col">
            <h4>Suivez-Nous</h4>
            <div style={{ display: "flex", gap: "1rem", marginTop: "0.5rem" }}>
              {["f", "in", "ig", "𝕏"].map(s => (
                <a key={s} href="#" style={{ fontSize: "1rem", color: GOLD }}>{s}</a>
              ))}
            </div>
          </div>
        </div>

        <div className="footer-copy">
          © Hotel Tanger · Made with ❤ · CHENOT
        </div>
      </footer>

      </div>
    </>
  );
}