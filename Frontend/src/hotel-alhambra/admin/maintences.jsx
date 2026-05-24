// import React, { useState } from "react";
// import { Link } from "react-router-dom";

// const GOLD = "#b8965a";
// const DARK = "#1a1208";

// /* ── MAINTENANCE DATA ── */
// const tickets = [
//   {
//     id: "M-1001",
//     room: 101,
//     title: "Leaking Bathroom Faucet",
//     category: "plumbing",
//     priority: "high",
//     status: "in-progress",
//     reportedBy: "Housekeeping — Fatima Z.",
//     assignedTo: "Ahmed B. (Plumber)",
//     reportedDate: "2026-04-09",
//     completedDate: null as string | null,
//     img: "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=600&q=80",
//     location: "Bathroom",
//     estimatedCost: 1200,
//     description:
//       "Guest reported continuous dripping from the bathroom faucet. Washer replacement likely needed. Water staining visible on sink basin.",
//     note: "Guest requested repair while out for dinner 19:00–21:00. Spare parts in stock.",
//   },
//   {
//     id: "M-1002",
//     room: 205,
//     title: "AC Unit Not Cooling",
//     category: "hvac",
//     priority: "urgent",
//     status: "in-progress",
//     reportedBy: "Guest — Marie Curie",
//     assignedTo: "Karim T. (HVAC Tech)",
//     reportedDate: "2026-04-10",
//     completedDate: null,
//     img: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=600&q=80",
//     location: "Main Room",
//     estimatedCost: 3500,
//     description:
//       "Air conditioning unit blowing warm air. Thermostat unresponsive. Guest is VIP — Suite Junior, staying 3 more nights.",
//     note: "VIP room — priority #1. Portable AC unit placed in room as backup. Compressor may need full replacement.",
//   },
//   {
//     id: "M-1003",
//     room: 304,
//     title: "Broken Window Lock",
//     category: "furniture",
//     priority: "medium",
//     status: "pending",
//     reportedBy: "Security — Night Shift",
//     assignedTo: null as string | null,
//     reportedDate: "2026-04-10",
//     completedDate: null,
//     img: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&q=80",
//     location: "Window — East Wall",
//     estimatedCost: 800,
//     description:
//       "Window lock mechanism broken on east-facing window. Room currently between guests. Security concern — must be fixed before next check-in.",
//     note: "Room 304 is in cleaning status. Lock replacement ordered — expected delivery tomorrow AM.",
//   },
//   {
//     id: "M-1004",
//     room: 102,
//     title: "Electrical Outlet Sparking",
//     category: "electrical",
//     priority: "urgent",
//     status: "pending",
//     reportedBy: "Inspection Team",
//     assignedTo: null,
//     reportedDate: "2026-04-10",
//     completedDate: null,
//     img: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=600&q=80",
//     location: "Near Desk Area",
//     estimatedCost: 2000,
//     description:
//       "During routine inspection, outlet near desk area produced sparks when testing. Outlet immediately disabled at breaker. Room is available — must not be booked until resolved.",
//     note: "SAFETY ISSUE — Room blocked from booking. Electrician scheduled for today 14:00.",
//   },
//   {
//     id: "M-1005",
//     room: 207,
//     title: "Cracked Mirror Replacement",
//     category: "cosmetic",
//     priority: "low",
//     status: "completed",
//     reportedBy: "Housekeeping — Amina K.",
//     assignedTo: "Youssef M. (Maintenance)",
//     reportedDate: "2026-04-07",
//     completedDate: "2026-04-08",
//     img: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=600&q=80",
//     location: "Bathroom Vanity",
//     estimatedCost: 600,
//     description:
//       "Hairline crack discovered on bathroom vanity mirror during deep clean. Guest was notified and offered room change — declined.",
//     note: "Mirror replaced. Guest satisfied with prompt service. Cost covered under maintenance budget.",
//   },
//   {
//     id: "M-1006",
//     room: 302,
//     title: "Door Card Reader Malfunction",
//     category: "electrical",
//     priority: "high",
//     status: "in-progress",
//     reportedBy: "Guest — Sofia Al-Hassan",
//     assignedTo: "Omar F. (Electrician)",
//     reportedDate: "2026-04-10",
//     completedDate: null,
//     img: "https://images.unsplash.com/photo-1558001373-7b93ee48ffa0?w=600&q=80",
//     location: "Room Entrance",
//     estimatedCost: 1800,
//     description:
//       "Electronic door lock failing to read key cards consistently. Guest had to be let in by security twice. Do Not Disturb sign was active.",
//     note: "Temporary mechanical lock installed. New card reader unit ordered. Guest offered complimentary minibar.",
//   },
//   {
//     id: "M-1007",
//     room: 401,
//     title: "Water Damage on Ceiling",
//     category: "plumbing",
//     priority: "high",
//     status: "pending",
//     reportedBy: "Housekeeping — Nadia R.",
//     assignedTo: null,
//     reportedDate: "2026-04-09",
//     completedDate: null,
//     img: "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=600&q=80",
//     location: "Ceiling — Above Bed",
//     estimatedCost: 5000,
//     description:
//       "Yellowish water stain expanding on ceiling directly above the bed. Possible leak from roof terrace above. Anniversary guests in room — cosmetic patch done but root cause unresolved.",
//     note: "Roof inspection scheduled for Monday. Room fully booked through weekend — work only between 10:00–12:00 when guests are out.",
//   },
//   {
//     id: "M-1008",
//     room: 103,
//     title: "Wall Paint Peeling — Hallway Side",
//     category: "cosmetic",
//     priority: "low",
//     status: "completed",
//     reportedBy: "Inspection Team",
//     assignedTo: "Hassan L. (Painter)",
//     reportedDate: "2026-04-05",
//     completedDate: "2026-04-07",
//     img: "https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=600&q=80",
//     location: "Hallway Wall",
//     estimatedCost: 450,
//     description:
//       "Paint peeling near the door frame on the hallway-facing wall. Minor cosmetic issue but visible to guests entering the room.",
//     note: "Repainted and touched up during room turnover. Color matched perfectly with existing palette.",
//   },
//   {
//     id: "M-1009",
//     room: 206,
//     title: "Shower Drain Clogged",
//     category: "plumbing",
//     priority: "medium",
//     status: "pending",
//     reportedBy: "Housekeeping — Fatima Z.",
//     assignedTo: null,
//     reportedDate: "2026-04-10",
//     completedDate: null,
//     img: "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=600&q=80",
//     location: "Shower",
//     estimatedCost: 350,
//     description:
//       "Previous guest complained about slow drainage. Housekeeping confirmed partial blockage. Room is currently available but should not be booked until resolved.",
//     note: "Standard drain cleaning should resolve. Drain snake and chemicals available in maintenance closet.",
//   },
//   {
//     id: "M-1010",
//     room: 301,
//     title: "Jacuzzi Motor Failure",
//     category: "hvac",
//     priority: "medium",
//     status: "completed",
//     reportedBy: "Pre-arrival Inspection",
//     assignedTo: "Karim T. (HVAC Tech)",
//     reportedDate: "2026-04-08",
//     completedDate: "2026-04-09",
//     img: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=600&q=80",
//     location: "Private Plunge Pool Area",
//     estimatedCost: 4200,
//     description:
//       "Jacuzzi jets not activating. Motor humming but not spinning. Premium suite — must be fully operational before any booking.",
//     note: "Motor capacitor replaced. Full test cycle completed — all jets operational. Pre-arrival inspection passed.",
//   },
//   {
//     id: "M-1011",
//     room: 103,
//     title: "Mini-Bar Refrigerator Warm",
//     category: "electrical",
//     priority: "medium",
//     status: "completed",
//     reportedBy: "Housekeeping — Amina K.",
//     assignedTo: "Omar F. (Electrician)",
//     reportedDate: "2026-04-06",
//     completedDate: "2026-04-06",
//     img: "https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=600&q=80",
//     location: "Mini-Bar Cabinet",
//     estimatedCost: 0,
//     description:
//       "Mini-bar items were warm to the touch. Power cable had been accidentally unplugged during room cleaning. Plugged back in and confirmed cooling.",
//     note: "False alarm — cable was simply unplugged. Temperature back to normal within 2 hours. No cost incurred.",
//   },
//   {
//     id: "M-1012",
//     room: 205,
//     title: "Terrace Door Won't Lock",
//     category: "furniture",
//     priority: "high",
//     status: "pending",
//     reportedBy: "Guest — Marie Curie",
//     assignedTo: null,
//     reportedDate: "2026-04-10",
//     completedDate: null,
//     img: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&q=80",
//     location: "Terrace Access Door",
//     estimatedCost: 900,
//     description:
//       "Terrace sliding door lock mechanism jammed. Door can be closed but not locked from inside. Guest concerned about security, especially at night.",
//     note: "Guest is staying until 2026-04-13. Temporary barrel bolt installed. Full lock mechanism replacement needed.",
//   },
// ];

