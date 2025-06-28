import * as React from "react";
import { cn } from "./utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "ghost" | "outline";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
          variant === "default" &&
            "bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2",
          variant === "ghost" &&
            "bg-transparent hover:bg-accent hover:text-accent-foreground px-3 py-2",
          variant === "outline" &&
            "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 px-4 py-2",
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button };
