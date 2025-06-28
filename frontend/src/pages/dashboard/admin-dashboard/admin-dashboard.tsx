import {
  AlertTriangle,
  BarChart3,
  Clock,
  DollarSign,
  ShoppingCart,
  Star,
  TrendingUp,
  Users,
} from "lucide-react";
import React from "react";
import DashboardShell from "../../../components/dashboard/DashboardShell";
import { KPICard } from "../../../components/dashboard/KPICard";
import { SalesChart } from "../../../components/dashboard/SalesChart";
import { Badge } from "../../../components/ui/Badge";
import { Card } from "../../../components/ui/card";
import { Progress } from "../../../components/ui/Progress";

const AdminDashboard: React.FC = () => {
  // Dummy data for admin dashboard
  const kpiData = [
    {
      title: "Total Revenue",
      value: 45678,
      change: 12.5,
      trend: "up" as const,
      icon: DollarSign,
    },
    {
      title: "Total Orders",
      value: 1234,
      change: 8.2,
      trend: "up" as const,
      icon: ShoppingCart,
    },
    {
      title: "Active Staff",
      value: 24,
      change: -2.1,
      trend: "down" as const,
      icon: Users,
    },
    {
      title: "Customer Rating",
      value: 4.8,
      change: 0.3,
      trend: "up" as const,
      icon: Star,
    },
  ];

  const salesData = [
    { date: "Mon", sales: 12000, profit: 8000, orders: 45 },
    { date: "Tue", sales: 15000, profit: 10000, orders: 52 },
    { date: "Wed", sales: 18000, profit: 12000, orders: 61 },
    { date: "Thu", sales: 14000, profit: 9000, orders: 48 },
    { date: "Fri", sales: 22000, profit: 15000, orders: 78 },
    { date: "Sat", sales: 25000, profit: 17000, orders: 89 },
    { date: "Sun", sales: 20000, profit: 13000, orders: 72 },
  ];

  const recentOrders = [
    {
      id: "#1234",
      customer: "John Doe",
      amount: 45.99,
      status: "completed",
      time: "2 min ago",
    },
    {
      id: "#1235",
      customer: "Jane Smith",
      amount: 32.5,
      status: "pending",
      time: "5 min ago",
    },
    {
      id: "#1236",
      customer: "Mike Johnson",
      amount: 67.25,
      status: "completed",
      time: "8 min ago",
    },
    {
      id: "#1237",
      customer: "Sarah Wilson",
      amount: 28.75,
      status: "cooking",
      time: "12 min ago",
    },
    {
      id: "#1238",
      customer: "Tom Brown",
      amount: 89.99,
      status: "pending",
      time: "15 min ago",
    },
  ];

  const lowStockItems = [
    { name: "Chicken Breast", current: 5, min: 10, unit: "kg" },
    { name: "Rice", current: 8, min: 15, unit: "kg" },
    { name: "Tomatoes", current: 3, min: 8, unit: "kg" },
    { name: "Onions", current: 6, min: 12, unit: "kg" },
  ];

  const getStatusColor = (
    status: string
  ): "success" | "destructive" | "info" | "warning" | "default" => {
    switch (status) {
      case "completed":
        return "success";
      case "pending":
        return "warning";
      case "cooking":
        return "info";
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
            <h1 className="text-3xl font-bold text-gray-900">
              Admin Dashboard
            </h1>
            <p className="text-gray-600">
              Welcome back! Here's what's happening today.
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Clock className="h-5 w-5 text-gray-500" />
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
          {/* Sales Chart */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Weekly Sales</h3>
              <Badge variant="outline">Last 7 days</Badge>
            </div>
            <SalesChart data={salesData} type="bar" />
          </Card>

          {/* Revenue Chart */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Revenue Trend</h3>
              <Badge variant="outline">Monthly</Badge>
            </div>
            <SalesChart data={salesData} type="line" />
          </Card>
        </div>

        {/* Recent Orders and Alerts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Orders */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Recent Orders</h3>
              <Badge variant="outline">{recentOrders.length} orders</Badge>
            </div>
            <div className="space-y-3">
              {recentOrders.map((order) => (
                <div
                  key={order.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div>
                    <p className="font-medium">{order.customer}</p>
                    <p className="text-sm text-gray-500">
                      {order.id} • {order.time}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">${order.amount}</p>
                    <Badge variant={getStatusColor(order.status)}>
                      {order.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Low Stock Alerts */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Low Stock Alerts</h3>
              <AlertTriangle className="h-5 w-5 text-orange-500" />
            </div>
            <div className="space-y-4">
              {lowStockItems.map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{item.name}</span>
                    <span className="text-sm text-gray-500">
                      {item.current}/{item.min} {item.unit}
                    </span>
                  </div>
                  <Progress
                    value={(item.current / item.min) * 100}
                    className="h-2"
                  />
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6 text-center">
            <BarChart3 className="h-8 w-8 mx-auto mb-2 text-blue-500" />
            <h4 className="text-lg font-semibold">Average Order Value</h4>
            <p className="text-2xl font-bold text-blue-600">$67.45</p>
            <p className="text-sm text-gray-500">+5.2% from last week</p>
          </Card>

          <Card className="p-6 text-center">
            <Users className="h-8 w-8 mx-auto mb-2 text-green-500" />
            <h4 className="text-lg font-semibold">Staff Efficiency</h4>
            <p className="text-2xl font-bold text-green-600">94%</p>
            <p className="text-sm text-gray-500">+2.1% from last week</p>
          </Card>

          <Card className="p-6 text-center">
            <TrendingUp className="h-8 w-8 mx-auto mb-2 text-purple-500" />
            <h4 className="text-lg font-semibold">Customer Satisfaction</h4>
            <p className="text-2xl font-bold text-purple-600">4.8/5</p>
            <p className="text-sm text-gray-500">+0.2 from last week</p>
          </Card>
        </div>
      </div>
    </DashboardShell>
  );
};

export default AdminDashboard;
