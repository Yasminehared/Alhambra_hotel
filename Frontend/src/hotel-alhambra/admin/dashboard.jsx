import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const GOLD = "#b8965a";
const DARK = "#1a1208";

export default function DashboardConsole() {
  const [rooms, setRooms] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const fetchData = async () => {
    try {
      setLoading(true);
      const [roomsRes, resRes, ticketsRes] = await Promise.all([
        axios.get("/api/rooms"),
        axios.get("/api/reservations"),
        axios.get("/api/maintenance-tickets")
      ]);
      setRooms(roomsRes.data);
      setReservations(resRes.data);
      setTickets(ticketsRes.data);
    } catch (err) {
      console.error("Error loading dashboard data", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCheckIn = async (resId) => {
    try {
      await axios.put(`/api/reservations/${resId}/check-in`);
      fetchData();
    } catch (err) {
      alert("Error checking in: " + (err.response?.data?.message || err.message));
    }
  };

  const handleCheckOut = async (resId) => {
    try {
      await axios.put(`/api/reservations/${resId}/check-out`);
      fetchData();
    } catch (err) {
      alert("Error checking out: " + (err.response?.data?.message || err.message));
    }
  };

  const todayStr = new Date().toISOString().split("T")[0];

  // Derive metrics
  const checkinsToday = reservations.filter(r => r.checkin === todayStr && r.status === "confirmed");
  const checkoutsToday = reservations.filter(r => r.checkout === todayStr && r.status === "checked-in");
  const activeGuests = reservations.filter(r => r.status === "checked-in").length;
  
  // Pending payments
  const unpaidReservations = reservations.filter(r => r.payment !== "paid");
  const pendingPaymentsCount = unpaidReservations.length;
  const pendingPaymentsAmount = unpaidReservations.reduce((sum, r) => sum + (parseFloat(r.total) - parseFloat(r.amount_paid || 0)), 0);

  // Occupancy rate
  const totalRooms = rooms.length || 1;
  const occupiedRooms = rooms.filter(r => r.status === "occupied").length;
  const occupancyRate = Math.round((occupiedRooms / totalRooms) * 100);

  // Maintenance Alerts
  const activeAlerts = tickets.filter(t => t.status !== "completed");

  const filteredReservations = reservations.filter(r => {
    const term = search.toLowerCase();
    const guest = r.guest ? r.guest.toLowerCase() : "";
    const id = r.id ? r.id.toLowerCase() : "";
    const room = r.room ? String(r.room) : "";
    return guest.includes(term) || id.includes(term) || room.includes(term);
  }).slice(0, 5);

  return (
    <>
      <style>{`
        body { font-family: 'Jost', sans-serif; background: #f4efe6; color: ${DARK}; margin: 0; }
        .page-wrap { padding: 2rem; }
        .header-row { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 2rem; }
        .header-title h1 { font-family: 'Cormorant Garamond', serif; font-size: 2rem; font-weight: 400; margin: 0; }
        .header-title p { font-size: 0.8rem; color: #888; margin: 4px 0 0; }
        .search-input { padding: 10px 16px; border: 1px solid #e5ddd2; border-radius: 4px; background: white; outline: none; width: 260px; font-family: inherit; }
        .search-input:focus { border-color: ${GOLD}; }

        /* Bento Layout */
        .bento-grid { display: grid; grid-template-columns: repeat(12, 1fr); gap: 1.5rem; }
        .bento-col-4 { grid-column: span 4; }
        .bento-col-8 { grid-column: span 8; }
        .bento-col-3 { grid-column: span 3; }
        .bento-col-9 { grid-column: span 9; }
        .bento-col-6 { grid-column: span 6; }
        .bento-col-12 { grid-column: span 12; }

        .card { background: white; border: 1px solid rgba(184,150,90,0.15); border-radius: 12px; padding: 1.5rem; box-shadow: 0 4px 12px rgba(26,18,8,0.03); }
        .card-title { font-size: 0.72rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.12em; color: ${GOLD}; margin-bottom: 1rem; margin-top: 0; }
        
        /* Stats card widgets */
        .kpi-row { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; width: 100%; margin-bottom: 1.5rem; }
        .kpi-card { background: white; border: 1px solid rgba(184,150,90,0.15); border-radius: 8px; padding: 1.2rem; display: flex; align-items: center; justify-content: space-between; }
        .kpi-val { font-family: 'Cormorant Garamond', serif; font-size: 2.2rem; font-weight: 400; line-height: 1; margin-bottom: 4px; }
        .kpi-label { font-size: 0.65rem; color: #aaa; text-transform: uppercase; letter-spacing: 0.1em; }
        .kpi-icon { font-size: 1.8rem; opacity: 0.8; }

        /* Room status grid matrix */
        .room-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(62px, 1fr)); gap: 8px; }
        .room-box { height: 42px; border-radius: 6px; display: flex; align-items: center; justify-content: center; font-size: 0.75rem; font-weight: 600; cursor: pointer; transition: transform 0.2s, box-shadow 0.2s; }
        .room-box:hover { transform: scale(1.05); box-shadow: 0 4px 10px rgba(0,0,0,0.15); }
        .room-box.available { background: rgba(22,163,74,0.12); color: #16a34a; border: 1px solid rgba(22,163,74,0.25); }
        .room-box.occupied { background: rgba(37,99,235,0.12); color: #2563eb; border: 1px solid rgba(37,99,235,0.25); }
        .room-box.cleaning { background: rgba(217,119,6,0.12); color: #d97706; border: 1px solid rgba(217,119,6,0.25); }
        .room-box.maintenance { background: rgba(220,38,38,0.12); color: #dc2626; border: 1px solid rgba(220,38,38,0.25); }

        /* Legend */
        .legend-row { display: flex; gap: 12px; margin-top: 1rem; flex-wrap: wrap; }
        .legend-item { display: flex; align-items: center; gap: 6px; font-size: 0.7rem; color: #888; font-weight: 500; }
        .legend-dot { width: 8px; height: 8px; border-radius: 50%; }

        /* Tables & Lists */
        .res-table { width: 100%; border-collapse: collapse; text-align: left; }
        .res-table th { border-bottom: 1px solid #e5ddd2; padding: 12px; font-size: 0.68rem; font-weight: 600; text-transform: uppercase; color: #aaa; letter-spacing: 0.08em; }
        .res-table td { padding: 12px; border-bottom: 1px solid #f0eae1; font-size: 0.8rem; }
        .badge { padding: 2px 8px; border-radius: 4px; font-size: 0.65rem; font-weight: 600; text-transform: uppercase; }
        .badge.confirmed { background: rgba(37,99,235,0.1); color: #2563eb; }
        .badge.pending { background: rgba(217,119,6,0.1); color: #d97706; }
        .badge.checked-in { background: rgba(22,163,74,0.1); color: #16a34a; }
        .badge.checked-out { background: rgba(107,114,128,0.1); color: #6b7280; }

        .btn-action { padding: 4px 10px; font-size: 0.65rem; font-weight: 600; background: ${DARK}; color: white; border: none; border-radius: 4px; cursor: pointer; text-transform: uppercase; letter-spacing: 0.05em; transition: background 0.2s; }
        .btn-action:hover { background: ${GOLD}; }

        /* Maintenance Alerts List */
        .alert-item { display: flex; align-items: center; justify-content: space-between; padding: 10px 12px; background: #faf6f0; border-radius: 6px; border-left: 3px solid #dc2626; font-size: 0.8rem; margin-bottom: 8px; }
        .alert-title { font-weight: 500; }
        .alert-room { font-size: 0.72rem; color: #888; }
        .alert-priority { font-size: 0.65rem; font-weight: 600; text-transform: uppercase; color: #dc2626; }

        @media (max-width: 1024px) {
          .bento-col-4, .bento-col-8, .bento-col-3, .bento-col-9, .bento-col-6 { grid-column: span 12; }
          .kpi-row { grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 600px) {
          .kpi-row { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="page-wrap">
        {/* Topbar Header */}
        <div className="header-row">
          <div className="header-title">
            <h1>Secretary Console Dashboard</h1>
            <p>Operational Overview · Tanger Hotel Operations</p>
          </div>
          <input
            className="search-input"
            placeholder="Quick search bookings..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>

        {/* Stats KPIs strip */}
        <div className="kpi-row">
          <div className="kpi-card">
            <div>
              <div className="kpi-val">{checkinsToday.length}</div>
              <div className="kpi-label">Check-ins Today</div>
            </div>
            <span className="kpi-icon">🛫</span>
          </div>
          <div className="kpi-card">
            <div>
              <div className="kpi-val">{checkoutsToday.length}</div>
              <div className="kpi-label">Check-outs Today</div>
            </div>
            <span className="kpi-icon">🛬</span>
          </div>
          <div className="kpi-card">
            <div>
              <div className="kpi-val" style={{ fontSize: "1.4rem" }}>MAD {pendingPaymentsAmount.toLocaleString(undefined, {maximumFractionDigits:0})}</div>
              <div className="kpi-label">Pending Payments ({pendingPaymentsCount})</div>
            </div>
            <span className="kpi-icon">💳</span>
          </div>
          <div className="kpi-card">
            <div>
              <div className="kpi-val">{occupancyRate}%</div>
              <div className="kpi-label">Occupancy Rate ({occupiedRooms}/{totalRooms})</div>
            </div>
            <span className="kpi-icon">🏨</span>
          </div>
        </div>

        {loading ? (
          <div style={{ textAlign: "center", padding: "4rem", fontSize: "1.1rem" }}>Loading Bento Console...</div>
        ) : (
          <div className="bento-grid">
            {/* Left Column: Room Grid (Asymmetric) */}
            <div className="bento-col-4 flex flex-col gap-6">
              <div className="card">
                <h3 className="card-title">Live Room Status Grid</h3>
                <div className="room-grid">
                  {rooms.map(room => {
                    let stateClass = "available";
                    if (room.status === "occupied") stateClass = "occupied";
                    else if (room.status === "cleaning" || room.housekeeping === "dirty") stateClass = "cleaning";
                    else if (room.status === "maintenance") stateClass = "maintenance";

                    return (
                      <div
                        key={room.db_id}
                        className={`room-box ${stateClass}`}
                        title={`Room ${room.id} - ${room.name} (${room.status})`}
                      >
                        {room.id}
                      </div>
                    );
                  })}
                </div>
                <div className="legend-row">
                  <div className="legend-item"><span className="legend-dot" style={{ background: "#16a34a" }} /> Available</div>
                  <div className="legend-item"><span className="legend-dot" style={{ background: "#2563eb" }} /> Occupied</div>
                  <div className="legend-item"><span className="legend-dot" style={{ background: "#d97706" }} /> Cleaning</div>
                  <div className="legend-item"><span className="legend-dot" style={{ background: "#dc2626" }} /> Maintenance</div>
                </div>
              </div>

              {/* Maintenance Alerts */}
              <div className="card">
                <h3 className="card-title">Active Maintenance Alerts</h3>
                {activeAlerts.length === 0 ? (
                  <p style={{ fontSize: "0.8rem", color: "#aaa" }}>No active maintenance tickets.</p>
                ) : (
                  activeAlerts.slice(0, 4).map(t => (
                    <div key={t.db_id} className="alert-item">
                      <div>
                        <span className="alert-title">{t.title}</span>
                        <div className="alert-room">Room #{t.room}</div>
                      </div>
                      <span className="alert-priority">{t.priority}</span>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Right Column: Daily Reservations list (Actionable) */}
            <div className="bento-col-8 flex flex-col gap-6">
              <div className="card">
                <h3 className="card-title">Daily Operations Console</h3>
                <table className="res-table">
                  <thead>
                    <tr>
                      <th>Ref</th>
                      <th>Guest</th>
                      <th>Room</th>
                      <th>Period</th>
                      <th>Status</th>
                      <th style={{ textAlign: "right" }}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredReservations.length === 0 ? (
                      <tr>
                        <td colSpan={6} style={{ textAlign: "center", color: "#aaa", padding: "2rem" }}>No reservations found matching search.</td>
                      </tr>
                    ) : (
                      filteredReservations.map(r => (
                        <tr key={r.db_id}>
                          <td style={{ fontWeight: 600, color: DARK }}>{r.id}</td>
                          <td>{r.guest}</td>
                          <td>Room #{r.room}</td>
                          <td>{r.checkin} to {r.checkout}</td>
                          <td>
                            <span className={`badge ${r.status}`}>{r.status}</span>
                          </td>
                          <td style={{ textAlign: "right" }}>
                            {r.status === "confirmed" && (
                              <button className="btn-action" onClick={() => handleCheckIn(r.db_id)}>Check In</button>
                            )}
                            {r.status === "checked-in" && (
                              <button className="btn-action" onClick={() => handleCheckOut(r.db_id)}>Check Out</button>
                            )}
                            {r.status !== "confirmed" && r.status !== "checked-in" && (
                              <span style={{ fontSize: "0.75rem", color: "#aaa" }}>—</span>
                            )}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              {/* Revenue Overview Widget */}
              <div className="card">
                <h3 className="card-title">Operations Activity Log</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "10px", fontSize: "0.82rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid #f4efe6", paddingBottom: "8px" }}>
                    <span>Active In-House Guests</span>
                    <span style={{ fontWeight: 600, color: GOLD }}>{activeGuests} guests</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid #f4efe6", paddingBottom: "8px" }}>
                    <span>Current Housekeeping Needs</span>
                    <span style={{ fontWeight: 600, color: "#d97706" }}>{rooms.filter(r => r.housekeeping === "dirty").length} rooms dirty</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span>Urgent Maintenance Tickets</span>
                    <span style={{ fontWeight: 600, color: "#dc2626" }}>{tickets.filter(t => t.priority === "urgent" || t.priority === "critical").length} tickets</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
