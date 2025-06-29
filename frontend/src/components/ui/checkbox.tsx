import { Check } from "lucide-react";
import * as React from "react";

import { cn } from "./utils";

const Checkbox = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => {
  return (
    <div className="relative">
      <input
        type="checkbox"
        ref={ref}
        className={cn(
          "peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
          className
        )}
        {...props}
      />
      <Check className="pointer-events-none absolute left-0 top-0 h-4 w-4 opacity-0 peer-data-[state=checked]:opacity-100" />
    </div>
  );
});
Checkbox.displayName = "Checkbox";

export { Checkbox };
