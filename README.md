# Inventory Management System - Frontend

This is the React frontend for the Inventory Management System. It communicates with a backend API running on port 8080.

## Architecture

This frontend follows SOLID principles and clean architecture:

### Components (Single Responsibility)
- `Sidebar.jsx` - Navigation and branding
- `AddInventory.jsx` - Form for adding new inventory
- `InventoryActions.jsx` - Form for inventory operations (adjust, reserve, allocate, cancel)
- `InventoryTable.jsx` - Display inventory data
- `ErrorBoundary.jsx` - Error handling
- `Notification.jsx` - User feedback system

### Services (Dependency Inversion)
- `InventoryService.js` - API communication layer

### Hooks (State Management)
- `useInventory.js` - Custom hook for inventory state management

### Configuration
- `src/config/api.js` - API configuration (change your backend URL here)
- `src/constants/index.js` - Application constants

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
   Edit `src/config/api.js` to match your backend URL if different from `http://localhost:8080/api`

3. **Start development server:**
   ```bash
   npm run dev
   ```

4. **Make sure your backend is running on port 8080**

## Environment Configuration

You can use environment variables by creating a `.env` file:

```env
REACT_APP_API_URL=http://localhost:8080/api
REACT_APP_API_TIMEOUT=5000
```

Then uncomment the alternative configuration in `src/config/api.js`.

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

The built files will be in the `dist/` directory.

## Features

- ✅ Add new inventory items
- ✅ Adjust inventory quantities
- ✅ Reserve inventory for orders
- ✅ Allocate reserved inventory
- ✅ Cancel allocations/reservations
- ✅ Real-time inventory table
- ✅ Error handling and user feedback
- ✅ Loading states
- ✅ Responsive design

## Technology Stack

- **React 19** - UI framework
- **Vite** - Build tool and dev server
- **Modern JavaScript** - ES6+ features
- **CSS3** - Custom styling with CSS variables
- **Fetch API** - HTTP client for API calls+ Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
