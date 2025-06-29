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

const menuItems = [
  { id: 1, name: "Grilled Chicken", price: 12.99, status: "Available" },
  { id: 2, name: "Veggie Burger", price: 9.5, status: "Available" },
  { id: 3, name: "Pasta Alfredo", price: 11.0, status: "Out of Stock" },
  { id: 4, name: "Caesar Salad", price: 7.75, status: "Available" },
];

const statusVariant = (status: string) => {
  switch (status) {
    case "Available":
      return "success";
    case "Out of Stock":
      return "destructive";
    default:
      return "default";
  }
};

const AdminMenu = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      <div>
        <h1 className="text-3xl font-bold text-foreground tracking-tight">
          Admin Menu Management
        </h1>
        <p className="text-muted-foreground mt-2">
          Manage restaurant menu items here.
        </p>
      </div>
      <Card className="bg-gradient-to-br from-card/60 via-card/40 to-card/60 border-border/40 shadow-lg">
        <CardHeader>
          <CardTitle className="text-foreground">Menu Items</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {menuItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>${item.price.toFixed(2)}</TableCell>
                  <TableCell>
                    <Badge variant={statusVariant(item.status)}>
                      {item.status}
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

export default AdminMenu;
