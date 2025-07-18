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

const kitchenTasks = [
  { id: 1, task: "Prep Vegetables", status: "In Progress" },
  { id: 2, task: "Grill Chicken", status: "Completed" },
  { id: 3, task: "Bake Bread", status: "Pending" },
  { id: 4, task: "Clean Surfaces", status: "Completed" },
];

const statusVariant = (status: string) => {
  switch (status) {
    case "Completed":
      return "success";
    case "Pending":
      return "warning";
    case "In Progress":
      return "info";
    default:
      return "default";
  }
};

const AdminKitchen = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      <div>
        <h1 className="text-3xl font-bold text-foreground tracking-tight">
          Admin Kitchen Operations
        </h1>
        <p className="text-muted-foreground mt-2">
          Oversee kitchen operations here.
        </p>
      </div>
      <Card className="bg-gradient-to-br from-card/60 via-card/40 to-card/60 border-border/40 shadow-lg">
        <CardHeader>
          <CardTitle className="text-foreground">Kitchen Tasks</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Task</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {kitchenTasks.map((task) => (
                <TableRow key={task.id}>
                  <TableCell>{task.task}</TableCell>
                  <TableCell>
                    <Badge variant={statusVariant(task.status)}>
                      {task.status}
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

export default AdminKitchen;
