// components/ui/list.tsx
import { cn } from "@/lib/utils";
import * as React from "react";

export interface ListProps extends React.HTMLAttributes<HTMLUListElement> {}

export const List = React.forwardRef<HTMLUListElement, ListProps>(
  ({ className, children, ...props }, ref) => (
    <ul
      ref={ref}
      className={cn("space-y-2 p-0 m-0 list-none", className)}
      {...props}
    >
      {children}
    </ul>
  )
);
List.displayName = "List";

// components/ui/list-item.tsx

export interface ListItemProps extends React.LiHTMLAttributes<HTMLLIElement> {}

export const ListItem = React.forwardRef<HTMLLIElement, ListItemProps>(
  ({ className, children, ...props }, ref) => (
    <li
      ref={ref}
      className={cn(
        "flex items-center justify-between rounded-lg px-3 py-2 hover:bg-muted",
        className
      )}
      {...props}
    >
      {children}
    </li>
  )
);
ListItem.displayName = "ListItem";
