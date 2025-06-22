import React from 'react';
import { 
  LayoutDashboard, 
  ShoppingCart, 
  Package, 
  Factory, 
  Truck, 
  DollarSign, 
  Users, 
  UserCheck, 
  BarChart3,
  Settings,
  LogOut
} from 'lucide-react';

interface SidebarProps {
  currentModule: string;
  onModuleChange: (module: string) => void;
  user: any;
}

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'orders', label: 'Orders', icon: ShoppingCart },
  { id: 'inventory', label: 'Inventory', icon: Package },
  { id: 'production', label: 'Production', icon: Factory },
  { id: 'suppliers', label: 'Suppliers', icon: Truck },
  { id: 'finance', label: 'Finance', icon: DollarSign },
  { id: 'customers', label: 'Customers', icon: Users },
  { id: 'hr', label: 'HR', icon: UserCheck },
  { id: 'reports', label: 'Reports', icon: BarChart3 },
];

export default function Sidebar({ currentModule, onModuleChange, user }: SidebarProps) {
  return (
    <div className="bg-slate-900 text-white w-64 min-h-screen flex flex-col">
      <div className="p-6 border-b border-slate-700">
        <h1 className="text-xl font-bold">FurnitureERP</h1>
        <p className="text-slate-400 text-sm mt-1">Enterprise System</p>
      </div>

      <nav className="flex-1 p-4">
        <div className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentModule === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => onModuleChange(item.id)}
                className={`w-full flex items-center px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <Icon className="h-5 w-5 mr-3" />
                {item.label}
              </button>
            );
          })}
        </div>
      </nav>

      <div className="p-4 border-t border-slate-700">
        <div className="flex items-center mb-4">
          <img
            src={user.avatar}
            alt={user.name}
            className="w-10 h-10 rounded-full mr-3"
          />
          <div>
            <p className="font-medium text-sm">{user.name}</p>
            <p className="text-slate-400 text-xs capitalize">{user.role}</p>
          </div>
        </div>
        
        <div className="flex space-x-2">
          <button className="flex-1 flex items-center justify-center px-3 py-2 text-sm bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors">
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </button>
          <button className="flex items-center justify-center px-3 py-2 text-sm bg-red-600 hover:bg-red-700 rounded-lg transition-colors">
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}