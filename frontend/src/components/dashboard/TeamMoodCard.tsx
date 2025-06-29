import React from "react";

interface Mood {
  name: string;
  mood: "happy" | "neutral" | "sad";
  comment?: string;
}

interface TeamMoodCardProps {
  moods: Mood[];
}

const moodEmoji = {
  happy: "😊",
  neutral: "😐",
  sad: "😞",
};

const TeamMoodCard: React.FC<TeamMoodCardProps> = ({ moods }) => {
  const happyCount = moods.filter((m) => m.mood === "happy").length;
  const percentHappy = moods.length
    ? Math.round((happyCount / moods.length) * 100)
    : 0;
  const recent = moods.slice(-3).reverse();

  return (
    <div className="p-5 rounded-2xl bg-gradient-to-r from-primary/10 to-accent/10 border border-border/30 shadow-md">
      <h3 className="font-bold text-lg mb-3 text-primary">Team Mood</h3>
      <div className="mb-2 text-sm text-muted-foreground">
        {percentHappy}% happy this week
      </div>
      <div className="flex gap-2 mb-3">
        {Object.entries(moodEmoji).map(([m, emoji]) => (
          <span key={m} className="text-2xl">
            {emoji} {moods.filter((x) => x.mood === m).length}
          </span>
        ))}
      </div>
      <div className="text-xs text-muted-foreground mb-1">Recent feedback:</div>
      <ul className="space-y-1">
        {recent.map((m, idx) => (
          <li key={idx} className="flex items-center gap-2">
            <span>{moodEmoji[m.mood]}</span>
            <span className="truncate">{m.comment || "No comment"}</span>
            <span className="text-muted-foreground">- {m.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TeamMoodCard;
