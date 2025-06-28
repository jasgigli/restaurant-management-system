import React from "react";
import DashboardShell from "../../../components/dashboard/DashboardShell";

const HRDashboard: React.FC = () => {
  return (
    <DashboardShell>
      {/* HR-specific widgets and analytics go here */}
      <div className="text-2xl font-bold mb-4">HR Dashboard</div>
      <div className="text-muted-foreground">
        Welcome, HR! Your widgets and analytics will appear here.
      </div>
    </DashboardShell>
  );
};

export default HRDashboard;