// const STATUS_META: Record<
//   string,
//   { label: string; color: string; bg: string }
// > = {
//   pending: { label: "Pending", color: "#d97706", bg: "rgba(217,119,6,0.1)" },
//   "in-progress": {
//     label: "In Progress",
//     color: "#2563eb",
//     bg: "rgba(37,99,235,0.1)",
//   },
//   completed: { label: "Completed", color: "#16a34a", bg: "rgba(22,163,74,0.1)" },
// };

// const PRIORITY_META: Record<
//   string,
//   { label: string; color: string; bg: string }
// > = {
//   urgent: { label: "Urgent", color: "#dc2626", bg: "rgba(220,38,38,0.1)" },
//   high: { label: "High", color: "#d97706", bg: "rgba(217,119,6,0.1)" },
//   medium: { label: "Medium", color: "#2563eb", bg: "rgba(37,99,235,0.1)" },
//   low: { label: "Low", color: "#6b7280", bg: "rgba(107,114,128,0.1)" },
// };

// const CATEGORY_META: Record<string, { label: string; icon: string }> = {
//   plumbing: { label: "Plumbing", icon: "🔧" },
//   electrical: { label: "Electrical", icon: "⚡" },
//   hvac: { label: "HVAC", icon: "❄️" },
//   furniture: { label: "Furniture", icon: "🪑" },
//   cosmetic: { label: "Cosmetic", icon: "🎨" },
// };

// type Ticket = (typeof tickets)[number];

// /* ── NAV CONFIG ── */
// const NAV_ITEMS = [
//   { icon: <GridIcon />, label: "Overview", to: "/dashboard", active: false },
//   { icon: <CalIcon />, label: "Reservations", to: "/reservation", active: false },
//   { icon: <BedIcon />, label: "Chambres", to: "/chambres", active: false },
//   { icon: <WrenchIcon />, label: "Maintenance", to: "/maintenance", active: true },
// ];

// export default function Maintenance() {
//   const [filter, setFilter] = useState("all");
//   const [search, setSearch] = useState("");
//   const [categoryFilter, setCategoryFilter] = useState("all");
//   const [priorityFilter, setPriorityFilter] = useState("all");
//   const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
//   const [modalVisible, setModalVisible] = useState(false);

//   const openModal = (ticket: Ticket) => {
//     setSelectedTicket(ticket);
//     setTimeout(() => setModalVisible(true), 10);
//   };
//   const closeModal = () => {
//     setModalVisible(false);
//     setTimeout(() => setSelectedTicket(null), 300);
//   };

//   const counts: Record<string, number> = {
//     all: tickets.length,
//     pending: tickets.filter((t) => t.status === "pending").length,
//     "in-progress": tickets.filter((t) => t.status === "in-progress").length,
//     completed: tickets.filter((t) => t.status === "completed").length,
//   };

//   const totalCost = tickets.reduce((a, t) => a + t.estimatedCost, 0);
//   const pendingCost = tickets
//     .filter((t) => t.status !== "completed")
//     .reduce((a, t) => a + t.estimatedCost, 0);

//   const filtered = tickets.filter((t) => {
//     const matchFilter = filter === "all" || t.status === filter;
//     const matchCategory = categoryFilter === "all" || t.category === categoryFilter;
//     const matchPriority = priorityFilter === "all" || t.priority === priorityFilter;
//     const matchSearch =
//       search === "" ||
//       t.title.toLowerCase().includes(search.toLowerCase()) ||
//       t.id.toLowerCase().includes(search.toLowerCase()) ||
//       String(t.room).includes(search) ||
//       (t.assignedTo &&
//         t.assignedTo.toLowerCase().includes(search.toLowerCase())) ||
//       (t.reportedBy &&
//         t.reportedBy.toLowerCase().includes(search.toLowerCase()));
//     return matchFilter && matchCategory && matchPriority && matchSearch;
//   });

//   return (
//     <React.Fragment>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,400&family=Jost:wght@300;400;500;600&display=swap');
//         *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
//         body { font-family: 'Jost', sans-serif; background: #f4efe6; color: ${DARK}; }

//         /* ── LAYOUT ── */
//         .dash-wrap { display: flex; min-height: 100vh; }

