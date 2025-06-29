import { motion } from "framer-motion";
import {
  AlertTriangle,
  BarChart2,
  Bell,
  CheckCircle,
  Clock,
  DollarSign,
  Download,
  FileText,
  Loader2,
  Plus,
  Settings,
  ShoppingCart,
  Star,
  UserCircle,
  Users,
  XCircle,
} from "lucide-react";
import React from "react";
import AnnouncementCard from "../../components/dashboard/AnnouncementCard";
import DashboardShell from "../../components/dashboard/DashboardShell";
import ExpenseBreakdownCard from "../../components/dashboard/ExpenseBreakdownCard";
import { KPICard } from "../../components/dashboard/KPICard";
import MiniCalendar from "../../components/dashboard/MiniCalendar";
import QuickLinks from "../../components/dashboard/QuickLinks";
import { SalesChart } from "../../components/dashboard/SalesChart";
import StaffPerformanceCard from "../../components/dashboard/StaffPerformanceCard";
import TopSellingItemsCard from "../../components/dashboard/TopSellingItemsCard";
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

const AdminDashboard: React.FC = () => {
  // Dummy data for widgets
  const kpiData = [
    {
      title: "Total Revenue",
      value: 45678,
      change: 12.5,
      trend: "up" as const,
      icon: DollarSign,
      color: "text-green-600",
      bgColor: "bg-green-500/10",
      borderColor: "border-green-500/20",
    },
    {
      title: "Total Orders",
      value: 1234,
      change: 8.2,
      trend: "up" as const,
      icon: ShoppingCart,
      color: "text-blue-600",
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-500/20",
    },
    {
      title: "Active Staff",
      value: 24,
      change: -2.1,
      trend: "down" as const,
      icon: Users,
      color: "text-orange-600",
      bgColor: "bg-orange-500/10",
      borderColor: "border-orange-500/20",
    },
    {
      title: "Customer Rating",
      value: 4.8,
      change: 0.3,
      trend: "up" as const,
      icon: Star,
      color: "text-purple-600",
      bgColor: "bg-purple-500/10",
      borderColor: "border-purple-500/20",
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
      items: 3,
    },
    {
      id: "#1235",
      customer: "Jane Smith",
      amount: 32.5,
      status: "pending",
      time: "5 min ago",
      items: 2,
    },
    {
      id: "#1236",
      customer: "Mike Johnson",
      amount: 67.25,
      status: "completed",
      time: "8 min ago",
      items: 4,
    },
    {
      id: "#1237",
      customer: "Sarah Wilson",
      amount: 28.75,
      status: "cooking",
      time: "12 min ago",
      items: 2,
    },
    {
      id: "#1238",
      customer: "Tom Brown",
      amount: 89.99,
      status: "pending",
      time: "15 min ago",
      items: 5,
    },
  ];

  const lowStockItems = [
    {
      name: "Chicken Breast",
      current: 5,
      min: 10,
      unit: "kg",
      priority: "high",
    },
    { name: "Rice", current: 8, min: 15, unit: "kg", priority: "medium" },
    { name: "Tomatoes", current: 3, min: 8, unit: "kg", priority: "high" },
    { name: "Onions", current: 6, min: 12, unit: "kg", priority: "medium" },
  ];

  // New widget data
  const topSellingItems = [
    { name: "Chicken Burger", count: 120, revenue: 900 },
    { name: "Veg Pizza", count: 95, revenue: 760 },
    { name: "Pasta Alfredo", count: 80, revenue: 640 },
    { name: "Grilled Sandwich", count: 70, revenue: 490 },
  ];
  const expenseData = [
    { category: "Ingredients", value: 3500, color: "#34d399" },
    { category: "Salaries", value: 2200, color: "#60a5fa" },
    { category: "Utilities", value: 900, color: "#fbbf24" },
    { category: "Maintenance", value: 400, color: "#f472b6" },
  ];
  const staffPerformance = [
    { name: "Alice Smith", role: "Chef", score: 98 },
    { name: "Bob Lee", role: "Waiter", score: 95 },
    { name: "Cathy Brown", role: "Manager", score: 93 },
  ];
  const calendarEvents = [
    { date: new Date().toISOString(), label: "Inventory Check" },
    {
      date: new Date(Date.now() + 86400000).toISOString(),
      label: "Staff Meeting",
    },
    {
      date: new Date(Date.now() + 2 * 86400000).toISOString(),
      label: "Menu Review",
    },
  ];

  // Quick links for admin
  const quickLinks = [
    { icon: BarChart2, label: "Reports", href: "/admin/reports" },
    { icon: FileText, label: "Inventory", href: "/admin/inventory" },
    { icon: Users, label: "Staff", href: "/admin/employees" },
    { icon: Settings, label: "Settings", href: "/admin/settings" },
  ];

  // Notifications bell (dummy count)
  const NotificationsBell = () => (
    <div className="relative">
      <Bell className="w-6 h-6 text-primary" />
      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1">
        3
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
    title: "System Update",
    message:
      "A new version of the dashboard is now live! Enjoy new features and improved performance.",
    ctaLabel: "Learn More",
    ctaHref: "/admin/updates",
  };

  const dashboardActions = (
    <Stack direction="horizontal" spacing="md">
      <Button
        variant="outline"
        size="sm"
        className="bg-gradient-to-r from-background/50 to-background/30 border-border/50 hover:border-primary/50 transition-all duration-200"
      >
        <Download className="h-4 w-4 mr-2" />
        Export
      </Button>
      <Button
        size="sm"
        className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 transition-all duration-200 shadow-lg"
      >
        <Plus className="h-4 w-4 mr-2" />
        New Order
      </Button>
    </Stack>
  );

  return (
    <DashboardShell
      title="Admin Dashboard"
      subtitle="Welcome to your restaurant management dashboard"
      actions={dashboardActions}
      avatar={<Avatar />}
      notifications={<NotificationsBell />}
      quickLinks={<QuickLinks links={quickLinks} />}
      widgetsRow={
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-6 gap-x-6 mb-6">
          <AnnouncementCard {...announcement} />
          <MiniCalendar events={calendarEvents} />
          <TopSellingItemsCard items={topSellingItems} />
          <ExpenseBreakdownCard data={expenseData} />
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

      {/* Enhanced Charts and Analytics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-6">
        {/* Sales Chart */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="bg-gradient-to-br from-card/80 to-card/60 rounded-2xl backdrop-blur-sm border-border/50 shadow-xl hover:shadow-2xl transition-all duration-300">
            <CardHeader className="bg-gradient-to-r from-primary/5 to-accent/5 border-b border-border/30">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    Weekly Sales
                  </CardTitle>
                  <CardDescription className="text-muted-foreground">
                    Revenue and profit trends
                  </CardDescription>
                </div>
                <Badge
                  variant="outline"
                  className="bg-background/50 border-primary/30"
                >
                  Last 7 days
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="p-4 sm:p-6">
              <SalesChart data={salesData} type="bar" />
            </CardContent>
          </Card>
        </motion.div>

        {/* Staff Performance */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <StaffPerformanceCard staff={staffPerformance} />
        </motion.div>
      </div>

      {/* Enhanced Recent Orders and Alerts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-6">
        {/* Recent Orders */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card className="bg-gradient-to-br from-card/80 to-card/60 rounded-2xl backdrop-blur-sm border-border/50 shadow-xl hover:shadow-2xl transition-all duration-300">
            <CardHeader className="bg-gradient-to-r from-green-500/5 to-emerald-500/5 border-b border-border/30">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl font-bold text-green-600 dark:text-green-400">
                    Recent Orders
                  </CardTitle>
                  <CardDescription className="text-muted-foreground">
                    Latest customer orders
                  </CardDescription>
                </div>
                <Badge
                  variant="outline"
                  className="bg-background/50 border-green-500/30"
                >
                  {recentOrders.length} orders
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="p-4 sm:p-6">
              <Stack spacing="md">
                {recentOrders.map((order, index) => (
                  <motion.div
                    key={order.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 + index * 0.1 }}
                    className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-gradient-to-r from-muted/30 to-muted/20 rounded-xl hover:from-muted/40 hover:to-muted/30 transition-all duration-200 border border-border/30 hover:border-border/50 group"
                  >
                    <div className="flex-1">
                      <p className="font-semibold text-foreground group-hover:text-primary transition-colors duration-200">
                        {order.customer}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {order.id} • ${order.amount} • {order.items} items
                      </p>
                    </div>
                    <div className="flex items-center gap-3 mt-2 sm:mt-0">
                      <div className="flex items-center gap-1">
                        {getStatusIcon(order.status)}
                        <Badge
                          variant={getStatusColor(order.status)}
                          className="text-xs"
                        >
                          {order.status}
                        </Badge>
                      </div>
                      <span className="text-xs text-muted-foreground bg-background/50 px-2 py-1 rounded-full">
                        {order.time}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </Stack>
            </CardContent>
          </Card>
        </motion.div>

        {/* Low Stock Alerts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <Card className="bg-gradient-to-br from-card/80 to-card/60 rounded-2xl backdrop-blur-sm border-border/50 shadow-xl hover:shadow-2xl transition-all duration-300">
            <CardHeader className="bg-gradient-to-r from-red-500/5 to-orange-500/5 border-b border-border/30">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl font-bold text-red-600 dark:text-red-400 flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5" />
                    Low Stock Alerts
                  </CardTitle>
                  <CardDescription className="text-muted-foreground">
                    Items that need restocking
                  </CardDescription>
                </div>
                <Badge
                  variant="destructive"
                  className="bg-red-500/20 border-red-500/30"
                >
                  {lowStockItems.length} items
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="p-4 sm:p-6">
              <Stack spacing="md">
                {lowStockItems.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 + index * 0.1 }}
                    className="space-y-3 p-4 bg-gradient-to-r from-red-500/5 to-orange-500/5 rounded-xl border border-red-500/20 hover:border-red-500/30 transition-all duration-200"
                  >
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
                      <span className="text-sm font-semibold text-foreground">
                        {item.name}
                      </span>
                      <div className="flex items-center gap-2 mt-2 sm:mt-0">
                        <span
                          className={`text-xs px-2 py-1 rounded-full border ${getPriorityColor(
                            item.priority
                          )}`}
                        >
                          {item.priority}
                        </span>
                        <span className="text-sm text-muted-foreground font-medium">
                          {item.current}/{item.min} {item.unit}
                        </span>
                      </div>
                    </div>
                    <Progress
                      value={(item.current / item.min) * 100}
                      className="h-2 bg-red-500/20"
                    />
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

// Helper functions (copied from previous code)
function getStatusColor(
  status: string
): "success" | "destructive" | "info" | "warning" | "default" {
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
}
function getStatusIcon(status: string) {
  switch (status) {
    case "completed":
      return <CheckCircle className="w-4 h-4 text-green-500" />;
    case "pending":
      return <Clock className="w-4 h-4 text-yellow-500" />;
    case "cooking":
      return <Loader2 className="w-4 h-4 text-blue-500 animate-spin" />;
    default:
      return <XCircle className="w-4 h-4 text-red-500" />;
  }
}
function getPriorityColor(priority: string) {
  switch (priority) {
    case "high":
      return "text-red-600 bg-red-500/10 border-red-500/20";
    case "medium":
      return "text-orange-600 bg-orange-500/10 border-orange-500/20";
    default:
      return "text-yellow-600 bg-yellow-500/10 border-yellow-500/20";
  }
}

export default AdminDashboard;
