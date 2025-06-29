/**
 * useLayout - Custom hook for managing layout state and responsive behavior
 * Provides centralized state management for sidebar, header, and responsive layout
 */

import { useContext } from "react";
import { LayoutContext } from "../contexts/LayoutContext";

export const useLayout = () => {
  const context = useContext(LayoutContext);
  if (!context) {
    throw new Error("useLayout must be used within a LayoutProvider");
  }
  return context;
};
