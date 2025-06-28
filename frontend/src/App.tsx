import { Navigate, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import ForgotPassword from "./pages/auth/forgot-password/ForgotPassword";
import Login from "./pages/auth/login/Login";
import Register from "./pages/auth/register/Register";
import ResetPassword from "./pages/auth/reset-password/ResetPassword";
import AdminDashboard from "./pages/dashboard/admin-dashboard/admin-dashboard";
import HRDashboard from "./pages/dashboard/hr-dashboard/hr-dashboard";
import StaffDashboard from "./pages/dashboard/staff-dashboard/staff-dashboard";
import NotFound from "./pages/notfound/NotFound";
import { useAuth } from "./providers/AuthProvider";

function App() {
  const { isAuthenticated, user, isLoading } = useAuth();

  // Show loading while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <Routes>
      {/* Public routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />

      {/* Protected routes */}
      <Route element={<ProtectedRoute roles={["admin"]} />}>
        <Route path="/admin" element={<AdminDashboard />} />
      </Route>

      <Route element={<ProtectedRoute roles={["hr"]} />}>
        <Route path="/hr-dashboard" element={<HRDashboard />} />
      </Route>

      <Route element={<ProtectedRoute roles={["staff"]} />}>
        <Route path="/staff-dashboard" element={<StaffDashboard />} />
      </Route>

      {/* Default route - redirect based on authentication and role */}
      <Route
        path="/"
        element={
          isAuthenticated && user ? (
            <Navigate
              to={
                user.role === "admin"
                  ? "/admin"
                  : user.role === "hr"
                  ? "/hr-dashboard"
                  : "/staff-dashboard"
              }
              replace
            />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />

      {/* Catch all route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
