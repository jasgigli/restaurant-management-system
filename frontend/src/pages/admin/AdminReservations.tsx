import { motion } from "framer-motion";
import { Calendar } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";

const AdminReservations = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      <div>
        <h1 className="text-3xl font-bold text-foreground tracking-tight flex items-center gap-2">
          <Calendar className="w-8 h-8 text-emerald-500" /> Reservation System
        </h1>
        <p className="text-muted-foreground mt-2">
          Manage bookings and reservations. Feature coming soon.
        </p>
      </div>
      <Card className="bg-gradient-to-br from-card/60 via-card/40 to-card/60 border-border/40 shadow-lg">
        <CardHeader>
          <CardTitle className="text-foreground">Reservation System</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-32 flex flex-col items-center justify-center text-muted-foreground gap-2">
            <Calendar className="w-10 h-10 text-emerald-400 mb-2" />
            <span className="text-lg font-semibold">
              Feature under construction
            </span>
            <span className="text-sm">
              This page will allow you to manage all table reservations and
              bookings.
            </span>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default AdminReservations;
