// Frontend Application Constants
export const API_CONFIG = {
  BASE_URL: 'http://localhost:8090/api', // Updated to match Spring Boot port
  ENDPOINTS: {
    INVENTORY: '/inventory',
    INVENTORY_ADJUST: '/inventory/adjust',
    INVENTORY_RESERVE: '/inventory/reserve',
    INVENTORY_ALLOCATE: '/inventory/allocate',
    INVENTORY_CANCEL: '/inventory/cancel',
    PRODUCTS: '/products',
    CATEGORIES: '/categories'
  }
} as const;

export const INVENTORY_ACTIONS = {
  ADJUST: 'adjust',
  RESERVE: 'reserve',
  ALLOCATE: 'allocate',
  CANCEL: 'cancel'
} as const;

export const NOTIFICATION_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info'
} as const;

export type InventoryAction = typeof INVENTORY_ACTIONS[keyof typeof INVENTORY_ACTIONS];
export type NotificationType = typeof NOTIFICATION_TYPES[keyof typeof NOTIFICATION_TYPES];

// These could be fetched from your backend API instead of hardcoded
export const PRODUCT_IDS = [
  { value: '1', label: 'Product 1' },
  { value: '2', label: 'Product 2' },
  { value: '3', label: 'Product 3' },
  { value: '4', label: 'Product 4' },
  { value: '5', label: 'Product 5' }
] as const;

export const CATEGORY_IDS = [
  { value: '101', label: 'Category 101' },
  { value: '102', label: 'Category 102' },
  { value: '103', label: 'Category 103' },
  { value: '104', label: 'Category 104' },
  { value: '105', label: 'Category 105' }
] as const;

export const VALIDATION_MESSAGES = {
  SKU_REQUIRED: 'SKU is required',
  QUANTITY_REQUIRED: 'Quantity is required',
  QUANTITY_POSITIVE: 'Quantity must be positive',
  SKU_NOT_FOUND: 'SKU not found in inventory',
  INSUFFICIENT_QUANTITY: 'Insufficient quantity available',
  NETWORK_ERROR: 'Network error. Please check your connection.',
  SERVER_ERROR: 'Server error. Please try again later.'
} as const;

export const FORM_DEFAULTS = {
  ADD_INVENTORY: {
    sku: '',
    productId: '',
    categoryId: '',
    location: '',
    quantity: ''
  },
  INVENTORY_ACTION: {
    action: INVENTORY_ACTIONS.ADJUST,
    sku: '',
    quantity: '',
    orderId: ''
  }
} as const;

export const TABLE_COLUMNS = {
  SKU: 'sku',
  LOCATION: 'location',
  AVAILABLE_QTY: 'availableQty',
  RESERVED_QTY: 'reservedQty',
  ALLOCATED_QTY: 'allocatedQty'
} as const;
