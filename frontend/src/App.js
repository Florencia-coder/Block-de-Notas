import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./components/home/Home";
import LoginPage from "./components/loginPage/LoginPage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route exact path="/home" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
