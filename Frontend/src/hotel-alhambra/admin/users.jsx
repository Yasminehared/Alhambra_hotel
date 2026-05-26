import React, { useState, useEffect } from "react";
import axios from "axios";

const GOLD = "#b8965a";
const DARK = "#1a1208";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/users");
      setUsers(res.data);
    } catch (err) {
      console.error("Error fetching users", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const filtered = users.filter(u => {
    const term = search.toLowerCase();
    const name = u.name ? u.name.toLowerCase() : "";
    const email = u.email ? u.email.toLowerCase() : "";
    const role = u.role ? u.role.toLowerCase() : "";
    return name.includes(term) || email.includes(term) || role.includes(term);
  });

  return (
    <>
      <style>{`
        body { font-family: 'Jost', sans-serif; background: #f4efe6; color: ${DARK}; margin: 0; }
        .page-wrap { padding: 2rem; }
        .header-row { display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; }
        .header-title h1 { font-family: 'Cormorant Garamond', serif; font-size: 2rem; font-weight: 400; margin: 0; }
        .header-title p { font-size: 0.8rem; color: #888; margin: 4px 0 0; }
        .search-input { padding: 10px 16px; border: 1px solid #e5ddd2; border-radius: 4px; background: white; outline: none; width: 260px; font-family: inherit; }
        .search-input:focus { border-color: ${GOLD}; }
        
        .table-wrap { background: white; border: 1px solid rgba(184,150,90,0.15); border-radius: 8px; overflow: hidden; }
        table { width: 100%; border-collapse: collapse; text-align: left; }
        th { background: #faf8f5; padding: 16px 20px; font-size: 0.7rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em; color: #888; border-bottom: 1px solid #e5ddd2; }
        td { padding: 16px 20px; font-size: 0.85rem; border-bottom: 1px solid #f0eae1; color: #444; }
        tr:hover td { background: #fdfcfa; }
        
        .badge { padding: 4px 10px; border-radius: 4px; font-size: 0.7rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; display: inline-block; }
        .badge.admin { background: rgba(184,150,90,0.15); color: ${GOLD}; }
        .badge.receptionist { background: rgba(37,99,235,0.1); color: #2563eb; }
        .badge.housekeeping { background: rgba(217,119,6,0.1); color: #d97706; }
        .badge.customer { background: rgba(107,114,128,0.1); color: #6b7280; }
        
        .empty-state { text-align: center; padding: 4rem; color: #aaa; }
      `}</style>

      <div className="page-wrap">
        <div className="header-row">
          <div className="header-title">
            <h1>Staff & Users Directory</h1>
            <p>Access privileges and user accounts list</p>
          </div>
          <input
            className="search-input"
            placeholder="Search name, email, role..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>

        {loading ? (
          <div className="table-wrap" style={{ padding: "2rem", textAlign: "center" }}>Loading users list...</div>
        ) : (
          <div className="table-wrap">
            {filtered.length === 0 ? (
              <div className="empty-state">No users match your search.</div>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>User ID</th>
                    <th>Name</th>
                    <th>Email Address</th>
                    <th>Role Privilege</th>
                    <th>Registered On</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map(u => {
                    const role = u.role || "customer";
                    return (
                      <tr key={u.id}>
                        <td style={{ fontWeight: 600, color: "#888" }}>#{u.id}</td>
                        <td style={{ fontWeight: 600, color: DARK }}>{u.name}</td>
                        <td>{u.email}</td>
                        <td>
                          <span className={`badge ${role}`}>{role}</span>
                        </td>
                        <td>{new Date(u.created_at || Date.now()).toLocaleDateString()}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        )}
      </div>
    </>
  );
}
