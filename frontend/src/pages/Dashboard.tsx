import { useGetNetProfitReport } from "../hooks/useReports";

const today = new Date().toISOString().slice(0, 10);
const monthStart = new Date(new Date().getFullYear(), new Date().getMonth(), 1)
  .toISOString()
  .slice(0, 10);

const Dashboard = () => {
  const { data, isLoading } = useGetNetProfitReport(monthStart, today);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <h1>Dashboard</h1>
      <div style={{ display: "flex", gap: 24, marginBottom: 32 }}>
        <div
          style={{
            background: "#f5f5f5",
            padding: 24,
            borderRadius: 8,
            minWidth: 200,
          }}
        >
          <h3>Today's Sales</h3>
          <div style={{ fontSize: 24, fontWeight: "bold" }}>
            {data?.totalSales?.toFixed(2) || 0}
          </div>
        </div>
        <div
          style={{
            background: "#f5f5f5",
            padding: 24,
            borderRadius: 8,
            minWidth: 200,
          }}
        >
          <h3>Monthly Net Profit</h3>
          <div style={{ fontSize: 24, fontWeight: "bold" }}>
            {data?.netProfit?.toFixed(2) || 0}
          </div>
        </div>
        <div
          style={{
            background: "#fff3cd",
            padding: 24,
            borderRadius: 8,
            minWidth: 200,
            color: "#856404",
          }}
        >
          <h3>Low Stock Alerts</h3>
          <div>See Warehouse</div>
        </div>
      </div>
      <div style={{ marginTop: 32 }}>
        {/* Chart placeholder - add recharts or similar for real charts */}
        <div
          style={{
            height: 300,
            background: "#e9ecef",
            borderRadius: 8,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span>Sales Chart (Coming Soon)</span>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
