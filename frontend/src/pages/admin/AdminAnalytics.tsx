import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";

const AdminAnalytics = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
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

      <Card className="bg-gradient-to-br from-card/60 via-card/40 to-card/60 backdrop-blur-xl border-border/40 shadow-lg">
        <CardHeader>
          <CardTitle className="text-foreground">
            Analytics Coming Soon
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            This page will contain comprehensive analytics and reporting
            features.
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default AdminAnalytics;
