// src/components/Sidebar.js
import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2>Dashboard</h2>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/citizens">Citizens</Link></li>
        {/* Добавьте другие ссылки по мере необходимости */}
      </ul>
    </div>
  );
};

export default Sidebar;
