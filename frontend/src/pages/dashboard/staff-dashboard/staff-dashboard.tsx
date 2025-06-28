import {
  AlertTriangle,
  Bell,
  Calendar,
  CheckCircle,
  Clock,
  Coffee,
  ShoppingCart,
  Star,
  TrendingUp,
  Users,
  Utensils,
} from "lucide-react";
import React from "react";
import DashboardShell from "../../../components/dashboard/DashboardShell";
import { KPICard } from "../../../components/dashboard/KPICard";
import { SalesChart } from "../../../components/dashboard/SalesChart";
import { Badge } from "../../../components/ui/Badge";
import { Card } from "../../../components/ui/card";

const StaffDashboard: React.FC = () => {
  // Dummy data for staff dashboard
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
    <DashboardShell>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Staff Dashboard
            </h1>
            <p className="text-gray-600">Your daily overview and tasks.</p>
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

        {/* Charts and Current Orders */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Daily Orders Chart */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Today's Orders</h3>
              <Badge variant="outline">Hourly</Badge>
            </div>
            <SalesChart data={dailyOrders} type="bar" />
          </Card>

          {/* Current Orders */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Current Orders</h3>
              <Badge variant="outline">{currentOrders.length} active</Badge>
            </div>
            <div className="space-y-3">
              {currentOrders.map((order, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div>
                    <p className="font-medium">{order.customer}</p>
                    <p className="text-sm text-gray-500">
                      {order.id} • {order.items.join(", ")}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">{order.time}</p>
                    <Badge variant={getOrderStatusColor(order.status)}>
                      {order.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Tasks and Notifications */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Today's Tasks */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Today's Tasks</h3>
              <Badge variant="outline">
                {todayTasks.filter((t) => t.completed).length}/
                {todayTasks.length}
              </Badge>
            </div>
            <div className="space-y-3">
              {todayTasks.map((task, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    {task.completed ? (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    ) : (
                      <div className="h-5 w-5 border-2 border-gray-300 rounded-full" />
                    )}
                    <div>
                      <p
                        className={`font-medium ${
                          task.completed ? "line-through text-gray-500" : ""
                        }`}
                      >
                        {task.task}
                      </p>
                      <p className="text-sm text-gray-500">{task.time}</p>
                    </div>
                  </div>
                  {task.completed && <Badge variant="success">Completed</Badge>}
                </div>
              ))}
            </div>
          </Card>

          {/* Notifications */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Notifications</h3>
              <Bell className="h-5 w-5 text-gray-500" />
            </div>
            <div className="space-y-3">
              {notifications.map((notification, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg"
                >
                  {getNotificationIcon(notification.type)}
                  <div className="flex-1">
                    <p className="font-medium">{notification.message}</p>
                    <p className="text-sm text-gray-500">{notification.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6 text-center">
            <Coffee className="h-8 w-8 mx-auto mb-2 text-blue-500" />
            <h4 className="text-lg font-semibold">Orders Handled</h4>
            <p className="text-2xl font-bold text-blue-600">156</p>
            <p className="text-sm text-gray-500">This week</p>
          </Card>

          <Card className="p-6 text-center">
            <Utensils className="h-8 w-8 mx-auto mb-2 text-green-500" />
            <h4 className="text-lg font-semibold">Efficiency Rate</h4>
            <p className="text-2xl font-bold text-green-600">94%</p>
            <p className="text-sm text-gray-500">+2.1% from last week</p>
          </Card>

          <Card className="p-6 text-center">
            <TrendingUp className="h-8 w-8 mx-auto mb-2 text-purple-500" />
            <h4 className="text-lg font-semibold">Performance Score</h4>
            <p className="text-2xl font-bold text-purple-600">8.7/10</p>
            <p className="text-sm text-gray-500">+0.3 from last week</p>
          </Card>
        </div>
      </div>
    </DashboardShell>
  );
};

export default StaffDashboard;
