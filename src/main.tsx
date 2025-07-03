import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from './store'
import './pages/InventoryDashboard.css'
import InventoryManagementSystem from './pages/InventoryDashboard.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <InventoryManagementSystem />
    </Provider>
  </StrictMode>,
)
