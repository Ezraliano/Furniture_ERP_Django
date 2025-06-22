import { User, Order, Product, Material, Supplier, PurchaseOrder, WorkOrder, Customer, Employee, Transaction } from '../types';

export const currentUser: User = {
  id: '1',
  name: 'Sarah Johnson',
  email: 'sarah@furnitureplus.com',
  role: 'admin',
  avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
};

export const orders: Order[] = [
  {
    id: 'ORD-001',
    customerId: 'CUST-001',
    customerName: 'Modern Living Corp',
    items: [
      { id: '1', productId: 'PROD-001', productName: 'Executive Desk', quantity: 5, unitPrice: 1200, specifications: 'Mahogany wood, L-shape' }
    ],
    status: 'processing',
    totalAmount: 6000,
    orderDate: '2024-01-15',
    deliveryDate: '2024-02-15',
    isCustom: true
  },
  {
    id: 'ORD-002',
    customerId: 'CUST-002',
    customerName: 'Home Comfort Inc',
    items: [
      { id: '2', productId: 'PROD-002', productName: 'Ergonomic Chair', quantity: 20, unitPrice: 450 }
    ],
    status: 'production',
    totalAmount: 9000,
    orderDate: '2024-01-12',
    deliveryDate: '2024-01-28',
    isCustom: false
  },
  {
    id: 'ORD-003',
    customerId: 'CUST-003',
    customerName: 'Office Solutions Ltd',
    items: [
      { id: '3', productId: 'PROD-003', productName: 'Conference Table', quantity: 2, unitPrice: 2500 }
    ],
    status: 'ready',
    totalAmount: 5000,
    orderDate: '2024-01-10',
    isCustom: false
  }
];

export const products: Product[] = [
  {
    id: 'PROD-001',
    name: 'Executive Desk',
    sku: 'FU-DESK-001',
    category: 'Desks',
    stockQuantity: 15,
    minStockLevel: 5,
    unitPrice: 1200,
    location: 'Warehouse A-1',
    status: 'in-stock'
  },
  {
    id: 'PROD-002',
    name: 'Ergonomic Chair',
    sku: 'FU-CHAIR-001',
    category: 'Chairs',
    stockQuantity: 3,
    minStockLevel: 10,
    unitPrice: 450,
    location: 'Warehouse A-2',
    status: 'low-stock'
  },
  {
    id: 'PROD-003',
    name: 'Conference Table',
    sku: 'FU-TABLE-001',
    category: 'Tables',
    stockQuantity: 0,
    minStockLevel: 2,
    unitPrice: 2500,
    location: 'Warehouse B-1',
    status: 'out-of-stock'
  }
];

export const materials: Material[] = [
  {
    id: 'MAT-001',
    name: 'Oak Wood Planks',
    type: 'wood',
    stockQuantity: 500,
    unit: 'board feet',
    unitCost: 8.50,
    supplierId: 'SUP-001',
    location: 'Material Storage A'
  },
  {
    id: 'MAT-002',
    name: 'Leather Upholstery',
    type: 'fabric',
    stockQuantity: 25,
    unit: 'yards',
    unitCost: 45.00,
    supplierId: 'SUP-002',
    location: 'Material Storage B'
  },
  {
    id: 'MAT-003',
    name: 'Metal Hinges',
    type: 'hardware',
    stockQuantity: 200,
    unit: 'pieces',
    unitCost: 3.25,
    supplierId: 'SUP-003',
    location: 'Hardware Section'
  }
];

export const suppliers: Supplier[] = [
  {
    id: 'SUP-001',
    name: 'Premium Wood Suppliers',
    contactPerson: 'John Smith',
    email: 'john@premiumwood.com',
    phone: '+1-555-0101',
    address: '123 Lumber Ave, Portland, OR',
    rating: 4.8,
    materialsSupplied: ['Oak Wood', 'Maple Wood', 'Cherry Wood']
  },
  {
    id: 'SUP-002',
    name: 'Textile Solutions Inc',
    contactPerson: 'Maria Garcia',
    email: 'maria@textilesolutions.com',
    phone: '+1-555-0202',
    address: '456 Fabric St, Charlotte, NC',
    rating: 4.5,
    materialsSupplied: ['Leather', 'Cotton Fabric', 'Velvet']
  },
  {
    id: 'SUP-003',
    name: 'Industrial Hardware Co',
    contactPerson: 'David Lee',
    email: 'david@industrialhardware.com',
    phone: '+1-555-0303',
    address: '789 Hardware Blvd, Detroit, MI',
    rating: 4.2,
    materialsSupplied: ['Hinges', 'Screws', 'Brackets']
  }
];

