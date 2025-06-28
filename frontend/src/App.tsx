import { Navigate, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import MainLayout from "./layout/MainLayout";
import ForgotPassword from "./pages/auth/forgot-password/ForgotPassword";
import Login from "./pages/auth/login/Login";
import Register from "./pages/auth/register/Register";
import ResetPassword from "./pages/auth/reset-password/ResetPassword";
import AdminDashboard from "./pages/dashboard/admin-dashboard/admin-dashboard";
import HRDashboard from "./pages/dashboard/hr-dashboard/hr-dashboard";
import StaffDashboard from "./pages/dashboard/staff-dashboard/staff-dashboard";
import NotFound from "./pages/notfound/NotFound";
import { useAuth } from "./providers/AuthProvider";

// Admin Pages
import AdminAnalytics from "./pages/admin/AdminAnalytics";
import AdminAttendance from "./pages/admin/AdminAttendance";
import AdminBackup from "./pages/admin/AdminBackup";
import AdminEmployees from "./pages/admin/AdminEmployees";
import AdminExpenses from "./pages/admin/AdminExpenses";
import AdminInventory from "./pages/admin/AdminInventory";
import AdminKitchen from "./pages/admin/AdminKitchen";
import AdminMenu from "./pages/admin/AdminMenu";
import AdminOrders from "./pages/admin/AdminOrders";
import AdminPayroll from "./pages/admin/AdminPayroll";
import AdminPurchases from "./pages/admin/AdminPurchases";
import AdminReports from "./pages/admin/AdminReports";
import AdminSales from "./pages/admin/AdminSales";
import AdminSecurity from "./pages/admin/AdminSecurity";
import AdminSettings from "./pages/admin/AdminSettings";

// HR Pages
import HRAdvances from "./pages/hr/HRAdvances";
import HRAnalytics from "./pages/hr/HRAnalytics";
import HRAttendance from "./pages/hr/HRAttendance";
import HRBenefits from "./pages/hr/HRBenefits";
import HRCompliance from "./pages/hr/HRCompliance";
import HRDocuments from "./pages/hr/HRDocuments";
import HREmployees from "./pages/hr/HREmployees";
import HROvertime from "./pages/hr/HROvertime";
import HRPayroll from "./pages/hr/HRPayroll";
import HRPerformance from "./pages/hr/HRPerformance";
import HRRecruitment from "./pages/hr/HRRecruitment";
import HRSchedules from "./pages/hr/HRSchedules";
import HRTraining from "./pages/hr/HRTraining";

// Staff Pages
import StaffAttendance from "./pages/staff/StaffAttendance";
import StaffInventory from "./pages/staff/StaffInventory";
import StaffKitchen from "./pages/staff/StaffKitchen";
import StaffLeave from "./pages/staff/StaffLeave";
import StaffOrders from "./pages/staff/StaffOrders";
import StaffPreparation from "./pages/staff/StaffPreparation";
import StaffProfile from "./pages/staff/StaffProfile";
import StaffQuality from "./pages/staff/StaffQuality";
import StaffRequests from "./pages/staff/StaffRequests";
import StaffSchedule from "./pages/staff/StaffSchedule";
import StaffService from "./pages/staff/StaffService";
import StaffTables from "./pages/staff/StaffTables";

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

      {/* Admin routes with MainLayout */}
      <Route element={<ProtectedRoute roles={["admin"]} />}>
        <Route element={<MainLayout />}>
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/admin/analytics" element={<AdminAnalytics />} />
          <Route path="/admin/reports" element={<AdminReports />} />
          <Route path="/admin/sales" element={<AdminSales />} />
          <Route path="/admin/inventory" element={<AdminInventory />} />
          <Route path="/admin/purchases" element={<AdminPurchases />} />
          <Route path="/admin/expenses" element={<AdminExpenses />} />
          <Route path="/admin/employees" element={<AdminEmployees />} />
          <Route path="/admin/attendance" element={<AdminAttendance />} />
          <Route path="/admin/payroll" element={<AdminPayroll />} />
          <Route path="/admin/menu" element={<AdminMenu />} />
          <Route path="/admin/orders" element={<AdminOrders />} />
          <Route path="/admin/kitchen" element={<AdminKitchen />} />
          <Route path="/admin/settings" element={<AdminSettings />} />
          <Route path="/admin/security" element={<AdminSecurity />} />
          <Route path="/admin/backup" element={<AdminBackup />} />
        </Route>
      </Route>

      {/* HR routes with MainLayout */}
      <Route element={<ProtectedRoute roles={["hr"]} />}>
        <Route element={<MainLayout />}>
          <Route path="/hr-dashboard" element={<HRDashboard />} />
          <Route path="/hr/analytics" element={<HRAnalytics />} />
          <Route path="/hr/employees" element={<HREmployees />} />
          <Route path="/hr/recruitment" element={<HRRecruitment />} />
          <Route path="/hr/performance" element={<HRPerformance />} />
          <Route path="/hr/training" element={<HRTraining />} />
          <Route path="/hr/attendance" element={<HRAttendance />} />
          <Route path="/hr/schedules" element={<HRSchedules />} />
          <Route path="/hr/overtime" element={<HROvertime />} />
          <Route path="/hr/payroll" element={<HRPayroll />} />
          <Route path="/hr/benefits" element={<HRBenefits />} />
          <Route path="/hr/advances" element={<HRAdvances />} />
          <Route path="/hr/compliance" element={<HRCompliance />} />
          <Route path="/hr/documents" element={<HRDocuments />} />
        </Route>
      </Route>

      {/* Staff routes with MainLayout */}
      <Route element={<ProtectedRoute roles={["staff"]} />}>
        <Route element={<MainLayout />}>
          <Route path="/staff-dashboard" element={<StaffDashboard />} />
          <Route path="/staff/profile" element={<StaffProfile />} />
          <Route path="/staff/orders" element={<StaffOrders />} />
          <Route path="/staff/tables" element={<StaffTables />} />
          <Route path="/staff/service" element={<StaffService />} />
          <Route path="/staff/kitchen" element={<StaffKitchen />} />
          <Route path="/staff/preparation" element={<StaffPreparation />} />
          <Route path="/staff/quality" element={<StaffQuality />} />
          <Route path="/staff/inventory" element={<StaffInventory />} />
          <Route path="/staff/requests" element={<StaffRequests />} />
          <Route path="/staff/schedule" element={<StaffSchedule />} />
          <Route path="/staff/attendance" element={<StaffAttendance />} />
          <Route path="/staff/leave" element={<StaffLeave />} />
        </Route>
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
