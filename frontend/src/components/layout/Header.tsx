/**
 * Dynamic Role-Based Header Component
 * Shows relevant data and functionality based on user role (admin, hr, staff)
 */

import { AnimatePresence, motion } from "framer-motion";
import {
  AlertTriangle,
  Bell,
  ChefHat,
  ChevronDown,
  Clock,
  DollarSign,
  HelpCircle,
  LogOut,
  Menu,
  Moon,
  Package,
  Search,
  Settings,
  Shield,
  ShoppingCart,
  Sun,
  User,
  Users,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useGetAttendance, useGetEmployees } from "../../hooks/useHR";
import { useGetMenuItems } from "../../hooks/useMenuItems";
import { useGetSalesReport } from "../../hooks/useSales";
import { useGetStoreItems, type StoreItem } from "../../hooks/useStoreItems";
import { useTheme } from "../../hooks/useTheme";
import { cn } from "../../lib/utils";
import { useAuth } from "../../providers/AuthProvider";
import { Avatar } from "../ui/Avatar";
import { Badge } from "../ui/Badge";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Input } from "../ui/input";
import { Brand } from "./Brand";

interface HeaderProps {
  onMenuToggle?: () => void;
  showMobileMenu?: boolean;
  breadcrumbs?: string[];
}

interface RoleSpecificData {
  notifications: number;
  notificationItems: Array<{
    id: string;
    message: string;
    type: "info" | "warning" | "error" | "success";
    time: string;
    icon: React.ReactNode;
  }>;
  searchPlaceholder: string;
  quickActions: Array<{
    label: string;
    icon: React.ReactNode;
    href: string;
  }>;
}

