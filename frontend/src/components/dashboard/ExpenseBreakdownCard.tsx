import React from "react";

interface ExpenseData {
  category: string;
  value: number;
  color: string;
}

interface ExpenseBreakdownCardProps {
  data: ExpenseData[];
}

const getPieSegments = (data: ExpenseData[]) => {
  const total = data.reduce((sum, d) => sum + d.value, 0);
  let cumulative = 0;
  return data.map((d, i) => {
    const start = (cumulative / total) * 2 * Math.PI;
    cumulative += d.value;
    const end = (cumulative / total) * 2 * Math.PI;
    const x1 = 50 + 40 * Math.sin(start);
    const y1 = 50 - 40 * Math.cos(start);
    const x2 = 50 + 40 * Math.sin(end);
    const y2 = 50 - 40 * Math.cos(end);
    const largeArc = end - start > Math.PI ? 1 : 0;
    const path = `M50,50 L${x1},${y1} A40,40 0 ${largeArc} 1 ${x2},${y2} Z`;
    return { path, color: d.color, category: d.category, value: d.value };
  });
};

const ExpenseBreakdownCard: React.FC<ExpenseBreakdownCardProps> = ({
  data,
}) => {
  const segments = getPieSegments(data);
  return (
    <div className="p-5 rounded-2xl bg-gradient-to-r from-accent/10 to-primary/10 border border-border/30 shadow-md flex flex-col items-center">
      <h3 className="font-bold text-lg mb-3 text-primary">Expense Breakdown</h3>
      <svg width={100} height={100} viewBox="0 0 100 100" className="mb-3">
        {segments.map((seg, idx) => (
          <path key={idx} d={seg.path} fill={seg.color} />
        ))}
      </svg>
      <div className="flex flex-wrap gap-2 justify-center">
        {data.map((d, idx) => (
          <span key={idx} className="flex items-center gap-1 text-xs">
            <span
              className="inline-block w-3 h-3 rounded-full"
              style={{ background: d.color }}
            />
            {d.category}
          </span>
        ))}
      </div>
    </div>
  );
};

export default ExpenseBreakdownCard;
