import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";


const GOLD = "#b8965a";
const DARK = "#1a1208";
const CREAM = "#fdf6ec";

const rooms = [
  {
    id: 101, name: "Double Deluxe", floor: 1, type: "double",
    status: "occupied", guest: "Jean Dupont", img: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&q=80",
    checkout: "2026-04-11", checkin: "2026-04-08", nights: 3,
    features: ["King Bed", "Sea View", "Mini-bar"], price: 8500,
    housekeeping: "clean", note: "Late checkout requested 13:00",
  },
  {
    id: 102, name: "Suite Royale", floor: 1, type: "suite",
    status: "available", guest: null, img: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&q=80",
    checkout: null, checkin: null, nights: null,
    features: ["King Size", "Mini-bar", "Jacuzzi", "Ocean View"], price: 15000,
    housekeeping: "clean", note: "Ready for arrival",
  },
  {
    id: 103, name: "Simple Standard", floor: 1, type: "standard",
    status: "cleaning", guest: null, img: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=600&q=80",
    checkout: "2026-04-10", checkin: null, nights: null,
    features: ["Queen Bed", "Garden View"], price: 7500,
    housekeeping: "dirty", note: "Released 2h ago · Awaiting housekeeping",
  },
  
  {
    id: 205, name: "Suite Junior", floor: 2, type: "suite",
    status: "occupied", guest: "Marie Curie", img: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=600&q=80",
    checkout: "2026-04-13", checkin: "2026-04-10", nights: 3,
    features: ["King Bed", "Terrace", "Living Room"], price: 11000,
    housekeeping: "clean", note: "Breakfast requested at 08:30",
  },
  {
    id: 206, name: "Double Deluxe", floor: 2, type: "double",
    status: "available", guest: null, img: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&q=80",
    checkout: null, checkin: null, nights: null,
    features: ["Sea View", "Wifi HD", "Mini-bar"], price: 8500,
    housekeeping: "clean", note: "Ready for next guest",
  },
  {
    id: 207, name: "Deluxe Premier", floor: 2, type: "deluxe",
    status: "occupied", guest: "Karim El Fassi", img: "https://images.unsplash.com/photo-1560347876-aeef00ee58a1?w=600&q=80",
    checkout: "2026-04-12", checkin: "2026-04-09", nights: 3,
    features: ["King Bed", "Panoramic View", "Soaking Tub"], price: 9500,
    housekeeping: "clean", note: "VIP — Champagne on arrival done",
  },
  {
    id: 301, name: "Alhambra Suite", floor: 3, type: "suite",
    status: "available", guest: null, img: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=600&q=80",
    checkout: null, checkin: null, nights: null,
    features: ["Plunge Pool", "Butler", "Ocean Panorama", "140m²"], price: 15000,
    housekeeping: "clean", note: "Premium — pre-arrival inspection done",
  },
  {
    id: 302, name: "Suite Royale", floor: 3, type: "suite",
    status: "occupied", guest: "Sofia Al-Hassan", img: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600&q=80",
    checkout: "2026-04-14", checkin: "2026-04-10", nights: 4,
    features: ["King Bed", "Terrace", "Spa Access"], price: 15000,
    housekeeping: "clean", note: "Do Not Disturb since 10:00",
  },
  {
    id: 304, name: "Simple Standard", floor: 3, type: "standard",
    status: "cleaning", guest: null, img: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=600&q=80",
    checkout: "2026-04-10", checkin: null, nights: null,
    features: ["Twin Beds", "City View"], price: 7500,
    housekeeping: "dirty", note: "Guest checked out at 09:45",
  },
  {
    id: 401, name: "Suite Junior", floor: 4, type: "suite",
    status: "occupied", guest: "Lena Morel", img: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=600&q=80",
    checkout: "2026-04-15", checkin: "2026-04-11", nights: 4,
    features: ["King Bed", "Strait View", "Living Room"], price: 11000,
    housekeeping: "clean", note: "Wedding anniversary — deco done",
  },
];

const STATUS_META = {
  occupied:    { label: "Occupied",    color: "#2563eb", bg: "rgba(37,99,235,0.1)",   dot: "#2563eb" },
  available:   { label: "Available",   color: "#16a34a", bg: "rgba(22,163,74,0.1)",   dot: "#16a34a" },
  cleaning:    { label: "Cleaning",    color: "#d97706", bg: "rgba(217,119,6,0.1)",   dot: "#d97706" },
};

const HK_META = {
  clean:       { label: "Clean",       color: "#16a34a" },
  dirty:       { label: "Needs Clean", color: "#d97706" },
  // maintenance: { label: "Out of Order",color: "#dc2626" },
};

