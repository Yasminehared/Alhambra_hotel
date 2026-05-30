import { useState } from "react";
import Footer from "../composant/footer";
import Header from "../composant/header";

// ─── CSS injected once ───────────────────────────────────────────────────────
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Jost:wght@200;300;400;500&display=swap');

  :root {
    --gold:       #B8966E;
    --gold-light: #D4B896;
    --dark:       #1A1A18;
    --cream:      #FAF8F4;
    --warm-white: #F5F2EC;
    --text-dark:  #2C2C28;
    --text-mid:   #6B6560;
    --text-light: #9A948E;
  }

  .spa-page * { box-sizing: border-box; margin: 0; padding: 0; }
  .spa-page { font-family: 'Jost', sans-serif; background: var(--cream); color: var(--text-dark); overflow-x: hidden; }

  /* ── HERO ── */
  .spa-hero {
    position: relative;
    height: 75vh; min-height: 520px;
    overflow: hidden;
    background: linear-gradient(160deg, #3D2B1F 0%, #6B4A38 35%, #8B6B52 60%, #A68B72 100%);
    display: flex; align-items: flex-end; justify-content: center;
  }
  .spa-hero-overlay { position: absolute; inset: 0; background: linear-gradient(to bottom, rgba(26,20,14,.2) 0%, rgba(26,20,14,.55) 100%); }

  .spa-hero-arch {
    position: absolute; top: 10%; left: 50%; transform: translateX(-50%);
    width: 320px; height: 420px;
    border: 1px solid rgba(184,150,110,.3); border-radius: 160px 160px 0 0; opacity: .4;
  }
  .spa-hero-arch::before {
    content: ''; position: absolute; inset: 20px;
    border: 1px solid rgba(184,150,110,.2); border-radius: 140px 140px 0 0;
  }

  .spa-pool { position: absolute; bottom: 20%; left: 50%; transform: translateX(-50%); width: 60%; height: 18%; background: linear-gradient(180deg, rgba(100,160,180,.35), rgba(80,130,160,.2)); border-radius: 4px; border: 1px solid rgba(184,150,110,.2); }

  .spa-palm { position: absolute; bottom: 35%; width: 3px; height: 120px; background: rgba(60,80,40,.7); border-radius: 2px; }
  .spa-palm::after { content: ''; position: absolute; top: -10px; left: -20px; width: 45px; height: 30px; background: radial-gradient(ellipse, rgba(70,100,40,.7) 0%, transparent 70%); border-radius: 50%; }
  .palm-1 { left: 22%; } .palm-2 { left: 75%; } .palm-3 { left: 38%; height: 90px; bottom: 38%; } .palm-4 { left: 62%; height: 95px; bottom: 36%; }

  .spa-umbrellas { position: absolute; bottom: 28%; left: 12%; display: flex; gap: 22px; }
  .spa-umbrella { width: 0; height: 0; border-left: 18px solid transparent; border-right: 18px solid transparent; border-bottom: 12px solid rgba(245,235,210,.5); position: relative; }
  .spa-umbrella::after { content: ''; position: absolute; bottom: -22px; left: -1px; width: 2px; height: 20px; background: rgba(200,180,150,.5); }

  .spa-loungers { position: absolute; bottom: 22%; left: 15%; display: flex; gap: 12px; }
  .spa-lounger { width: 36px; height: 10px; background: rgba(240,230,210,.6); border-radius: 3px; position: relative; }
  .spa-lounger::after { content: ''; position: absolute; right: 4px; top: -8px; width: 14px; height: 10px; background: rgba(240,230,210,.5); border-radius: 2px; transform: rotate(-20deg); }

  .spa-booking-bar {
    position: relative; z-index: 2;
    width: 100%; max-width: 860px; padding: 0 24px;
  }
  .spa-booking-inner {
    background: rgba(26,26,24,.88); backdrop-filter: blur(12px);
    border: 1px solid rgba(184,150,110,.25); border-bottom: none;
    border-radius: 2px 2px 0 0;
    display: flex; align-items: stretch; overflow: hidden;
  }
  .spa-booking-field { flex: 1; padding: 18px 22px; border-right: 1px solid rgba(184,150,110,.15); display: flex; flex-direction: column; gap: 4px; }
  .spa-booking-field label { font-size: 9px; font-weight: 400; letter-spacing: .18em; text-transform: uppercase; color: var(--gold-light); opacity: .75; }
  .spa-booking-field span { font-size: 13px; font-weight: 300; color: rgba(255,255,255,.9); letter-spacing: .04em; }
  .spa-book-btn { background: var(--gold); color: #fff; border: none; padding: 0 32px; font-family: 'Jost', sans-serif; font-size: 10px; font-weight: 500; letter-spacing: .2em; text-transform: uppercase; cursor: pointer; transition: background .3s; white-space: nowrap; }
  .spa-book-btn:hover { background: #A07E5C; }

  /* ── INTRO ── */
  .spa-intro { background: var(--cream); text-align: center; padding: 72px 24px 48px; }
  .spa-intro::before { content: ''; display: block; width: 1px; height: 48px; background: var(--gold); margin: 0 auto 32px; opacity: .5; }
  .spa-title { font-family: 'Cormorant Garamond', serif; font-weight: 400; font-size: clamp(22px, 3.5vw, 30px); letter-spacing: .15em; text-transform: uppercase; color: var(--text-dark); margin-bottom: 8px; }
  .spa-subtitle { font-size: 10px; font-weight: 400; letter-spacing: .28em; text-transform: uppercase; color: var(--gold); }

  /* ── CONTENT BLOCKS ── */
  .spa-block { max-width: 1060px; margin: 0 auto; padding: 56px 32px; display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: center; }
  .spa-block.reverse { direction: rtl; }
  .spa-block.reverse > * { direction: ltr; }

  .spa-img-wrap { position: relative; overflow: hidden; border-radius: 2px; }
  .spa-img-ph { width: 100%; aspect-ratio: 3/4; position: relative; overflow: hidden; }
  .spa-img-ph::after { content: ''; position: absolute; top: 15%; left: 50%; transform: translateX(-50%); width: 55%; height: 65%; border: 1px solid rgba(255,255,255,.2); border-radius: 80px 80px 0 0; }
  .ph-spa      { background: linear-gradient(145deg, #6B4A38 0%, #8B6B52 40%, #A08070 70%, #B8966E 100%); }
  .ph-interior { background: linear-gradient(160deg, #3D2B1F 0%, #5C3D2E 50%, #7A5540 100%); }
  .ph-pool     { background: linear-gradient(160deg, #2C3E50 0%, #4A6741 40%, #6B8C5A 70%, #B8966E 100%); }
  .ph-wellness { background: linear-gradient(135deg, #C4A882 0%, #A8865C 50%, #8B6B4A 100%); aspect-ratio: 4/3; }

  .spa-text p { font-size: 13.5px; font-weight: 300; line-height: 1.85; color: var(--text-mid); margin-bottom: 14px; }
  .spa-link { display: inline-flex; align-items: center; gap: 10px; margin-top: 12px; font-size: 9px; font-weight: 500; letter-spacing: .25em; text-transform: uppercase; color: var(--text-dark); text-decoration: none; border-bottom: 1px solid var(--gold); padding-bottom: 2px; cursor: pointer; transition: color .3s; }
  .spa-link:hover { color: var(--gold); }
  .spa-link::after { content: '→'; font-size: 12px; }

  /* ── SPOTS ── */
  .spa-spots { background: var(--warm-white); padding: 72px 32px; }
  .spa-spots-header { max-width: 1060px; margin: 0 auto 48px; }
  .spa-spots-header h2 { font-family: 'Cormorant Garamond', serif; font-weight: 400; font-size: clamp(26px, 3.5vw, 34px); color: var(--gold); letter-spacing: .12em; text-transform: uppercase; margin-bottom: 12px; }
  .spa-spots-header p { font-size: 13px; font-weight: 300; color: var(--text-mid); max-width: 460px; line-height: 1.8; }
  .spa-tag { font-size: 9px; letter-spacing: .3em; text-transform: uppercase; color: var(--text-light); margin-bottom: 10px; display: block; }
  .spa-spots-grid { max-width: 1060px; margin: 0 auto; display: grid; grid-template-columns: 1fr 1fr; gap: 32px; }
  .spa-spots-right { display: flex; flex-direction: column; gap: 24px; }
  .spa-spots-right p { font-size: 13px; font-weight: 300; line-height: 1.85; color: var(--text-mid); }
  .spa-spots-list { list-style: none; margin-top: 8px; }
  .spa-spots-list li { font-size: 12px; font-weight: 300; color: var(--text-mid); padding: 6px 0; border-bottom: 1px solid rgba(184,150,110,.12); display: flex; align-items: center; gap: 10px; letter-spacing: .03em; }
  .spa-spots-list li::before { content: ''; width: 18px; height: 1px; background: var(--gold); flex-shrink: 0; }

  /* ── HEALTH ── */
  .spa-health { padding: 80px 32px; background: var(--cream); }
  .spa-health-inner { max-width: 1060px; margin: 0 auto; display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: center; }
  .spa-gold-h { font-family: 'Cormorant Garamond', serif; font-weight: 400; font-size: clamp(24px, 3vw, 32px); color: var(--gold); letter-spacing: .1em; text-transform: uppercase; line-height: 1.2; margin-bottom: 6px; }
  .spa-sub-label { font-size: 9px; letter-spacing: .3em; text-transform: uppercase; color: var(--text-light); margin-bottom: 28px; display: block; }
  .spa-pillars { display: flex; gap: 8px; flex-wrap: wrap; margin: 20px 0; }
  .spa-pillar { font-size: 9px; font-weight: 500; letter-spacing: .18em; text-transform: uppercase; color: var(--gold); border: 1px solid rgba(184,150,110,.4); padding: 5px 12px; border-radius: 1px; }

  /* ── TREATMENTS ── */
  .spa-treatments { padding: 72px 32px 0; background: var(--cream); text-align: center; }
  .spa-treatments h2 { font-family: 'Cormorant Garamond', serif; font-weight: 400; font-size: clamp(22px, 3vw, 28px); letter-spacing: .22em; text-transform: uppercase; color: var(--text-dark); margin-bottom: 48px; }

  .spa-panorama { width: 100%; height: 360px; position: relative; overflow: hidden; background: linear-gradient(to right, #2C1A12, #4A2E1E 25%, #7A5540 50%, #4A2E1E 75%, #2C1A12); }
  .spa-arch { position: absolute; border: 2px solid rgba(184,150,110,.3); border-radius: 50% 50% 0 0 / 60% 60% 0 0; bottom: 0; left: 50%; transform: translateX(-50%); }
  .spa-arch-1 { width: 520px; height: 340px; }
  .spa-arch-2 { width: 400px; height: 280px; border-color: rgba(184,150,110,.22); }
  .spa-arch-3 { width: 280px; height: 220px; border-color: rgba(184,150,110,.16); }
  .spa-arch-4 { width: 180px; height: 160px; border-color: rgba(184,150,110,.1); }
  .spa-arch-5 { width:  100px; height: 110px; border-color: rgba(184,150,110,.06); }
  .spa-floor { position: absolute; bottom: 0; left: 0; right: 0; height: 45%; background: linear-gradient(to top, rgba(60,35,20,.8), transparent); }
  .spa-glow { position: absolute; top: 50%; left: 50%; transform: translate(-50%,-50%); width: 80px; height: 80px; background: radial-gradient(circle, rgba(184,150,110,.4) 0%, transparent 70%); border-radius: 50%; }

  .spa-cards { max-width: 1060px; margin: 0 auto; display: grid; grid-template-columns: repeat(3, 1fr); gap: 2px; margin-top: 2px; }
  .spa-card { background: var(--dark); padding: 36px 28px; position: relative; overflow: hidden; cursor: pointer; transition: transform .3s; }
  .spa-card::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 1px; background: var(--gold); transform: scaleX(0); transform-origin: left; transition: transform .4s; }
  .spa-card:hover::before { transform: scaleX(1); }
  .spa-card:hover { transform: translateY(-2px); }
  .spa-card h3 { font-family: 'Cormorant Garamond', serif; font-weight: 400; font-size: 18px; color: rgba(255,255,255,.92); letter-spacing: .08em; margin-bottom: 12px; }
  .spa-card p { font-size: 12px; font-weight: 300; color: rgba(255,255,255,.5); line-height: 1.75; }
  .spa-card-num { font-family: 'Cormorant Garamond', serif; font-size: 42px; font-weight: 300; color: rgba(184,150,110,.12); position: absolute; top: 16px; right: 20px; line-height: 1; }

  /* ── RESPONSIVE ── */
  @media (max-width: 768px) {
    .spa-booking-inner { flex-direction: column; }
    .spa-booking-field { border-right: none; border-bottom: 1px solid rgba(184,150,110,.15); }
    .spa-book-btn { padding: 16px; text-align: center; }
    .spa-block, .spa-block.reverse { grid-template-columns: 1fr; gap: 32px; direction: ltr; }
    .spa-spots-grid, .spa-health-inner { grid-template-columns: 1fr; }
    .spa-cards { grid-template-columns: 1fr; }
  }

  @keyframes spa-fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
  .spa-fade { animation: spa-fadeUp .8s ease both; }
  .spa-fade.d1 { animation-delay: .1s; }
  .spa-fade.d2 { animation-delay: .25s; }
  .spa-fade.d3 { animation-delay: .4s; }
`;

// ─── Sub-components ──────────────────────────────────────────────────────────
function ImgPh({ cls, style = {} }) {
  return <div className={`spa-img-ph ${cls}`} style={style} />;
}

function BookingField({ label, value }) {
  return (
    <div className="spa-booking-field">
      <label>{label}</label>
      <span>{value}</span>
    </div>
  );
}

function ContentBlock({ imgCls, reverse = false, children }) {
  return (
    <div className={`spa-block${reverse ? " reverse" : ""}`}>
      <div className="spa-img-wrap spa-fade d1">
        <ImgPh cls={imgCls} />
      </div>
      <div className="spa-text spa-fade d2">{children}</div>
    </div>
  );
}

function TreatmentCard({ num, title, desc }) {
  return (
    <div className="spa-card">
      <span className="spa-card-num">{num}</span>
      <h3>{title}</h3>
      <p>{desc}</p>
    </div>
  );
}

// ─── Main Page ───────────────────────────────────────────────────────────────

export default function SpaAlhambraPage() {
  const [arrival,   setArrival]   = useState("27 Février 2025");
  const [departure, setDeparture] = useState("28 Février 2026");

  return (
    <>
    <Header />
      {/* Inject styles once */}
      <style>{styles}</style>

      <div className="spa-page">

        {/* ── HERO ── */}
        <section className="spa-hero">
          {/* Decorative shapes */}
          <div className="spa-hero-arch" />
          <div className="spa-pool" />
          {["palm-1","palm-2","palm-3","palm-4"].map(c => (
            <div key={c} className={`spa-palm ${c}`} />
          ))}
          <div className="spa-umbrellas">
            {[0,1,2].map(i => <div key={i} className="spa-umbrella" />)}
          </div>
          <div className="spa-loungers">
            {[0,1,2,3].map(i => <div key={i} className="spa-lounger" />)}
          </div>
          <div className="spa-hero-overlay" />

          {/* Booking bar */}
          <div className="spa-booking-bar">
            <div className="spa-booking-inner">
              <BookingField label="Arrivée"          value={arrival}   />
              <BookingField label="Départ"           value={departure} />
              <BookingField label="Chambres & Guests" value="1 Room / 2 Guests" />
              <button className="spa-book-btn">Book Now</button>
            </div>
          </div>
        </section>

        {/* ── INTRO ── */}
        <section className="spa-intro">
          <p className="spa-subtitle spa-fade d1">Your Luxury Spa in Alhambra</p>
          <h1 className="spa-title spa-fade d2">The Chenot Spa Alhambra</h1>
        </section>

        {/* ── ABOUT ── */}
        <ContentBlock imgCls="ph-spa">
          <p>
            Unique in Morocco, The Chenot Spa at Selman Marrakech covers a sumptuous space
            reminiscent of the heated baths of antique Istanbul, offering your mind and body
            a new approach to regain its biological rhythm and balance.
          </p>
          <p>
            Our luxury hotel is one of the 6 palaces in the world to have a Chenot Spa.
            Our aim is to leave you feeling fully recharged and full of vitality.
          </p>
          <span className="spa-link">View Brochure</span>
        </ContentBlock>

        {/* ── SPOTS ── */}
        <section className="spa-spots">
          <div className="spa-spots-header">
            <span className="spa-tag">What We Offer</span>
            <h2>Spots</h2>
            <p>
              With almost 50 years of research applied to the science of wellness, The Chenot Spa
              brings you wellness programmes, treatments, cosmetic products and a bright regime
              that promotes healthy living, wellness and successful ageing.
            </p>
          </div>

          <div className="spa-spots-grid">
            <div className="spa-img-wrap">
              <ImgPh cls="ph-interior" />
            </div>
            <div className="spa-spots-right">
              <div className="spa-img-wrap">
                <ImgPh cls="ph-wellness" />
              </div>
              <p>
                A holistic vision of the body achieved through its 5 key pillars of
                Sport &amp; Physical Activities, Nutrition, and Aesthetics.
              </p>
              <ul className="spa-spots-list">
                {[
                  "Seven treatment rooms",
                  "Four hydrotherapy rooms",
                  "A hydro-massage pool",
                  "Two heated outdoor pools",
                  "Two hammams",
                  "A gym and boutique for essentials",
                ].map(item => <li key={item}>{item}</li>)}
              </ul>
            </div>
          </div>
        </section>

        {/* ── HEALTH & WELLBEING ── */}
        <section className="spa-health">
          <div className="spa-health-inner">
            <div className="spa-img-wrap spa-fade d1">
              <ImgPh cls="ph-pool" />
            </div>
            <div className="spa-fade d2">
              <h2 className="spa-gold-h">Chenot Health &amp;<br />Wellbeing</h2>
              <span className="spa-sub-label">Luscious Treatment</span>
              <div className="spa-pillars">
                {["Sport & Physical Activities", "Nutrition", "Aesthetics"].map(p => (
                  <span key={p} className="spa-pillar">{p}</span>
                ))}
              </div>
              <p style={{ fontSize: 13, fontWeight: 300, lineHeight: 1.85, color: "var(--text-mid)", marginBottom: 14 }}>
                The regime is one that has been developed for over forty-five years by Henri Chenot
                at the hotel Merano in northern Italy, and it is a singular combination of
                treatments and dietary regimes which, being in sync with each other, aim to protect
                the body from the damage of accumulated toxins and the on-set of premature ageing.
              </p>
              <p style={{ fontSize: 13, fontWeight: 300, lineHeight: 1.85, color: "var(--text-mid)" }}>
                The procedures and the treatments are all based on the principles of traditional
                Chinese medicine and tie into medical science and a very advanced diagnostic
                technology which analyses the body's condition and the relevant remedy.
              </p>
            </div>
          </div>
        </section>

        {/* ── TREATMENTS ── */}
        <section className="spa-treatments">
          <h2>Treatments</h2>

          {/* Arch corridor panorama */}
          <div className="spa-panorama">
            {["spa-arch-1","spa-arch-2","spa-arch-3","spa-arch-4","spa-arch-5"].map(c => (
              <div key={c} className={`spa-arch ${c}`} />
            ))}
            <div className="spa-floor" />
            <div className="spa-glow" />
          </div>

          {/* Treatment cards */}
          <div className="spa-cards">
            <TreatmentCard
              num="01"
              title="Biontology Detox"
              desc="A deep cellular regeneration programme using Chenot's signature diagnostic protocols to restore balance and vitality."
            />
            <TreatmentCard
              num="02"
              title="Hammam Ritual"
              desc="A timeless Moroccan tradition elevated with Chenot's wellness philosophy — steam, black soap, and kessa exfoliation."
            />
            <TreatmentCard
              num="03"
              title="Hydrotherapy"
              desc="Targeted water therapy sessions in four dedicated rooms, designed to stimulate circulation and deep muscle recovery."
            />
          </div>
        </section>

      </div>
    <Footer />
    </>
  );
}