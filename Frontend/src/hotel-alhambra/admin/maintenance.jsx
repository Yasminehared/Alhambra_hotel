import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const IMG = "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&q=70";

const rooms = [];

const navItems = [
  {
    label: "Overview",
    to: "/dashboard",
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
    to: "/admin/reservation",
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
    to: "/admin/chambres",
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
    to: "/maintenance",
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.4">
        <circle cx="9" cy="9" r="3" />
        <path d="M9 1v2M9 15v2M1 9h2M15 9h2M3.2 3.2l1.4 1.4M13.4 13.4l1.4 1.4M3.2 14.8l1.4-1.4M13.4 4.6l1.4-1.4" />
      </svg>
    ),
  },
];

function RoomCard({ room, onUpdateStatus }) {
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
          src={room.img || IMG}
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
          background: room.status === 'completed' ? '#16a34a' : '#e5534b', color: "#fff",
          fontSize: 9, fontWeight: 600, letterSpacing: "0.05em",
          padding: "3px 7px", borderRadius: 3, textTransform: "uppercase",
        }}>
          {room.status}
        </span>
      </div>

      {/* Body */}
      <div style={{ padding: "12px 14px 14px" }}>
        <div style={{ fontSize: 14, fontWeight: 500, color: "#1a1a1a", marginBottom: 2 }}>
          {room.name}
        </div>
        <div style={{ fontSize: 12, color: room.status === 'completed' ? '#16a34a' : '#e5534b', marginBottom: 6, textTransform: 'capitalize' }}>
          Status: {room.status}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "#888", marginBottom: 10 }}>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.3">
            <path d="M8.5 1.5l2 2-6 6-2.5.5.5-2.5 6-6z" />
          </svg>
          {room.detail}
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          {room.status !== 'completed' ? (
            <button 
              onClick={() => onUpdateStatus(room)}
              style={{
                fontSize: 11, color: "#666",
                border: "0.5px solid #d0cdc7",
                background: "#f5f4f2",
                borderRadius: 5, padding: "5px 10px", cursor: "pointer",
                fontFamily: "inherit",
              }}
            >
              {room.status === 'pending' ? 'Start Repair' : 'Mark Resolved'}
            </button>
          ) : (
            <span style={{ fontSize: 11, color: '#16a34a', fontWeight: 500 }}>Resolved</span>
          )}
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

  const [ticketsList, setTicketsList] = useState(rooms);
  const [loading, setLoading] = useState(false);

  const fetchTickets = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/maintenance-tickets");
      setTicketsList(res.data);
    } catch (err) {
      console.error("Error fetching tickets", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  const handleUpdateStatus = async (ticket) => {
    try {
      const dbId = ticket.db_id;
      const nextStatus = ticket.status === 'pending' ? 'in-progress' : 'completed';
      await axios.put(`/api/maintenance-tickets/${dbId}`, {
        status: nextStatus,
        resolution_notes: 'Resolved via dashboard.'
      });
      fetchTickets();
    } catch (err) {
      alert("Error updating ticket: " + (err.response?.data?.message || err.message));
    }
  };

  const filtered = ticketsList.filter(
    (r) =>
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      String(r.num).includes(search)
  );
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", minHeight: "100vh", fontFamily: "'Jost', sans-serif", background: "#f7f5f0" }}>

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
                <RoomCard key={room.num} room={room} onUpdateStatus={handleUpdateStatus} />
              ))}
            </div>
          )}
        </div>
      </div>
  );
}