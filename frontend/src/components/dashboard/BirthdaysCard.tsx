import React from "react";

interface Person {
  name: string;
  date: string; // ISO date string
  avatar?: string;
  type: "birthday" | "anniversary";
}

interface BirthdaysCardProps {
  people: Person[];
}

const BirthdaysCard: React.FC<BirthdaysCardProps> = ({ people }) => {
  // Only show next 3
  const upcoming = people
    .filter((p) => new Date(p.date) >= new Date())
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 3);

  return (
    <div className="p-5 rounded-2xl bg-gradient-to-r from-accent/10 to-primary/10 border border-border/30 shadow-md">
      <h3 className="font-bold text-lg mb-3 text-primary">
        Upcoming Celebrations
      </h3>
      {upcoming.length === 0 && (
        <div className="text-xs text-muted-foreground">No upcoming events</div>
      )}
      <ul className="divide-y divide-border/20">
        {upcoming.map((p, idx) => (
          <li key={idx} className="flex items-center gap-3 py-2">
            {p.avatar ? (
              <img
                src={p.avatar}
                alt={p.name}
                className="w-8 h-8 rounded-full object-cover"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                {p.name[0]}
              </div>
            )}
            <div className="flex-1 min-w-0">
              <span className="font-medium text-foreground truncate block">
                {p.name}
              </span>
              <span className="text-xs text-muted-foreground truncate block">
                {p.type === "birthday" ? "Birthday" : "Anniversary"}
              </span>
            </div>
            <span className="text-xs text-primary font-semibold">
              {new Date(p.date).toLocaleDateString(undefined, {
                month: "short",
                day: "numeric",
              })}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BirthdaysCard;
