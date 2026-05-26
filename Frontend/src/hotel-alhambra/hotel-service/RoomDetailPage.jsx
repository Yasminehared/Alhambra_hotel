import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../composant/header";
import Footer from "../composant/footer";

export default function RoomDetailPage() {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadRoomDetail() {
      try {
        setLoading(true);
        const res = await axios.get(`/api/room-types/${roomId}`);
        setRoom(res.data);
      } catch (err) {
        console.error("Error loading room detail", err);
      } finally {
        setLoading(false);
      }
    }
    loadRoomDetail();
  }, [roomId]);

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", background: "#f7f3ee", fontFamily: "Jost, sans-serif" }}>
        Loading Room Details...
      </div>
    );
  }

  if (!room) return <p style={{ padding: "100px 40px", fontFamily: "Jost, sans-serif" }}>Room not found</p>;

  const imageSrc = room.hero_image || (room.images && room.images[0]) || "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1200&q=80";

  return (
    <div style={{ minHeight: "100vh", background: "#f7f3ee", paddingTop: "80px" }}>
      <Header />

      {/* BACK BUTTON */}
      <div style={{ padding: "24px 40px 0" }}>
        <button
          onClick={() => navigate(-1)}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            fontFamily: "Jost, sans-serif",
            fontSize: "0.75rem",
            letterSpacing: "0.12em",
            color: "#3b2e1e",
            textTransform: "uppercase",
          }}
        >
          ← Back
        </button>
      </div>

      {/* HERO IMAGE */}
      <div style={{ margin: "24px 40px 0", overflow: "hidden", height: "500px" }}>
        <img
          src={imageSrc}
          alt={room.name}
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
        />
      </div>

      {/* CONTENT */}
      <div style={{ padding: "48px 40px 80px", maxWidth: "700px" }}>
        <p style={{ fontSize: "0.7rem", letterSpacing: "0.18em", color: "#b8975a", textTransform: "uppercase", marginBottom: "1rem" }}>
          ALHAMBRA HOTEL
        </p>
        <h1 style={{ fontFamily: "Cormorant Garamond, serif", fontWeight: 300, fontSize: "3rem", color: "#3b2e1e", marginBottom: "1.5rem" }}>
          {room.name}
        </h1>
        <p style={{ fontSize: "0.95rem", lineHeight: 1.9, color: "#6b5c4c", marginBottom: "2.5rem" }}>
          {room.description}
        </p>

        <button
          onClick={() => navigate(`/booking/${room.id}`)}
          style={{
            background: "#b8975a",
            color: "#fff",
            border: "none",
            padding: "14px 36px",
            cursor: "pointer",
            fontFamily: "Jost, sans-serif",
            fontSize: "0.75rem",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            transition: "background 0.2s",
          }}
          onMouseEnter={(e) => (e.target.style.background = "#9a7a42")}
          onMouseLeave={(e) => (e.target.style.background = "#b8975a")}
        >
          BOOK NOW
        </button>
      </div>
    </div>
  );
}