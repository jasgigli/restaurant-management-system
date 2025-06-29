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
import AdminAPI from "./pages/admin/AdminAPI";
import AdminAttendance from "./pages/admin/AdminAttendance";
import AdminBackup from "./pages/admin/AdminBackup";
import AdminCompetitors from "./pages/admin/AdminCompetitors";
import AdminContact from "./pages/admin/AdminContact";
import AdminCustomers from "./pages/admin/AdminCustomers";
import AdminEmployees from "./pages/admin/AdminEmployees";
import AdminExpenses from "./pages/admin/AdminExpenses";
import AdminFeedback from "./pages/admin/AdminFeedback";
import AdminHelp from "./pages/admin/AdminHelp";
import AdminIntegrations from "./pages/admin/AdminIntegrations";
import AdminInventory from "./pages/admin/AdminInventory";
import AdminKitchen from "./pages/admin/AdminKitchen";
import AdminLogs from "./pages/admin/AdminLogs";
import AdminLoyalty from "./pages/admin/AdminLoyalty";
import AdminMarketing from "./pages/admin/AdminMarketing";
import AdminMenu from "./pages/admin/AdminMenu";
import AdminMobileApp from "./pages/admin/AdminMobileApp";
import AdminNotifications from "./pages/admin/AdminNotifications";
import AdminOnlineOrders from "./pages/admin/AdminOnlineOrders";
import AdminOrders from "./pages/admin/AdminOrders";
import AdminPayroll from "./pages/admin/AdminPayroll";
import AdminPerformance from "./pages/admin/AdminPerformance";
import AdminPOS from "./pages/admin/AdminPOS";
import AdminPricing from "./pages/admin/AdminPricing";
import AdminPurchases from "./pages/admin/AdminPurchases";
import AdminRecruitment from "./pages/admin/AdminRecruitment";
import AdminReports from "./pages/admin/AdminReports";
import AdminReservations from "./pages/admin/AdminReservations";
import AdminSales from "./pages/admin/AdminSales";
import AdminSecurity from "./pages/admin/AdminSecurity";
import AdminSettings from "./pages/admin/AdminSettings";
import AdminTables from "./pages/admin/AdminTables";
import AdminTaxes from "./pages/admin/AdminTaxes";
import AdminTraining from "./pages/admin/AdminTraining";

// HR Pages
import HRAdvances from "./pages/hr/HRAdvances";
import HRAnalytics from "./pages/hr/HRAnalytics";
import HRAttendance from "./pages/hr/HRAttendance";
import HRBenefits from "./pages/hr/HRBenefits";
import HRCareer from "./pages/hr/HRCareer";
import HRCompensation from "./pages/hr/HRCompensation";
import HRCompliance from "./pages/hr/HRCompliance";
import HRContracts from "./pages/hr/HRContracts";
import HRDocuments from "./pages/hr/HRDocuments";
import HREmployees from "./pages/hr/HREmployees";
import HRFeedback from "./pages/hr/HRFeedback";
import HRHealth from "./pages/hr/HRHealth";
import HRIncidents from "./pages/hr/HRIncidents";
import HRLeave from "./pages/hr/HRLeave";
import HRNotifications from "./pages/hr/HRNotifications";
import HROvertime from "./pages/hr/HROvertime";
import HRPayroll from "./pages/hr/HRPayroll";
import HRPerformance from "./pages/hr/HRPerformance";
import HRPolicies from "./pages/hr/HRPolicies";
import HRRecruitment from "./pages/hr/HRRecruitment";
import HRReports from "./pages/hr/HRReports";
import HRSafety from "./pages/hr/HRSafety";
import HRSchedules from "./pages/hr/HRSchedules";
import HRShifts from "./pages/hr/HRShifts";
import HRSurveys from "./pages/hr/HRSurveys";
import HRTaxes from "./pages/hr/HRTaxes";
import HRTraining from "./pages/hr/HRTraining";

