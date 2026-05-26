import { useState } from "react";
import axios from "axios";

const labelStyle = {
  display: "block",
  fontSize: "0.65rem",
  letterSpacing: "0.12em",
  textTransform: "uppercase",
  color: "#8a7560",
  marginBottom: "6px",
  fontFamily: "Jost, sans-serif",
};

const inputStyle = {
  width: "100%",
  boxSizing: "border-box",
  background: "#faf7f2",
  border: "0.5px solid #d8cfc4",
  padding: "11px 14px",
  fontFamily: "Jost, sans-serif",
  fontSize: "0.82rem",
  color: "#3b2e1e",
  outline: "none",
};

export default function BookingPage() {
  const [form, setForm] = useState({
    check_in: "", check_out: "",
    adults: 2, children: 0,
    full_name: "", email: "",
    phone: "", special_requests: "",
  });
  const [status, setStatus] = useState(null); // null | "loading" | "success" | "error"
  const [errors, setErrors] = useState({});

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    setStatus("loading");
    setErrors({});
    try {
      await axios.post("/api/reservations", form);
      setStatus("success");
    } catch (err) {
      if (err.response?.status === 422) {
        setErrors(err.response.data.errors);
      }
      setStatus("error");
    }
  };

  if (status === "success") return (
    <div style={{ minHeight: "100vh", background: "#faf7f2", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ textAlign: "center", padding: "48px" }}>
        <p style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "2rem", color: "#3b2e1e", fontWeight: 300 }}>Reservation Confirmed</p>
        <p style={{ color: "#8a7560", fontFamily: "Jost, sans-serif" }}>We will contact you at {form.email}</p>
      </div>
    </div>
  );

  return (
    <div style={{ minHeight: "100vh", background: "#faf7f2", display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem" }}>
      <div style={{ background: "#fff", maxWidth: "560px", width: "100%", boxShadow: "0 2px 40px rgba(59,46,30,0.08)" }}>

        {/* BANNER */}
        <div style={{ background: "#3b2e1e", padding: "36px 48px 28px" }}>
          <p style={{ fontFamily: "Jost, sans-serif", fontSize: "0.65rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "#b8975a", margin: "0 0 8px" }}>Alhambra Hotel & Spa</p>
          <h1 style={{ fontFamily: "Cormorant Garamond, serif", fontWeight: 300, fontSize: "2.2rem", color: "#f5ede0", margin: 0, lineHeight: 1.15 }}>Your Reservation</h1>
        </div>

        <div style={{ padding: "40px 48px" }}>

          {/* DATES */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "20px" }}>
            <div>
              <label style={labelStyle}>Check-in</label>
              <input type="date" name="check_in" value={form.check_in} onChange={handleChange} style={inputStyle} />
              {errors.check_in && <p style={{ color: "#c0392b", fontSize: "0.7rem", marginTop: "4px" }}>{errors.check_in[0]}</p>}
            </div>
            <div>
              <label style={labelStyle}>Check-out</label>
              <input type="date" name="check_out" value={form.check_out} onChange={handleChange} style={inputStyle} />
              {errors.check_out && <p style={{ color: "#c0392b", fontSize: "0.7rem", marginTop: "4px" }}>{errors.check_out[0]}</p>}
            </div>
          </div>

          {/* GUESTS */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "20px" }}>
            <div>
              <label style={labelStyle}>Adults</label>
              <select name="adults" value={form.adults} onChange={handleChange} style={inputStyle}>
                {[1,2,3,4].map(n => <option key={n}>{n}</option>)}
              </select>
            </div>
            <div>
              <label style={labelStyle}>Children</label>
              <select name="children" value={form.children} onChange={handleChange} style={inputStyle}>
                {[0,1,2,3].map(n => <option key={n}>{n}</option>)}
              </select>
            </div>
          </div>

          {/* PERSONAL INFO */}
          <div style={{ marginBottom: "20px" }}>
            <label style={labelStyle}>Full Name</label>
            <input type="text" name="full_name" placeholder="Your full name" value={form.full_name} onChange={handleChange} style={inputStyle} />
            {errors.full_name && <p style={{ color: "#c0392b", fontSize: "0.7rem", marginTop: "4px" }}>{errors.full_name[0]}</p>}
          </div>
          <div style={{ marginBottom: "20px" }}>
            <label style={labelStyle}>Email</label>
            <input type="email" name="email" placeholder="your@email.com" value={form.email} onChange={handleChange} style={inputStyle} />
            {errors.email && <p style={{ color: "#c0392b", fontSize: "0.7rem", marginTop: "4px" }}>{errors.email[0]}</p>}
          </div>
          <div style={{ marginBottom: "20px" }}>
            <label style={labelStyle}>Phone</label>
            <input type="tel" name="phone" placeholder="+212 600 000 000" value={form.phone} onChange={handleChange} style={inputStyle} />
          </div>

          {/* SPECIAL REQUESTS */}
          <div style={{ marginBottom: "32px" }}>
            <label style={labelStyle}>Special Requests</label>
            <textarea name="special_requests" placeholder="Any special requests or notes..." rows={3} value={form.special_requests} onChange={handleChange} style={{ ...inputStyle, resize: "none", lineHeight: 1.6 }} />
          </div>

          {/* SUBMIT */}
          <button
            onClick={handleSubmit}
            disabled={status === "loading"}
            style={{ width: "100%", background: status === "loading" ? "#9a7a42" : "#b8975a", color: "#fff", border: "none", padding: "16px", cursor: "pointer", fontFamily: "Jost, sans-serif", fontSize: "0.75rem", letterSpacing: "0.16em", textTransform: "uppercase" }}
          >
            {status === "loading" ? "Sending..." : "Confirm Reservation"}
          </button>

          {status === "error" && (
            <p style={{ marginTop: "12px", fontSize: "0.72rem", color: "#c0392b", textAlign: "center" }}>
              Please check the fields and try again.
            </p>
          )}

          <p style={{ marginTop: "1rem", fontSize: "0.72rem", color: "#aaa", textAlign: "center", lineHeight: 1.6 }}>
            Free cancellation up to 48 hours before arrival
          </p>

        </div>
      </div>
    </div>
  );
}