// src/pages/CitizensPage.js
import React, { useState } from 'react';
import CitizenList from '../components/CitizenList';
import CitizenDetail from '../components/CitizenDetail';
import Header from '../components/Header';

const CitizensPage = () => {
  const [selectedCitizen, setSelectedCitizen] = useState(null);

  console.log("Selected Citizen:", selectedCitizen);

  return (
    <div className="citizens-page">
       <Header />
      <CitizenList onSelect={setSelectedCitizen} />
      <CitizenDetail citizen={selectedCitizen} />
    </div>
  );
};

export default CitizensPage;