//         /* ── SIDEBAR ── */
//         .sidebar {
//           width: 240px; flex-shrink: 0;
//           background: ${DARK};
//           display: flex; flex-direction: column;
//           position: fixed; top: 0; left: 0; bottom: 0;
//           z-index: 100;
//         }
//         .sidebar-logo {
//           padding: 1.8rem 1.6rem 1.4rem;
//           border-bottom: 1px solid rgba(184,150,90,0.15);
//         }
//         .sidebar-logo-text {
//           font-family: 'Cormorant Garamond', serif;
//           font-size: 1.25rem; color: white; letter-spacing: 0.14em;
//         }
//         .sidebar-logo-sub {
//           font-size: 0.6rem; letter-spacing: 0.2em; text-transform: uppercase;
//           color: ${GOLD}; margin-top: 3px;
//         }
//         .sidebar-nav { flex: 1; padding: 1.2rem 0; }
//         .nav-section-label {
//           font-size: 0.55rem; letter-spacing: 0.25em; text-transform: uppercase;
//           color: rgba(255,255,255,0.25); padding: 0 1.6rem; margin: 1rem 0 0.4rem;
//         }
//         .nav-item {
//           display: flex; align-items: center; gap: 12px;
//           padding: 11px 1.6rem; cursor: pointer; text-decoration: none;
//           color: rgba(255,255,255,0.55); font-size: 0.82rem; letter-spacing: 0.04em;
//           transition: all 0.2s; border-left: 3px solid transparent;
//           position: relative;
//         }
//         .nav-item:hover { color: white; background: rgba(255,255,255,0.04); }
//         .nav-item.active {
//           color: white; background: rgba(184,150,90,0.12);
//           border-left-color: ${GOLD};
//         }
//         .nav-item svg { flex-shrink: 0; opacity: 0.7; }
//         .nav-item.active svg { opacity: 1; }
//         .nav-badge {
//           margin-left: auto; background: ${GOLD}; color: white;
//           font-size: 0.6rem; padding: 2px 7px; border-radius: 10px; font-weight: 600;
//         }
//         .sidebar-footer {
//           padding: 1.2rem 1.6rem;
//           border-top: 1px solid rgba(255,255,255,0.06);
//         }
//         .user-row { display: flex; align-items: center; gap: 10px; }
//         .user-avatar {
//           width: 36px; height: 36px; border-radius: 50%;
//           background: rgba(184,150,90,0.2); border: 1px solid rgba(184,150,90,0.4);
//           display: flex; align-items: center; justify-content: center;
//           font-family: 'Cormorant Garamond', serif; font-size: 0.95rem; color: ${GOLD};
//         }
//         .user-name { font-size: 0.82rem; color: white; font-weight: 500; }
//         .user-role { font-size: 0.65rem; color: rgba(255,255,255,0.4); letter-spacing: 0.06em; }
//         .logout-btn {
//           display: flex; align-items: center; gap: 8px;
//           margin-top: 1rem; padding: 9px 0;
//           color: rgba(255,255,255,0.35); font-size: 0.75rem;
//           cursor: pointer; border: none; background: none;
//           font-family: 'Jost', sans-serif; letter-spacing: 0.06em;
//           transition: color 0.2s;
//         }
//         .logout-btn:hover { color: #ef4444; }

//         /* ── MAIN ── */
//         .main { margin-left: 240px; flex: 1; display: flex; flex-direction: column; }

//         /* ── TOPBAR ── */
//         .topbar {
//           background: white; border-bottom: 1px solid rgba(184,150,90,0.15);
//           padding: 0 2rem; height: 64px;
//           display: flex; align-items: center; justify-content: space-between;
//           position: sticky; top: 0; z-index: 90;
//         }
//         .topbar-left h1 {
//           font-family: 'Cormorant Garamond', serif;
//           font-size: 1.35rem; font-weight: 400; letter-spacing: 0.06em;
//         }
//         .topbar-left p { font-size: 0.72rem; color: #aaa; margin-top: 1px; }
//         .topbar-right { display: flex; align-items: center; gap: 1rem; }
//         .search-wrap { position: relative; }
//         .search-input {
//           padding: 9px 16px 9px 38px;
//           font-family: 'Jost', sans-serif; font-size: 0.82rem;
//           border: 1px solid #e5ddd2; border-radius: 4px;
//           background: #faf6f0; outline: none; width: 220px;
//           transition: border-color 0.2s, box-shadow 0.2s;
//           color: ${DARK};
//         }
//         .search-input:focus { border-color: ${GOLD}; box-shadow: 0 0 0 3px rgba(184,150,90,0.1); }
//         .search-input::placeholder { color: #bbb; }
//         .search-icon {
//           position: absolute; left: 12px; top: 50%; transform: translateY(-50%);
//           color: #bbb; pointer-events: none;
//         }
//         .topbar-icon-btn {
//           width: 38px; height: 38px; border-radius: 50%;
//           border: 1px solid #e5ddd2; background: white;
//           display: flex; align-items: center; justify-content: center;
//           cursor: pointer; color: #888; transition: all 0.2s;
//           position: relative;
//         }
//         .topbar-icon-btn:hover { border-color: ${GOLD}; color: ${GOLD}; }
//         .notif-dot {
//           position: absolute; top: 6px; right: 6px;
//           width: 8px; height: 8px; border-radius: 50%;
//           background: #ef4444; border: 2px solid white;
//         }
//         .admin-chip {
//           display: flex; align-items: center; gap: 8px;
//           padding: 6px 14px; border-radius: 4px;
//           background: rgba(184,150,90,0.08); border: 1px solid rgba(184,150,90,0.2);
//         }
//         .admin-chip-dot { width: 7px; height: 7px; border-radius: 50%; background: ${GOLD}; }
//         .admin-chip-text { font-size: 0.75rem; font-weight: 600; color: ${DARK}; letter-spacing: 0.06em; }

//         /* ── KPI STRIP ── */
//         .kpi-strip {
//           display: grid; grid-template-columns: repeat(5, 1fr); gap: 1rem;
//           padding: 1.5rem 2rem;
//         }
//         .kpi-card {
//           background: white; border-radius: 8px; padding: 1.2rem 1.4rem;
//           border: 1px solid rgba(184,150,90,0.12);
//           transition: transform 0.2s, box-shadow 0.2s;
//           animation: fadeUp 0.6s both;
//         }
//         .kpi-card:hover { transform: translateY(-2px); box-shadow: 0 8px 28px rgba(26,18,8,0.08); }
//         .kpi-card:nth-child(1) { animation-delay: 0.05s; }
//         .kpi-card:nth-child(2) { animation-delay: 0.1s; }
//         .kpi-card:nth-child(3) { animation-delay: 0.15s; }
//         .kpi-card:nth-child(4) { animation-delay: 0.2s; }
//         .kpi-card:nth-child(5) { animation-delay: 0.25s; }
//         @keyframes fadeUp {
//           from { opacity: 0; transform: translateY(16px); }
//           to   { opacity: 1; transform: translateY(0); }
//         }
//         .kpi-icon {
//           width: 36px; height: 36px; border-radius: 8px;
//           display: flex; align-items: center; justify-content: center;
//           margin-bottom: 0.9rem; font-size: 1rem;
//         }
//         .kpi-val {
//           font-family: 'Cormorant Garamond', serif;
//           font-size: 1.9rem; font-weight: 400; line-height: 1;
//           margin-bottom: 4px;
//         }
//         .kpi-label { font-size: 0.68rem; color: #aaa; letter-spacing: 0.1em; text-transform: uppercase; }
//         .kpi-trend { font-size: 0.7rem; margin-top: 6px; display: flex; align-items: center; gap: 4px; }

