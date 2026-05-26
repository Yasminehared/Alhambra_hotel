import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const GOLD = "#b8965a";
const DARK = "#1a1208";

const reservations = [
  {
    id: "RES-1041", room: 102, roomName: "Suite Royale", floor: 1,
    guest: "Amina Karimi", email: "amina.karimi@email.com", phone: "+212 6 11 22 33 44",
    checkin: "2026-04-12", checkout: "2026-04-16", nights: 4, guests: 2,
    status: "confirmed", payment: "paid", source: "Direct",
    price: 15000, total: 60000,
    img: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&q=80",
    requests: "Champagne on arrival, high floor", created: "2026-04-01",
    nationality: "Moroccan", vip: true,
  },
  {
    id: "RES-1042", room: 205, roomName: "Suite Junior", floor: 2,
    guest: "Thomas Laurent", email: "t.laurent@gmail.com", phone: "+33 6 55 44 33 22",
    checkin: "2026-04-13", checkout: "2026-04-15", nights: 2, guests: 1,
    status: "confirmed", payment: "partial",  source: "Booking.com",
    price: 11000, total: 22000,
    img: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=600&q=80",
    requests: "Late check-out if possible", created: "2026-04-05",
    nationality: "French", vip: false,
  },
  {
    id: "RES-1043", room: 301, roomName: "Alhambra Suite", floor: 3,
    guest: "Sofia Al-Hassan", email: "sofia.alhassan@corp.ae", phone: "+971 50 123 4567",
    checkin: "2026-04-14", checkout: "2026-04-19", nights: 5, guests: 2,
    status: "pending", payment: "unpaid", source: "Direct",
    price: 15000, total: 75000,
    img: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=600&q=80",
    requests: "Airport transfer, dietary restrictions (halal)", created: "2026-04-08",
    nationality: "Emirati", vip: true,
  },
  {
    id: "RES-1044", room: 106, roomName: "Simple Standard", floor: 1,
    guest: "Yuki Tanaka", email: "yuki.tanaka@jp.co", phone: "+81 90 1234 5678",
    checkin: "2026-04-10", checkout: "2026-04-12", nights: 2, guests: 1,
    status: "checked-in", payment: "paid", source: "Expedia",
    price: 7500, total: 15000,
    img: "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=600&q=80",
    requests: "Non-smoking room, extra pillows", created: "2026-03-28",
    nationality: "Japanese", vip: false,
  },
  {
    id: "RES-1045", room: 207, roomName: "Deluxe Premier", floor: 2,
    guest: "Karim El Fassi", email: "karim.elfassi@ma.com", phone: "+212 6 77 88 99 00",
    checkin: "2026-04-09", checkout: "2026-04-12", nights: 3, guests: 2,
    status: "checked-in", payment: "paid", source: "Direct",
    price: 9500, total: 28500,
    img: "https://images.unsplash.com/photo-1560347876-aeef00ee58a1?w=600&q=80",
    requests: "Anniversary setup, rose petals", created: "2026-04-02",
    nationality: "Moroccan", vip: true,
  },
  {
    id: "RES-1046", room: 103, roomName: "Simple Standard", floor: 1,
    guest: "Claire Dubois", email: "claire.dubois@fr.net", phone: "+33 7 88 77 66 55",
    checkin: "2026-04-08", checkout: "2026-04-10", nights: 2, guests: 1,
    status: "checked-out", payment: "paid", source: "Airbnb",
    price: 7500, total: 15000,
    img: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=600&q=80",
    requests: "Early check-in 10:00", created: "2026-03-20",
    nationality: "French", vip: false,
  },
  {
    id: "RES-1047", room: 302, roomName: "Suite Royale", floor: 3,
    guest: "Mohammed Al-Rashid", email: "m.alrashid@ksa.sa", phone: "+966 55 123 4567",
    checkin: "2026-04-10", checkout: "2026-04-14", nights: 4, guests: 3,
    status: "checked-in", payment: "paid", source: "Direct",
    price: 15000, total: 60000,
    img: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600&q=80",
    requests: "Butler service, daily newspaper (Arabic)", created: "2026-04-01",
    nationality: "Saudi", vip: true,
  },
  {
    id: "RES-1048", room: 206, roomName: "Double Deluxe", floor: 2,
    guest: "Ingrid Svensson", email: "ingrid@se.mail", phone: "+46 70 123 4567",
    checkin: "2026-04-15", checkout: "2026-04-18", nights: 3, guests: 2,
    status: "confirmed", payment: "paid", source: "Booking.com",
    price: 8500, total: 25500,
    img: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&q=80",
    requests: "Sea view room preferred, quiet floor", created: "2026-04-06",
    nationality: "Swedish", vip: false,
  },
  {
    id: "RES-1049", room: 401, roomName: "Suite Junior", floor: 4,
    guest: "Lena Morel", email: "lena.morel@be.eu", phone: "+32 478 123 456",
    checkin: "2026-04-11", checkout: "2026-04-15", nights: 4, guests: 2,
    status: "checked-in", payment: "paid", source: "Direct",
    price: 11000, total: 44000,
    img: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=600&q=80",
    requests: "Wedding anniversary — decoration requested", created: "2026-04-03",
    nationality: "Belgian", vip: true,
  },
  {
    id: "RES-1050", room: 101, roomName: "Double Deluxe", floor: 1,
    guest: "Carlos Rivera", email: "carlos.r@mx.com", phone: "+52 55 1234 5678",
    checkin: "2026-04-16", checkout: "2026-04-20", nights: 4, guests: 2,
    status: "pending", payment: "partial", source: "Expedia",
    price: 8500, total: 34000,
    img: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&q=80",
    requests: "Gluten-free breakfast option", created: "2026-04-09",
    nationality: "Mexican", vip: false,
  },
  {
    id: "RES-1051", room: 304, roomName: "Simple Standard", floor: 3,
    guest: "Priya Sharma", email: "priya.sharma@in.io", phone: "+91 98765 43210",
    checkin: "2026-04-08", checkout: "2026-04-10", nights: 2, guests: 1,
    status: "checked-out", payment: "paid", source: "Booking.com",
    price: 7500, total: 15000,
    img: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=600&q=80",
    requests: "Vegetarian meals only", created: "2026-03-25",
    nationality: "Indian", vip: false,
  },
  {
    id: "RES-1052", room: 303, roomName: "Double Deluxe", floor: 3,
    guest: "Hans Weber", email: "h.weber@de.gmbh", phone: "+49 151 1234 5678",
    checkin: "2026-04-18", checkout: "2026-04-22", nights: 4, guests: 2,
    status: "confirmed", payment: "unpaid", source: "Direct",
    price: 8500, total: 34000,
    img: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&q=80",
    requests: "Business center access, printer needed", created: "2026-04-07",
    nationality: "German", vip: false,
  },
];

