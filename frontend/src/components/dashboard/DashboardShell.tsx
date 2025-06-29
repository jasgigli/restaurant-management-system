import { motion } from "framer-motion";
import { Activity, Sparkles } from "lucide-react";
import React from "react";

interface DashboardShellProps {
  children?: React.ReactNode;
  title?: string;
  subtitle?: string;
  actions?: React.ReactNode;
  className?: string;
  avatar?: React.ReactNode;
  notifications?: React.ReactNode;
  quickLinks?: React.ReactNode;
  widgetsRow?: React.ReactNode; // New: for a secondary row of widgets/cards
  backgroundPattern?: React.ReactNode; // Optional: for animated/patterned backgrounds
}

const DashboardShell: React.FC<DashboardShellProps> = ({
  children,
  title,
  subtitle,
  actions,
  className = "",
  avatar,
  notifications,
  quickLinks,
  widgetsRow,
  backgroundPattern,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={`min-h-full space-y-8 relative ${className}`}
    >
      {/* Optional animated/patterned background */}
      {backgroundPattern && (
        <div className="absolute inset-0 z-0 pointer-events-none">
          {backgroundPattern}
        </div>
      )}

      {/* Enhanced Page Header */}
      {(title ||
        subtitle ||
        actions ||
        avatar ||
        notifications ||
        quickLinks) && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="relative z-10"
        >
          {/* Background decoration */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5 rounded-3xl blur-3xl opacity-50" />

          <div className="relative bg-gradient-to-r from-card/80 via-card/60 to-card/80 backdrop-blur-xl border border-border/40 rounded-3xl p-8 shadow-xl">
            {/* Floating particles */}
            <div className="absolute top-4 right-4 w-2 h-2 bg-primary/30 rounded-full animate-float" />
            <div className="absolute bottom-4 left-4 w-1 h-1 bg-accent/40 rounded-full animate-float delay-1000" />

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
              <div className="flex-1 min-w-0">
                {title && (
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-gradient-to-r from-primary/20 to-accent/20 rounded-xl border border-primary/30">
                      <Sparkles className="w-5 h-5 text-primary" />
                    </div>
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent truncate">
                      {title}
                    </h1>
                  </div>
                )}
                {subtitle && (
                  <div className="flex items-center gap-2">
                    <Activity className="w-4 h-4 text-muted-foreground" />
                    <p className="text-lg text-muted-foreground font-medium truncate">
                      {subtitle}
                    </p>
                  </div>
                )}
                {/* Quick Links Row */}
                {quickLinks && (
                  <div className="mt-4 flex flex-wrap gap-2">{quickLinks}</div>
                )}
              </div>

              {/* Avatar & Notifications */}
              {(avatar || notifications) && (
                <div className="flex items-center gap-4">
                  {notifications && (
                    <div className="relative">{notifications}</div>
                  )}
                  {avatar && <div className="relative">{avatar}</div>}
                </div>
              )}

              {actions && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                  className="flex items-center gap-3"
                >
                  {actions}
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
      )}

      {/* Optional widgets/cards row below header */}
      {widgetsRow && <div className="z-10 relative">{widgetsRow}</div>}

      {/* Enhanced Main Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="space-y-8 z-10 relative"
      >
        {children}
      </motion.div>
    </motion.div>
  );
};

export default DashboardShell;
