import { Routes, Route, Navigate } from "react-router-dom";
import AboutUs from "./hotel-alhambra/about-us";
import Restaurants from "./hotel-alhambra/hotel-service/restaurant";
import ContactPage from "./hotel-alhambra/contact-us";
import PaymentPage from "./hotel-alhambra/payment";
import BookingPage from "./hotel-alhambra/hotel-service/BookingPage";
import MaintenancePage from "./hotel-alhambra/admin/maintenance";
import RoomDetailPage from "./hotel-alhambra/hotel-service/RoomDetailPage";
import Rooms from "./hotel-alhambra/hotel-service/rooms";
import LoginPage from "./hotel-alhambra/conexcion/log_in";
import ReservationsPage from "./hotel-alhambra/admin/reservation";
import Chambres from "./hotel-alhambra/admin/chambre";
import Suites from "./hotel-alhambra/hotel-service/suites";
import Villas from "./hotel-alhambra/hotel-service/villas";
import Home from "./hotel-alhambra/home";
import Stay from "./hotel-alhambra/hotel-service/stay";

// Admin console imports
import DashboardConsole from "./hotel-alhambra/admin/dashboard";
import PaymentsPage from "./hotel-alhambra/admin/payments";
import UsersPage from "./hotel-alhambra/admin/users";

// Context imports
import { AuthProvider, useAuth } from "./context/AuthContext";

// Sidebar import
import Sidebar from "./hotel-alhambra/composant/Sidebar";

// Shared Admin layout with role verification
function AdminLayout({ allowedRoles, children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div style={{
        display: "flex", justifyContent: "center", alignItems: "center",
        height: "100vh", background: "#f4efe6", color: "#1a1208", fontSize: "1.2rem",
        fontFamily: "'Cormorant Garamond', serif"
      }}>
        Loading Alhambra Console...
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/log-in" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    const redirectPath = user.role === "housekeeping" ? "/maintenance" : "/dashboard";
    return <Navigate to={redirectPath} replace />;
  }

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#f4efe6" }}>
      <Sidebar />
      <div className="admin-layout-main" style={{ flex: 1, marginLeft: "260px", minWidth: 0 }}>
        {children}
      </div>
      <style>{`
        .admin-layout-main {
          margin-left: 260px;
          transition: margin-left 0.2s ease;
        }
        @media (max-width: 900px) {
          .admin-layout-main { margin-left: 64px !important; }
        }
      `}</style>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
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
        <Route path="/log-in" element={<LoginPage />} />
        <Route path="/booking/:roomId" element={<BookingPage />} />

        {/* Protected Dashboard & Operations Routes */}
        <Route 
          path="/dashboard" 
          element={
            <AdminLayout allowedRoles={["admin", "receptionist"]}>
              <DashboardConsole />
            </AdminLayout>
          } 
        />
        <Route 
          path="/admin/reservation" 
          element={
            <AdminLayout allowedRoles={["admin", "receptionist"]}>
              <ReservationsPage />
            </AdminLayout>
          } 
        />
        <Route 
          path="/admin/chambres" 
          element={
            <AdminLayout allowedRoles={["admin", "receptionist", "housekeeping"]}>
              <Chambres />
            </AdminLayout>
          } 
        />
        <Route 
          path="/payments" 
          element={
            <AdminLayout allowedRoles={["admin", "receptionist"]}>
              <PaymentsPage />
            </AdminLayout>
          } 
        />
        <Route 
          path="/maintenance" 
          element={
            <AdminLayout allowedRoles={["admin", "housekeeping"]}>
              <MaintenancePage />
            </AdminLayout>
          } 
        />
        <Route 
          path="/users" 
          element={
            <AdminLayout allowedRoles={["admin"]}>
              <UsersPage />
            </AdminLayout>
          } 
        />

        {/* Catch-all Redirect */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;