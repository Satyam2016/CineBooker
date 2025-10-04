import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./Pages/LandingPage";
import CustomerPage from "./Pages/CustomerPage";
import ProtectedRoute from "./Components/ProtectedRoute";
import CineBookerDashboard from "./Components/Admin/CineBookerDashboard";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/customer"
          element={
            <ProtectedRoute>
              <CustomerPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <CineBookerDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}
