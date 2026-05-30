import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";

// ─── Styles ────────────────────────────────────────────────────────────────
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

// ─── Available extras/services that can be added to cart ───────────────────
const EXTRAS = [
  { id: "spa", name: "Spa & Hammam Session", description: "Traditional hammam + 60 min massage", price: 450, icon: "✦" },
  { id: "airport", name: "Airport Transfer", description: "Private chauffeur, both ways", price: 350, icon: "◈" },
  { id: "breakfast", name: "Breakfast Upgrade", description: "Full Moroccan breakfast, per stay", price: 180, icon: "❧" },
  { id: "flowers", name: "Floral Arrangement", description: "Fresh roses & orange blossom upon arrival", price: 220, icon: "✿" },
  { id: "wine", name: "Welcome Bottle", description: "Premium Moroccan rosé & sweets", price: 290, icon: "◇" },
  { id: "tour", name: "Medina Private Tour", description: "3-hour guided medina experience", price: 500, icon: "⊕" },
];

// ─── Cart Item Row ──────────────────────────────────────────────────────────
function CartItem({ item, onRemove }) {
  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "10px 0",
      borderBottom: "0.5px solid #ede7de",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <span style={{ fontSize: "1rem", color: "#b8975a" }}>{item.icon}</span>
        <div>
          <p style={{ margin: 0, fontFamily: "Jost, sans-serif", fontSize: "0.78rem", color: "#3b2e1e" }}>{item.name}</p>
          <p style={{ margin: 0, fontFamily: "Jost, sans-serif", fontSize: "0.68rem", color: "#aaa" }}>{item.description}</p>
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
        <span style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "0.95rem", color: "#b8975a" }}>MAD {item.price}</span>
        <button
          onClick={() => onRemove(item.id)}
          style={{
            background: "none", border: "none", cursor: "pointer",
            color: "#c0b4a4", fontSize: "0.9rem", lineHeight: 1, padding: "2px 6px",
          }}
          title="Remove"
        >✕</button>
      </div>
    </div>
  );
}

