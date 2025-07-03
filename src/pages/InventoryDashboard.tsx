import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import './InventoryDashboard.css';
import { RootState } from '../store';

// Components following Single Responsibility Principle
import Sidebar from '../components/Sidebar.tsx';
import InventoryActions from '../components/InventoryActions.tsx';
import InventoryTable from '../components/InventoryTable.tsx';
import ErrorBoundary from '../components/ErrorBoundary.tsx';
import Notification from '../components/Notification.tsx';

const InventoryManagementSystem: React.FC = () => {
  const { loading, error } = useSelector((state: RootState) => state.inventory);
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' | 'warning' | 'info' } | null>(null);

  const clearNotification = () => setNotification(null);
  const clearError = () => {
    // Error clearing handled by Redux
  };

  return (
    <div className="app-container">
      <Sidebar />
      
      <main className="main-content">
        <ErrorBoundary error={error} onClearError={clearError}>
          {loading && <div className="loading">Loading...</div>}
          
          <InventoryActions />
          <InventoryTable />
        </ErrorBoundary>

        {notification && (
          <Notification
            message={notification.message}
            type={notification.type}
            onClose={clearNotification}
          />
        )}
      </main>
    </div>
  );
};

export default InventoryManagementSystem;
