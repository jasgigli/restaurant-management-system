import React from "react";
import DashboardShell from "../../../components/dashboard/DashboardShell";

const StaffDashboard: React.FC = () => {
  return (
    <DashboardShell>
      {/* Staff-specific widgets and analytics go here */}
      <div className="text-2xl font-bold mb-4">Staff Dashboard</div>
      <div className="text-muted-foreground">
        Welcome, Staff! Your widgets and analytics will appear here.
      </div>
    </DashboardShell>
  );
};

export default StaffDashboard;
