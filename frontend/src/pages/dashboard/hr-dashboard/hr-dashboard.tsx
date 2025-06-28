import {
  AlertTriangle,
  BarChart3,
  Calendar,
  CheckCircle,
  Clock,
  DollarSign,
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

  return (
    <DashboardShell>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">HR Dashboard</h1>
            <p className="text-gray-600">
              Employee management and attendance overview.
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Calendar className="h-5 w-5 text-gray-500" />
            <span className="text-sm text-gray-500">
              {new Date().toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {kpiData.map((kpi, index) => (
            <KPICard key={index} {...kpi} />
          ))}
        </div>

        {/* Charts and Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Attendance Chart */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Weekly Attendance</h3>
              <Badge variant="outline">Last 7 days</Badge>
            </div>
            <SalesChart data={attendanceData} type="bar" />
          </Card>

          {/* Department Efficiency */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Department Efficiency</h3>
              <Badge variant="outline">Today</Badge>
            </div>
            <div className="space-y-4">
              {departmentStats.map((dept, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{dept.name}</span>
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Attendance */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Today's Attendance</h3>
              <Badge variant="outline">
                {recentAttendance.length} employees
              </Badge>
            </div>
            <div className="space-y-3">
              {recentAttendance.map((attendance, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    {getStatusIcon(attendance.status)}
                    <div>
                      <p className="font-medium">{attendance.name}</p>
                      <p className="text-sm text-gray-500">
                        {attendance.department} • {attendance.time}
                      </p>
                    </div>
                  </div>
                  <Badge
                    variant={
                      attendance.status === "present"
                        ? "success"
                        : attendance.status === "late"
                        ? "info"
                        : "destructive"
                    }
                  >
                    {attendance.status}
                  </Badge>
                </div>
              ))}
            </div>
          </Card>

          {/* Leave Requests */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Leave Requests</h3>
              <AlertTriangle className="h-5 w-5 text-orange-500" />
            </div>
            <div className="space-y-3">
              {leaveRequests.map((request, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div>
                    <p className="font-medium">{request.name}</p>
                    <p className="text-sm text-gray-500">
                      {request.type} • {request.days} days
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">{request.date}</p>
                    <Badge variant={getLeaveStatusColor(request.status)}>
                      {request.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6 text-center">
            <Users className="h-8 w-8 mx-auto mb-2 text-blue-500" />
            <h4 className="text-lg font-semibold">New Hires This Month</h4>
            <p className="text-2xl font-bold text-blue-600">3</p>
            <p className="text-sm text-gray-500">+1 from last month</p>
          </Card>

          <Card className="p-6 text-center">
            <DollarSign className="h-8 w-8 mx-auto mb-2 text-green-500" />
            <h4 className="text-lg font-semibold">Total Payroll</h4>
            <p className="text-2xl font-bold text-green-600">$45,230</p>
            <p className="text-sm text-gray-500">This month</p>
          </Card>

          <Card className="p-6 text-center">
            <BarChart3 className="h-8 w-8 mx-auto mb-2 text-purple-500" />
            <h4 className="text-lg font-semibold">Employee Satisfaction</h4>
            <p className="text-2xl font-bold text-purple-600">4.6/5</p>
            <p className="text-sm text-gray-500">+0.3 from last survey</p>
          </Card>
        </div>
      </div>
    </DashboardShell>
  );
};

export default HRDashboard;
