import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { InventoryItem } from '../types';

const InventoryTable: React.FC = () => {
  const { items: inventoryData, loading } = useSelector((state: RootState) => state.inventory);

  return (
    <section id="inventoryTableSection">
      <h2>Current Inventory</h2>
      <p>Showing {inventoryData?.length || 0} inventory items</p>
      <table id="inventoryTable">
        <thead>
          <tr className="table-header">
            <th>Order ID</th>
            <th>SKU</th>
            <th>Category ID</th>
            <th>Reserved Qty</th>
            <th>Allocated Qty</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(inventoryData) && inventoryData.length > 0 ? (
            inventoryData.map((item: InventoryItem, index: number) => (
              <tr key={`${item.orderId}-${item.sku}-${index}`} className={index % 2 === 0 ? 'table-row-even' : 'table-row-odd'}>
                <td>{item.orderId || '(No Order ID)'}</td>
                <td>{item.sku || '(No SKU)'}</td>
                <td>{item.categoryId !== undefined ? item.categoryId : '0'}</td>
                <td>{item.orderReservedQty !== undefined ? item.orderReservedQty : '0'}</td>
                <td>{item.orderAllocatedQty !== undefined ? item.orderAllocatedQty : '0'}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="table-empty-state">
                <div>No inventory data available</div>
                <div className="table-empty-hint">
                  {loading ? 'Loading data from server...' : 'Make sure your backend is running and returning data'}
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </section>
  );
};

export default InventoryTable;
