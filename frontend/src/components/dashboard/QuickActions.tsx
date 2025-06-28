import type { LucideIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";

interface Action {
  label: string;
  icon: LucideIcon;
  onClick: () => void;
}

interface QuickActionsProps {
  actions: Action[];
}

export const QuickActions = ({ actions }: QuickActionsProps) => (
  <Card className="glassmorphism p-6 flex flex-wrap gap-4">
    <h3 className="text-lg font-medium mb-4 w-full">Quick Actions</h3>
    {actions.map((action, idx) => (
      <Button
        key={idx}
        onClick={action.onClick}
        className="flex items-center gap-2"
      >
        <action.icon className="w-4 h-4" />
        {action.label}
      </Button>
    ))}
  </Card>
);
