import "./App.css";
import Complain from "./components/complain/Complain";
import Track from "./components/track/Track";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Committee from "./components/committee/Committee";
import Municipal from "./components/municipal/Municipal";
<<<<<<< HEAD
import Industry from "./components/industry/Industry";
=======
import MunicipalDashboard from "./components/municipal/MunicipalDashboard";
import CommitteelDashboard from "./components/committee/CommitteeDashboard";

>>>>>>> 1f845eb1d8b5048a5ce848477c701b22372bd116

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Complain />} />
        <Route path="/committee" element={<Committee />} />
        <Route path="/municipal" element={<Municipal />} />
        <Route path="/track" element={<Track />} />
<<<<<<< HEAD
        <Route path="/industry" element={<Industry/>} />
=======
        <Route path="/municipalDashboard" element={<MunicipalDashboard />} />
        <Route path="/committeeDashboard" element={<CommitteelDashboard />} />
>>>>>>> 1f845eb1d8b5048a5ce848477c701b22372bd116
      </Routes>
    </BrowserRouter>
  );
}

export default App;
