import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import StatCard from '../common/StatCard';
import { ShoppingCart, Package, Factory, DollarSign, TrendingUp, AlertTriangle } from 'lucide-react';

const salesData = [
  { month: 'Jan', sales: 45000, orders: 28 },
  { month: 'Feb', sales: 52000, orders: 32 },
  { month: 'Mar', sales: 48000, orders: 29 },
  { month: 'Apr', sales: 61000, orders: 38 },
  { month: 'May', sales: 55000, orders: 34 },
  { month: 'Jun', sales: 67000, orders: 42 },
];

const productionData = [
  { name: 'Desks', value: 45, color: '#3B82F6' },
  { name: 'Chairs', value: 30, color: '#10B981' },
  { name: 'Tables', value: 15, color: '#F59E0B' },
  { name: 'Cabinets', value: 10, color: '#EF4444' },
];

const recentActivities = [
  { id: 1, type: 'order', message: 'New order ORD-004 received from Comfort Solutions', time: '5 minutes ago' },
  { id: 2, type: 'production', message: 'Work order WO-001 completed - 5 Executive Desks', time: '15 minutes ago' },
  { id: 3, type: 'inventory', message: 'Low stock alert: Ergonomic Chairs (3 remaining)', time: '1 hour ago' },
  { id: 4, type: 'supplier', message: 'Purchase order PO-003 delivered by Premium Wood', time: '2 hours ago' },
];

export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Orders"
          value="156"
          change="+12% from last month"
          changeType="positive"
          icon={ShoppingCart}
          color="blue"
        />
        <StatCard
          title="Products in Stock"
          value="1,234"
          change="18 low stock items"
          changeType="negative"
          icon={Package}
          color="green"
        />
        <StatCard
          title="Active Work Orders"
          value="23"
          change="+3 from yesterday"
          changeType="positive"
          icon={Factory}
          color="yellow"
        />
        <StatCard
          title="Monthly Revenue"
          value="$67,420"
          change="+15.3% from last month"
          changeType="positive"
          icon={DollarSign}
          color="purple"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Trend Chart */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Sales Overview</h3>
            <div className="flex items-center text-green-600">
              <TrendingUp className="h-4 w-4 mr-1" />
              <span className="text-sm font-medium">+15.3%</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="sales" 
                stroke="#3B82F6" 
                strokeWidth={3}
                dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Production Distribution */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Production Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={productionData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {productionData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-4 mt-4">
            {productionData.map((item, index) => (
              <div key={index} className="flex items-center">
                <div 
                  className="w-3 h-3 rounded-full mr-2" 
                  style={{ backgroundColor: item.color }}
                ></div>
                <span className="text-sm text-gray-600">{item.name}: {item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activities & Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activities */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Recent Activities</h3>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className="flex-shrink-0">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900">{activity.message}</p>
                  <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions & Alerts */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Quick Actions</h3>
          <div className="space-y-4">
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg font-medium transition-colors">
              Create New Order
            </button>
            <button className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-lg font-medium transition-colors">
              Add Work Order
            </button>
            <button className="w-full bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-3 rounded-lg font-medium transition-colors">
              Purchase Order
            </button>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="flex items-center mb-4">
              <AlertTriangle className="h-5 w-5 text-yellow-500 mr-2" />
              <h4 className="font-medium text-gray-900">Alerts</h4>
            </div>
            <div className="space-y-2">
              <div className="p-3 bg-yellow-50 border-l-4 border-yellow-400 rounded-r-lg">
                <p className="text-sm text-yellow-800">3 products below minimum stock level</p>
              </div>
              <div className="p-3 bg-red-50 border-l-4 border-red-400 rounded-r-lg">
                <p className="text-sm text-red-800">2 orders overdue for delivery</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}