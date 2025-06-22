import React, { useState } from 'react';
import Sidebar from './components/common/Sidebar';
import Header from './components/common/Header';
import Dashboard from './components/modules/Dashboard';
import Orders from './components/modules/Orders';
import Inventory from './components/modules/Inventory';
import Production from './components/modules/Production';
import Suppliers from './components/modules/Suppliers';
import Finance from './components/modules/Finance';
import Customers from './components/modules/Customers';
import HR from './components/modules/HR';
import Reports from './components/modules/Reports';
import { currentUser } from './data/mockData';

const moduleComponents = {
  dashboard: Dashboard,
  orders: Orders,
  inventory: Inventory,
  production: Production,
  suppliers: Suppliers,
  finance: Finance,
  customers: Customers,
  hr: HR,
  reports: Reports,
};

const moduleTitles = {
  dashboard: 'Dashboard',
  orders: 'Order Management',
  inventory: 'Inventory Management',
  production: 'Production Management',
  suppliers: 'Supplier Management',
  finance: 'Finance & Accounting',
  customers: 'Customer Management',
  hr: 'Human Resources',
  reports: 'Reports & Analytics',
};

const moduleSubtitles = {
  dashboard: 'Overview of your business operations',
  orders: 'Manage customer orders and tracking',
  inventory: 'Track products and materials',
  production: 'Monitor manufacturing processes',
  suppliers: 'Manage suppliers and purchase orders',
  finance: 'Financial overview and transactions',
  customers: 'Customer relationship management',
  hr: 'Employee management and records',
  reports: 'Business analytics and reporting',
};

function App() {
  const [currentModule, setCurrentModule] = useState('dashboard');

  const ActiveComponent = moduleComponents[currentModule as keyof typeof moduleComponents];

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar 
        currentModule={currentModule}
        onModuleChange={setCurrentModule}
        user={currentUser}
      />
      
      <div className="flex-1 flex flex-col">
        <Header 
          title={moduleTitles[currentModule as keyof typeof moduleTitles]}
          subtitle={moduleSubtitles[currentModule as keyof typeof moduleSubtitles]}
        />
        
        <main className="flex-1 p-6 overflow-auto">
          <ActiveComponent />
        </main>
      </div>
    </div>
  );
}

export default App;