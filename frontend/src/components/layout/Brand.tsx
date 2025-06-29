/**
 * Brand - Reusable brand/logo component
 * Provides consistent branding across all layout components
 */

import { ChefHat } from "lucide-react";
import { cn } from "../../lib/utils";

export interface BrandProps {
  variant?: "default" | "compact" | "sidebar";
  className?: string;
  showTagline?: boolean;
}

export const Brand: React.FC<BrandProps> = ({
  variant = "default",
  className,
  showTagline = true,
}) => {
  const baseClasses = cn("flex items-center gap-3", className);

  const logoClasses = cn(
    "flex items-center justify-center rounded-lg transition-all duration-200",
    variant === "sidebar" && [
      "w-10 h-10 bg-white/10 backdrop-blur-sm",
      "border border-white/20",
    ],
    variant !== "sidebar" && ["w-8 h-8 bg-primary-100 dark:bg-primary-900/30"]
  );

  const textClasses = cn(
    "font-bold tracking-tight",
    variant === "sidebar" && ["text-2xl text-white"],
    variant === "compact" && ["text-lg text-neutral-900 dark:text-white"],
    variant === "default" && ["text-xl text-neutral-900 dark:text-white"]
  );

  const taglineClasses = cn(
    "text-xs",
    variant === "sidebar" && ["text-white/60"],
    variant !== "sidebar" && ["text-neutral-500 dark:text-neutral-400"]
  );

  return (
    <div className={baseClasses}>
      <div className={logoClasses}>
        <ChefHat
          className={cn(
            "transition-colors duration-200",
            variant === "sidebar"
              ? "w-6 h-6 text-white"
              : "w-5 h-5 text-primary-600 dark:text-primary-400"
          )}
        />
      </div>

      <div className="flex flex-col">
        <h1 className={textClasses}>RMS</h1>
        {showTagline && (
          <p className={taglineClasses}>Restaurant Management System</p>
        )}
      </div>
    </div>
  );
};
