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

const positions = [
  { id: 1, title: "Waiter", applicants: 5, status: "Open" },
  { id: 2, title: "Chef", applicants: 2, status: "Interviewing" },
  { id: 3, title: "Cashier", applicants: 3, status: "Closed" },
];

const statusVariant = (status: string) => {
  switch (status) {
    case "Open":
      return "success";
    case "Interviewing":
      return "info";
    case "Closed":
      return "destructive";
    default:
      return "default";
  }
};

const AdminRecruitment = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      <div>
        <h1 className="text-3xl font-bold text-foreground tracking-tight">
          Recruitment
        </h1>
        <p className="text-muted-foreground mt-2">
          Hiring & onboarding for new staff
        </p>
      </div>
      <Card className="mb-6 bg-gradient-to-br from-card/60 via-card/40 to-card/60 border-border/40 shadow-lg">
        <CardHeader>
          <CardTitle className="text-foreground">Open Positions</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Position</TableHead>
                <TableHead>Applicants</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {positions.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.title}</TableCell>
                  <TableCell>{row.applicants}</TableCell>
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

export default AdminRecruitment;
