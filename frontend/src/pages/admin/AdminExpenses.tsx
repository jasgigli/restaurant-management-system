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

const expenses = [
  {
    id: 1,
    name: "Groceries",
    amount: 250.0,
    status: "Paid",
    date: "2024-06-01",
  },
  {
    id: 2,
    name: "Utilities",
    amount: 120.5,
    status: "Pending",
    date: "2024-06-02",
  },
  { id: 3, name: "Repairs", amount: 75.25, status: "Paid", date: "2024-06-03" },
  {
    id: 4,
    name: "Supplies",
    amount: 60.0,
    status: "Pending",
    date: "2024-06-04",
  },
];

const statusVariant = (status: string) => {
  switch (status) {
    case "Paid":
      return "success";
    case "Pending":
      return "warning";
    default:
      return "default";
  }
};

const AdminExpenses = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      <div>
        <h1 className="text-3xl font-bold text-foreground tracking-tight">
          Admin Expenses
        </h1>
        <p className="text-muted-foreground mt-2">
          Track and manage expenses here.
        </p>
      </div>
      <Card className="bg-gradient-to-br from-card/60 via-card/40 to-card/60 border-border/40 shadow-lg">
        <CardHeader>
          <CardTitle className="text-foreground">Expenses List</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {expenses.map((expense) => (
                <TableRow key={expense.id}>
                  <TableCell>{expense.name}</TableCell>
                  <TableCell>${expense.amount.toFixed(2)}</TableCell>
                  <TableCell>
                    <Badge variant={statusVariant(expense.status)}>
                      {expense.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {expense.date}
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

export default AdminExpenses;
