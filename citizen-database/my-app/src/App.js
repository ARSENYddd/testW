// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DashboardPage from './pages/DashboardPage';
import CitizensPage from './pages/CitizensPage';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/citizens" element={<CitizensPage />} />
       
      </Routes>
    </Router>
  );
};

export default App;
