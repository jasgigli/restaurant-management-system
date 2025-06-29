import { motion } from "framer-motion";
import { Activity, Sparkles } from "lucide-react";
import React from "react";

interface DashboardShellProps {
  children?: React.ReactNode;
  title?: string;
  subtitle?: string;
  actions?: React.ReactNode;
  className?: string;
}

const DashboardShell: React.FC<DashboardShellProps> = ({
  children,
  title,
  subtitle,
  actions,
  className = "",
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={`min-h-full space-y-8 ${className}`}
    >
      {/* Enhanced Page Header */}
      {(title || subtitle || actions) && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="relative"
        >
          {/* Background decoration */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5 rounded-3xl blur-3xl opacity-50" />

          <div className="relative bg-gradient-to-r from-card/80 via-card/60 to-card/80 backdrop-blur-xl border border-border/40 rounded-3xl p-8 shadow-xl">
            {/* Floating particles */}
            <div className="absolute top-4 right-4 w-2 h-2 bg-primary/30 rounded-full animate-float" />
            <div className="absolute bottom-4 left-4 w-1 h-1 bg-accent/40 rounded-full animate-float delay-1000" />

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
              <div className="flex-1">
                {title && (
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-gradient-to-r from-primary/20 to-accent/20 rounded-xl border border-primary/30">
                      <Sparkles className="w-5 h-5 text-primary" />
                    </div>
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                      {title}
                    </h1>
                  </div>
                )}
                {subtitle && (
                  <div className="flex items-center gap-2">
                    <Activity className="w-4 h-4 text-muted-foreground" />
                    <p className="text-lg text-muted-foreground font-medium">
                      {subtitle}
                    </p>
                  </div>
                )}
              </div>

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

      {/* Enhanced Main Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="space-y-8"
      >
        {children}
      </motion.div>
    </motion.div>
  );
};

export default DashboardShell;
