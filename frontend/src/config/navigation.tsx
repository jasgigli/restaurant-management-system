/**
 * Navigation Configuration - Centralized navigation data
 * Defines all navigation links for different user roles
 */

import {
  AlertCircle,
  Award,
  BarChart3,
  // New icons for enhanced navigation
  Bell,
  BookOpen,
  Building,
  Calendar,
  Camera,
  CheckCircle,
  ChefHat,
  ClipboardList,
  Clock,
  CreditCard,
  DollarSign,
  Download,
  Eye,
  FileSpreadsheet,
  FileText,
  Gift,
  Heart,
  Home,
  Info,
  Menu,
  MessageSquare,
  Monitor,
  Package,
  Phone,
  PieChart,
  QrCode,
  Receipt,
  Server,
  Settings,
  Shield,
  ShoppingCart,
  Star,
  Tag,
  Target,
  Thermometer,
  Timer,
  Trash2,
  TrendingUp,
  Truck,
  UserCheck,
  UserPlus,
  Users,
  Utensils,
  Zap,
} from "lucide-react";
import React from "react";

export interface NavigationLink {
  to: string;
  label: string;
  icon: React.ReactNode;
  description: string;
  badge?: string | number;
  disabled?: boolean;
}

export interface NavigationSection {
  section: string;
  links: NavigationLink[];
}

export type NavigationConfig = NavigationSection[];

// Admin Navigation - Comprehensive Restaurant Management
export const adminNavigation: NavigationConfig = [
  {     
    section: "Dashboard & Analytics",
    links: [
      {
        to: "/admin",
        label: "Overview Dashboard",
        icon: <BarChart3 size={20} />,
        description: "Real-time business overview",
      },
      {
        to: "/admin/analytics",
        label: "Business Analytics",
        icon: <TrendingUp size={20} />,
        description: "Advanced analytics & insights",
      },
      {
        to: "/admin/reports",
        label: "Reports Center",
        icon: <FileText size={20} />,
        description: "Generate & export reports",
      },
      {
        to: "/admin/performance",
        label: "Performance Metrics",
        icon: <Target size={20} />,
        description: "KPI tracking & monitoring",
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
        description: "Track sales & revenue",
      },
      {
        to: "/admin/inventory",
        label: "Inventory Control",
        icon: <Package size={20} />,
        description: "Manage stock levels",
      },
      {
        to: "/admin/purchases",
        label: "Purchase Orders",
        icon: <ShoppingCart size={20} />,
        description: "Manage purchases & suppliers",
      },
      {
        to: "/admin/expenses",
        label: "Expense Tracking",
        icon: <Receipt size={20} />,
        description: "Monitor all expenses",
      },
      {
        to: "/admin/pricing",
        label: "Pricing Strategy",
        icon: <Tag size={20} />,
        description: "Menu pricing & strategies",
      },
      {
        to: "/admin/taxes",
        label: "Tax Management",
        icon: <FileSpreadsheet size={20} />,
        description: "Tax calculations & filing",
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
        description: "Manage all staff members",
      },
      {
        to: "/admin/attendance",
        label: "Attendance Tracking",
        icon: <Calendar size={20} />,
        description: "Monitor staff attendance",
      },
      {
        to: "/admin/payroll",
        label: "Payroll System",
        icon: <CreditCard size={20} />,
        description: "Process payroll & benefits",
      },
      {
        to: "/admin/recruitment",
        label: "Recruitment",
        icon: <UserPlus size={20} />,
        description: "Hiring & onboarding",
      },
      {
        to: "/admin/training",
        label: "Training Programs",
        icon: <Award size={20} />,
        description: "Staff development",
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
        description: "Create & manage menus",
      },
      {
        to: "/admin/orders",
        label: "Order Management",
        icon: <ClipboardList size={20} />,
        description: "Track all orders",
      },
      {
        to: "/admin/kitchen",
        label: "Kitchen Operations",
        icon: <ChefHat size={20} />,
        description: "Kitchen workflow management",
      },
      {
        to: "/admin/tables",
        label: "Table Management",
        icon: <Building size={20} />,
        description: "Reservations & seating",
      },
      {
        to: "/admin/customers",
        label: "Customer Database",
        icon: <UserCheck size={20} />,
        description: "Customer profiles & history",
      },
      {
        to: "/admin/reservations",
        label: "Reservation System",
        icon: <Calendar size={20} />,
        description: "Manage bookings",
      },
    ],
  },

  {
    section: "Business Management",
    links: [
      {
        to: "/admin/marketing",
        label: "Marketing & Promotions",
        icon: <Zap size={20} />,
        description: "Campaigns & promotions",
      },
      {
        to: "/admin/loyalty",
        label: "Loyalty Program",
        icon: <Heart size={20} />,
        description: "Customer rewards system",
      },
      {
        to: "/admin/feedback",
        label: "Customer Feedback",
        icon: <MessageSquare size={20} />,
        description: "Reviews & ratings",
      },
      {
        to: "/admin/competitors",
        label: "Competitor Analysis",
        icon: <Eye size={20} />,
        description: "Market research",
      },
    ],
  },
  {
    section: "System Administration",
    links: [
      {
        to: "/admin/settings",
        label: "System Settings",
        icon: <Settings size={20} />,
        description: "Configure system",
      },
      {
        to: "/admin/security",
        label: "Security & Access",
        icon: <Shield size={20} />,
        description: "User permissions & security",
      },
      {
        to: "/admin/backup",
        label: "Backup & Restore",
        icon: <Download size={20} />,
        description: "Data backup & recovery",
      },
      {
        to: "/admin/logs",
        label: "System Logs",
        icon: <FileText size={20} />,
        description: "Activity monitoring",
      },
      {
        to: "/admin/api",
        label: "API Management",
        icon: <Server size={20} />,
        description: "API keys & endpoints",
      },
    ],
  },
  {
    section: "Support & Communication",
    links: [
      {
        to: "/admin/notifications",
        label: "Notifications Center",
        icon: <Bell size={20} />,
        description: "System notifications",
        badge: "5",
      },
      {
        to: "/admin/help",
        label: "Help & Support",
        icon: <Info size={20} />,
        description: "Documentation & support",
      },
      {
        to: "/admin/contact",
        label: "Contact Management",
        icon: <Phone size={20} />,
        description: "Vendor & partner contacts",
      },
    ],
  },
];

