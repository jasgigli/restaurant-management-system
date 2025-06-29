/**
 * NavigationItem - Reusable navigation item component
 * Provides consistent styling and behavior for navigation links across the app
 */

import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { cn } from "../../lib/utils";

export interface NavigationItemProps {
  to: string;
  label: string;
  icon: React.ReactNode;
  description?: string;
  badge?: string | number;
  onClick?: () => void;
  className?: string;
  variant?: "default" | "compact" | "sidebar";
  isActive?: boolean;
  disabled?: boolean;
}

export const NavigationItem: React.FC<NavigationItemProps> = ({
  to,
  label,
  icon,
  description,
  badge,
  onClick,
  className,
  variant = "default",
  isActive,
  disabled = false,
}) => {
  const location = useLocation();
  const active = isActive ?? location.pathname === to;

  const baseClasses = cn(
    // Base styles
    "group relative flex items-center gap-3 rounded-xl transition-all duration-200",
    "focus:outline-none focus:ring-2 focus:ring-offset-2",
    "disabled:opacity-50 disabled:cursor-not-allowed",

    // Variant-specific styles
    variant === "default" && [
      "px-4 py-3 text-sm font-medium",
      "hover:bg-neutral-100 dark:hover:bg-neutral-800",
      "focus:ring-primary-500",
      active && [
        "bg-primary-50 text-primary-700 dark:bg-primary-900/20 dark:text-primary-300",
        "border-l-4 border-primary-500",
      ],
    ],

    variant === "compact" && [
      "px-3 py-2 text-sm",
      "hover:bg-neutral-100 dark:hover:bg-neutral-800",
      "focus:ring-primary-500",
      active && [
        "bg-primary-50 text-primary-700 dark:bg-primary-900/20 dark:text-primary-300",
      ],
    ],

    variant === "sidebar" && [
      "px-4 py-3 text-sm font-medium",
      "hover:bg-gray-100/80 dark:hover:bg-white/10 hover:shadow-lg",
      "focus:ring-gray-300 dark:focus:ring-white/20",
      active && [
        "bg-gray-200/80 dark:bg-white/20 text-gray-900 dark:text-white shadow-lg",
        "border-l-4 border-gray-400 dark:border-gray-300",
      ],
    ],

    className
  );

  const iconClasses = cn(
    "transition-transform duration-200",
    variant === "sidebar" && [
      active
        ? "text-gray-700 dark:text-gray-200"
        : "text-gray-600 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-200",
    ],
    variant !== "sidebar" && [
      active
        ? "text-primary-600"
        : "text-neutral-500 group-hover:text-neutral-700",
    ],
    "group-hover:scale-110"
  );

  const content = (
    <>
      <div className={iconClasses}>{icon}</div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <p className="font-medium truncate">{label}</p>
          {badge && (
            <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800 dark:bg-primary-900/30 dark:text-primary-300">
              {badge}
            </span>
          )}
        </div>
        {description && variant !== "compact" && (
          <p
            className={cn(
              "text-xs truncate",
              variant === "sidebar"
                ? "text-gray-500 dark:text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300"
                : "text-neutral-500 group-hover:text-neutral-600"
            )}
          >
            {description}
          </p>
        )}
      </div>
    </>
  );

  if (disabled) {
    return <div className={baseClasses}>{content}</div>;
  }

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.1 }}
    >
      <Link to={to} onClick={onClick} className={baseClasses}>
        {content}
      </Link>
    </motion.div>
  );
};