// Staff Pages
import StaffAttendance from "./pages/staff/StaffAttendance";
import StaffCamera from "./pages/staff/StaffCamera";
import StaffFeedback from "./pages/staff/StaffFeedback";
import StaffHelp from "./pages/staff/StaffHelp";
import StaffInventory from "./pages/staff/StaffInventory";
import StaffKitchen from "./pages/staff/StaffKitchen";
import StaffLeave from "./pages/staff/StaffLeave";
import StaffMessages from "./pages/staff/StaffMessages";
import StaffNotifications from "./pages/staff/StaffNotifications";
import StaffOrders from "./pages/staff/StaffOrders";
import StaffOvertime from "./pages/staff/StaffOvertime";
import StaffPerformance from "./pages/staff/StaffPerformance";
import StaffPOS from "./pages/staff/StaffPOS";
import StaffPreparation from "./pages/staff/StaffPreparation";
import StaffProfile from "./pages/staff/StaffProfile";
import StaffQR from "./pages/staff/StaffQR";
import StaffQuality from "./pages/staff/StaffQuality";
import StaffReceiving from "./pages/staff/StaffReceiving";
import StaffRecipes from "./pages/staff/StaffRecipes";
import StaffRequests from "./pages/staff/StaffRequests";
import StaffReservations from "./pages/staff/StaffReservations";
import StaffSchedule from "./pages/staff/StaffSchedule";
import StaffService from "./pages/staff/StaffService";
import StaffTables from "./pages/staff/StaffTables";
import StaffTemperature from "./pages/staff/StaffTemperature";
import StaffWaste from "./pages/staff/StaffWaste";

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
          <Route path="performance" element={<AdminPerformance />} />
          <Route path="sales" element={<AdminSales />} />
          <Route path="inventory" element={<AdminInventory />} />
          <Route path="purchases" element={<AdminPurchases />} />
          <Route path="expenses" element={<AdminExpenses />} />
          <Route path="pricing" element={<AdminPricing />} />
          <Route path="taxes" element={<AdminTaxes />} />
          <Route path="employees" element={<AdminEmployees />} />
          <Route path="attendance" element={<AdminAttendance />} />
          <Route path="payroll" element={<AdminPayroll />} />
          <Route path="recruitment" element={<AdminRecruitment />} />
          <Route path="training" element={<AdminTraining />} />
          <Route path="menu" element={<AdminMenu />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="kitchen" element={<AdminKitchen />} />
          <Route path="tables" element={<AdminTables />} />
          <Route path="customers" element={<AdminCustomers />} />
          <Route path="reservations" element={<AdminReservations />} />
          <Route path="marketing" element={<AdminMarketing />} />
          <Route path="loyalty" element={<AdminLoyalty />} />
          <Route path="feedback" element={<AdminFeedback />} />
          <Route path="competitors" element={<AdminCompetitors />} />
          <Route path="settings" element={<AdminSettings />} />
          <Route path="security" element={<AdminSecurity />} />
          <Route path="backup" element={<AdminBackup />} />
          <Route path="logs" element={<AdminLogs />} />
          <Route path="api" element={<AdminAPI />} />
          <Route path="notifications" element={<AdminNotifications />} />
          <Route path="help" element={<AdminHelp />} />
          <Route path="contact" element={<AdminContact />} />
          <Route path="pos" element={<AdminPOS />} />
          <Route path="online-orders" element={<AdminOnlineOrders />} />
          <Route path="mobile-app" element={<AdminMobileApp />} />
          <Route path="integrations" element={<AdminIntegrations />} />
        </Route>
      </Route>

      {/* HR routes with MainLayout */}
      <Route element={<ProtectedRoute roles={["hr"]} />}>
        <Route path="/hr" element={<MainLayout />}>
          <Route index element={<HRDashboard />} />
          <Route path="analytics" element={<HRAnalytics />} />
          <Route path="reports" element={<HRReports />} />
          <Route path="employees" element={<HREmployees />} />
          <Route path="recruitment" element={<HRRecruitment />} />
          <Route path="performance" element={<HRPerformance />} />
          <Route path="training" element={<HRTraining />} />
          <Route path="career" element={<HRCareer />} />
          <Route path="attendance" element={<HRAttendance />} />
          <Route path="schedules" element={<HRSchedules />} />
          <Route path="overtime" element={<HROvertime />} />
          <Route path="leave" element={<HRLeave />} />
          <Route path="shifts" element={<HRShifts />} />
          <Route path="payroll" element={<HRPayroll />} />
          <Route path="benefits" element={<HRBenefits />} />
          <Route path="advances" element={<HRAdvances />} />
          <Route path="taxes" element={<HRTaxes />} />
          <Route path="compensation" element={<HRCompensation />} />
          <Route path="compliance" element={<HRCompliance />} />
          <Route path="documents" element={<HRDocuments />} />
          <Route path="policies" element={<HRPolicies />} />
          <Route path="contracts" element={<HRContracts />} />
          <Route path="health" element={<HRHealth />} />
          <Route path="safety" element={<HRSafety />} />
          <Route path="incidents" element={<HRIncidents />} />
          <Route path="notifications" element={<HRNotifications />} />
          <Route path="feedback" element={<HRFeedback />} />
          <Route path="surveys" element={<HRSurveys />} />
        </Route>
      </Route>

      {/* Staff routes with MainLayout */}
      <Route element={<ProtectedRoute roles={["staff"]} />}>
        <Route path="/staff" element={<MainLayout />}>
          <Route index element={<StaffDashboard />} />
          <Route path="profile" element={<StaffProfile />} />
          <Route path="performance" element={<StaffPerformance />} />
          <Route path="orders" element={<StaffOrders />} />
          <Route path="tables" element={<StaffTables />} />
          <Route path="service" element={<StaffService />} />
          <Route path="reservations" element={<StaffReservations />} />
          <Route path="feedback" element={<StaffFeedback />} />
          <Route path="kitchen" element={<StaffKitchen />} />
          <Route path="preparation" element={<StaffPreparation />} />
          <Route path="quality" element={<StaffQuality />} />
          <Route path="recipes" element={<StaffRecipes />} />
          <Route path="temperature" element={<StaffTemperature />} />
          <Route path="inventory" element={<StaffInventory />} />
          <Route path="requests" element={<StaffRequests />} />
          <Route path="receiving" element={<StaffReceiving />} />
          <Route path="waste" element={<StaffWaste />} />
          <Route path="schedule" element={<StaffSchedule />} />
          <Route path="attendance" element={<StaffAttendance />} />
          <Route path="leave" element={<StaffLeave />} />
          <Route path="overtime" element={<StaffOvertime />} />
          <Route path="pos" element={<StaffPOS />} />
          <Route path="qr" element={<StaffQR />} />
          <Route path="camera" element={<StaffCamera />} />
          <Route path="notifications" element={<StaffNotifications />} />
          <Route path="messages" element={<StaffMessages />} />
          <Route path="help" element={<StaffHelp />} />
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

      {/* Catch all route - wrapped with MainLayout for consistency */}
      <Route path="*" element={<MainLayout />}>
        <Route index element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
