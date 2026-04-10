import { useState } from "react";

const IMG = "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&q=70";

const rooms = [
  { num: "106", name: "Simple Standard", status: "Hors service", detail: "Remplacement climatisation" },
  { num: "107", name: "Simple Standard", status: "Hors service", detail: "Remplacement climatisation" },
  { num: "108", name: "Simple Standard", status: "Hors service", detail: "Remplacement climatisation" },
  { num: "109", name: "Simple Standard", status: "Hors service", detail: "Remplacement climatisation" },
  { num: "110", name: "Simple Standard", status: "Hors service", detail: "Remplacement climatisation" },
  { num: "111", name: "Simple Standard", status: "Hors service", detail: "Remplacement climatisation" },
];

const navItems = [
  {
    label: "Overview",
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.4">
        <rect x="2" y="2" width="6" height="6" rx="1" />
        <rect x="10" y="2" width="6" height="6" rx="1" />
        <rect x="2" y="10" width="6" height="6" rx="1" />
        <rect x="10" y="10" width="6" height="6" rx="1" />
      </svg>
    ),
  },
  {
    label: "Reservations",
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.4">
        <rect x="2" y="3" width="14" height="12" rx="1.5" />
        <line x1="2" y1="7" x2="16" y2="7" />
        <line x1="6" y1="1" x2="6" y2="5" />
        <line x1="12" y1="1" x2="12" y2="5" />
      </svg>
    ),
  },
  {
    label: "Chambres",
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.4">
        <rect x="1" y="9" width="16" height="7" rx="1" />
        <path d="M3 9V7a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" />
        <line x1="1" y1="14" x2="17" y2="14" />
      </svg>
    ),
  },
  {
    label: "Maintenance",
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.4">
        <circle cx="9" cy="9" r="3" />
        <path d="M9 1v2M9 15v2M1 9h2M15 9h2M3.2 3.2l1.4 1.4M13.4 13.4l1.4 1.4M3.2 14.8l1.4-1.4M13.4 4.6l1.4-1.4" />
      </svg>
    ),
  },
];

