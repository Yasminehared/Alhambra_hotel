import { useState } from "react";
import {
  Search,
  User,
  ShoppingBag,
} from "lucide-react";

function Navbar({ transparent = false }) {

  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* NAVBAR */}
      <nav
        className={`fixed top-0 left-0 w-full z-50 h-16 px-10
        flex items-center justify-between transition-all duration-500
        ${
          transparent
            ? "bg-transparent"
            : "bg-[#bba78fd9] backdrop-blur-md border-b border-[#e3c39933]"
        }`}
      >

        {/* LEFT */}
        <div className="flex-1 flex items-center gap-10">

          <div className="hidden md:flex gap-8 uppercase tracking-[3px] text-[11px] text-white">

            <a href="/" className="hover:text-[#b8975a] transition">
              Hébergement
            </a>

            <a href="/overview" className="hover:text-[#b8975a] transition">
              Overview
            </a>

            <a href="/rooms" className="hover:text-[#b8975a] transition">
              Rooms
            </a>

            <a href="/suites" className="hover:text-[#b8975a] transition">
              Suites
            </a>

            <a href="/villas" className="hover:text-[#b8975a] transition">
              Villas
            </a>

          </div>
        </div>

        {/* LOGO */}
        <div
          className="absolute left-1/2 -translate-x-1/2
          text-white text-3xl tracking-[4px] font-light"
        >
          ✦ Alhambra ✦
        </div>

        {/* RIGHT */}
        <div className="flex-1 flex items-center justify-end gap-6">

          <div className="hidden md:flex gap-8 uppercase tracking-[3px] text-[11px] text-white">

            <a href="#" className="hover:text-[#b8975a] transition">
              À Propos
            </a>

            <a href="#" className="hover:text-[#b8975a] transition">
              Contact
            </a>
          </div>

          <div className="hidden md:block w-px h-4 bg-[#b8965a59]" />

          <button className="text-white hover:text-[#b8975a] transition">
            <Search size={18} />
          </button>

          <button className="text-white hover:text-[#b8975a] transition">
            <User size={18} />
          </button>

          <button className="text-white hover:text-[#b8975a] transition">
            <ShoppingBag size={18} />
          </button>

          {/* MOBILE */}
          <button
            className="md:hidden text-white text-2xl"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
      </nav>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-40
          bg-[#1a1208f7]
          flex flex-col items-center justify-center
          gap-10 text-white text-3xl"
        >

          <a href="/">Home</a>

          <a href="/overview">Overview</a>

          <a href="/rooms">Rooms</a>

          <a href="/suites">Suites</a>

          <a href="/villas">Villas</a>

        </div>
      )}
    </>
  );
}

export default Navbar;