const STATUS_META = {
  "confirmed":   { label: "Confirmed",   color: "#2563eb", bg: "rgba(37,99,235,0.1)"  },
  "pending":     { label: "Pending",     color: "#d97706", bg: "rgba(217,119,6,0.1)"  },
  "checked-in":  { label: "Checked In",  color: "#16a34a", bg: "rgba(22,163,74,0.1)"  },
  "checked-out": { label: "Checked Out", color: "#6b7280", bg: "rgba(107,114,128,0.1)" },
};

const PAYMENT_META = {
  paid:    { label: "Paid",    color: "#16a34a" },
  partial: { label: "Partial", color: "#d97706" },
  unpaid:  { label: "Unpaid",  color: "#dc2626" },
};

const SOURCE_COLORS = {
  "Direct":      { bg: "rgba(184,150,90,0.12)", color: GOLD },
  "Booking.com": { bg: "rgba(37,99,235,0.1)",  color: "#2563eb" },
  "Expedia":     { bg: "rgba(217,119,6,0.1)",   color: "#d97706" },
  "Airbnb":      { bg: "rgba(255,90,95,0.1)",   color: "#ff5a5f" },
};

const NAV_ITEMS = [
  { icon: <GridIcon />,   label: "Overview",     to: "/dashboard" },
  { icon: <CalIcon />,    label: "Reservations", to: "/admin/reservation", active: true },
  { icon: <BedIcon />,    label: "Chambres",     to: "/admin/chambres" },
  { icon: <WrenchIcon />, label: "Maintenance",  to: "/maintenance" },
  { icon: <ChartIcon />,  label: "Analytics",    to: "/analytics" },
  { icon: <StarIcon />,   label: "Guests",       to: "/guests" },
];

