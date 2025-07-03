import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { reserveInventory, allocateInventory } from '../store/inventorySlice';
import { AppDispatch } from '../store';

interface FormData {
  action: 'reserve' | 'allocate';
  orderId: string;
  sku: string;
  categoryId: string;
  reservedQty: string;
  allocateChoice: 'yes' | 'no';
}

const InventoryActions: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [formData, setFormData] = useState<FormData>({
    action: 'reserve',
    orderId: '',
    sku: '',
    categoryId: '',
    reservedQty: '',
    allocateChoice: 'no'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (formData.action === 'reserve') {
        await dispatch(reserveInventory({
          orderId: formData.orderId,
          sku: formData.sku,
          categoryId: formData.categoryId,
          quantity: parseInt(formData.reservedQty)
        })).unwrap();
      } else if (formData.action === 'allocate') {
        await dispatch(allocateInventory({
          orderId: formData.orderId,
          allocateChoice: formData.allocateChoice
        })).unwrap();
      }
      
      // Reset form on success
      setFormData({
        action: 'reserve',
        orderId: '',
        sku: '',
        categoryId: '',
        reservedQty: '',
        allocateChoice: 'no'
      });
    } catch (error) {
      // Error handling is done in the slice
      console.error('Action failed:', error);
    }
  };

  const renderReserveForm = () => (
    <>
      <input 
        type="text" 
        name="orderId" 
        placeholder="Order ID"
        value={formData.orderId}
        onChange={handleInputChange}
        required
      />
      
      <input 
        type="text" 
        name="sku" 
        placeholder="SKU"
        value={formData.sku}
        onChange={handleInputChange}
        required
      />
      
      <select 
        name="categoryId" 
        value={formData.categoryId}
        onChange={handleInputChange}
        title="Select Category ID"
        required
      >
        <option value="" disabled>Select Category ID</option>
        <option value="101">101</option>
        <option value="102">102</option>
        <option value="103">103</option>
        <option value="104">104</option>
        <option value="105">105</option>
      </select>
      
      <input 
        type="number" 
        name="reservedQty" 
        placeholder="Reserved Quantity"
        value={formData.reservedQty}
        onChange={handleInputChange}
        required
      />
    </>
  );

  const renderAllocateForm = () => (
    <>
      <input 
        type="text" 
        name="orderId" 
        placeholder="Order ID"
        value={formData.orderId}
        onChange={handleInputChange}
        required
      />
      
      <div className="allocation-container">
        <h4 className="allocation-title">Allocate Inventory?</h4>
        <div className="allocation-options">
          <label className="radio-label">
            <input 
              type="radio"
              name="allocateChoice"
              value="yes"
              checked={formData.allocateChoice === 'yes'}
              onChange={handleInputChange}
              className="radio-input"
            />
            Yes
          </label>
          
          <label className="radio-label">
            <input 
              type="radio"
              name="allocateChoice"
              value="no"
              checked={formData.allocateChoice === 'no'}
              onChange={handleInputChange}
              className="radio-input"
            />
            No
          </label>
        </div>
      </div>
    </>
  );

  return (
    <section id="inventoryActionsSection" className="inventory-actions-section">
      <h2 className="inventory-actions-title">Inventory Actions</h2>
      <form id="inventoryActionsForm" onSubmit={handleSubmit}>
        <select 
          id="action" 
          name="action"
          value={formData.action}
          onChange={handleInputChange}
          title="Select Action Type"
          className="action-select"
        >
          <option value="reserve">Reserve Inventory for order</option>
          <option value="allocate">Allocate Inventory for order</option>
        </select>
        
        {formData.action === 'reserve' && renderReserveForm()}
        {formData.action === 'allocate' && renderAllocateForm()}

        <button type="submit" id="actionButton" className="action-button">
          {formData.action === 'reserve' ? 'Reserve Items' : 'Allocate Items'}
        </button>
      </form>
    </section>
  );
};

export default InventoryActions;
