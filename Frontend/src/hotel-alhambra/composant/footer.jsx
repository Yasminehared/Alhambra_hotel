import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const GOLD = "#b8965a";
const CREAM = "#f5f0e8";
const DARK = "#1a1208";

export default function Footer() {
  const { t } = useTranslation();
  return (
    <>
      <style>{`
        
        :root {
          --gold: ${GOLD};
          --cream: ${CREAM};
          --dark: ${DARK};
          --text: #3a2e1e;
        }
          .body{
            margin: 0;
            font-family: 'Jost', sans-serif;
          }

        .footer-nav {
          display: flex;
          justify-content: center;
          gap: 3rem;
          padding: 3rem 2rem 2rem;
          border-top: 1px solid rgba(184,150,90,0.25);
        }

        .footer-nav a {
          font-size: 0.65rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--text);
          text-decoration: none;
        }

        .footer-nav a:hover {
          color: var(--gold);
        }

        .footer-bottom {
          display: flex;
          flex-wrap: wrap;
          gap: 2rem;
          padding: 2rem;
          border-top: 1px solid rgba(184,150,90,0.15);
          max-width: 1200px;
          margin: 0 auto;
        }

        .footer-col {
          flex: 1;
          min-width: 200px;
        }

        .footer-col h4 {
          font-size: 0.6rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--gold);
          margin-bottom: 0.8rem;
        }

        .footer-col p, .footer-col a {
          font-size: 0.8rem;
          line-height: 1.8;
          color: #7a6a58;
          text-decoration: none;
          display: block;
        }

        .footer-col a:hover {
          color: var(--gold);
        }

        .newsletter-form {
          display: flex;
          margin-top: 0.5rem;
        }

        .newsletter-form input {
          flex: 1;
          padding: 0.55rem 0.8rem;
          border: 1px solid #ddd;
          font-size: 0.75rem;
        }

        .newsletter-form button {
          padding: 0.55rem 1rem;
          background: var(--gold);
          color: white;
          border: none;
          cursor: pointer;
        }

        .footer-copy {
          text-align: center;
          padding: 1.5rem;
          font-size: 0.7rem;
          color: #aaa;
          border-top: 1px solid rgba(184,150,90,0.1);
        }
      `}</style>

      <footer>

        {/* LOGO */}
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

        {/* NAV LINKS (static) */}
        <nav className="footer-nav">
          <Link to="/about-us">{t('about')}</Link>
          <Link to="/stay">{t('stay')}</Link>
          <Link to="/restaurants">RESTAURANTS</Link>
          <Link to="/contact-us">{t('contact')}</Link>
        </nav>

        {/* CONTENT */}
        <div className="footer-bottom">

          <div className="footer-col">
            <h4>Contact</h4>
            <p>Km 5, Route Malabata, Tanger 90000</p>
            <p>+212 (0) 5 000 0000</p>
            <a href="mailto:info@hotel-tanger.com">info@hotel-tanger.com</a>
          </div>

          <div className="footer-col">
            <h4>Newsletter</h4>
            <p>Inscrivez-vous à notre newsletter</p>
            <div className="newsletter-form">
              <input type="email" placeholder="Votre email" />
              <button>→</button>
            </div>
          </div>

          <div className="footer-col">
            <h4>Suivez-Nous</h4>
            <div style={{ display: "flex", gap: "1rem" }}>
              <a href="https://facebook.com" target="_blank" rel="noreferrer">Facebook</a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer">Instagram</a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer">LinkedIn</a>
            </div>
          </div>

        </div>

        <div className="footer-copy">
          © Hotel Tanger · Made with ❤
        </div>

      </footer>
    </>
  );
}