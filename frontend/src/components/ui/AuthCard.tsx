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
      "relative z-10 p-8 sm:p-10 w-full max-w-md mx-auto shadow-2xl border-0 bg-white/80 dark:bg-background/80 backdrop-blur-lg rounded-2xl animate-fade-in flex flex-col gap-6",
      "transition-all duration-500",
      className
    )}
  >
    {header && <div className="mb-2">{header}</div>}
    <div className="flex-1 flex flex-col gap-4">{children}</div>
    {footer && <div className="mt-4">{footer}</div>}
  </Card>
);
AuthCard.displayName = "AuthCard";
