import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { FileText, Download, Calendar, TrendingUp } from 'lucide-react';

const salesReportData = [
  { month: 'Jan', sales: 45000, orders: 28, customers: 15 },
  { month: 'Feb', sales: 52000, orders: 32, customers: 18 },
  { month: 'Mar', sales: 48000, orders: 29, customers: 16 },
  { month: 'Apr', sales: 61000, orders: 38, customers: 22 },
  { month: 'May', sales: 55000, orders: 34, customers: 19 },
  { month: 'Jun', sales: 67000, orders: 42, customers: 25 },
];

const productPerformance = [
  { product: 'Executive Desk', sales: 25, revenue: 30000 },
  { product: 'Ergonomic Chair', sales: 45, revenue: 20250 },
  { product: 'Conference Table', sales: 8, revenue: 20000 },
  { product: 'Filing Cabinet', sales: 15, revenue: 12000 },
  { product: 'Bookshelf', sales: 22, revenue: 11000 },
];

const inventoryStatus = [
  { name: 'In Stock', value: 65, color: '#10B981' },
  { name: 'Low Stock', value: 25, color: '#F59E0B' },
  { name: 'Out of Stock', value: 10, color: '#EF4444' },
];

export default function Reports() {
  const [selectedReport, setSelectedReport] = useState('sales');
  const [dateRange, setDateRange] = useState('6months');

  const reportTypes = [
    { id: 'sales', name: 'Sales Report', icon: TrendingUp },
    { id: 'inventory', name: 'Inventory Report', icon: FileText },
    { id: 'production', name: 'Production Report', icon: Calendar },
    { id: 'financial', name: 'Financial Report', icon: Download },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Reports & Analytics</h2>
          <p className="text-gray-600 mt-1">Generate and view comprehensive business reports</p>
        </div>
        <div className="flex space-x-3">
          <select 
            value={dateRange} 
            onChange={(e) => setDateRange(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="1month">Last Month</option>
            <option value="3months">Last 3 Months</option>
            <option value="6months">Last 6 Months</option>
            <option value="1year">Last Year</option>
          </select>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium flex items-center transition-colors">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </button>
        </div>
      </div>

      {/* Report Type Selection */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {reportTypes.map((report) => {
          const Icon = report.icon;
          return (
            <button
              key={report.id}
              onClick={() => setSelectedReport(report.id)}
              className={`p-4 rounded-lg border-2 transition-all ${
                selectedReport === report.id
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-200 bg-white hover:border-gray-300'
              }`}
            >
              <Icon className="h-6 w-6 mx-auto mb-2" />
              <div className="text-sm font-medium">{report.name}</div>
            </button>
          );
        })}
      </div>

      {/* Sales Report */}
      {selectedReport === 'sales' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Sales Trend</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={salesReportData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip />
                  <Line type="monotone" dataKey="sales" stroke="#3B82F6" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Order Volume</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={salesReportData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip />
                  <Bar dataKey="orders" fill="#10B981" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Product Performance</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Units Sold</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Revenue</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Performance</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {productPerformance.map((product, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {product.product}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {product.sales}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        ${product.revenue.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-full bg-gray-200 rounded-full h-2 mr-2">
                            <div 
                              className="bg-blue-600 h-2 rounded-full" 
                              style={{ width: `${(product.sales / 50) * 100}%` }}
                            ></div>
                          </div>
                          <span className="text-sm text-gray-600">{Math.round((product.sales / 50) * 100)}%</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Inventory Report */}
      {selectedReport === 'inventory' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Inventory Status Distribution</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={inventoryStatus}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {inventoryStatus.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="grid grid-cols-1 gap-2 mt-4">
                {inventoryStatus.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div 
                        className="w-3 h-3 rounded-full mr-2" 
                        style={{ backgroundColor: item.color }}
                      ></div>
                      <span className="text-sm text-gray-600">{item.name}</span>
                    </div>
                    <span className="text-sm font-medium text-gray-900">{item.value}%</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Stock Level Alerts</h3>
              <div className="space-y-4">
                <div className="p-3 bg-red-50 border-l-4 border-red-400 rounded-r-lg">
                  <div className="flex items-center">
                    <div className="ml-3">
                      <p className="text-sm font-medium text-red-800">Conference Table</p>
                      <p className="text-sm text-red-700">Out of stock - 0 units remaining</p>
                    </div>
                  </div>
                </div>
                <div className="p-3 bg-yellow-50 border-l-4 border-yellow-400 rounded-r-lg">
                  <div className="flex items-center">
                    <div className="ml-3">
                      <p className="text-sm font-medium text-yellow-800">Ergonomic Chair</p>
                      <p className="text-sm text-yellow-700">Low stock - 3 units remaining</p>
                    </div>
                  </div>
                </div>
                <div className="p-3 bg-yellow-50 border-l-4 border-yellow-400 rounded-r-lg">
                  <div className="flex items-center">
                    <div className="ml-3">
                      <p className="text-sm font-medium text-yellow-800">Oak Wood Planks</p>
                      <p className="text-sm text-yellow-700">Low stock - 125 board feet remaining</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Production Report */}
      {selectedReport === 'production' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Production Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">23</div>
              <div className="text-sm text-gray-600">Active Work Orders</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">18</div>
              <div className="text-sm text-gray-600">Completed This Month</div>
            </div>
            <div className="text-center p-4 bg-yellow-50 rounded-lg">
              <div className="text-2xl font-bold text-yellow-600">75%</div>
              <div className="text-sm text-gray-600">Average Efficiency</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">2.5</div>
              <div className="text-sm text-gray-600">Avg Days per Order</div>
            </div>
          </div>
          <p className="text-gray-600">Production report features would include detailed analytics on work order completion times, efficiency metrics, and resource utilization.</p>
        </div>
      )}

      {/* Financial Report */}
      {selectedReport === 'financial' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Financial Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">$327K</div>
              <div className="text-sm text-gray-600">Total Revenue</div>
            </div>
            <div className="text-center p-4 bg-red-50 rounded-lg">
              <div className="text-2xl font-bold text-red-600">$185K</div>
              <div className="text-sm text-gray-600">Total Expenses</div>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">$142K</div>
              <div className="text-sm text-gray-600">Net Profit</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">43.4%</div>
              <div className="text-sm text-gray-600">Profit Margin</div>
            </div>
          </div>
          <p className="text-gray-600">Financial reports would include detailed profit & loss statements, cash flow analysis, and budget vs. actual comparisons.</p>
        </div>
      )}
    </div>
  );
}