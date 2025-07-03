import axios, { AxiosResponse, AxiosError } from 'axios';
import { InventoryItem } from '../types';

// Environment configuration interface
interface ApiConfig {
  API_BASE_URL: string;
  TIMEOUT: number;
}

// Environment configurations
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
const currentEnv: string = import.meta.env.MODE || 'development';

const apiConfig: ApiConfig = config[currentEnv];

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: apiConfig.API_BASE_URL,
  timeout: apiConfig.TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  // Remove withCredentials to troubleshoot potential CORS issues
  withCredentials: false
});

// API Response interface for structured backend responses
interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
}

// Error response interface
interface ErrorResponse {
  success: boolean;
  message: string;
  data: any;
  originalError?: string;
  status: number;
  backendError?: boolean;
  request?: any;
}

// Response interceptor for API calls
apiClient.interceptors.response.use(
  (response: AxiosResponse): any => {
    // Always extract the data property from axios response
    const responseData = response.data;
    
    // Check if responseData has a nested data property (from backend)
    if (responseData && typeof responseData === 'object' && responseData.success !== undefined && responseData.data !== undefined) {
      return responseData.data;
    }
    
    // Otherwise return the full response data
    return responseData;
  },
  (error: AxiosError): Promise<ErrorResponse> => {
    const errorResponse: ErrorResponse = {
      success: false,
      message: 'An unexpected error occurred',
      data: null,
      originalError: error.message,
      status: error.response?.status || 500
    };

    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      if (error.response.status === 500) {
        errorResponse.message = 'Backend Server Error (500): This is likely a backend issue related to database field mappings or Spring Boot entity configuration. Check server logs for details.';
        errorResponse.backendError = true;
      } else {
        errorResponse.message = (error.response.data as any)?.message || `Error: ${error.response.status} ${error.response.statusText}`;
      }
      
      errorResponse.data = error.response.data;
      errorResponse.status = error.response.status;
    } else if (error.request) {
      // The request was made but no response was received
      errorResponse.message = 'No response received from server. Please check your connection.';
      errorResponse.request = error.request;
    } else {
      // Something happened in setting up the request that triggered an Error
      errorResponse.message = `Request failed: ${error.message}`;
    }

    return Promise.reject(errorResponse);
  }
);

// API service for inventory management
const inventoryApi = {
  // Get all inventory items
  getAllInventory: (): Promise<InventoryItem[]> => {
    return apiClient.get('/inventory');
  },

  // Get inventory item by SKU
  getInventoryBySku: (sku: string): Promise<InventoryItem> => {
    return apiClient.get(`/inventory/${sku}`);
  },

  // Add new inventory item
  addInventory: (inventoryData: Omit<InventoryItem, 'id'>): Promise<InventoryItem> => {
    return apiClient.post('/inventory', inventoryData);
  },

  // Update inventory item
  updateInventory: (sku: string, inventoryData: Partial<InventoryItem>): Promise<InventoryItem> => {
    return apiClient.put(`/inventory/${sku}`, {
      ...inventoryData,
      sku // Ensure SKU in body matches path parameter
    });
  },

  // Adjust inventory quantity
  adjustInventory: (sku: string, quantity: number, username: string = 'system'): Promise<InventoryItem> => {
    return apiClient.patch(`/inventory/${sku}/adjust?quantity=${quantity}&username=${username}`);
  },

  // Reserve inventory for an order
  reserveInventory: (sku: string, quantity: number, orderId: string): Promise<InventoryItem> => {
    return apiClient.patch(`/inventory/${sku}/reserve?quantity=${quantity}&orderId=${orderId}`);
  },

  // Delete inventory item
  deleteInventory: (sku: string): Promise<void> => {
    return apiClient.delete(`/inventory/${sku}`);
  },

  // Cancel inventory with specific quantity
  cancelInventoryWithQuantity: (sku: string, quantity: number): Promise<void> => {
    return apiClient.delete(`/inventory/${sku}/quantity/${quantity}`);
  }
};

export default inventoryApi;
export { apiClient, type ApiConfig, type ErrorResponse };
