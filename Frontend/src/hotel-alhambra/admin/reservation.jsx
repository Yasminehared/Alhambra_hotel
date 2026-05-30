import React, { useState, useEffect } from "react";
import axios from "axios";

const GOLD = "#b8965a";
const DARK = "#1a1208";

const STATUS_META = {
  "confirmed":   { label: "Confirmed",   color: "#2563eb", bg: "rgba(37,99,235,0.1)"  },
  "pending":     { label: "Pending",     color: "#d97706", bg: "rgba(217,119,6,0.1)"  },
  "checked-in":  { label: "Checked In",  color: "#16a34a", bg: "rgba(22,163,74,0.1)"  },
  "checked-out": { label: "Checked Out", color: "#6b7280", bg: "rgba(107,114,128,0.1)" },
  "cancelled":   { label: "Cancelled",   color: "#dc2626", bg: "rgba(220,38,38,0.1)"  },
  "no_show":     { label: "No Show",     color: "#6b7280", bg: "rgba(107,114,128,0.1)" },
};

const PAYMENT_META = {
  paid:    { label: "Paid",    color: "#16a34a" },
  partial: { label: "Partial", color: "#d97706" },
  unpaid:  { label: "Unpaid",  color: "#dc2626" },
};

export default function ReservationsPage() {
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [sourceFilter, setSourceFilter] = useState("all");
  const [selectedRes, setSelectedRes] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [reservationsList, setReservationsList] = useState([]);

  const fetchReservations = async () => {
    try {
      const res = await axios.get("/api/reservations");
      setReservationsList(res.data);
    } catch (err) {
      console.error("Error fetching reservations", err);
    }
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  const handleCheckIn = async (res) => {
    try {
      const id = res.db_id || res.id;
      await axios.put(`/api/reservations/${id}/check-in`);
      fetchReservations();
      if (selectedRes) closeModal();
    } catch (err) {
      alert("Error checking in: " + (err.response?.data?.message || err.message));
    }
  };

  const handleCheckOut = async (res) => {
    try {
      const id = res.db_id || res.id;
      await axios.put(`/api/reservations/${id}/check-out`);
      fetchReservations();
      if (selectedRes) closeModal();
    } catch (err) {
      alert("Error checking out: " + (err.response?.data?.message || err.message));
    }
  };

  const handleCancel = async (res) => {
    if (!window.confirm("Are you sure you want to cancel this reservation?")) return;
    try {
      const id = res.db_id || res.id;
      await axios.put(`/api/reservations/${id}/cancel`);
      fetchReservations();
      if (selectedRes) closeModal();
    } catch (err) {
      alert("Error cancelling: " + (err.response?.data?.message || err.message));
    }
  };

  const handleConfirm = async (res) => {
    try {
      const id = res.db_id || res.id;
      await axios.put(`/api/reservations/${id}/confirm`);
      fetchReservations();
      if (selectedRes) closeModal();
    } catch (err) {
      alert("Error confirming: " + (err.response?.data?.message || err.message));
    }
  };

  const openModal = (res) => { 
    setSelectedRes(res); 
    setTimeout(() => setModalVisible(true), 10); 
  };
  
  const closeModal = () => { 
    setModalVisible(false); 
    setTimeout(() => setSelectedRes(null), 300); 
  };

  const counts = {
    all: reservationsList.length,
    confirmed: reservationsList.filter(r => r.status === "confirmed").length,
    pending: reservationsList.filter(r => r.status === "pending").length,
    "checked-in": reservationsList.filter(r => r.status === "checked-in").length,
    "checked-out": reservationsList.filter(r => r.status === "checked-out").length,
    "cancelled": reservationsList.filter(r => r.status === "cancelled").length,
  };

  const filtered = reservationsList.filter(r => {
    const matchFilter = filter === "all" || r.status === filter;
    const matchSource = sourceFilter === "all" || r.source === sourceFilter;
    const matchSearch = search === "" ||
      (r.guest && r.guest.toLowerCase().includes(search.toLowerCase())) ||
      (String(r.id).toLowerCase().includes(search.toLowerCase())) ||
      (r.roomName && r.roomName.toLowerCase().includes(search.toLowerCase()));
    return matchFilter && matchSource && matchSearch;
  });

  const totalRevenue = reservationsList.filter(r => r.payment === "paid").reduce((a, r) => a + (r.total || 0), 0);
  const pendingRevenue = reservationsList.filter(r => r.payment !== "paid").reduce((a, r) => a + ((r.total || 0) - (r.amount_paid || 0)), 0);

  return (
    <React.Fragment>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,400&family=Jost:wght@300;400;500;600&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        .res-page { font-family: 'Jost', sans-serif; background: #f4efe6; color: ${DARK}; min-height: 100vh; }
        .topbar { background: white; border-bottom: 1px solid rgba(184,150,90,0.15); padding: 0 2rem; height: 64px; display: flex; align-items: center; justify-content: space-between; position: sticky; top: 0; z-index: 90; }
        .topbar-left h1 { font-family: 'Cormorant Garamond', serif; font-size: 1.35rem; font-weight: 400; letter-spacing: 0.06em; }
        .topbar-left p { font-size: 0.72rem; color: #aaa; margin-top: 1px; }
        .topbar-right { display: flex; align-items: center; gap: 1rem; }
        .search-wrap { position: relative; }
        .search-input { padding: 9px 16px 9px 38px; font-family: 'Jost', sans-serif; font-size: 0.82rem; border: 1px solid #e5ddd2; border-radius: 4px; background: #faf6f0; outline: none; width: 220px; transition: border-color 0.2s; color: ${DARK}; }
        .search-input:focus { border-color: ${GOLD}; }
        .search-icon { position: absolute; left: 12px; top: 50%; transform: translateY(-50%); color: #bbb; }
        .topbar-icon-btn { width: 38px; height: 38px; border-radius: 50%; border: 1px solid #e5ddd2; background: white; display: flex; align-items: center; justify-content: center; cursor: pointer; color: #888; position: relative; }
        .notif-dot { position: absolute; top: 6px; right: 6px; width: 8px; height: 8px; border-radius: 50%; background: #ef4444; border: 2px solid white; }
        .admin-chip { display: flex; align-items: center; gap: 8px; padding: 6px 14px; border-radius: 4px; background: rgba(184,150,90,0.08); border: 1px solid rgba(184,150,90,0.2); }
        .admin-chip-dot { width: 7px; height: 7px; border-radius: 50%; background: ${GOLD}; }
        .admin-chip-text { font-size: 0.75rem; font-weight: 600; color: ${DARK}; }
        .new-res-btn { background: ${DARK}; color: white; border: none; padding: 9px 16px; border-radius: 4px; font-family: 'Jost', sans-serif; font-size: 0.75rem; font-weight: 600; display: flex; align-items: center; gap: 8px; cursor: pointer; }
        .kpi-strip { display: grid; grid-template-columns: repeat(5, 1fr); gap: 1rem; padding: 1.5rem 2rem; }
        .kpi-card { background: white; border-radius: 8px; padding: 1.2rem 1.4rem; border: 1px solid rgba(184,150,90,0.12); }
        .kpi-icon { width: 36px; height: 36px; border-radius: 8px; display: flex; align-items: center; justify-content: center; margin-bottom: 0.9rem; font-size: 1rem; }
        .kpi-val { font-family: 'Cormorant Garamond', serif; font-size: 1.9rem; font-weight: 400; line-height: 1; margin-bottom: 4px; }
        .kpi-label { font-size: 0.68rem; color: #aaa; letter-spacing: 0.1em; text-transform: uppercase; }
        .filter-bar { padding: 0 2rem 1.2rem; display: flex; align-items: center; gap: 0.7rem; flex-wrap: wrap; }
        .filter-btn { padding: 8px 18px; border-radius: 4px; border: 1px solid rgba(184,150,90,0.25); background: white; font-family: 'Jost', sans-serif; font-size: 0.75rem; cursor: pointer; color: #7a6a58; display: flex; align-items: center; gap: 7px; }
        .filter-btn.active { background: ${DARK}; color: white; border-color: ${DARK}; }
        .filter-btn .dot { width: 7px; height: 7px; border-radius: 50%; }
        .filter-count { background: rgba(255,255,255,0.2); padding: 1px 7px; border-radius: 10px; font-size: 0.65rem; font-weight: 600; }
        .filter-btn:not(.active) .filter-count { background: rgba(184,150,90,0.12); color: ${GOLD}; }
        .source-select { padding: 8px 14px; border-radius: 4px; border: 1px solid rgba(184,150,90,0.25); background: white; font-family: 'Jost', sans-serif; font-size: 0.75rem; color: #7a6a58; outline: none; }
        .res-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(340px, 1fr)); gap: 1.5rem; padding: 0 2rem 3rem; }
        .res-card { background: white; border-radius: 10px; overflow: hidden; border: 1px solid rgba(184,150,90,0.12); box-shadow: 0 2px 12px rgba(26,18,8,0.04); cursor: pointer; transition: transform 0.2s; }
        .res-card:hover { transform: translateY(-4px); }
        .res-img-wrap { position: relative; height: 160px; }
        .res-img-wrap img { width: 100%; height: 100%; object-fit: cover; }
        .res-id-badge { position: absolute; top: 12px; left: 12px; background: rgba(26,18,8,0.7); color: white; font-size: 0.65rem; font-weight: 600; padding: 4px 10px; border-radius: 4px; }
        .res-status-badge { position: absolute; top: 12px; right: 12px; font-size: 0.62rem; font-weight: 700; text-transform: uppercase; padding: 4px 10px; border-radius: 4px; }
        .vip-badge { position: absolute; bottom: 12px; left: 12px; background: rgba(184,150,90,0.9); color: white; font-size: 0.6rem; font-weight: 700; padding: 3px 10px; border-radius: 3px; }
        .source-pill { position: absolute; bottom: 12px; right: 12px; font-size: 0.62rem; font-weight: 600; padding: 3px 10px; border-radius: 3px; background: white; }
        .res-body { padding: 1.2rem; }
        .res-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px; }
        .guest-initials { width: 36px; height: 36px; border-radius: 50%; background: rgba(184,150,90,0.1); display: flex; align-items: center; justify-content: center; font-size: 0.8rem; color: ${GOLD}; font-weight: 600; }
        .res-guest-name { font-size: 0.9rem; font-weight: 600; }
        .res-guest-nationality { font-size: 0.65rem; color: #aaa; }
        .payment-pill { font-size: 0.6rem; font-weight: 700; text-transform: uppercase; padding: 3px 8px; border-radius: 3px; }
        .res-room-row { display: flex; align-items: center; gap: 8px; padding: 8px 10px; background: #faf6f0; border-radius: 4px; margin-bottom: 10px; }
        .res-room-name { font-size: 0.78rem; font-weight: 500; }
        .res-room-num { font-size: 0.65rem; color: #aaa; }
        .dates-row { display: grid; grid-template-columns: 1fr auto 1fr; gap: 10px; align-items: center; margin-bottom: 12px; }
        .date-block { text-align: center; }
        .date-label { font-size: 0.55rem; text-transform: uppercase; color: #aaa; margin-bottom: 2px; }
        .date-val { font-size: 0.8rem; font-weight: 600; }
        .nights-circle { width: 30px; height: 30px; border-radius: 50%; border: 1px solid #e5ddd2; display: flex; align-items: center; justify-content: center; font-size: 0.65rem; color: #aaa; }
        .res-total { display: flex; align-items: center; justify-content: space-between; padding: 8px 0; border-top: 1px solid #f0eae1; margin-top: 8px; }
        .res-total-label { font-size: 0.7rem; color: #aaa; }
        .res-total-val { font-weight: 600; color: ${GOLD}; }
        .res-actions { display: flex; gap: 8px; margin-top: 12px; }
        .action-btn { flex: 1; padding: 8px; border-radius: 4px; border: none; font-family: 'Jost', sans-serif; font-size: 0.65rem; font-weight: 600; text-transform: uppercase; cursor: pointer; }
        .action-btn.primary { background: ${DARK}; color: white; }
        .action-btn.secondary { background: white; color: #7a6a58; border: 1px solid #e5ddd2; }
        .action-btn.gold { background: ${GOLD}; color: white; }
        .action-btn.danger { background: #fee2e2; color: #dc2626; }
        .modal-backdrop { position: fixed; inset: 0; z-index: 500; background: rgba(26,18,8,0.65); display: flex; align-items: center; justify-content: center; padding: 1.5rem; opacity: 0; pointer-events: none; transition: opacity 0.3s; }
        .modal-backdrop.visible { opacity: 1; pointer-events: all; }
        .modal { background: white; border-radius: 12px; max-width: 760px; width: 100%; max-height: 92vh; overflow-y: auto; transform: translateY(20px); transition: transform 0.3s; }
        .modal-backdrop.visible .modal { transform: translateY(0); }
        .modal-hero { position: relative; height: 220px; }
        .modal-hero img { width: 100%; height: 100%; object-fit: cover; }
        .modal-hero-overlay { position: absolute; inset: 0; background: linear-gradient(to top, rgba(26,18,8,0.78), transparent); display: flex; align-items: flex-end; justify-content: space-between; padding: 1.5rem; }
        .modal-close { position: absolute; top: 1rem; right: 1rem; background: rgba(26,18,8,0.5); color: white; border: none; width: 34px; height: 34px; border-radius: 50%; cursor: pointer; display: flex; align-items: center; justify-content: center; }
        .modal-body { padding: 2rem; }
        .modal-grid { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 1.5rem; margin-bottom: 1.5rem; }
        .modal-info-label { font-size: 0.58rem; letter-spacing: 0.18em; text-transform: uppercase; color: ${GOLD}; margin-bottom: 4px; }
        .modal-info-val { font-size: 0.9rem; color: ${DARK}; font-weight: 500; }
        .modal-actions { display: flex; gap: 10px; margin-top: 1.5rem; }
        .modal-action-btn { flex: 1; padding: 12px; border-radius: 5px; border: none; font-family: 'Jost', sans-serif; font-size: 0.75rem; font-weight: 600; text-transform: uppercase; cursor: pointer; }
      `}</style>

      <div className="res-page">
        <div className="main-content">
          <div className="topbar">
            <div className="topbar-left">
              <h1>Reservations Dashboard</h1>
              <p>{new Date().toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })} · Tanger</p>
            </div>
            <div className="topbar-right">
              <div className="search-wrap">
                <svg className="search-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
                <input className="search-input" placeholder="Search guest, room, ID…" value={search} onChange={e => setSearch(e.target.value)} />
              </div>
              <button className="topbar-icon-btn">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
                <span className="notif-dot" />
              </button>
              <div className="admin-chip"><div className="admin-chip-dot" /><span className="admin-chip-text">ADMIN</span></div>
              <button className="new-res-btn">New Reservation</button>
            </div>
          </div>

          <div className="kpi-strip">
            <div className="kpi-card">
              <div className="kpi-icon" style={{ background: "rgba(184,150,90,0.1)" }}>📋</div>
              <div className="kpi-val">{reservationsList.length}</div>
              <div className="kpi-label">Total Reservations</div>
            </div>
            <div className="kpi-card">
              <div className="kpi-icon" style={{ background: "rgba(22,163,74,0.08)" }}>✓</div>
              <div className="kpi-val" style={{ color: "#16a34a" }}>{counts["checked-in"]}</div>
              <div className="kpi-label">Checked In</div>
            </div>
            <div className="kpi-card">
              <div className="kpi-icon" style={{ background: "rgba(217,119,6,0.08)" }}>⏳</div>
              <div className="kpi-val" style={{ color: "#d97706" }}>{counts.pending}</div>
              <div className="kpi-label">Pending</div>
            </div>
            <div className="kpi-card">
              <div className="kpi-icon" style={{ background: "rgba(184,150,90,0.1)" }}>💰</div>
              <div className="kpi-val" style={{ fontSize: "1.4rem" }}>MAD {(totalRevenue / 1000).toFixed(0)}k</div>
              <div className="kpi-label">Revenue</div>
            </div>
            <div className="kpi-card">
              <div className="kpi-icon" style={{ background: "rgba(220,38,38,0.06)" }}>⚠️</div>
              <div className="kpi-val" style={{ fontSize: "1.4rem", color: "#dc2626" }}>MAD {(pendingRevenue / 1000).toFixed(0)}k</div>
              <div className="kpi-label">Pending</div>
            </div>
          </div>

          <div className="filter-bar">
            {[
              { key: "all",          label: "All",         dot: GOLD        },
              { key: "confirmed",    label: "Confirmed",   dot: "#2563eb"   },
              { key: "pending",      label: "Pending",     dot: "#d97706"   },
              { key: "checked-in",   label: "Checked In",  dot: "#16a34a"   },
              { key: "checked-out",  label: "Checked Out", dot: "#6b7280"   },
              { key: "cancelled",    label: "Cancelled",   dot: "#dc2626"   },
            ].map(f => (
              <button key={f.key} className={`filter-btn ${filter === f.key ? "active" : ""}`} onClick={() => setFilter(f.key)}>
                <span className="dot" style={{ background: filter === f.key ? "white" : f.dot }} />
                {f.label}
                <span className="filter-count">{counts[f.key]}</span>
              </button>
            ))}
            <select className="source-select" value={sourceFilter} onChange={e => setSourceFilter(e.target.value)}>
              <option value="all">All Sources</option>
              {["Direct","Booking.com","Expedia","Airbnb"].map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>

          <div className="res-grid">
            {filtered.map((res) => {
              const sm = STATUS_META[res.status] || STATUS_META.pending;
              const pm = PAYMENT_META[res.payment] || { label: "Unpaid", color: "#dc2626" };
              const initials = res.guest ? res.guest.split(" ").map(n => n[0]).join("") : "G";
              return (
                <div className="res-card" key={res.id} onClick={() => openModal(res)}>
                  <div className="res-img-wrap">
                    <img src={res.img} alt={res.roomName} />
                    <span className="res-id-badge">{res.id}</span>
                    <span className="res-status-badge" style={{ background: sm.bg, color: sm.color }}>{sm.label}</span>
                    {res.vip && <span className="vip-badge">⭐ VIP</span>}
                  </div>
                  <div className="res-body">
                    <div className="res-header">
                      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <div className="guest-initials">{initials}</div>
                        <div>
                          <p className="res-guest-name">{res.guest}</p>
                          <p className="res-guest-nationality">{res.nationality}</p>
                        </div>
                      </div>
                      <span className="payment-pill" style={{ background: `${pm.color}18`, color: pm.color }}>{pm.label}</span>
                    </div>
                    <div className="res-room-row">
                      <div>
                        <p className="res-room-name">{res.roomName}</p>
                        <p className="res-room-num">Room #{res.room}</p>
                      </div>
                      <div style={{ marginLeft: "auto", textAlign: "right" }}>
                        <p style={{ fontSize: "0.8rem", fontWeight: 600, color: GOLD }}>MAD {res.price?.toLocaleString()}</p>
                      </div>
                    </div>
                    <div className="dates-row">
                      <div className="date-block">
                        <p className="date-label">In</p>
                        <p className="date-val">{res.checkin}</p>
                      </div>
                      <div className="nights-circle">{res.nights}n</div>
                      <div className="date-block">
                        <p className="date-label">Out</p>
                        <p className="date-val">{res.checkout}</p>
                      </div>
                    </div>
                    <div className="res-total">
                      <span className="res-total-label">Total</span>
                      <span className="res-total-val">MAD {res.total?.toLocaleString()}</span>
                    </div>
                    <div className="res-actions" onClick={e => e.stopPropagation()}>
                      {res.status === "confirmed" && <button className="action-btn primary" onClick={() => handleCheckIn(res)}>Check In</button>}
                      {res.status === "pending" && <button className="action-btn gold" onClick={() => handleConfirm(res)}>Confirm</button>}
                      {res.status === "checked-in" && <button className="action-btn primary" onClick={() => handleCheckOut(res)}>Check Out</button>}
                      {res.status !== "cancelled" && res.status !== "checked-out" && <button className="action-btn danger" onClick={() => handleCancel(res)}>Cancel</button>}
                      <button className="action-btn secondary" onClick={() => openModal(res)}>Details</button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── DETAIL MODAL ── */}
        {selectedRes && (
          <div className={`modal-backdrop ${modalVisible ? "visible" : ""}`} onClick={closeModal}>
            <div className="modal" onClick={e => e.stopPropagation()}>
              <div className="modal-hero">
                <img src={selectedRes.img} alt={selectedRes.roomName} />
                <button className="modal-close" onClick={closeModal}>✕</button>
                <div className="modal-hero-overlay">
                  <div>
                    <p style={{ fontSize: "0.6rem", color: GOLD }}>{selectedRes.id}</p>
                    <p style={{ fontFamily: "serif", fontSize: "1.5rem", color: "white" }}>{selectedRes.guest}</p>
                  </div>
                  <span style={{ background: (STATUS_META[selectedRes.status] || STATUS_META.pending).bg, color: (STATUS_META[selectedRes.status] || STATUS_META.pending).color, padding: "5px 12px", borderRadius: "4px", fontSize: "0.7rem" }}>{(STATUS_META[selectedRes.status] || STATUS_META.pending).label}</span>
                </div>
              </div>
              <div className="modal-body">
                <div className="modal-grid">
                  <div><p className="modal-info-label">Guest</p><p className="modal-info-val">{selectedRes.guest}</p></div>
                  <div><p className="modal-info-label">Email</p><p className="modal-info-val">{selectedRes.email}</p></div>
                  <div><p className="modal-info-label">Phone</p><p className="modal-info-val">{selectedRes.phone}</p></div>
                  <div><p className="modal-info-label">Room</p><p className="modal-info-val">{selectedRes.roomName}</p></div>
                  <div><p className="modal-info-label">Dates</p><p className="modal-info-val">{selectedRes.checkin} - {selectedRes.checkout}</p></div>
                  <div><p className="modal-info-label">Total</p><p className="modal-info-val">MAD {selectedRes.total?.toLocaleString()}</p></div>
                </div>
                <div className="modal-actions">
                  <button className="modal-action-btn" style={{ background: DARK, color: "white" }} onClick={closeModal}>Close</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </React.Fragment>
  );
}
