import {
  Bar,
  BarChart,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Card } from "../ui/card";

export interface SalesData {
  date: string;
  sales: number;
  profit: number;
  orders: number;
}

interface SalesChartProps {
  data: SalesData[];
  type?: "bar" | "line";
}

export const SalesChart = ({ data, type = "bar" }: SalesChartProps) => (
  <Card className="p-4 h-80">
    <ResponsiveContainer width="100%" height="100%">
      {type === "bar" ? (
        <BarChart data={data}>
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="sales" fill="#6366f1" />
        </BarChart>
      ) : (
        <LineChart data={data}>
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="sales" stroke="#6366f1" />
        </LineChart>
      )}
    </ResponsiveContainer>
  </Card>
);
