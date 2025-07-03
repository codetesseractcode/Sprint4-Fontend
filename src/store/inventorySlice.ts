import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { InventoryState, ReserveInventoryPayload, AllocateInventoryPayload } from '../types';
import { inventoryApi } from '../services/inventoryApi.js';

// Async thunks
export const fetchInventory = createAsyncThunk(
  'inventory/fetchInventory',
  async (_, { rejectWithValue }) => {
    try {
      const response = await inventoryApi.getAllInventory();
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch inventory');
    }
  }
);

export const reserveInventory = createAsyncThunk(
  'inventory/reserveInventory',
  async (payload: ReserveInventoryPayload, { rejectWithValue }) => {
    try {
      const response = await inventoryApi.reserveInventory(
        payload.sku,
        payload.quantity,
        payload.orderId
      );
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to reserve inventory');
    }
  }
);

export const allocateInventory = createAsyncThunk(
  'inventory/allocateInventory',
  async (payload: AllocateInventoryPayload, { rejectWithValue }) => {
    try {
      if (payload.allocateChoice === 'yes') {
        const response = await inventoryApi.allocateInventory(
          'DEFAULT_SKU',
          1,
          payload.orderId
        );
        return response;
      } else {
        return { message: 'Allocation cancelled by user choice' };
      }
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to allocate inventory');
    }
  }
);

const initialState: InventoryState = {
  items: [],
  loading: false,
  error: null,
  lastUpdated: null,
};

const inventorySlice = createSlice({
  name: 'inventory',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch inventory
      .addCase(fetchInventory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchInventory.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload || [];
        state.lastUpdated = new Date().toISOString();
      })
      .addCase(fetchInventory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Reserve inventory
      .addCase(reserveInventory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(reserveInventory.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(reserveInventory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Allocate inventory
      .addCase(allocateInventory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(allocateInventory.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(allocateInventory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError, setLoading } = inventorySlice.actions;
export default inventorySlice.reducer;
