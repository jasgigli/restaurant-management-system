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

const pricingData = [
  {
    id: 1,
    item: "Grilled Chicken",
    current: 12.99,
    suggested: 13.49,
    status: "Increase",
  },
  {
    id: 2,
    item: "Veggie Burger",
    current: 9.5,
    suggested: 9.5,
    status: "Stable",
  },
  {
    id: 3,
    item: "Pasta Alfredo",
    current: 11.0,
    suggested: 10.5,
    status: "Decrease",
  },
  {
    id: 4,
    item: "Caesar Salad",
    current: 7.75,
    suggested: 8.25,
    status: "Increase",
  },
];

const statusVariant = (status: string) => {
  switch (status) {
    case "Increase":
      return "warning";
    case "Decrease":
      return "destructive";
    case "Stable":
      return "success";
    default:
      return "default";
  }
};

const AdminPricing = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      <div>
        <h1 className="text-3xl font-bold text-foreground tracking-tight">
          Pricing Strategy
        </h1>
        <p className="text-muted-foreground mt-2">
          Menu pricing & strategies for optimal revenue
        </p>
      </div>
      <Card className="mb-6 bg-gradient-to-br from-card/60 via-card/40 to-card/60 border-border/40 shadow-lg">
        <CardHeader>
          <CardTitle className="text-foreground">
            Pricing Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Menu Item</TableHead>
                <TableHead>Current Price</TableHead>
                <TableHead>Suggested Price</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pricingData.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.item}</TableCell>
                  <TableCell>${row.current.toFixed(2)}</TableCell>
                  <TableCell>${row.suggested.toFixed(2)}</TableCell>
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

export default AdminPricing;
