import React, { createContext, useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

interface LayoutContextType {
  sidebarOpen: boolean;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  sidebarCollapsed: boolean;
  toggleSidebar: () => void;
  closeSidebar: () => void;
  openSidebar: () => void;
  toggleSidebarCollapsed: () => void;
  setSidebarCollapsed: (collapsed: boolean) => void;
}

const LayoutContext = createContext<LayoutContextType | undefined>(undefined);

export const LayoutProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isDesktop, setIsDesktop] = useState(true);
  const location = useLocation();

  // Handle responsive behavior
  const handleResize = useCallback(() => {
    const width = window.innerWidth;
    const mobile = width < 768;
    const tablet = width >= 768 && width < 1024;
    const desktop = width >= 1024;

    setIsMobile(mobile);
    setIsTablet(tablet);
    setIsDesktop(desktop);

    // Auto-manage sidebar state based on screen size
    if (mobile) {
      setSidebarOpen(false);
      setSidebarCollapsed(false);
    } else if (tablet) {
      setSidebarOpen(true);
      setSidebarCollapsed(true);
    } else {
      setSidebarOpen(true);
      setSidebarCollapsed(false);
    }
  }, []);

  // Initialize and handle resize events
  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [handleResize]);

  // Only close sidebar on mobile when route changes, preserve desktop state
  useEffect(() => {
    if (isMobile && sidebarOpen) {
      setSidebarOpen(false);
    }
  }, [location.pathname, isMobile, sidebarOpen]);

  // Action handlers
  const toggleSidebar = useCallback(() => {
    setSidebarOpen((prev) => !prev);
  }, []);

  const closeSidebar = useCallback(() => {
    setSidebarOpen(false);
  }, []);

  const openSidebar = useCallback(() => {
    setSidebarOpen(true);
  }, []);

  const toggleSidebarCollapsed = useCallback(() => {
    setSidebarCollapsed((prev) => !prev);
  }, []);

  const setSidebarCollapsedState = useCallback((collapsed: boolean) => {
    setSidebarCollapsed(collapsed);
  }, []);

  const value = {
    sidebarOpen,
    isMobile,
    isTablet,
    isDesktop,
    sidebarCollapsed,
    toggleSidebar,
    closeSidebar,
    openSidebar,
    toggleSidebarCollapsed,
    setSidebarCollapsed: setSidebarCollapsedState,
  };

  return (
    <LayoutContext.Provider value={value}>{children}</LayoutContext.Provider>
  );
};

// Export the context for use in the hook
export { LayoutContext };
