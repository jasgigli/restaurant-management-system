import React from "react";
import DashboardShell from "../../../components/dashboard/DashboardShell";

const AdminDashboard: React.FC = () => {
  return (
    <DashboardShell>
      {/* Admin-specific widgets and analytics go here */}
      <div className="text-2xl font-bold mb-4">Admin Dashboard</div>
      <div className="text-muted-foreground">
        Welcome, Admin! Your widgets and analytics will appear here.
      </div>
    </DashboardShell>
  );
};

export default AdminDashboard;
