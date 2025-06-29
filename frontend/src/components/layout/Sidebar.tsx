/**
 * Premium SaaS Sidebar Component
 * World-class design with modern animations and enhanced UX
 */

import { AnimatePresence, motion } from "framer-motion";
import {
  ChefHat,
  ChevronDown,
  ChevronRight,
  Crown,
  UserCheck,
  Users,
  X,
} from "lucide-react";
import React from "react";
import { getNavigationByRole } from "../../config/navigation.tsx";
import { useLayout } from "../../hooks/useLayout";
import { cn } from "../../lib/utils";
import { useAuth } from "../../providers/AuthProvider";
import { Brand } from "./Brand";
import { NavigationItem } from "./NavigationItem";

interface SidebarProps {
  onClose?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onClose }) => {
  const { user } = useAuth();
  const { isMobile } = useLayout();
  const [expandedSections, setExpandedSections] = React.useState<Set<number>>(
    new Set([0])
  ); // First section expanded by default

  const navigation = user ? getNavigationByRole(user.role) : [];

  const toggleSection = (sectionIndex: number) => {
    setExpandedSections((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(sectionIndex)) {
        newSet.delete(sectionIndex);
      } else {
        newSet.add(sectionIndex);
      }
      return newSet;
    });
  };

  // Enhanced role-based styling with better light theme support
  const getRoleStyles = (role: string) => {
    switch (role) {
      case "admin":
        return {
          gradient:
            "from-purple-500/10 via-blue-500/5 to-indigo-500/10 dark:from-purple-500/20 dark:via-blue-500/10 dark:to-indigo-500/20",
          accent: "from-purple-500 to-blue-500",
          icon: (
            <Crown className="w-4 h-4 text-purple-600 dark:text-purple-500" />
          ),
          badge: "Admin",
          badgeColor:
            "bg-purple-100 text-purple-700 border-purple-200 dark:bg-purple-500/20 dark:text-purple-400 dark:border-purple-500/30",
          categoryColor: "text-purple-700 dark:text-purple-400",
          categoryBg: "bg-purple-50 dark:bg-purple-500/10",
          categoryBorder: "border-purple-200 dark:border-purple-500/20",
        };
      case "hr":
        return {
          gradient:
            "from-emerald-500/10 via-teal-500/5 to-cyan-500/10 dark:from-emerald-500/20 dark:via-teal-500/10 dark:to-cyan-500/20",
          accent: "from-emerald-500 to-teal-500",
          icon: (
            <Users className="w-4 h-4 text-emerald-600 dark:text-emerald-500" />
          ),
          badge: "HR",
          badgeColor:
            "bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-500/20 dark:text-emerald-400 dark:border-emerald-500/30",
          categoryColor: "text-emerald-700 dark:text-emerald-400",
          categoryBg: "bg-emerald-50 dark:bg-emerald-500/10",
          categoryBorder: "border-emerald-200 dark:border-emerald-500/20",
        };
      case "staff":
        return {
          gradient:
            "from-orange-500/10 via-amber-500/5 to-yellow-500/10 dark:from-orange-500/20 dark:via-amber-500/10 dark:to-yellow-500/20",
          accent: "from-orange-500 to-amber-500",
          icon: (
            <ChefHat className="w-4 h-4 text-orange-600 dark:text-orange-500" />
          ),
          badge: "Staff",
          badgeColor:
            "bg-orange-100 text-orange-700 border-orange-200 dark:bg-orange-500/20 dark:text-orange-400 dark:border-orange-500/30",
          categoryColor: "text-orange-700 dark:text-orange-400",
          categoryBg: "bg-orange-50 dark:bg-orange-500/10",
          categoryBorder: "border-orange-200 dark:border-orange-500/20",
        };
      default:
        return {
          gradient:
            "from-gray-500/10 via-slate-500/5 to-zinc-500/10 dark:from-gray-500/20 dark:via-slate-500/10 dark:to-zinc-500/20",
          accent: "from-gray-500 to-slate-500",
          icon: (
            <UserCheck className="w-4 h-4 text-gray-600 dark:text-gray-500" />
          ),
          badge: "User",
          badgeColor:
            "bg-gray-100 text-gray-700 border-gray-200 dark:bg-gray-500/20 dark:text-gray-400 dark:border-gray-500/30",
          categoryColor: "text-gray-700 dark:text-gray-400",
          categoryBg: "bg-gray-50 dark:bg-gray-500/10",
          categoryBorder: "border-gray-200 dark:border-gray-500/20",
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
        // Enhanced glassmorphism background with better light theme support
        "h-full w-full relative z-50 flex flex-col",
        "bg-white/95 dark:bg-card/95 backdrop-blur-2xl",
        "border-r border-gray-200/60 dark:border-border/40",
        "shadow-2xl shadow-gray-200/50 dark:shadow-black/30",
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
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(0,0,0,0.05)_1px,transparent_0)] dark:bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.1)_1px,transparent_0)] bg-[length:20px_20px] pointer-events-none" />
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
            "absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/5 dark:via-primary/5 to-transparent opacity-30"
          )}
        />
      </div>

      {/* Header */}
      <motion.div
        variants={contentVariants}
        className="p-4 pb-2 border-b border-gray-200/60 dark:border-border/40 relative z-10"
      >
        <div className="flex items-center justify-between mb-3">
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
              className="lg:hidden p-2 rounded-xl bg-gray-100/80 hover:bg-gray-200/80 dark:bg-background/20 dark:hover:bg-background/40 border border-gray-200/60 dark:border-border/30 transition-all duration-200 shadow-sm hover:shadow-md"
            >
              <X className="w-5 h-5 text-gray-700 dark:text-foreground" />
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
            className="mx-1 px-3 py-2 bg-white/90 dark:bg-card/90 backdrop-blur-xl rounded-lg border border-gray-200/50 dark:border-white/10 shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden"
          >
            <div className="relative z-10">
              {/* Single line: Status + Name + Role Icon */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="w-1.5 h-1.5 bg-green-500 rounded-full"
                  />
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-foreground text-sm leading-tight">
                      {user?.name || "User"}
                    </p>
                  </div>
                </div>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                  className="p-1 rounded-md bg-gray-50/80 dark:bg-white/10 border border-gray-200/40 dark:border-white/10"
                >
                  {roleStyles.icon}
                </motion.div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden relative z-10 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-neutral-600 hover:scrollbar-thumb-gray-400 dark:hover:scrollbar-thumb-neutral-500 scrollbar-track-transparent min-h-0">
        <div className="p-4 space-y-2">
          <AnimatePresence mode="wait">
            <motion.nav
              key="expanded"
              variants={contentVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="space-y-2"
            >
              {navigation.map((section, sectionIndex) => {
                const isExpanded = expandedSections.has(sectionIndex);

                return (
                  <motion.div
                    key={sectionIndex}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: sectionIndex * 0.1 }}
                    className="space-y-1"
                  >
                    {/* Enhanced category header with dropdown functionality */}
                    <motion.button
                      onClick={() => toggleSection(sectionIndex)}
                      className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-gray-50/80 dark:bg-card/40 border border-gray-200/60 dark:border-border/30 hover:bg-gray-100/80 dark:hover:bg-card/60 transition-all duration-200 group"
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                    >
                      <div className="w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-500" />
                      <h3 className="text-sm font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 flex-1 text-left">
                        {section.section}
                      </h3>
                      <div className="flex items-center gap-2">
                        <div className="px-2 py-1 rounded-lg text-xs font-medium border bg-gray-100 text-gray-600 border-gray-200 dark:bg-gray-600/20 dark:text-gray-400 dark:border-gray-500/30">
                          {section.links.length}
                        </div>
                        <motion.div
                          animate={{ rotate: isExpanded ? 90 : 0 }}
                          transition={{ duration: 0.2 }}
                          className="text-gray-500 dark:text-gray-400"
                        >
                          {isExpanded ? (
                            <ChevronDown size={16} />
                          ) : (
                            <ChevronRight size={16} />
                          )}
                        </motion.div>
                      </div>
                    </motion.button>

                    {/* Collapsible navigation items */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <ul className="space-y-1 ml-2 pl-4 border-l border-gray-200/40 dark:border-gray-600/40">
                            {section.links.map((link, linkIndex) => (
                              <motion.li
                                key={link.to}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{
                                  delay: linkIndex * 0.05,
                                }}
                                className="rounded-lg overflow-hidden"
                              >
                                <NavigationItem
                                  {...link}
                                  variant="sidebar"
                                  onClick={onClose}
                                  className="transition-all duration-300 hover:bg-gray-100/80 dark:hover:bg-background/30 focus:bg-gray-200/80 dark:focus:bg-background/40 active:bg-gray-300/80 dark:active:bg-background/50 rounded-lg px-3 py-2 shadow-sm hover:shadow-md group border border-transparent hover:border-gray-200/60 dark:hover:border-border/30"
                                />
                              </motion.li>
                            ))}
                          </ul>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </motion.nav>
          </AnimatePresence>
        </div>
      </div>

      {/* Enhanced Footer */}
      <motion.div
        variants={contentVariants}
        className="p-1 border-t border-gray-200/60 dark:border-border/40 relative z-10 flex-shrink-0"
      >
        {/* Status indicators */}
        <AnimatePresence mode="wait">
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4 }}
            className=" space-y-2"
          ></motion.div>
        </AnimatePresence>
      </motion.div>
    </motion.aside>
  );
};

export default Sidebar;
