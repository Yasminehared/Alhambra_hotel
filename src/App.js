import {Routes, Route} from "react-router-dom";
import AlhambraRooms from "./hotel-alhambra/hotel-service/rooms";
import AboutUs from "./hotel-alhambra/about-us";

function App() {
  return (
    <Routes>
      <Route path="/" element={<AlhambraRooms />} />
      <Route path="/about-us" element={<AboutUs />} />
      
    </Routes>
  );
}
export default App;