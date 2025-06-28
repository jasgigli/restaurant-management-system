/**
 * AppBar - Top navigation bar for the dashboard
 * @module components/global/AppBar
 */
import { motion } from "framer-motion";
import { Bell, Moon, Search, Sun } from "lucide-react";
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
  notifications = 0,
  avatarUrl,
  theme = "light",
  onToggleTheme,
}) => {
  const [search, setSearch] = useState("");
  const { logout } = useAuth();
  return (
    <header className="flex items-center justify-between px-4 py-2 bg-background/80 backdrop-blur shadow">
      {/* Brand & Breadcrumbs */}
      <div className="flex items-center gap-4">
        <img src="/logo.svg" alt="Brand" className="h-8" />
        <nav className="text-muted-foreground">{breadcrumbs.join(" / ")}</nav>
      </div>
      {/* Search, Notifications, User */}
      <div className="flex items-center gap-4">
        <div className="relative">
          <input
            className="input pl-8 pr-2 py-1 rounded border"
            placeholder="Search orders, menu, staff..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        </div>
        <motion.div whileTap={{ scale: 0.9 }}>
          <Button variant="ghost" className="relative">
            <Bell />
            {notifications > 0 && (
              <span className="absolute -top-1 -right-1 bg-destructive text-xs rounded-full px-1">
                {notifications}
              </span>
            )}
          </Button>
        </motion.div>
        <Avatar src={avatarUrl} />
        <Button variant="ghost" onClick={onToggleTheme}>
          {theme === "light" ? <Sun /> : <Moon />}
        </Button>
        <Button variant="outline" onClick={logout} className="ml-2">
          Logout
        </Button>
      </div>
    </header>
  );
};
