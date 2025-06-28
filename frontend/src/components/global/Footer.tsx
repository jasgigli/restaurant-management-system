/**
 * Footer - Dashboard footer
 * @module components/global/Footer
 */
import type { FC } from "react";

/**
 * Props for Footer component
 */
export interface FooterProps {
  /** App version */
  version: string;
  /** Last sync timestamp */
  lastSync: string;
  /** Support link */
  supportUrl?: string;
}

export const Footer: FC<FooterProps> = ({
  version,
  lastSync,
  supportUrl = "/support",
}) => (
  <footer className="w-full flex items-center justify-between px-4 py-2 bg-background border-t text-xs text-muted-foreground">
    <span>Version {version}</span>
    <span>Last sync: {lastSync}</span>
    <a href={supportUrl} className="underline">
      Contact Support
    </a>
  </footer>
);
