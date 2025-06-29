import { motion } from "framer-motion";
import { DollarSign, ShoppingCart, Users } from "lucide-react";
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

const salesSummary = [
  {
    title: "Total Revenue",
    value: "$45,678",
    icon: DollarSign,
    color: "text-green-600",
  },
  {
    title: "Total Orders",
    value: "1,234",
    icon: ShoppingCart,
    color: "text-blue-600",
  },
  {
    title: "Active Customers",
    value: "312",
    icon: Users,
    color: "text-orange-600",
  },
];

const recentSales = [
  {
    id: "#1234",
    customer: "John Doe",
    amount: 45.99,
    status: "Completed",
    time: "2 min ago",
  },
  {
    id: "#1235",
    customer: "Jane Smith",
    amount: 32.5,
    status: "Pending",
    time: "5 min ago",
  },
  {
    id: "#1236",
    customer: "Mike Johnson",
    amount: 67.25,
    status: "Completed",
    time: "8 min ago",
  },
  {
    id: "#1237",
    customer: "Sarah Wilson",
    amount: 28.75,
    status: "Cooking",
    time: "12 min ago",
  },
];

const statusVariant = (status: string) => {
  switch (status) {
    case "Completed":
      return "success";
    case "Pending":
      return "warning";
    case "Cooking":
      return "info";
    default:
      return "default";
  }
};

const AdminSales = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      <div>
        <h1 className="text-3xl font-bold text-foreground tracking-tight">
          Sales Management
        </h1>
        <p className="text-muted-foreground mt-2">
          Track and manage sales performance and revenue
        </p>
      </div>
      <Grid cols={3} gap="md">
        {salesSummary.map((item) => (
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
          <CardTitle className="text-foreground">Recent Sales</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Time</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentSales.map((sale) => (
                <TableRow key={sale.id}>
                  <TableCell>{sale.id}</TableCell>
                  <TableCell>{sale.customer}</TableCell>
                  <TableCell>${sale.amount.toFixed(2)}</TableCell>
                  <TableCell>
                    <Badge variant={statusVariant(sale.status)}>
                      {sale.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {sale.time}
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

export default AdminSales;