//         /* ── FILTER BAR ── */
//         .filter-bar {
//           padding: 0 2rem 1.2rem;
//           display: flex; align-items: center; gap: 0.7rem; flex-wrap: wrap;
//         }
//         .filter-btn {
//           padding: 8px 18px; border-radius: 4px;
//           border: 1px solid rgba(184,150,90,0.25);
//           background: white; font-family: 'Jost', sans-serif;
//           font-size: 0.75rem; letter-spacing: 0.06em;
//           cursor: pointer; color: #7a6a58; transition: all 0.2s;
//           display: flex; align-items: center; gap: 7px;
//         }
//         .filter-btn:hover { border-color: ${GOLD}; color: ${DARK}; }
//         .filter-btn.active { background: ${DARK}; color: white; border-color: ${DARK}; }
//         .filter-btn .dot { width: 7px; height: 7px; border-radius: 50%; }
//         .filter-count {
//           background: rgba(255,255,255,0.2); padding: 1px 7px;
//           border-radius: 10px; font-size: 0.65rem; font-weight: 600;
//         }
//         .filter-btn:not(.active) .filter-count { background: rgba(184,150,90,0.12); color: ${GOLD}; }
//         .filter-sep { width: 1px; height: 28px; background: rgba(184,150,90,0.2); margin: 0 4px; }
//         .filter-select {
//           padding: 8px 14px; border-radius: 4px;
//           border: 1px solid rgba(184,150,90,0.25);
//           background: white; font-family: 'Jost', sans-serif;
//           font-size: 0.75rem; color: #7a6a58; outline: none; cursor: pointer;
//           transition: border-color 0.2s;
//         }
//         .filter-select:focus { border-color: ${GOLD}; }

//         /* ── GRID ── */
//         .tickets-grid {
//           display: grid;
//           grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
//           gap: 1.2rem; padding: 0 2rem 3rem;
//         }

//         /* ── TICKET CARD ── */
//         .ticket-card {
//           background: white; border-radius: 10px; overflow: hidden;
//           border: 1px solid rgba(184,150,90,0.12);
//           box-shadow: 0 2px 12px rgba(26,18,8,0.04);
//           transition: transform 0.25s, box-shadow 0.25s;
//           animation: fadeUp 0.5s both;
//           cursor: pointer;
//         }
//         .ticket-card:hover { transform: translateY(-4px); box-shadow: 0 12px 36px rgba(26,18,8,0.12); }
//         .ticket-card:nth-child(1)  { animation-delay: 0.05s; }
//         .ticket-card:nth-child(2)  { animation-delay: 0.10s; }
//         .ticket-card:nth-child(3)  { animation-delay: 0.15s; }
//         .ticket-card:nth-child(4)  { animation-delay: 0.20s; }
//         .ticket-card:nth-child(5)  { animation-delay: 0.25s; }
//         .ticket-card:nth-child(6)  { animation-delay: 0.30s; }
//         .ticket-card:nth-child(7)  { animation-delay: 0.35s; }
//         .ticket-card:nth-child(8)  { animation-delay: 0.40s; }
//         .ticket-card:nth-child(9)  { animation-delay: 0.45s; }
//         .ticket-card:nth-child(10) { animation-delay: 0.50s; }
//         .ticket-card:nth-child(11) { animation-delay: 0.55s; }
//         .ticket-card:nth-child(12) { animation-delay: 0.60s; }

//         .ticket-img-wrap { position: relative; height: 170px; overflow: hidden; }
//         .ticket-img-wrap img {
//           width: 100%; height: 100%; object-fit: cover;
//           transition: transform 0.5s ease;
//         }
//         .ticket-card:hover .ticket-img-wrap img { transform: scale(1.05); }
//         .ticket-id-badge {
//           position: absolute; top: 12px; left: 12px;
//           background: rgba(26,18,8,0.7); color: white;
//           font-size: 0.65rem; font-weight: 600; letter-spacing: 0.08em;
//           padding: 4px 10px; border-radius: 4px; backdrop-filter: blur(4px);
//         }
//         .status-badge {
//           position: absolute; top: 12px; right: 12px;
//           font-size: 0.58rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase;
//           padding: 4px 10px; border-radius: 4px; backdrop-filter: blur(4px);
//         }
//         .priority-badge {
//           position: absolute; bottom: 12px; left: 12px;
//           font-size: 0.55rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase;
//           padding: 3px 9px; border-radius: 3px; backdrop-filter: blur(4px);
//         }
//         .room-badge {
//           position: absolute; bottom: 12px; right: 12px;
//           background: rgba(184,150,90,0.9); color: white;
//           font-size: 0.68rem; font-weight: 700; padding: 4px 10px; border-radius: 4px;
//           backdrop-filter: blur(4px);
//         }

