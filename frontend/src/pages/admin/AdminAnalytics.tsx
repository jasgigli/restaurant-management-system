import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";
import { BarChart2, TrendingUp, Users } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Grid } from "../../components/ui/grid";

const kpis = [
  {
    title: "Revenue Growth",
    value: "+12.5%",
    icon: TrendingUp,
    color: "text-green-600",
  },
  {
    title: "Active Users",
    value: "1,234",
    icon: Users,
    color: "text-blue-600",
  },
  {
    title: "Engagement Rate",
    value: "87%",
    icon: BarChart2,
    color: "text-purple-600",
  },
];

const AdminAnalytics = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      <div>
        <h1 className="text-3xl font-bold text-foreground tracking-tight">
          Analytics Dashboard
        </h1>
        <p className="text-muted-foreground mt-2">
          Comprehensive business insights and performance metrics
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
          <CardTitle className="text-foreground">Analytics Chart</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-48 flex items-center justify-center text-muted-foreground">
            <div className="flex flex-col space-y-3">
              <Skeleton className="h-[125px] w-[250px] rounded-xl" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default AdminAnalytics;
