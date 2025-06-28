import {
  AlertTriangle,
  DollarSign,
  Download,
  Plus,
  ShoppingCart,
  Star,
  Users,
} from "lucide-react";
import React from "react";
import DashboardShell from "../../../components/dashboard/DashboardShell";
import { KPICard } from "../../../components/dashboard/KPICard";
import { SalesChart } from "../../../components/dashboard/SalesChart";
import { Badge } from "../../../components/ui/Badge";
import { Button } from "../../../components/ui/button";
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

  const dashboardActions = (
    <div className="flex items-center gap-3">
      <Button variant="outline" className="px-3 py-2 text-sm">
        <Download className="h-4 w-4 mr-2" />
        Export
      </Button>
      <Button className="px-3 py-2 text-sm">
        <Plus className="h-4 w-4 mr-2" />
        New Order
      </Button>
    </div>
  );

  return (
    <DashboardShell
      title="Admin Dashboard"
      subtitle="Welcome back! Here's what's happening today."
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
        {/* Sales Chart */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                Weekly Sales
              </h3>
              <p className="text-sm text-gray-600">Revenue and profit trends</p>
            </div>
            <Badge variant="outline">Last 7 days</Badge>
          </div>
          <SalesChart data={salesData} type="bar" />
        </Card>

        {/* Revenue Chart */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                Revenue Trend
              </h3>
              <p className="text-sm text-gray-600">Monthly revenue analysis</p>
            </div>
            <Badge variant="outline">Monthly</Badge>
          </div>
          <SalesChart data={salesData} type="line" />
        </Card>
      </div>

      {/* Recent Orders and Alerts */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                Recent Orders
              </h3>
              <p className="text-sm text-gray-600">Latest customer orders</p>
            </div>
            <Badge variant="outline">{recentOrders.length} orders</Badge>
          </div>
          <div className="space-y-4">
            {recentOrders.map((order) => (
              <div
                key={order.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{order.customer}</p>
                  <p className="text-sm text-gray-500">
                    {order.id} • {order.time}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-900">${order.amount}</p>
                  <Badge
                    variant={getStatusColor(order.status)}
                    className="mt-1"
                  >
                    {order.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Low Stock Alerts */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                Low Stock Alerts
              </h3>
              <p className="text-sm text-gray-600">Items needing restocking</p>
            </div>
            <AlertTriangle className="h-5 w-5 text-orange-500" />
          </div>
          <div className="space-y-4">
            {lowStockItems.map((item, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-gray-900">{item.name}</span>
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
    </DashboardShell>
  );
};

export default AdminDashboard;
