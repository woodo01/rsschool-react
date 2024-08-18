import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import MainPage from "./pages/MainPage.tsx";
import UncontrolledFormPage from "./pages/UncontrolledFormPage.tsx";
import HookFormPage from "./pages/HookFormPage.tsx";

function App() {
  return (
    <Router>
      <nav>
        <ul>
          <li>
            <Link to="/">Main</Link>
          </li>
          <li>
            <Link to="/uncontrolled-form">Uncontrolled Form</Link>
          </li>
          <li>
            <Link to="/hook-form">Hook Form</Link>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/uncontrolled-form" element={<UncontrolledFormPage />} />
        <Route path="/hook-form" element={<HookFormPage />} />
      </Routes>
    </Router>
  );
}

export default App;