function RoomCard({ room }) {
  return (
    <div style={{
      background: "#fff",
      border: "0.5px solid #e5e2db",
      borderRadius: 12,
      overflow: "hidden",
    }}>
      {/* Image */}
      <div style={{ position: "relative" }}>
        <img
          src={IMG}
          alt={room.name}
          style={{ width: "100%", height: 160, objectFit: "cover", display: "block" }}
        />
        <span style={{
          position: "absolute", top: 8, left: 8,
          background: "rgba(255,255,255,0.9)", borderRadius: 4,
          fontSize: 11, fontWeight: 500, padding: "2px 6px", color: "#333",
        }}>
          {room.num}
        </span>
        <span style={{
          position: "absolute", top: 8, right: 8,
          background: "#e5534b", color: "#fff",
          fontSize: 9, fontWeight: 600, letterSpacing: "0.05em",
          padding: "3px 7px", borderRadius: 3, textTransform: "uppercase",
        }}>
          Maintenance
        </span>
      </div>

      {/* Body */}
      <div style={{ padding: "12px 14px 14px" }}>
        <div style={{ fontSize: 14, fontWeight: 500, color: "#1a1a1a", marginBottom: 2 }}>
          {room.name}
        </div>
        <div style={{ fontSize: 12, color: "#e5534b", marginBottom: 6 }}>
          {room.status}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "#888", marginBottom: 10 }}>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.3">
            <path d="M8.5 1.5l2 2-6 6-2.5.5.5-2.5 6-6z" />
          </svg>
          {room.detail}
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <button style={{
            fontSize: 11, color: "#666",
            border: "0.5px solid #d0cdc7",
            background: "#f5f4f2",
            borderRadius: 5, padding: "5px 10px", cursor: "pointer",
            fontFamily: "inherit",
          }}>
            Maintenance en cours
          </button>
          <button style={{
            background: "none", border: "none", cursor: "pointer",
            color: "#999", fontSize: 18, padding: "4px 6px", lineHeight: 1,
          }}>
            ⋮
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Maintenance() {
  const [activeNav, setActiveNav] = useState("Maintenance");
  const [search, setSearch] = useState("");

  const filtered = rooms.filter(
    (r) =>
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.num.includes(search)
  );

  return (
    <div style={{ display: "flex", minHeight: "100vh", fontFamily: "'Jost', sans-serif", background: "#f7f5f0" }}>

      {/* ── SIDEBAR ── */}
      <aside style={{
        width: 260, minWidth: 260,
        background: "#fff",
        borderRight: "0.5px solid #e5e2db",
        display: "flex", flexDirection: "column",
      }}>
        {/* Logo */}
        <div style={{
          display: "flex", alignItems: "center", gap: 10,
          padding: "1.2rem 1.5rem",
          borderBottom: "0.5px solid #e5e2db",
        }}>
          <div style={{
            width: 40, height: 40,
            border: "2px solid #1a1a1a", borderRadius: 6,
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="2" y="8" width="18" height="12" rx="1" />
              <path d="M6 8V5a5 5 0 0 1 10 0v3" />
              <line x1="11" y1="13" x2="11" y2="15" />
            </svg>
          </div>
          <span style={{ fontSize: 15, fontWeight: 500, letterSpacing: "0.08em" }}>HOTEL</span>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: "1.5rem 0" }}>
          {navItems.map((item) => {
            const isActive = activeNav === item.label;
            return (
              <div
                key={item.label}
                onClick={() => setActiveNav(item.label)}
                style={{
                  display: "flex", alignItems: "center", gap: 14,
                  padding: isActive ? "0.75rem 0.75rem" : "0.75rem 1.5rem",
                  margin: isActive ? "0 0.75rem" : "0",
                  cursor: "pointer",
                  color: isActive ? "#1a1a1a" : "#888",
                  fontSize: 13, fontWeight: 500, letterSpacing: "0.05em",
                  textTransform: "uppercase",
                  background: isActive ? "#f5f0e8" : "transparent",
                  borderRadius: isActive ? 8 : 0,
                  transition: "all 0.15s",
                }}
              >
                {item.icon}
                {item.label}
              </div>
            );
          })}
        </nav>

        {/* Bottom */}
        <div style={{ borderTop: "0.5px solid #e5e2db", padding: "1rem 1.5rem" }}>
          {[
            { label: "Secrétaire", icon: <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.4"><circle cx="9" cy="6" r="3.5" /><path d="M2 16c0-3.3 3.1-6 7-6s7 2.7 7 6" /></svg> },
            { label: "Log Out", icon: <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M7 9h8M12 6l3 3-3 3" /><path d="M9 4H4a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h5" /></svg> },
          ].map((item) => (
            <div key={item.label} style={{
              display: "flex", alignItems: "center", gap: 10,
              padding: "0.5rem 0", cursor: "pointer",
              color: "#1a1a1a", fontSize: 13, fontWeight: 500,
            }}>
              {item.icon}
              {item.label}
            </div>
          ))}
        </div>
      </aside>

      {/* ── MAIN ── */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>

        {/* Topbar */}
        <div style={{
          background: "#fff",
          borderBottom: "0.5px solid #e5e2db",
          padding: "0 2rem", height: 64,
          display: "flex", alignItems: "center", justifyContent: "flex-end", gap: "1.5rem",
        }}>
          {/* Search */}
          <div style={{
            display: "flex", alignItems: "center", gap: 8,
            border: "0.5px solid #d0cdc7", borderRadius: 8,
            padding: "6px 12px", background: "#f5f4f2",
          }}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="#888" strokeWidth="1.5">
              <circle cx="6" cy="6" r="4" />
              <line x1="9.5" y1="9.5" x2="13" y2="13" />
            </svg>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search..."
              style={{
                border: "none", background: "transparent", outline: "none",
                fontSize: 13, color: "#1a1a1a", width: 180,
                fontFamily: "inherit",
              }}
            />
          </div>

          {/* Bell */}
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="#888" strokeWidth="1.5" style={{ cursor: "pointer" }}>
            <path d="M10 2a6 6 0 0 1 6 6v3l2 3H2l2-3V8a6 6 0 0 1 6-6z" />
            <path d="M8 17a2 2 0 0 0 4 0" />
          </svg>

          {/* Admin */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, fontWeight: 500 }}>
            <span>Admin</span>
            <div style={{
              width: 32, height: 32, borderRadius: "50%",
              background: "#e8c97a", display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 16,
            }}>
              👤
            </div>
          </div>
        </div>

        {/* Content */}
        <div style={{ padding: "2rem", flex: 1 }}>
          {filtered.length === 0 ? (
            <p style={{ color: "#aaa", fontSize: 14 }}>Aucune chambre trouvée.</p>
          ) : (
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 16,
            }}>
              {filtered.map((room) => (
                <RoomCard key={room.num} room={room} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}