//         .ticket-body { padding: 1.2rem; }
//         .ticket-category-tag {
//           font-size: 0.58rem; letter-spacing: 0.2em; text-transform: uppercase;
//           color: ${GOLD}; margin-bottom: 3px;
//           display: flex; align-items: center; gap: 4px;
//         }
//         .ticket-title {
//           font-family: 'Cormorant Garamond', serif;
//           font-size: 1.15rem; font-weight: 400; margin-bottom: 6px;
//         }
//         .ticket-meta {
//           display: flex; flex-wrap: wrap; gap: 5px; margin-bottom: 10px;
//         }
//         .meta-chip {
//           font-size: 0.65rem; color: #7a6a58;
//           background: #f8f3ec; padding: 3px 9px; border-radius: 3px;
//           border: 1px solid rgba(184,150,90,0.15);
//           display: flex; align-items: center; gap: 4px;
//         }
//         .ticket-desc {
//           font-size: 0.72rem; color: #9a8a7a; line-height: 1.55;
//           padding: 8px 10px; background: #faf6f0; border-radius: 4px;
//           border-left: 2px solid rgba(184,150,90,0.4);
//           margin-bottom: 12px;
//           display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden;
//         }
//         .assigned-row {
//           display: flex; align-items: center; gap: 9px;
//           padding: 8px 10px; background: rgba(37,99,235,0.04);
//           border-radius: 4px; margin-bottom: 12px;
//           border: 1px solid rgba(37,99,235,0.1);
//         }
//         .assigned-avatar {
//           width: 28px; height: 28px; border-radius: 50%;
//           background: rgba(37,99,235,0.1);
//           display: flex; align-items: center; justify-content: center;
//           font-size: 0.65rem; font-weight: 600; color: #2563eb; flex-shrink: 0;
//         }
//         .assigned-name { font-size: 0.78rem; font-weight: 500; }
//         .assigned-date { font-size: 0.65rem; color: #aaa; margin-top: 1px; }
//         .unassigned-row {
//           display: flex; align-items: center; gap: 9px;
//           padding: 8px 10px; background: rgba(220,38,38,0.04);
//           border-radius: 4px; margin-bottom: 12px;
//           border: 1px solid rgba(220,38,38,0.1);
//         }
//         .unassigned-icon {
//           width: 28px; height: 28px; border-radius: 50%;
//           background: rgba(220,38,38,0.1);
//           display: flex; align-items: center; justify-content: center;
//           font-size: 0.65rem; font-weight: 600; color: #dc2626; flex-shrink: 0;
//         }
//         .unassigned-text { font-size: 0.78rem; font-weight: 500; color: #dc2626; }
//         .unassigned-sub { font-size: 0.65rem; color: #aaa; margin-top: 1px; }
//         .ticket-note {
//           font-size: 0.72rem; color: #6a5a4a; line-height: 1.55;
//           padding: 8px 10px; background: #faf6f0; border-radius: 4px;
//           border-left: 2px solid rgba(184,150,90,0.4);
//           margin-bottom: 12px;
//           display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;
//         }
//         .ticket-actions { display: flex; gap: 8px; }
//         .action-btn {
//           flex: 1; padding: 9px 12px; border-radius: 4px; border: none;
//           font-family: 'Jost', sans-serif; font-size: 0.7rem; font-weight: 600;
//           letter-spacing: 0.08em; text-transform: uppercase; cursor: pointer;
//           transition: all 0.2s;
//         }
//         .action-btn.primary { background: ${DARK}; color: white; }
//         .action-btn.primary:hover { background: ${GOLD}; }
//         .action-btn.secondary { background: white; color: #7a6a58; border: 1px solid rgba(184,150,90,0.25); }
//         .action-btn.secondary:hover { border-color: ${GOLD}; color: ${DARK}; }
//         .action-btn.gold { background: ${GOLD}; color: white; }
//         .action-btn.gold:hover { background: #a07a45; }
//         .action-btn.success { background: rgba(22,163,74,0.08); color: #16a34a; border: 1px solid rgba(22,163,74,0.2); }
//         .action-btn.success:hover { background: rgba(22,163,74,0.15); }

//         /* ── MODAL ── */
//         .modal-backdrop {
//           position: fixed; inset: 0; z-index: 500;
//           background: rgba(26,18,8,0);
//           display: flex; align-items: center; justify-content: center;
//           padding: 1.5rem;
//           transition: background 0.3s ease;
//           pointer-events: none;
//         }
//         .modal-backdrop.visible { background: rgba(26,18,8,0.65); pointer-events: all; }
//         .modal {
//           background: white; border-radius: 12px;
//           max-width: 720px; width: 100%;
//           max-height: 90vh; overflow-y: auto;
//           opacity: 0; transform: translateY(30px) scale(0.97);
//           transition: opacity 0.3s, transform 0.3s;
//         }
//         .modal.visible { opacity: 1; transform: translateY(0) scale(1); }
//         .modal-hero { position: relative; height: 240px; }
//         .modal-hero img { width: 100%; height: 100%; object-fit: cover; }
//         .modal-hero-overlay {
//           position: absolute; inset: 0;
//           background: linear-gradient(to top, rgba(26,18,8,0.75), transparent);
//           display: flex; align-items: flex-end; padding: 1.5rem;
//         }
//         .modal-close {
//           position: absolute; top: 1rem; right: 1rem;
//           background: rgba(26,18,8,0.5); color: white; border: none;
//           width: 34px; height: 34px; border-radius: 50%; font-size: 1rem;
//           cursor: pointer; display: flex; align-items: center; justify-content: center;
//           transition: background 0.2s;
//         }
//         .modal-close:hover { background: rgba(26,18,8,0.85); }
//         .modal-body { padding: 2rem; }
//         .modal-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; margin-bottom: 1.5rem; }
//         .modal-info-label { font-size: 0.58rem; letter-spacing: 0.18em; text-transform: uppercase; color: ${GOLD}; margin-bottom: 4px; }
//         .modal-info-val { font-size: 0.9rem; color: ${DARK}; font-weight: 500; }
//         .modal-section-title {
//           font-size: 0.62rem; letter-spacing: 0.2em; text-transform: uppercase;
//           color: ${GOLD}; margin-bottom: 10px; padding-top: 1.2rem;
//           border-top: 1px solid rgba(184,150,90,0.15);
//         }
//         .modal-actions { display: flex; gap: 10px; margin-top: 1.5rem; }
//         .modal-action-btn {
//           flex: 1; padding: 12px; border-radius: 5px; border: none;
//           font-family: 'Jost', sans-serif; font-size: 0.75rem; font-weight: 600;
//           letter-spacing: 0.1em; text-transform: uppercase; cursor: pointer; transition: all 0.2s;
//         }

//         /* ── EMPTY STATE ── */
//         .empty-state { grid-column: 1 / -1; text-align: center; padding: 4rem 2rem; }
//         .empty-icon { font-size: 2.5rem; margin-bottom: 1rem; opacity: 0.3; }
//         .empty-text { font-size: 0.88rem; color: #aaa; }

//         @media (max-width: 900px) {
//           .sidebar { width: 64px; }
//           .sidebar-logo-text, .sidebar-logo-sub, .nav-item span, .user-name, .user-role, .logout-btn span, .nav-section-label { display: none; }
//           .nav-item { justify-content: center; padding: 14px; }
//           .main { margin-left: 64px; }
//           .kpi-strip { grid-template-columns: repeat(3, 1fr); }
//         }
//         @media (max-width: 600px) {
//           .kpi-strip { grid-template-columns: 1fr 1fr; }
//           .modal-grid { grid-template-columns: 1fr; }
//         }
//       `}</style>

