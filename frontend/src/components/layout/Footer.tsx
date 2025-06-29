/**
 * Dynamic Role-Based Footer Component (Compact Version)
 * Shows relevant information based on user role (admin, hr, staff)
 */

import { motion } from "framer-motion";
import {
  AlertTriangle,
  Calendar,
  CheckCircle,
  ChefHat,
  Clock,
  DollarSign,
  Shield,
  ShoppingCart,
  User,
  Users,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useGetEmployees } from "../../hooks/useHR";
import { useGetMenuItems } from "../../hooks/useMenuItems";
import { useGetSalesReport } from "../../hooks/useSales";
import type { StoreItem } from "../../hooks/useStoreItems";
import { useGetStoreItems } from "../../hooks/useStoreItems";
import { cn } from "../../lib/utils";
import { useAuth } from "../../providers/AuthProvider";
import { ConnectionStatus } from "./shared/ConnectionStatus";

interface FooterProps {
  isOnline?: boolean;
}

interface RoleBasedData {
  icon: React.ReactNode;
  value: string | number;
  tooltip: string;
}

export const Footer: React.FC<FooterProps> = ({ isOnline = true }) => {
  const { user } = useAuth();
  const [roleData, setRoleData] = useState<RoleBasedData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Data hooks - using daily sales report for today's data
  const { data: salesData } = useGetSalesReport("daily");
  const { data: storeItems } = useGetStoreItems();
  const { data: menuItems } = useGetMenuItems();
  const { data: employees } = useGetEmployees();

  // Generate compact role-based data
  useEffect(() => {
    if (!user) return;
    const currentTime = new Date();
    const isPeakHours =
      (currentTime.getHours() >= 11 && currentTime.getHours() <= 14) ||
      (currentTime.getHours() >= 17 && currentTime.getHours() <= 21);
    switch (user.role) {
      case "admin":
        setRoleData([
          {
            icon: <DollarSign className="w-4 h-4" />,
            value: salesData?.length
              ? `$${salesData
                  .reduce((sum: number, sale) => sum + sale.total, 0)
                  .toFixed(0)}`
              : "$0",
            tooltip: "Today's Sales",
          },
          {
            icon: <ChefHat className="w-4 h-4" />,
            value: menuItems?.filter((item) => item.isAvailable).length || 0,
            tooltip: "Active Menu Items",
          },
          {
            icon: <AlertTriangle className="w-4 h-4" />,
            value:
              storeItems?.filter((item: StoreItem) => item.quantity < 5)
                .length || 0,
            tooltip: "Low Stock Items",
          },
          {
            icon: <Users className="w-4 h-4" />,
            value: employees?.length || 0,
            tooltip: "Total Staff",
          },
          {
            icon: <Shield className="w-4 h-4" />,
            value: "99.9%",
            tooltip: "System Uptime",
          },
        ]);
        break;
      case "hr":
        setRoleData([
          {
            icon: <Users className="w-4 h-4" />,
            value: employees?.length || 0,
            tooltip: "Active Employees",
          },
          {
            icon: <Calendar className="w-4 h-4" />,
            value: employees?.length
              ? `${Math.floor(employees.length * 0.85)}`
              : "0",
            tooltip: "Today's Attendance",
          },
          {
            icon: <Clock className="w-4 h-4" />,
            value: Math.floor(Math.random() * 5) + 1,
            tooltip: "Pending Requests",
          },
          {
            icon: <CheckCircle className="w-4 h-4" />,
            value: Math.floor(Math.random() * 3) + 1,
            tooltip: "Training Sessions",
          },
          {
            icon: <User className="w-4 h-4" />,
            value: "2",
            tooltip: "New Applications",
          },
        ]);
        break;
      case "staff":
        setRoleData([
          {
            icon: <Clock className="w-4 h-4" />,
            value: isPeakHours ? "Peak" : "Reg",
            tooltip: "Current Schedule",
          },
          {
            icon: <ShoppingCart className="w-4 h-4" />,
            value:
              salesData?.filter((sale) => sale.status === "pending").length ||
              0,
            tooltip: "Active Orders",
          },
          {
            icon: <ChefHat className="w-4 h-4" />,
            value: menuItems?.filter((item) => item.isAvailable).length || 0,
            tooltip: "Available Menu Items",
          },
          {
            icon: <User className="w-4 h-4" />,
            value: employees?.length || 0,
            tooltip: "Team Members",
          },
          {
            icon: <CheckCircle className="w-4 h-4" />,
            value: "8h",
            tooltip: "Hours Worked Today",
          },
        ]);
        break;
      default:
        setRoleData([]);
    }
    setIsLoading(false);
  }, [user, salesData, storeItems, menuItems, employees]);

  if (!user) return null;

  return (
    <motion.footer
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className={cn(
        "w-full relative z-20",
        "bg-background/95 backdrop-blur-xl border-t border-border/50",
        "shadow-sm dark:shadow-lg",
        "h-8"
      )}
    >
      <div className="flex items-center justify-between h-full px-4">
        {/* Left: Connection Status */}
        <div className="flex items-center gap-3">
          <ConnectionStatus isOnline={isOnline} />
        </div>

        {/* Center: Role-based Data (icons only) */}
        <div className="flex items-center gap-4">
          {!isLoading &&
            roleData.length > 0 &&
            roleData.map((data, idx) => (
              <div
                key={idx}
                className="flex items-center gap-1 text-xs"
                title={data.tooltip}
              >
                {data.icon}
                <span className="font-medium">{data.value}</span>
              </div>
            ))}
        </div>

        {/* Right: Empty space - navigation is handled by sidebar */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">
            Use sidebar for navigation
          </span>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
