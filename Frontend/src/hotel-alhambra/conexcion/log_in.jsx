import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../composant/header";
import Footer from "../composant/footer";
import { useAuth } from "../../context/AuthContext";

const GOLD = "#b8965a";
const DARK = "#1a1208";
const CREAM = "#fdf6ec";

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [tab, setTab] = useState("login"); // "login" | "register"
  const [mounted, setMounted] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => setMounted(true), 30);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const user = await login(form.email, form.password);
      if (user.role === "housekeeping") {
        navigate("/maintenance");
      } else {
        navigate("/dashboard");
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Invalid credentials");
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

        @media (max-width: 680px) {
          .login-card { grid-template-columns: 1fr; }
          .card-panel-img { min-height: 200px; }
          .card-panel-form { padding: 2rem 1.6rem; }
          .form-row { grid-template-columns: 1fr; }
          .nav-links a { padding: 6px 8px; font-size: 0.75rem; }
        }
      `}</style>

      {/* ── NAVBAR ── */}
      <Header />

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
                {error && <p style={{ color: "#c0392b", fontSize: "0.8rem", marginBottom: "1rem", textAlign: "center" }}>{error}</p>}
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
      <Footer />
    </>
  );
}