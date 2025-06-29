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

const taxRecords = [
  { id: 1, period: "May 2024", amount: 1200, status: "Filed" },
  { id: 2, period: "April 2024", amount: 1100, status: "Filed" },
  { id: 3, period: "March 2024", amount: 950, status: "Pending" },
];

const statusVariant = (status: string) => {
  switch (status) {
    case "Filed":
      return "success";
    case "Pending":
      return "warning";
    default:
      return "default";
  }
};

const AdminTaxes = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      <div>
        <h1 className="text-3xl font-bold text-foreground tracking-tight">
          Tax Management
        </h1>
        <p className="text-muted-foreground mt-2">
          Tax calculations & filing for your restaurant
        </p>
      </div>
      <Card className="mb-6 bg-gradient-to-br from-card/60 via-card/40 to-card/60 border-border/40 shadow-lg">
        <CardHeader>
          <CardTitle className="text-foreground">Tax Records</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Period</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {taxRecords.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.period}</TableCell>
                  <TableCell>${row.amount.toLocaleString()}</TableCell>
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

export default AdminTaxes;
