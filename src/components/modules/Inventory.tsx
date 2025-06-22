import React, { useState } from 'react';
import DataTable from '../common/DataTable';
import { products, materials } from '../../data/mockData';
import { Plus, Package, AlertTriangle } from 'lucide-react';

const stockStatusBadges = {
  'in-stock': 'bg-green-100 text-green-800',
  'low-stock': 'bg-yellow-100 text-yellow-800',
  'out-of-stock': 'bg-red-100 text-red-800'
};

export default function Inventory() {
  const [activeTab, setActiveTab] = useState<'products' | 'materials'>('products');

  const productColumns = [
    { key: 'sku', label: 'SKU', sortable: true },
    { key: 'name', label: 'Product Name', sortable: true },
    { key: 'category', label: 'Category', sortable: true },
    { 
      key: 'stockQuantity', 
      label: 'Stock', 
      sortable: true,
      render: (value: number, row: any) => (
        <div className="flex items-center">
          <span className="mr-2">{value}</span>
          {value <= row.minStockLevel && (
            <AlertTriangle className="h-4 w-4 text-yellow-500" />
          )}
        </div>
      )
    },
    { key: 'minStockLevel', label: 'Min Level', sortable: true },
    { 
      key: 'unitPrice', 
      label: 'Unit Price', 
      sortable: true,
      render: (value: number) => `$${value.toLocaleString()}`
    },
    { key: 'location', label: 'Location', sortable: true },
    { 
      key: 'status', 
      label: 'Status', 
      sortable: true,
      render: (value: string) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${stockStatusBadges[value as keyof typeof stockStatusBadges]}`}>
          {value.replace('-', ' ')}
        </span>
      )
    }
  ];

  const materialColumns = [
    { key: 'name', label: 'Material Name', sortable: true },
    { 
      key: 'type', 
      label: 'Type', 
      sortable: true,
      render: (value: string) => (
        <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 capitalize">
          {value}
        </span>
      )
    },
    { 
      key: 'stockQuantity', 
      label: 'Stock', 
      sortable: true,
      render: (value: number, row: any) => `${value} ${row.unit}`
    },
    { 
      key: 'unitCost', 
      label: 'Unit Cost', 
      sortable: true,
      render: (value: number) => `$${value.toFixed(2)}`
    },
    { key: 'location', label: 'Location', sortable: true }
  ];

  const lowStockProducts = products.filter(p => p.stockQuantity <= p.minStockLevel);
  const outOfStockProducts = products.filter(p => p.status === 'out-of-stock');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Inventory Management</h2>
          <p className="text-gray-600 mt-1">Track products and materials stock levels</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium flex items-center transition-colors">
          <Plus className="h-4 w-4 mr-2" />
          Add Item
        </button>
      </div>

      {/* Inventory Alerts */}
      {(lowStockProducts.length > 0 || outOfStockProducts.length > 0) && (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg">
          <div className="flex items-center">
            <AlertTriangle className="h-5 w-5 text-yellow-400 mr-2" />
            <div>
              <p className="text-sm font-medium text-yellow-800">Inventory Alerts</p>
              <p className="text-sm text-yellow-700 mt-1">
                {lowStockProducts.length} items are running low on stock
                {outOfStockProducts.length > 0 && `, ${outOfStockProducts.length} items are out of stock`}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Inventory Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center">
            <Package className="h-8 w-8 text-blue-600 mr-3" />
            <div>
              <div className="text-2xl font-bold text-gray-900">{products.length}</div>
              <div className="text-sm text-gray-600">Total Products</div>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="text-2xl font-bold text-green-600">
            {products.filter(p => p.status === 'in-stock').length}
          </div>
          <div className="text-sm text-gray-600">In Stock</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="text-2xl font-bold text-yellow-600">{lowStockProducts.length}</div>
          <div className="text-sm text-gray-600">Low Stock</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="text-2xl font-bold text-red-600">{outOfStockProducts.length}</div>
          <div className="text-sm text-gray-600">Out of Stock</div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            <button
              onClick={() => setActiveTab('products')}
              className={`py-4 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'products'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Products ({products.length})
            </button>
            <button
              onClick={() => setActiveTab('materials')}
              className={`py-4 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'materials'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Materials ({materials.length})
            </button>
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'products' ? (
            <DataTable 
              data={products} 
              columns={productColumns} 
              searchable={true}
              pagination={true}
              pageSize={10}
            />
          ) : (
            <DataTable 
              data={materials} 
              columns={materialColumns} 
              searchable={true}
              pagination={true}
              pageSize={10}
            />
          )}
        </div>
      </div>
    </div>
  );
}