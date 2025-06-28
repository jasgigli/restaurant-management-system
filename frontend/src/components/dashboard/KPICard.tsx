import { AnimatePresence, motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { Badge } from "../ui/Badge";
import { Card } from "../ui/card";

export interface KPICardProps {
  title: string;
  value: number;
  change: number;
  trend: "up" | "down" | "stable";
  icon: LucideIcon;
}

export const KPICard = ({
  title,
  value,
  change,
  trend,
  icon: Icon,
}: KPICardProps) => (
  <Card className="glassmorphism p-6 flex flex-col items-center">
    <Icon className="mb-2 text-2xl" />
    <div className="text-lg font-medium">{title}</div>
    <AnimatePresence>
      <motion.div
        key={value}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className="text-3xl font-bold"
      >
        {value.toLocaleString()}
      </motion.div>
    </AnimatePresence>
    <Badge
      variant={
        trend === "up"
          ? "success"
          : trend === "down"
          ? "destructive"
          : "default"
      }
      className="mt-2"
    >
      {trend === "up" ? "▲" : trend === "down" ? "▼" : "–"} {change}%
    </Badge>
  </Card>
);
