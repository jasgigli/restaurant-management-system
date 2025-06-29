import React from "react";

interface TopSellingItem {
  name: string;
  count: number;
  revenue: number;
}

interface TopSellingItemsCardProps {
  items: TopSellingItem[];
}

const TopSellingItemsCard: React.FC<TopSellingItemsCardProps> = ({ items }) => {
  return (
    <div className="p-5 rounded-2xl bg-gradient-to-r from-primary/10 to-accent/10 border border-border/30 shadow-md">
      <h3 className="font-bold text-lg mb-3 text-primary">Top Selling Items</h3>
      <ul className="divide-y divide-border/20">
        {items.map((item, idx) => (
          <li key={idx} className="flex justify-between items-center py-2">
            <span className="font-medium text-foreground truncate">
              {item.name}
            </span>
            <span className="text-sm text-muted-foreground">x{item.count}</span>
            <span className="font-semibold text-primary">
              ${item.revenue.toFixed(2)}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopSellingItemsCard;
