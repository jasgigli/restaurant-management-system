import React from "react";
import { cn } from "./utils";
import { CheckCircle, AlertTriangle, XCircle, Info } from "lucide-react";

export type AlertVariant = "default" | "destructive" | "success" | "info";

const variantStyles: Record<AlertVariant, string> = {
  default: "bg-gray-50 border-gray-200 text-gray-700",
  destructive: "bg-red-50 border-red-200 text-red-700",
  success: "bg-green-50 border-green-200 text-green-700",
  info: "bg-blue-50 border-blue-200 text-blue-700",
};

const variantIcons: Record<AlertVariant, React.ReactNode> = {
  default: <Info className="w-5 h-5 text-gray-400" />,
  destructive: <XCircle className="w-5 h-5 text-red-400" />,
  success: <CheckCircle className="w-5 h-5 text-green-400" />,
  info: <AlertTriangle className="w-5 h-5 text-blue-400" />,
};

export const Alert = ({
  variant = "default",
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { variant?: AlertVariant }) => (
  <div
    className={cn(
      "flex items-start gap-3 border rounded-lg px-4 py-3 shadow-sm animate-fade-in",
      variantStyles[variant],
      className
    )}
    {...props}
  >
    <span className="mt-1">{variantIcons[variant]}</span>
    <div className="flex-1">{children}</div>
  </div>
);

export const AlertTitle = ({ children, className }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("font-semibold text-base leading-tight mb-1", className)}>{children}</div>
);

export const AlertDescription = ({ children, className }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("text-sm leading-normal", className)}>{children}</div>
);
