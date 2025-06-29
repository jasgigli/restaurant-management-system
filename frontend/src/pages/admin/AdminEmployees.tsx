import { motion } from "framer-motion";
import { Avatar } from "../../components/ui/Avatar";
import { Badge } from "../../components/ui/Badge";
import { Button } from "../../components/ui/button";
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

const employees = [
  {
    id: 1,
    name: "John Doe",
    role: "Manager",
    status: "Active",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    email: "john.doe@email.com",
  },
  {
    id: 2,
    name: "Jane Smith",
    role: "Chef",
    status: "On Leave",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    email: "jane.smith@email.com",
  },
  {
    id: 3,
    name: "Mike Johnson",
    role: "Waiter",
    status: "Active",
    avatar: "https://randomuser.me/api/portraits/men/65.jpg",
    email: "mike.j@email.com",
  },
  {
    id: 4,
    name: "Sarah Lee",
    role: "Cashier",
    status: "Inactive",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    email: "sarah.lee@email.com",
  },
];

const statusVariant = (status: string) => {
  switch (status) {
    case "Active":
      return "success";
    case "On Leave":
      return "info";
    case "Inactive":
      return "destructive";
    default:
      return "default";
  }
};

const AdminEmployees = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      <div>
        <h1 className="text-3xl font-bold text-foreground tracking-tight">
          Employee Management
        </h1>
        <p className="text-muted-foreground mt-2">
          Manage staff members and employee information
        </p>
      </div>

      <Card className="bg-gradient-to-br from-card/60 via-card/40 to-card/60 backdrop-blur-xl border-border/40 shadow-lg">
        <CardHeader>
          <CardTitle className="text-foreground">Employee List</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Email</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {employees.map((emp) => (
                <TableRow key={emp.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar
                        src={emp.avatar}
                        alt={emp.name}
                        size="sm"
                        fallback={emp.name[0]}
                      />
                      <span className="font-medium">{emp.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>{emp.role}</TableCell>
                  <TableCell>
                    <Badge variant={statusVariant(emp.status)}>
                      {emp.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {emp.email}
                  </TableCell>
                  <TableCell>
                    <Button size="sm" variant="outline">
                      View
                    </Button>
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

export default AdminEmployees;
