# Inventory Management System - Frontend

This is a modern TypeScript React frontend for the Inventory Management System. It communicates with a backend API running on port 8080 and uses Redux Toolkit for state management.

## Architecture

This frontend follows SOLID principles and clean architecture with TypeScript for type safety:

### Components (Single Responsibility)
- `Sidebar.tsx` - Navigation and branding
- `InventoryActions.tsx` - Form for inventory operations (add, adjust, reserve, allocate, cancel)
- `InventoryTable.tsx` - Display inventory data with sorting and filtering
- `ErrorBoundary.tsx` - Error handling component
- `Notification.tsx` - User feedback system

### State Management (Redux Toolkit)
- `src/store/index.ts` - Typed Redux store configuration
- `src/store/inventorySlice.ts` - Inventory state slice with async thunks

### Services (Dependency Inversion)
- `src/services/inventoryApi.ts` - Typed API communication layer

### Types & Configuration
- `src/types/index.ts` - TypeScript type definitions and interfaces
- `src/config/api.ts` - API configuration (change your backend URL here)
- `src/constants/index.ts` - Application constants

## Backend API Requirements

Your backend on port 8080 should provide these endpoints:

### GET /api/inventory
Returns all inventory items
```json
[
  {
    "id": "string",
    "sku": "string",
    "productId": "string",
    "categoryId": "string", 
    "location": "string",
    "availableQty": number,
    "reservedQty": number,
    "allocatedQty": number
  }
]
```

### POST /api/inventory
Add new inventory item
```json
{
  "sku": "string",
  "productId": "string",
  "categoryId": "string",
  "location": "string",
  "quantity": number
}
```

### PUT /api/inventory/adjust
Adjust inventory quantity
```json
{
  "sku": "string",
  "quantity": number
}
```

### PUT /api/inventory/reserve
Reserve inventory for order
```json
{
  "sku": "string",
  "quantity": number,
  "orderId": "string"
}
```

### PUT /api/inventory/allocate
Allocate inventory for order
```json
{
  "sku": "string",
  "quantity": number,
  "orderId": "string"
}
```

### PUT /api/inventory/cancel
Cancel inventory (return to available)
```json
{
  "sku": "string",
  "quantity": number
}
```

## Setup Instructions

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure API URL:**
   Edit `src/config/api.ts` to match your backend URL if different from `http://localhost:8080/api`

3. **Start development server:**
   ```bash
   npm run dev
   ```

4. **Build the project (TypeScript compilation + Vite build):**
   ```bash
   npm run build
   ```

5. **Make sure your backend is running on port 8080**

## Environment Configuration

You can use environment variables by creating a `.env` file:

```env
REACT_APP_API_URL=http://localhost:8080/api
REACT_APP_API_TIMEOUT=5000
```

Then uncomment the alternative configuration in `src/config/api.ts`.

## CORS Configuration

Make sure your backend allows CORS requests from `http://localhost:5173` (Vite dev server).

In Spring Boot, you can add:
```java
@CrossOrigin(origins = "http://localhost:5173")
```

## Build for Production

```bash
npm run build
```

This will run TypeScript compilation followed by Vite build. The built files will be in the `dist/` directory.

## Features

- ✅ **TypeScript Integration** - Full type safety and better developer experience
- ✅ **Redux State Management** - Centralized state with Redux Toolkit
- ✅ **Modern UI** - Clean, responsive design with CSS variables
- ✅ Add new inventory items
- ✅ Adjust inventory quantities
- ✅ Reserve inventory for orders
- ✅ Allocate reserved inventory
- ✅ Cancel allocations/reservations
- ✅ Real-time inventory table with sorting
- ✅ Error handling and user feedback
- ✅ Loading states and async operations
- ✅ Responsive design for mobile and desktop
- ✅ Type-safe API integration

## Technology Stack

- **React 19** - UI framework with TypeScript
- **TypeScript 5.6+** - Type-safe JavaScript development
- **Redux Toolkit** - Modern Redux for state management
- **React-Redux** - React bindings for Redux
- **Vite** - Build tool and dev server
- **CSS3** - Modern styling with CSS variables and responsive design
- **Axios** - HTTP client for API calls
- **ESLint** - Code linting and formatting

## Project Structure

```
src/
├── components/          # Reusable React components (.tsx)
├── config/             # API and app configuration
├── constants/          # Application constants
├── pages/              # Main application pages
├── services/           # API service layer
├── store/              # Redux store and slices
├── types/              # TypeScript type definitions
├── utils/              # Utility functions
└── main.tsx           # Application entry point
```## Migration Notes

This project has been fully migrated from JavaScript to TypeScript with the following improvements:

### What Changed
- ✅ All `.js`/`.jsx` files converted to `.ts`/`.tsx`
- ✅ Added comprehensive TypeScript type definitions
- ✅ Implemented Redux Toolkit for state management
- ✅ Moved all inline styles to external CSS
- ✅ Simplified and modernized UI components
- ✅ Added type-safe API layer with proper error handling
- ✅ Removed legacy code and unused dependencies

### Breaking Changes
- All import paths now use `.tsx`/`.ts` extensions
- State management moved from custom hooks to Redux
- API layer completely rewritten with TypeScript interfaces
- CSS classes reorganized with modern naming conventions

### Development Benefits
- **Type Safety**: Catch errors at compile time
- **Better IntelliSense**: Improved autocomplete and documentation
- **Refactoring Support**: Safe code transformations
- **State Predictability**: Redux DevTools integration
- **Performance**: Optimized re-renders with Redux selectors
