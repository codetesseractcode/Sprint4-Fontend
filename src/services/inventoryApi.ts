import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { InventoryItem } from '../types';

// API Configuration - Using ports for different environments
interface ApiConfig {
  API_BASE_URL: string;
  TIMEOUT: number;
}

const config: Record<string, ApiConfig> = {
  development: {
    API_BASE_URL: 'http://localhost:8090/api',
    TIMEOUT: 5000,
  },
  production: {
    API_BASE_URL: '/api', // Use relative URL for production
    TIMEOUT: 10000,
  }
};

// Use import.meta.env for Vite instead of process.env
const currentEnv = import.meta.env.MODE || 'development';
const apiConfig = config[currentEnv];

// Create axios instance with default config
const apiClient: AxiosInstance = axios.create({
  baseURL: apiConfig.API_BASE_URL,
  timeout: apiConfig.TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  // Remove withCredentials to troubleshoot potential CORS issues
  withCredentials: false
});

// Response interceptor for API calls
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    // Always extract the data property from axios response
    const responseData = response.data;
    
    // Check if responseData has a nested data property (from backend)
    if (responseData && typeof responseData === 'object' && responseData.success !== undefined && responseData.data !== undefined) {
      return responseData.data;
    }
    
    // Otherwise return the full response data
    return responseData;
  },
  (error) => {
    const errorResponse = {
      success: false,
      message: 'An unexpected error occurred',
      data: null,
      originalError: error.message,
      status: error.response?.status,
      statusText: error.response?.statusText
    };

    if (error.response) {
      errorResponse.message = error.response.data?.message || `Server Error: ${error.response.status}`;
      errorResponse.status = error.response.status;
      errorResponse.statusText = error.response.statusText;
    } else if (error.request) {
      errorResponse.message = 'Network Error: Could not reach the server';
    }

    throw errorResponse;
  }
);

// API methods
export const inventoryApi = {
  async getAllInventory(): Promise<InventoryItem[]> {
    const response = await apiClient.get('/inventory');
    return response.data || response;
  },

  async addInventory(inventoryData: Partial<InventoryItem>): Promise<any> {
    const response = await apiClient.post('/inventory', inventoryData);
    return response;
  },

  async updateInventory(sku: string, inventoryData: Partial<InventoryItem>): Promise<any> {
    const response = await apiClient.put(`/inventory/${sku}`, inventoryData);
    return response;
  },

  async adjustInventory(sku: string, quantity: number, username = 'system'): Promise<any> {
    const response = await apiClient.put(`/inventory/${sku}/adjust`, { quantity, username });
    return response;
  },

  async reserveInventory(sku: string, quantity: number, orderId: string): Promise<any> {
    const response = await apiClient.post(`/inventory/${sku}/reserve`, { quantity, orderId });
    return response;
  },

  async allocateInventory(sku: string, quantity: number, orderId: string): Promise<any> {
    // This uses reserve since the new API doesn't have a specific allocate endpoint
    const response = await apiClient.post(`/inventory/${sku}/reserve`, { quantity, orderId });
    return response;
  },

  async deleteInventory(sku: string): Promise<any> {
    const response = await apiClient.delete(`/inventory/${sku}`);
    return response;
  },

  async getInventoryBySku(sku: string): Promise<InventoryItem> {
    const response = await apiClient.get(`/inventory/${sku}`);
    return response.data || response;
  },

  async cancelInventoryWithQuantity(sku: string, quantity: number): Promise<any> {
    const response = await apiClient.post(`/inventory/${sku}/cancel`, { quantity });
    return response;
  }
};

export default apiClient;
