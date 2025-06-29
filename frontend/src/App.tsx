import { Navigate, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import MainLayout from "./layout/MainLayout";
import AdminDashboard from "./pages/admin/admin-dashboard";
import ForgotPassword from "./pages/auth/forgot-password/ForgotPassword";
import Login from "./pages/auth/login/Login";
import Register from "./pages/auth/register/Register";
import ResetPassword from "./pages/auth/reset-password/ResetPassword";
import HRDashboard from "./pages/hr/hr-dashboard";
import NotFound from "./pages/notfound/NotFound";
import StaffDashboard from "./pages/staff/staff-dashboard";
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
        <Route path="/admin" element={<MainLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="analytics" element={<AdminAnalytics />} />
          <Route path="reports" element={<AdminReports />} />
          <Route path="sales" element={<AdminSales />} />
          <Route path="inventory" element={<AdminInventory />} />
          <Route path="purchases" element={<AdminPurchases />} />
          <Route path="expenses" element={<AdminExpenses />} />
          <Route path="employees" element={<AdminEmployees />} />
          <Route path="attendance" element={<AdminAttendance />} />
          <Route path="payroll" element={<AdminPayroll />} />
          <Route path="menu" element={<AdminMenu />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="kitchen" element={<AdminKitchen />} />
          <Route path="settings" element={<AdminSettings />} />
          <Route path="security" element={<AdminSecurity />} />
          <Route path="backup" element={<AdminBackup />} />
        </Route>
      </Route>

      {/* HR routes with MainLayout */}
      <Route element={<ProtectedRoute roles={["hr"]} />}>
        <Route path="/hr" element={<MainLayout />}>
          <Route index element={<HRDashboard />} />
          <Route path="analytics" element={<HRAnalytics />} />
          <Route path="employees" element={<HREmployees />} />
          <Route path="recruitment" element={<HRRecruitment />} />
          <Route path="performance" element={<HRPerformance />} />
          <Route path="training" element={<HRTraining />} />
          <Route path="attendance" element={<HRAttendance />} />
          <Route path="schedules" element={<HRSchedules />} />
          <Route path="overtime" element={<HROvertime />} />
          <Route path="payroll" element={<HRPayroll />} />
          <Route path="benefits" element={<HRBenefits />} />
          <Route path="advances" element={<HRAdvances />} />
          <Route path="compliance" element={<HRCompliance />} />
          <Route path="documents" element={<HRDocuments />} />
        </Route>
      </Route>

      {/* Staff routes with MainLayout */}
      <Route element={<ProtectedRoute roles={["staff"]} />}>
        <Route path="/staff" element={<MainLayout />}>
          <Route index element={<StaffDashboard />} />
          <Route path="profile" element={<StaffProfile />} />
          <Route path="orders" element={<StaffOrders />} />
          <Route path="tables" element={<StaffTables />} />
          <Route path="service" element={<StaffService />} />
          <Route path="kitchen" element={<StaffKitchen />} />
          <Route path="preparation" element={<StaffPreparation />} />
          <Route path="quality" element={<StaffQuality />} />
          <Route path="inventory" element={<StaffInventory />} />
          <Route path="requests" element={<StaffRequests />} />
          <Route path="schedule" element={<StaffSchedule />} />
          <Route path="attendance" element={<StaffAttendance />} />
          <Route path="leave" element={<StaffLeave />} />
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
                  ? "/hr"
                  : "/staff"
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
