import { motion } from "framer-motion";
import { BarChart2, FileText, PieChart } from "lucide-react";
import { Badge } from "../../components/ui/Badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Grid } from "../../components/ui/grid";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";

const kpis = [
  { title: "Total Reports", value: 24, icon: FileText, color: "text-blue-600" },
  {
    title: "Sales Analytics",
    value: "$12,340",
    icon: BarChart2,
    color: "text-green-600",
  },
  {
    title: "Customer Insights",
    value: "98%",
    icon: PieChart,
    color: "text-purple-600",
  },
];

const recentReports = [
  {
    id: 1,
    name: "Monthly Sales",
    type: "Sales",
    status: "Completed",
    date: "2024-06-01",
  },
  {
    id: 2,
    name: "Inventory Status",
    type: "Inventory",
    status: "Pending",
    date: "2024-06-02",
  },
  {
    id: 3,
    name: "Employee Attendance",
    type: "HR",
    status: "Completed",
    date: "2024-06-03",
  },
];

const statusVariant = (status: string) => {
  switch (status) {
    case "Completed":
      return "success";
    case "Pending":
      return "warning";
    default:
      return "default";
  }
};

const AdminReports = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      <div>
        <h1 className="text-3xl font-bold text-foreground tracking-tight">
          Reports & Analytics
        </h1>
        <p className="text-muted-foreground mt-2">
          Generate and view comprehensive business reports
        </p>
      </div>
      <Grid cols={3} gap="md">
        {kpis.map((item) => (
          <Card
            key={item.title}
            className="flex flex-col items-center justify-center py-6 bg-gradient-to-br from-card/60 via-card/40 to-card/60 border-border/40 shadow-lg"
          >
            <div className={`mb-2 ${item.color}`}>
              <item.icon className="w-8 h-8" />
            </div>
            <div className="text-lg font-semibold">{item.value}</div>
            <div className="text-muted-foreground text-sm">{item.title}</div>
          </Card>
        ))}
      </Grid>
      <Card className="bg-gradient-to-br from-card/60 via-card/40 to-card/60 border-border/40 shadow-lg">
        <CardHeader>
          <CardTitle className="text-foreground">Recent Reports</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentReports.map((report) => (
                <TableRow key={report.id}>
                  <TableCell>{report.name}</TableCell>
                  <TableCell>{report.type}</TableCell>
                  <TableCell>
                    <Badge variant={statusVariant(report.status)}>
                      {report.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {report.date}
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

export default AdminReports;
