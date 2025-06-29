import { AnimatePresence, motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { Minus, TrendingDown, TrendingUp } from "lucide-react";
import { Badge } from "../ui/Badge";
import { Card } from "../ui/card";

export interface KPICardProps {
  title: string;
  value: number;
  change: number;
  trend: "up" | "down" | "stable";
  icon: LucideIcon;
  color?: string;
  bgColor?: string;
  borderColor?: string;
}

export const KPICard = ({
  title,
  value,
  change,
  trend,
  icon: Icon,
  color = "text-primary",
  bgColor = "bg-primary/10",
  borderColor = "border-primary/20",
}: KPICardProps) => (
  <motion.div
    whileHover={{ y: -5, scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    transition={{ duration: 0.2 }}
  >
    <Card
      className={`relative overflow-hidden bg-gradient-to-br from-card/80 to-card/60 backdrop-blur-sm border ${borderColor} shadow-xl hover:shadow-2xl transition-all duration-300 group`}
    >
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(0,0,0,0.02)_1px,transparent_0)] dark:bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.02)_1px,transparent_0)] bg-[length:20px_20px] pointer-events-none" />

      {/* Gradient overlay */}
      <div
        className={`absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-${color.replace(
          "text-",
          ""
        )}/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
      />

      <div className="relative z-10 p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div
            className={`p-3 rounded-xl ${bgColor} border ${borderColor} group-hover:scale-110 transition-transform duration-300`}
          >
            <Icon className={`w-6 h-6 ${color}`} />
          </div>

          {/* Trend indicator */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
            className={`p-2 rounded-full ${
              trend === "up"
                ? "bg-green-500/20 text-green-600"
                : trend === "down"
                ? "bg-red-500/20 text-red-600"
                : "bg-gray-500/20 text-gray-600"
            }`}
          >
            {trend === "up" ? (
              <TrendingUp className="w-4 h-4" />
            ) : trend === "down" ? (
              <TrendingDown className="w-4 h-4" />
            ) : (
              <Minus className="w-4 h-4" />
            )}
          </motion.div>
        </div>

        {/* Title */}
        <h3 className="text-sm font-medium text-muted-foreground mb-2 group-hover:text-foreground transition-colors duration-200">
          {title}
        </h3>

        {/* Value */}
        <AnimatePresence mode="wait">
          <motion.div
            key={value}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="text-3xl font-bold text-foreground mb-3"
          >
            {typeof value === "number" && value >= 1000
              ? `$${(value / 1000).toFixed(1)}k`
              : value.toLocaleString()}
          </motion.div>
        </AnimatePresence>

        {/* Change indicator */}
        <div className="flex items-center gap-2">
          <Badge
            variant={
              trend === "up"
                ? "success"
                : trend === "down"
                ? "destructive"
                : "default"
            }
            className={`text-xs font-semibold px-2 py-1 rounded-full ${
              trend === "up"
                ? "bg-green-500/20 text-green-600 border-green-500/30"
                : trend === "down"
                ? "bg-red-500/20 text-red-600 border-red-500/30"
                : "bg-gray-500/20 text-gray-600 border-gray-500/30"
            }`}
          >
            {trend === "up" ? "+" : trend === "down" ? "" : ""}
            {change}%
          </Badge>

          <span className="text-xs text-muted-foreground">vs last month</span>
        </div>
      </div>

      {/* Bottom accent */}
      <div
        className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${
          trend === "up"
            ? "from-green-500 to-emerald-500"
            : trend === "down"
            ? "from-red-500 to-pink-500"
            : "from-gray-500 to-gray-400"
        }`}
      />
    </Card>
  </motion.div>
);
