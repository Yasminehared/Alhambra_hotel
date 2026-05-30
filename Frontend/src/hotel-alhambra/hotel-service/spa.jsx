import { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Header from "../composant/header";
import Footer from "../composant/footer";
import { ScrollReveal } from "../composant/index.js";
import "./rooms.css";

const TREATMENTS = [
  {
    name: "Hammam Ritual",
    duration: "90 min",
    price: "€120",
    image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&q=80",
    desc: "Traditional Moroccan steam bath with black soap exfoliation and argan oil massage.",
  },
  {
    name: "Atlas Stone Therapy",
    duration: "75 min",
    price: "€145",
    image: "https://images.unsplash.com/photo-1600334089648-b0d9d3028eb7?w=800&q=80",
    desc: "Heated volcanic stones and deep tissue work to release tension and restore balance.",
  },
  {
    name: "Royal Argan Facial",
    duration: "60 min",
    price: "€95",
    image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d880?w=800&q=80",
    desc: "Luxury facial using organic argan and rose water from the Ourika Valley.",
  },
  {
    name: "Couples Sanctuary",
    duration: "120 min",
    price: "€280",
    image: "https://images.unsplash.com/photo-1515377909023-d2a4b6d6f0d4?w=800&q=80",
    desc: "Private suite with side-by-side massage, champagne, and Mediterranean views.",
  },
];

export default function SpaPage() {
  const { t } = useTranslation();
  const [selected, setSelected] = useState(0);

  return (
    <div className="alhambra-root" style={{ background: "#f8f6f2" }}>
      <Header />

      <section className="hero" style={{ height: "70vh", position: "relative" }}>
        <img
          className="hero-image"
          src="https://images.unsplash.com/photo-1540555700478-4be289fbbe4f?w=1400&q=80"
          alt="Alhambra Spa"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
        <div className="hero-overlay" style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.35)" }} />
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
            textAlign: "center",
            padding: "0 1.5rem",
          }}
        >
          <p style={{ letterSpacing: "0.4em", fontSize: "0.75rem", textTransform: "uppercase", color: "#d4af7a" }}>
            {t("spa_label")}
          </p>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2.5rem, 6vw, 4rem)", fontWeight: 300 }}>
            {t("spa_title_line1")}
            <br />
            <em>{t("spa_title_line2")}</em>
          </h1>
        </div>
      </section>

      <ScrollReveal>
        <section style={{ maxWidth: 720, margin: "4rem auto", padding: "0 1.5rem", textAlign: "center" }}>
          <p style={{ color: "#6b5c48", lineHeight: 2 }}>{t("spa_text")}</p>
          <p style={{ marginTop: "1.5rem", color: "#94733e", letterSpacing: "0.2em", fontSize: "0.8rem" }}>
            Open daily · 9:00 – 21:00 · Concierge booking available
          </p>
        </section>
      </ScrollReveal>

      <section style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "2rem", padding: "2rem 5rem 5rem" }}>
        {TREATMENTS.map((item, idx) => (
          <ScrollReveal key={item.name} delay={idx * 80}>
            <article
              onClick={() => setSelected(idx)}
              style={{
                cursor: "pointer",
                border: selected === idx ? "1px solid #b8975a" : "1px solid transparent",
                background: "#fff",
                overflow: "hidden",
                transition: "transform 0.4s ease, box-shadow 0.4s ease",
                transform: selected === idx ? "translateY(-4px)" : "none",
                boxShadow: selected === idx ? "0 20px 40px rgba(26,18,8,0.12)" : "0 4px 20px rgba(26,18,8,0.06)",
              }}
            >
              <img src={item.image} alt={item.name} style={{ width: "100%", height: 220, objectFit: "cover" }} />
              <div style={{ padding: "1.5rem" }}>
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: "1.5rem" }}>{item.name}</h3>
                <p style={{ color: "#b8975a", fontSize: "0.8rem", letterSpacing: "0.15em" }}>
                  {item.duration} · {item.price}
                </p>
                <p style={{ color: "#6b5c48", lineHeight: 1.8, fontSize: "0.95rem" }}>{item.desc}</p>
              </div>
            </article>
          </ScrollReveal>
        ))}
      </section>

      <section style={{ textAlign: "center", padding: "0 1.5rem 5rem" }}>
        <Link
          to="/contact-us"
          style={{
            display: "inline-block",
            padding: "1rem 2.5rem",
            background: "#b8975a",
            color: "#fff",
            textDecoration: "none",
            letterSpacing: "0.25em",
            fontSize: "0.75rem",
            textTransform: "uppercase",
          }}
        >
          Book {TREATMENTS[selected].name}
        </Link>
      </section>

      <Footer />
    </div>
  );
}
