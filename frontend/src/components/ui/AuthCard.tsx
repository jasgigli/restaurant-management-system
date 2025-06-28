import * as React from "react";
import { Card } from "./card";
import { cn } from "./utils";

interface AuthCardProps {
  children: React.ReactNode;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
}

export const AuthCard: React.FC<AuthCardProps> = ({
  children,
  header,
  footer,
  className,
}) => (
  <Card
    className={cn(
      "relative z-10 p-8 sm:p-10 lg:p-12 w-full max-w-md mx-auto shadow-2xl border-0",
      "bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl rounded-3xl",
      "animate-fade-in flex flex-col gap-6",
      "transition-all duration-500 hover:shadow-3xl",
      "before:absolute before:inset-0 before:rounded-3xl before:bg-gradient-to-br before:from-white/20 before:to-transparent before:opacity-50",
      "after:absolute after:inset-0 after:rounded-3xl after:bg-gradient-to-tr after:from-transparent after:to-white/10 after:opacity-30",
      "hover:scale-[1.02] hover:bg-white/95 dark:hover:bg-slate-900/95",
      className
    )}
  >
    {header && <div className="mb-2 relative z-10">{header}</div>}
    <div className="flex-1 flex flex-col gap-4 relative z-10">{children}</div>
    {footer && <div className="mt-4 relative z-10">{footer}</div>}
  </Card>
);
AuthCard.displayName = "AuthCard";
