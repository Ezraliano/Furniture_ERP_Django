import React from 'react';
import DataTable from '../common/DataTable';
import { suppliers, purchaseOrders } from '../../data/mockData';
import { Plus, Truck, Star } from 'lucide-react';

const statusBadges = {
  draft: 'bg-gray-100 text-gray-800',
  sent: 'bg-blue-100 text-blue-800',
  confirmed: 'bg-green-100 text-green-800',
  delivered: 'bg-purple-100 text-purple-800',
  cancelled: 'bg-red-100 text-red-800'
};

export default function Suppliers() {
  const supplierColumns = [
    { key: 'name', label: 'Supplier Name', sortable: true },
    { key: 'contactPerson', label: 'Contact Person', sortable: true },
    { key: 'email', label: 'Email', sortable: true },
    { key: 'phone', label: 'Phone', sortable: true },
    {
      key: 'rating',
      label: 'Rating',
      sortable: true,
      render: (value: number) => (
        <div className="flex items-center">
          <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
          <span>{value}</span>
        </div>
      )
    },
    {
      key: 'materialsSupplied',
      label: 'Materials',
      render: (value: string[]) => (
        <div className="flex flex-wrap gap-1">
          {value.slice(0, 2).map((material, index) => (
            <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
              {material}
            </span>
          ))}
          {value.length > 2 && (
            <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
              +{value.length - 2} more
            </span>
          )}
        </div>
      )
    }
  ];

  const purchaseOrderColumns = [
    { key: 'id', label: 'PO ID', sortable: true },
    { key: 'supplierName', label: 'Supplier', sortable: true },
    { 
      key: 'totalAmount', 
      label: 'Amount', 
      sortable: true,
      render: (value: number) => `$${value.toLocaleString()}`
    },
    { 
      key: 'status', 
      label: 'Status', 
      sortable: true,
      render: (value: string) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${statusBadges[value as keyof typeof statusBadges]}`}>
          {value}
        </span>
      )
    },
    { key: 'orderDate', label: 'Order Date', sortable: true },
    { key: 'expectedDelivery', label: 'Expected Delivery', sortable: true }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Supplier Management</h2>
          <p className="text-gray-600 mt-1">Manage suppliers and purchase orders</p>
        </div>
        <div className="flex space-x-3">
          <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium flex items-center transition-colors">
            <Plus className="h-4 w-4 mr-2" />
            New Purchase Order
          </button>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium flex items-center transition-colors">
            <Plus className="h-4 w-4 mr-2" />
            Add Supplier
          </button>
        </div>
      </div>

      {/* Supplier Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center">
            <Truck className="h-8 w-8 text-blue-600 mr-3" />
            <div>
              <div className="text-2xl font-bold text-gray-900">{suppliers.length}</div>
              <div className="text-sm text-gray-600">Active Suppliers</div>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="text-2xl font-bold text-green-600">{purchaseOrders.length}</div>
          <div className="text-sm text-gray-600">Purchase Orders</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="text-2xl font-bold text-blue-600">
            {purchaseOrders.filter(po => po.status === 'confirmed').length}
          </div>
          <div className="text-sm text-gray-600">Confirmed Orders</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="text-2xl font-bold text-purple-600">
            ${purchaseOrders.reduce((sum, po) => sum + po.totalAmount, 0).toLocaleString()}
          </div>
          <div className="text-sm text-gray-600">Total PO Value</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            <button className="py-4 text-sm font-medium border-b-2 border-blue-500 text-blue-600">
              Suppliers ({suppliers.length})
            </button>
            <button className="py-4 text-sm font-medium border-b-2 border-transparent text-gray-500 hover:text-gray-700">
              Purchase Orders ({purchaseOrders.length})
            </button>
          </nav>
        </div>

        <div className="p-6">
          <DataTable 
            data={suppliers} 
            columns={supplierColumns} 
            searchable={true}
            pagination={true}
            pageSize={10}
          />
        </div>
      </div>

      {/* Recent Purchase Orders */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Recent Purchase Orders</h3>
        <DataTable 
          data={purchaseOrders} 
          columns={purchaseOrderColumns} 
          searchable={false}
          pagination={false}
        />
      </div>
    </div>
  );
}