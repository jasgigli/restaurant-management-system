import {
  AlertTriangle,
  Bell,
  Calendar,
  CheckCircle,
  Clock,
  Download,
  Plus,
  Settings,
  ShoppingCart,
  Star,
  UserCircle,
  Users,
} from "lucide-react";
import React from "react";
import AnnouncementCard from "../../components/dashboard/AnnouncementCard";
import DashboardShell from "../../components/dashboard/DashboardShell";
import { KPICard } from "../../components/dashboard/KPICard";
import MiniCalendar from "../../components/dashboard/MiniCalendar";
import PeerRecognitionCard from "../../components/dashboard/PeerRecognitionCard";
import QuickLinks from "../../components/dashboard/QuickLinks";
import { SalesChart } from "../../components/dashboard/SalesChart";
import ScheduleCard from "../../components/dashboard/ScheduleCard";
import ShiftSwapCard from "../../components/dashboard/ShiftSwapCard";
import { Badge } from "../../components/ui/Badge";
import { Button } from "../../components/ui/button";

const StaffDashboard: React.FC = () => {
  // Dummy data for widgets
  const kpiData = [
    {
      title: "Today's Orders",
      value: 45,
      change: 12.5,
      trend: "up" as const,
      icon: ShoppingCart,
    },
    {
      title: "Hours Worked",
      value: 8.5,
      change: 0.5,
      trend: "up" as const,
      icon: Clock,
    },
    {
      title: "Tasks Completed",
      value: 23,
      change: 3.2,
      trend: "up" as const,
      icon: CheckCircle,
    },
    {
      title: "Customer Rating",
      value: 4.8,
      change: 0.2,
      trend: "up" as const,
      icon: Star,
    },
  ];
  const dailyOrders = [
    { date: "9AM", sales: 12, profit: 8, orders: 5 },
    { date: "10AM", sales: 18, profit: 12, orders: 8 },
    { date: "11AM", sales: 25, profit: 18, orders: 12 },
    { date: "12PM", sales: 35, profit: 25, orders: 18 },
    { date: "1PM", sales: 28, profit: 20, orders: 15 },
    { date: "2PM", sales: 22, profit: 16, orders: 11 },
    { date: "3PM", sales: 19, profit: 14, orders: 9 },
  ];
  const currentOrders = [
    {
      id: "#1234",
      items: ["Burger", "Fries", "Coke"],
      status: "preparing",
      time: "5 min",
      customer: "Table 3",
    },
    {
      id: "#1235",
      items: ["Pizza", "Salad"],
      status: "ready",
      time: "2 min",
      customer: "Table 7",
    },
    {
      id: "#1236",
      items: ["Pasta", "Garlic Bread"],
      status: "preparing",
      time: "8 min",
      customer: "Table 2",
    },
    {
      id: "#1237",
      items: ["Steak", "Mashed Potatoes"],
      status: "cooking",
      time: "12 min",
      customer: "Table 5",
    },
  ];
  const todayTasks = [
    { task: "Morning prep", completed: true, time: "6:00 AM" },
    { task: "Inventory check", completed: true, time: "7:00 AM" },
    { task: "Lunch service", completed: false, time: "11:00 AM" },
    { task: "Clean kitchen", completed: false, time: "2:00 PM" },
    { task: "Evening prep", completed: false, time: "4:00 PM" },
    { task: "Dinner service", completed: false, time: "6:00 PM" },
  ];
  const notifications = [
    {
      message: "New order received for Table 8",
      time: "2 min ago",
      type: "order",
    },
    { message: "Low stock alert: Tomatoes", time: "15 min ago", type: "alert" },
    { message: "Staff meeting at 3 PM", time: "1 hour ago", type: "meeting" },
    {
      message: "Customer feedback received",
      time: "2 hours ago",
      type: "feedback",
    },
  ];
  // New widget data
  const recognitions = [
    {
      from: "Alice",
      to: "Bob",
      message: "Great teamwork on the lunch rush!",
      date: new Date().toISOString(),
    },
    {
      from: "Sarah",
      to: "Mike",
      message: "Thanks for covering my shift!",
      date: new Date(Date.now() - 86400000).toISOString(),
    },
  ];
  const scheduleTasks = todayTasks.map((t) => ({
    time: t.time,
    label: t.task,
    completed: t.completed,
  }));
  const shiftSwaps = [
    {
      from: "John",
      to: "Sarah",
      date: new Date(Date.now() + 86400000).toISOString(),
      status: "open" as const,
    },
    {
      from: "Mike",
      to: "Tom",
      date: new Date(Date.now() + 2 * 86400000).toISOString(),
      status: "approved" as const,
    },
  ];
  const calendarEvents = [
    { date: new Date().toISOString(), label: "Staff Meeting" },
    {
      date: new Date(Date.now() + 86400000).toISOString(),
      label: "Inventory Check",
    },
    {
      date: new Date(Date.now() + 2 * 86400000).toISOString(),
      label: "Training",
    },
  ];
  // Quick links for staff
  const quickLinks = [
    { icon: Calendar, label: "Schedule", href: "/staff/schedule" },
    { icon: Users, label: "Requests", href: "/staff/requests" },
    { icon: Star, label: "Feedback", href: "/staff/feedback" },
    { icon: Settings, label: "Settings", href: "/staff/settings" },
  ];
  // Notifications bell (dummy count)
  const NotificationsBell = () => (
    <div className="relative">
      <Bell className="w-6 h-6 text-primary" />
      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1">
        1
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
    title: "Motivation of the Day",
    message: "Teamwork divides the task and multiplies the success!",
    ctaLabel: "See More Tips",
    ctaHref: "/staff/tips",
  };
  const dashboardActions = (
    <div className="flex items-center gap-3">
      <Button variant="outline" className="px-3 py-2 text-sm">
        <Download className="h-4 w-4 mr-2" />
        Export Tasks
      </Button>
      <Button className="px-3 py-2 text-sm">
        <Plus className="h-4 w-4 mr-2" />
        New Task
      </Button>
    </div>
  );
  const getOrderStatusColor = (
    status: string
  ): "success" | "destructive" | "info" | "warning" | "default" => {
    switch (status) {
      case "ready":
        return "success";
      case "preparing":
        return "warning";
      case "cooking":
        return "destructive";
      default:
        return "default";
    }
  };
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "order":
        return <ShoppingCart className="h-4 w-4 text-blue-500" />;
      case "alert":
        return <AlertTriangle className="h-4 w-4 text-orange-500" />;
      case "meeting":
        return <Users className="h-4 w-4 text-purple-500" />;
      case "feedback":
        return <Star className="h-4 w-4 text-green-500" />;
      default:
        return <Bell className="h-4 w-4 text-gray-500" />;
    }
  };
  return (
    <DashboardShell
      title="Staff Dashboard"
      subtitle="Your daily overview and tasks."
      actions={dashboardActions}
      avatar={<Avatar />}
      notifications={<NotificationsBell />}
      quickLinks={<QuickLinks links={quickLinks} />}
      widgetsRow={
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          <AnnouncementCard {...announcement} />
          <MiniCalendar events={calendarEvents} />
          <ScheduleCard tasks={scheduleTasks} />
          <PeerRecognitionCard recognitions={recognitions} />
        </div>
      }
    >
      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {kpiData.map((kpi, index) => (
          <KPICard key={index} {...kpi} />
        ))}
      </div>
      {/* Charts and Current Orders */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Daily Orders Chart */}
        <div className="p-0">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                Today's Orders
              </h3>
              <p className="text-sm text-gray-600">Hourly order distribution</p>
            </div>
            <Badge variant="outline">Hourly</Badge>
          </div>
          <SalesChart data={dailyOrders} type="bar" />
        </div>
        {/* Current Orders */}
        <div className="p-0">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                Current Orders
              </h3>
              <p className="text-sm text-gray-600">Active kitchen orders</p>
            </div>
            <Badge variant="outline">{currentOrders.length} active</Badge>
          </div>
          <div className="space-y-4">
            {currentOrders.map((order, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-gray-900">
                      {order.id}
                    </span>
                    <span className="text-sm text-gray-500">
                      • {order.customer}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">
                    {order.items.join(", ")}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">{order.time}</p>
                  <Badge
                    variant={getOrderStatusColor(order.status)}
                    className="mt-1"
                  >
                    {order.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Tasks, Shift Swaps, and Notifications */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-8">
        {/* Shift Swaps */}
        <ShiftSwapCard swaps={shiftSwaps} />
        {/* Notifications */}
        <div className="p-6 bg-gradient-to-br from-card/80 to-card/60 rounded-2xl border border-border/30 shadow-md">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                Notifications
              </h3>
              <p className="text-sm text-gray-600">Recent updates</p>
            </div>
            <Badge variant="outline">{notifications.length} new</Badge>
          </div>
          <div className="space-y-4">
            {notifications.map((notification, index) => (
              <div
                key={index}
                className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                {getNotificationIcon(notification.type)}
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">
                    {notification.message}
                  </p>
                  <p className="text-xs text-gray-500">{notification.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardShell>
  );
};
export default StaffDashboard;
