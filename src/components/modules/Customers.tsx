import React from 'react';
import DataTable from '../common/DataTable';
import { customers } from '../../data/mockData';
import { Plus, Users, Phone, Mail } from 'lucide-react';

export default function Customers() {
  const columns = [
    { key: 'name', label: 'Customer Name', sortable: true },
    { 
      key: 'email', 
      label: 'Email', 
      sortable: true,
      render: (value: string) => (
        <div className="flex items-center">
          <Mail className="h-4 w-4 text-gray-400 mr-2" />
          <a href={`mailto:${value}`} className="text-blue-600 hover:underline">
            {value}
          </a>
        </div>
      )
    },
    { 
      key: 'phone', 
      label: 'Phone', 
      sortable: true,
      render: (value: string) => (
        <div className="flex items-center">
          <Phone className="h-4 w-4 text-gray-400 mr-2" />
          {value}
        </div>
      )
    },
    { key: 'totalOrders', label: 'Total Orders', sortable: true },
    { 
      key: 'totalSpent', 
      label: 'Total Spent', 
      sortable: true,
      render: (value: number) => `$${value.toLocaleString()}`
    },
    { key: 'lastOrderDate', label: 'Last Order', sortable: true },
    {
      key: 'preferences',
      label: 'Preferences',
      render: (value?: string[]) => (
        <div className="flex flex-wrap gap-1">
          {value?.slice(0, 2).map((pref, index) => (
            <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
              {pref}
            </span>
          ))}
          {value && value.length > 2 && (
            <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
              +{value.length - 2} more
            </span>
          )}
        </div>
      )
    }
  ];

  const totalCustomers = customers.length;
  const totalRevenue = customers.reduce((sum, customer) => sum + customer.totalSpent, 0);
  const averageOrderValue = totalRevenue / customers.reduce((sum, customer) => sum + customer.totalOrders, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Customer Management</h2>
          <p className="text-gray-600 mt-1">Manage customer relationships and data</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium flex items-center transition-colors">
          <Plus className="h-4 w-4 mr-2" />
          Add Customer
        </button>
      </div>

      {/* Customer Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center">
            <Users className="h-8 w-8 text-blue-600 mr-3" />
            <div>
              <div className="text-2xl font-bold text-gray-900">{totalCustomers}</div>
              <div className="text-sm text-gray-600">Total Customers</div>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="text-2xl font-bold text-green-600">${totalRevenue.toLocaleString()}</div>
          <div className="text-sm text-gray-600">Total Revenue</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="text-2xl font-bold text-purple-600">${Math.round(averageOrderValue).toLocaleString()}</div>
          <div className="text-sm text-gray-600">Avg Order Value</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="text-2xl font-bold text-yellow-600">
            {customers.reduce((sum, customer) => sum + customer.totalOrders, 0)}
          </div>
          <div className="text-sm text-gray-600">Total Orders</div>
        </div>
      </div>

      {/* Top Customers */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Top Customers</h3>
        <div className="space-y-4">
          {customers
            .sort((a, b) => b.totalSpent - a.totalSpent)
            .slice(0, 5)
            .map((customer) => (
              <div key={customer.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h4 className="font-medium text-gray-900">{customer.name}</h4>
                  <p className="text-sm text-gray-600">{customer.email}</p>
                </div>
                <div className="text-right">
                  <div className="text-lg font-semibold text-green-600">
                    ${customer.totalSpent.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-600">
                    {customer.totalOrders} orders
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>

      <DataTable 
        data={customers} 
        columns={columns} 
        searchable={true}
        pagination={true}
        pageSize={10}
      />
    </div>
  );
}