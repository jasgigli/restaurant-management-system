import { Clock } from "lucide-react";
import React, { useEffect, useState } from "react";
import { cn } from "../../../lib/utils";

export interface CurrentTimeProps {
  className?: string;
  withIcon?: boolean;
  withSeconds?: boolean;
}

export const CurrentTime: React.FC<CurrentTimeProps> = ({
  className,
  withIcon = false,
  withSeconds = false,
}) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <span
      className={cn(
        "flex items-center gap-2 text-sm text-muted-foreground",
        className
      )}
    >
      {withIcon && <Clock className="w-4 h-4" />}
      {currentTime.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        ...(withSeconds ? { second: "2-digit" } : {}),
      })}
    </span>
  );
};
