import {Routes, Route} from "react-router-dom";
//import AlhambraRooms from "./hotel-alhambra/hotel-service/rooms";
import AboutUs from "./hotel-alhambra/about-us";
import Restaurants from "./hotel-alhambra/hotel-service/restaurant";
import ContactPage from "./hotel-alhambra/contact-us";
import PaymentPage from "./hotel-alhambra/payment";
import BookingPage from "./hotel-alhambra/hotel-service/booking";
import MaintenancePage from "./hotel-alhambra/admin/maintenance";
import Login from "./hotel-alhambra/conexcion/log_in";
import RoomDetailPage from "./hotel-alhambra/hotel-service/RoomDetailPage";
import Rooms from "./hotel-alhambra/hotel-service/rooms";
import LoginPage from "./hotel-alhambra/conexcion/log_in";
import ReservationsPage from "./hotel-alhambra/admin/reservation";
import Chambres from "./hotel-alhambra/admin/chambre";
import Suites from "./hotel-alhambra/hotel-service/suites";
import Villas from "./hotel-alhambra/hotel-service/villas";
import Home from "./hotel-alhambra/home"
import Stay from "./hotel-alhambra/hotel-service/stay";
import Maintenance from "./hotel-alhambra/admin/maintences";

function App() {
  return (
    <Routes>

      <Route path="/" element={<Home />} />

      {/* <Route path="/" element={<ReservationsPage />} /> */}
      <Route path="/about-us" element={<AboutUs />} />
        <Route path="/stay" element={<Stay />} />
      {/* <Route path="/" element={<AboutUs />} /> */}
      {/* <Route path="/restaurants" element={<Restaurant />} /> */}
      <Route path="/contact-us" element={<ContactPage />} />
      <Route path="/payment" element={<PaymentPage />} />
      <Route path="/booking" element={<BookingPage />} />
      <Route path="/maintenance" element={<MaintenancePage />} />
        <Route path="/room/:roomId" element={<RoomDetailPage />} />
        <Route path="/restaurants" element={<Restaurants />} />
        <Route path="/:roomId" element={<BookingPage />} /> 
        <Route path="/hotel-service/rooms" element={<Rooms />} />
        <Route path="/hotel-service/suites" element={<Suites />} />
        <Route path="/hotel-service/villas" element={<Villas />} />
        <Route path="/admin/reservation" element={<ReservationsPage />} />
        {/* <Route path="/admin/chambres" element={<Chambres />} /> */}
        <Route path="/log-in" element={<LoginPage />} />
        <Route path="/booking/:roomId" element={<BookingPage />} />
    </Routes>
  );
}
export default App;