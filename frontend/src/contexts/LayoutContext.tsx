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
    } else {
      // On tablet and desktop, always keep sidebar open for consistent 20% width
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

  // Ensure sidebar stays open on desktop/tablet, only close on mobile route changes
  useEffect(() => {
    if (isMobile) {
      // Only close sidebar on mobile when route changes
      setSidebarOpen(false);
    } else {
      // Always keep sidebar open on desktop/tablet for consistent 20% width
      setSidebarOpen(true);
    }
  }, [location.pathname, isMobile]);

  // Action handlers
  const toggleSidebar = useCallback(() => {
    if (isMobile) {
      // Only allow toggling on mobile
      setSidebarOpen((prev) => !prev);
    }
  }, [isMobile]);

  const closeSidebar = useCallback(() => {
    // Only allow closing on mobile
    if (isMobile) {
      setSidebarOpen(false);
    }
  }, [isMobile]);

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
