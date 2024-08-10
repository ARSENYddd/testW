// src/components/CitizenDetail.js
import React from 'react';

const CitizenDetail = ({ citizen }) => {
  if (!citizen) return <div>Select a citizen to see details</div>;

  // Пример проверки данных
  if (typeof citizen.name !== 'string') {
    return <div>The data format is incorrect.</div>;
  }

  return (
    <div>
      <h2>{citizen.name}</h2>
      <div><strong>Status:</strong> {citizen.status}</div>
    </div>
  );
};

export default CitizenDetail;
