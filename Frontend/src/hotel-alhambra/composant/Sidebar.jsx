import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { 
  LayoutDashboard, 
  Calendar, 
  Bed, 
  Wrench, 
  CreditCard, 
  Users, 
  LogOut,
  Sparkles
} from "lucide-react";

const GOLD = "#b8965a";
const DARK = "#1a1208";

export default function Sidebar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  if (!user) return null;

  const role = user.role; // admin, receptionist, housekeeping

  const handleLogout = async () => {
    await logout();
    navigate("/log-in");
  };

  // Define navigation items with access rules
  const menuItems = [
    {
      label: "Overview",
      to: "/dashboard",
      icon: <LayoutDashboard size={18} />,
      roles: ["admin", "receptionist"]
    },
    {
      label: "Reservations",
      to: "/admin/reservation",
      icon: <Calendar size={18} />,
      roles: ["admin", "receptionist"]
    },
    {
      label: "Chambres",
      to: "/admin/chambres",
      icon: <Bed size={18} />,
      roles: ["admin", "receptionist", "housekeeping"]
    },
    {
      label: "Payments",
      to: "/payments",
      icon: <CreditCard size={18} />,
      roles: ["admin", "receptionist"]
    },
    {
      label: "Maintenance",
      to: "/maintenance",
      icon: <Wrench size={18} />,
      roles: ["admin", "housekeeping"]
    },
    {
      label: "Users & Staff",
      to: "/users",
      icon: <Users size={18} />,
      roles: ["admin"]
    }
  ];

  // Filter items by current user's role
  const visibleItems = menuItems.filter(item => item.roles.includes(role));

  const initials = user.name ? user.name.split(" ").map(n => n[0]).join("") : "A";

  return (
    <>
      <style>{`
        .sidebar {
          width: 260px; flex-shrink: 0; background: ${DARK};
          display: flex; flex-direction: column;
          position: fixed; top: 0; left: 0; bottom: 0; z-index: 100;
          border-right: 1px solid rgba(184,150,90,0.15);
        }
        .sidebar-logo { padding: 1.8rem 1.6rem 1.4rem; border-bottom: 1px solid rgba(184,150,90,0.15); }
        .sidebar-logo-text { font-family: 'Cormorant Garamond', serif; font-size: 1.3rem; color: white; letter-spacing: 0.14em; display: flex; align-items: center; gap: 8px; }
        .sidebar-logo-sub { font-size: 0.6rem; letter-spacing: 0.2em; text-transform: uppercase; color: ${GOLD}; margin-top: 3px; }
        .sidebar-nav { flex: 1; padding: 1.5rem 0; }
        .nav-section-label { font-size: 0.55rem; letter-spacing: 0.25em; text-transform: uppercase; color: rgba(255,255,255,0.25); padding: 0 1.6rem; margin: 1rem 0 0.4rem; }
        .nav-item {
          display: flex; align-items: center; gap: 14px;
          padding: 12px 1.6rem; cursor: pointer; text-decoration: none;
          color: rgba(255,255,255,0.55); font-size: 0.82rem; letter-spacing: 0.04em;
          transition: all 0.2s; border-left: 3px solid transparent;
        }
        .nav-item:hover { color: white; background: rgba(255,255,255,0.04); }
        .nav-item.active { color: white; background: rgba(184,150,90,0.12); border-left-color: ${GOLD}; }
        .nav-item svg { flex-shrink: 0; opacity: 0.7; }
        .nav-item.active svg { opacity: 1; color: ${GOLD}; }
        
        .sidebar-footer { padding: 1.2rem 1.6rem; border-top: 1px solid rgba(255,255,255,0.06); }
        .user-row { display: flex; align-items: center; gap: 12px; }
        .user-avatar { width: 36px; height: 36px; border-radius: 50%; background: rgba(184,150,90,0.2); border: 1px solid rgba(184,150,90,0.4); display: flex; align-items: center; justify-content: center; font-family: 'Cormorant Garamond', serif; font-size: 0.95rem; color: ${GOLD}; }
        .user-name { font-size: 0.82rem; color: white; font-weight: 500; }
        .user-role { font-size: 0.65rem; color: rgba(255,255,255,0.4); letter-spacing: 0.06em; text-transform: capitalize; }
        .logout-btn { display: flex; align-items: center; gap: 8px; margin-top: 1rem; padding: 9px 0; color: rgba(255,255,255,0.35); font-size: 0.75rem; cursor: pointer; border: none; background: none; font-family: 'Jost', sans-serif; letter-spacing: 0.06em; transition: color 0.2s; width: 100%; text-align: left; }
        .logout-btn:hover { color: #ef4444; }

        @media (max-width: 900px) {
          .sidebar { width: 64px; }
          .sidebar-logo-text, .sidebar-logo-sub, .nav-item span, .user-name, .user-role, .logout-btn span, .nav-section-label { display: none; }
          .nav-item { justify-content: center; padding: 14px; }
          .sidebar-footer { padding: 1rem 0.5rem; }
          .user-row { justify-content: center; }
        }
      `}</style>

      <aside className="sidebar">
        <div className="sidebar-logo">
          <p className="sidebar-logo-text">
            <Sparkles size={16} color={GOLD} /> ALHAMBRA
          </p>
          <p className="sidebar-logo-sub">Administration</p>
        </div>
        <nav className="sidebar-nav">
          <p className="nav-section-label">Main Console</p>
          {visibleItems.map((item, i) => {
            const isActive = location.pathname === item.to;
            return (
              <Link key={i} to={item.to} className={`nav-item ${isActive ? "active" : ""}`}>
                {item.icon}
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
        <div className="sidebar-footer">
          <div className="user-row">
            <div className="user-avatar">{initials}</div>
            <div>
              <p className="user-name">{user.name}</p>
              <p className="user-role">{role}</p>
            </div>
          </div>
          <button className="logout-btn" onClick={handleLogout}>
            <LogOut size={14} />
            <span>Log Out</span>
          </button>
        </div>
      </aside>
    </>
  );
}
