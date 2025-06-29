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

const backups = [
  { id: 1, name: "Daily Backup", status: "Success", date: "2024-06-01 02:00" },
  { id: 2, name: "Manual Backup", status: "Failed", date: "2024-06-02 14:30" },
  { id: 3, name: "Weekly Backup", status: "Success", date: "2024-06-03 03:00" },
];

const statusVariant = (status: string) => {
  switch (status) {
    case "Success":
      return "success";
    case "Failed":
      return "destructive";
    default:
      return "default";
  }
};

const AdminBackup = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      <div>
        <h1 className="text-3xl font-bold text-foreground tracking-tight">
          Admin Backup & Restore
        </h1>
        <p className="text-muted-foreground mt-2">
          Manage system backups and restore data here.
        </p>
      </div>
      <Card className="bg-gradient-to-br from-card/60 via-card/40 to-card/60 border-border/40 shadow-lg">
        <CardHeader>
          <CardTitle className="text-foreground">Backup Logs</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {backups.map((backup) => (
                <TableRow key={backup.id}>
                  <TableCell>{backup.name}</TableCell>
                  <TableCell>
                    <Badge variant={statusVariant(backup.status)}>
                      {backup.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {backup.date}
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

export default AdminBackup;