// ─── Extras Panel ───────────────────────────────────────────────────────────
function ExtrasPanel({ cart, onAdd, onRemove }) {
  const cartIds = cart.map((c) => c.id);
  const [open, setOpen] = useState(false);

  return (
    <div style={{ marginBottom: "24px" }}>
      {/* Toggle header */}
      <button
        onClick={() => setOpen((v) => !v)}
        style={{
          width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between",
          background: "none", border: "0.5px solid #d8cfc4", padding: "12px 14px",
          cursor: "pointer", fontFamily: "Jost, sans-serif", fontSize: "0.65rem",
          letterSpacing: "0.12em", textTransform: "uppercase", color: "#8a7560",
          marginBottom: cart.length > 0 || open ? "12px" : "0",
        }}
      >
        <span>Add Extras & Services</span>
        <span style={{ fontSize: "0.85rem", color: "#b8975a" }}>{open ? "−" : "+"}</span>
      </button>

      {/* Extras list */}
      {open && (
        <div style={{
          border: "0.5px solid #ede7de",
          background: "#fdf9f4",
        }}>
          {EXTRAS.map((extra) => {
            const inCart = cartIds.includes(extra.id);
            return (
              <div
                key={extra.id}
                style={{
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  padding: "13px 16px",
                  borderBottom: "0.5px solid #ede7de",
                  background: inCart ? "#fdf5e6" : "transparent",
                  transition: "background 0.2s",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <span style={{ fontSize: "1.1rem", color: "#b8975a", minWidth: "20px" }}>{extra.icon}</span>
                  <div>
                    <p style={{ margin: 0, fontFamily: "Jost, sans-serif", fontSize: "0.8rem", color: "#3b2e1e" }}>{extra.name}</p>
                    <p style={{ margin: 0, fontFamily: "Jost, sans-serif", fontSize: "0.68rem", color: "#aaa" }}>{extra.description}</p>
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "14px", flexShrink: 0 }}>
                  <span style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "0.95rem", color: "#8a7560" }}>MAD {extra.price}</span>
                  <button
                    onClick={() => inCart ? onRemove(extra.id) : onAdd(extra)}
                    style={{
                      background: inCart ? "transparent" : "#b8975a",
                      border: inCart ? "0.5px solid #d8cfc4" : "none",
                      color: inCart ? "#8a7560" : "#fff",
                      padding: "5px 12px",
                      cursor: "pointer",
                      fontFamily: "Jost, sans-serif",
                      fontSize: "0.65rem",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      transition: "all 0.2s",
                    }}
                  >
                    {inCart ? "Remove" : "Add"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ─── Cart Summary ────────────────────────────────────────────────────────────
function CartSummary({ cart, onRemove, roomPrice, nights }) {
  const extrasTotal = cart.reduce((sum, i) => sum + i.price, 0);
  const roomTotal = roomPrice && nights > 0 ? roomPrice * nights : 0;
  const grandTotal = roomTotal + extrasTotal;

  if (cart.length === 0 && roomTotal === 0) return null;

  return (
    <div style={{
      background: "#faf7f2",
      border: "0.5px solid #d8cfc4",
      padding: "20px",
      marginBottom: "24px",
    }}>
      <p style={{
        margin: "0 0 12px",
        fontFamily: "Jost, sans-serif",
        fontSize: "0.65rem",
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        color: "#8a7560",
      }}>Your Order Summary</p>

      {/* Room line */}
      {roomTotal > 0 && (
        <div style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "0.5px solid #ede7de" }}>
          <span style={{ fontFamily: "Jost, sans-serif", fontSize: "0.78rem", color: "#3b2e1e" }}>
            Accommodation ({nights} night{nights > 1 ? "s" : ""})
          </span>
          <span style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "0.95rem", color: "#b8975a" }}>MAD {roomTotal}</span>
        </div>
      )}

      {/* Cart items */}
      {cart.map((item) => (
        <CartItem key={item.id} item={item} onRemove={onRemove} />
      ))}

      {/* Grand total */}
      {grandTotal > 0 && (
        <div style={{ display: "flex", justifyContent: "space-between", paddingTop: "14px", marginTop: "4px" }}>
          <span style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "1rem", color: "#3b2e1e", fontStyle: "italic" }}>Total</span>
          <span style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "1.2rem", color: "#3b2e1e", fontWeight: 600 }}>MAD {grandTotal}</span>
        </div>
      )}
    </div>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────
export default function BookingPage() {
  const { roomId } = useParams();
  const { user } = useAuth();

  const [roomTypes, setRoomTypes] = useState([]);
  const [cart, setCart] = useState([]); // extras cart
  const [form, setForm] = useState({
    check_in: "", check_out: "",
    adults: 2, children: 0,
    full_name: "", email: "",
    phone: "", special_requests: "",
    room_type_id: "",
  });
  const [status, setStatus] = useState(null);
  const [errors, setErrors] = useState({});

  // Pre-fill user info
  useEffect(() => {
    if (user) {
      setForm(prev => ({
        ...prev,
        full_name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
      }));
    }
  }, [user]);

  // Load room types
  useEffect(() => {
    async function loadRoomTypes() {
      try {
        const res = await axios.get("/api/room-types");
        setRoomTypes(res.data);
        if (roomId) {
          const match = res.data.find(
            (r) => String(r.id) === String(roomId) || r.slug === roomId
          );
          if (match) {
            setForm((prev) => ({ ...prev, room_type_id: match.id }));
          } else if (res.data.length > 0) {
            setForm((prev) => ({ ...prev, room_type_id: res.data[0].id }));
          }
        } else if (res.data.length > 0) {
          setForm((prev) => ({ ...prev, room_type_id: res.data[0].id }));
        }
      } catch (err) {
        console.error("Failed to load room types", err);
      }
    }
    loadRoomTypes();
  }, [roomId]);

  // Derived values
  const selectedRoom = roomTypes.find((r) => String(r.id) === String(form.room_type_id));
  const nights = (() => {
    if (!form.check_in || !form.check_out) return 0;
    const diff = new Date(form.check_out) - new Date(form.check_in);
    const n = Math.round(diff / (1000 * 60 * 60 * 24));
    return n > 0 ? n : 0;
  })();

  // Cart handlers
  const addToCart = (extra) => setCart((prev) => [...prev, extra]);
  const removeFromCart = (id) => setCart((prev) => prev.filter((i) => i.id !== id));

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    setStatus("loading");
    setErrors({});
    try {
      const extrasIds = cart.map((i) => i.id);
      await axios.post("/api/reservations", { ...form, extras: extrasIds });
      setStatus("success");
    } catch (err) {
      if (err.response?.status === 422) {
        setErrors(err.response.data.errors);
      }
      setStatus("error");
    }
  };

  // ── Success screen ──
  if (status === "success") return (
    <div style={{ minHeight: "100vh", background: "#faf7f2", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ textAlign: "center", padding: "48px" }}>
        <p style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "2rem", color: "#3b2e1e", fontWeight: 300 }}>Reservation Confirmed</p>
        <p style={{ color: "#8a7560", fontFamily: "Jost, sans-serif" }}>We will contact you at {form.email}</p>
        {cart.length > 0 && (
          <p style={{ color: "#b8975a", fontFamily: "Jost, sans-serif", fontSize: "0.78rem", marginTop: "8px" }}>
            Your extras ({cart.map(i => i.name).join(", ")}) have been noted.
          </p>
        )}
      </div>
    </div>
  );

  // ── Main form ──
  return (
    <div style={{ minHeight: "100vh", background: "#faf7f2", display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem" }}>
      <div style={{ background: "#fff", maxWidth: "560px", width: "100%", boxShadow: "0 2px 40px rgba(59,46,30,0.08)" }}>

        {/* BANNER */}
        <div style={{ background: "#3b2e1e", padding: "36px 48px 28px" }}>
          <p style={{ fontFamily: "Jost, sans-serif", fontSize: "0.65rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "#b8975a", margin: "0 0 8px" }}>Alhambra Hotel & Spa</p>
          <h1 style={{ fontFamily: "Cormorant Garamond, serif", fontWeight: 300, fontSize: "2.2rem", color: "#f5ede0", margin: 0, lineHeight: 1.15 }}>Your Reservation</h1>
        </div>

        <div style={{ padding: "40px 48px" }}>

          {/* ROOM TYPE SELECTION */}
          <div style={{ marginBottom: "20px" }}>
            <label style={labelStyle}>Selected Accommodation</label>
            <select
              name="room_type_id"
              value={form.room_type_id}
              onChange={handleChange}
              style={inputStyle}
            >
              {roomTypes.map((rt) => (
                <option key={rt.id} value={rt.id}>
                  {rt.name} — MAD {rt.base_price}/night (Capacity: {rt.capacity} guests)
                </option>
              ))}
            </select>
            {errors.room_type_id && <p style={{ color: "#c0392b", fontSize: "0.7rem", marginTop: "4px" }}>{errors.room_type_id[0]}</p>}
          </div>

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
                {[1, 2, 3, 4].map(n => <option key={n}>{n}</option>)}
              </select>
            </div>
            <div>
              <label style={labelStyle}>Children</label>
              <select name="children" value={form.children} onChange={handleChange} style={inputStyle}>
                {[0, 1, 2, 3].map(n => <option key={n}>{n}</option>)}
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
          <div style={{ marginBottom: "28px" }}>
            <label style={labelStyle}>Special Requests</label>
            <textarea
              name="special_requests"
              placeholder="Any special requests or notes..."
              rows={3}
              value={form.special_requests}
              onChange={handleChange}
              style={{ ...inputStyle, resize: "none", lineHeight: 1.6 }}
            />
          </div>

          {/* ── EXTRAS / CART ─────────────────────────────────── */}
          <div style={{ borderTop: "0.5px solid #ede7de", paddingTop: "24px", marginBottom: "8px" }}>
            <ExtrasPanel cart={cart} onAdd={addToCart} onRemove={removeFromCart} />
            <CartSummary
              cart={cart}
              onRemove={removeFromCart}
              roomPrice={selectedRoom?.base_price}
              nights={nights}
            />
          </div>

          {/* SUBMIT */}
          <button
            onClick={handleSubmit}
            disabled={status === "loading"}
            style={{
              width: "100%",
              background: status === "loading" ? "#9a7a42" : "#b8975a",
              color: "#fff",
              border: "none",
              padding: "16px",
              cursor: "pointer",
              fontFamily: "Jost, sans-serif",
              fontSize: "0.75rem",
              letterSpacing: "0.16em",
              textTransform: "uppercase",
            }}
          >
            {status === "loading" ? "Sending..." : `Confirm Reservation${cart.length > 0 ? ` · ${cart.length} extra${cart.length > 1 ? "s" : ""}` : ""}`}
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