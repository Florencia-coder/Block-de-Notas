import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/homePage/Home";
import SesionPage from "./pages/sesionPage/SesionPage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<SesionPage />} />
        <Route exact path="/home" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
