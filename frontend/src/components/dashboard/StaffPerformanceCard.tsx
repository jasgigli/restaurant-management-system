import React from "react";

interface Staff {
  name: string;
  role: string;
  score: number;
  avatar?: string;
}

interface StaffPerformanceCardProps {
  staff: Staff[];
}

const StaffPerformanceCard: React.FC<StaffPerformanceCardProps> = ({
  staff,
}) => {
  return (
    <div className="p-5 rounded-2xl bg-gradient-to-r from-primary/10 to-accent/10 border border-border/30 shadow-md">
      <h3 className="font-bold text-lg mb-3 text-primary">
        Top Staff Performance
      </h3>
      <ul className="divide-y divide-border/20">
        {staff.map((s, idx) => (
          <li key={idx} className="flex items-center gap-3 py-2">
            {s.avatar ? (
              <img
                src={s.avatar}
                alt={s.name}
                className="w-8 h-8 rounded-full object-cover"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                {s.name[0]}
              </div>
            )}
            <div className="flex-1 min-w-0">
              <span className="font-medium text-foreground truncate block">
                {s.name}
              </span>
              <span className="text-xs text-muted-foreground truncate block">
                {s.role}
              </span>
            </div>
            <span className="font-semibold text-primary">{s.score}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StaffPerformanceCard;
