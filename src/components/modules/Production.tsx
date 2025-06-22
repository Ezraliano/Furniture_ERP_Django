import React from 'react';
import DataTable from '../common/DataTable';
import { workOrders } from '../../data/mockData';
import { Plus, Factory, Clock, CheckCircle } from 'lucide-react';

const statusBadges = {
  pending: 'bg-yellow-100 text-yellow-800',
  'in-progress': 'bg-blue-100 text-blue-800',
  completed: 'bg-green-100 text-green-800',
  'on-hold': 'bg-red-100 text-red-800'
};

export default function Production() {
  const columns = [
    { key: 'id', label: 'Work Order ID', sortable: true },
    { key: 'orderId', label: 'Order ID', sortable: true },
    { key: 'productName', label: 'Product', sortable: true },
    { key: 'quantity', label: 'Quantity', sortable: true },
    { 
      key: 'status', 
      label: 'Status', 
      sortable: true,
      render: (value: string) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${statusBadges[value as keyof typeof statusBadges]}`}>
          {value.replace('-', ' ')}
        </span>
      )
    },
    { key: 'startDate', label: 'Start Date', sortable: true },
    { key: 'expectedCompletion', label: 'Expected Completion', sortable: true },
    {
      key: 'progress',
      label: 'Progress',
      render: (value: number) => (
        <div className="flex items-center">
          <div className="w-full bg-gray-200 rounded-full h-2 mr-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${value}%` }}
            ></div>
          </div>
          <span className="text-sm text-gray-600 min-w-0">{value}%</span>
        </div>
      )
    }
  ];

  const pendingOrders = workOrders.filter(wo => wo.status === 'pending').length;
  const inProgressOrders = workOrders.filter(wo => wo.status === 'in-progress').length;
  const completedOrders = workOrders.filter(wo => wo.status === 'completed').length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Production Management</h2>
          <p className="text-gray-600 mt-1">Monitor and manage production work orders</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium flex items-center transition-colors">
          <Plus className="h-4 w-4 mr-2" />
          New Work Order
        </button>
      </div>

      {/* Production Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center">
            <Factory className="h-8 w-8 text-blue-600 mr-3" />
            <div>
              <div className="text-2xl font-bold text-gray-900">{workOrders.length}</div>
              <div className="text-sm text-gray-600">Total Work Orders</div>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center">
            <Clock className="h-8 w-8 text-yellow-600 mr-3" />
            <div>
              <div className="text-2xl font-bold text-yellow-600">{pendingOrders}</div>
              <div className="text-sm text-gray-600">Pending</div>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="text-2xl font-bold text-blue-600">{inProgressOrders}</div>
          <div className="text-sm text-gray-600">In Progress</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center">
            <CheckCircle className="h-8 w-8 text-green-600 mr-3" />
            <div>
              <div className="text-2xl font-bold text-green-600">{completedOrders}</div>
              <div className="text-sm text-gray-600">Completed</div>
            </div>
          </div>
        </div>
      </div>

      {/* Production Schedule */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Production Schedule</h3>
        <div className="space-y-4">
          {workOrders.filter(wo => wo.status !== 'completed').map((workOrder) => (
            <div key={workOrder.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-3">
                  <h4 className="font-medium text-gray-900">{workOrder.id}</h4>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${statusBadges[workOrder.status as keyof typeof statusBadges]}`}>
                    {workOrder.status.replace('-', ' ')}
                  </span>
                </div>
                <div className="text-sm text-gray-600">
                  Due: {workOrder.expectedCompletion}
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{workOrder.productName} (Qty: {workOrder.quantity})</p>
                  <p className="text-xs text-gray-500 mt-1">Order: {workOrder.orderId}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${workOrder.progress}%` }}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-600 min-w-0">{workOrder.progress}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <DataTable 
        data={workOrders} 
        columns={columns} 
        searchable={true}
        pagination={true}
        pageSize={10}
      />
    </div>
  );
}