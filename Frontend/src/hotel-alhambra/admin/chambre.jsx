import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const GOLD = "#b8965a";
const DARK = "#1a1208";

const STATUS_META = {
  occupied:    { label: "Occupied",    color: "#2563eb", bg: "rgba(37,99,235,0.1)",   dot: "#2563eb" },
  available:   { label: "Available",   color: "#16a34a", bg: "rgba(22,163,74,0.1)",   dot: "#16a34a" },
  cleaning:    { label: "Cleaning",    color: "#d97706", bg: "rgba(217,119,6,0.1)",   dot: "#d97706" },
  maintenance: { label: "Maintenance", color: "#d97706", bg: "rgba(217,119,6,0.1)",   dot: "#d97706" },
};

const HK_META = {
  clean:       { label: "Clean",       color: "#16a34a" },
  dirty:       { label: "Needs Clean", color: "#d97706" },
};

export default function Chambres() {
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [floorFilter, setFloorFilter] = useState("all");
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const [roomsList, setRoomsList] = useState([]);

  const fetchRooms = async () => {
    try {
      const res = await axios.get("/api/rooms");
      setRoomsList(res.data);
    } catch (err) {
      console.error("Error fetching rooms", err);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  const handleCheckout = async (room) => {
    try {
      // Find the active reservation for this room
      const reservationsRes = await axios.get("/api/reservations");
      const activeRes = reservationsRes.data.find(res => {
        return (res.room === room.id && res.status === "checked-in");
      });

      if (!activeRes) {
        alert("No active checked-in reservation found for this room.");
        return;
      }

      const resId = activeRes.db_id || activeRes.id;
      await axios.put(`/api/reservations/${resId}/check-out`);
      fetchRooms();
      if (selectedRoom) closeModal();
    } catch (err) {
      alert("Error checking out: " + (err.response?.data?.message || err.message));
    }
  };

  const handleUpdateRoom = async (room, payload) => {
    try {
      const dbId = room.db_id;
      await axios.put(`/api/rooms/${dbId}`, payload);
      fetchRooms();
      if (selectedRoom) closeModal();
    } catch (err) {
      alert("Error updating room: " + (err.response?.data?.message || err.message));
    }
  };

  const openModal = (room) => { 
    setSelectedRoom(room); 
    setTimeout(() => setModalVisible(true), 10); 
  };
  
  const closeModal = () => { 
    setModalVisible(false); 
    setTimeout(() => setSelectedRoom(null), 300); 
  };

  const counts = {
    all: roomsList.length,
    occupied: roomsList.filter(r => r.status === "occupied").length,
    available: roomsList.filter(r => r.status === "available").length,
    cleaning: roomsList.filter(r => r.status === "cleaning" || r.status === "maintenance").length,
  };

  const floors = [...new Set(roomsList.map(r => r.floor))].sort();

  const filtered = roomsList.filter(r => {
    const matchFilter = filter === "all" || r.status === filter || (filter === "cleaning" && r.status === "maintenance");
    const matchFloor = floorFilter === "all" || r.floor === parseInt(floorFilter);
    const matchSearch = search === "" ||
      (r.name && r.name.toLowerCase().includes(search.toLowerCase())) ||
      String(r.id).includes(search) ||
      (r.guest && r.guest.toLowerCase().includes(search.toLowerCase()));
    return matchFilter && matchFloor && matchSearch;
  });

  const revenue = roomsList.filter(r => r.status === "occupied").reduce((a, r) => a + (r.price || 0), 0);

  return (
    <React.Fragment>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,400&family=Jost:wght@300;400;500;600&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        .rooms-page { font-family: 'Jost', sans-serif; background: #f4efe6; color: ${DARK}; min-height: 100vh; }

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
        .floor-select { padding: 8px 14px; border-radius: 4px; border: 1px solid rgba(184,150,90,0.25); background: white; font-family: 'Jost', sans-serif; font-size: 0.75rem; color: #7a6a58; outline: none; }

        .rooms-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 1.2rem; padding: 0 2rem 3rem; }
        .room-card { background: white; border-radius: 10px; overflow: hidden; border: 1px solid rgba(184,150,90,0.12); box-shadow: 0 2px 12px rgba(26,18,8,0.04); cursor: pointer; }
        .room-img-wrap { position: relative; height: 180px; overflow: hidden; }
        .room-img-wrap img { width: 100%; height: 100%; object-fit: cover; }
        .room-num-badge { position: absolute; top: 12px; left: 12px; background: rgba(26,18,8,0.7); color: white; font-size: 0.7rem; font-weight: 600; padding: 4px 10px; border-radius: 4px; }
        .status-badge { position: absolute; top: 12px; right: 12px; font-size: 0.62rem; font-weight: 700; text-transform: uppercase; padding: 4px 10px; border-radius: 4px; }
        .hk-badge { position: absolute; bottom: 12px; left: 12px; font-size: 0.58rem; font-weight: 600; text-transform: uppercase; padding: 3px 9px; border-radius: 3px; background: rgba(26,18,8,0.55); color: white; }
        .price-badge { position: absolute; bottom: 12px; right: 12px; background: rgba(184,150,90,0.9); color: white; font-size: 0.68rem; font-weight: 700; padding: 4px 10px; border-radius: 4px; }

        .room-body { padding: 1.2rem; }
        .room-type-tag { font-size: 0.58rem; letter-spacing: 0.2em; text-transform: uppercase; color: ${GOLD}; margin-bottom: 3px; }
        .room-name { font-family: 'Cormorant Garamond', serif; font-size: 1.2rem; font-weight: 400; margin-bottom: 6px; }
        .room-features { display: flex; flex-wrap: wrap; gap: 5px; margin-bottom: 10px; }
        .feature-chip { font-size: 0.65rem; color: #7a6a58; background: #f8f3ec; padding: 3px 9px; border-radius: 3px; border: 1px solid rgba(184,150,90,0.15); }
        .guest-row { display: flex; align-items: center; gap: 9px; padding: 8px 10px; background: rgba(37,99,235,0.04); border-radius: 4px; margin-bottom: 12px; border: 1px solid rgba(37,99,235,0.1); }
        .guest-avatar { width: 28px; height: 28px; border-radius: 50%; background: rgba(37,99,235,0.1); display: flex; align-items: center; justify-content: center; font-size: 0.65rem; font-weight: 600; color: #2563eb; }
        .guest-name { font-size: 0.78rem; font-weight: 500; }
        .guest-dates { font-size: 0.65rem; color: #aaa; }
        .room-actions { display: flex; gap: 8px; }
        .action-btn { flex: 1; padding: 9px 12px; border-radius: 4px; border: none; font-family: 'Jost', sans-serif; font-size: 0.7rem; font-weight: 600; text-transform: uppercase; cursor: pointer; }
        .action-btn.primary { background: ${DARK}; color: white; }
        .action-btn.secondary { background: white; color: #7a6a58; border: 1px solid rgba(184,150,90,0.25); }
        .action-btn.gold { background: ${GOLD}; color: white; }

        .modal-backdrop { position: fixed; inset: 0; z-index: 500; background: rgba(26,18,8,0.65); display: flex; align-items: center; justify-content: center; padding: 1.5rem; opacity: 0; pointer-events: none; transition: opacity 0.3s; }
        .modal-backdrop.visible { opacity: 1; pointer-events: all; }
        .modal { background: white; border-radius: 12px; max-width: 720px; width: 100%; max-height: 90vh; overflow-y: auto; transform: translateY(20px); transition: transform 0.3s; }
        .modal-backdrop.visible .modal { transform: translateY(0); }
        .modal-hero { position: relative; height: 240px; }
        .modal-hero img { width: 100%; height: 100%; object-fit: cover; }
        .modal-hero-overlay { position: absolute; inset: 0; background: linear-gradient(to top, rgba(26,18,8,0.75), transparent); display: flex; align-items: flex-end; padding: 1.5rem; }
        .modal-close { position: absolute; top: 1rem; right: 1rem; background: rgba(26,18,8,0.5); color: white; border: none; width: 34px; height: 34px; border-radius: 50%; cursor: pointer; display: flex; align-items: center; justify-content: center; }
        .modal-body { padding: 2rem; }
        .modal-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; margin-bottom: 1.5rem; }
        .modal-info-label { font-size: 0.58rem; letter-spacing: 0.18em; text-transform: uppercase; color: ${GOLD}; margin-bottom: 4px; }
        .modal-info-val { font-size: 0.9rem; color: ${DARK}; font-weight: 500; }
        .modal-actions { display: flex; gap: 10px; margin-top: 1.5rem; }
        .modal-action-btn { flex: 1; padding: 12px; border-radius: 5px; border: none; font-family: 'Jost', sans-serif; font-size: 0.75rem; font-weight: 600; text-transform: uppercase; cursor: pointer; }
      `}</style>

      <div className="rooms-page">
        <div className="main-content">
          <div className="topbar">
            <div className="topbar-left">
              <h1>Chambres Dashboard</h1>
              <p>{new Date().toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })} · Tanger</p>
            </div>
            <div className="topbar-right">
              <div className="search-wrap">
                <svg className="search-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
                <input className="search-input" placeholder="Search room, guest…" value={search} onChange={e => setSearch(e.target.value)} />
              </div>
              <button className="topbar-icon-btn">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
                <span className="notif-dot" />
              </button>
              <div className="admin-chip">
                <div className="admin-chip-dot" />
                <span className="admin-chip-text">ADMIN</span>
              </div>
            </div>
          </div>

          <div className="kpi-strip">
            <div className="kpi-card">
              <div className="kpi-icon" style={{ background: "rgba(184,150,90,0.1)" }}>🏨</div>
              <div className="kpi-val">{roomsList.length}</div>
              <div className="kpi-label">Total Rooms</div>
            </div>
            <div className="kpi-card">
              <div className="kpi-icon" style={{ background: "rgba(37,99,235,0.08)" }}>🛌</div>
              <div className="kpi-val" style={{ color: "#2563eb" }}>{counts.occupied}</div>
              <div className="kpi-label">Occupied</div>
            </div>
            <div className="kpi-card">
              <div className="kpi-icon" style={{ background: "rgba(22,163,74,0.08)" }}>✓</div>
              <div className="kpi-val" style={{ color: "#16a34a" }}>{counts.available}</div>
              <div className="kpi-label">Available</div>
            </div>
            <div className="kpi-card">
              <div className="kpi-icon" style={{ background: "rgba(217,119,6,0.08)" }}>🧹</div>
              <div className="kpi-val" style={{ color: "#d97706" }}>{counts.cleaning}</div>
              <div className="kpi-label">Not Ready</div>
            </div>
            <div className="kpi-card">
              <div className="kpi-icon" style={{ background: "rgba(184,150,90,0.1)" }}>💰</div>
              <div className="kpi-val" style={{ fontSize: "1.4rem" }}>MAD {(revenue / 1000).toFixed(0)}k</div>
              <div className="kpi-label">Revenue</div>
            </div>
          </div>

          <div className="filter-bar">
            {[
              { key: "all", label: "All Rooms", dot: GOLD },
              { key: "occupied", label: "Occupied", dot: "#2563eb" },
              { key: "available", label: "Available", dot: "#16a34a" },
              { key: "cleaning", label: "Cleaning", dot: "#d97706" },
            ].map(f => (
              <button key={f.key} className={`filter-btn ${filter === f.key ? "active" : ""}`} onClick={() => setFilter(f.key)}>
                <span className="dot" style={{ background: filter === f.key ? "white" : f.dot }} />
                {f.label}
                <span className="filter-count">{counts[f.key]}</span>
              </button>
            ))}
            <select className="floor-select" value={floorFilter} onChange={e => setFloorFilter(e.target.value)}>
              <option value="all">All Floors</option>
              {floors.map(f => <option key={f} value={f}>Floor {f}</option>)}
            </select>
          </div>

          <div className="rooms-grid">
            {filtered.map(room => {
              const sm = STATUS_META[room.status] || STATUS_META.available;
              const hk = HK_META[room.housekeeping] || HK_META.dirty;
              return (
                <div className="room-card" key={room.id} onClick={() => openModal(room)}>
                  <div className="room-img-wrap">
                    <img src={room.img} alt={room.name} />
                    <span className="room-num-badge">#{room.id}</span>
                    <span className="status-badge" style={{ background: sm.bg, color: sm.color }}>{sm.label}</span>
                    <span className="hk-badge">{hk.label}</span>
                    <span className="price-badge">MAD {room.price?.toLocaleString()}/n</span>
                  </div>
                  <div className="room-body">
                    <p className="room-type-tag">Floor {room.floor} · {room.type}</p>
                    <h3 className="room-name">{room.name}</h3>
                    <div className="room-features">
                      {Array.isArray(room.features) && room.features.map((f, i) => <span className="feature-chip" key={i}>{f}</span>)}
                    </div>
                    {room.guest && (
                      <div className="guest-row">
                        <div className="guest-avatar">{room.guest[0]}</div>
                        <div>
                          <p className="guest-name">{room.guest}</p>
                          <p className="guest-dates">{room.checkin} · {room.nights}n</p>
                        </div>
                      </div>
                    )}
                    <div className="room-actions" onClick={e => e.stopPropagation()}>
                      {room.status === "occupied" && <button className="action-btn primary" onClick={() => handleCheckout(room)}>Checkout</button>}
                      {room.status === "available" && <Link to={`/booking/${room.id}`} className="action-btn gold" style={{ textDecoration: "none", textAlign: "center" }}>Réserver</Link>}
                      {(room.status === "cleaning" || room.status === "maintenance") && <button className="action-btn secondary" onClick={() => handleUpdateRoom(room, { housekeeping_status: 'clean', status: 'available' })}>Mark Clean</button>}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {selectedRoom && (
          <div className={`modal-backdrop ${modalVisible ? "visible" : ""}`} onClick={closeModal}>
            <div className="modal" onClick={e => e.stopPropagation()}>
              <div className="modal-hero">
                <img src={selectedRoom.img} alt={selectedRoom.name} />
                <button className="modal-close" onClick={closeModal}>✕</button>
                <div className="modal-hero-overlay">
                  <div>
                    <p style={{ fontSize: "0.6rem", color: GOLD }}>Room #{selectedRoom.id}</p>
                    <p style={{ fontFamily: "serif", fontSize: "1.5rem", color: "white" }}>{selectedRoom.name}</p>
                  </div>
                </div>
              </div>
              <div className="modal-body">
                <div className="modal-grid">
                  <div className="modal-info-block">
                    <p className="modal-info-label">Rate</p>
                    <p className="modal-info-val">MAD {selectedRoom.price}</p>
                  </div>
                  <div className="modal-info-block">
                    <p className="modal-info-label">Floor</p>
                    <p className="modal-info-val">{selectedRoom.floor}</p>
                  </div>
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
