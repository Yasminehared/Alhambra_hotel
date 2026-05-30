import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Footer from "../composant/footer";
import Header from "../composant/header";

export default function Stay() {
  const { t } = useTranslation();
  const [active, setActive] = useState("rooms");
  const navigate = useNavigate();

  const CATEGORIES = [
    {
      key: "rooms",
      label: t('rooms'),
      tagline: t('stay_eyebrow'),
      heroImage: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1400&q=80",
      intro: t('rooms_intro'),
      from: t('stay_from', { price: "€180" }),
      items: [
        {
          name: t('superior_room'),
          size: "35 m²",
          desc: "Sober, elegant and contemporary oriental setting.",
          image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80",
          features: ["King or Twin Bed", "City View", "En-Suite Bathroom"],
          link: "/rooms",
        },
        {
          name: t('deluxe_room'),
          size: "55 m²",
          desc: "55 square meters of elegance, luxury and intimacy.",
          image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80",
          features: ["King Bed", "Garden View", "Soaking Tub"],
          link: "/rooms",
        },
      ],
    },
    {
      key: "suites",
      label: t('suites'),
      tagline: t('stay_eyebrow'),
      heroImage: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=1400&q=80",
      intro: t('suites_intro'),
      from: t('stay_from', { price: "€420" }),
      items: [
        {
          name: t('junior_suite'),
          size: "75 m²",
          desc: "Harmonious blend of Moroccan craftsmanship and contemporary luxury.",
          image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&q=80",
          features: ["King Bed", "Living Area", "Garden View"],
          link: "/suites",
        },
      ],
    },
    {
      key: "villas",
      label: t('villas'),
      tagline: t('stay_eyebrow'),
      heroImage: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=1400&q=80",
      intro: t('villas_intro'),
      from: t('stay_from', { price: "€1,200" }),
      items: [
        {
          name: t('garden_villa'),
          size: "220 m²",
          desc: "Nestled within a private walled garden with a secluded pool.",
          image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800&q=80",
          features: ["Private Heated Pool", "Walled Garden", "2 Bedrooms"],
          link: "/villas",
        },
      ],
    },
  ];

  const current = CATEGORIES.find((c) => c.key === active);

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
        .stay-hero {
          position: relative;
          height: 100vh;
          overflow: hidden;
        }
        .stay-hero-img {
          width: 100%; height: 100%;
          object-fit: cover;
          transition: opacity 0.8s ease, transform 1s ease;
          transform: scale(1.04);
          animation: zoomIn 10s ease forwards;
        }
        @keyframes zoomIn { to { transform: scale(1); } }
        .stay-hero-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, rgba(20,10,2,0.6) 100%);
        }
        .stay-hero-center {
          position: absolute;
          top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          text-align: center;
          color: white;
          width: 100%;
          padding: 0 2rem;
          animation: fadeUp 1.2s ease 0.3s both;
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translate(-50%, calc(-50% + 24px)); }
          to   { opacity: 1; transform: translate(-50%, -50%); }
        }
        .stay-eyebrow {
          font-size: 0.6rem;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: var(--gold-light);
          margin-bottom: 1.2rem;
        }
        .stay-hero-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(3.5rem, 9vw, 7rem);
          font-weight: 300;
          line-height: 1;
          margin-bottom: 1.4rem;
          letter-spacing: 0.03em;
        }
        .stay-hero-title em {
          font-style: italic;
          color: var(--gold-light);
        }
        .stay-hero-sub {
          font-size: 0.72rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.55);
        }

        /* ── TAB NAV ── */
        .stay-tabs {
          display: flex;
          justify-content: center;
          align-items: stretch;
          background: var(--brown);
          border-bottom: 1px solid rgba(184,150,90,0.15);
        }
        .stay-tab {
          flex: 1;
          max-width: 260px;
          padding: 28px 20px;
          text-align: center;
          cursor: pointer;
          border: none;
          background: transparent;
          color: rgba(255,255,255,0.42);
          font-family: 'Jost', sans-serif;
          font-size: 0.65rem;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          border-bottom: 2px solid transparent;
          transition: all 0.3s;
          position: relative;
        }
        .stay-tab:hover { color: rgba(255,255,255,0.75); }
        .stay-tab.active {
          color: var(--gold-light);
          border-bottom-color: var(--gold);
        }
        .stay-tab-label {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.4rem;
          font-weight: 300;
          display: block;
          margin-bottom: 4px;
          letter-spacing: 0.05em;
        }
        .stay-tab-sub {
          font-size: 0.55rem;
          letter-spacing: 0.2em;
          opacity: 0.6;
        }
        .stay-tab-divider {
          width: 1px;
          background: rgba(184,150,90,0.15);
          align-self: stretch;
        }

        /* ── CATEGORY INTRO ── */
        .category-intro {
          display: grid;
          grid-template-columns: 1fr 1fr;
          min-height: 340px;
        }
        .category-intro-img-col {
          overflow: hidden;
          position: relative;
        }
        .category-intro-img {
          width: 100%; height: 100%;
          object-fit: cover;
          transition: transform 0.8s ease;
        }
        .category-intro-img-col:hover .category-intro-img { transform: scale(1.04); }

        .category-intro-badge {
          position: absolute;
          bottom: 28px; right: 28px;
          background: var(--brown);
          color: var(--gold-light);
          padding: 10px 20px;
          font-size: 0.6rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          font-family: 'Jost', sans-serif;
        }

        .category-intro-text {
          padding: 60px 64px;
          background: white;
          display: flex; flex-direction: column; justify-content: center;
        }
        .category-intro-label {
          font-size: 0.6rem;
          letter-spacing: 0.24em;
          text-transform: uppercase;
          color: var(--gold);
          margin-bottom: 1rem;
        }
        .category-intro-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2rem, 3vw, 2.8rem);
          font-weight: 300;
          color: var(--brown);
          margin-bottom: 1.2rem;
          line-height: 1.1;
        }
        .category-intro-body {
          font-size: 0.88rem;
          line-height: 2;
          color: var(--brown-light);
          margin-bottom: 1.6rem;
          max-width: 440px;
        }
        .category-from {
          font-size: 0.68rem;
          letter-spacing: 0.14em;
          color: var(--gold);
          text-transform: uppercase;
          border-top: 1px solid rgba(184,150,90,0.25);
          padding-top: 1rem;
        }

        /* ── ITEMS GRID ── */
        .items-section {
          padding: 70px 48px;
          background: var(--cream);
        }
        .items-section-header {
          text-align: center;
          margin-bottom: 50px;
        }
        .items-section-label {
          font-size: 0.6rem;
          letter-spacing: 0.24em;
          text-transform: uppercase;
          color: var(--gold);
          margin-bottom: 0.8rem;
        }
        .items-section-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(1.8rem, 3.5vw, 2.8rem);
          font-weight: 300;
          color: var(--brown);
        }

        /* deco */
        .deco-line {
          display: flex; align-items: center; gap: 12px;
          justify-content: center; width: 120px; margin: 1rem auto 0;
        }
        .deco-line::before, .deco-line::after {
          content: ''; flex: 1; height: 1px; background: var(--gold); opacity: 0.4;
        }
        .deco-diamond {
          width: 5px; height: 5px; background: var(--gold);
          transform: rotate(45deg); flex-shrink: 0;
        }

        .items-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 3px;
        }

        /* ── ITEM CARD ── */
        .item-card {
          background: white;
          display: flex; flex-direction: column;
          overflow: hidden;
          transition: box-shadow 0.3s;
        }
        .item-card:hover { box-shadow: 0 12px 48px rgba(59,46,30,0.12); }

        .item-img-wrap {
          position: relative;
          height: 240px;
          overflow: hidden;
        }
        .item-img {
          width: 100%; height: 100%;
          object-fit: cover;
          transition: transform 0.7s ease;
        }
        .item-card:hover .item-img { transform: scale(1.06); }

        .item-size-tag {
          position: absolute;
          top: 16px; left: 16px;
          background: rgba(59,46,30,0.78);
          backdrop-filter: blur(4px);
          color: var(--gold-light);
          padding: 5px 12px;
          font-size: 0.58rem;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          font-family: 'Jost', sans-serif;
        }

        .item-body {
          padding: 32px 30px 28px;
          flex: 1; display: flex; flex-direction: column;
        }
        .item-name {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.6rem;
          font-weight: 300;
          color: var(--brown);
          margin-bottom: 0.7rem;
          line-height: 1.1;
        }
        .item-desc {
          font-size: 0.82rem;
          line-height: 1.85;
          color: var(--brown-light);
          margin-bottom: 1.2rem;
          flex: 1;
        }
        .item-features {
          display: flex; flex-wrap: wrap; gap: 6px;
          margin-bottom: 1.4rem;
        }
        .item-feature {
          font-size: 0.57rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--brown);
          padding: 4px 10px;
          border: 1px solid rgba(184,150,90,0.3);
        }
        .item-actions {
          display: flex; gap: 12px; align-items: center;
        }
        .item-book-btn {
          background: var(--gold); color: white; border: none;
          padding: 10px 22px; cursor: pointer;
          font-family: 'Jost', sans-serif; font-size: 0.62rem;
          letter-spacing: 0.14em; text-transform: uppercase;
          transition: background 0.25s; flex: 1;
        }
        .item-book-btn:hover { background: var(--gold-dark); }
        .item-more-btn {
          background: transparent;
          border: 1px solid rgba(184,150,90,0.4);
          color: var(--brown-light);
          padding: 10px 18px; cursor: pointer;
          font-family: 'Jost', sans-serif; font-size: 0.62rem;
          letter-spacing: 0.12em; text-transform: uppercase;
          transition: all 0.25s;
        }
        .item-more-btn:hover { border-color: var(--gold); color: var(--gold); }

        /* ── COMPARISON TABLE ── */
        .compare-section {
          padding: 80px 48px;
          background: white;
        }
        .compare-header {
          text-align: center; margin-bottom: 50px;
        }
        .compare-label {
          font-size: 0.6rem; letter-spacing: 0.24em;
          text-transform: uppercase; color: var(--gold); margin-bottom: 0.8rem;
        }
        .compare-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(1.8rem, 3vw, 2.6rem);
          font-weight: 300; color: var(--brown);
        }

        .compare-table {
          width: 100%; border-collapse: collapse;
          max-width: 900px; margin: 0 auto;
        }
        .compare-table th {
          padding: 18px 20px;
          background: var(--brown);
          color: white;
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.1rem; font-weight: 300;
          letter-spacing: 0.06em;
          text-align: left;
          border-right: 1px solid rgba(255,255,255,0.06);
        }
        .compare-table th:first-child {
          color: var(--gold-light);
          font-family: 'Jost', sans-serif;
          font-size: 0.6rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
        }
        .compare-table td {
          padding: 16px 20px;
          font-size: 0.82rem;
          color: var(--brown-light);
          border-bottom: 1px solid rgba(184,150,90,0.12);
          border-right: 1px solid rgba(184,150,90,0.08);
          vertical-align: middle;
        }
        .compare-table td:first-child {
          font-size: 0.6rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--gold);
          font-weight: 500;
        }
        .compare-table tr:hover td { background: rgba(247,243,238,0.7); }

        .check { color: var(--gold); font-size: 0.9rem; }
        .dash { color: #ccc; }

        /* ── CTA ── */
        .stay-cta {
          background: var(--cream-dark);
          padding: 90px 40px;
          text-align: center;
        }
        .stay-cta-label {
          font-size: 0.6rem; letter-spacing: 0.26em;
          text-transform: uppercase; color: var(--gold); margin-bottom: 1rem;
        }
        .stay-cta-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2rem, 4vw, 3.2rem);
          font-weight: 300; color: var(--brown);
          margin-bottom: 0.8rem; line-height: 1.1;
        }
        .stay-cta-title em { font-style: italic; color: var(--gold); }
        .stay-cta-sub {
          font-size: 0.8rem; color: var(--brown-light);
          margin-bottom: 2.4rem; line-height: 1.8;
          max-width: 480px; margin-left: auto; margin-right: auto;
        }
        .stay-cta-sub { margin-bottom: 2.4rem; }
        
        /* ── RESPONSIVE ── */
        @media (max-width: 900px) {
          .category-intro { grid-template-columns: 1fr; }
          .category-intro-img-col { height: 300px; }
          .category-intro-text { padding: 48px 32px; }
          .items-section { padding: 50px 20px; }
          .items-grid { grid-template-columns: 1fr; }
          .compare-section { padding: 60px 16px; }
          .compare-table th, .compare-table td { padding: 12px 12px; }
        }
        @media (max-width: 600px) {
          .stay-tabs { flex-direction: column; }
          .stay-tab-divider { width: 100%; height: 1px; }
          .stay-tab { max-width: 100%; padding: 18px 20px; }
        }
      `}</style>

      <div className="alhambra-root">
        <Header />

        {/* ── HERO ── */}
        <section className="stay-hero">
          <img
            className="stay-hero-img"
            src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1800&q=80"
            alt="Alhambra Stay"
          />
          <div className="stay-hero-overlay" />
          <div className="stay-hero-center">
            <p className="stay-eyebrow">{t('stay_eyebrow')}</p>
            <h1 className="stay-hero-title">
              {t('stay_hero_title')} <em>{t('stay_hero_title_em')}</em>
            </h1>
            <p className="stay-hero-sub">{t('stay_hero_sub')}</p>
          </div>
        </section>

        {/* ── TABS ── */}
        <nav className="stay-tabs">
          {CATEGORIES.map((cat, i) => (
            <>
              {i > 0 && <div key={`div-${cat.key}`} className="stay-tab-divider" />}
              <button
                key={cat.key}
                className={`stay-tab${active === cat.key ? " active" : ""}`}
                onClick={() => setActive(cat.key)}
              >
                <span className="stay-tab-label">{cat.label}</span>
                <span className="stay-tab-sub">{cat.tagline}</span>
              </button>
            </>
          ))}
        </nav>

        {/* ── CATEGORY INTRO ── */}
        <section className="category-intro">
          <div className="category-intro-img-col">
            <img
              className="category-intro-img"
              src={current.heroImage}
              alt={current.label}
            />
            <div className="category-intro-badge">{current.from}</div>
          </div>
          <div className="category-intro-text">
            <p className="category-intro-label">{current.tagline}</p>
            <h2 className="category-intro-title">The Alhambra<br />{current.label}</h2>
            <p className="category-intro-body">{current.intro}</p>
            <p className="category-from">{current.from}</p>
          </div>
        </section>

        {/* ── ITEMS GRID ── */}
        <section className="items-section">
          <div className="items-section-header">
            <p className="items-section-label">Our Selection</p>
            <h2 className="items-section-title">
              Discover Our {current.label}
            </h2>
            <div className="deco-line">
              <div className="deco-diamond" />
            </div>
          </div>
          <div className="items-grid">
            {current.items.map((item) => (
              <div key={item.name} className="item-card">
                <div className="item-img-wrap">
                  <img src={item.image} alt={item.name} className="item-img" />
                  <span className="item-size-tag">{item.size}</span>
                </div>
                <div className="item-body">
                  <h3 className="item-name">{item.name}</h3>
                  <p className="item-desc">{item.desc}</p>
                  <div className="item-features">
                    {item.features.map((f) => (
                      <span key={f} className="item-feature">{f}</span>
                    ))}
                  </div>
                  <div className="item-actions">
                    <button
                      className="item-book-btn"
                      onClick={() => navigate("/booking")}
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── COMPARISON TABLE ── */}
        <section className="compare-section">
          <div className="compare-header">
            <p className="compare-label">At a Glance</p>
            <h2 className="compare-title">Compare Our Accommodations</h2>
          </div>
          <table className="compare-table">
            <thead>
              <tr>
                <th>Feature</th>
                <th>Rooms</th>
                <th>Suites</th>
                <th>Villas</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Size Range", "35 – 65 m²", "75 – 280 m²", "220 – 580 m²"],
                ["Private Pool", "—", "Presidential only", "✦ All Villas"],
                ["Private Terrace", "Deluxe Premier", "✦ All Suites", "✦ All Villas"],
                ["Butler Service", "On Request", "✦ Included", "✦ Dedicated"],
                ["Private Hammam", "—", "Royal & Presidential", "✦ All Villas"],
                ["Private Kitchen", "—", "—", "✦ All Villas"],
                ["Starting Price", "From €180", "From €420", "From €1,200"],
                ["Best For", "Couples & Solo", "Couples & Families", "Groups & Celebrations"],
              ].map(([feature, rooms, suites, villas]) => (
                <tr key={feature}>
                  <td>{feature}</td>
                  <td style={{ color: rooms.startsWith("✦") ? "var(--gold)" : undefined }}>{rooms}</td>
                  <td style={{ color: suites.startsWith("✦") ? "var(--gold)" : undefined }}>{suites}</td>
                  <td style={{ color: villas.startsWith("✦") ? "var(--gold)" : undefined }}>{villas}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* ── CTA ── */}
        <section className="stay-cta">
          <p className="stay-cta-label">We await your arrival</p>
          <h2 className="stay-cta-title">
            Begin Your <em>Alhambra</em> Journey
          </h2>
          <p className="stay-cta-sub">
            Our reservations team is available to help you find the perfect accommodation
            and curate every detail of your stay.
          </p>
        </section>

        <Footer />
      </div>
    </>
  );
}