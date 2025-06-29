import React from "react";

interface Recognition {
  from: string;
  to: string;
  message: string;
  date: string; // ISO date string
}

interface PeerRecognitionCardProps {
  recognitions: Recognition[];
}

const PeerRecognitionCard: React.FC<PeerRecognitionCardProps> = ({
  recognitions,
}) => {
  const recent = recognitions
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);

  return (
    <div className="p-5 rounded-2xl bg-gradient-to-r from-accent/10 to-primary/10 border border-border/30 shadow-md">
      <h3 className="font-bold text-lg mb-3 text-primary">Peer Recognition</h3>
      {recent.length === 0 && (
        <div className="text-xs text-muted-foreground">No recent shoutouts</div>
      )}
      <ul className="divide-y divide-border/20">
        {recent.map((r, idx) => (
          <li key={idx} className="py-2">
            <span className="font-semibold text-primary">{r.from}</span>
            <span className="mx-1 text-xs text-muted-foreground">to</span>
            <span className="font-semibold text-foreground">{r.to}</span>
            <span className="block text-xs text-muted-foreground mt-1">
              "{r.message}"
            </span>
            <span className="block text-xs text-muted-foreground mt-1">
              {new Date(r.date).toLocaleDateString(undefined, {
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

export default PeerRecognitionCard;
