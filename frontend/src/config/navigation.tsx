/**
 * Navigation Configuration - Centralized navigation data
 * Defines all navigation links for different user roles
 */

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

// Admin Navigation
export const adminNavigation: NavigationConfig = [
  {
    section: "Dashboard",
    links: [
      {
        to: "/admin",
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

// HR Navigation
export const hrNavigation: NavigationConfig = [
  {
    section: "Dashboard",
    links: [
      {
        to: "/hr",
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
        label: "Employees",
        icon: <Users size={20} />,
        description: "Manage employees",
      },
      {
        to: "/hr/recruitment",
        label: "Recruitment",
        icon: <UserCheck size={20} />,
        description: "Hiring process",
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
    section: "Time & Attendance",
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

// Staff Navigation
export const staffNavigation: NavigationConfig = [
  {
    section: "Dashboard",
    links: [
      {
        to: "/staff",
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
