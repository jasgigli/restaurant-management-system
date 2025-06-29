import React from "react";

interface Task {
  time: string;
  label: string;
  completed: boolean;
}

interface ScheduleCardProps {
  tasks: Task[];
}

const ScheduleCard: React.FC<ScheduleCardProps> = ({ tasks }) => {
  return (
    <div className="p-5 rounded-2xl bg-gradient-to-r from-primary/10 to-accent/10 border border-border/30 shadow-md">
      <h3 className="font-bold text-lg mb-3 text-primary">Today's Schedule</h3>
      <ul className="divide-y divide-border/20">
        {tasks.map((t, idx) => (
          <li key={idx} className="flex items-center gap-3 py-2">
            <span
              className={`w-2 h-2 rounded-full ${
                t.completed ? "bg-green-500" : "bg-gray-300"
              }`}
            />
            <span
              className={`flex-1 min-w-0 truncate ${
                t.completed
                  ? "line-through text-muted-foreground"
                  : "text-foreground"
              }`}
            >
              {t.label}
            </span>
            <span className="text-xs text-muted-foreground">{t.time}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ScheduleCard;
