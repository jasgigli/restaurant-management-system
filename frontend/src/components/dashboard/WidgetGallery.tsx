/**
 * WidgetGallery - Gallery of available dashboard widgets
 * @module components/dashboard/WidgetGallery
 */
import { motion } from "framer-motion";
import type { FC } from "react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";

/**
 * Widget type for gallery
 */
export interface WidgetGalleryItem {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType;
  added: boolean;
}

/**
 * Props for WidgetGallery component
 */
export interface WidgetGalleryProps {
  widgets: WidgetGalleryItem[];
  onAdd: (id: string) => void;
  onRemove: (id: string) => void;
}

export const WidgetGallery: FC<WidgetGalleryProps> = ({
  widgets,
  onAdd,
  onRemove,
}) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    {widgets.map((widget) => (
      <motion.div
        key={widget.id}
        className="p-4"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
      >
        <Card className="flex flex-col items-center gap-2 p-4">
          <widget.icon className="w-8 h-8 mb-2" />
          <div className="font-semibold">{widget.name}</div>
          <div className="text-xs text-muted-foreground mb-2 text-center">
            {widget.description}
          </div>
          {widget.added ? (
            <Button
              variant="destructive"
              onClick={() => onRemove(widget.id)}
              size="sm"
            >
              Remove
            </Button>
          ) : (
            <Button
              variant="default"
              onClick={() => onAdd(widget.id)}
              size="sm"
            >
              Add
            </Button>
          )}
        </Card>
      </motion.div>
    ))}
  </div>
);
