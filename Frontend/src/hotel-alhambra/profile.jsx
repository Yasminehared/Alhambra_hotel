import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "./composant/header";
import Footer from "./composant/footer";
import { useAuth } from "../context/AuthContext";
import { User, Shield, Phone, Globe, FileText, Lock } from "lucide-react";

const GOLD = "#b8965a";
const DARK = "#1a1208";
const CREAM = "#fdf6ec";

export default function ProfilePage() {
  const { user, login } = useAuth();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    nationality: "",
    passport_number: "",
    password: "",
    password_confirmation: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (user) {
      setForm({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        nationality: user.nationality || "",
        passport_number: user.passport_number || "",
        password: "",
        password_confirmation: "",
      });
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");

    if (form.password && form.password !== form.password_confirmation) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      const res = await axios.put("/api/profile", form);
      if (res.data.success) {
        setMessage("Your profile has been updated successfully.");
        // Refresh local session state by calling /api/me indirectly or update context
        // Since we got the new user object, we can re-fetch me if context supports it.
        // Actually, we can trigger a page refresh or simply let the user know.
        // Let's force a reload of the user session by fetching it.
        window.location.reload();
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: CREAM }}>
        <p style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "1.5rem" }}>Please sign in to view your profile settings.</p>
      </div>
    );
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,400&family=Jost:wght@300;400;500;600&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Jost', sans-serif; background: ${CREAM}; color: ${DARK}; }

        .profile-container {
          max-width: 800px;
          margin: 100px auto 60px;
          padding: 2.5rem;
          background: white;
          border-radius: 8px;
          box-shadow: 0 10px 45px rgba(26,18,8,0.06);
          border: 1px solid rgba(184,150,90,0.15);
        }

        .profile-header {
          text-align: center;
          margin-bottom: 2.5rem;
        }

        .profile-header h1 {
          font-family: 'Cormorant Garamond', serif;
          font-size: 2.4rem;
          font-weight: 300;
          color: ${DARK};
          letter-spacing: 0.08em;
          margin-bottom: 8px;
        }

        .profile-header p {
          font-size: 0.8rem;
          color: ${GOLD};
          text-transform: uppercase;
          letter-spacing: 0.2em;
        }

        .form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
        }

        .form-section-title {
          grid-column: span 2;
          font-size: 0.65rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          color: ${GOLD};
          border-bottom: 1px solid #f0eae1;
          padding-bottom: 8px;
          margin-top: 1rem;
          margin-bottom: 0.5rem;
        }

        .form-group {
          display: flex;
          flex-direction: column;
        }

        .form-group.full-width {
          grid-column: span 2;
        }

        .form-label {
          font-size: 0.65rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #888;
          margin-bottom: 6px;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .form-input {
          padding: 12px 16px;
          font-family: 'Jost', sans-serif;
          font-size: 0.88rem;
          border: 1px solid #e5ddd2;
          border-radius: 4px;
          outline: none;
          background: #faf8f5;
          color: ${DARK};
          transition: all 0.25s;
        }

        .form-input:focus {
          border-color: ${GOLD};
          background: white;
          box-shadow: 0 0 0 3px rgba(184,150,90,0.1);
        }

        .submit-btn {
          grid-column: span 2;
          padding: 14px;
          background: ${DARK};
          color: white;
          border: none;
          border-radius: 4px;
          font-family: 'Jost', sans-serif;
          font-size: 0.78rem;
          font-weight: 600;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.25s;
          margin-top: 1.5rem;
        }

        .submit-btn:hover {
          background: ${GOLD};
        }

        .submit-btn:disabled {
          background: #aaa;
          cursor: not-allowed;
        }

        .alert {
          grid-column: span 2;
          padding: 12px 16px;
          border-radius: 4px;
          font-size: 0.82rem;
          text-align: center;
          margin-bottom: 1rem;
        }

        .alert.success {
          background: rgba(22,163,74,0.1);
          color: #16a34a;
          border: 1px solid rgba(22,163,74,0.2);
        }

        .alert.error {
          background: rgba(220,38,38,0.1);
          color: #dc2626;
          border: 1px solid rgba(220,38,38,0.2);
        }

        @media (max-width: 600px) {
          .form-grid { grid-template-columns: 1fr; }
          .form-group, .form-section-title, .submit-btn, .alert { grid-column: span 1; }
          .profile-container { padding: 1.5rem; margin-top: 80px; }
        }
      `}</style>

      <Header />

      <div className="profile-container">
        <div className="profile-header">
          <h1>Profile Settings</h1>
          <p>Manage your account credentials & contact info</p>
        </div>

        <form onSubmit={handleSubmit} className="form-grid">
          {message && <div className="alert success">{message}</div>}
          {error && <div className="alert error">{error}</div>}

          <div className="form-section-title">Personal Details</div>

          <div className="form-group">
            <label className="form-label"><User size={12} color={GOLD} /> Full Name</label>
            <input
              className="form-input"
              type="text"
              required
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label className="form-label"><Shield size={12} color={GOLD} /> Email Address</label>
            <input
              className="form-input"
              type="email"
              required
              value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label className="form-label"><Phone size={12} color={GOLD} /> Phone Number</label>
            <input
              className="form-input"
              type="tel"
              placeholder="+212 600 000 000"
              value={form.phone}
              onChange={e => setForm({ ...form, phone: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label className="form-label"><Globe size={12} color={GOLD} /> Nationality</label>
            <input
              className="form-input"
              type="text"
              placeholder="e.g. Moroccan"
              value={form.nationality}
              onChange={e => setForm({ ...form, nationality: e.target.value })}
            />
          </div>

          <div className="form-group full-width">
            <label className="form-label"><FileText size={12} color={GOLD} /> Passport Number</label>
            <input
              className="form-input"
              type="text"
              placeholder="e.g. AB123456"
              value={form.passport_number}
              onChange={e => setForm({ ...form, passport_number: e.target.value })}
            />
          </div>

          <div className="form-section-title">Change Password (Leave blank to keep current)</div>

          <div className="form-group">
            <label className="form-label"><Lock size={12} color={GOLD} /> New Password</label>
            <input
              className="form-input"
              type="password"
              placeholder="Min. 8 characters"
              value={form.password}
              onChange={e => setForm({ ...form, password: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label className="form-label"><Lock size={12} color={GOLD} /> Confirm New Password</label>
            <input
              className="form-input"
              type="password"
              placeholder="Repeat password"
              value={form.password_confirmation}
              onChange={e => setForm({ ...form, password_confirmation: e.target.value })}
            />
          </div>

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? "Saving changes..." : "Save My Settings"}
          </button>
        </form>
      </div>

      <Footer />
    </>
  );
}
