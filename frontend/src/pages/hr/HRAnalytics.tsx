import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";

const HRAnalytics = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-8"
    >
      <div>
        <h1 className="text-3xl font-bold text-foreground tracking-tight">
          HR Analytics
        </h1>
        <p className="text-muted-foreground mt-2">
          Employee performance and workforce analytics
        </p>
      </div>

      <Card className="bg-gradient-to-br from-card/60 via-card/40 to-card/60 backdrop-blur-xl border-border/40 shadow-lg">
        <CardHeader>
          <CardTitle className="text-foreground">
            HR Analytics Dashboard
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            This page will contain comprehensive HR analytics and employee
            performance metrics.
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default HRAnalytics;
