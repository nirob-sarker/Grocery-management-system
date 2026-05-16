// User Types
export interface User {
  id: string;
  email: string;
  fullName: string;
  role: 'CUSTOMER' | 'STAFF' | 'ADMIN';
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  access_token: string;
  user: User;
}

// Product Types
export interface Product {
  id: string;
  name: string;
  sku: string;
  categoryId: string;
  category?: Category;
  supplierId: string;
  supplier?: Supplier;
  price: number;
  stock: number;
  description: string;
  image?: string;
  createdAt: string;
  updatedAt: string;
}

// Category Types
export interface Category {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

// Supplier Types
export interface Supplier {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  createdAt: string;
  updatedAt: string;
}

// Order Types
export enum OrderStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  PROCESSING = 'PROCESSING',
  SHIPPED = 'SHIPPED',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED',
}

export enum PaymentMethod {
  CREDIT_CARD = 'CREDIT_CARD',
  DEBIT_CARD = 'DEBIT_CARD',
  BANK_TRANSFER = 'BANK_TRANSFER',
}

export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  product?: Product;
  quantity: number;
  unitPrice: number;
  subtotal: number;
}

export interface Order {
  id: string;
  userId: string;
  user?: User;
  items: OrderItem[];
  shippingAddress: string;
  paymentMethod: PaymentMethod;
  status: OrderStatus;
  notes: string;
  total: number;
  createdAt: string;
  updatedAt: string;
}

// Inventory Types
export interface InventoryLog {
  id: string;
  productId: string;
  product?: Product;
  supplierId: string;
  supplier?: Supplier;
  quantityChange: number;
  type: 'RESTOCK' | 'SALE' | 'ADJUSTMENT';
  notes: string;
  createdAt: string;
  updatedAt: string;
}

// API Response Types
export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface ApiError {
  statusCode: number;
  message: string;
  error?: string;
}

// Form State Types
export interface FormState {
  isLoading: boolean;
  error: string | null;
  success: boolean;
}
