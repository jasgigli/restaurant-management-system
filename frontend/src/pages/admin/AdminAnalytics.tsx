import {
  BarChart3,
  DollarSign,
  Package,
  ShoppingCart,
  TrendingUp,
  Users,
} from "lucide-react";

const AdminAnalytics = () => {
  const analyticsData = {
    totalRevenue: 125000,
    totalOrders: 1247,
    totalCustomers: 892,
    totalProducts: 156,
    monthlyGrowth: 12.5,
    averageOrderValue: 100.25,
  };

  const chartData = [
    { month: "Jan", revenue: 45000, orders: 320 },
    { month: "Feb", revenue: 52000, orders: 380 },
    { month: "Mar", revenue: 48000, orders: 350 },
    { month: "Apr", revenue: 61000, orders: 420 },
    { month: "May", revenue: 55000, orders: 390 },
    { month: "Jun", revenue: 68000, orders: 450 },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Analytics Dashboard
          </h1>
          <p className="text-gray-600 mt-2">
            Comprehensive business insights and performance metrics
          </p>
        </div>
        <div className="flex items-center gap-3">
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent">
            <option>Last 30 Days</option>
            <option>Last 90 Days</option>
            <option>Last 6 Months</option>
            <option>Last Year</option>
          </select>
          <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
            Export Report
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-900">
                ${analyticsData.totalRevenue.toLocaleString()}
              </p>
              <p className="text-sm text-green-600 flex items-center gap-1 mt-1">
                <TrendingUp size={14} />+{analyticsData.monthlyGrowth}%
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Orders</p>
              <p className="text-2xl font-bold text-gray-900">
                {analyticsData.totalOrders.toLocaleString()}
              </p>
              <p className="text-sm text-blue-600 flex items-center gap-1 mt-1">
                <TrendingUp size={14} />
                +8.2%
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <ShoppingCart className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Total Customers
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {analyticsData.totalCustomers.toLocaleString()}
              </p>
              <p className="text-sm text-purple-600 flex items-center gap-1 mt-1">
                <TrendingUp size={14} />
                +15.3%
              </p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Total Products
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {analyticsData.totalProducts}
              </p>
              <p className="text-sm text-orange-600 flex items-center gap-1 mt-1">
                <TrendingUp size={14} />
                +5.7%
              </p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <Package className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Avg Order Value
              </p>
              <p className="text-2xl font-bold text-gray-900">
                ${analyticsData.averageOrderValue}
              </p>
              <p className="text-sm text-indigo-600 flex items-center gap-1 mt-1">
                <TrendingUp size={14} />
                +3.1%
              </p>
            </div>
            <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-indigo-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Conversion Rate
              </p>
              <p className="text-2xl font-bold text-gray-900">4.2%</p>
              <p className="text-sm text-teal-600 flex items-center gap-1 mt-1">
                <TrendingUp size={14} />
                +1.8%
              </p>
            </div>
            <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-teal-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Revenue Trend
          </h3>
          <div className="h-64 flex items-end justify-between gap-2">
            {chartData.map((data, index) => (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div
                  className="w-full bg-gradient-to-t from-purple-600 to-purple-400 rounded-t-lg transition-all hover:from-purple-700 hover:to-purple-500"
                  style={{ height: `${(data.revenue / 70000) * 200}px` }}
                ></div>
                <p className="text-xs text-gray-600 mt-2">{data.month}</p>
                <p className="text-xs font-medium text-gray-900">
                  ${(data.revenue / 1000).toFixed(0)}k
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Orders Chart */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Orders Trend
          </h3>
          <div className="h-64 flex items-end justify-between gap-2">
            {chartData.map((data, index) => (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div
                  className="w-full bg-gradient-to-t from-blue-600 to-blue-400 rounded-t-lg transition-all hover:from-blue-700 hover:to-blue-500"
                  style={{ height: `${(data.orders / 500) * 200}px` }}
                ></div>
                <p className="text-xs text-gray-600 mt-2">{data.month}</p>
                <p className="text-xs font-medium text-gray-900">
                  {data.orders}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Recent Activity
        </h3>
        <div className="space-y-4">
          {[
            {
              action: "New order received",
              time: "2 minutes ago",
              type: "order",
            },
            {
              action: "Inventory updated",
              time: "15 minutes ago",
              type: "inventory",
            },
            {
              action: "New customer registered",
              time: "1 hour ago",
              type: "customer",
            },
            {
              action: "Payment processed",
              time: "2 hours ago",
              type: "payment",
            },
            {
              action: "Staff clocked in",
              time: "3 hours ago",
              type: "staff",
            },
          ].map((activity, index) => (
            <div
              key={index}
              className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
            >
              <div
                className={`w-3 h-3 rounded-full ${
                  activity.type === "order"
                    ? "bg-green-500"
                    : activity.type === "inventory"
                    ? "bg-blue-500"
                    : activity.type === "customer"
                    ? "bg-purple-500"
                    : activity.type === "payment"
                    ? "bg-yellow-500"
                    : "bg-gray-500"
                }`}
              ></div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">
                  {activity.action}
                </p>
                <p className="text-xs text-gray-500">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminAnalytics;
