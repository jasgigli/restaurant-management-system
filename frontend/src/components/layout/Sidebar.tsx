import {
  AlertCircle,
  Award,
  BarChart3,
  Building,
  Calendar,
  CheckCircle,
  ChefHat,
  ClipboardList,
  Clock,
  DollarSign,
  Download,
  FileText,
  Gift,
  Home,
  LogOut,
  Menu,
  Package,
  PieChart,
  Receipt,
  Settings,
  Shield,
  ShoppingCart,
  Star,
  Target,
  TrendingUp,
  UserCheck,
  Users,
  Utensils,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../providers/AuthProvider";

// Admin Navigation Links
const adminNavLinks = [
  {
    section: "Dashboard",
    links: [
      {
        to: "/admin-dashboard",
        label: "Overview",
        icon: <BarChart3 size={20} />,
        description: "Main dashboard view",
      },
      {
        to: "/admin/analytics",
        label: "Analytics",
        icon: <TrendingUp size={20} />,
        description: "Business analytics",
      },
      {
        to: "/admin/reports",
        label: "Reports",
        icon: <FileText size={20} />,
        description: "Generate reports",
      },
    ],
  },
  {
    section: "Financial Management",
    links: [
      {
        to: "/admin/sales",
        label: "Sales Management",
        icon: <DollarSign size={20} />,
        description: "Track sales and revenue",
      },
      {
        to: "/admin/inventory",
        label: "Inventory Control",
        icon: <Package size={20} />,
        description: "Manage stock levels",
      },
      {
        to: "/admin/purchases",
        label: "Purchases",
        icon: <ShoppingCart size={20} />,
        description: "Manage purchases",
      },
      {
        to: "/admin/expenses",
        label: "Expenses",
        icon: <Receipt size={20} />,
        description: "Track expenses",
      },
    ],
  },
  {
    section: "Human Resources",
    links: [
      {
        to: "/admin/employees",
        label: "Employee Management",
        icon: <Users size={20} />,
        description: "Manage staff",
      },
      {
        to: "/admin/attendance",
        label: "Attendance",
        icon: <Calendar size={20} />,
        description: "Track attendance",
      },
      {
        to: "/admin/payroll",
        label: "Payroll",
        icon: <DollarSign size={20} />,
        description: "Manage payroll",
      },
    ],
  },
  {
    section: "Restaurant Operations",
    links: [
      {
        to: "/admin/menu",
        label: "Menu Management",
        icon: <Menu size={20} />,
        description: "Manage menu items",
      },
      {
        to: "/admin/orders",
        label: "Order Management",
        icon: <ClipboardList size={20} />,
        description: "Track orders",
      },
      {
        to: "/admin/kitchen",
        label: "Kitchen Operations",
        icon: <ChefHat size={20} />,
        description: "Kitchen management",
      },
    ],
  },
  {
    section: "System Management",
    links: [
      {
        to: "/admin/settings",
        label: "System Settings",
        icon: <Settings size={20} />,
        description: "Configure system",
      },
      {
        to: "/admin/security",
        label: "Security",
        icon: <Shield size={20} />,
        description: "Security settings",
      },
      {
        to: "/admin/backup",
        label: "Backup & Restore",
        icon: <Download size={20} />,
        description: "Data backup",
      },
    ],
  },
];

// HR Navigation Links
const hrNavLinks = [
  {
    section: "Dashboard",
    links: [
      {
        to: "/hr-dashboard",
        label: "HR Overview",
        icon: <UserCheck size={20} />,
        description: "HR dashboard",
      },
      {
        to: "/hr/analytics",
        label: "HR Analytics",
        icon: <PieChart size={20} />,
        description: "Employee analytics",
      },
    ],
  },
  {
    section: "Employee Management",
    links: [
      {
        to: "/hr/employees",
        label: "All Employees",
        icon: <Users size={20} />,
        description: "View all employees",
      },
      {
        to: "/hr/recruitment",
        label: "Recruitment",
        icon: <UserCheck size={20} />,
        description: "Hire new staff",
      },
      {
        to: "/hr/performance",
        label: "Performance",
        icon: <Target size={20} />,
        description: "Performance reviews",
      },
      {
        to: "/hr/training",
        label: "Training",
        icon: <Award size={20} />,
        description: "Training programs",
      },
    ],
  },
  {
    section: "Attendance & Time",
    links: [
      {
        to: "/hr/attendance",
        label: "Attendance",
        icon: <Calendar size={20} />,
        description: "Track attendance",
      },
      {
        to: "/hr/schedules",
        label: "Schedules",
        icon: <Clock size={20} />,
        description: "Manage schedules",
      },
      {
        to: "/hr/overtime",
        label: "Overtime",
        icon: <Clock size={20} />,
        description: "Overtime tracking",
      },
    ],
  },
  {
    section: "Payroll & Benefits",
    links: [
      {
        to: "/hr/payroll",
        label: "Payroll",
        icon: <DollarSign size={20} />,
        description: "Process payroll",
      },
      {
        to: "/hr/benefits",
        label: "Benefits",
        icon: <Gift size={20} />,
        description: "Employee benefits",
      },
      {
        to: "/hr/advances",
        label: "Salary Advances",
        icon: <DollarSign size={20} />,
        description: "Manage advances",
      },
    ],
  },
  {
    section: "Compliance",
    links: [
      {
        to: "/hr/compliance",
        label: "Compliance",
        icon: <Shield size={20} />,
        description: "Legal compliance",
      },
      {
        to: "/hr/documents",
        label: "Documents",
        icon: <FileText size={20} />,
        description: "HR documents",
      },
    ],
  },
];

// Staff Navigation Links
const staffNavLinks = [
  {
    section: "Dashboard",
    links: [
      {
        to: "/staff-dashboard",
        label: "My Dashboard",
        icon: <Home size={20} />,
        description: "Personal dashboard",
      },
      {
        to: "/staff/profile",
        label: "My Profile",
        icon: <UserCheck size={20} />,
        description: "Update profile",
      },
    ],
  },
  {
    section: "Orders & Service",
    links: [
      {
        to: "/staff/orders",
        label: "Orders",
        icon: <ClipboardList size={20} />,
        description: "View orders",
      },
      {
        to: "/staff/tables",
        label: "Table Management",
        icon: <Building size={20} />,
        description: "Manage tables",
      },
      {
        to: "/staff/service",
        label: "Customer Service",
        icon: <Star size={20} />,
        description: "Customer interactions",
      },
    ],
  },
  {
    section: "Kitchen Operations",
    links: [
      {
        to: "/staff/kitchen",
        label: "Kitchen Orders",
        icon: <ChefHat size={20} />,
        description: "Kitchen tasks",
      },
      {
        to: "/staff/preparation",
        label: "Food Preparation",
        icon: <Utensils size={20} />,
        description: "Prepare food",
      },
      {
        to: "/staff/quality",
        label: "Quality Control",
        icon: <CheckCircle size={20} />,
        description: "Quality checks",
      },
    ],
  },
  {
    section: "Inventory & Stock",
    links: [
      {
        to: "/staff/inventory",
        label: "Check Inventory",
        icon: <Package size={20} />,
        description: "View stock levels",
      },
      {
        to: "/staff/requests",
        label: "Stock Requests",
        icon: <AlertCircle size={20} />,
        description: "Request supplies",
      },
    ],
  },
  {
    section: "My Schedule",
    links: [
      {
        to: "/staff/schedule",
        label: "My Schedule",
        icon: <Calendar size={20} />,
        description: "View schedule",
      },
      {
        to: "/staff/attendance",
        label: "Clock In/Out",
        icon: <Clock size={20} />,
        description: "Time tracking",
      },
      {
        to: "/staff/leave",
        label: "Leave Requests",
        icon: <Calendar size={20} />,
        description: "Request time off",
      },
    ],
  },
];

const Sidebar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const getNavLinks = () => {
    if (!user) return [];

    switch (user.role) {
      case "admin":
        return adminNavLinks;
      case "hr":
        return hrNavLinks;
      case "staff":
        return staffNavLinks;
      default:
        return [];
    }
  };

  const navLinks = getNavLinks();

  return (
    <aside className="h-screen w-80 bg-gradient-to-b from-purple-900 via-purple-800 to-purple-900 text-white flex flex-col shadow-2xl">
      {/* Header */}
      <div className="p-6 border-b border-purple-700">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
            <ChefHat className="w-6 h-6 text-purple-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">RMS</h2>
            <p className="text-xs text-purple-200">
              Restaurant Management System
            </p>
          </div>
        </div>
        <div className="mt-4 p-3 bg-purple-800 rounded-lg">
          <p className="text-sm text-purple-200">Welcome back,</p>
          <p className="font-semibold text-white">{user?.name || "User"}</p>
          <p className="text-xs text-purple-300 capitalize">
            {user?.role || "Unknown"} Role
          </p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-4 space-y-6">
        {navLinks.map((section, sectionIndex) => (
          <div key={sectionIndex} className="space-y-3">
            <h3 className="text-xs font-semibold text-purple-300 uppercase tracking-wider px-3">
              {section.section}
            </h3>
            <ul className="space-y-1">
              {section.links.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className={`group flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 hover:bg-purple-700 hover:shadow-lg ${
                      location.pathname === link.to
                        ? "bg-purple-600 text-white shadow-lg border-l-4 border-yellow-400"
                        : "text-purple-100 hover:text-white"
                    }`}
                  >
                    <div
                      className={`transition-transform duration-200 group-hover:scale-110 ${
                        location.pathname === link.to
                          ? "text-yellow-400"
                          : "text-purple-300 group-hover:text-white"
                      }`}
                    >
                      {link.icon}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{link.label}</p>
                      <p className="text-xs text-purple-300 group-hover:text-purple-200">
                        {link.description}
                      </p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-purple-700">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-xs text-purple-200">Online</span>
          </div>
          <button
            onClick={logout}
            className="flex items-center gap-2 px-3 py-2 text-purple-200 hover:text-white hover:bg-purple-700 rounded-lg transition-colors"
          >
            <LogOut size={16} />
            <span className="text-sm">Logout</span>
          </button>
        </div>
        <div className="text-xs text-purple-300 text-center">
          © 2024 RMS. All rights reserved.
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
