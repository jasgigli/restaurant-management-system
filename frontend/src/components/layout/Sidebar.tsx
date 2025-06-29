/**
 * Premium SaaS Sidebar Component
 * World-class design with modern animations and enhanced UX
 */

import { AnimatePresence, motion } from "framer-motion";
import {
  Activity,
  Bell,
  ChefHat,
  Crown,
  HelpCircle,
  LogOut,
  Plus,
  Search,
  Settings,
  Star,
  TrendingUp,
  UserCheck,
  Users,
  X,
} from "lucide-react";
import { getNavigationByRole } from "../../config/navigation.tsx";
import { useLayout } from "../../hooks/useLayout";
import { cn } from "../../lib/utils";
import { useAuth } from "../../providers/AuthProvider";
import { Badge } from "../ui/Badge";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { Brand } from "./Brand";
import { CustomScrollbar } from "./CustomScrollbar";
import { NavigationItem } from "./NavigationItem";

interface SidebarProps {
  onClose?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onClose }) => {
  const { user, logout } = useAuth();
  const { isMobile } = useLayout();

  const navigation = user ? getNavigationByRole(user.role) : [];

  // Enhanced role-based styling
  const getRoleStyles = (role: string) => {
    switch (role) {
      case "admin":
        return {
          gradient: "from-purple-500/20 via-blue-500/10 to-indigo-500/20",
          accent: "from-purple-500 to-blue-500",
          icon: <Crown className="w-4 h-4 text-purple-500" />,
          badge: "Admin",
          badgeColor: "bg-purple-500/20 text-purple-600 border-purple-500/30",
        };
      case "hr":
        return {
          gradient: "from-emerald-500/20 via-teal-500/10 to-cyan-500/20",
          accent: "from-emerald-500 to-teal-500",
          icon: <Users className="w-4 h-4 text-emerald-500" />,
          badge: "HR",
          badgeColor:
            "bg-emerald-500/20 text-emerald-600 border-emerald-500/30",
        };
      case "staff":
        return {
          gradient: "from-orange-500/20 via-amber-500/10 to-yellow-500/20",
          accent: "from-orange-500 to-amber-500",
          icon: <ChefHat className="w-4 h-4 text-orange-500" />,
          badge: "Staff",
          badgeColor: "bg-orange-500/20 text-orange-600 border-orange-500/30",
        };
      default:
        return {
          gradient: "from-gray-500/20 via-slate-500/10 to-zinc-500/20",
          accent: "from-gray-500 to-slate-500",
          icon: <UserCheck className="w-4 h-4 text-gray-500" />,
          badge: "User",
          badgeColor: "bg-gray-500/20 text-gray-600 border-gray-500/30",
        };
    }
  };

  const roleStyles = getRoleStyles(user?.role || "user");

  const sidebarVariants = {
    open: {
      width: "100%",
      transition: { duration: 0.4, ease: "easeInOut" },
    },
    closed: {
      width: "0%",
      transition: { duration: 0.4, ease: "easeInOut" },
    },
  };

  const contentVariants = {
    open: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.4, delay: 0.1 },
    },
    closed: {
      opacity: 0,
      x: -20,
      transition: { duration: 0.4 },
    },
  };

  return (
    <motion.aside
      variants={sidebarVariants}
      initial="open"
      animate="open"
      className={cn(
        // Premium glassmorphism background with enhanced styling
        "h-full w-full relative z-50",
        "bg-gradient-to-b from-card/95 via-card/90 to-card/95",
        "backdrop-blur-2xl border-r border-border/40",
        "shadow-2xl shadow-black/10 dark:shadow-black/30",
        "rounded-r-3xl lg:rounded-none",
        "overflow-hidden"
      )}
    >
      {/* Enhanced animated background with role-based theming */}
      <div className="absolute inset-0">
        <div
          className={cn(
            "absolute inset-0 bg-gradient-to-b",
            roleStyles.gradient
          )}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.1)_1px,transparent_0)] bg-[length:20px_20px] pointer-events-none" />
        <motion.div
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className={cn(
            "absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent opacity-30"
          )}
        />
      </div>

      {/* Header */}
      <motion.div
        variants={contentVariants}
        className="p-6 border-b border-border/40 relative z-10"
      >
        <div className="flex items-center justify-between mb-6">
          <Brand
            variant="sidebar"
            showTagline={true}
            className={cn("transition-all duration-300", "justify-center")}
          />

          {/* Mobile close button */}
          {isMobile && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onClose}
              className="lg:hidden p-2 rounded-xl bg-background/20 hover:bg-background/40 border border-border/30 transition-all duration-200 shadow-sm hover:shadow-md"
            >
              <X className="w-5 h-5 text-foreground" />
            </motion.button>
          )}
        </div>

        {/* Enhanced user info with role-based styling */}
        <AnimatePresence mode="wait">
          <motion.div
            initial={{ opacity: 0, height: 0, scale: 0.95 }}
            animate={{ opacity: 1, height: "auto", scale: 1 }}
            exit={{ opacity: 0, height: 0, scale: 0.95 }}
            transition={{ duration: 0.4 }}
            className="p-4 bg-gradient-to-r from-background/40 to-background/20 rounded-2xl backdrop-blur-md border border-border/30 shadow-lg relative overflow-hidden group"
          >
            {/* Background glow effect */}
            <div
              className={cn(
                "absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-300",
                roleStyles.gradient
              )}
            />

            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-2">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="w-2 h-2 bg-accent rounded-full"
                />
                <p className="text-xs text-muted-foreground font-medium">
                  Welcome back,
                </p>
              </div>
              <p className="font-bold text-foreground truncate text-lg mb-2">
                {user?.name || "User"}
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge
                    variant="outline"
                    className={cn("text-xs", roleStyles.badgeColor)}
                  >
                    {roleStyles.badge}
                  </Badge>
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                </div>
                {roleStyles.icon}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Quick Actions Bar */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-4 flex items-center gap-2"
        >
          <Button
            variant="ghost"
            size="sm"
            className="flex-1 h-8 text-xs bg-background/20 hover:bg-background/40"
          >
            <Search className="w-3 h-3 mr-1" />
            Search
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 bg-background/20 hover:bg-background/40"
          >
            <Bell className="w-3 h-3" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 bg-background/20 hover:bg-background/40"
          >
            <Plus className="w-3 h-3" />
          </Button>
        </motion.div>
      </motion.div>

      {/* Navigation */}
      <CustomScrollbar
        variant="thin"
        className="flex-1 p-4 space-y-6 relative z-10"
      >
        <AnimatePresence mode="wait">
          <motion.nav
            key="expanded"
            variants={contentVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="space-y-6"
          >
            {navigation.map((section, sectionIndex) => (
              <motion.div
                key={sectionIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: sectionIndex * 0.1 }}
                className="space-y-3"
              >
                <div className="flex items-center gap-2 px-3">
                  <div
                    className={cn("w-1 h-1 rounded-full", roleStyles.gradient)}
                  />
                  <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                    {section.section}
                  </h3>
                </div>
                <ul className="space-y-2">
                  {section.links.map((link, linkIndex) => (
                    <motion.li
                      key={link.to}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: sectionIndex * 0.1 + linkIndex * 0.05,
                      }}
                      className="rounded-xl overflow-hidden"
                    >
                      <NavigationItem
                        {...link}
                        variant="sidebar"
                        onClick={onClose}
                        className="transition-all duration-300 hover:bg-background/30 focus:bg-background/40 active:bg-background/50 rounded-xl px-3 py-3 shadow-sm hover:shadow-md group"
                      />
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.nav>
        </AnimatePresence>
      </CustomScrollbar>

      {/* Enhanced Footer */}
      <motion.div
        variants={contentVariants}
        className="p-4 border-t border-border/40 relative z-10"
      >
        {/* Status indicators */}
        <AnimatePresence mode="wait">
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-4 space-y-3"
          >
            {/* System status */}
            <div className="grid grid-cols-2 gap-2">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="text-center p-2 bg-background/20 rounded-lg border border-border/20 backdrop-blur-sm"
              >
                <div className="text-xs font-bold text-green-500 flex items-center justify-center gap-1">
                  <Activity className="w-3 h-3" />
                  99.9%
                </div>
                <div className="text-xs text-muted-foreground">Uptime</div>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="text-center p-2 bg-background/20 rounded-lg border border-border/20 backdrop-blur-sm"
              >
                <div className="text-xs font-bold text-blue-500 flex items-center justify-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  24/7
                </div>
                <div className="text-xs text-muted-foreground">Support</div>
              </motion.div>
            </div>

            {/* Role-based premium badge */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className={cn(
                "flex items-center gap-2 p-2 rounded-lg border backdrop-blur-sm",
                roleStyles.badgeColor
              )}
            >
              {roleStyles.icon}
              <div className="flex-1">
                <div
                  className={cn(
                    "text-xs font-bold",
                    roleStyles.badgeColor
                      .replace("bg-", "text-")
                      .replace("/20", "")
                  )}
                >
                  {roleStyles.badge} Access
                </div>
                <div className="text-xs text-muted-foreground">
                  Full system access
                </div>
              </div>
              <Star className="w-3 h-3 text-yellow-500" />
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* Logout section */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-2 h-2 bg-green-500 rounded-full shadow-lg"
            />
            <AnimatePresence mode="wait">
              <motion.span
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                className="text-xs text-muted-foreground overflow-hidden font-medium"
              >
                Online
              </motion.span>
            </AnimatePresence>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={logout}
            className="flex items-center gap-2 p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-background/40 transition-all duration-200 group"
          >
            <LogOut
              size={16}
              className="group-hover:rotate-12 transition-transform duration-200"
            />
            <AnimatePresence mode="wait">
              <motion.span
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                className="text-sm overflow-hidden font-medium"
              >
                Logout
              </motion.span>
            </AnimatePresence>
          </motion.button>
        </div>

        {/* Quick actions for expanded sidebar */}
        <AnimatePresence mode="wait">
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="mt-3 space-y-2"
          >
            <Separator className="bg-border/30" />
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant="ghost"
                size="sm"
                className="h-8 text-xs bg-background/20 hover:bg-background/40"
              >
                <Settings className="w-3 h-3 mr-1" />
                Settings
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 text-xs bg-background/20 hover:bg-background/40"
              >
                <HelpCircle className="w-3 h-3 mr-1" />
                Help
              </Button>
            </div>
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </motion.aside>
  );
};

export default Sidebar;
