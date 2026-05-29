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

  const handleRoleChange = async (userId, newRole) => {
    try {
      await axios.put(`/api/users/${userId}/role`, { role: newRole });
      fetchUsers();
    } catch (err) {
      alert("Failed to change role: " + (err.response?.data?.message || err.message));
    }
  };

  const handleToggleBlock = async (userId) => {
    try {
      await axios.put(`/api/users/${userId}/block`);
      fetchUsers();
    } catch (err) {
      alert("Failed to toggle block status: " + (err.response?.data?.message || err.message));
    }
  };

  const handleDelete = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this user? Their account will be permanently removed. Guest histories will be preserved safely.")) return;
    try {
      await axios.delete(`/api/users/${userId}`);
      fetchUsers();
    } catch (err) {
      alert("Failed to delete user: " + (err.response?.data?.message || err.message));
    }
  };

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
        td { padding: 16px 20px; font-size: 0.85rem; border-bottom: 1px solid #f0eae1; color: #444; vertical-align: middle; }
        tr:hover td { background: #fdfcfa; }
        
        .badge { padding: 4px 10px; border-radius: 4px; font-size: 0.7rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; display: inline-block; }
        .badge.admin { background: rgba(184,150,90,0.15); color: ${GOLD}; }
        .badge.receptionist { background: rgba(37,99,235,0.1); color: #2563eb; }
        .badge.housekeeping { background: rgba(217,119,6,0.1); color: #d97706; }
        .badge.customer { background: rgba(107,114,128,0.1); color: #6b7280; }
        
        .badge.blocked { background: rgba(220,38,38,0.1); color: #dc2626; }
        .badge.active { background: rgba(22,163,74,0.1); color: #16a34a; }
        
        .role-select { padding: 6px 10px; border: 1px solid #e5ddd2; border-radius: 4px; background: white; font-family: inherit; font-size: 0.8rem; outline: none; }
        .role-select:focus { border-color: ${GOLD}; }

        .btn-action { padding: 6px 12px; font-size: 0.65rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; border: none; border-radius: 4px; cursor: pointer; font-family: inherit; transition: all 0.2s; }
        .btn-action.block { background: rgba(220,38,38,0.08); color: #dc2626; border: 1px solid rgba(220,38,38,0.15); }
        .btn-action.block:hover { background: rgba(220,38,38,0.15); }
        .btn-action.unblock { background: rgba(22,163,74,0.08); color: #16a34a; border: 1px solid rgba(22,163,74,0.15); }
        .btn-action.unblock:hover { background: rgba(22,163,74,0.15); }
        .btn-action.delete { background: ${DARK}; color: white; margin-left: 8px; }
        .btn-action.delete:hover { background: ${GOLD}; }

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
                    <th>Account Status</th>
                    <th>Registered On</th>
                    <th>Actions</th>
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
                          <select
                            className="role-select"
                            value={role}
                            onChange={e => handleRoleChange(u.id, e.target.value)}
                          >
                            <option value="admin">admin</option>
                            <option value="receptionist">receptionist</option>
                            <option value="housekeeping">housekeeping</option>
                            <option value="customer">customer</option>
                          </select>
                        </td>
                        <td>
                          <span className={`badge ${u.is_blocked ? "blocked" : "active"}`}>
                            {u.is_blocked ? "Blocked" : "Active"}
                          </span>
                        </td>
                        <td>{new Date(u.created_at || Date.now()).toLocaleDateString()}</td>
                        <td>
                          <button
                            className={`btn-action ${u.is_blocked ? "unblock" : "block"}`}
                            onClick={() => handleToggleBlock(u.id)}
                          >
                            {u.is_blocked ? "Unblock" : "Block"}
                          </button>
                          <button
                            className="btn-action delete"
                            onClick={() => handleDelete(u.id)}
                          >
                            Delete
                          </button>
                        </td>
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
