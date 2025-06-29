import { motion } from "framer-motion";
import {
  AlertTriangle,
  CheckCircle,
  Clock,
  DollarSign,
  Download,
  Loader2,
  Plus,
  ShoppingCart,
  Star,
  Users,
  XCircle,
} from "lucide-react";
import React from "react";
import DashboardShell from "../../components/dashboard/DashboardShell";
import { KPICard } from "../../components/dashboard/KPICard";
import { SalesChart } from "../../components/dashboard/SalesChart";
import { Badge } from "../../components/ui/Badge";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Grid } from "../../components/ui/grid";
import { Progress } from "../../components/ui/Progress";
import { Stack } from "../../components/ui/stack";

const AdminDashboard: React.FC = () => {
  // Enhanced dummy data for admin dashboard
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

  const getStatusIcon = (status: string) => {
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
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "text-red-600 bg-red-500/10 border-red-500/20";
      case "medium":
        return "text-orange-600 bg-orange-500/10 border-orange-500/20";
      default:
        return "text-yellow-600 bg-yellow-500/10 border-yellow-500/20";
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
      subtitle="Welcome back! Here's what's happening today."
      actions={dashboardActions}
    >
      {/* Enhanced KPI Cards */}
      <Grid cols={4} gap="lg">
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
      </Grid>

      {/* Enhanced Charts and Analytics */}
      <Grid cols={2} gap="lg">
        {/* Sales Chart */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="bg-gradient-to-br from-card/80 to-card/60 backdrop-blur-sm border-border/50 shadow-xl hover:shadow-2xl transition-all duration-300">
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
            <CardContent className="p-6">
              <SalesChart data={salesData} type="bar" />
            </CardContent>
          </Card>
        </motion.div>

        {/* Revenue Chart */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="bg-gradient-to-br from-card/80 to-card/60 backdrop-blur-sm border-border/50 shadow-xl hover:shadow-2xl transition-all duration-300">
            <CardHeader className="bg-gradient-to-r from-accent/5 to-primary/5 border-b border-border/30">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl font-bold bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
                    Revenue Trend
                  </CardTitle>
                  <CardDescription className="text-muted-foreground">
                    Monthly revenue analysis
                  </CardDescription>
                </div>
                <Badge
                  variant="outline"
                  className="bg-background/50 border-accent/30"
                >
                  Monthly
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <SalesChart data={salesData} type="line" />
            </CardContent>
          </Card>
        </motion.div>
      </Grid>

      {/* Enhanced Recent Orders and Alerts */}
      <Grid cols={2} gap="lg">
        {/* Recent Orders */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card className="bg-gradient-to-br from-card/80 to-card/60 backdrop-blur-sm border-border/50 shadow-xl hover:shadow-2xl transition-all duration-300">
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
            <CardContent className="p-6">
              <Stack spacing="md">
                {recentOrders.map((order, index) => (
                  <motion.div
                    key={order.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 + index * 0.1 }}
                    className="flex items-center justify-between p-4 bg-gradient-to-r from-muted/30 to-muted/20 rounded-xl hover:from-muted/40 hover:to-muted/30 transition-all duration-200 border border-border/30 hover:border-border/50 group"
                  >
                    <div className="flex-1">
                      <p className="font-semibold text-foreground group-hover:text-primary transition-colors duration-200">
                        {order.customer}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {order.id} • ${order.amount} • {order.items} items
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
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
          <Card className="bg-gradient-to-br from-card/80 to-card/60 backdrop-blur-sm border-border/50 shadow-xl hover:shadow-2xl transition-all duration-300">
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
            <CardContent className="p-6">
              <Stack spacing="md">
                {lowStockItems.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 + index * 0.1 }}
                    className="space-y-3 p-4 bg-gradient-to-r from-red-500/5 to-orange-500/5 rounded-xl border border-red-500/20 hover:border-red-500/30 transition-all duration-200"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-foreground">
                        {item.name}
                      </span>
                      <div className="flex items-center gap-2">
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
      </Grid>
    </DashboardShell>
  );
};

export default AdminDashboard;
