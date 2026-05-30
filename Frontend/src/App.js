import React, { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AboutUs from "./hotel-alhambra/about-us";
import Restaurants from "./hotel-alhambra/hotel-service/restaurant";
import ContactPage from "./hotel-alhambra/contact-us";
import PaymentPage from "./hotel-alhambra/payment";
import BookingPage from "./hotel-alhambra/hotel-service/BookingPage";
import RoomDetailPage from "./hotel-alhambra/hotel-service/RoomDetailPage";
import Rooms from "./hotel-alhambra/hotel-service/rooms";
import LoginPage from "./hotel-alhambra/conexcion/log_in";
import Suites from "./hotel-alhambra/hotel-service/suites";
import Villas from "./hotel-alhambra/hotel-service/villas";
import Home from "./hotel-alhambra/home";
import Stay from "./hotel-alhambra/hotel-service/stay";
import SpaAlhambraPage from "./hotel-alhambra/hotel-service/spa"

// Context imports
import { AuthProvider, useAuth } from "./context/AuthContext";

// Profile screen (Lazy Loaded for Bundle Optimization)
const ProfilePage = lazy(() => import("./hotel-alhambra/profile"));

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div style={{
        display: "flex", justifyContent: "center", alignItems: "center",
        height: "100vh", background: "#f4efe6", color: "#1a1208", fontSize: "1.2rem",
        fontFamily: "'Cormorant Garamond', serif"
      }}>
        Loading...
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/log-in" replace />;
  }

  return children;
}

const AlhambraLoader = () => (
  <div style={{
    display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center",
    height: "100vh", background: "#1a1208", color: "#f4efe6", fontSize: "1.5rem",
    fontFamily: "'Cormorant Garamond', serif", letterSpacing: "2px"
  }}>
    <div className="alhambra-spinner"></div>
    <div style={{ marginTop: "20px" }}>ALHAMBRA</div>
    <style>{`
      .alhambra-spinner {
        width: 50px;
        height: 50px;
        border: 2px solid rgba(244, 239, 230, 0.1);
        border-top: 2px solid #d4af37;
        border-radius: 50%;
        animation: spin 1s linear infinite;
      }
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `}</style>
  </div>
);

function App() {
  return (
    <AuthProvider>
      <Suspense fallback={<AlhambraLoader />}>
        <Routes>
          {/* Public Routes */}

          <Route path="/" element={<Home />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/stay" element={<Stay />} />
          <Route path="/contact-us" element={<ContactPage />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/booking" element={<BookingPage />} />
          <Route path="/room/:roomId" element={<RoomDetailPage />} />
          <Route path="/restaurants" element={<Restaurants />} />
          <Route path="/:roomId" element={<BookingPage />} /> 
          <Route path="/hotel-service/rooms" element={<Rooms />} />
          <Route path="/hotel-service/suites" element={<Suites />} />
          <Route path="/hotel-service/villas" element={<Villas />} />
          <Route path="/hotel-service/spa" element={<SpaAlhambraPage />} />
          <Route path="/log-in" element={<LoginPage />} />
          <Route path="/booking/:roomId" element={<BookingPage />} />
          <Route 
            path="/profile" 
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            } 
          />

          {/* Catch-all Redirect */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </AuthProvider>
  );
}

export default App;