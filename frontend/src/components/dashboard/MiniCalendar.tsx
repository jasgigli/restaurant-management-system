import React from "react";

interface CalendarEvent {
  date: string; // ISO date string
  label: string;
}

interface MiniCalendarProps {
  events: CalendarEvent[];
}

const MiniCalendar: React.FC<MiniCalendarProps> = ({ events }) => {
  const today = new Date();
  const month = today.toLocaleString("default", { month: "long" });
  const year = today.getFullYear();
  const day = today.getDate();

  // Only show next 3 events
  const upcoming = events
    .filter((e) => new Date(e.date) >= today)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 3);

  return (
    <div className="p-5 rounded-2xl bg-gradient-to-r from-accent/10 to-primary/10 border border-border/30 shadow-md flex flex-col items-center">
      <div className="mb-2 text-primary font-bold text-lg">
        {month} {year}
      </div>
      <div className="flex items-center gap-2 mb-3">
        <span className="text-3xl font-bold text-primary bg-white rounded-full px-3 py-1 border border-primary/20 shadow">
          {day}
        </span>
        <span className="text-sm text-muted-foreground">Today</span>
      </div>
      <div className="w-full">
        <div className="font-semibold text-xs text-muted-foreground mb-1">
          Upcoming Events
        </div>
        <ul className="space-y-1">
          {upcoming.length === 0 && (
            <li className="text-xs text-muted-foreground">No events</li>
          )}
          {upcoming.map((e, idx) => (
            <li
              key={idx}
              className="text-xs text-foreground flex items-center gap-2"
            >
              <span className="inline-block w-2 h-2 rounded-full bg-primary" />
              <span>
                {new Date(e.date).toLocaleDateString(undefined, {
                  month: "short",
                  day: "numeric",
                })}
                :
              </span>
              <span className="truncate">{e.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MiniCalendar;