// HR Navigation - Comprehensive HR Management
export const hrNavigation: NavigationConfig = [
  {
    section: "HR Dashboard",
    links: [
      {
        to: "/hr",
        label: "HR Overview",
        icon: <UserCheck size={20} />,
        description: "HR dashboard & metrics",
      },
      {
        to: "/hr/analytics",
        label: "HR Analytics",
        icon: <PieChart size={20} />,
        description: "Employee analytics & insights",
      },
      {
        to: "/hr/reports",
        label: "HR Reports",
        icon: <FileText size={20} />,
        description: "Generate HR reports",
      },
    ],
  },
  {
    section: "Employee Management",
    links: [
      {
        to: "/hr/employees",
        label: "Employee Directory",
        icon: <Users size={20} />,
        description: "Manage all employees",
      },
      {
        to: "/hr/recruitment",
        label: "Recruitment",
        icon: <UserPlus size={20} />,
        description: "Hiring & onboarding process",
      },
      {
        to: "/hr/performance",
        label: "Performance Reviews",
        icon: <Target size={20} />,
        description: "Employee evaluations",
      },
      {
        to: "/hr/training",
        label: "Training & Development",
        icon: <Award size={20} />,
        description: "Training programs",
      },
      {
        to: "/hr/career",
        label: "Career Development",
        icon: <TrendingUp size={20} />,
        description: "Career paths & growth",
      },
    ],
  },
  {
    section: "Time & Attendance",
    links: [
      {
        to: "/hr/attendance",
        label: "Attendance Tracking",
        icon: <Calendar size={20} />,
        description: "Monitor attendance",
      },
      {
        to: "/hr/schedules",
        label: "Schedule Management",
        icon: <Clock size={20} />,
        description: "Create & manage schedules",
      },
      {
        to: "/hr/overtime",
        label: "Overtime Management",
        icon: <Timer size={20} />,
        description: "Overtime tracking & approval",
      },
      {
        to: "/hr/leave",
        label: "Leave Management",
        icon: <Calendar size={20} />,
        description: "Vacation & sick leave",
      },
      {
        to: "/hr/shifts",
        label: "Shift Management",
        icon: <Clock size={20} />,
        description: "Shift planning & rotation",
      },
    ],
  },
  {
    section: "Payroll & Benefits",
    links: [
      {
        to: "/hr/payroll",
        label: "Payroll Processing",
        icon: <DollarSign size={20} />,
        description: "Process payroll",
      },
      {
        to: "/hr/benefits",
        label: "Benefits Management",
        icon: <Gift size={20} />,
        description: "Employee benefits",
      },
      {
        to: "/hr/advances",
        label: "Salary Advances",
        icon: <CreditCard size={20} />,
        description: "Manage advances",
      },
      {
        to: "/hr/taxes",
        label: "Tax Management",
        icon: <FileSpreadsheet size={20} />,
        description: "Tax deductions & filing",
      },
      {
        to: "/hr/compensation",
        label: "Compensation Plans",
        icon: <DollarSign size={20} />,
        description: "Salary structures",
      },
    ],
  },
  {
    section: "Compliance & Legal",
    links: [
      {
        to: "/hr/compliance",
        label: "Legal Compliance",
        icon: <Shield size={20} />,
        description: "Labor law compliance",
      },
      {
        to: "/hr/documents",
        label: "HR Documents",
        icon: <FileText size={20} />,
        description: "Employee documents",
      },
      {
        to: "/hr/policies",
        label: "Company Policies",
        icon: <BookOpen size={20} />,
        description: "Policy management",
      },
      {
        to: "/hr/contracts",
        label: "Employment Contracts",
        icon: <FileText size={20} />,
        description: "Contract management",
      },
    ],
  },
  {
    section: "Health & Safety",
    links: [
      {
        to: "/hr/health",
        label: "Health Records",
        icon: <Heart size={20} />,
        description: "Employee health data",
      },
      {
        to: "/hr/safety",
        label: "Safety Management",
        icon: <Shield size={20} />,
        description: "Workplace safety",
      },
      {
        to: "/hr/incidents",
        label: "Incident Reports",
        icon: <AlertCircle size={20} />,
        description: "Accident reporting",
      },
    ],
  },
  {
    section: "Communication",
    links: [
      {
        to: "/hr/notifications",
        label: "HR Notifications",
        icon: <Bell size={20} />,
        description: "HR announcements",
        badge: "3",
      },
      {
        to: "/hr/feedback",
        label: "Employee Feedback",
        icon: <MessageSquare size={20} />,
        description: "Feedback collection",
      },
      {
        to: "/hr/surveys",
        label: "Employee Surveys",
        icon: <ClipboardList size={20} />,
        description: "Conduct surveys",
      },
    ],
  },
];

