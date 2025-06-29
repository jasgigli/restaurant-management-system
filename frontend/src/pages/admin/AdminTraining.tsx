import { motion } from "framer-motion";
import { Award } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";

const AdminTraining = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      <div>
        <h1 className="text-3xl font-bold text-foreground tracking-tight flex items-center gap-2">
          <Award className="w-8 h-8 text-amber-500" /> Training Programs
        </h1>
        <p className="text-muted-foreground mt-2">
          Staff development and training management coming soon.
        </p>
      </div>
      <Card className="bg-gradient-to-br from-card/60 via-card/40 to-card/60 border-border/40 shadow-lg">
        <CardHeader>
          <CardTitle className="text-foreground">Training Programs</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-32 flex flex-col items-center justify-center text-muted-foreground gap-2">
            <Award className="w-10 h-10 text-amber-400 mb-2" />
            <span className="text-lg font-semibold">
              Feature under construction
            </span>
            <span className="text-sm">
              This page will allow you to manage staff training and development
              programs.
            </span>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default AdminTraining;
