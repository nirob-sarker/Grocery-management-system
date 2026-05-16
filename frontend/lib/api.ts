import axios, { AxiosError, AxiosInstance } from 'axios';
import Cookies from 'js-cookie';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000';

class APIClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: API_BASE_URL,
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Request Interceptor - Add Auth Token
    this.client.interceptors.request.use(
      (config) => {
        const token = Cookies.get('auth_token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response Interceptor - Handle Errors
    this.client.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        if (error.response?.status === 401) {
          // Unauthorized - Clear token and redirect to login
          Cookies.remove('auth_token');
          if (typeof window !== 'undefined') {
            window.location.href = '/auth/login';
          }
        }

        if (error.response?.status === 403) {
          // Forbidden - Redirect to dashboard
          if (typeof window !== 'undefined') {
            window.location.href = '/dashboard';
          }
        }

        return Promise.reject(error);
      }
    );
  }

  // Auth Endpoints
  async login(email: string, password: string) {
    const response = await this.client.post('/auth/login', { email, password });
    if (response.data.access_token) {
      Cookies.set('auth_token', response.data.access_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 24 * 60 * 60, // 24 hours
      });
    }
    return response.data;
  }

  async register(fullName: string, email: string, password: string) {
    return this.client.post('/auth/register', { fullName, email, password });
  }

  async logout() {
    Cookies.remove('auth_token');
  }

  // Products
  async getProducts(filters?: any) {
    return this.client.get('/products', { params: filters });
  }

  async getProductById(id: string) {
    return this.client.get(`/products/${id}`);
  }

  async createProduct(data: any) {
    return this.client.post('/products', data);
  }

  async updateProduct(id: string, data: any) {
    return this.client.patch(`/products/${id}`, data);
  }

  async deleteProduct(id: string) {
    return this.client.delete(`/products/${id}`);
  }

  // Categories
  async getCategories() {
    return this.client.get('/categories');
  }

  async createCategory(data: any) {
    return this.client.post('/categories', data);
  }

  async updateCategory(id: string, data: any) {
    return this.client.patch(`/categories/${id}`, data);
  }

  async deleteCategory(id: string) {
    return this.client.delete(`/categories/${id}`);
  }

  // Orders
  async getOrders(filters?: any) {
    return this.client.get('/orders', { params: filters });
  }

  async getOrderById(id: string) {
    return this.client.get(`/orders/${id}`);
  }

  async createOrder(data: any) {
    return this.client.post('/orders', data);
  }

  async updateOrderStatus(id: string, status: string) {
    return this.client.patch(`/orders/${id}`, { status });
  }

  // Users
  async getProfile() {
    return this.client.get('/users/profile');
  }

  async updateProfile(data: any) {
    return this.client.patch('/users/profile', data);
  }

  async getUsers(filters?: any) {
    return this.client.get('/users', { params: filters });
  }

  async getUserById(id: string) {
    return this.client.get(`/users/${id}`);
  }

  async createUser(data: any) {
    return this.client.post('/users', data);
  }

  async updateUser(id: string, data: any) {
    return this.client.patch(`/users/${id}`, data);
  }

  async deleteUser(id: string) {
    return this.client.delete(`/users/${id}`);
  }

  // Inventory
  async getInventory(filters?: any) {
    return this.client.get('/inventory', { params: filters });
  }

  async getInventoryReport() {
    return this.client.get('/inventory/report');
  }

  async getInventoryLogs(filters?: any) {
    return this.client.get('/inventory/logs', { params: filters });
  }

  async restock(data: any) {
    return this.client.post('/inventory/restock', data);
  }

  // Suppliers
  async getSuppliers() {
    return this.client.get('/suppliers');
  }

  async getSupplierById(id: string) {
    return this.client.get(`/suppliers/${id}`);
  }

  async createSupplier(data: any) {
    return this.client.post('/suppliers', data);
  }

  async updateSupplier(id: string, data: any) {
    return this.client.patch(`/suppliers/${id}`, data);
  }

  async deleteSupplier(id: string) {
    return this.client.delete(`/suppliers/${id}`);
  }
}

export const api = new APIClient();
