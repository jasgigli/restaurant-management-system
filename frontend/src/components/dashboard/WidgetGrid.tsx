/**
 * WidgetGrid - Responsive, drag-and-drop grid for dashboard widgets
 * @module components/dashboard/WidgetGrid
 */
import { Reorder } from "framer-motion";
import type { FC, ReactNode } from "react";
import { useState } from "react";

/**
 * Props for WidgetGrid component
 */
export interface WidgetGridProps {
  /** List of widget React nodes */
  widgets: ReactNode[];
}

export const WidgetGrid: FC<WidgetGridProps> = ({ widgets }) => {
  const [order, setOrder] = useState(widgets.map((_, i) => i));
  return (
    <Reorder.Group
      as="div"
      axis="y"
      values={order}
      onReorder={setOrder}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {order.map((idx) => (
        <Reorder.Item
          key={idx}
          value={idx}
          as="div"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {widgets[idx]}
        </Reorder.Item>
      ))}
    </Reorder.Group>
  );
};
