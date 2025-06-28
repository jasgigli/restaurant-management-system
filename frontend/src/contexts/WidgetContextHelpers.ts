/**
 * WidgetContext helpers and types
 */
import { createContext, useContext } from "react";
import type { WidgetGalleryItem } from "../components/dashboard/WidgetGallery";

export interface WidgetInstance {
  id: string;
  galleryId: string;
  order: number;
}

export interface WidgetContextType {
  widgets: WidgetInstance[];
  availableWidgets: WidgetGalleryItem[];
  addWidget: (galleryId: string) => void;
  removeWidget: (id: string) => void;
  reorderWidgets: (ids: string[]) => void;
}

export const WidgetContext = createContext<WidgetContextType | undefined>(
  undefined
);

export const useWidgetContext = () => {
  const ctx = useContext(WidgetContext);
  if (!ctx)
    throw new Error("useWidgetContext must be used within WidgetProvider");
  return ctx;
};

export type { WidgetGalleryItem };
