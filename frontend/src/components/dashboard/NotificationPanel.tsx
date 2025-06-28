import { Badge } from "../ui/Badge";
import { Card } from "../ui/card";

interface Notification {
  message: string;
  type: "info" | "success" | "warning" | "error";
  timestamp: string;
}

interface NotificationPanelProps {
  notifications: Notification[];
}

const typeToVariant = {
  info: "info",
  success: "success",
  warning: "info",
  error: "destructive",
} as const;

export const NotificationPanel = ({
  notifications,
}: NotificationPanelProps) => (
  <Card className="glassmorphism p-6">
    <h3 className="text-lg font-medium mb-4">Notifications</h3>
    <ul className="space-y-2">
      {notifications.length === 0 && (
        <li className="text-gray-500">No notifications.</li>
      )}
      {notifications.map((n, idx) => (
        <li key={idx} className="flex items-center gap-2">
          <Badge variant={typeToVariant[n.type]}>{n.type}</Badge>
          <span>{n.message}</span>
          <span className="ml-auto text-xs text-gray-400">
            {new Date(n.timestamp).toLocaleTimeString()}
          </span>
        </li>
      ))}
    </ul>
  </Card>
);
