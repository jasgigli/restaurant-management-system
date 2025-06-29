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

const purchases = [
  {
    id: "P-1001",
    item: "Chicken Breast",
    amount: 120.5,
    status: "Received",
    date: "2024-06-01",
  },
  {
    id: "P-1002",
    item: "Rice",
    amount: 80.0,
    status: "Pending",
    date: "2024-06-02",
  },
  {
    id: "P-1003",
    item: "Tomatoes",
    amount: 45.75,
    status: "Received",
    date: "2024-06-03",
  },
  {
    id: "P-1004",
    item: "Oil",
    amount: 60.0,
    status: "Cancelled",
    date: "2024-06-04",
  },
];

const statusVariant = (status: string) => {
  switch (status) {
    case "Received":
      return "success";
    case "Pending":
      return "warning";
    case "Cancelled":
      return "destructive";
    default:
      return "default";
  }
};

const AdminPurchases = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      <div>
        <h1 className="text-3xl font-bold text-foreground tracking-tight">
          Admin Purchases
        </h1>
        <p className="text-muted-foreground mt-2">
          Manage and track purchases here.
        </p>
      </div>
      <Card className="bg-gradient-to-br from-card/60 via-card/40 to-card/60 border-border/40 shadow-lg">
        <CardHeader>
          <CardTitle className="text-foreground">Recent Purchases</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Purchase ID</TableHead>
                <TableHead>Item</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {purchases.map((purchase) => (
                <TableRow key={purchase.id}>
                  <TableCell>{purchase.id}</TableCell>
                  <TableCell>{purchase.item}</TableCell>
                  <TableCell>${purchase.amount.toFixed(2)}</TableCell>
                  <TableCell>
                    <Badge variant={statusVariant(purchase.status)}>
                      {purchase.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {purchase.date}
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

export default AdminPurchases;
