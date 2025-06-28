import { Card } from "../ui/card";

interface Activity {
  description: string;
  timestamp: string;
}

interface RecentActivityProps {
  activities: Activity[];
}

export const RecentActivity = ({ activities }: RecentActivityProps) => (
  <Card className="glassmorphism p-6">
    <h3 className="text-lg font-medium mb-4">Recent Activity</h3>
    <ul className="space-y-3">
      {activities.length === 0 && (
        <li className="text-gray-500">No recent activity.</li>
      )}
      {activities.map((activity, idx) => (
        <li key={idx} className="flex items-start gap-2">
          <span className="w-2 h-2 mt-2 rounded-full bg-primary inline-block" />
          <div>
            <div className="text-sm">{activity.description}</div>
            <div className="text-xs text-gray-400">
              {new Date(activity.timestamp).toLocaleString()}
            </div>
          </div>
        </li>
      ))}
    </ul>
  </Card>
);
