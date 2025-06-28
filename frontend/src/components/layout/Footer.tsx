/**
 * Footer - Dashboard footer
 * @module components/global/Footer
 */
import { Heart, Shield, Zap } from "lucide-react";
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
  <footer className="w-full bg-white border-t border-gray-200 px-4 py-3">
    <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-sm text-gray-600">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Shield className="h-4 w-4 text-green-500" />
          <span className="font-medium">Secure Connection</span>
        </div>
        <div className="flex items-center gap-2">
          <Zap className="h-4 w-4 text-blue-500" />
          <span>v{version}</span>
        </div>
      </div>

      <div className="flex items-center gap-4 text-xs">
        <span className="hidden sm:inline">Last sync: {lastSync}</span>
        <a
          href={supportUrl}
          className="flex items-center gap-1 hover:text-blue-600 transition-colors"
        >
          <Heart className="h-3 w-3" />
          Support
        </a>
      </div>
    </div>
  </footer>
);
