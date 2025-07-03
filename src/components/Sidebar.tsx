import React from 'react';
import nisumLogo from '../pages/NISUM.jpeg';

const Sidebar: React.FC = () => {
  return (
    <div className="sidebar">
      <div className="logo-container">
        <div className="logo-frame">
          <img src={nisumLogo} alt="Nisum Logo" />
        </div>
      </div>
      <h2>Inventory Management System</h2>
      <ul>
        <li><a href="#inventoryActionsSection">Inventory Actions</a></li>
      </ul>
    </div>
  );
};

export default Sidebar;
