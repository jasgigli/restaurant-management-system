/**
 * MainLayout - Main layout wrapper component
 * Enhanced with modern SaaS design and improved UX
 */

import { AnimatePresence, motion } from "framer-motion";
import { Outlet } from "react-router-dom";
import { Footer } from "../components/layout/Footer";
import { Header } from "../components/layout/Header";
import Sidebar from "../components/layout/Sidebar";
import { Container } from "../components/ui/container";
import { useLayout } from "../hooks/useLayout";
import { cn } from "../lib/utils";

const MainLayout = () => {
  const {
    sidebarOpen,
    closeSidebar,
    isMobile,
    sidebarCollapsed,
    toggleSidebar,
  } = useLayout();

  const layoutVariants = {
    open: {
      marginLeft: sidebarCollapsed ? "4rem" : "20rem",
      transition: { duration: 0.3, ease: "easeInOut" },
    },
    closed: {
      marginLeft: "0rem",
      transition: { duration: 0.3, ease: "easeInOut" },
    },
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-background via-muted/10 to-muted/20 dark:from-background dark:via-muted/5 dark:to-muted/10 overflow-hidden relative">
      {/* Enhanced background with subtle patterns */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Subtle gradient overlays */}
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-primary/5 to-transparent" />
        <div className="absolute bottom-0 right-0 w-full h-32 bg-gradient-to-t from-accent/5 to-transparent" />

        {/* Floating particles */}
        <div className="absolute top-20 right-20 w-1 h-1 bg-primary/30 rounded-full animate-float" />
        <div className="absolute top-40 left-40 w-0.5 h-0.5 bg-accent/40 rounded-full animate-float delay-1000" />
        <div className="absolute bottom-20 right-40 w-0.5 h-0.5 bg-primary/20 rounded-full animate-float delay-2000" />
        <div className="absolute bottom-40 left-20 w-1 h-1 bg-accent/30 rounded-full animate-float delay-3000" />
      </div>

      {/* Sidebar */}
      <AnimatePresence mode="wait">
        {sidebarOpen && (
          <motion.div
            initial={{ x: -320, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -320, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className={cn(
              "fixed lg:static inset-y-0 left-0 z-50",
              "lg:translate-x-0"
            )}
          >
            <Sidebar onClose={closeSidebar} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Overlay for mobile */}
      <AnimatePresence>
        {sidebarOpen && isMobile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
            onClick={closeSidebar}
          />
        )}
      </AnimatePresence>

      {/* Main content area */}
      <motion.div
        variants={layoutVariants}
        initial="closed"
        animate={sidebarOpen ? "open" : "closed"}
        className="flex-1 flex flex-col min-w-0 overflow-hidden relative"
      >
        {/* Header */}
        <Header
          onMenuToggle={toggleSidebar}
          showMobileMenu={isMobile}
          notifications={3}
          breadcrumbs={["Dashboard"]}
        />

        {/* Main content */}
        <main className="flex-1 overflow-y-auto bg-gradient-to-br from-card/60 via-card/40 to-card/60 dark:from-card/30 dark:via-card/20 dark:to-card/30 backdrop-blur-xl shadow-inner rounded-tl-3xl min-h-0 relative">
          {/* Content background pattern */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(0,0,0,0.02)_1px,transparent_0)] dark:bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.02)_1px,transparent_0)] bg-[length:20px_20px] pointer-events-none" />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="py-8 lg:py-12 relative z-10"
          >
            <Container>
              <Outlet />
            </Container>
          </motion.div>
        </main>

        {/* Footer */}
        <Footer />
      </motion.div>
    </div>
  );
};

export default MainLayout;
