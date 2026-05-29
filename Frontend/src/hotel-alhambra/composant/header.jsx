import { useState } from "react";
import { Link } from "react-router-dom";
import { User } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user } = useAuth();

  const getDashboardPath = () => {
    if (!user) return "/log-in";
    if (user.role === "housekeeping") return "/maintenance";
    if (user.role === "admin" || user.role === "receptionist") return "/dashboard";
    return "/profile";
  };

  return (
    <>
      <style>{`
        body {
          margin: 0;
          font-family: 'Jost', sans-serif;
        }

        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          height: 64px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 2rem;
          background: rgba(187,167,143,0.85);
          color: white;
          z-index: 1000;
        }

        .nav-links {
          display: flex;
          gap: 1.5rem;
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .nav-links a {
          color: white;
          text-decoration: none;
          font-size: 0.8rem;
          transition: opacity 0.2s;
        }

        .nav-links a:hover {
          opacity: 0.8;
        }

        .nav-logo {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          font-weight: 600;
          font-size: 1.1rem;        
        }


        .nav-logo a {
          color: white;
          text-decoration: none;
          transition: opacity 0.2s;

        }

        .dropdown {
          position: relative;
        }

        .dropdown-menu {
          position: absolute;
          top: 100%;
          left: 0;
          background: rgba(255,255,255,0.95);
          min-width: 160px;
          display: none;
          flex-direction: column;
          padding: 0.5rem 0;
          box-shadow: 0 10px 25px rgba(0,0,0,0.15);
          border-radius: 6px;
          z-index: 999;
        }

        .dropdown-menu li {
          list-style: none;
        }

        .dropdown-menu a {
          display: block;
          padding: 0.6rem 1rem;
          font-size: 0.75rem;
          color: #1a1208;
          text-decoration: none;
        }

        .dropdown-menu a:hover {
          background: #f3eadc;
        }

        .dropdown:hover .dropdown-menu {
          display: flex;
        }

        /* MENU BUTTON */
        .menu-btn {
          display: none;
          background: none;
          border: none;
          color: white;
          font-size: 1.8rem;
          cursor: pointer;
          z-index: 1100;
        }

        /* MOBILE */
        @media (max-width: 768px) {
          .nav-links {
            display: none;
          }

          .menu-btn {
            display: block;
          }
        }

        /* MOBILE MENU */
        

        .mobile-menu.open {
          transform: translateX(0);
        }

        .mobile-menu a {
          color: white;
          text-decoration: none;
          font-size: 0.9rem;
          letter-spacing: 0.12em;
        }

        .mobile-menu a:hover {
          color: #d4af7a;
        }


      /* MENU MOBILE DROPDOWN */
        .dropdown-mobile {
        list-style: none;
      }

        .dropdown-menu-mobile {
          display: none;
          flex-direction: column;
          padding-left: 1rem;
      }

        .dropdown-mobile:hover .dropdown-menu-mobile {
          display: flex;
      }


      `}</style>

      {/* NAVBAR */}
      <nav className="navbar">
        <ul className="nav-links left">
          <li className="dropdown">
            <Link to="/stay">Stay ▾</Link>
            <ul className="dropdown-menu">
              <li>
                <Link to="/hotel-service/rooms">Rooms</Link>
              </li>
              <li>
                <Link to="/hotel-service/suites">Suites</Link>
              </li>
              <li>
                <Link to="/hotel-service/villas">Villas</Link>
              </li>
            </ul>
          </li>

          <li>
            <Link to="/restaurants">Restaurants</Link>
          </li>
        </ul>

        <div
          className="nav-logo"
          style={{ textDecoration: "none", color: "white" }}
        >
          <Link to="../">✦ Alhambra ✦</Link>
        </div>

        <ul className="nav-links right" style={{ alignItems: "center" }}>
          <li>
            <Link to="../about-us">About us</Link>
          </li>
          <li>
            <Link to="../contact-us">Contact us</Link>
          </li>
          <ul className="nav-links right" style={{ gap: "1rem", alignItems: "center" }}>
            <li>
              <Link to={getDashboardPath()}>
                {user ? (
                  <div style={{
                    width: "28px", height: "28px", borderRadius: "50%",
                    background: "#b8965a", color: "white", display: "flex",
                    alignItems: "center", justifyContent: "center", fontSize: "0.75rem",
                    fontWeight: "600", textTransform: "uppercase"
                  }}>
                    {user.name ? user.name[0] : "A"}
                  </div>
                ) : (
                  <User size={18} />
                )}
              </Link>
            </li>
          </ul>
        </ul>

        {/* BUTTON */}
        <button className="menu-btn" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? "✕" : "☰"}
        </button>
      </nav>

      {/* MOBILE MENU */}
      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        <li className="dropdown-mobile">
          <Link to="/stay">Stay ▾</Link>
          <ul className="dropdown-menu-mobile">
            <li>
              <Link to="/hotel-service/rooms">Rooms</Link>
            </li>
            <li>
              <Link to="/hotel-service/suites">Suites</Link>
            </li>
            <li>
              <Link to="/hotel-service/villas">Villas</Link>
            </li>
          </ul>
        </li>
        {/* <Link to="/stay" onClick={() => setMenuOpen(false)}>Stay</Link> */}
        <Link to="/restaurants" onClick={() => setMenuOpen(false)}>
          Restaurants
        </Link>
        <Link to="/about-us" onClick={() => setMenuOpen(false)}>
          About us
        </Link>
        <Link to="/contact-us" onClick={() => setMenuOpen(false)}>
          Contact us
        </Link>
        <Link to={getDashboardPath()} onClick={() => setMenuOpen(false)}>
          {user ? (user.role === "customer" ? "My Profile" : "Console") : "Log in"}
        </Link>
      </div>
    </>
  );
}