export const Header: React.FC<HeaderProps> = ({
  onMenuToggle,
  showMobileMenu = false,
  breadcrumbs = [],
}) => {
  const [search, setSearch] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [roleData, setRoleData] = useState<RoleSpecificData>({
    notifications: 0,
    notificationItems: [],
    searchPlaceholder: "Search...",
    quickActions: [],
  });
  const { user, logout } = useAuth();
  const { resolvedTheme, toggleTheme } = useTheme();

  // Fetch role-specific data
  const { data: salesData } = useGetSalesReport("daily");
  const { data: employees } = useGetEmployees();
  const { data: attendance } = useGetAttendance();
  const { data: storeItems } = useGetStoreItems();
  const { data: menuItems } = useGetMenuItems();

  useEffect(() => {
    if (!user) return;

    const generateRoleData = (): RoleSpecificData => {
      const now = new Date();
      const currentHour = now.getHours();
      const isBusinessHours = currentHour >= 6 && currentHour <= 22;

      switch (user.role) {
        case "admin": {
          const adminNotifications = [];
          let adminNotificationCount = 0;

          // Low stock alerts (using simple threshold of 5 units)
          const lowStockItems =
            storeItems?.filter((item: StoreItem) => item.quantity <= 5) || [];
          if (lowStockItems.length > 0) {
            adminNotificationCount += lowStockItems.length;
            adminNotifications.push({
              id: "low-stock",
              message: `${lowStockItems.length} items low on stock`,
              type: "warning" as const,
              time: "5 min ago",
              icon: <Package className="w-4 h-4" />,
            });
          }

          // Recent sales
          if (salesData && salesData.length > 0) {
            adminNotificationCount += 1;
            adminNotifications.push({
              id: "recent-sales",
              message: `${salesData.length} sales today`,
              type: "info" as const,
              time: "1 hour ago",
              icon: <DollarSign className="w-4 h-4" />,
            });
          }

          // Employee attendance
          if (attendance) {
            const lateEmployees = attendance.filter(
              (a: { status: string }) => a.status === "late"
            );
            if (lateEmployees.length > 0) {
              adminNotificationCount += lateEmployees.length;
              adminNotifications.push({
                id: "late-employees",
                message: `${lateEmployees.length} employees late today`,
                type: "warning" as const,
                time: "30 min ago",
                icon: <Clock className="w-4 h-4" />,
              });
            }
          }

          return {
            notifications: adminNotificationCount,
            notificationItems: adminNotifications,
            searchPlaceholder:
              "Search orders, inventory, employees, reports...",
            quickActions: [
              {
                label: "Sales Report",
                icon: <DollarSign className="w-4 h-4" />,
                href: "/admin/sales",
              },
              {
                label: "Inventory",
                icon: <Package className="w-4 h-4" />,
                href: "/admin/inventory",
              },
              {
                label: "Employees",
                icon: <Users className="w-4 h-4" />,
                href: "/admin/employees",
              },
              {
                label: "Reports",
                icon: <Shield className="w-4 h-4" />,
                href: "/admin/reports",
              },
            ],
          };
        }

        case "hr": {
          const hrNotifications = [];
          let hrNotificationCount = 0;

          // Employee attendance
          if (attendance) {
            const absentEmployees = attendance.filter(
              (a: { status: string }) => a.status === "absent"
            );
            if (absentEmployees.length > 0) {
              hrNotificationCount += absentEmployees.length;
              hrNotifications.push({
                id: "absent-employees",
                message: `${absentEmployees.length} employees absent today`,
                type: "warning" as const,
                time: "1 hour ago",
                icon: <Users className="w-4 h-4" />,
              });
            }
          }

          // Pending approvals
          if (employees) {
            const pendingApprovals = employees.filter(
              (e: { status: string }) => e.status === "pending"
            );
            if (pendingApprovals.length > 0) {
              hrNotificationCount += pendingApprovals.length;
              hrNotifications.push({
                id: "pending-approvals",
                message: `${pendingApprovals.length} pending approvals`,
                type: "info" as const,
                time: "2 hours ago",
                icon: <Clock className="w-4 h-4" />,
              });
            }
          }

          return {
            notifications: hrNotificationCount,
            notificationItems: hrNotifications,
            searchPlaceholder:
              "Search employees, attendance, payroll, schedules...",
            quickActions: [
              {
                label: "Employees",
                icon: <Users className="w-4 h-4" />,
                href: "/hr/employees",
              },
              {
                label: "Attendance",
                icon: <Clock className="w-4 h-4" />,
                href: "/hr/attendance",
              },
              {
                label: "Payroll",
                icon: <DollarSign className="w-4 h-4" />,
                href: "/hr/payroll",
              },
              {
                label: "Schedules",
                icon: <Settings className="w-4 h-4" />,
                href: "/hr/schedules",
              },
            ],
          };
        }

        case "staff": {
          const staffNotifications = [];
          let staffNotificationCount = 0;

          // Kitchen orders
          if (isBusinessHours) {
            staffNotificationCount += 1;
            staffNotifications.push({
              id: "kitchen-orders",
              message: "New orders in kitchen",
              type: "info" as const,
              time: "2 min ago",
              icon: <ChefHat className="w-4 h-4" />,
            });
          }

          // Low inventory alerts (using simple threshold of 5 units)
          const lowStockForStaff =
            storeItems?.filter((item: StoreItem) => item.quantity <= 5) || [];
          if (lowStockForStaff.length > 0) {
            staffNotificationCount += lowStockForStaff.length;
            staffNotifications.push({
              id: "low-stock-staff",
              message: `${lowStockForStaff.length} items need restocking`,
              type: "warning" as const,
              time: "15 min ago",
              icon: <Package className="w-4 h-4" />,
            });
          }

          return {
            notifications: staffNotificationCount,
            notificationItems: staffNotifications,
            searchPlaceholder:
              "Search orders, menu items, inventory, tables...",
            quickActions: [
              {
                label: "Orders",
                icon: <ShoppingCart className="w-4 h-4" />,
                href: "/staff/orders",
              },
              {
                label: "Kitchen",
                icon: <ChefHat className="w-4 h-4" />,
                href: "/staff/kitchen",
              },
              {
                label: "Inventory",
                icon: <Package className="w-4 h-4" />,
                href: "/staff/inventory",
              },
              {
                label: "Tables",
                icon: <Users className="w-4 h-4" />,
                href: "/staff/tables",
              },
            ],
          };
        }

        default:
          return {
            notifications: 0,
            notificationItems: [],
            searchPlaceholder: "Search...",
            quickActions: [],
          };
      }
    };

    setRoleData(generateRoleData());
  }, [user, salesData, employees, attendance, storeItems, menuItems]);

  const handleLogout = () => {
    logout();
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "warning":
        return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
      case "error":
        return <AlertTriangle className="w-4 h-4 text-red-500" />;
      case "success":
        return <Shield className="w-4 h-4 text-green-500" />;
      default:
        return <Bell className="w-4 h-4 text-blue-500" />;
    }
  };

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={cn(
        "sticky top-0 z-50 w-full",
        "bg-background/95 backdrop-blur-xl border-b border-border/50",
        "shadow-sm dark:shadow-lg"
      )}
    >
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Left side - Menu, Brand, and Breadcrumbs */}
          <div className="flex items-center gap-4 lg:gap-6">
            {/* Mobile menu button */}
            {showMobileMenu && (
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onMenuToggle}
                  className="lg:hidden h-10 w-10 rounded-lg"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </motion.div>
            )}

            {/* Brand */}
            <div className="flex items-center gap-4">
              <Brand variant="compact" showTagline={false} />
            </div>

            {/* Breadcrumbs */}
            {breadcrumbs.length > 0 && (
              <nav className="hidden lg:flex items-center gap-2 text-sm">
                {breadcrumbs.map((crumb, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <motion.span
                      whileHover={{ scale: 1.02 }}
                      className="px-3 py-1.5 rounded-lg hover:bg-accent/50 transition-colors cursor-pointer font-medium text-muted-foreground hover:text-foreground"
                    >
                      {crumb}
                    </motion.span>
                    {index < breadcrumbs.length - 1 && (
                      <ChevronDown className="w-4 h-4 text-muted-foreground/50 rotate-[-90deg]" />
                    )}
                  </div>
                ))}
              </nav>
            )}
          </div>

          {/* Right side - Search, Notifications, Theme, User */}
          <div className="flex items-center gap-3">
            {/* Search */}
            <div className="relative hidden md:block">
              <motion.div
                animate={{
                  scale: isSearchFocused ? 1.02 : 1,
                  boxShadow: isSearchFocused
                    ? "0 0 0 3px hsl(var(--ring) / 0.2)"
                    : "0 0 0 0px transparent",
                }}
                transition={{ duration: 0.2 }}
                className="relative"
              >
                <Input
                  className={cn(
                    "w-80 pl-10 pr-4 h-10",
                    "bg-background/50 border-border/50 focus:border-primary/50",
                    "transition-all duration-200 rounded-lg",
                    "placeholder:text-muted-foreground/60",
                    "focus:bg-background/80"
                  )}
                  placeholder={roleData.searchPlaceholder}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                {search && (
                  <motion.button
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground hover:text-foreground"
                    onClick={() => setSearch("")}
                  >
                    ×
                  </motion.button>
                )}
              </motion.div>
            </div>

            {/* Notifications */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <motion.div whileTap={{ scale: 0.95 }}>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="relative h-10 w-10 rounded-lg"
                  >
                    <Bell className="h-5 w-5 text-muted-foreground" />
                    {roleData.notifications > 0 && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute -top-1 -right-1"
                      >
                        <Badge
                          variant="destructive"
                          className="h-5 w-5 p-0 flex items-center justify-center text-xs font-bold"
                        >
                          {roleData.notifications > 99
                            ? "99+"
                            : roleData.notifications}
                        </Badge>
                      </motion.div>
                    )}
                  </Button>
                </motion.div>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" className="w-80 p-2 z-[1000]">
                <DropdownMenuLabel className="flex items-center justify-between p-3">
                  <span className="font-medium">Notifications</span>
                  <Badge variant="outline" className="text-xs">
                    {roleData.notifications} new
                  </Badge>
                </DropdownMenuLabel>

                <DropdownMenuSeparator />

                {roleData.notificationItems.length > 0 ? (
                  <div className="max-h-64 overflow-y-auto">
                    {roleData.notificationItems.map((item) => (
                      <DropdownMenuItem
                        key={item.id}
                        className="flex items-start gap-3 p-3"
                      >
                        <div className="flex-shrink-0 mt-0.5">
                          {getNotificationIcon(item.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-foreground">
                            {item.message}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {item.time}
                          </p>
                        </div>
                      </DropdownMenuItem>
                    ))}
                  </div>
                ) : (
                  <div className="p-4 text-center text-muted-foreground">
                    <Bell className="w-8 h-8 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">No new notifications</p>
                  </div>
                )}

                <DropdownMenuSeparator />

                <div className="p-2">
                  <p className="text-xs text-muted-foreground mb-2">
                    Quick Actions
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {roleData.quickActions.map((action) => (
                      <a
                        key={action.label}
                        href={action.href}
                        className="flex items-center gap-2 p-2 rounded-lg hover:bg-accent/50 transition-colors text-sm"
                      >
                        {action.icon}
                        <span>{action.label}</span>
                      </a>
                    ))}
                  </div>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Theme Toggle */}
            <motion.div whileTap={{ scale: 0.95 }}>
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="h-10 w-10 rounded-lg"
              >
                <AnimatePresence mode="wait">
                  {resolvedTheme === "light" ? (
                    <motion.div
                      key="moon"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Moon className="h-5 w-5" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="sun"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Sun className="h-5 w-5" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </Button>
            </motion.div>

            {/* User Profile Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-accent/50 transition-colors"
                >
                  <Avatar
                    fallback={getInitials(user?.name || "User")}
                    size="sm"
                    className="border-2 border-border/50"
                  />
                  <div className="hidden sm:block text-left">
                    <p className="text-sm font-medium text-foreground">
                      {user?.name || "User"}
                    </p>
                    <p className="text-xs text-muted-foreground capitalize">
                      {user?.role || "Unknown"} Role
                    </p>
                  </div>
                  <ChevronDown className="hidden sm:block w-4 h-4 text-muted-foreground" />
                </motion.button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" className="w-64 p-2 z-[1000]">
                <DropdownMenuLabel className="flex items-center gap-2 p-3">
                  <Avatar
                    fallback={getInitials(user?.name || "User")}
                    size="sm"
                  />
                  <div>
                    <p className="font-medium text-foreground">
                      {user?.name || "User"}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {user?.email || "user@example.com"}
                    </p>
                    <Badge
                      variant="outline"
                      className="mt-1 text-xs capitalize"
                    >
                      {user?.role || "Unknown"}
                    </Badge>
                  </div>
                </DropdownMenuLabel>

                <DropdownMenuSeparator />

                <DropdownMenuGroup>
                  <DropdownMenuItem className="flex items-center gap-3 p-3">
                    <User className="w-4 h-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>

                  <DropdownMenuItem className="flex items-center gap-3 p-3">
                    <Settings className="w-4 h-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>

                  <DropdownMenuItem className="flex items-center gap-3 p-3">
                    <Shield className="w-4 h-4" />
                    <span>Security</span>
                  </DropdownMenuItem>

                  <DropdownMenuItem className="flex items-center gap-3 p-3">
                    <HelpCircle className="w-4 h-4" />
                    <span>Help & Support</span>
                  </DropdownMenuItem>
                </DropdownMenuGroup>

                <DropdownMenuSeparator />

                <DropdownMenuItem
                  onClick={handleLogout}
                  className="flex items-center gap-3 p-3 text-destructive focus:text-destructive"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