export const purchaseOrders: PurchaseOrder[] = [
  {
    id: 'PO-001',
    supplierId: 'SUP-001',
    supplierName: 'Premium Wood Suppliers',
    items: [
      { materialId: 'MAT-001', materialName: 'Oak Wood Planks', quantity: 100, unitCost: 8.50 }
    ],
    status: 'confirmed',
    totalAmount: 850,
    orderDate: '2024-01-14',
    expectedDelivery: '2024-01-21'
  },
  {
    id: 'PO-002',
    supplierId: 'SUP-002',
    supplierName: 'Textile Solutions Inc',
    items: [
      { materialId: 'MAT-002', materialName: 'Leather Upholstery', quantity: 50, unitCost: 45.00 }
    ],
    status: 'sent',
    totalAmount: 2250,
    orderDate: '2024-01-16'
  }
];

export const workOrders: WorkOrder[] = [
  {
    id: 'WO-001',
    orderId: 'ORD-001',
    productName: 'Executive Desk',
    quantity: 5,
    status: 'in-progress',
    startDate: '2024-01-16',
    expectedCompletion: '2024-02-10',
    assignedWorkers: ['EMP-001', 'EMP-002'],
    progress: 65
  },
  {
    id: 'WO-002',
    orderId: 'ORD-002',
    productName: 'Ergonomic Chair',
    quantity: 20,
    status: 'pending',
    startDate: '2024-01-20',
    expectedCompletion: '2024-02-05',
    assignedWorkers: ['EMP-003'],
    progress: 0
  }
];

export const customers: Customer[] = [
  {
    id: 'CUST-001',
    name: 'Modern Living Corp',
    email: 'contact@modernliving.com',
    phone: '+1-555-1001',
    address: '100 Business Plaza, New York, NY',
    totalOrders: 12,
    totalSpent: 45000,
    lastOrderDate: '2024-01-15',
    preferences: ['Custom Designs', 'Mahogany Wood', 'Modern Style']
  },
  {
    id: 'CUST-002',
    name: 'Home Comfort Inc',
    email: 'orders@homecomfort.com',
    phone: '+1-555-1002',
    address: '250 Comfort Ave, Chicago, IL',
    totalOrders: 8,
    totalSpent: 28000,
    lastOrderDate: '2024-01-12',
    preferences: ['Ergonomic Furniture', 'Bulk Orders']
  }
];

export const employees: Employee[] = [
  {
    id: 'EMP-001',
    name: 'Michael Chen',
    position: 'Lead Carpenter',
    department: 'Production',
    email: 'michael@furnitureplus.com',
    phone: '+1-555-2001',
    hireDate: '2022-03-15',
    status: 'active'
  },
  {
    id: 'EMP-002',
    name: 'Emma Wilson',
    position: 'Upholsterer',
    department: 'Production',
    email: 'emma@furnitureplus.com',
    phone: '+1-555-2002',
    hireDate: '2023-01-10',
    status: 'active'
  },
  {
    id: 'EMP-003',
    name: 'Robert Taylor',
    position: 'Quality Control',
    department: 'Production',
    email: 'robert@furnitureplus.com',
    phone: '+1-555-2003',
    hireDate: '2021-09-20',
    status: 'active'
  }
];

export const transactions: Transaction[] = [
  {
    id: 'TXN-001',
    type: 'income',
    category: 'Sales',
    amount: 6000,
    description: 'Payment received for Order ORD-001',
    date: '2024-01-15',
    relatedOrderId: 'ORD-001'
  },
  {
    id: 'TXN-002',
    type: 'expense',
    category: 'Materials',
    amount: 850,
    description: 'Purchase order PO-001 - Oak Wood',
    date: '2024-01-14',
    relatedSupplierId: 'SUP-001'
  },
  {
    id: 'TXN-003',
    type: 'income',
    category: 'Sales',
    amount: 9000,
    description: 'Payment received for Order ORD-002',
    date: '2024-01-12',
    relatedOrderId: 'ORD-002'
  }
];