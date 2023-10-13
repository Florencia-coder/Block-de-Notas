import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./components/home/Home";
import ArchivedPage from "./components/archivedPage/ArchivedPage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/archived" element={<ArchivedPage />} />
      </Routes>
    </div>
  );
}

export default App;