// Staff Navigation - Frontline Operations
export const staffNavigation: NavigationConfig = [
  {
    section: "My Dashboard",
    links: [
      {
        to: "/staff",
        label: "My Dashboard",
        icon: <Home size={20} />,
        description: "Personal overview",
      },
      {
        to: "/staff/profile",
        label: "My Profile",
        icon: <UserCheck size={20} />,
        description: "Update personal info",
      },
      {
        to: "/staff/performance",
        label: "My Performance",
        icon: <Target size={20} />,
        description: "View performance metrics",
      },
    ],
  },
  {
    section: "Orders & Service",
    links: [
      {
        to: "/staff/orders",
        label: "Order Management",
        icon: <ClipboardList size={20} />,
        description: "View & manage orders",
      },
      {
        to: "/staff/tables",
        label: "Table Management",
        icon: <Building size={20} />,
        description: "Manage table assignments",
      },
      {
        to: "/staff/service",
        label: "Customer Service",
        icon: <Star size={20} />,
        description: "Customer interactions",
      },
      {
        to: "/staff/reservations",
        label: "Reservations",
        icon: <Calendar size={20} />,
        description: "Handle bookings",
      },
      {
        to: "/staff/feedback",
        label: "Customer Feedback",
        icon: <MessageSquare size={20} />,
        description: "Collect feedback",
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
        description: "View kitchen orders",
      },
      {
        to: "/staff/preparation",
        label: "Food Preparation",
        icon: <Utensils size={20} />,
        description: "Prepare food items",
      },
      {
        to: "/staff/quality",
        label: "Quality Control",
        icon: <CheckCircle size={20} />,
        description: "Quality checks",
      },
      {
        to: "/staff/recipes",
        label: "Recipe Book",
        icon: <BookOpen size={20} />,
        description: "Access recipes",
      },
      {
        to: "/staff/temperature",
        label: "Temperature Logs",
        icon: <Thermometer size={20} />,
        description: "Food safety monitoring",
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
      {
        to: "/staff/receiving",
        label: "Receive Deliveries",
        icon: <Truck size={20} />,
        description: "Process deliveries",
      },
      {
        to: "/staff/waste",
        label: "Waste Management",
        icon: <Trash2 size={20} />,
        description: "Track food waste",
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
        description: "View work schedule",
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
      {
        to: "/staff/overtime",
        label: "Overtime Requests",
        icon: <Timer size={20} />,
        description: "Request overtime",
      },
    ],
  },
  {
    section: "Digital Tools",
    links: [
      {
        to: "/staff/pos",
        label: "POS Terminal",
        icon: <Monitor size={20} />,
        description: "Point of sale",
      },
      {
        to: "/staff/qr",
        label: "QR Code Scanner",
        icon: <QrCode size={20} />,
        description: "Scan QR codes",
      },
      {
        to: "/staff/camera",
        label: "Photo Capture",
        icon: <Camera size={20} />,
        description: "Take photos",
      },
    ],
  },
  {
    section: "Communication",
    links: [
      {
        to: "/staff/notifications",
        label: "Notifications",
        icon: <Bell size={20} />,
        description: "View notifications",
        badge: "2",
      },
      {
        to: "/staff/messages",
        label: "Team Messages",
        icon: <MessageSquare size={20} />,
        description: "Team communication",
      },
      {
        to: "/staff/help",
        label: "Help & Support",
        icon: <Info size={20} />,
        description: "Get help",
      },
    ],
  },
];

// Navigation helper functions
export const getNavigationByRole = (role: string): NavigationConfig => {
  switch (role) {
    case "admin":
      return adminNavigation;
    case "hr":
      return hrNavigation;
    case "staff":
      return staffNavigation;
    default:
      return [];
  }
};

export const getAllNavigationLinks = (role: string): NavigationLink[] => {
  const navigation = getNavigationByRole(role);
  return navigation.flatMap((section) => section.links);
};

export const getPageTitle = (pathname: string): string => {
  const allLinks = [
    ...getAllNavigationLinks("admin"),
    ...getAllNavigationLinks("hr"),
    ...getAllNavigationLinks("staff"),
  ];

  const link = allLinks.find((link) => link.to === pathname);
  return link?.label || "Dashboard";
};
