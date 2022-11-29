import "./App.css";
import Complain from "./components/complain/Complain";
import Track from "./components/track/Track";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Committee from "./components/committee/Committee";
import Municipal from "./components/municipal/Municipal";
import Industry from "./components/industry/Industry";
import MunicipalDashboard from "./components/municipal/MunicipalDashboard";
import CommitteelDashboard from "./components/committee/CommitteeDashboard";
import Mvp from "./components/dutta/Mvp";
import IndustryDashboard from "./components/industry/IndustryDashboard";
// import IndustryLogin from "./components/industry/IndustryLogin";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Complain />} />
        <Route path="/committee" element={<Committee />} />
        <Route path="/municipal" element={<Municipal />} />
        <Route path="/track" element={<Track />} />
        <Route path="/industry" element={<Industry />} />
        <Route path="/municipalDashboard" element={<MunicipalDashboard />} />
        <Route path="/committeeDashboard" element={<CommitteelDashboard />} />
        <Route path="/indDash" element={<IndustryDashboard />} />
        {/* <Route path="/industryLogin" element={<IndustryLogin />} /> */}
        <Route path="/mvp" element={<Mvp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