//       <div className="dash-wrap">
//         {/* ── SIDEBAR ── */}
//         <aside className="sidebar">
//           <div className="sidebar-logo">
//             <p className="sidebar-logo-text">✦ ALHAMBRA</p>
//             <p className="sidebar-logo-sub">Administration</p>
//           </div>
//           <nav className="sidebar-nav">
//             <p className="nav-section-label">Main Menu</p>
//             {NAV_ITEMS.map((item, i) => (
//               <Link
//                 key={i}
//                 to={item.to}
//                 className={`nav-item ${item.active ? "active" : ""}`}
//               >
//                 {item.icon}
//                 <span>{item.label}</span>
//                 {item.label === "Maintenance" && (
//                   <span className="nav-badge">{counts.pending}</span>
//                 )}
//               </Link>
//             ))}
//             <p className="nav-section-label" style={{ marginTop: "1.5rem" }}>
//               Operations
//             </p>
//             <Link to="/reports" className="nav-item">
//               <ReportIcon />
//               <span>Reports</span>
//             </Link>
//           </nav>
//           <div className="sidebar-footer">
//             <div className="user-row">
//               <div className="user-avatar">A</div>
//               <div>
//                 <p className="user-name">Admin</p>
//                 <p className="user-role">Maintenance Manager</p>
//               </div>
//             </div>
//             <button className="logout-btn">
//               <LogoutIcon />
//               <span>Log Out</span>
//             </button>
//           </div>
//         </aside>

//         {/* ── MAIN ── */}
//         <div className="main">
//           {/* TOPBAR */}
//           <div className="topbar">
//             <div className="topbar-left">
//               <h1>Maintenance Dashboard</h1>
//               <p>Vendredi 10 Avril 2026 · Tanger</p>
//             </div>
//             <div className="topbar-right">
//               <div className="search-wrap">
//                 <svg
//                   className="search-icon"
//                   width="14"
//                   height="14"
//                   viewBox="0 0 24 24"
//                   fill="none"
//                   stroke="currentColor"
//                   strokeWidth="2"
//                 >
//                   <circle cx="11" cy="11" r="8" />
//                   <path d="m21 21-4.35-4.35" />
//                 </svg>
//                 <input
//                   className="search-input"
//                   placeholder="Search ticket, room, staff…"
//                   value={search}
//                   onChange={(e) => setSearch(e.target.value)}
//                 />
//               </div>
//               <button className="topbar-icon-btn">
//                 <svg
//                   width="16"
//                   height="16"
//                   viewBox="0 0 24 24"
//                   fill="none"
//                   stroke="currentColor"
//                   strokeWidth="2"
//                 >
//                   <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
//                   <path d="M13.73 21a2 2 0 0 1-3.46 0" />
//                 </svg>
//                 <span className="notif-dot" />
//               </button>
//               <button className="topbar-icon-btn">
//                 <svg
//                   width="16"
//                   height="16"
//                   viewBox="0 0 24 24"
//                   fill="none"
//                   stroke="currentColor"
//                   strokeWidth="2"
//                 >
//                   <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
//                 </svg>
//               </button>
//               <div className="admin-chip">
//                 <div className="admin-chip-dot" />
//                 <span className="admin-chip-text">ADMIN</span>
//               </div>
//             </div>
//           </div>

//           {/* KPI STRIP */}
//           <div className="kpi-strip">
//             <div className="kpi-card">
//               <div
//                 className="kpi-icon"
//                 style={{ background: "rgba(184,150,90,0.1)" }}
//               >
//                 🔧
//               </div>
//               <div className="kpi-val">{tickets.length}</div>
//               <div className="kpi-label">Total Tickets</div>
//               <div className="kpi-trend" style={{ color: "#aaa" }}>
//                 All categories
//               </div>
//             </div>
//             <div className="kpi-card">
//               <div
//                 className="kpi-icon"
//                 style={{ background: "rgba(217,119,6,0.08)" }}
//               >
//                 ⏳
//               </div>
//               <div className="kpi-val" style={{ color: "#d97706" }}>
//                 {counts.pending}
//               </div>
//               <div className="kpi-label">Pending</div>
//               <div className="kpi-trend" style={{ color: "#d97706" }}>
//                 Awaiting assignment
//               </div>
//             </div>
//             <div className="kpi-card">
//               <div
//                 className="kpi-icon"
//                 style={{ background: "rgba(37,99,235,0.08)" }}
//               >
//                 🔨
//               </div>
//               <div className="kpi-val" style={{ color: "#2563eb" }}>
//                 {counts["in-progress"]}
//               </div>
//               <div className="kpi-label">In Progress</div>
//               <div className="kpi-trend" style={{ color: "#2563eb" }}>
//                 Being repaired
//               </div>
//             </div>
//             <div className="kpi-card">
//               <div
//                 className="kpi-icon"
//                 style={{ background: "rgba(22,163,74,0.08)" }}
//               >
//                 ✅
//               </div>
//               <div className="kpi-val" style={{ color: "#16a34a" }}>
//                 {counts.completed}
//               </div>
//               <div className="kpi-label">Completed</div>
//               <div className="kpi-trend" style={{ color: "#16a34a" }}>
//                 Resolved issues
//               </div>
//             </div>
//             <div className="kpi-card">
//               <div
//                 className="kpi-icon"
//                 style={{ background: "rgba(184,150,90,0.1)" }}
//               >
//                 💰
//               </div>
//               <div className="kpi-val" style={{ fontSize: "1.4rem" }}>
//                 MAD {(totalCost / 1000).toFixed(1)}k
//               </div>
//               <div className="kpi-label">Total Est. Cost</div>
//               <div className="kpi-trend" style={{ color: "#d97706" }}>
//                 MAD {(pendingCost / 1000).toFixed(1)}k open
//               </div>
//             </div>
//           </div>

//           {/* FILTER BAR */}
//           <div className="filter-bar">
//             {[
//               { key: "all", label: "All Tickets", dot: GOLD },
//               { key: "pending", label: "Pending", dot: "#d97706" },
//               { key: "in-progress", label: "In Progress", dot: "#2563eb" },
//               { key: "completed", label: "Completed", dot: "#16a34a" },
//             ].map((f) => (
//               <button
//                 key={f.key}
//                 className={`filter-btn ${filter === f.key ? "active" : ""}`}
//                 onClick={() => setFilter(f.key)}
//               >
//                 <span
//                   className="dot"
//                   style={{
//                     background:
//                       filter === f.key ? "rgba(255,255,255,0.6)" : f.dot,
//                   }}
//                 />
//                 {f.label}
//                 <span className="filter-count">{counts[f.key]}</span>
//               </button>
//             ))}
//             <div className="filter-sep" />
//             <select
//               className="filter-select"
//               value={categoryFilter}
//               onChange={(e) => setCategoryFilter(e.target.value)}
//             >
//               <option value="all">All Categories</option>
//               {Object.entries(CATEGORY_META).map(([key, meta]) => (
//                 <option key={key} value={key}>
//                   {meta.icon} {meta.label}
//                 </option>
//               ))}
//             </select>
//             <select
//               className="filter-select"
//               value={priorityFilter}
//               onChange={(e) => setPriorityFilter(e.target.value)}
//             >
//               <option value="all">All Priorities</option>
//               {Object.entries(PRIORITY_META).map(([key, meta]) => (
//                 <option key={key} value={key}>
//                   {meta.label}
//                 </option>
//               ))}
//             </select>
//           </div>

