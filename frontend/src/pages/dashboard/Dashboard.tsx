import { useState } from "react";
import { Card } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { useToast } from "../../components/ui/useToast";
import { useGetNetProfitReport } from "../../hooks/useReports";
// import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const today = new Date().toISOString().slice(0, 10);
const monthStart = new Date(new Date().getFullYear(), new Date().getMonth(), 1)
  .toISOString()
  .slice(0, 10);

const Dashboard = () => {
  const [dateRange, setDateRange] = useState({ start: monthStart, end: today });
  const { data, isLoading, isError } = useGetNetProfitReport(
    dateRange.start,
    dateRange.end
  );
  const toast = useToast();

  if (isError) toast("Failed to load dashboard data", "error");
  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row gap-6 mb-8">
        <Card className="flex-1 p-6">
          <h3 className="text-lg font-medium mb-2">Today's Sales</h3>
          <div className="text-2xl font-bold">
            {data?.totalSales?.toFixed(2) || 0}
          </div>
        </Card>
        <Card className="flex-1 p-6">
          <h3 className="text-lg font-medium mb-2">Monthly Net Profit</h3>
          <div className="text-2xl font-bold">
            {data?.netProfit?.toFixed(2) || 0}
          </div>
        </Card>
        <Card className="flex-1 p-6 bg-yellow-100 text-yellow-800">
          <h3 className="text-lg font-medium mb-2">Low Stock Alerts</h3>
          <div>See Warehouse</div>
        </Card>
      </div>
      <div className="mb-6">
        <label className="block mb-2 font-medium">Date Range</label>
        <input
          type="date"
          value={dateRange.start}
          onChange={(e) =>
            setDateRange({ ...dateRange, start: e.target.value })
          }
          className="border rounded px-2 py-1 mr-2"
        />
        <input
          type="date"
          value={dateRange.end}
          onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
          className="border rounded px-2 py-1"
        />
      </div>
      <Card className="p-6 h-80 flex items-center justify-center">
        {/* <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data?.salesChartData || []}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="sales" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer> */}
        <span className="text-gray-500">Sales Chart (Coming Soon)</span>
      </Card>
    </div>
  );
};

export default Dashboard;
