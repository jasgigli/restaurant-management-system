import { Menu } from "@headlessui/react";
import * as React from "react";
import { cn } from "./utils";

export function DropdownMenu({ children }: { children: React.ReactNode }) {
  return (
    <Menu as="div" className="relative">
      {children}
    </Menu>
  );
}

export function DropdownMenuTrigger({
  asChild,
  children,
}: {
  asChild?: boolean;
  children: React.ReactNode;
}) {
  if (asChild) return <Menu.Button as={React.Fragment}>{children}</Menu.Button>;
  return <Menu.Button>{children}</Menu.Button>;
}

export function DropdownMenuContent({
  align = "start",
  children,
}: {
  align?: "start" | "end";
  children: React.ReactNode;
}) {
  return (
    <Menu.Items
      className={cn(
        "absolute z-10 mt-2 min-w-[10rem] rounded-md bg-popover p-2 shadow-lg border border-border focus:outline-none",
        align === "end" ? "right-0" : "left-0"
      )}
    >
      {children}
    </Menu.Items>
  );
}

export function DropdownMenuItem({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <Menu.Item>
      {({ active }) => (
        <button
          className={cn(
            "w-full text-left px-3 py-2 rounded-md text-sm transition-colors",
            active ? "bg-accent text-accent-foreground" : ""
          )}
          onClick={onClick}
        >
          {children}
        </button>
      )}
    </Menu.Item>
  );
}