//           {/* TICKETS GRID */}
//           <div className="tickets-grid">
//             {filtered.length === 0 && (
//               <div className="empty-state">
//                 <div className="empty-icon">🔧</div>
//                 <p className="empty-text">
//                   No maintenance tickets match your filters.
//                 </p>
//               </div>
//             )}
//             {filtered.map((ticket) => {
//               const sm = STATUS_META[ticket.status];
//               const pm = PRIORITY_META[ticket.priority];
//               const cm = CATEGORY_META[ticket.category];
//               const assignedInitials = ticket.assignedTo
//                 ? ticket.assignedTo
//                     .split(" ")
//                     .filter((_, i) => i === 0 || i === 1)
//                     .map((n) => n[0])
//                     .join("")
//                     .replace("(", "")
//                     .replace(")", "")
//                 : "";

//               return (
//                 <div
//                   className="ticket-card"
//                   key={ticket.id}
//                   onClick={() => openModal(ticket)}
//                 >
//                   <div className="ticket-img-wrap">
//                     <img src={ticket.img} alt={ticket.title} />
//                     <span className="ticket-id-badge">{ticket.id}</span>
//                     <span
//                       className="status-badge"
//                       style={{ background: sm.bg, color: sm.color }}
//                     >
//                       {sm.label}
//                     </span>
//                     <span
//                       className="priority-badge"
//                       style={{ background: pm.bg, color: pm.color }}
//                     >
//                       {pm.label}
//                     </span>
//                     <span className="room-badge">Room {ticket.room}</span>
//                   </div>
//                   <div className="ticket-body">
//                     <p className="ticket-category-tag">
//                       {cm.icon} {cm.label} · {ticket.location}
//                     </p>
//                     <h3 className="ticket-title">{ticket.title}</h3>
//                     <div className="ticket-meta">
//                       <span className="meta-chip">
//                         📅 {ticket.reportedDate}
//                       </span>
//                       <span className="meta-chip">
//                         💰 MAD {ticket.estimatedCost.toLocaleString()}
//                       </span>
//                     </div>
//                     <div className="ticket-desc">{ticket.description}</div>
//                     {ticket.assignedTo ? (
//                       <div className="assigned-row">
//                         <div className="assigned-avatar">
//                           {assignedInitials}
//                         </div>
//                         <div>
//                           <p className="assigned-name">{ticket.assignedTo}</p>
//                           <p className="assigned-date">
//                             Assigned · Reported {ticket.reportedDate}
//                           </p>
//                         </div>
//                       </div>
//                     ) : (
//                       <div className="unassigned-row">
//                         <div className="unassigned-icon">!</div>
//                         <div>
//                           <p className="unassigned-text">Unassigned</p>
//                           <p className="unassigned-sub">
//                             Needs staff assignment
//                           </p>
//                         </div>
//                       </div>
//                     )}
//                     <div className="ticket-note">{ticket.note}</div>
//                     <div
//                       className="ticket-actions"
//                       onClick={(e) => e.stopPropagation()}
//                     >
//                       {ticket.status === "pending" && (
//                         <React.Fragment>
//                           <button className="action-btn primary">
//                             Assign Staff
//                           </button>
//                           <button className="action-btn secondary">
//                             Details
//                           </button>
//                         </React.Fragment>
//                       )}
//                       {ticket.status === "in-progress" && (
//                         <React.Fragment>
//                           <button className="action-btn success">
//                             Mark Done
//                           </button>
//                           <button className="action-btn secondary">
//                             Update
//                           </button>
//                         </React.Fragment>
//                       )}
//                       {ticket.status === "completed" && (
//                         <React.Fragment>
//                           <button className="action-btn secondary">
//                             View Report
//                           </button>
//                           <button className="action-btn gold">Reopen</button>
//                         </React.Fragment>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       </div>

//       {/* ── MODAL ── */}
//       {selectedTicket && (
//         <div
//           className={`modal-backdrop ${modalVisible ? "visible" : ""}`}
//           onClick={closeModal}
//         >
//           <div
//             className={`modal ${modalVisible ? "visible" : ""}`}
//             onClick={(e) => e.stopPropagation()}
//           >
//             <div className="modal-hero">
//               <img src={selectedTicket.img} alt={selectedTicket.title} />
//               <button className="modal-close" onClick={closeModal}>
//                 ✕
//               </button>
//               <div className="modal-hero-overlay">
//                 <div>
//                   <p
//                     style={{
//                       fontSize: "0.6rem",
//                       letterSpacing: "0.2em",
//                       textTransform: "uppercase",
//                       color: GOLD,
//                       marginBottom: "4px",
//                     }}
//                   >
//                     {selectedTicket.id} · Room {selectedTicket.room}
//                   </p>
//                   <p
//                     style={{
//                       fontFamily: "'Cormorant Garamond', serif",
//                       fontSize: "1.6rem",
//                       color: "white",
//                       fontWeight: 300,
//                     }}
//                   >
//                     {selectedTicket.title}
//                   </p>
//                 </div>
//                 <span
//                   style={{
//                     marginLeft: "auto",
//                     background: STATUS_META[selectedTicket.status].bg,
//                     color: STATUS_META[selectedTicket.status].color,
//                     padding: "6px 14px",
//                     borderRadius: "5px",
//                     fontSize: "0.72rem",
//                     fontWeight: 700,
//                     letterSpacing: "0.1em",
//                     textTransform: "uppercase",
//                   }}
//                 >
//                   {STATUS_META[selectedTicket.status].label}
//                 </span>
//               </div>
//             </div>
//             <div className="modal-body">
//               <div className="modal-grid">
//                 <div>
//                   <p className="modal-info-label">Category</p>
//                   <p className="modal-info-val">
//                     {CATEGORY_META[selectedTicket.category].icon}{" "}
//                     {CATEGORY_META[selectedTicket.category].label}
//                   </p>
//                 </div>
//                 <div>
//                   <p className="modal-info-label">Priority</p>
//                   <p
//                     className="modal-info-val"
//                     style={{
//                       color: PRIORITY_META[selectedTicket.priority].color,
//                     }}
//                   >
//                     {PRIORITY_META[selectedTicket.priority].label}
//                   </p>
//                 </div>
//                 <div>
//                   <p className="modal-info-label">Estimated Cost</p>
//                   <p className="modal-info-val">
//                     MAD {selectedTicket.estimatedCost.toLocaleString()}
//                   </p>
//                 </div>
//                 <div>
//                   <p className="modal-info-label">Location</p>
//                   <p className="modal-info-val">{selectedTicket.location}</p>
//                 </div>
//                 <div>
//                   <p className="modal-info-label">Reported By</p>
//                   <p className="modal-info-val">{selectedTicket.reportedBy}</p>
//                 </div>
//                 <div>
//                   <p className="modal-info-label">Reported Date</p>
//                   <p className="modal-info-val">
//                     {selectedTicket.reportedDate}
//                   </p>
//                 </div>
//                 {selectedTicket.assignedTo && (
//                   <div>
//                     <p className="modal-info-label">Assigned To</p>
//                     <p className="modal-info-val">
//                       {selectedTicket.assignedTo}
//                     </p>
//                   </div>
//                 )}
//                 {selectedTicket.completedDate && (
//                   <div>
//                     <p className="modal-info-label">Completed Date</p>
//                     <p
//                       className="modal-info-val"
//                       style={{ color: "#16a34a" }}
//                     >
//                       {selectedTicket.completedDate}
//                     </p>
//                   </div>
//                 )}
//                 {!selectedTicket.assignedTo && !selectedTicket.completedDate && (
//                   <div>
//                     <p className="modal-info-label">Assigned To</p>
//                     <p
//                       className="modal-info-val"
//                       style={{ color: "#dc2626" }}
//                     >
//                       ⚠ Unassigned
//                     </p>
//                   </div>
//                 )}
//               </div>

