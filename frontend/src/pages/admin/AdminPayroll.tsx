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

const payroll = [
  { id: 1, name: "John Doe", role: "Manager", salary: 3500, status: "Paid" },
  { id: 2, name: "Jane Smith", role: "Chef", salary: 2500, status: "Pending" },
  { id: 3, name: "Mike Johnson", role: "Waiter", salary: 1800, status: "Paid" },
  {
    id: 4,
    name: "Sarah Lee",
    role: "Cashier",
    salary: 2000,
    status: "Pending",
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

const AdminPayroll = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      <div>
        <h1 className="text-3xl font-bold text-foreground tracking-tight">
          Admin Payroll
        </h1>
        <p className="text-muted-foreground mt-2">
          Manage payroll and salary disbursement here.
        </p>
      </div>
      <Card className="bg-gradient-to-br from-card/60 via-card/40 to-card/60 border-border/40 shadow-lg">
        <CardHeader>
          <CardTitle className="text-foreground">Payroll List</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Salary</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {payroll.map((emp) => (
                <TableRow key={emp.id}>
                  <TableCell>{emp.name}</TableCell>
                  <TableCell>{emp.role}</TableCell>
                  <TableCell>${emp.salary.toLocaleString()}</TableCell>
                  <TableCell>
                    <Badge variant={statusVariant(emp.status)}>
                      {emp.status}
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

export default AdminPayroll;
