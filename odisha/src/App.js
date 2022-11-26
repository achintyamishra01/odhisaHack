import "./App.css";
import Complain from "./components/complain/Complain";
import Track from "./components/track/Track";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Complain />} />
        <Route path="/track" element={<Track />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
