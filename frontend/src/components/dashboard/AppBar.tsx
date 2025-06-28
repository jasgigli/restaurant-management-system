/**
 * AppBar - Top navigation bar for the dashboard
 * @module components/global/AppBar
 */
import { motion } from "framer-motion";
import { Bell, Building2, Moon, Search, Sun } from "lucide-react";
import type { FC } from "react";
import { useState } from "react";
import { useAuth } from "../../providers/AuthProvider";
import { Avatar } from "../ui/Avatar";
import { Button } from "../ui/button";

/**
 * Props for AppBar component
 */
export interface AppBarProps {
  /** Current breadcrumb path */
  breadcrumbs?: string[];
  /** Notification count */
  notifications?: number;
  /** User avatar URL */
  avatarUrl?: string;
  /** Theme: 'light' | 'dark' */
  theme?: "light" | "dark";
  /** Callback to toggle theme */
  onToggleTheme?: () => void;
}

export const AppBar: FC<AppBarProps> = ({
  breadcrumbs = ["Dashboard"],
  notifications = 3,
  avatarUrl,
  theme = "light",
  onToggleTheme,
}) => {
  const [search, setSearch] = useState("");
  const { logout, user } = useAuth();

  return (
    <header className="flex items-center justify-between px-6 py-3 bg-white border-b shadow-sm">
      {/* Brand & Breadcrumbs */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Building2 className="h-8 w-8 text-blue-600" />
          <span className="text-xl font-bold text-gray-900">Restaurant MS</span>
        </div>
        <nav className="text-gray-500 text-sm">{breadcrumbs.join(" / ")}</nav>
      </div>

      {/* Search, Notifications, User */}
      <div className="flex items-center gap-4">
        <div className="relative">
          <input
            className="w-64 pl-9 pr-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Search orders, menu, staff..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        </div>

        <motion.div whileTap={{ scale: 0.9 }}>
          <Button variant="ghost" className="relative p-2">
            <Bell className="h-5 w-5 text-gray-600" />
            {notifications > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {notifications}
              </span>
            )}
          </Button>
        </motion.div>

        <div className="flex items-center gap-2">
          <Avatar src={avatarUrl} />
          <div className="text-sm">
            <p className="font-medium text-gray-900">{user?.name || "User"}</p>
            <p className="text-gray-500 capitalize">
              {user?.role || "Unknown"}
            </p>
          </div>
        </div>

        <Button variant="ghost" onClick={onToggleTheme} className="p-2">
          {theme === "light" ? (
            <Sun className="h-5 w-5" />
          ) : (
            <Moon className="h-5 w-5" />
          )}
        </Button>

        <Button variant="outline" onClick={logout} className="ml-2">
          Logout
        </Button>
      </div>
    </header>
  );
};
