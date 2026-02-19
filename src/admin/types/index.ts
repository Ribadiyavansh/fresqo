// Order Status Types
export type OrderStatus = 'PLACED' | 'CONFIRMED' | 'PACKED' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';

export interface Order {
  id: string;
  customerName: string;
  phone: string;
  address: string;
  city: string;
  pincode: string;
  products: OrderProduct[];
  totalAmount: number;
  totalQuantity: number;
  status: OrderStatus;
  paymentMethod: 'COD';
  paymentStatus: 'PENDING' | 'COLLECTED';
  createdAt: string;
  updatedAt: string;
  statusLogs: StatusLog[];
}

export interface OrderProduct {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

export interface StatusLog {
  status: OrderStatus;
  timestamp: string;
  note?: string;
}

// Product Types
export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  stock: number;
  image?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// Customer Types
export interface Customer {
  id: string;
  name: string;
  phone: string;
  email?: string;
  address?: string;
  city?: string;
  totalOrders: number;
  totalSpend: number;
  lastOrderDate?: string;
  orders?: Order[];
}

// Admin Types
export type AdminRole = 'SUPER_ADMIN' | 'OPERATIONS_ADMIN';

export interface Admin {
  id: string;
  name: string;
  email: string;
  role: AdminRole;
  isActive: boolean;
  createdAt: string;
  lastLogin?: string;
}

// Analytics Types
export interface RevenueData {
  date: string;
  revenue: number;
  orders: number;
}

export interface CityOrderData {
  city: string;
  orders: number;
  revenue: number;
}

export interface ProductSalesData {
  productId: string;
  productName: string;
  quantity: number;
  revenue: number;
}

export interface StatusBreakdown {
  status: OrderStatus;
  count: number;
  percentage: number;
}

export interface DashboardMetrics {
  totalOrdersToday: number;
  totalOrdersTrend: number;
  totalRevenue: number;
  revenueTrend: number;
  pendingOrders: number;
  pendingTrend: number;
  cancelledOrders: number;
  cancelledTrend: number;
}

// Settings Types
export interface GeneralSettings {
  brandName: string;
  supportEmail: string;
  supportPhone: string;
  orderPrefix: string;
}

export interface OrderSettings {
  defaultOrderStatus: OrderStatus;
  autoConfirm: boolean;
  lowStockThreshold: number;
}

// Notification Types
export interface Notification {
  id: string;
  type: 'NEW_ORDER' | 'STATUS_UPDATE' | 'LOW_STOCK';
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
  data?: any;
}

// Filter Types
export interface OrderFilters {
  search?: string;
  status?: OrderStatus;
  dateFrom?: string;
  dateTo?: string;
  city?: string;
  sortBy?: 'latest' | 'amount_high' | 'amount_low';
}
