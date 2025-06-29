import React from "react";
import { cn } from "../../../lib/utils";

export type StatusColor = "green" | "yellow" | "red" | "gray";

const colorMap: Record<StatusColor, string> = {
  green: "bg-green-500",
  yellow: "bg-yellow-500",
  red: "bg-red-500",
  gray: "bg-gray-400",
};

export interface StatusDotProps {
  color: StatusColor;
  className?: string;
  pulse?: boolean;
}

export const StatusDot: React.FC<StatusDotProps> = ({
  color,
  className,
  pulse = false,
}) => (
  <span
    className={cn(
      "inline-block w-2 h-2 rounded-full",
      colorMap[color],
      pulse && "animate-pulse",
      className
    )}
  />
);
