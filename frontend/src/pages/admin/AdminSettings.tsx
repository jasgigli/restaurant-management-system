import { motion } from "framer-motion";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Switch } from "../../components/ui/switch";

const settings = [
  {
    id: 1,
    name: "Enable Notifications",
    description: "Receive system notifications and alerts.",
  },
  {
    id: 2,
    name: "Auto Backup",
    description: "Automatically backup system data daily.",
  },
  {
    id: 3,
    name: "Dark Mode",
    description: "Enable dark theme for the dashboard.",
  },
];

const AdminSettings = () => {
  const [toggles, setToggles] = useState({ 1: true, 2: false, 3: true });
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      <div>
        <h1 className="text-3xl font-bold text-foreground tracking-tight">
          Admin System Settings
        </h1>
        <p className="text-muted-foreground mt-2">
          Configure system settings here.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {settings.map((setting) => (
          <Card
            key={setting.id}
            className="bg-gradient-to-br from-card/60 via-card/40 to-card/60 border-border/40 shadow-lg"
          >
            <CardHeader>
              <CardTitle className="text-foreground">{setting.name}</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center justify-between">
              <span className="text-muted-foreground text-sm">
                {setting.description}
              </span>
              <Switch
                checked={toggles[setting.id]}
                onChange={() =>
                  setToggles((prev) => ({
                    ...prev,
                    [setting.id]: !prev[setting.id],
                  }))
                }
              />
            </CardContent>
          </Card>
        ))}
      </div>
    </motion.div>
  );
};

export default AdminSettings;
