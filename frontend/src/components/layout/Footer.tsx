/**
 * Modern Professional Footer Component
 * Built with shadcn/ui and optimized for both light and dark themes
 */

import { motion } from "framer-motion";
import { Shield } from "lucide-react";
import { cn } from "../../lib/utils";
import { ConnectionStatus } from "./shared/ConnectionStatus";

interface FooterProps {
  isOnline?: boolean;
  systemStatus?: "operational" | "degraded" | "down";
}

export const Footer: React.FC<FooterProps> = ({
  isOnline = true,
  systemStatus = "operational",
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "operational":
        return "bg-green-500";
      case "degraded":
        return "bg-yellow-500";
      case "down":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "operational":
        return "All Systems Operational";
      case "degraded":
        return "Performance Issues";
      case "down":
        return "System Outage";
      default:
        return "Unknown Status";
    }
  };

  return (
    <motion.footer
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className={cn(
        "w-full relative z-20",
        "bg-background/95 backdrop-blur-xl border-t border-border/50",
        "shadow-sm dark:shadow-lg"
      )}
    >
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="py-4">
          {/* Main Footer Content */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Left side - Status and Info */}
            <div className="flex items-center gap-4 flex-wrap">
              {/* System Status */}
              <div className="flex items-center gap-2">
                <div
                  className={cn(
                    "w-2 h-2 rounded-full animate-pulse",
                    getStatusColor(systemStatus)
                  )}
                />
                <span className="text-sm font-medium text-foreground">
                  {getStatusText(systemStatus)}
                </span>
              </div>
              {/* Connection Status */}
              <ConnectionStatus isOnline={isOnline} />
            </div>

            {/* Right side - Copyright and Legal */}
            <div className="flex items-center gap-6 text-sm">
              {/* Copyright */}
              <span className="text-muted-foreground">
                © 2024 Restaurant Management System
              </span>

              {/* Legal Links */}
              <motion.a
                href="/privacy"
                whileHover={{ scale: 1.05 }}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Privacy
              </motion.a>
              <motion.a
                href="/terms"
                whileHover={{ scale: 1.05 }}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Terms
              </motion.a>
              <motion.a
                href="/security"
                whileHover={{ scale: 1.05 }}
                className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
              >
                <Shield className="w-3 h-3" />
                Security
              </motion.a>
            </div>
          </div>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
