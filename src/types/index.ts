// Types for the inventory management system
export interface InventoryItem {
  orderId: string;
  sku: string;
  categoryId: string;
  orderReservedQty: number;
  orderAllocatedQty: number;
}

export interface ReserveInventoryPayload {
  orderId: string;
  sku: string;
  categoryId: string;
  quantity: number;
}

export interface AllocateInventoryPayload {
  orderId: string;
  allocateChoice: 'yes' | 'no';
}

export interface InventoryState {
  items: InventoryItem[];
  loading: boolean;
  error: string | null;
  lastUpdated: string | null;
}

export interface NotificationState {
  message: string | null;
  type: 'success' | 'error' | 'warning' | 'info' | null;
}

export interface AppState {
  inventory: InventoryState;
  notification: NotificationState;
}
