import { motion } from "framer-motion";
import { Monitor } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";

const AdminPOS = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      <div>
        <h1 className="text-3xl font-bold text-foreground tracking-tight flex items-center gap-2">
          <Monitor className="w-8 h-8 text-indigo-500" /> POS System
        </h1>
        <p className="text-muted-foreground mt-2">
          Point of sale management coming soon.
        </p>
      </div>
      <Card className="bg-gradient-to-br from-card/60 via-card/40 to-card/60 border-border/40 shadow-lg">
        <CardHeader>
          <CardTitle className="text-foreground">POS System</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-32 flex flex-col items-center justify-center text-muted-foreground gap-2">
            <Monitor className="w-10 h-10 text-indigo-400 mb-2" />
            <span className="text-lg font-semibold">
              Feature under construction
            </span>
            <span className="text-sm">
              This page will allow you to manage all POS operations.
            </span>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default AdminPOS;
