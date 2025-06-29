import { motion } from "framer-motion";
import { Star, Target, TrendingUp } from "lucide-react";
import { Badge } from "../../components/ui/Badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Grid } from "../../components/ui/grid";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";

const kpis = [
  {
    title: "Order Fulfillment",
    value: "98%",
    icon: TrendingUp,
    color: "text-green-600",
  },
  {
    title: "Customer Satisfaction",
    value: "4.8/5",
    icon: Star,
    color: "text-yellow-500",
  },
  {
    title: "Avg. Service Time",
    value: "12 min",
    icon: Target,
    color: "text-blue-600",
  },
];

const performanceData = [
  { metric: "Table Turnover Rate", value: "1.5/hr", status: "Good" },
  { metric: "Order Accuracy", value: "99%", status: "Excellent" },
  { metric: "Complaint Rate", value: "0.8%", status: "Low" },
  { metric: "Repeat Customers", value: "65%", status: "High" },
];

const statusVariant = (status: string) => {
  switch (status) {
    case "Excellent":
      return "success";
    case "Good":
      return "info";
    case "High":
      return "success";
    case "Low":
      return "warning";
    default:
      return "default";
  }
};

const AdminPerformance = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      <div>
        <h1 className="text-3xl font-bold text-foreground tracking-tight">
          Performance Metrics
        </h1>
        <p className="text-muted-foreground mt-2">
          KPI tracking & monitoring for restaurant performance
        </p>
      </div>
      <Grid cols={3} gap="md">
        {kpis.map((item) => (
          <Card
            key={item.title}
            className="flex flex-col items-center justify-center py-6 bg-gradient-to-br from-card/60 via-card/40 to-card/60 border-border/40 shadow-lg"
          >
            <div className={`mb-2 ${item.color}`}>
              <item.icon className="w-8 h-8" />
            </div>
            <div className="text-lg font-semibold">{item.value}</div>
            <div className="text-muted-foreground text-sm">{item.title}</div>
          </Card>
        ))}
      </Grid>
      <Card className="bg-gradient-to-br from-card/60 via-card/40 to-card/60 border-border/40 shadow-lg">
        <CardHeader>
          <CardTitle className="text-foreground">
            Performance Indicators
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Metric</TableHead>
                <TableHead>Value</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {performanceData.map((row, i) => (
                <TableRow key={i}>
                  <TableCell>{row.metric}</TableCell>
                  <TableCell>{row.value}</TableCell>
                  <TableCell>
                    <Badge variant={statusVariant(row.status)}>
                      {row.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default AdminPerformance;