//               <p className="modal-section-title">Description</p>
//               <p
//                 style={{
//                   fontSize: "0.83rem",
//                   color: "#6a5a4a",
//                   lineHeight: 1.75,
//                   padding: "10px 14px",
//                   background: "#faf6f0",
//                   borderRadius: "5px",
//                   borderLeft: `3px solid ${GOLD}`,
//                   marginBottom: "1rem",
//                 }}
//               >
//                 {selectedTicket.description}
//               </p>

//               <p className="modal-section-title">Internal Notes</p>
//               <p
//                 style={{
//                   fontSize: "0.83rem",
//                   color: "#6a5a4a",
//                   lineHeight: 1.75,
//                   padding: "10px 14px",
//                   background: "#faf6f0",
//                   borderRadius: "5px",
//                   borderLeft: `3px solid ${GOLD}`,
//                 }}
//               >
//                 {selectedTicket.note}
//               </p>

//               <div className="modal-actions">
//                 {selectedTicket.status === "pending" && (
//                   <React.Fragment>
//                     <button
//                       className="modal-action-btn"
//                       style={{ background: DARK, color: "white" }}
//                     >
//                       Assign Staff
//                     </button>
//                     <button
//                       className="modal-action-btn"
//                       style={{
//                         background: "white",
//                         color: DARK,
//                         border: "1px solid #ddd",
//                       }}
//                     >
//                       Edit Ticket
//                     </button>
//                     <button
//                       className="modal-action-btn"
//                       style={{
//                         background: "rgba(220,38,38,0.08)",
//                         color: "#dc2626",
//                         border: "1px solid rgba(220,38,38,0.2)",
//                       }}
//                     >
//                       Cancel
//                     </button>
//                   </React.Fragment>
//                 )}
//                 {selectedTicket.status === "in-progress" && (
//                   <React.Fragment>
//                     <button
//                       className="modal-action-btn"
//                       style={{ background: "#16a34a", color: "white" }}
//                     >
//                       Mark Completed
//                     </button>
//                     <button
//                       className="modal-action-btn"
//                       style={{
//                         background: "white",
//                         color: DARK,
//                         border: "1px solid #ddd",
//                       }}
//                     >
//                       Update Notes
//                     </button>
//                     <button
//                       className="modal-action-btn"
//                       style={{
//                         background: "rgba(184,150,90,0.1)",
//                         color: GOLD,
//                         border: "1px solid rgba(184,150,90,0.3)",
//                       }}
//                     >
//                       Reassign
//                     </button>
//                   </React.Fragment>
//                 )}
//                 {selectedTicket.status === "completed" && (
//                   <React.Fragment>
//                     <button
//                       className="modal-action-btn"
//                       style={{ background: GOLD, color: "white" }}
//                     >
//                       Reopen Ticket
//                     </button>
//                     <button
//                       className="modal-action-btn"
//                       style={{
//                         background: "white",
//                         color: DARK,
//                         border: "1px solid #ddd",
//                       }}
//                     >
//                       View History
//                     </button>
//                     <button
//                       className="modal-action-btn"
//                       style={{
//                         background: "rgba(220,38,38,0.08)",
//                         color: "#dc2626",
//                         border: "1px solid rgba(220,38,38,0.2)",
//                       }}
//                     >
//                       Archive
//                     </button>
//                   </React.Fragment>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </React.Fragment>
//   );
// }

// /* ── ICONS ── */
// function GridIcon() {
//   return (
//     <svg
//       width="16"
//       height="16"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="1.8"
//     >
//       <rect x="3" y="3" width="7" height="7" rx="1" />
//       <rect x="14" y="3" width="7" height="7" rx="1" />
//       <rect x="3" y="14" width="7" height="7" rx="1" />
//       <rect x="14" y="14" width="7" height="7" rx="1" />
//     </svg>
//   );
// }
// function CalIcon() {
//   return (
//     <svg
//       width="16"
//       height="16"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="1.8"
//     >
//       <rect x="3" y="4" width="18" height="18" rx="2" />
//       <line x1="16" y1="2" x2="16" y2="6" />
//       <line x1="8" y1="2" x2="8" y2="6" />
//       <line x1="3" y1="10" x2="21" y2="10" />
//     </svg>
//   );
// }
// function BedIcon() {
//   return (
//     <svg
//       width="16"
//       height="16"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="1.8"
//     >
//       <path d="M2 4v16" />
//       <path d="M22 8H2" />
//       <path d="M22 4v16" />
//       <rect x="6" y="4" width="4" height="4" rx="1" />
//       <path d="M2 8v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8" />
//     </svg>
//   );
// }
// function WrenchIcon() {
//   return (
//     <svg
//       width="16"
//       height="16"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="1.8"
//     >
//       <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
//     </svg>
//   );
// }
// function ReportIcon() {
//   return (
//     <svg
//       width="16"
//       height="16"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="1.8"
//     >
//       <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
//       <polyline points="14 2 14 8 20 8" />
//       <line x1="16" y1="13" x2="8" y2="13" />
//       <line x1="16" y1="17" x2="8" y2="17" />
//       <polyline points="10 9 9 9 8 9" />
//     </svg>
//   );
// }
// function LogoutIcon() {
//   return (
//     <svg
//       width="14"
//       height="14"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//     >
//       <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
//       <polyline points="16 17 21 12 16 7" />
//       <line x1="21" y1="12" x2="9" y2="12" />
//     </svg>
//   );
// }
