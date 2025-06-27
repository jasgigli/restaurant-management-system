import { Tab } from "@headlessui/react";
import * as React from "react";
import { cn } from "./utils";

export const Tabs: React.FC<{
  defaultValue: string;
  className?: string;
  children: React.ReactNode;
}> = ({ defaultValue, className, children }) => {
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const tabLabels = React.Children.toArray(children).filter(
    (child: any) => child.type.displayName === "TabsList"
  );
  const tabContents = React.Children.toArray(children).filter(
    (child: any) => child.type.displayName !== "TabsList"
  );
  return (
    <div className={cn("w-full", className)}>
      <Tab.Group selectedIndex={selectedIndex} onChange={setSelectedIndex}>
        {tabLabels}
        {tabContents}
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
  value: string;
  children: React.ReactNode;
}> = ({ value, children }) => (
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
  value: string;
  children: React.ReactNode;
}> = ({ value, children }) => (
  <Tab.Panel className="mt-2">{children}</Tab.Panel>
);
TabsContent.displayName = "TabsContent";
