import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./Pages/LandingPage";
import CustomerPage from "./Pages/CustomerPage";
import ProtectedRoute from "./Components/ProtectedRoute";
import CineBookerDashboard from "./Components/Admin/CineBookerDashboard";
import Dashboard from "./Pages/Dashboard";

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
         <Route
          path="/user"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}
