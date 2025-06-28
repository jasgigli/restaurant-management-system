import { useLocation } from "react-router-dom";
import { useAuth } from "../../providers/AuthProvider";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

const pageTitles: Record<string, string> = {
  // Admin routes
  "/admin": "Admin Dashboard",
  "/admin/analytics": "Analytics",
  "/admin/reports": "Reports",
  "/admin/sales": "Sales Management",
  "/admin/inventory": "Inventory Control",
  "/admin/purchases": "Purchases",
  "/admin/expenses": "Expenses",
  "/admin/employees": "Employee Management",
  "/admin/attendance": "Attendance",
  "/admin/payroll": "Payroll",
  "/admin/menu": "Menu Management",
  "/admin/orders": "Order Management",
  "/admin/kitchen": "Kitchen Operations",
  "/admin/settings": "System Settings",
  "/admin/security": "Security",
  "/admin/backup": "Backup & Restore",

  // HR routes
  "/hr-dashboard": "HR Dashboard",
  "/hr/analytics": "HR Analytics",
  "/hr/employees": "All Employees",
  "/hr/recruitment": "Recruitment",
  "/hr/performance": "Performance",
  "/hr/training": "Training",
  "/hr/attendance": "Attendance",
  "/hr/schedules": "Schedules",
  "/hr/overtime": "Overtime",
  "/hr/payroll": "Payroll",
  "/hr/benefits": "Benefits",
  "/hr/advances": "Salary Advances",
  "/hr/compliance": "Compliance",
  "/hr/documents": "Documents",

  // Staff routes
  "/staff-dashboard": "Staff Dashboard",
  "/staff/profile": "My Profile",
  "/staff/orders": "Orders",
  "/staff/tables": "Table Management",
  "/staff/service": "Customer Service",
  "/staff/kitchen": "Kitchen Orders",
  "/staff/preparation": "Food Preparation",
  "/staff/quality": "Quality Control",
  "/staff/inventory": "Check Inventory",
  "/staff/requests": "Stock Requests",
  "/staff/schedule": "My Schedule",
  "/staff/attendance": "Clock In/Out",
  "/staff/leave": "Leave Requests",
};

const Header = () => {
  const location = useLocation();
  const { user, logout } = useAuth();
  const title = pageTitles[location.pathname] || "Dashboard";

  return (
    <header className="flex items-center justify-between px-6 py-4 border-b bg-background">
      <h1 className="text-xl font-semibold tracking-tight">{title}</h1>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="flex items-center gap-2">
            <span>{user?.name}</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
};

export default Header;
