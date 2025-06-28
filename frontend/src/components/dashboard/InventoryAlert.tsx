import { Badge } from "../ui/Badge";
import { Card } from "../ui/card";

interface InventoryItem {
  name: string;
  quantity: number;
  threshold: number;
}

interface InventoryAlertProps {
  items: InventoryItem[];
}

export const InventoryAlert = ({ items }: InventoryAlertProps) => (
  <Card className="glassmorphism p-6">
    <h3 className="text-lg font-medium mb-4">Low Stock Alerts</h3>
    <ul className="space-y-2">
      {items.length === 0 && (
        <li className="text-gray-500">All stocks are healthy!</li>
      )}
      {items.map((item) => {
        let variant: "destructive" | "info" | "default" = "default";
        if (item.quantity <= 0) variant = "destructive";
        else if (item.quantity <= item.threshold) variant = "info";
        return (
          <li key={item.name} className="flex items-center justify-between">
            <span>{item.name}</span>
            <Badge variant={variant}>{item.quantity}</Badge>
          </li>
        );
      })}
    </ul>
  </Card>
);
