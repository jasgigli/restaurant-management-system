import { Badge } from "@/components/ui/Badge";
import { motion } from "framer-motion";
import { CalendarDays, ChevronLeft, ChevronRight } from "lucide-react";
import React from "react";

interface CalendarEvent {
  date: string; // ISO date string
  label: string;
}

interface MiniCalendarProps {
  events: CalendarEvent[];
}

const animationVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1 },
  }),
};

const MiniCalendar: React.FC<MiniCalendarProps> = ({ events }) => {
  const today = new Date();
  const month = today.toLocaleString("default", { month: "long" });
  const year = today.getFullYear();
  const day = today.getDate();

  const upcoming = events
    .filter((e) => new Date(e.date) >= today)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 3);

  return (
    <div className="p-5 rounded-2xl bg-gradient-to-r from-primary/10 to-accent/10 dark:from-primary/20 dark:to-accent/20 border border-border/30 shadow-md flex flex-col items-center">
      <div className="flex items-center justify-between w-full mb-3">
        <div className="flex items-center gap-2 text-gray-700">
          <CalendarDays className="w-5 h-5 text-primary" />
          <h3 className="font-bold text-lg text-primary">
            {month} {year}
          </h3>
        </div>
        <div className="flex items-center gap-1">
          <button className="p-1 rounded-full hover:bg-gray-200">
            <ChevronLeft className="w-4 h-4 text-gray-600" />
          </button>
          <button className="p-1 rounded-full hover:bg-gray-200">
            <ChevronRight className="w-4 h-4 text-gray-600" />
          </button>
        </div>
      </div>

      <div className="relative mb-4">
        <Badge
          className="text-xl font-bold w-16 h-16 flex items-center justify-center bg-card shadow-md text-foreground"
          variant="outline"
        >
          {day}
        </Badge>
        <div className="absolute bottom-0 right-0 text-xs text-muted-foreground">
          Today
        </div>
      </div>

      <div className="w-full">
        <h3 className="font-medium text-sm text-muted-foreground mb-1">
          Upcoming Events
        </h3>
        <ul className="divide-y divide-border/20">
          {upcoming.length === 0 && (
            <li className="text-xs text-muted-foreground py-2">No events…</li>
          )}
          {upcoming.map((e, idx) => (
            <motion.li
              key={idx}
              custom={idx}
              initial="hidden"
              animate="visible"
              variants={animationVariants}
              className="flex items-center justify-between py-2"
            >
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 shadow" />
                <span className="text-sm font-medium text-foreground">
                  {new Date(e.date).toLocaleDateString(undefined, {
                    month: "short",
                    day: "numeric",
                  })}
                </span>
              </div>
              <span className="text-sm text-foreground truncate">
                {e.label}
              </span>
            </motion.li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MiniCalendar;
