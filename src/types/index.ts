export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'manager' | 'employee' | 'viewer';
  avatar?: string;
}

export interface Order {
  id: string;
  customerId: string;
  customerName: string;
  items: OrderItem[];
  status: 'pending' | 'processing' | 'production' | 'ready' | 'shipped' | 'delivered' | 'cancelled';
  totalAmount: number;
  orderDate: string;
  deliveryDate?: string;
  isCustom: boolean;
}

export interface OrderItem {
  id: string;
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  specifications?: string;
}

export interface Product {
  id: string;
  name: string;
  sku: string;
  category: string;
  stockQuantity: number;
  minStockLevel: number;
  unitPrice: number;
  location: string;
  status: 'in-stock' | 'low-stock' | 'out-of-stock';
}

export interface Material {
  id: string;
  name: string;
  type: 'wood' | 'fabric' | 'hardware' | 'component' | 'other';
  stockQuantity: number;
  unit: string;
  unitCost: number;
  supplierId: string;
  location: string;
}

export interface Supplier {
  id: string;
  name: string;
  contactPerson: string;
  email: string;
  phone: string;
  address: string;
  rating: number;
  materialsSupplied: string[];
}

export interface PurchaseOrder {
  id: string;
  supplierId: string;
  supplierName: string;
  items: PurchaseOrderItem[];
  status: 'draft' | 'sent' | 'confirmed' | 'delivered' | 'cancelled';
  totalAmount: number;
  orderDate: string;
  expectedDelivery?: string;
}

export interface PurchaseOrderItem {
  materialId: string;
  materialName: string;
  quantity: number;
  unitCost: number;
}

export interface WorkOrder {
  id: string;
  orderId: string;
  productName: string;
  quantity: number;
  status: 'pending' | 'in-progress' | 'completed' | 'on-hold';
  startDate: string;
  expectedCompletion: string;
  assignedWorkers: string[];
  progress: number;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  totalOrders: number;
  totalSpent: number;
  lastOrderDate: string;
  preferences?: string[];
}

export interface Employee {
  id: string;
  name: string;
  position: string;
  department: string;
  email: string;
  phone: string;
  hireDate: string;
  status: 'active' | 'inactive';
}

export interface Transaction {
  id: string;
  type: 'income' | 'expense';
  category: string;
  amount: number;
  description: string;
  date: string;
  relatedOrderId?: string;
  relatedSupplierId?: string;
}