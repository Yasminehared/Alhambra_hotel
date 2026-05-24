import { useState } from "react";
import { Search, User, ShoppingBag } from "lucide-react";
import "./rooms.css";
import "./restaurants.css";
import Header from "../composant/header";
import Footer from "../composant/footer";

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
    <div className="alhambra-root">

      {/* ── NAVBAR ── */}
       <Header />

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
            <br></br>
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
            <br></br>
            <p>LA NOUVELLE TABLE RAFFINÉE ET FESTIVE DU HOTEL TANGER</p>
            <br></br>
          </div>
          <div className="rest-feature-body">
            <div className="rest-feature-img">
              <img
                src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=700&q=80"
                alt="Chef Jean-François Piège"
              />
            </div>
            <div className="rest-feature-text">
              <br></br>
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
       <Footer />
    </div>
  );
}
