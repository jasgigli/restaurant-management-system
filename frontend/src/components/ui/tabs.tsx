import { Tab } from "@headlessui/react";
import * as React from "react";
import { cn } from "./utils";

export const Tabs: React.FC<{
  defaultValue?: string;
  className?: string;
  children: React.ReactNode;
}> = ({ className, children }) => {
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  return (
    <div className={cn("w-full", className)}>
      <Tab.Group selectedIndex={selectedIndex} onChange={setSelectedIndex}>
        {children}
      </Tab.Group>
    </div>
  );
};
Tabs.displayName = "Tabs";

export const TabsList: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => <Tab.List className="flex gap-2 border-b mb-4">{children}</Tab.List>;
TabsList.displayName = "TabsList";

export const TabsTrigger: React.FC<{
  value?: string;
  children: React.ReactNode;
}> = ({ children }) => (
  <Tab
    className={({ selected }) =>
      cn(
        "px-4 py-2 font-medium rounded-t border-b-2 transition-colors",
        selected
          ? "border-primary text-primary"
          : "border-transparent text-muted-foreground hover:text-primary"
      )
    }
  >
    {children}
  </Tab>
);
TabsTrigger.displayName = "TabsTrigger";

export const TabsContent: React.FC<{
  value?: string;
  children: React.ReactNode;
}> = ({ children }) => <Tab.Panel className="mt-2">{children}</Tab.Panel>;
TabsContent.displayName = "TabsContent";
