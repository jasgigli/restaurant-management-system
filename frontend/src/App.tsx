import { Navigate, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import MainLayout from "./layout/MainLayout";
import Assets from "./pages/assets/Assets";
import Login from "./pages/auth/login/Login";
import Register from "./pages/auth/register/Register";
import AdminDashboard from "./pages/dashboard/admin-dashboard/admin-dashboard";
import HRDashboard from "./pages/dashboard/hr-dashboard/hr-dashboard";
import StaffDashboard from "./pages/dashboard/staff-dashboard/staff-dashboard";
import HR from "./pages/hr/HR";
import Menu from "./pages/menu/Menu";
import POS from "./pages/sales/POS";
import Warehouse from "./pages/warehouse/Warehouse";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      {/* Admin Dashboard - only for admin */}
      <Route element={<ProtectedRoute roles={["admin"]} />}>
        <Route path="/admin" element={<AdminDashboard />} />
      </Route>
      {/* HR Dashboard - only for hr */}
      <Route element={<ProtectedRoute roles={["hr"]} />}>
        <Route path="/hr" element={<HRDashboard />} />
      </Route>
      {/* Staff Dashboard - only for staff */}
      <Route element={<ProtectedRoute roles={["staff"]} />}>
        <Route path="/staff-dashboard" element={<StaffDashboard />} />
      </Route>
      {/* Other protected routes (if needed) */}
      <Route element={<ProtectedRoute />}>
        <Route element={<MainLayout />}>
          <Route path="/warehouse" element={<Warehouse />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/pos" element={<POS />} />
          <Route path="/hr/*" element={<HR />} />
          <Route path="/assets" element={<Assets />} />
        </Route>
      </Route>
      {/* Redirect all unknown routes to login */}
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}

export default App;
