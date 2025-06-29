import { type VariantProps } from "class-variance-authority";
import * as React from "react";

import { stackVariants } from "./stack-variants";
import { cn } from "./utils";

export interface StackProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof stackVariants> {}

const Stack = React.forwardRef<HTMLDivElement, StackProps>(
  ({ className, direction, spacing, align, justify, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        stackVariants({ direction, spacing, align, justify }),
        className
      )}
      {...props}
    />
  )
);
Stack.displayName = "Stack";

export { Stack };
