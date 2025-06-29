import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";

const AdminLoyalty = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      <div>
        <h1 className="text-3xl font-bold text-foreground tracking-tight flex items-center gap-2">
          <Heart className="w-8 h-8 text-pink-500" /> Loyalty Program
        </h1>
        <p className="text-muted-foreground mt-2">
          Customer rewards system coming soon.
        </p>
      </div>
      <Card className="bg-gradient-to-br from-card/60 via-card/40 to-card/60 border-border/40 shadow-lg">
        <CardHeader>
          <CardTitle className="text-foreground">Loyalty Program</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-32 flex flex-col items-center justify-center text-muted-foreground gap-2">
            <Heart className="w-10 h-10 text-pink-400 mb-2" />
            <span className="text-lg font-semibold">
              Feature under construction
            </span>
            <span className="text-sm">
              This page will allow you to manage customer loyalty and rewards.
            </span>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default AdminLoyalty;
