/**
 * Shared Status Indicators Component
 * Reusable status badges for Header and Footer components
 */

import { motion } from "framer-motion";
import {
  Activity,
  AlertCircle,
  CheckCircle,
  Clock,
  Crown,
  Globe,
  Heart,
  Lock,
  Star,
  Wifi,
  Zap,
} from "lucide-react";
import { cn } from "../../../lib/utils";

export interface StatusBadgeProps {
  icon: React.ReactNode;
  label: string;
  variant?: "success" | "warning" | "error" | "info" | "premium" | "default";
  className?: string;
  delay?: number;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({
  icon,
  label,
  variant = "default",
  className,
  delay = 0,
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case "success":
        return "from-green-500/20 to-emerald-500/20 border-green-500/30 text-green-600 dark:text-green-400";
      case "warning":
        return "from-yellow-500/20 to-orange-500/20 border-yellow-500/30 text-yellow-600 dark:text-yellow-400";
      case "error":
        return "from-red-500/20 to-pink-500/20 border-red-500/30 text-red-600 dark:text-red-400";
      case "info":
        return "from-blue-500/20 to-cyan-500/20 border-blue-500/30 text-blue-600 dark:text-blue-400";
      case "premium":
        return "from-yellow-500/20 to-orange-500/20 border-yellow-500/30 text-yellow-600 dark:text-yellow-400 shadow-lg";
      case "default":
        return "from-muted/30 to-muted/20 border-border/30 text-muted-foreground";
    }
  };

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay }}
      whileHover={{ scale: 1.05 }}
      className={cn(
        "flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r rounded-full border backdrop-blur-sm",
        getVariantStyles(),
        className
      )}
    >
      {icon}
      <span className="text-xs font-semibold">{label}</span>
    </motion.div>
  );
};

export interface SystemStatusProps {
  status: "operational" | "degraded" | "down";
}

export const SystemStatus: React.FC<SystemStatusProps> = ({ status }) => {
  const getStatusConfig = () => {
    switch (status) {
      case "operational":
        return {
          icon: <CheckCircle className="h-4 w-4 text-green-500" />,
          label: "All Systems Operational",
          variant: "success" as const,
        };
      case "degraded":
        return {
          icon: <AlertCircle className="h-4 w-4 text-yellow-500" />,
          label: "Performance Issues",
          variant: "warning" as const,
        };
      case "down":
        return {
          icon: <AlertCircle className="h-4 w-4 text-red-500" />,
          label: "System Down",
          variant: "error" as const,
        };
    }
  };

  const config = getStatusConfig();

  return (
    <StatusBadge
      icon={config.icon}
      label={config.label}
      variant={config.variant}
    />
  );
};

export interface ConnectionStatusProps {
  isOnline: boolean;
}

export const ConnectionStatus: React.FC<ConnectionStatusProps> = ({
  isOnline,
}) => (
  <StatusBadge
    icon={<Wifi className="h-4 w-4 text-blue-500" />}
    label={isOnline ? "Connected" : "Offline"}
    variant="info"
    delay={0.1}
  />
);

export interface VersionBadgeProps {
  version: string;
}

export const VersionBadge: React.FC<VersionBadgeProps> = ({ version }) => (
  <StatusBadge
    icon={<Zap className="h-4 w-4 text-purple-500" />}
    label={`v${version}`}
    variant="info"
    delay={0.2}
  />
);

export interface SecurityStatusProps {
  label?: string;
}

export const SecurityStatus: React.FC<SecurityStatusProps> = ({
  label = "SSL Secure",
}) => (
  <StatusBadge
    icon={<Lock className="h-4 w-4 text-emerald-500" />}
    label={label}
    variant="success"
    delay={0.3}
  />
);

export interface PremiumBadgeProps {
  label?: string;
}

export const PremiumBadge: React.FC<PremiumBadgeProps> = ({
  label = "Premium Plan",
}) => (
  <StatusBadge
    icon={<Crown className="h-4 w-4 text-yellow-500" />}
    label={label}
    variant="premium"
    delay={0.4}
    className="px-4 py-2"
  >
    <Star className="h-3 w-3 text-yellow-500" />
  </StatusBadge>
);

export interface TimeDisplayProps {
  time: Date;
  label?: string;
}

export const TimeDisplay: React.FC<TimeDisplayProps> = ({ time, label }) => {
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <StatusBadge
      icon={<Clock className="h-4 w-4 text-muted-foreground" />}
      label={label ? `${label}: ${formatTime(time)}` : formatTime(time)}
      variant="default"
      delay={0.5}
    />
  );
};

export interface SyncStatusProps {
  lastSync: string;
}

export const SyncStatus: React.FC<SyncStatusProps> = ({ lastSync }) => (
  <StatusBadge
    icon={<Activity className="h-4 w-4 text-muted-foreground" />}
    label={`Sync: ${lastSync}`}
    variant="default"
    delay={0.6}
  />
);

export interface SupportLinkProps {
  supportUrl: string;
}

export const SupportLink: React.FC<SupportLinkProps> = ({ supportUrl }) => (
  <motion.a
    href={supportUrl}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-primary/20 to-accent/20 rounded-full border border-primary/30 hover:border-primary/50 transition-all duration-200 group backdrop-blur-sm"
  >
    <Heart className="h-4 w-4 text-primary group-hover:scale-110 transition-transform duration-200" />
    <span className="text-xs font-semibold text-primary hover:text-primary/80 transition-colors duration-200">
      Support
    </span>
  </motion.a>
);

export interface GlobalStatusProps {
  label?: string;
}

export const GlobalStatus: React.FC<GlobalStatusProps> = ({
  label = "Global",
}) => (
  <StatusBadge
    icon={<Globe className="h-4 w-4 text-accent" />}
    label={label}
    variant="info"
    delay={0.7}
  />
);

export { StatusBadge };
