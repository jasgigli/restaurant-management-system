import React from "react";

interface ShiftSwap {
  from: string;
  to: string;
  date: string; // ISO date string
  status: "open" | "approved" | "denied";
}

interface ShiftSwapCardProps {
  swaps: ShiftSwap[];
}

const statusColor = {
  open: "bg-yellow-400 text-yellow-900",
  approved: "bg-green-400 text-green-900",
  denied: "bg-red-400 text-red-900",
};

const ShiftSwapCard: React.FC<ShiftSwapCardProps> = ({ swaps }) => {
  const recent = swaps
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);

  return (
    <div className="p-5 rounded-2xl bg-gradient-to-r from-accent/10 to-primary/10 border border-border/30 shadow-md">
      <h3 className="font-bold text-lg mb-3 text-primary">Shift Swaps</h3>
      {recent.length === 0 && (
        <div className="text-xs text-muted-foreground">No open requests</div>
      )}
      <ul className="divide-y divide-border/20">
        {recent.map((s, idx) => (
          <li key={idx} className="flex items-center gap-2 py-2">
            <span className="font-semibold text-foreground">{s.from}</span>
            <span className="mx-1 text-xs text-muted-foreground">→</span>
            <span className="font-semibold text-primary">{s.to}</span>
            <span className="text-xs text-muted-foreground ml-2">
              {new Date(s.date).toLocaleDateString(undefined, {
                month: "short",
                day: "numeric",
              })}
            </span>
            <span
              className={`ml-auto px-2 py-0.5 rounded-full text-xs font-semibold ${
                statusColor[s.status]
              }`}
            >
              {s.status}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ShiftSwapCard;
