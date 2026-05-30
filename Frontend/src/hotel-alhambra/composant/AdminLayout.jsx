import React from "react";
import Sidebar from "./Sidebar";

export default function AdminLayout({ children }) {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar />
      <main style={{ flex: 1, marginLeft: 260, transition: "margin-left 0.3s" }}>
        {children}
      </main>
      <style>{`
        @media (max-width: 900px) {
          main { margin-left: 64px !important; }
        }
      `}</style>
    </div>
  );
}
