import React from "react";
import { Badge } from "../../ui/Badge";

export interface VersionBadgeProps {
  version: string;
  className?: string;
}

export const VersionBadge: React.FC<VersionBadgeProps> = ({
  version,
  className,
}) => (
  <Badge variant="outline" className={"text-xs px-2 py-1 " + (className || "")}>
    v{version}
  </Badge>
);
