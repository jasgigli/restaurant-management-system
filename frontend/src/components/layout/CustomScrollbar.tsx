/**
 * CustomScrollbar - Modern scrollbar component
 * Provides a sleek, custom scrollbar with hover effects and cross-browser support
 */

import { cn } from "../../lib/utils";

export interface CustomScrollbarProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "thin" | "hidden";
  orientation?: "vertical" | "horizontal";
}

export const CustomScrollbar: React.FC<CustomScrollbarProps> = ({
  children,
  className,
  variant = "default",
  orientation = "vertical",
}) => {
  const scrollbarClasses = cn(
    // Base scrollbar styles
    "scrollbar-thin scrollbar-track-transparent",

    // Variant-specific styles
    variant === "default" && [
      "scrollbar-thumb-neutral-300 dark:scrollbar-thumb-neutral-600",
      "hover:scrollbar-thumb-neutral-400 dark:hover:scrollbar-thumb-neutral-500",
    ],

    variant === "thin" && [
      "scrollbar-thumb-neutral-200 dark:scrollbar-thumb-neutral-700",
      "hover:scrollbar-thumb-neutral-300 dark:hover:scrollbar-thumb-neutral-600",
    ],

    variant === "hidden" && ["scrollbar-thumb-transparent"],

    // Orientation-specific styles
    orientation === "vertical" && ["scrollbar-w-2"],

    orientation === "horizontal" && ["scrollbar-h-2"],

    // Custom scrollbar styling
    "[&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar]:h-2",
    "[&::-webkit-scrollbar-track]:bg-transparent",
    "[&::-webkit-scrollbar-thumb]:rounded-full",
    "[&::-webkit-scrollbar-thumb]:transition-colors",
    "[&::-webkit-scrollbar-thumb]:duration-200",

    // Firefox scrollbar styling
    "[&::-moz-scrollbar]:w-2 [&::-moz-scrollbar]:h-2",
    "[&::-moz-scrollbar-track]:bg-transparent",
    "[&::-moz-scrollbar-thumb]:rounded-full",
    "[&::-moz-scrollbar-thumb]:transition-colors",
    "[&::-moz-scrollbar-thumb]:duration-200",

    className
  );

  return <div className={scrollbarClasses}>{children}</div>;
};

// CSS-in-JS styles for better cross-browser support
export const scrollbarStyles = `
  /* Webkit browsers (Chrome, Safari, Edge) */
  .custom-scrollbar::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  .custom-scrollbar::-webkit-scrollbar-track {
    background: transparent;
    border-radius: 4px;
  }

  .custom-scrollbar::-webkit-scrollbar-thumb {
    background: rgb(203 213 225);
    border-radius: 4px;
    transition: background-color 0.2s ease;
  }

  .custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: rgb(148 163 184);
  }

  /* Dark mode */
  .dark .custom-scrollbar::-webkit-scrollbar-thumb {
    background: rgb(71 85 105);
  }

  .dark .custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: rgb(100 116 139);
  }

  /* Firefox */
  .custom-scrollbar {
    scrollbar-width: thin;
    scrollbar-color: rgb(203 213 225) transparent;
  }

  .dark .custom-scrollbar {
    scrollbar-color: rgb(71 85 105) transparent;
  }

  /* Thin variant */
  .custom-scrollbar-thin::-webkit-scrollbar {
    width: 4px;
    height: 4px;
  }

  .custom-scrollbar-thin::-webkit-scrollbar-thumb {
    background: rgb(226 232 240);
  }

  .custom-scrollbar-thin::-webkit-scrollbar-thumb:hover {
    background: rgb(203 213 225);
  }

  .dark .custom-scrollbar-thin::-webkit-scrollbar-thumb {
    background: rgb(51 65 85);
  }

  .dark .custom-scrollbar-thin::-webkit-scrollbar-thumb:hover {
    background: rgb(71 85 105);
  }

  /* Hidden variant */
  .custom-scrollbar-hidden::-webkit-scrollbar {
    width: 0;
    height: 0;
  }

  .custom-scrollbar-hidden {
    scrollbar-width: none;
  }
`;
