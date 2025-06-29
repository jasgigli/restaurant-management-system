import { motion } from "framer-motion";
import { Badge } from "../../components/ui/Badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";

const orders = [
  {
    id: "O-2001",
    customer: "John Doe",
    amount: 45.99,
    status: "Completed",
    time: "2 min ago",
  },
  {
    id: "O-2002",
    customer: "Jane Smith",
    amount: 32.5,
    status: "Pending",
    time: "5 min ago",
  },
  {
    id: "O-2003",
    customer: "Mike Johnson",
    amount: 67.25,
    status: "Completed",
    time: "8 min ago",
  },
  {
    id: "O-2004",
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

const AdminOrders = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      <div>
        <h1 className="text-3xl font-bold text-foreground tracking-tight">
          Admin Order Management
        </h1>
        <p className="text-muted-foreground mt-2">
          Track and manage orders here.
        </p>
      </div>
      <Card className="bg-gradient-to-br from-card/60 via-card/40 to-card/60 border-border/40 shadow-lg">
        <CardHeader>
          <CardTitle className="text-foreground">Recent Orders</CardTitle>
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
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>{order.id}</TableCell>
                  <TableCell>{order.customer}</TableCell>
                  <TableCell>${order.amount.toFixed(2)}</TableCell>
                  <TableCell>
                    <Badge variant={statusVariant(order.status)}>
                      {order.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {order.time}
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

export default AdminOrders;