export default function ReservationsPage() {
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [sourceFilter, setSourceFilter] = useState("all");
  const [selectedRes, setSelectedRes] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [showNewForm, setShowNewForm] = useState(false);

  const [reservationsList, setReservationsList] = useState(reservations);
  const [loading, setLoading] = useState(false);

  const fetchReservations = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/reservations");
      setReservationsList(res.data);
    } catch (err) {
      console.error("Error fetching reservations", err);
    } finally {
      setLoading(false);
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

  const openModal = (r) => { setSelectedRes(r); setTimeout(() => setModalVisible(true), 10); };
  const closeModal = () => { setModalVisible(false); setTimeout(() => setSelectedRes(null), 300); };

  const counts = {
    all: reservationsList.length,
    confirmed:    reservationsList.filter(r => r.status === "confirmed").length,
    pending:      reservationsList.filter(r => r.status === "pending").length,
    "checked-in": reservationsList.filter(r => r.status === "checked-in").length,
    "checked-out":reservationsList.filter(r => r.status === "checked-out").length,
  };

  const totalRevenue = reservationsList.filter(r => r.payment === "paid").reduce((a, r) => a + r.total, 0);
  const pendingRevenue = reservationsList.filter(r => r.payment !== "paid").reduce((a, r) => a + r.total, 0);
  const vipCount = reservationsList.filter(r => r.vip).length;
  const avgNights = reservationsList.length ? Math.round(reservationsList.reduce((a, r) => a + r.nights, 0) / reservationsList.length) : 0;

  const filtered = reservationsList.filter(r => {
    const matchFilter = filter === "all" || r.status === filter;
    const matchSource = sourceFilter === "all" || r.source === sourceFilter;
    const matchSearch = search === "" ||
      r.guest.toLowerCase().includes(search.toLowerCase()) ||
      r.id.toLowerCase().includes(search.toLowerCase()) ||
      r.roomName.toLowerCase().includes(search.toLowerCase()) ||
      String(r.room).includes(search);
    return matchFilter && matchSource && matchSearch;
  });

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,400&family=Jost:wght@300;400;500;600&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Jost', sans-serif; background: #f4efe6; color: ${DARK}; }

        .dash-wrap { display: flex; min-height: 100vh; }

        /* ── SIDEBAR ── */
        .sidebar {
          width: 240px; flex-shrink: 0; background: ${DARK};
          display: flex; flex-direction: column;
          position: fixed; top: 0; left: 0; bottom: 0; z-index: 100;
        }
        .sidebar-logo { padding: 1.8rem 1.6rem 1.4rem; border-bottom: 1px solid rgba(184,150,90,0.15); }
        .sidebar-logo-text { font-family: 'Cormorant Garamond', serif; font-size: 1.25rem; color: white; letter-spacing: 0.14em; }
        .sidebar-logo-sub { font-size: 0.6rem; letter-spacing: 0.2em; text-transform: uppercase; color: ${GOLD}; margin-top: 3px; }
        .sidebar-nav { flex: 1; padding: 1.2rem 0; }
        .nav-section-label { font-size: 0.55rem; letter-spacing: 0.25em; text-transform: uppercase; color: rgba(255,255,255,0.25); padding: 0 1.6rem; margin: 1rem 0 0.4rem; }
        .nav-item {
          display: flex; align-items: center; gap: 12px;
          padding: 11px 1.6rem; cursor: pointer; text-decoration: none;
          color: rgba(255,255,255,0.55); font-size: 0.82rem; letter-spacing: 0.04em;
          transition: all 0.2s; border-left: 3px solid transparent;
        }
        .nav-item:hover { color: white; background: rgba(255,255,255,0.04); }
        .nav-item.active { color: white; background: rgba(184,150,90,0.12); border-left-color: ${GOLD}; }
        .nav-item svg { flex-shrink: 0; opacity: 0.7; }
        .nav-item.active svg { opacity: 1; }
        .nav-badge { margin-left: auto; background: ${GOLD}; color: white; font-size: 0.6rem; padding: 2px 7px; border-radius: 10px; font-weight: 600; }
        .sidebar-footer { padding: 1.2rem 1.6rem; border-top: 1px solid rgba(255,255,255,0.06); }
        .user-row { display: flex; align-items: center; gap: 10px; }
        .user-avatar { width: 36px; height: 36px; border-radius: 50%; background: rgba(184,150,90,0.2); border: 1px solid rgba(184,150,90,0.4); display: flex; align-items: center; justify-content: center; font-family: 'Cormorant Garamond', serif; font-size: 0.95rem; color: ${GOLD}; }
        .user-name { font-size: 0.82rem; color: white; font-weight: 500; }
        .user-role { font-size: 0.65rem; color: rgba(255,255,255,0.4); letter-spacing: 0.06em; }
        .logout-btn { display: flex; align-items: center; gap: 8px; margin-top: 1rem; padding: 9px 0; color: rgba(255,255,255,0.35); font-size: 0.75rem; cursor: pointer; border: none; background: none; font-family: 'Jost', sans-serif; letter-spacing: 0.06em; transition: color 0.2s; }
        .logout-btn:hover { color: #ef4444; }

        /* ── MAIN ── */
        .main { margin-left: 240px; flex: 1; display: flex; flex-direction: column; }

        /* ── TOPBAR ── */
        .topbar { background: white; border-bottom: 1px solid rgba(184,150,90,0.15); padding: 0 2rem; height: 64px; display: flex; align-items: center; justify-content: space-between; position: sticky; top: 0; z-index: 90; }
        .topbar-left h1 { font-family: 'Cormorant Garamond', serif; font-size: 1.35rem; font-weight: 400; letter-spacing: 0.06em; }
        .topbar-left p { font-size: 0.72rem; color: #aaa; margin-top: 1px; }
        .topbar-right { display: flex; align-items: center; gap: 1rem; }
        .search-wrap { position: relative; }
        .search-input { padding: 9px 16px 9px 38px; font-family: 'Jost', sans-serif; font-size: 0.82rem; border: 1px solid #e5ddd2; border-radius: 4px; background: #faf6f0; outline: none; width: 220px; transition: border-color 0.2s, box-shadow 0.2s; color: ${DARK}; }
        .search-input:focus { border-color: ${GOLD}; box-shadow: 0 0 0 3px rgba(184,150,90,0.1); }
        .search-input::placeholder { color: #bbb; }
        .search-icon { position: absolute; left: 12px; top: 50%; transform: translateY(-50%); color: #bbb; pointer-events: none; }
        .topbar-icon-btn { width: 38px; height: 38px; border-radius: 50%; border: 1px solid #e5ddd2; background: white; display: flex; align-items: center; justify-content: center; cursor: pointer; color: #888; transition: all 0.2s; position: relative; }
        .topbar-icon-btn:hover { border-color: ${GOLD}; color: ${GOLD}; }
        .notif-dot { position: absolute; top: 6px; right: 6px; width: 8px; height: 8px; border-radius: 50%; background: #ef4444; border: 2px solid white; }
        .admin-chip { display: flex; align-items: center; gap: 8px; padding: 6px 14px; border-radius: 4px; background: rgba(184,150,90,0.08); border: 1px solid rgba(184,150,90,0.2); }
        .admin-chip-dot { width: 7px; height: 7px; border-radius: 50%; background: ${GOLD}; }
        .admin-chip-text { font-size: 0.75rem; font-weight: 600; color: ${DARK}; letter-spacing: 0.06em; }
        .new-res-btn { padding: 9px 20px; background: ${GOLD}; color: white; border: none; border-radius: 4px; font-family: 'Jost', sans-serif; font-size: 0.75rem; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; cursor: pointer; transition: background 0.2s; display: flex; align-items: center; gap: 7px; }
        .new-res-btn:hover { background: #a07a45; }

        /* ── KPI STRIP ── */
        .kpi-strip { display: grid; grid-template-columns: repeat(5, 1fr); gap: 1rem; padding: 1.5rem 2rem; }
        .kpi-card { background: white; border-radius: 8px; padding: 1.2rem 1.4rem; border: 1px solid rgba(184,150,90,0.12); transition: transform 0.2s, box-shadow 0.2s; animation: fadeUp 0.6s both; }
        .kpi-card:hover { transform: translateY(-2px); box-shadow: 0 8px 28px rgba(26,18,8,0.08); }
        .kpi-card:nth-child(1){animation-delay:0.05s} .kpi-card:nth-child(2){animation-delay:0.1s} .kpi-card:nth-child(3){animation-delay:0.15s} .kpi-card:nth-child(4){animation-delay:0.2s} .kpi-card:nth-child(5){animation-delay:0.25s}
        @keyframes fadeUp { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }
        .kpi-icon { width: 36px; height: 36px; border-radius: 8px; display: flex; align-items: center; justify-content: center; margin-bottom: 0.9rem; font-size: 1rem; }
        .kpi-val { font-family: 'Cormorant Garamond', serif; font-size: 1.9rem; font-weight: 400; line-height: 1; margin-bottom: 4px; }
        .kpi-label { font-size: 0.68rem; color: #aaa; letter-spacing: 0.1em; text-transform: uppercase; }
        .kpi-trend { font-size: 0.7rem; margin-top: 6px; display: flex; align-items: center; gap: 4px; }

        /* ── FILTER BAR ── */
        .filter-bar { padding: 0 2rem 1.2rem; display: flex; align-items: center; gap: 0.7rem; flex-wrap: wrap; }
        .filter-btn { padding: 8px 18px; border-radius: 4px; border: 1px solid rgba(184,150,90,0.25); background: white; font-family: 'Jost', sans-serif; font-size: 0.75rem; letter-spacing: 0.06em; cursor: pointer; color: #7a6a58; transition: all 0.2s; display: flex; align-items: center; gap: 7px; }
        .filter-btn:hover { border-color: ${GOLD}; color: ${DARK}; }
        .filter-btn.active { background: ${DARK}; color: white; border-color: ${DARK}; }
        .filter-btn .dot { width: 7px; height: 7px; border-radius: 50%; }
        .filter-count { background: rgba(184,150,90,0.12); color: ${GOLD}; padding: 1px 7px; border-radius: 10px; font-size: 0.65rem; font-weight: 600; }
        .filter-btn.active .filter-count { background: rgba(255,255,255,0.2); color: white; }
        .filter-sep { width: 1px; height: 28px; background: rgba(184,150,90,0.2); margin: 0 4px; }
        .source-select { padding: 8px 14px; border-radius: 4px; border: 1px solid rgba(184,150,90,0.25); background: white; font-family: 'Jost', sans-serif; font-size: 0.75rem; color: #7a6a58; outline: none; cursor: pointer; transition: border-color 0.2s; }
        .source-select:focus { border-color: ${GOLD}; }

        /* ── CARDS GRID ── */
        .res-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(340px, 1fr)); gap: 1.2rem; padding: 0 2rem 3rem; }

        /* ── RESERVATION CARD ── */
        .res-card { background: white; border-radius: 10px; overflow: hidden; border: 1px solid rgba(184,150,90,0.12); box-shadow: 0 2px 12px rgba(26,18,8,0.04); transition: transform 0.25s, box-shadow 0.25s; animation: fadeUp 0.5s both; cursor: pointer; }
        .res-card:hover { transform: translateY(-4px); box-shadow: 0 12px 36px rgba(26,18,8,0.12); }
        .res-card:nth-child(1){animation-delay:0.05s} .res-card:nth-child(2){animation-delay:0.1s} .res-card:nth-child(3){animation-delay:0.15s} .res-card:nth-child(4){animation-delay:0.2s} .res-card:nth-child(5){animation-delay:0.25s} .res-card:nth-child(6){animation-delay:0.3s} .res-card:nth-child(7){animation-delay:0.35s} .res-card:nth-child(8){animation-delay:0.4s} .res-card:nth-child(9){animation-delay:0.45s} .res-card:nth-child(10){animation-delay:0.5s} .res-card:nth-child(11){animation-delay:0.55s} .res-card:nth-child(12){animation-delay:0.6s}

        /* card image */
        .res-img-wrap { position: relative; height: 160px; overflow: hidden; }
        .res-img-wrap img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s ease; }
        .res-card:hover .res-img-wrap img { transform: scale(1.05); }
        .res-id-badge { position: absolute; top: 12px; left: 12px; background: rgba(26,18,8,0.7); color: white; font-size: 0.68rem; font-weight: 600; letter-spacing: 0.08em; padding: 4px 10px; border-radius: 4px; backdrop-filter: blur(4px); }
        .res-status-badge { position: absolute; top: 12px; right: 12px; font-size: 0.62rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; padding: 4px 10px; border-radius: 4px; backdrop-filter: blur(4px); }
        .vip-badge { position: absolute; bottom: 12px; left: 12px; background: rgba(184,150,90,0.9); color: white; font-size: 0.6rem; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; padding: 3px 10px; border-radius: 3px; }
        .source-pill { position: absolute; bottom: 12px; right: 12px; font-size: 0.62rem; font-weight: 600; padding: 3px 10px; border-radius: 3px; backdrop-filter: blur(4px); }

        /* card body */
        .res-body { padding: 1.2rem; }
        .res-header { display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 10px; }
        .guest-initials { width: 40px; height: 40px; border-radius: 50%; background: rgba(184,150,90,0.1); border: 1px solid rgba(184,150,90,0.3); display: flex; align-items: center; justify-content: center; font-family: 'Cormorant Garamond', serif; font-size: 1rem; color: ${GOLD}; flex-shrink: 0; }
        .res-guest-name { font-size: 0.95rem; font-weight: 500; margin-bottom: 2px; }
        .res-guest-nationality { font-size: 0.65rem; color: #aaa; letter-spacing: 0.06em; }
        .payment-pill { font-size: 0.62rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; padding: 3px 10px; border-radius: 3px; }

        .res-room-row { display: flex; align-items: center; gap: 8px; padding: 8px 10px; background: #faf6f0; border-radius: 4px; margin-bottom: 10px; border: 1px solid rgba(184,150,90,0.12); }
        .res-room-icon { color: ${GOLD}; flex-shrink: 0; }
        .res-room-name { font-size: 0.8rem; font-weight: 500; }
        .res-room-num { font-size: 0.68rem; color: #aaa; margin-top: 1px; }

        .dates-row { display: grid; grid-template-columns: 1fr auto 1fr; gap: 6px; align-items: center; margin-bottom: 10px; }
        .date-block { text-align: center; padding: 8px; background: #f8f3ec; border-radius: 4px; border: 1px solid rgba(184,150,90,0.12); }
        .date-label { font-size: 0.58rem; letter-spacing: 0.15em; text-transform: uppercase; color: ${GOLD}; margin-bottom: 3px; }
        .date-val { font-size: 0.82rem; font-weight: 500; color: ${DARK}; }
        .nights-sep { text-align: center; }
        .nights-circle { width: 34px; height: 34px; border-radius: 50%; background: ${DARK}; color: white; display: flex; align-items: center; justify-content: center; font-size: 0.7rem; font-weight: 600; margin: 0 auto; }
        .nights-label { font-size: 0.55rem; color: #aaa; text-align: center; margin-top: 3px; letter-spacing: 0.08em; text-transform: uppercase; }

        .res-total { display: flex; align-items: center; justify-content: space-between; padding: 8px 10px; background: rgba(184,150,90,0.06); border-radius: 4px; margin-bottom: 10px; border: 1px solid rgba(184,150,90,0.15); }
        .res-total-label { font-size: 0.65rem; color: #aaa; letter-spacing: 0.1em; text-transform: uppercase; }
        .res-total-val { font-family: 'Cormorant Garamond', serif; font-size: 1.2rem; color: ${DARK}; }

        .res-note { font-size: 0.7rem; color: #9a8a7a; line-height: 1.55; padding: 7px 10px; background: #faf6f0; border-radius: 4px; border-left: 2px solid rgba(184,150,90,0.4); margin-bottom: 12px; }

        .res-actions { display: flex; gap: 8px; }
        .action-btn { flex: 1; padding: 9px 12px; border-radius: 4px; border: none; font-family: 'Jost', sans-serif; font-size: 0.7rem; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; cursor: pointer; transition: all 0.2s; }
        .action-btn.primary { background: ${DARK}; color: white; }
        .action-btn.primary:hover { background: ${GOLD}; }
        .action-btn.gold { background: ${GOLD}; color: white; }
        .action-btn.gold:hover { background: #a07a45; }
        .action-btn.secondary { background: white; color: #7a6a58; border: 1px solid rgba(184,150,90,0.25); }
        .action-btn.secondary:hover { border-color: ${GOLD}; color: ${DARK}; }
        .action-btn.danger { background: rgba(220,38,38,0.08); color: #dc2626; border: 1px solid rgba(220,38,38,0.2); }
        .action-btn.danger:hover { background: rgba(220,38,38,0.15); }

        /* ── MODAL ── */
        .modal-backdrop { position: fixed; inset: 0; z-index: 500; background: rgba(26,18,8,0); display: flex; align-items: center; justify-content: center; padding: 1.5rem; transition: background 0.3s ease; pointer-events: none; }
        .modal-backdrop.visible { background: rgba(26,18,8,0.65); pointer-events: all; }
        .modal { background: white; border-radius: 12px; max-width: 760px; width: 100%; max-height: 92vh; overflow-y: auto; opacity: 0; transform: translateY(30px) scale(0.97); transition: opacity 0.3s, transform 0.3s; }
        .modal.visible { opacity: 1; transform: translateY(0) scale(1); }
        .modal-hero { position: relative; height: 220px; }
        .modal-hero img { width: 100%; height: 100%; object-fit: cover; }
        .modal-hero-overlay { position: absolute; inset: 0; background: linear-gradient(to top, rgba(26,18,8,0.78), transparent); display: flex; align-items: flex-end; justify-content: space-between; padding: 1.5rem; }
        .modal-close { position: absolute; top: 1rem; right: 1rem; background: rgba(26,18,8,0.5); color: white; border: none; width: 34px; height: 34px; border-radius: 50%; font-size: 1rem; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: background 0.2s; }
        .modal-close:hover { background: rgba(26,18,8,0.85); }
        .modal-body { padding: 2rem; }
        .modal-section-title { font-size: 0.6rem; letter-spacing: 0.2em; text-transform: uppercase; color: ${GOLD}; margin-bottom: 10px; padding-top: 1.2rem; border-top: 1px solid rgba(184,150,90,0.15); }
        .modal-grid { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 1.2rem; margin-bottom: 0.5rem; }
        .modal-info-label { font-size: 0.58rem; letter-spacing: 0.18em; text-transform: uppercase; color: ${GOLD}; margin-bottom: 4px; }
        .modal-info-val { font-size: 0.88rem; color: ${DARK}; font-weight: 500; }
        .modal-actions { display: flex; gap: 10px; margin-top: 1.5rem; }
        .modal-action-btn { flex: 1; padding: 12px; border-radius: 5px; border: none; font-family: 'Jost', sans-serif; font-size: 0.75rem; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; cursor: pointer; transition: all 0.2s; }

        /* ── EMPTY ── */
        .empty-state { grid-column: 1/-1; text-align: center; padding: 4rem 2rem; }
        .empty-icon { font-size: 2.5rem; margin-bottom: 1rem; opacity: 0.3; }
        .empty-text { font-size: 0.88rem; color: #aaa; }

        @media (max-width: 900px) {
          .sidebar { width: 64px; }
          .sidebar-logo-text, .sidebar-logo-sub, .nav-item span, .user-name, .user-role, .logout-btn span, .nav-section-label { display: none; }
          .nav-item { justify-content: center; padding: 14px; }
          .main { margin-left: 64px; }
          .kpi-strip { grid-template-columns: repeat(3,1fr); }
          .modal-grid { grid-template-columns: 1fr 1fr; }
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
                {item.icon}<span>{item.label}</span>
                {item.label === "Reservations" && <span className="nav-badge">{counts.pending}</span>}
              </Link>
            ))}
            <p className="nav-section-label" style={{ marginTop: "1.5rem" }}>Operations</p>
            <Link to="/staff" className="nav-item"><PeopleIcon /><span>Staff</span></Link>
            <Link to="/reports" className="nav-item"><ReportIcon /><span>Reports</span></Link>
          </nav>
          <div className="sidebar-footer">
            <div className="user-row">
              <div className="user-avatar">A</div>
              <div><p className="user-name">Admin</p><p className="user-role">Secrétaire</p></div>
            </div>
            <button className="logout-btn"><LogoutIcon /><span>Log Out</span></button>
          </div>
        </aside>

        {/* ── MAIN ── */}
        <div className="main">
          {/* TOPBAR */}
          <div className="topbar">
            <div className="topbar-left">
              <h1>Reservations Dashboard</h1>
              <p>Vendredi 10 Avril 2026 · Tanger</p>
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
              <button className="new-res-btn" onClick={() => setShowNewForm(true)}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                New Reservation
              </button>
            </div>
          </div>

          {/* KPI STRIP */}
          <div className="kpi-strip">
            <div className="kpi-card">
              <div className="kpi-icon" style={{ background: "rgba(184,150,90,0.1)" }}>📋</div>
              <div className="kpi-val">{reservations.length}</div>
              <div className="kpi-label">Total Reservations</div>
              <div className="kpi-trend" style={{ color: "#aaa" }}>This period</div>
            </div>
            <div className="kpi-card">
              <div className="kpi-icon" style={{ background: "rgba(22,163,74,0.08)" }}>✓</div>
              <div className="kpi-val" style={{ color: "#16a34a" }}>{counts["checked-in"]}</div>
              <div className="kpi-label">Checked In</div>
              <div className="kpi-trend" style={{ color: "#16a34a" }}>Currently staying</div>
            </div>
            <div className="kpi-card">
              <div className="kpi-icon" style={{ background: "rgba(217,119,6,0.08)" }}>⏳</div>
              <div className="kpi-val" style={{ color: "#d97706" }}>{counts.pending}</div>
              <div className="kpi-label">Pending</div>
              <div className="kpi-trend" style={{ color: "#d97706" }}>Awaiting confirmation</div>
            </div>
            <div className="kpi-card">
              <div className="kpi-icon" style={{ background: "rgba(184,150,90,0.1)" }}>💰</div>
              <div className="kpi-val" style={{ fontSize: "1.4rem" }}>MAD {(totalRevenue / 1000).toFixed(0)}k</div>
              <div className="kpi-label">Revenue Collected</div>
              <div className="kpi-trend" style={{ color: "#16a34a" }}>▲ Paid reservations</div>
            </div>
            <div className="kpi-card">
              <div className="kpi-icon" style={{ background: "rgba(220,38,38,0.06)" }}>⚠️</div>
              <div className="kpi-val" style={{ fontSize: "1.4rem", color: "#dc2626" }}>MAD {(pendingRevenue / 1000).toFixed(0)}k</div>
              <div className="kpi-label">Pending Payment</div>
              <div className="kpi-trend" style={{ color: "#dc2626" }}>Unpaid + partial</div>
            </div>
          </div>

          {/* FILTER BAR */}
          <div className="filter-bar">
            {[
              { key: "all",          label: "All",         dot: GOLD        },
              { key: "confirmed",    label: "Confirmed",   dot: "#2563eb"   },
              { key: "pending",      label: "Pending",     dot: "#d97706"   },
              { key: "checked-in",   label: "Checked In",  dot: "#16a34a"   },
              { key: "checked-out",  label: "Checked Out", dot: "#6b7280"   },
            ].map(f => (
              <button key={f.key} className={`filter-btn ${filter === f.key ? "active" : ""}`} onClick={() => setFilter(f.key)}>
                <span className="dot" style={{ background: filter === f.key ? "rgba(255,255,255,0.6)" : f.dot }} />
                {f.label}
                <span className="filter-count">{counts[f.key]}</span>
              </button>
            ))}
            <div className="filter-sep" />
            <select className="source-select" value={sourceFilter} onChange={e => setSourceFilter(e.target.value)}>
              <option value="all">All Sources</option>
              {["Direct","Booking.com","Expedia","Airbnb"].map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>

          {/* CARDS GRID */}
          <div className="res-grid">
            {filtered.length === 0 && (
              <div className="empty-state">
                <div className="empty-icon">🔍</div>
                <p className="empty-text">No reservations match your filters.</p>
              </div>
            )}
            {filtered.map((res) => {
              const sm = STATUS_META[res.status];
              const pm = PAYMENT_META[res.payment];
              const sc = SOURCE_COLORS[res.source] || { bg: "#f3f4f6", color: "#6b7280" };
              const initials = res.guest.split(" ").map(n => n[0]).join("");
              return (
                <div className="res-card" key={res.id} onClick={() => openModal(res)}>
                  {/* Image */}
                  <div className="res-img-wrap">
                    <img src={res.img} alt={res.roomName} />
                    <span className="res-id-badge">{res.id}</span>
                    <span className="res-status-badge" style={{ background: sm.bg, color: sm.color }}>{sm.label}</span>
                    {res.vip && <span className="vip-badge">⭐ VIP</span>}
                    <span className="source-pill" style={{ background: sc.bg, color: sc.color }}>{res.source}</span>
                  </div>

                  {/* Body */}
                  <div className="res-body">
                    <div className="res-header">
                      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <div className="guest-initials">{initials}</div>
                        <div>
                          <p className="res-guest-name">{res.guest}</p>
                          <p className="res-guest-nationality">{res.nationality} · {res.guests} guest{res.guests > 1 ? "s" : ""}</p>
                        </div>
                      </div>
                      <span className="payment-pill" style={{ background: `${pm.color}18`, color: pm.color }}>{pm.label}</span>
                    </div>

                    {/* Room row */}
                    <div className="res-room-row">
                      <span className="res-room-icon">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 4v16"/><path d="M22 8H2"/><path d="M22 4v16"/><rect x="6" y="4" width="4" height="4" rx="1"/><path d="M2 8v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8"/></svg>
                      </span>
                      <div>
                        <p className="res-room-name">{res.roomName}</p>
                        <p className="res-room-num">Room #{res.room} · Floor {res.floor}</p>
                      </div>
                      <div style={{ marginLeft: "auto", textAlign: "right" }}>
                        <p style={{ fontSize: "0.68rem", color: "#aaa" }}>Per night</p>
                        <p style={{ fontSize: "0.82rem", fontWeight: 600, color: GOLD }}>MAD {res.price.toLocaleString()}</p>
                      </div>
                    </div>

                    {/* Dates */}
                    <div className="dates-row">
                      <div className="date-block">
                        <p className="date-label">Check-in</p>
                        <p className="date-val">{res.checkin}</p>
                      </div>
                      <div className="nights-sep">
                        <div className="nights-circle">{res.nights}</div>
                        <p className="nights-label">nights</p>
                      </div>
                      <div className="date-block">
                        <p className="date-label">Check-out</p>
                        <p className="date-val">{res.checkout}</p>
                      </div>
                    </div>

                    {/* Total */}
                    <div className="res-total">
                      <span className="res-total-label">Total Stay</span>
                      <span className="res-total-val">MAD {res.total.toLocaleString()}</span>
                    </div>

                    {/* Note */}
                    {res.requests && <div className="res-note">📝 {res.requests}</div>}

                    {/* Actions */}
                    <div className="res-actions" onClick={e => e.stopPropagation()}>
                      {res.status === "confirmed" && <>
                        <button className="action-btn primary" onClick={() => handleCheckIn(res)}>Check In</button>
                        <button className="action-btn secondary">Edit</button>
                        <button className="action-btn danger" onClick={() => handleCancel(res)}>Cancel</button>
                      </>}
                      {res.status === "pending" && <>
                        <button className="action-btn gold" onClick={() => handleConfirm(res)}>Confirm</button>
                        <button className="action-btn secondary">Edit</button>
                        <button className="action-btn danger" onClick={() => handleCancel(res)}>Reject</button>
                      </>}
                      {res.status === "checked-in" && <>
                        <button className="action-btn primary" onClick={() => handleCheckOut(res)}>Check Out</button>
                        <button className="action-btn secondary">Add Service</button>
                      </>}
                      {res.status === "checked-out" && <>
                        <button className="action-btn secondary">View Invoice</button>
                        <button className="action-btn secondary">Re-book</button>
                      </>}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── DETAIL MODAL ── */}
      {selectedRes && (
        <div className={`modal-backdrop ${modalVisible ? "visible" : ""}`} onClick={closeModal}>
          <div className={`modal ${modalVisible ? "visible" : ""}`} onClick={e => e.stopPropagation()}>
            <div className="modal-hero">
              <img src={selectedRes.img} alt={selectedRes.roomName} />
              <button className="modal-close" onClick={closeModal}>✕</button>
              <div className="modal-hero-overlay">
                <div>
                  <p style={{ fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase", color: GOLD, marginBottom: "4px" }}>{selectedRes.id}</p>
                  <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.55rem", color: "white", fontWeight: 300 }}>{selectedRes.guest}</p>
                </div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "6px" }}>
                  <span style={{ background: STATUS_META[selectedRes.status].bg, color: STATUS_META[selectedRes.status].color, padding: "5px 12px", borderRadius: "4px", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" }}>{STATUS_META[selectedRes.status].label}</span>
                  {selectedRes.vip && <span style={{ background: "rgba(184,150,90,0.9)", color: "white", padding: "3px 10px", borderRadius: "3px", fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.1em" }}>⭐ VIP GUEST</span>}
                </div>
              </div>
            </div>

            <div className="modal-body">
              {/* Guest info */}
              <p className="modal-section-title">Guest Information</p>
              <div className="modal-grid">
                <div><p className="modal-info-label">Full Name</p><p className="modal-info-val">{selectedRes.guest}</p></div>
                <div><p className="modal-info-label">Nationality</p><p className="modal-info-val">{selectedRes.nationality}</p></div>
                <div><p className="modal-info-label">Guests</p><p className="modal-info-val">{selectedRes.guests} person{selectedRes.guests > 1 ? "s" : ""}</p></div>
                <div><p className="modal-info-label">Email</p><p className="modal-info-val" style={{ fontSize: "0.78rem" }}>{selectedRes.email}</p></div>
                <div><p className="modal-info-label">Phone</p><p className="modal-info-val" style={{ fontSize: "0.78rem" }}>{selectedRes.phone}</p></div>
                <div><p className="modal-info-label">Source</p><p className="modal-info-val">{selectedRes.source}</p></div>
              </div>

              {/* Stay details */}
              <p className="modal-section-title">Stay Details</p>
              <div className="modal-grid">
                <div><p className="modal-info-label">Room</p><p className="modal-info-val">{selectedRes.roomName} #{selectedRes.room}</p></div>
                <div><p className="modal-info-label">Floor</p><p className="modal-info-val">Floor {selectedRes.floor}</p></div>
                <div><p className="modal-info-label">Duration</p><p className="modal-info-val">{selectedRes.nights} nights</p></div>
                <div><p className="modal-info-label">Check-in</p><p className="modal-info-val">{selectedRes.checkin}</p></div>
                <div><p className="modal-info-label">Check-out</p><p className="modal-info-val">{selectedRes.checkout}</p></div>
                <div><p className="modal-info-label">Booked On</p><p className="modal-info-val">{selectedRes.created}</p></div>
              </div>

              {/* Payment */}
              <p className="modal-section-title">Payment</p>
              <div className="modal-grid">
                <div><p className="modal-info-label">Nightly Rate</p><p className="modal-info-val">MAD {selectedRes.price.toLocaleString()}</p></div>
                <div><p className="modal-info-label">Total Amount</p><p className="modal-info-val" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.2rem" }}>MAD {selectedRes.total.toLocaleString()}</p></div>
                <div><p className="modal-info-label">Payment Status</p><p className="modal-info-val" style={{ color: PAYMENT_META[selectedRes.payment].color }}>{PAYMENT_META[selectedRes.payment].label}</p></div>
              </div>

              {/* Requests */}
              {selectedRes.requests && (
                <>
                  <p className="modal-section-title">Special Requests</p>
                  <p style={{ fontSize: "0.83rem", color: "#6a5a4a", lineHeight: 1.75, padding: "10px 14px", background: "#faf6f0", borderRadius: "5px", borderLeft: `3px solid ${GOLD}` }}>{selectedRes.requests}</p>
                </>
              )}

              {/* Actions */}
              <div className="modal-actions">
                {selectedRes.status === "confirmed" && <>
                  <button className="modal-action-btn" style={{ background: DARK, color: "white" }} onClick={() => handleCheckIn(selectedRes)}>Process Check-In</button>
                  <button className="modal-action-btn" style={{ background: "white", color: DARK, border: "1px solid #ddd" }}>Edit Reservation</button>
                  <button className="modal-action-btn" style={{ background: "rgba(220,38,38,0.08)", color: "#dc2626", border: "1px solid rgba(220,38,38,0.2)" }} onClick={() => handleCancel(selectedRes)}>Cancel</button>
                </>}
                {selectedRes.status === "pending" && <>
                  <button className="modal-action-btn" style={{ background: GOLD, color: "white" }} onClick={() => handleConfirm(selectedRes)}>Confirm Reservation</button>
                  <button className="modal-action-btn" style={{ background: "white", color: DARK, border: "1px solid #ddd" }}>Edit</button>
                  <button className="modal-action-btn" style={{ background: "rgba(220,38,38,0.08)", color: "#dc2626", border: "1px solid rgba(220,38,38,0.2)" }} onClick={() => handleCancel(selectedRes)}>Reject</button>
                </>}
                {selectedRes.status === "checked-in" && <>
                  <button className="modal-action-btn" style={{ background: DARK, color: "white" }} onClick={() => handleCheckOut(selectedRes)}>Process Checkout</button>
                  <button className="modal-action-btn" style={{ background: "rgba(184,150,90,0.1)", color: GOLD, border: `1px solid rgba(184,150,90,0.3)` }}>Add Service</button>
                  <button className="modal-action-btn" style={{ background: "white", color: DARK, border: "1px solid #ddd" }}>View Bill</button>
                </>}
                {selectedRes.status === "checked-out" && <>
                  <button className="modal-action-btn" style={{ background: DARK, color: "white" }}>View Invoice</button>
                  <button className="modal-action-btn" style={{ background: GOLD, color: "white" }}>Re-book Guest</button>
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
function GridIcon(){return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>;}
function CalIcon(){return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>;}
function BedIcon(){return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M2 4v16"/><path d="M22 8H2"/><path d="M22 4v16"/><rect x="6" y="4" width="4" height="4" rx="1"/><path d="M2 8v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8"/></svg>;}
function WrenchIcon(){return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>;}
function ChartIcon(){return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>;}
function StarIcon(){return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>;}
function PeopleIcon(){return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>;}
function ReportIcon(){return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>;}
function LogoutIcon(){return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>;}