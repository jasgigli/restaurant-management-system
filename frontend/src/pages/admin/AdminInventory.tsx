import { motion } from "framer-motion";
import { Badge } from "../../components/ui/Badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Progress } from "../../components/ui/Progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";

const inventory = [
  { id: 1, name: "Chicken Breast", stock: 5, min: 10, unit: "kg" },
  { id: 2, name: "Rice", stock: 8, min: 15, unit: "kg" },
  { id: 3, name: "Tomatoes", stock: 3, min: 8, unit: "kg" },
  { id: 4, name: "Onions", stock: 6, min: 12, unit: "kg" },
  { id: 5, name: "Oil", stock: 20, min: 10, unit: "L" },
];

const AdminInventory = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      <div>
        <h1 className="text-3xl font-bold text-foreground tracking-tight">
          Inventory Control
        </h1>
        <p className="text-muted-foreground mt-2">
          Manage stock levels and inventory tracking
        </p>
      </div>

      <Card className="bg-gradient-to-br from-card/60 via-card/40 to-card/60 backdrop-blur-xl border-border/40 shadow-lg">
        <CardHeader>
          <CardTitle className="text-foreground">Inventory List</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Item</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Min Required</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {inventory.map((item) => {
                const isLow = item.stock < item.min;
                return (
                  <TableRow key={item.id}>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span>
                          {item.stock} {item.unit}
                        </span>
                        <Progress
                          value={Math.min((item.stock / item.min) * 100, 100)}
                          max={100}
                          color={isLow ? "bg-red-500" : "bg-primary"}
                          className="w-24 h-2"
                        />
                      </div>
                    </TableCell>
                    <TableCell>
                      {item.min} {item.unit}
                    </TableCell>
                    <TableCell>
                      {isLow ? (
                        <Badge variant="destructive">Low Stock</Badge>
                      ) : (
                        <Badge variant="success">OK</Badge>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default AdminInventory;
