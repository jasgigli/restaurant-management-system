import * as React from "react";
import { cn } from "./utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "success" | "destructive" | "info" | "outline";
  icon?: React.ReactNode;
  rounded?: boolean;
}

const variantMap = {
  default: "bg-primary text-primary-foreground",
  success: "bg-green-500 text-white",
  destructive: "bg-red-500 text-white",
  info: "bg-blue-500 text-white",
  outline: "border border-gray-300 text-gray-700 bg-white/70",
};

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  (
    {
      variant = "default",
      icon,
      rounded = true,
      className,
      children,
      ...props
    },
    ref
  ) => (
    <span
      ref={ref}
      className={cn(
        "inline-flex items-center gap-1 px-2.5 py-0.5 font-medium text-xs",
        variantMap[variant],
        rounded ? "rounded-full" : "rounded-md",
        className
      )}
      {...props}
    >
      {icon && <span className="mr-1 flex items-center">{icon}</span>}
      {children}
    </span>
  )
);
Badge.displayName = "Badge";