const NAV_ITEMS = [
  { icon: <GridIcon />, label: "Overview", to: "/dashboard" },
  { icon: <CalIcon />,  label: "Reservations", to: "/admin/reservation" },
  { icon: <BedIcon />,  label: "Chambres", to: "/admin/chambres", active: true },
  { icon: <WrenchIcon />, label: "Maintenance", to: "/maintenance" },
];

export default function Chambres() {
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [floorFilter, setFloorFilter] = useState("all");
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const [roomsList, setRoomsList] = useState(rooms);
  const [loading, setLoading] = useState(false);

  const fetchRooms = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/rooms");
      setRoomsList(res.data);
    } catch (err) {
      console.error("Error fetching rooms", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  const handleCheckout = async (room) => {
    try {
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

  const openModal = (room) => { setSelectedRoom(room); setTimeout(() => setModalVisible(true), 10); };
  const closeModal = () => { setModalVisible(false); setTimeout(() => setSelectedRoom(null), 300); };

  const counts = {
    all: roomsList.length,
    occupied: roomsList.filter(r => r.status === "occupied").length,
    available: roomsList.filter(r => r.status === "available").length,
    cleaning: roomsList.filter(r => r.status === "cleaning").length,
  };

  const floors = [...new Set(roomsList.map(r => r.floor))].sort();

  const filtered = roomsList.filter(r => {
    const matchFilter = filter === "all" || r.status === filter;
    const matchFloor = floorFilter === "all" || r.floor === parseInt(floorFilter);
    const matchSearch = search === "" ||
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      String(r.id).includes(search) ||
      (r.guest && r.guest.toLowerCase().includes(search.toLowerCase()));
    return matchFilter && matchFloor && matchSearch;
  });

  const revenue = roomsList.filter(r => r.status === "occupied").reduce((a, r) => a + r.price, 0);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,400&family=Jost:wght@300;400;500;600&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Jost', sans-serif; background: #f4efe6; color: ${DARK}; }

        /* ── LAYOUT ── */
        .dash-wrap { display: flex; min-height: 100vh; }

        /* ── SIDEBAR ── */
        .sidebar {
          width: 240px; flex-shrink: 0;
          background: ${DARK};
          display: flex; flex-direction: column;
          position: fixed; top: 0; left: 0; bottom: 0;
          z-index: 100;
        }
        .sidebar-logo {
          padding: 1.8rem 1.6rem 1.4rem;
          border-bottom: 1px solid rgba(184,150,90,0.15);
        }
        .sidebar-logo-text {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.25rem; color: white; letter-spacing: 0.14em;
        }
        .sidebar-logo-sub {
          font-size: 0.6rem; letter-spacing: 0.2em; text-transform: uppercase;
          color: ${GOLD}; margin-top: 3px;
        }
        .sidebar-nav { flex: 1; padding: 1.2rem 0; }
        .nav-section-label {
          font-size: 0.55rem; letter-spacing: 0.25em; text-transform: uppercase;
          color: rgba(255,255,255,0.25); padding: 0 1.6rem; margin: 1rem 0 0.4rem;
        }
        .nav-item {
          display: flex; align-items: center; gap: 12px;
          padding: 11px 1.6rem; cursor: pointer; text-decoration: none;
          color: rgba(255,255,255,0.55); font-size: 0.82rem; letter-spacing: 0.04em;
          transition: all 0.2s; border-left: 3px solid transparent;
          position: relative;
        }
        .nav-item:hover { color: white; background: rgba(255,255,255,0.04); }
        .nav-item.active {
          color: white; background: rgba(184,150,90,0.12);
          border-left-color: ${GOLD};
        }
        .nav-item svg { flex-shrink: 0; opacity: 0.7; }
        .nav-item.active svg { opacity: 1; }
        .nav-badge {
          margin-left: auto; background: ${GOLD}; color: white;
          font-size: 0.6rem; padding: 2px 7px; border-radius: 10px; font-weight: 600;
        }
        .sidebar-footer {
          padding: 1.2rem 1.6rem;
          border-top: 1px solid rgba(255,255,255,0.06);
        }
        .user-row {
          display: flex; align-items: center; gap: 10px;
        }
        .user-avatar {
          width: 36px; height: 36px; border-radius: 50%;
          background: rgba(184,150,90,0.2); border: 1px solid rgba(184,150,90,0.4);
          display: flex; align-items: center; justify-content: center;
          font-family: 'Cormorant Garamond', serif; font-size: 0.95rem; color: ${GOLD};
        }
        .user-name { font-size: 0.82rem; color: white; font-weight: 500; }
        .user-role { font-size: 0.65rem; color: rgba(255,255,255,0.4); letter-spacing: 0.06em; }
        .logout-btn {
          display: flex; align-items: center; gap: 8px;
          margin-top: 1rem; padding: 9px 0;
          color: rgba(255,255,255,0.35); font-size: 0.75rem;
          cursor: pointer; border: none; background: none;
          font-family: 'Jost', sans-serif; letter-spacing: 0.06em;
          transition: color 0.2s;
        }
        .logout-btn:hover { color: #ef4444; }

        /* ── MAIN ── */
        .main { margin-left: 240px; flex: 1; display: flex; flex-direction: column; }

        /* ── TOPBAR ── */
        .topbar {
          background: white; border-bottom: 1px solid rgba(184,150,90,0.15);
          padding: 0 2rem; height: 64px;
          display: flex; align-items: center; justify-content: space-between;
          position: sticky; top: 0; z-index: 90;
        }
        .topbar-left h1 {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.35rem; font-weight: 400; letter-spacing: 0.06em;
        }
        .topbar-left p { font-size: 0.72rem; color: #aaa; margin-top: 1px; }
        .topbar-right { display: flex; align-items: center; gap: 1rem; }
        .search-wrap { position: relative; }
        .search-input {
          padding: 9px 16px 9px 38px;
          font-family: 'Jost', sans-serif; font-size: 0.82rem;
          border: 1px solid #e5ddd2; border-radius: 4px;
          background: #faf6f0; outline: none; width: 220px;
          transition: border-color 0.2s, box-shadow 0.2s;
          color: ${DARK};
        }
        .search-input:focus { border-color: ${GOLD}; box-shadow: 0 0 0 3px rgba(184,150,90,0.1); }
        .search-input::placeholder { color: #bbb; }
        .search-icon {
          position: absolute; left: 12px; top: 50%; transform: translateY(-50%);
          color: #bbb; pointer-events: none;
        }
        .topbar-icon-btn {
          width: 38px; height: 38px; border-radius: 50%;
          border: 1px solid #e5ddd2; background: white;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; color: #888; transition: all 0.2s;
          position: relative;
        }
        .topbar-icon-btn:hover { border-color: ${GOLD}; color: ${GOLD}; }
        .notif-dot {
          position: absolute; top: 6px; right: 6px;
          width: 8px; height: 8px; border-radius: 50%;
          background: #ef4444; border: 2px solid white;
        }
        .admin-chip {
          display: flex; align-items: center; gap: 8px;
          padding: 6px 14px; border-radius: 4px;
          background: rgba(184,150,90,0.08); border: 1px solid rgba(184,150,90,0.2);
        }
        .admin-chip-dot {
          width: 7px; height: 7px; border-radius: 50%; background: ${GOLD};
        }
        .admin-chip-text { font-size: 0.75rem; font-weight: 600; color: ${DARK}; letter-spacing: 0.06em; }

        /* ── KPI STRIP ── */
        .kpi-strip {
          display: grid; grid-template-columns: repeat(5, 1fr); gap: 1rem;
          padding: 1.5rem 2rem;
        }
        .kpi-card {
          background: white; border-radius: 8px; padding: 1.2rem 1.4rem;
          border: 1px solid rgba(184,150,90,0.12);
          transition: transform 0.2s, box-shadow 0.2s;
          animation: fadeUp 0.6s both;
        }
        .kpi-card:hover { transform: translateY(-2px); box-shadow: 0 8px 28px rgba(26,18,8,0.08); }
        .kpi-card:nth-child(1) { animation-delay: 0.05s; }
        .kpi-card:nth-child(2) { animation-delay: 0.1s; }
        .kpi-card:nth-child(3) { animation-delay: 0.15s; }
        .kpi-card:nth-child(4) { animation-delay: 0.2s; }
        .kpi-card:nth-child(5) { animation-delay: 0.25s; }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .kpi-icon {
          width: 36px; height: 36px; border-radius: 8px;
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 0.9rem; font-size: 1rem;
        }
        .kpi-val {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.9rem; font-weight: 400; line-height: 1;
          margin-bottom: 4px;
        }
        .kpi-label { font-size: 0.68rem; color: #aaa; letter-spacing: 0.1em; text-transform: uppercase; }
        .kpi-trend {
          font-size: 0.7rem; margin-top: 6px;
          display: flex; align-items: center; gap: 4px;
        }

        /* ── FILTER BAR ── */
        .filter-bar {
          padding: 0 2rem 1.2rem;
          display: flex; align-items: center; gap: 0.7rem; flex-wrap: wrap;
        }
        .filter-btn {
          padding: 8px 18px; border-radius: 4px;
          border: 1px solid rgba(184,150,90,0.25);
          background: white; font-family: 'Jost', sans-serif;
          font-size: 0.75rem; letter-spacing: 0.06em;
          cursor: pointer; color: #7a6a58; transition: all 0.2s;
          display: flex; align-items: center; gap: 7px;
        }
        .filter-btn:hover { border-color: ${GOLD}; color: ${DARK}; }
        .filter-btn.active { background: ${DARK}; color: white; border-color: ${DARK}; }
        .filter-btn .dot {
          width: 7px; height: 7px; border-radius: 50%;
        }
        .filter-count {
          background: rgba(255,255,255,0.2); padding: 1px 7px;
          border-radius: 10px; font-size: 0.65rem; font-weight: 600;
        }
        .filter-btn:not(.active) .filter-count { background: rgba(184,150,90,0.12); color: ${GOLD}; }
        .filter-sep { width: 1px; height: 28px; background: rgba(184,150,90,0.2); margin: 0 4px; }
        .floor-select {
          padding: 8px 14px; border-radius: 4px;
          border: 1px solid rgba(184,150,90,0.25);
          background: white; font-family: 'Jost', sans-serif;
          font-size: 0.75rem; color: #7a6a58; outline: none; cursor: pointer;
          transition: border-color 0.2s;
        }
        .floor-select:focus { border-color: ${GOLD}; }

        /* ── GRID ── */
        .rooms-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 1.2rem; padding: 0 2rem 3rem;
        }

        /* ── ROOM CARD ── */
        .room-card {
          background: white; border-radius: 10px; overflow: hidden;
          border: 1px solid rgba(184,150,90,0.12);
          box-shadow: 0 2px 12px rgba(26,18,8,0.04);
          transition: transform 0.25s, box-shadow 0.25s;
          animation: fadeUp 0.5s both;
          cursor: pointer;
        }
        .room-card:hover { transform: translateY(-4px); box-shadow: 0 12px 36px rgba(26,18,8,0.12); }
        .room-card:nth-child(1)  { animation-delay: 0.05s; }
        .room-card:nth-child(2)  { animation-delay: 0.10s; }
        .room-card:nth-child(3)  { animation-delay: 0.15s; }
        .room-card:nth-child(4)  { animation-delay: 0.20s; }
        .room-card:nth-child(5)  { animation-delay: 0.25s; }
        .room-card:nth-child(6)  { animation-delay: 0.30s; }
        .room-card:nth-child(7)  { animation-delay: 0.35s; }
        .room-card:nth-child(8)  { animation-delay: 0.40s; }
        .room-card:nth-child(9)  { animation-delay: 0.45s; }
        .room-card:nth-child(10) { animation-delay: 0.50s; }
        .room-card:nth-child(11) { animation-delay: 0.55s; }
        .room-card:nth-child(12) { animation-delay: 0.60s; }

        .room-img-wrap { position: relative; height: 180px; overflow: hidden; }
        .room-img-wrap img {
          width: 100%; height: 100%; object-fit: cover;
          transition: transform 0.5s ease;
        }
        .room-card:hover .room-img-wrap img { transform: scale(1.05); }
        .room-num-badge {
          position: absolute; top: 12px; left: 12px;
          background: rgba(26,18,8,0.7); color: white;
          font-size: 0.7rem; font-weight: 600; letter-spacing: 0.08em;
          padding: 4px 10px; border-radius: 4px; backdrop-filter: blur(4px);
        }
        .status-badge {
          position: absolute; top: 12px; right: 12px;
          font-size: 0.62rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase;
          padding: 4px 10px; border-radius: 4px; backdrop-filter: blur(4px);
        }
        .hk-badge {
          position: absolute; bottom: 12px; left: 12px;
          font-size: 0.58rem; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase;
          padding: 3px 9px; border-radius: 3px; backdrop-filter: blur(4px);
          background: rgba(26,18,8,0.55); color: white;
        }
        .price-badge {
          position: absolute; bottom: 12px; right: 12px;
          background: rgba(184,150,90,0.9); color: white;
          font-size: 0.68rem; font-weight: 700; padding: 4px 10px; border-radius: 4px;
          backdrop-filter: blur(4px);
        }

        .room-body { padding: 1.2rem; }
        .room-type-tag {
          font-size: 0.58rem; letter-spacing: 0.2em; text-transform: uppercase;
          color: ${GOLD}; margin-bottom: 3px;
        }
        .room-name {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.2rem; font-weight: 400; margin-bottom: 6px;
        }
        .room-features {
          display: flex; flex-wrap: wrap; gap: 5px; margin-bottom: 10px;
        }
        .feature-chip {
          font-size: 0.65rem; color: #7a6a58;
          background: #f8f3ec; padding: 3px 9px; border-radius: 3px;
          border: 1px solid rgba(184,150,90,0.15);
        }
        .room-note {
          font-size: 0.72rem; color: #9a8a7a; line-height: 1.55;
          padding: 8px 10px; background: #faf6f0; border-radius: 4px;
          border-left: 2px solid rgba(184,150,90,0.4);
          margin-bottom: 12px;
        }
        .guest-row {
          display: flex; align-items: center; gap: 9px;
          padding: 8px 10px; background: rgba(37,99,235,0.04);
          border-radius: 4px; margin-bottom: 12px;
          border: 1px solid rgba(37,99,235,0.1);
        }
        .guest-avatar {
          width: 28px; height: 28px; border-radius: 50%;
          background: rgba(37,99,235,0.1);
          display: flex; align-items: center; justify-content: center;
          font-size: 0.65rem; font-weight: 600; color: #2563eb; flex-shrink: 0;
        }
        .guest-name { font-size: 0.78rem; font-weight: 500; }
        .guest-dates { font-size: 0.65rem; color: #aaa; margin-top: 1px; }
        .room-actions {
          display: flex; gap: 8px;
        }
        .action-btn {
          flex: 1; padding: 9px 12px; border-radius: 4px; border: none;
          font-family: 'Jost', sans-serif; font-size: 0.7rem; font-weight: 600;
          letter-spacing: 0.08em; text-transform: uppercase; cursor: pointer;
          transition: all 0.2s;
        }
        .action-btn.primary { background: ${DARK}; color: white; }
        .action-btn.primary:hover { background: ${GOLD}; }
        .action-btn.secondary {
          background: white; color: #7a6a58;
          border: 1px solid rgba(184,150,90,0.25);
        }
        .action-btn.secondary:hover { border-color: ${GOLD}; color: ${DARK}; }
        .action-btn.gold { background: ${GOLD}; color: white; }
        .action-btn.gold:hover { background: #a07a45; }
        .action-btn.danger { background: rgba(220,38,38,0.08); color: #dc2626; border: 1px solid rgba(220,38,38,0.2); }
        .action-btn.danger:hover { background: rgba(220,38,38,0.15); }

        /* ── MODAL ── */
        .modal-backdrop {
          position: fixed; inset: 0; z-index: 500;
          background: rgba(26,18,8,0);
          display: flex; align-items: center; justify-content: center;
          padding: 1.5rem;
          transition: background 0.3s ease;
          pointer-events: none;
        }
        .modal-backdrop.visible { background: rgba(26,18,8,0.65); pointer-events: all; }
        .modal {
          background: white; border-radius: 12px;
          max-width: 720px; width: 100%;
          max-height: 90vh; overflow-y: auto;
          opacity: 0; transform: translateY(30px) scale(0.97);
          transition: opacity 0.3s, transform 0.3s;
        }
        .modal.visible { opacity: 1; transform: translateY(0) scale(1); }
        .modal-hero { position: relative; height: 240px; }
        .modal-hero img { width: 100%; height: 100%; object-fit: cover; }
        .modal-hero-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(to top, rgba(26,18,8,0.75), transparent);
          display: flex; align-items: flex-end; padding: 1.5rem;
        }
        .modal-close {
          position: absolute; top: 1rem; right: 1rem;
          background: rgba(26,18,8,0.5); color: white; border: none;
          width: 34px; height: 34px; border-radius: 50%; font-size: 1rem;
          cursor: pointer; display: flex; align-items: center; justify-content: center;
          transition: background 0.2s;
        }
        .modal-close:hover { background: rgba(26,18,8,0.85); }
        .modal-body { padding: 2rem; }
        .modal-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; margin-bottom: 1.5rem; }
        .modal-info-block { }
        .modal-info-label { font-size: 0.58rem; letter-spacing: 0.18em; text-transform: uppercase; color: ${GOLD}; margin-bottom: 4px; }
        .modal-info-val { font-size: 0.9rem; color: ${DARK}; font-weight: 500; }
        .modal-section-title {
          font-size: 0.62rem; letter-spacing: 0.2em; text-transform: uppercase;
          color: ${GOLD}; margin-bottom: 10px; padding-top: 1.2rem;
          border-top: 1px solid rgba(184,150,90,0.15);
        }
        .modal-features { display: flex; flex-wrap: wrap; gap: 7px; margin-bottom: 1.2rem; }
        .modal-feature {
          padding: 5px 14px; background: #f8f3ec;
          border: 1px solid rgba(184,150,90,0.2); border-radius: 4px;
          font-size: 0.75rem; color: #6a5a4a;
        }
        .modal-actions { display: flex; gap: 10px; margin-top: 1.5rem; }
        .modal-action-btn {
          flex: 1; padding: 12px; border-radius: 5px; border: none;
          font-family: 'Jost', sans-serif; font-size: 0.75rem; font-weight: 600;
          letter-spacing: 0.1em; text-transform: uppercase; cursor: pointer; transition: all 0.2s;
        }

        /* ── EMPTY STATE ── */
        .empty-state {
          grid-column: 1 / -1; text-align: center; padding: 4rem 2rem;
        }
        .empty-icon { font-size: 2.5rem; margin-bottom: 1rem; opacity: 0.3; }
        .empty-text { font-size: 0.88rem; color: #aaa; }

        @media (max-width: 900px) {
          .sidebar { width: 64px; }
          .sidebar-logo-text, .sidebar-logo-sub, .nav-item span, .user-name, .user-role, .logout-btn span, .nav-section-label { display: none; }
          .nav-item { justify-content: center; padding: 14px; }
          .main { margin-left: 64px; }
          .kpi-strip { grid-template-columns: repeat(3, 1fr); }
        }
        @media (max-width: 600px) {
          .kpi-strip { grid-template-columns: 1fr 1fr; }
          .modal-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="dash-wrap">
        {/* ── SIDEBAR ── */}
        <aside className="sidebar">
          <div className="sidebar-logo">
            <p className="sidebar-logo-text">✦ ALHAMBRA</p>
            <p className="sidebar-logo-sub">Administration</p>
          </div>
          <nav className="sidebar-nav">
            <p className="nav-section-label">Main Menu</p>
            {NAV_ITEMS.map((item, i) => (
              <Link key={i} to={item.to} className={`nav-item ${item.active ? "active" : ""}`}>
                {item.icon}
                <span>{item.label}</span>
                {item.label === "reservation" && <span className="nav-badge">3</span>}
              </Link>
            ))}
            <p className="nav-section-label" style={{ marginTop: "1.5rem" }}>Operations</p>
            <Link to="/reports" className="nav-item">
              <ReportIcon /><span>Reports</span>
            </Link>
          </nav>
          <div className="sidebar-footer">
            <div className="user-row">
              <div className="user-avatar">A</div>
              <div>
                <p className="user-name">Admin</p>
                <p className="user-role">Secrétaire</p>
              </div>
            </div>
            <button className="logout-btn">
              <LogoutIcon /><span>Log Out</span>
            </button>
          </div>
        </aside>

        {/* ── MAIN ── */}
        <div className="main">
          {/* TOPBAR */}
          <div className="topbar">
            <div className="topbar-left">
              <h1>Chambres Dashboard</h1>
              <p>Vendredi 10 Avril 2026 · Tanger</p>
            </div>
            <div className="topbar-right">
              <div className="search-wrap">
                <svg className="search-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
                <input className="search-input" placeholder="Search room, guest…"
                  value={search} onChange={e => setSearch(e.target.value)} />
              </div>
              <button className="topbar-icon-btn">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
                <span className="notif-dot" />
              </button>
              <button className="topbar-icon-btn">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
              </button>
              <div className="admin-chip">
                <div className="admin-chip-dot" />
                <span className="admin-chip-text">ADMIN</span>
              </div>
            </div>
          </div>

          {/* KPI STRIP */}
          <div className="kpi-strip">
            <div className="kpi-card">
              <div className="kpi-icon" style={{ background: "rgba(184,150,90,0.1)" }}>🏨</div>
              <div className="kpi-val">{rooms.length}</div>
              <div className="kpi-label">Total Rooms</div>
              <div className="kpi-trend" style={{ color: "#aaa" }}>All floors combined</div>
            </div>
            <div className="kpi-card">
              <div className="kpi-icon" style={{ background: "rgba(37,99,235,0.08)" }}>🛌</div>
              <div className="kpi-val" style={{ color: "#2563eb" }}>{counts.occupied}</div>
              <div className="kpi-label">Occupied</div>
              <div className="kpi-trend" style={{ color: "#2563eb" }}>▲ {Math.round(counts.occupied / rooms.length * 100)}% occupancy</div>
            </div>
            <div className="kpi-card">
              <div className="kpi-icon" style={{ background: "rgba(22,163,74,0.08)" }}>✓</div>
              <div className="kpi-val" style={{ color: "#16a34a" }}>{counts.available}</div>
              <div className="kpi-label">Available</div>
              <div className="kpi-trend" style={{ color: "#16a34a" }}>Ready to book</div>
            </div>
            <div className="kpi-card">
              <div className="kpi-icon" style={{ background: "rgba(217,119,6,0.08)" }}>🧹</div>
              <div className="kpi-val" style={{ color: "#d97706" }}>{counts.cleaning }</div>
              <div className="kpi-label">Not Ready</div>
              <div className="kpi-trend" style={{ color: "#d97706" }}>{counts.cleaning} cleaning </div>
            </div>
            <div className="kpi-card">
              <div className="kpi-icon" style={{ background: "rgba(184,150,90,0.1)" }}>💰</div>
              <div className="kpi-val" style={{ fontSize: "1.4rem" }}>MAD {(revenue / 1000).toFixed(0)}k</div>
              <div className="kpi-label">Tonight's Revenue</div>
              <div className="kpi-trend" style={{ color: "#16a34a" }}>▲ from occupied rooms</div>
            </div>
          </div>

          {/* FILTER BAR */}
          <div className="filter-bar">
            {[
              { key: "all", label: "All Rooms", dot: GOLD },
              { key: "occupied", label: "Occupied", dot: "#2563eb" },
              { key: "available", label: "Available", dot: "#16a34a" },
              { key: "cleaning", label: "Cleaning", dot: "#d97706" },
            ].map(f => (
              <button key={f.key}
                className={`filter-btn ${filter === f.key ? "active" : ""}`}
                onClick={() => setFilter(f.key)}
              >
                <span className="dot" style={{ background: filter === f.key ? "rgba(255,255,255,0.6)" : f.dot }} />
                {f.label}
                <span className="filter-count">{counts[f.key]}</span>
              </button>
            ))}
            <div className="filter-sep" />
            <select className="floor-select" value={floorFilter} onChange={e => setFloorFilter(e.target.value)}>
              <option value="all">All Floors</option>
              {floors.map(f => <option key={f} value={f}>Floor {f}</option>)}
            </select>
          </div>

          {/* ROOMS GRID */}
          <div className="rooms-grid">
            {filtered.length === 0 && (
              <div className="empty-state">
                <div className="empty-icon">🔍</div>
                <p className="empty-text">No rooms match your filters.</p>
              </div>
            )}
            {filtered.map(room => {
              const sm = STATUS_META[room.status];
              const hk = HK_META[room.housekeeping];
              const initials = room.guest ? room.guest.split(" ").map(n => n[0]).join("") : "";
              return (
                <div className="room-card" key={room.id} onClick={() => openModal(room)}>
                  <div className="room-img-wrap">
                    <img src={room.img} alt={room.name} />
                    <span className="room-num-badge">#{room.id}</span>
                    <span className="status-badge" style={{ background: sm.bg, color: sm.color }}>
                      {sm.label}
                    </span>
                    <span className="hk-badge">{hk.label}</span>
                    <span className="price-badge">MAD {room.price.toLocaleString()}/n</span>
                  </div>
                  <div className="room-body">
                    <p className="room-type-tag">Floor {room.floor} · {room.type}</p>
                    <h3 className="room-name">{room.name}</h3>
                    <div className="room-features">
                      {room.features.map((f, i) => <span className="feature-chip" key={i}>{f}</span>)}
                    </div>
                    {room.guest && (
                      <div className="guest-row">
                        <div className="guest-avatar">{initials}</div>
                        <div>
                          <p className="guest-name">{room.guest}</p>
                          <p className="guest-dates">Check-in {room.checkin} · {room.nights} nights</p>
                        </div>
                      </div>
                    )}
                    <div className="room-note">{room.note}</div>
                    <div className="room-actions" onClick={e => e.stopPropagation()}>
                      {room.status === "occupied" && <>
                        <button className="action-btn secondary" onClick={() => openModal(room)}>Gérer</button>
                        <button className="action-btn primary" onClick={() => handleCheckout(room)}>Checkout</button>
                      </>}
                      {room.status === "available" && <>
                        <Link to={`/booking/${room.id}`} className="action-btn gold" style={{ textDecoration: "none", textAlign: "center" }}>Réserver</Link>
                        <button className="action-btn secondary" onClick={() => handleUpdateRoom(room, { housekeeping_status: 'clean' })}>Inspect</button>
                      </>}
                      {room.status === "cleaning" && <>
                        <button className="action-btn secondary" onClick={() => handleUpdateRoom(room, { housekeeping_status: 'dirty' })}>Assigner Ménage</button>
                      </>}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── MODAL ── */}
      {selectedRoom && (
        <div className={`modal-backdrop ${modalVisible ? "visible" : ""}`} onClick={closeModal}>
          <div className={`modal ${modalVisible ? "visible" : ""}`} onClick={e => e.stopPropagation()}>
            <div className="modal-hero">
              <img src={selectedRoom.img} alt={selectedRoom.name} />
              <button className="modal-close" onClick={closeModal}>✕</button>
              <div className="modal-hero-overlay">
                <div>
                  <p style={{ fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase", color: GOLD, marginBottom: "4px" }}>
                    Room #{selectedRoom.id} · Floor {selectedRoom.floor}
                  </p>
                  <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.6rem", color: "white", fontWeight: 300 }}>
                    {selectedRoom.name}
                  </p>
                </div>
                <span style={{
                  marginLeft: "auto",
                  background: STATUS_META[selectedRoom.status].bg,
                  color: STATUS_META[selectedRoom.status].color,
                  padding: "6px 14px", borderRadius: "5px",
                  fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase"
                }}>{STATUS_META[selectedRoom.status].label}</span>
              </div>
            </div>
            <div className="modal-body">
              <div className="modal-grid">
                <div className="modal-info-block">
                  <p className="modal-info-label">Room Type</p>
                  <p className="modal-info-val" style={{ textTransform: "capitalize" }}>{selectedRoom.type}</p>
                </div>
                <div className="modal-info-block">
                  <p className="modal-info-label">Nightly Rate</p>
                  <p className="modal-info-val">MAD {selectedRoom.price.toLocaleString()}</p>
                </div>
                <div className="modal-info-block">
                  <p className="modal-info-label">Housekeeping</p>
                  <p className="modal-info-val" style={{ color: HK_META[selectedRoom.housekeeping].color }}>
                    {HK_META[selectedRoom.housekeeping].label}
                  </p>
                </div>
                <div className="modal-info-block">
                  <p className="modal-info-label">Floor</p>
                  <p className="modal-info-val">Floor {selectedRoom.floor}</p>
                </div>
                {selectedRoom.guest && <>
                  <div className="modal-info-block">
                    <p className="modal-info-label">Current Guest</p>
                    <p className="modal-info-val">{selectedRoom.guest}</p>
                  </div>
                  <div className="modal-info-block">
                    <p className="modal-info-label">Stay Duration</p>
                    <p className="modal-info-val">{selectedRoom.nights} nights</p>
                  </div>
                  <div className="modal-info-block">
                    <p className="modal-info-label">Check-in</p>
                    <p className="modal-info-val">{selectedRoom.checkin}</p>
                  </div>
                  <div className="modal-info-block">
                    <p className="modal-info-label">Check-out</p>
                    <p className="modal-info-val">{selectedRoom.checkout}</p>
                  </div>
                </>}
              </div>

              <p className="modal-section-title">Amenities & Features</p>
              <div className="modal-features">
                {selectedRoom.features.map((f, i) => <span className="modal-feature" key={i}>{f}</span>)}
              </div>

              <p className="modal-section-title">Notes</p>
              <p style={{ fontSize: "0.83rem", color: "#6a5a4a", lineHeight: 1.75, padding: "10px 14px", background: "#faf6f0", borderRadius: "5px", borderLeft: `3px solid ${GOLD}` }}>
                {selectedRoom.note}
              </p>

              <div className="modal-actions">
                {selectedRoom.status === "occupied" && <>
                  <button className="modal-action-btn" style={{ background: DARK, color: "white" }} onClick={() => handleCheckout(selectedRoom)}>Process Checkout</button>
                  <button className="modal-action-btn" style={{ background: "white", color: DARK, border: "1px solid #ddd" }}>Edit Stay</button>
                  <button className="modal-action-btn" style={{ background: "rgba(184,150,90,0.1)", color: GOLD, border: `1px solid rgba(184,150,90,0.3)` }}>Add Service</button>
                </>}
                {selectedRoom.status === "available" && <>
                  <Link to={`/booking/${selectedRoom.id}`} className="modal-action-btn" style={{ background: GOLD, color: "white", textDecoration: "none", display: "flex", alignItems: "center", justifyContent: "center" }}>Book This Room</Link>
                  <button className="modal-action-btn" style={{ background: "white", color: DARK, border: "1px solid #ddd" }} onClick={() => handleUpdateRoom(selectedRoom, { status: 'maintenance' })}>Block Room</button>
                </>}
                {selectedRoom.status === "cleaning" && <>
                  <button className="modal-action-btn" style={{ background: "#d97706", color: "white" }} onClick={() => handleUpdateRoom(selectedRoom, { housekeeping_status: 'dirty' })}>Assign Housekeeping</button>
                  <button className="modal-action-btn" style={{ background: "white", color: DARK, border: "1px solid #ddd" }} onClick={() => handleUpdateRoom(selectedRoom, { housekeeping_status: 'clean' })}>Mark Clean</button>
                </>}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

/* ── ICONS ── */
function GridIcon() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>;
}
function CalIcon() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>;
}
function BedIcon() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M2 4v16"/><path d="M22 8H2"/><path d="M22 4v16"/><rect x="6" y="4" width="4" height="4" rx="1"/><path d="M2 8v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8"/></svg>;
}
function WrenchIcon() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>;
}
function ReportIcon() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>;
}
function LogoutIcon() {
  return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>;
}