/**
 * Modern Professional Header Component
 * Built with shadcn/ui and optimized for both light and dark themes
 */

import { AnimatePresence, motion } from "framer-motion";
import {
  Bell,
  ChevronDown,
  HelpCircle,
  LogOut,
  Menu,
  Moon,
  Search,
  Settings,
  Shield,
  Sun,
  User,
} from "lucide-react";
import { useState } from "react";
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
  notifications?: number;
  breadcrumbs?: string[];
}

export const Header: React.FC<HeaderProps> = ({
  onMenuToggle,
  showMobileMenu = false,
  notifications = 0,
  breadcrumbs = [],
}) => {
  const [search, setSearch] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const { user, logout } = useAuth();
  const { resolvedTheme, toggleTheme } = useTheme();

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
                  placeholder="Search orders, menu, staff..."
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
            <motion.div whileTap={{ scale: 0.95 }}>
              <Button
                variant="ghost"
                size="icon"
                className="relative h-10 w-10 rounded-lg"
              >
                <Bell className="h-5 w-5 text-muted-foreground" />
                {notifications > 0 && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1"
                  >
                    <Badge
                      variant="destructive"
                      className="h-5 w-5 p-0 flex items-center justify-center text-xs font-bold"
                    >
                      {notifications > 99 ? "99+" : notifications}
                    </Badge>
                  </motion.div>
                )}
              </Button>
            </motion.div>

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
