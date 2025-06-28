import {
  CheckCircle,
  Clock,
  Download,
  Plus,
  TrendingUp,
  UserCheck,
  Users,
  UserX,
  XCircle,
} from "lucide-react";
import React from "react";
import DashboardShell from "../../../components/dashboard/DashboardShell";
import { KPICard } from "../../../components/dashboard/KPICard";
import { SalesChart } from "../../../components/dashboard/SalesChart";
import { Badge } from "../../../components/ui/Badge";
import { Button } from "../../../components/ui/button";
import { Card } from "../../../components/ui/card";
import { Progress } from "../../../components/ui/Progress";

const HRDashboard: React.FC = () => {
  // Dummy data for HR dashboard
  const kpiData = [
    {
      title: "Total Employees",
      value: 45,
      change: 5.2,
      trend: "up" as const,
      icon: Users,
    },
    {
      title: "Present Today",
      value: 42,
      change: -2.1,
      trend: "down" as const,
      icon: UserCheck,
    },
    {
      title: "Absent Today",
      value: 3,
      change: 1.5,
      trend: "up" as const,
      icon: UserX,
    },
    {
      title: "Avg. Attendance",
      value: 93.5,
      change: 2.3,
      trend: "up" as const,
      icon: TrendingUp,
    },
  ];

  const attendanceData = [
    { date: "Mon", sales: 42, profit: 3, orders: 2 },
    { date: "Tue", sales: 44, profit: 1, orders: 1 },
    { date: "Wed", sales: 43, profit: 2, orders: 3 },
    { date: "Thu", sales: 45, profit: 0, orders: 1 },
    { date: "Fri", sales: 41, profit: 4, orders: 2 },
    { date: "Sat", sales: 38, profit: 7, orders: 1 },
    { date: "Sun", sales: 35, profit: 10, orders: 0 },
  ];

  const recentAttendance = [
    {
      name: "John Smith",
      time: "08:15",
      status: "present",
      department: "Kitchen",
    },
    {
      name: "Sarah Johnson",
      time: "08:45",
      status: "late",
      department: "Service",
    },
    {
      name: "Mike Davis",
      time: "09:00",
      status: "absent",
      department: "Kitchen",
    },
    {
      name: "Emily Wilson",
      time: "08:00",
      status: "present",
      department: "Service",
    },
    {
      name: "Tom Brown",
      time: "08:30",
      status: "present",
      department: "Management",
    },
  ];

  const leaveRequests = [
    {
      name: "Alice Cooper",
      type: "Sick Leave",
      days: 3,
      status: "pending",
      date: "2024-01-15",
    },
    {
      name: "Bob Miller",
      type: "Vacation",
      days: 7,
      status: "approved",
      date: "2024-01-20",
    },
    {
      name: "Carol White",
      type: "Personal",
      days: 1,
      status: "pending",
      date: "2024-01-18",
    },
    {
      name: "David Lee",
      type: "Sick Leave",
      days: 2,
      status: "approved",
      date: "2024-01-16",
    },
  ];

  const departmentStats = [
    { name: "Kitchen", total: 15, present: 14, absent: 1, efficiency: 93 },
    { name: "Service", total: 20, present: 18, absent: 2, efficiency: 90 },
    { name: "Management", total: 5, present: 5, absent: 0, efficiency: 100 },
    { name: "Cleaning", total: 5, present: 5, absent: 0, efficiency: 100 },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "present":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "late":
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case "absent":
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return null;
    }
  };

  const getLeaveStatusColor = (
    status: string
  ): "success" | "destructive" | "info" | "warning" | "default" => {
    switch (status) {
      case "approved":
        return "success";
      case "pending":
        return "warning";
      case "rejected":
        return "destructive";
      default:
        return "default";
    }
  };

  const dashboardActions = (
    <div className="flex items-center gap-3">
      <Button variant="outline" className="px-3 py-2 text-sm">
        <Download className="h-4 w-4 mr-2" />
        Export Report
      </Button>
      <Button className="px-3 py-2 text-sm">
        <Plus className="h-4 w-4 mr-2" />
        Add Employee
      </Button>
    </div>
  );

  return (
    <DashboardShell
      title="HR Dashboard"
      subtitle="Employee management and attendance overview."
      actions={dashboardActions}
    >
      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiData.map((kpi, index) => (
          <KPICard key={index} {...kpi} />
        ))}
      </div>

      {/* Charts and Analytics */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Attendance Chart */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                Weekly Attendance
              </h3>
              <p className="text-sm text-gray-600">Daily attendance trends</p>
            </div>
            <Badge variant="outline">This Week</Badge>
          </div>
          <SalesChart data={attendanceData} type="bar" />
        </Card>

        {/* Department Performance */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                Department Performance
              </h3>
              <p className="text-sm text-gray-600">Attendance by department</p>
            </div>
            <Badge variant="outline">Today</Badge>
          </div>
          <div className="space-y-4">
            {departmentStats.map((dept, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-gray-900">{dept.name}</span>
                  <span className="text-sm text-gray-500">
                    {dept.present}/{dept.total} ({dept.efficiency}%)
                  </span>
                </div>
                <Progress value={dept.efficiency} className="h-2" />
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Recent Activity and Leave Requests */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Recent Attendance */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                Recent Attendance
              </h3>
              <p className="text-sm text-gray-600">Today's check-ins</p>
            </div>
            <Badge variant="outline">{recentAttendance.length} entries</Badge>
          </div>
          <div className="space-y-4">
            {recentAttendance.map((entry, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center gap-3">
                  {getStatusIcon(entry.status)}
                  <div>
                    <p className="font-medium text-gray-900">{entry.name}</p>
                    <p className="text-sm text-gray-500">
                      {entry.department} • {entry.time}
                    </p>
                  </div>
                </div>
                <Badge
                  variant={
                    entry.status === "present"
                      ? "success"
                      : entry.status === "late"
                      ? "warning"
                      : "destructive"
                  }
                >
                  {entry.status}
                </Badge>
              </div>
            ))}
          </div>
        </Card>

        {/* Leave Requests */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                Leave Requests
              </h3>
              <p className="text-sm text-gray-600">Pending approvals</p>
            </div>
            <Badge variant="outline">{leaveRequests.length} requests</Badge>
          </div>
          <div className="space-y-4">
            {leaveRequests.map((request, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{request.name}</p>
                  <p className="text-sm text-gray-500">
                    {request.type} • {request.days} days • {request.date}
                  </p>
                </div>
                <Badge variant={getLeaveStatusColor(request.status)}>
                  {request.status}
                </Badge>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </DashboardShell>
  );
};

export default HRDashboard;
