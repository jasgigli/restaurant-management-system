import React from "react";
import { Footer } from "../layout/Footer";
import Sidebar from "../layout/Sidebar";
import { AppBar } from "./AppBar";

interface DashboardShellProps {
  children?: React.ReactNode;
}

const DashboardShell: React.FC<DashboardShellProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <AppBar />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-6 overflow-y-auto bg-gray-50">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
      <Footer version="1.0.0" lastSync={new Date().toLocaleString()} />
    </div>
  );
};

export default DashboardShell;
