import "./App.css";
import Complain from "./components/complain/Complain";
import Track from "./components/track/Track";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Committee from "./components/committee/Committee";
import Municipal from "./components/municipal/Municipal";
import MunicipalDashboard from "./components/municipal/MunicipalDashboard";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Complain />} />
        <Route path="/committee" element={<Committee />} />
        <Route path="/municipal" element={<Municipal />} />
        <Route path="/track" element={<Track />} />
        <Route path="/municipalDashboard" element={<MunicipalDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
