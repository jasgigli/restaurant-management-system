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

const attendance = [
  { id: 1, name: "John Doe", date: "2024-06-01", status: "Present" },
  { id: 2, name: "Jane Smith", date: "2024-06-01", status: "Absent" },
  { id: 3, name: "Mike Johnson", date: "2024-06-01", status: "Present" },
  { id: 4, name: "Sarah Lee", date: "2024-06-01", status: "Late" },
];

const statusVariant = (status: string) => {
  switch (status) {
    case "Present":
      return "success";
    case "Absent":
      return "destructive";
    case "Late":
      return "warning";
    default:
      return "default";
  }
};

const AdminAttendance = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      <div>
        <h1 className="text-3xl font-bold text-foreground tracking-tight">
          Admin Attendance
        </h1>
        <p className="text-muted-foreground mt-2">
          Track and manage staff attendance here.
        </p>
      </div>
      <Card className="bg-gradient-to-br from-card/60 via-card/40 to-card/60 border-border/40 shadow-lg">
        <CardHeader>
          <CardTitle className="text-foreground">Attendance List</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {attendance.map((record) => (
                <TableRow key={record.id}>
                  <TableCell>{record.name}</TableCell>
                  <TableCell>{record.date}</TableCell>
                  <TableCell>
                    <Badge variant={statusVariant(record.status)}>
                      {record.status}
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

export default AdminAttendance;
