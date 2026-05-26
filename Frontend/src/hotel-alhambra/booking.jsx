 <div style={{ padding: "48px 48px" }}>
          <h3 style={{ fontFamily: "Cormorant Garamond, serif", fontWeight: 300, fontSize: "1.8rem", color: "#3b2e1e", marginBottom: "2rem" }}>
            Your Reservation
          </h3>

          {/* DATES */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "20px" }}>
            <div>
              <label style={labelStyle}>Check-in</label>
              <input type="date" style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Check-out</label>
              <input type="date" style={inputStyle} />
            </div>
          </div>

          {/* GUESTS */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "20px" }}>
            <div>
              <label style={labelStyle}>Adults</label>
              <select style={inputStyle}>
                {[1, 2, 3, 4].map((n) => <option key={n}>{n}</option>)}
              </select>
            </div>
            <div>
              <label style={labelStyle}>Children</label>
              <select style={inputStyle}>
                {[0, 1, 2, 3].map((n) => <option key={n}>{n}</option>)}
              </select>
            </div>
          </div>

          {/* PERSONAL INFO */}
          <div style={{ marginBottom: "20px" }}>
            <label style={labelStyle}>Full Name</label>
            <input type="text" placeholder="Your full name" style={inputStyle} />
          </div>
          <div style={{ marginBottom: "20px" }}>
            <label style={labelStyle}>Email</label>
            <input type="email" placeholder="your@email.com" style={inputStyle} />
          </div>
          <div style={{ marginBottom: "20px" }}>
            <label style={labelStyle}>Phone</label>
            <input type="tel" placeholder="+212 600 000 000" style={inputStyle} />
          </div>

          {/* SPECIAL REQUESTS */}
          <div style={{ marginBottom: "32px" }}>
            <label style={labelStyle}>Special Requests</label>
            <textarea
              placeholder="Any special requests or notes..."
              rows={3}
              style={{ ...inputStyle, resize: "none", lineHeight: 1.6 }}
            />
          </div>

          {/* SUBMIT */}
          <button
            style={{
              width: "100%", background: "#b8975a", color: "#fff",
              border: "none", padding: "16px", cursor: "pointer",
              fontFamily: "Jost, sans-serif", fontSize: "0.75rem",
              letterSpacing: "0.16em", textTransform: "uppercase",
              transition: "background 0.2s",
            }}
            onMouseEnter={(e) => (e.target.style.background = "#9a7a42")}
            onMouseLeave={(e) => (e.target.style.background = "#b8975a")}
          >
            Confirm Reservation
          </button>

          <p style={{ marginTop: "1rem", fontSize: "0.72rem", color: "#aaa", textAlign: "center", lineHeight: 1.6 }}>
            Free cancellation up to 48 hours before arrival
          </p>
        </div>