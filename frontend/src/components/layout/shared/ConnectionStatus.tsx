import { Wifi } from "lucide-react";
import React from "react";
import { cn } from "../../../lib/utils";
import { StatusDot } from "./StatusDot";

export interface ConnectionStatusProps {
  isOnline: boolean;
  className?: string;
}

export const ConnectionStatus: React.FC<ConnectionStatusProps> = ({
  isOnline,
  className,
}) => (
  <span className={cn("flex items-center gap-2 text-sm", className)}>
    <StatusDot color={isOnline ? "green" : "red"} pulse={isOnline} />
    <Wifi
      className={cn("w-4 h-4", isOnline ? "text-green-500" : "text-red-500")}
    />
    <span className={isOnline ? "text-green-600" : "text-red-600"}>
      {isOnline ? "Online" : "Offline"}
    </span>
  </span>
);
