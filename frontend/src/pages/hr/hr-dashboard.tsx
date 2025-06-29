import { motion } from "framer-motion";
import {
  Award,
  Bell,
  Briefcase,
  Building,
  Calendar,
  CheckCircle,
  Clock,
  Download,
  FileText,
  HeartHandshake,
  Plus,
  Settings,
  TrendingUp,
  UserCheck,
  UserCircle,
  Users,
  UserX,
  XCircle,
} from "lucide-react";
import React from "react";
import AnnouncementCard from "../../components/dashboard/AnnouncementCard";
import BirthdaysCard from "../../components/dashboard/BirthdaysCard";
import DashboardShell from "../../components/dashboard/DashboardShell";
import { KPICard } from "../../components/dashboard/KPICard";
import MiniCalendar from "../../components/dashboard/MiniCalendar";
import QuickLinks from "../../components/dashboard/QuickLinks";
import { SalesChart } from "../../components/dashboard/SalesChart";
import TeamMoodCard from "../../components/dashboard/TeamMoodCard";
import { Badge } from "../../components/ui/Badge";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Progress } from "../../components/ui/Progress";
import { Stack } from "../../components/ui/stack";

const HRDashboard: React.FC = () => {
  // Dummy data for widgets
  const kpiData = [
    {
      title: "Total Employees",
      value: 45,
      change: 5.2,
      trend: "up" as const,
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-500/20",
    },
    {
      title: "Present Today",
      value: 42,
      change: -2.1,
      trend: "down" as const,
      icon: UserCheck,
      color: "text-green-600",
      bgColor: "bg-green-500/10",
      borderColor: "border-green-500/20",
    },
    {
      title: "Absent Today",
      value: 3,
      change: 1.5,
      trend: "up" as const,
      icon: UserX,
      color: "text-red-600",
      bgColor: "bg-red-500/10",
      borderColor: "border-red-500/20",
    },
    {
      title: "Avg. Attendance",
      value: 93.5,
      change: 2.3,
      trend: "up" as const,
      icon: TrendingUp,
      color: "text-purple-600",
      bgColor: "bg-purple-500/10",
      borderColor: "border-purple-500/20",
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
      avatar: "JS",
    },
    {
      name: "Sarah Johnson",
      time: "08:45",
      status: "late",
      department: "Service",
      avatar: "SJ",
    },
    {
      name: "Mike Davis",
      time: "09:00",
      status: "absent",
      department: "Kitchen",
      avatar: "MD",
    },
    {
      name: "Emily Wilson",
      time: "08:00",
      status: "present",
      department: "Service",
      avatar: "EW",
    },
    {
      name: "Tom Brown",
      time: "08:30",
      status: "present",
      department: "Management",
      avatar: "TB",
    },
  ];

  const leaveRequests = [
    {
      name: "Alice Cooper",
      type: "Sick Leave",
      days: 3,
      status: "pending",
      date: "2024-01-15",
      avatar: "AC",
    },
    {
      name: "Bob Miller",
      type: "Vacation",
      days: 7,
      status: "approved",
      date: "2024-01-20",
      avatar: "BM",
    },
    {
      name: "Carol White",
      type: "Personal",
      days: 1,
      status: "pending",
      date: "2024-01-18",
      avatar: "CW",
    },
    {
      name: "David Lee",
      type: "Sick Leave",
      days: 2,
      status: "approved",
      date: "2024-01-16",
      avatar: "DL",
    },
  ];

  const departmentStats = [
    {
      name: "Kitchen",
      total: 15,
      present: 14,
      absent: 1,
      efficiency: 93,
      icon: Building,
    },
    {
      name: "Service",
      total: 20,
      present: 18,
      absent: 2,
      efficiency: 90,
      icon: Briefcase,
    },
    {
      name: "Management",
      total: 5,
      present: 5,
      absent: 0,
      efficiency: 100,
      icon: Award,
    },
    {
      name: "Cleaning",
      total: 5,
      present: 5,
      absent: 0,
      efficiency: 100,
      icon: Building,
    },
  ];

  // New widget data
  const birthdays = [
    {
      name: "Emily Wilson",
      date: new Date(Date.now() + 2 * 86400000).toISOString(),
      type: "birthday",
    },
    {
      name: "Tom Brown",
      date: new Date(Date.now() + 5 * 86400000).toISOString(),
      type: "anniversary",
    },
  ];

  const teamMoods = [
    { name: "John Smith", mood: "happy", comment: "Great team spirit!" },
    { name: "Sarah Johnson", mood: "neutral", comment: "Busy week." },
    { name: "Mike Davis", mood: "happy", comment: "Enjoying the new menu." },
    { name: "Emily Wilson", mood: "sad", comment: "A bit tired." },
  ];

  const calendarEvents = [
    { date: new Date().toISOString(), label: "Interview: Waiter" },
    {
      date: new Date(Date.now() + 86400000).toISOString(),
      label: "Payroll Review",
    },
    {
      date: new Date(Date.now() + 2 * 86400000).toISOString(),
      label: "Policy Update",
    },
  ];

  // Quick links for HR
  const quickLinks = [
    { icon: FileText, label: "Recruitment", href: "/hr/recruitment" },
    { icon: Calendar, label: "Attendance", href: "/hr/attendance" },
    { icon: HeartHandshake, label: "Benefits", href: "/hr/benefits" },
    { icon: Settings, label: "Settings", href: "/hr/settings" },
  ];

  // Notifications bell (dummy count)
  const NotificationsBell = () => (
    <div className="relative">
      <Bell className="w-6 h-6 text-primary" />
      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1">
        2
      </span>
    </div>
  );

  // Avatar (dummy)
  const Avatar = () => (
    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/40 to-accent/40 flex items-center justify-center border border-primary/30">
      <UserCircle className="w-8 h-8 text-primary" />
    </div>
  );

  // Announcement
  const announcement = {
    title: "HR Policy Update",
    message:
      "New leave policy effective from next month. Please review the HR portal for details.",
    ctaLabel: "View Policy",
    ctaHref: "/hr/policies",
  };

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
    <Stack direction="horizontal" spacing="md">
      <Button
        variant="outline"
        size="sm"
        className="bg-gradient-to-r from-background/50 to-background/30 border-border/50 hover:border-primary/50 transition-all duration-200"
      >
        <Download className="h-4 w-4 mr-2" />
        Export Report
      </Button>
      <Button
        size="sm"
        className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 transition-all duration-200 shadow-lg"
      >
        <Plus className="h-4 w-4 mr-2" />
        Add Employee
      </Button>
    </Stack>
  );

  return (
    <DashboardShell
      title="HR Dashboard"
      subtitle="Employee management and attendance overview."
      actions={dashboardActions}
      avatar={<Avatar />}
      notifications={<NotificationsBell />}
      quickLinks={<QuickLinks links={quickLinks} />}
      widgetsRow={
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-6 gap-x-6 mb-6">
          <AnnouncementCard {...announcement} />
          <MiniCalendar events={calendarEvents} />
          <BirthdaysCard people={birthdays} />
          <TeamMoodCard moods={teamMoods} />
        </div>
      }
    >
      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-y-6 gap-x-6 mb-8">
        {kpiData.map((kpi, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <KPICard {...kpi} />
          </motion.div>
        ))}
      </div>

      {/* Charts and Analytics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-6">
        {/* Attendance Chart */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="bg-gradient-to-br from-card/80 to-card/60 rounded-2xl backdrop-blur-sm border-border/50 shadow-xl hover:shadow-2xl transition-all duration-300">
            <CardHeader className="bg-gradient-to-r from-blue-500/5 to-cyan-500/5 border-b border-border/30">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl font-bold text-blue-600 dark:text-blue-400">
                    Weekly Attendance
                  </CardTitle>
                  <CardDescription className="text-muted-foreground">
                    Daily attendance trends
                  </CardDescription>
                </div>
                <Badge
                  variant="outline"
                  className="bg-background/50 border-blue-500/30"
                >
                  This Week
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="p-4 sm:p-6">
              <SalesChart data={attendanceData} type="bar" />
            </CardContent>
          </Card>
        </motion.div>

        {/* Department Efficiency */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="bg-gradient-to-br from-card/80 to-card/60 rounded-2xl backdrop-blur-sm border-border/50 shadow-xl hover:shadow-2xl transition-all duration-300">
            <CardHeader className="bg-gradient-to-r from-green-500/5 to-emerald-500/5 border-b border-border/30">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl font-bold text-green-600 dark:text-green-400">
                    Department Efficiency
                  </CardTitle>
                  <CardDescription className="text-muted-foreground">
                    Attendance by department
                  </CardDescription>
                </div>
                <Badge
                  variant="outline"
                  className="bg-background/50 border-green-500/30"
                >
                  Today
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="p-4 sm:p-6">
              <Stack spacing="md">
                {departmentStats.map((dept, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    className="p-4 bg-gradient-to-r from-muted/30 to-muted/20 rounded-xl border border-border/30 hover:border-border/50 transition-all duration-200"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-gradient-to-r from-primary/20 to-accent/20 rounded-lg border border-primary/30">
                          <dept.icon className="w-4 h-4 text-primary" />
                        </div>
                        <div>
                          <p className="font-semibold text-foreground">
                            {dept.name}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {dept.present}/{dept.total} present
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-foreground">
                          {dept.efficiency}%
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Efficiency
                        </p>
                      </div>
                    </div>
                    <Progress
                      value={dept.efficiency}
                      className="h-2 bg-green-500/20"
                    />
                  </motion.div>
                ))}
              </Stack>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Recent Attendance and Leave Requests */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-6">
        {/* Recent Attendance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card className="bg-gradient-to-br from-card/80 to-card/60 rounded-2xl backdrop-blur-sm border-border/50 shadow-xl hover:shadow-2xl transition-all duration-300">
            <CardHeader className="bg-gradient-to-r from-purple-500/5 to-pink-500/5 border-b border-border/30">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl font-bold text-purple-600 dark:text-purple-400">
                    Recent Attendance
                  </CardTitle>
                  <CardDescription className="text-muted-foreground">
                    Today's check-ins
                  </CardDescription>
                </div>
                <Badge
                  variant="outline"
                  className="bg-background/50 border-purple-500/30"
                >
                  {recentAttendance.length} entries
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="p-4 sm:p-6">
              <Stack spacing="md">
                {recentAttendance.map((entry, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 + index * 0.1 }}
                    className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-gradient-to-r from-muted/30 to-muted/20 rounded-xl hover:from-muted/40 hover:to-muted/30 transition-all duration-200 border border-border/30 hover:border-border/50 group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-primary/20 to-accent/20 rounded-full flex items-center justify-center text-xs font-bold text-primary border border-primary/30">
                        {entry.avatar}
                      </div>
                      <div>
                        <p className="font-semibold text-foreground group-hover:text-primary transition-colors duration-200">
                          {entry.name}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {entry.department} • {entry.time}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mt-2 sm:mt-0">
                      {getStatusIcon(entry.status)}
                      <Badge
                        variant={
                          entry.status === "present"
                            ? "success"
                            : entry.status === "late"
                            ? "warning"
                            : "destructive"
                        }
                        className="text-xs"
                      >
                        {entry.status}
                      </Badge>
                    </div>
                  </motion.div>
                ))}
              </Stack>
            </CardContent>
          </Card>
        </motion.div>

        {/* Leave Requests */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <Card className="bg-gradient-to-br from-card/80 to-card/60 rounded-2xl backdrop-blur-sm border-border/50 shadow-xl hover:shadow-2xl transition-all duration-300">
            <CardHeader className="bg-gradient-to-r from-orange-500/5 to-red-500/5 border-b border-border/30">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl font-bold text-orange-600 dark:text-orange-400 flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    Leave Requests
                  </CardTitle>
                  <CardDescription className="text-muted-foreground">
                    Pending approvals
                  </CardDescription>
                </div>
                <Badge
                  variant="outline"
                  className="bg-background/50 border-orange-500/30"
                >
                  {leaveRequests.filter((r) => r.status === "pending").length}{" "}
                  pending
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="p-4 sm:p-6">
              <Stack spacing="md">
                {leaveRequests.map((request, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 + index * 0.1 }}
                    className="p-4 bg-gradient-to-r from-orange-500/5 to-red-500/5 rounded-xl border border-orange-500/20 hover:border-orange-500/30 transition-all duration-200"
                  >
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-full flex items-center justify-center text-xs font-bold text-orange-600 border border-orange-500/30">
                          {request.avatar}
                        </div>
                        <div>
                          <p className="font-semibold text-foreground">
                            {request.name}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {request.type} • {request.days} days
                          </p>
                        </div>
                      </div>
                      <div className="text-right mt-2 sm:mt-0">
                        <Badge
                          variant={getLeaveStatusColor(request.status)}
                          className="text-xs"
                        >
                          {request.status}
                        </Badge>
                        <p className="text-xs text-muted-foreground mt-1">
                          {request.date}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </Stack>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </DashboardShell>
  );
};

export default HRDashboard;
