import React from "react";
import { AppBar } from "../global/AppBar";
import { Footer } from "../global/Footer";
import Sidebar from "../layoutComponents/Sidebar";

interface DashboardShellProps {
  children?: React.ReactNode;
}

const DashboardShell: React.FC<DashboardShellProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <AppBar />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-4 overflow-y-auto">{children}</main>
      </div>
      <Footer version="1.0.0" lastSync={new Date().toLocaleString()} />
    </div>
  );
};

export default DashboardShell;
