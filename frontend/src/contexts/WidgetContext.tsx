/**
 * WidgetProvider - Context provider for dashboard widgets
 * @module contexts/WidgetContext
 */
import type { FC, ReactNode } from "react";
import { useCallback, useState } from "react";
import type {
  WidgetContextType,
  WidgetGalleryItem,
  WidgetInstance,
} from "./WidgetContextHelpers";
import { WidgetContext } from "./WidgetContextHelpers";

export const WidgetProvider: FC<{ children: ReactNode }> = ({ children }) => {
  // Example available widgets
  const [availableWidgets, setAvailableWidgets] = useState<WidgetGalleryItem[]>(
    [
      {
        id: "kpi",
        name: "KPI Card",
        description: "Key performance indicator",
        icon: () => null,
        added: false,
      },
      {
        id: "chart",
        name: "Sales Chart",
        description: "Sales analytics chart",
        icon: () => null,
        added: false,
      },
      {
        id: "inv",
        name: "Inventory Alert",
        description: "Low stock alerts",
        icon: () => null,
        added: false,
      },
    ]
  );
  const [widgets, setWidgets] = useState<WidgetInstance[]>([]);

  const addWidget = useCallback((galleryId: string) => {
    setWidgets((w) => [
      ...w,
      { id: `${galleryId}-${Date.now()}`, galleryId, order: w.length },
    ]);
    setAvailableWidgets((ws) =>
      ws.map((w) => (w.id === galleryId ? { ...w, added: true } : w))
    );
  }, []);

  const removeWidget = useCallback((id: string) => {
    setWidgets((w) => w.filter((widget) => widget.id !== id));
    setAvailableWidgets((ws) =>
      ws.map((w) => (id.startsWith(w.id) ? { ...w, added: false } : w))
    );
  }, []);

  const reorderWidgets = useCallback((ids: string[]) => {
    setWidgets((w) =>
      ids.map((id, i) => ({ ...w.find((wi) => wi.id === id)!, order: i }))
    );
  }, []);

  const value: WidgetContextType = {
    widgets,
    availableWidgets,
    addWidget,
    removeWidget,
    reorderWidgets,
  };

  return (
    <WidgetContext.Provider value={value}>{children}</WidgetContext.Provider>
  );
};
