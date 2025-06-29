import { Badge } from "@/components/ui/Badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { List, ListItem } from "@/components/ui/list";
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
    <Card className="max-w-sm mx-auto bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 border-none shadow-lg rounded-2xl">
      <CardHeader className="flex items-center justify-between pb-2">
        <div className="flex items-center gap-2 text-gray-700">
          <CalendarDays className="w-5 h-5" />
          <CardTitle className="text-lg font-semibold">
            {month} {year}
          </CardTitle>
        </div>
        <div className="flex items-center gap-1">
          <button className="p-1 rounded-full hover:bg-gray-200">
            <ChevronLeft className="w-4 h-4 text-gray-600" />
          </button>
          <button className="p-1 rounded-full hover:bg-gray-200">
            <ChevronRight className="w-4 h-4 text-gray-600" />
          </button>
        </div>
      </CardHeader>

      <CardContent className="flex flex-col items-center">
        <div className="relative mb-4">
          <Badge
            className="text-xl font-bold w-16 h-16 grid place-items-center bg-white shadow-md"
            variant="outline"
          >
            {day}
          </Badge>
          <div className="absolute bottom-0 right-0 text-xs text-gray-500">
            Today
          </div>
        </div>

        <div className="w-full">
          <h3 className="font-medium text-sm text-gray-600 mb-1">
            Upcoming Events
          </h3>
          <List className="space-y-2">
            {upcoming.length === 0 && (
              <ListItem className="text-xs text-gray-500">No events…</ListItem>
            )}
            {upcoming.map((e, idx) => (
              <motion.div
                key={idx}
                custom={idx}
                initial="hidden"
                animate="visible"
                variants={animationVariants}
              >
                <ListItem className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 shadow" />
                    <span className="text-sm font-medium text-gray-700">
                      {new Date(e.date).toLocaleDateString(undefined, {
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                  <span className="text-sm text-gray-800 truncate">
                    {e.label}
                  </span>
                </ListItem>
              </motion.div>
            ))}
          </List>
        </div>
      </CardContent>
    </Card>
  );
};

export default MiniCalendar;
