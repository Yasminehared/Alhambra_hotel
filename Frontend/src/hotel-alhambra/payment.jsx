import React, { useState } from "react";

// ── Constantes ─────────────────────────────────────────────────────────────
const GOLD   = "#8B6914";
const CREAM  = "#f5f0e8";
const LIGHT  = "#faf8f3";
const DARK   = "#1a1208";

// Navbar : liens gauche / droite (comme l'hôtel Alhambra)
const NAV_LEFT  = ["Hébergement", "Restaurants"];
const NAV_RIGHT = ["À propos de nous", "Contactez-nous"];

const FOOTER_LINKS = [
  "OUR STORY", "CAREERS", "PRESS",
  "PRIVACY POLICY", "TERMS & CONDITIONS", "ACCESSIBILITY STATEMENT",
];

// ── Composant ───────────────────────────────────────────────────────────────
export default function PaymentPage() {
  const [method,   setMethod]   = useState("credit");
  const [saveCard, setSaveCard] = useState(true);
  const [promo,    setPromo]    = useState("");
  const [card,     setCard]     = useState({ number: "", expiry: "", mm: "", cvv: "" });
  const [menuOpen, setMenuOpen] = useState(false); // ✅ état déclaré

  const items = [
    { icon: "🔒", label: "Premium Membership", price: 49 },
    { icon: "📖", label: "Ebook Package",       price: 19 },
  ];
  const total = items.reduce((s, i) => s + i.price, 0);

  const methods = [
    { id: "credit", label: "Credit Card" },
    { id: "paypal", label: "Paypal"      },
    { id: "apple",  label: "Apple Pay"   },
    { id: "google", label: "Google Pay"  },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;600&family=Jost:wght@300;400;500;600&display=swap');

        /* ── CSS VARIABLES ── */
        :root {
          --gold:   ${GOLD};
          --cream:  ${CREAM};
          --light:  ${LIGHT};
          --dark:   ${DARK};
          --text:   #3a2e1e;
          --muted:  #999;
          --border: #e0d8cc;
        }

        *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }

        body {
          font-family: 'Jost', sans-serif;
          background: var(--light);
          color: var(--text);
          min-height: 100vh;
        }

        /* ═══════════════════════════════
           NAVBAR  (style hôtel sombre)
        ═══════════════════════════════ */
        .navbar {
          position: fixed; top: 0; left: 0; right: 0; z-index: 999;
          display: flex; align-items: center; justify-content: space-between;
          padding: 0 2.5rem; height: 64px;
          background: rgba(26, 18, 8, 0.88);
          backdrop-filter: blur(10px);
          border-bottom: 1px solid rgba(184, 150, 90, 0.2);
        }

        /* côtés gauche / droite — flex:1 pour centrer le logo */
        .nav-side       { display: flex; align-items: center; gap: 2rem; flex: 1; }
        .nav-side.right { justify-content: flex-end; gap: 1.5rem; }

        .nav-links           { display: flex; gap: 2rem; list-style: none; }
        .nav-links a {
          color: rgba(255,255,255,0.8);
          text-decoration: none;
          font-size: 0.68rem; letter-spacing: 0.14em;
          text-transform: uppercase;
          font-family: 'Jost', sans-serif; font-weight: 400;
          transition: color 0.2s;
        }
        .nav-links a:hover  { color: var(--gold); }

        /* logo centré en absolu */
        .nav-logo {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.5rem; font-weight: 300;
          color: #fff; letter-spacing: 0.12em;
          position: absolute; left: 50%; transform: translateX(-50%);
          white-space: nowrap; pointer-events: none;
        }

        .nav-divider { width: 1px; height: 16px; background: rgba(184,150,90,0.35); }

        .nav-icon {
          color: rgba(255,255,255,0.75); cursor: pointer;
          font-size: 1rem; transition: color 0.2s;
        }
        .nav-icon:hover { color: var(--gold); }

        .nav-hamburger {
          display: none; background: none; border: none;
          cursor: pointer; color: #fff; font-size: 1.3rem;
        }

        /* ── MENU MOBILE ── */
        .mobile-menu {
          position: fixed; inset: 0; z-index: 998;
          background: rgba(26,18,8,0.97);
          display: flex; flex-direction: column;
          align-items: center; justify-content: center; gap: 2rem;
          transform: translateX(-100%);
          transition: transform 0.3s ease;
        }
        .mobile-menu.open { transform: translateX(0); }
        .mobile-menu a {
          color: rgba(255,255,255,0.85); text-decoration: none;
          font-size: 1.1rem; letter-spacing: 0.12em;
          text-transform: uppercase; font-family: 'Jost', sans-serif;
          transition: color 0.2s;
        }
        .mobile-menu a:hover { color: var(--gold); }
        .mobile-close {
          position: absolute; top: 20px; right: 24px;
          background: none; border: none; color: #fff;
          font-size: 1.8rem; cursor: pointer;
        }

        /* ═══════════════════════════════
           PAGE
        ═══════════════════════════════ */
        .page-wrapper { padding-top: 64px; }

        .page-title {
          text-align: center;
          padding: 3rem 1rem 2rem;
          font-family: 'Cormorant Garamond', serif;
          font-size: 2.4rem; font-weight: 600;
          letter-spacing: 0.02em; color: var(--text);
        }

        /* ── PAYMENT LAYOUT ── */
        .payment-layout {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
          max-width: 960px;
          margin: 0 auto;
          padding: 0 2rem 4rem;
        }

        /* ── CARD ── */
        .pay-card {
          background: #fff;
          border-radius: 16px;
          border: 1px solid var(--border);
          padding: 2rem;
        }

        .card-title {
          font-size: 0.8rem; font-weight: 600;
          letter-spacing: 0.08em; text-transform: uppercase;
          margin-bottom: 1.5rem; color: var(--text);
        }

        /* ── PAYMENT METHODS ── */
        .methods { display: flex; gap: 0.6rem; flex-wrap: wrap; margin-bottom: 1.75rem; }
        .method-btn {
          padding: 0.5rem 1rem;
          border-radius: 8px;
          border: 1.5px solid var(--border);
          background: #fff;
          font-family: 'Jost', sans-serif;
          font-size: 0.78rem; font-weight: 500;
          cursor: pointer; transition: all 0.18s; color: var(--text);
        }
        .method-btn.active  { background: var(--text); border-color: var(--text); color: #fff; }
        .method-btn:hover:not(.active) { border-color: var(--gold); color: var(--gold); }

        /* ── INPUTS ── */
        .field           { position: relative; margin-bottom: 1rem; }
        .field-row       { display: flex; gap: 1rem; }
        .field-row .field { flex: 1; }

        .field input {
          width: 100%; padding: 0.9rem 1rem;
          background: var(--cream);
          border: 1px solid transparent;
          border-radius: 10px;
          font-family: 'Jost', sans-serif;
          font-size: 0.82rem; color: var(--text);
          outline: none; transition: border-color 0.2s;
        }
        .field input::placeholder { color: var(--muted); }
        .field input:focus { border-color: var(--gold); background: #fff; }

        .card-badge {
          position: absolute; right: 1rem; top: 50%;
          transform: translateY(-50%); font-size: 1.3rem;
        }

        /* ── CHECKBOX ── */
        .save-row { display: flex; align-items: center; gap: 0.75rem; margin-top: 1.25rem; cursor: pointer; }
        .checkbox {
          width: 22px; height: 22px; border-radius: 6px;
          border: 1.5px solid var(--border); background: #fff;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0; transition: all 0.18s; cursor: pointer;
        }
        .checkbox.checked { background: var(--gold); border-color: var(--gold); color: #fff; font-size: 0.75rem; }
        .save-label { font-size: 0.82rem; color: var(--text); }

        /* ── ORDER ITEMS ── */
        .order-item {
          display: flex; align-items: center; justify-content: space-between;
          padding: 1rem 0; border-bottom: 1px solid var(--border);
        }
        .item-left  { display: flex; align-items: center; gap: 0.75rem; }
        .item-icon  {
          width: 32px; height: 32px; border-radius: 8px;
          background: var(--cream); border: 1px solid var(--border);
          display: flex; align-items: center; justify-content: center; font-size: 1rem;
        }
        .item-label { font-size: 0.85rem; font-weight: 500; color: var(--text); }
        .item-price { font-size: 0.9rem; font-weight: 600; color: var(--text); }

        /* ── PROMO ── */
        .promo-row {
          display: flex; align-items: center; gap: 0.5rem;
          background: var(--cream); border-radius: 10px;
          border: 1px solid var(--border);
          padding: 0.4rem 0.4rem 0.4rem 1rem; margin: 1rem 0;
        }
        .promo-row input {
          flex: 1; background: none; border: none; outline: none;
          font-family: 'Jost', sans-serif; font-size: 0.82rem; color: var(--text);
        }
        .promo-row input::placeholder { color: var(--muted); }
        .promo-btn {
          padding: 0.5rem 1rem;
          background: var(--cream); border: 1px solid var(--border);
          border-radius: 8px; font-family: 'Jost', sans-serif;
          font-size: 0.75rem; font-weight: 500; cursor: pointer; color: var(--text);
          transition: all 0.18s;
        }
        .promo-btn:hover { background: var(--gold); color: #fff; border-color: var(--gold); }

        /* ── TOTAL ── */
        .total-row {
          display: flex; justify-content: space-between; align-items: center;
          padding: 1rem 0 1.5rem; font-size: 1rem; font-weight: 600;
        }

        /* ── PAY BUTTON ── */
        .pay-btn {
          width: 100%; padding: 1rem;
          background: var(--gold); border: none; border-radius: 10px;
          color: #fff; font-family: 'Jost', sans-serif;
          font-size: 0.9rem; font-weight: 600; letter-spacing: 0.05em;
          cursor: pointer; transition: background 0.2s, transform 0.15s;
        }
        .pay-btn:hover  { background: #6e520f; transform: translateY(-1px); }
        .pay-btn:active { transform: translateY(0); }

        /* ═══════════════════════════════
           FOOTER  (style hôtel)
        ═══════════════════════════════ */
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
        /* contact */
        .footer-contact .contact-label {
          font-size: 0.65rem; letter-spacing: 0.1em;
          text-transform: uppercase; font-weight: 600;
          color: var(--text); margin-bottom: 0.5rem;
        }
        .footer-contact p { font-size: 0.78rem; line-height: 1.8; color: #555; }
        .footer-contact a { color: var(--gold); text-decoration: none; }

        /* newsletter */
        .footer-newsletter { text-align: center; }
        .footer-newsletter .nl-label {
          font-size: 0.65rem; letter-spacing: 0.15em;
          text-transform: uppercase; font-weight: 600;
          color: var(--gold); margin-bottom: 1rem;
        }
        .nl-btn {
          display: block; width: 100%; padding: 0.75rem;
          border: 1.5px solid var(--text); background: none;
          font-family: 'Jost', sans-serif;
          font-size: 0.65rem; letter-spacing: 0.12em;
          text-transform: uppercase; font-weight: 500;
          cursor: pointer; color: var(--text); transition: all 0.2s;
        }
        .nl-btn:hover { background: var(--text); color: #fff; }

        /* social */
        .footer-social { text-align: right; }
        .footer-social .social-label {
          font-size: 0.65rem; letter-spacing: 0.1em;
          text-transform: uppercase; font-weight: 600;
          color: var(--text); margin-bottom: 0.75rem;
        }
        .social-icons {
          display: flex; gap: 0.75rem; justify-content: flex-end; margin-bottom: 1.5rem;
        }
        .social-icon {
          width: 30px; height: 30px; border: 1px solid var(--border);
          border-radius: 50%; display: flex; align-items: center;
          justify-content: center; font-size: 0.75rem;
          cursor: pointer; color: var(--text); transition: all 0.2s;
        }
        .social-icon:hover { border-color: var(--gold); color: var(--gold); }

        .partner-logos { display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem; }
        .partner {
          font-family: 'Cormorant Garamond', serif;
          font-size: 0.75rem; letter-spacing: 0.05em;
          color: var(--muted); text-align: center;
          border: 1px solid var(--border); padding: 0.4rem; border-radius: 4px;
        }

        .footer-copyright {
          text-align: center; padding: 1rem;
          border-top: 1px solid var(--border);
          font-size: 0.72rem; color: var(--muted); letter-spacing: 0.05em;
        }

        /* ── RESPONSIVE ── */
        @media (max-width: 768px) {
          .nav-links      { display: none; }
          .nav-hamburger  { display: block; }

          .payment-layout { grid-template-columns: 1fr; padding: 0 1rem 3rem; }
          .footer-bottom  { grid-template-columns: 1fr; padding: 2rem; }
          .footer-social  { text-align: left; }
          .social-icons   { justify-content: flex-start; }
        }
      `}</style>

      {/* ═══════ NAVBAR ═══════ */}
      <nav className="navbar">

        {/* Gauche */}
        <div className="nav-side">
          <ul className="nav-links">
            {NAV_LEFT.map(l => (
              <li key={l}><a href="#">{l}</a></li>
            ))}
          </ul>
        </div>

        {/* Logo centré */}
        <div className="nav-logo">✦ Alhambra ✦</div>

        {/* Droite */}
        <div className="nav-side right">
          <ul className="nav-links">
            {NAV_RIGHT.map(l => (
              <li key={l}><a href="#">{l}</a></li>
            ))}
          </ul>
          <div className="nav-divider" />
          <span className="nav-icon"></span>
          <span className="nav-icon"></span>
          <button className="nav-hamburger" onClick={() => setMenuOpen(o => !o)}>
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>

      </nav>

      {/* ═══════ MENU MOBILE ═══════ */}
      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        <button className="mobile-close" onClick={() => setMenuOpen(false)}>✕</button>
        {[...NAV_LEFT, ...NAV_RIGHT].map(l => (
          <a key={l} href="#" onClick={() => setMenuOpen(false)}>{l}</a>
        ))}
      </div>

      {/* ═══════ PAGE ═══════ */}
      <div className="page-wrapper">

        <h1 className="page-title">Complete Your Payment</h1>

        <div className="payment-layout">

          {/* ── LEFT : Payment Method ── */}
          <div className="pay-card">
            <p className="card-title">Payment Method</p>

            <div className="methods">
              {methods.map(m => (
                <button
                  key={m.id}
                  className={`method-btn ${method === m.id ? "active" : ""}`}
                  onClick={() => setMethod(m.id)}
                >
                  {m.label}
                </button>
              ))}
            </div>

            <div className="field">
              <input
                type="text" placeholder="Card Number"
                value={card.number}
                onChange={e => setCard({ ...card, number: e.target.value })}
              />
              <span className="card-badge"></span>
            </div>

            <div className="field">
              <input
                type="text" placeholder="Expiry Date"
                value={card.expiry}
                onChange={e => setCard({ ...card, expiry: e.target.value })}
              />
            </div>

            <div className="field-row">
              <div className="field">
                <input
                  type="text" placeholder="MM/YY"
                  value={card.mm}
                  onChange={e => setCard({ ...card, mm: e.target.value })}
                />
              </div>
              <div className="field">
                <input
                  type="text" placeholder="CVV"
                  value={card.cvv}
                  onChange={e => setCard({ ...card, cvv: e.target.value })}
                />
              </div>
            </div>

            <div className="save-row" onClick={() => setSaveCard(s => !s)}>
              <div className={`checkbox ${saveCard ? "checked" : ""}`}>
                {saveCard && "✓"}
              </div>
              <span className="save-label">Save Card For Future Payments</span>
            </div>
          </div>

          {/* ── RIGHT : Order Summary ── */}
          <div className="pay-card">
            <p className="card-title">Order Summary</p>

            {items.map(item => (
              <div className="order-item" key={item.label}>
                <div className="item-left">
                  <div className="item-icon">{item.icon}</div>
                  <span className="item-label">{item.label}</span>
                </div>
                <span className="item-price">${item.price.toFixed(2)}</span>
              </div>
            ))}

            <div className="promo-row">
              <input
                type="text" placeholder="Enter Promo Code"
                value={promo}
                onChange={e => setPromo(e.target.value)}
              />
              <button className="promo-btn">Apply</button>
            </div>

            <div className="total-row">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>

            <button className="pay-btn">Pay ${total.toFixed(2)}</button>
          </div>

        </div>
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
          © Hotel Tanger · Made with ❤ · 
        </div>
      </footer>

    </>
  );
}