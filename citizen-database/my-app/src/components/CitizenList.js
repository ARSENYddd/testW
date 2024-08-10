// CitizenList.js

import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

function CitizenList() {
  const [citizens, setCitizens] = useState([]);
  const [selectedCitizen, setSelectedCitizen] = useState(null);
  const [widgetTop, setWidgetTop] = useState('50%');
  const [widgetLeft, setWidgetLeft] = useState('50%');
  const [searchValue, setSearchValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [searchError, setSearchError] = useState('');
  const containerRef = useRef(null);

  useEffect(() => {
    fetchCitizens();
  }, []);

  const fetchCitizens = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:3001/citizens'); // Обновите URL, если нужно
      setCitizens(response.data.citizens);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setSearchError('Ошибка при загрузке данных');
      setLoading(false);
    }
  };

  const handleCitizenClick = (event, citizen) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const top = rect.top + window.scrollY;
    const left = rect.left + window.scrollX;

    const viewportHeight = window.innerHeight;
    const minTop = window.scrollY + viewportHeight / 1.1;
    const widgetTop = Math.max(top, minTop);
    setSelectedCitizen(citizen);
    setWidgetTop(`${widgetTop}px`);
    console.log('Widget Coordinates:');
    console.log('Top:', widgetTop);
  }
    

  const handleClickOutside = (event) => {
    if (!event.target.closest('.widget') && !event.target.closest('.citizen-item')) {
      setSelectedCitizen(null);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const handleSearchChange = async (event) => {
    const searchValue = event.target.value;
    setSearchValue(searchValue);

    if (searchValue.trim()) {
      try {
        const response = await axios.get('http://localhost:3001/search-citizens', {
          params: { search: searchValue }
        });
        setCitizens(response.data);
      } catch (error) {
        console.error('Error fetching search results:', error);
        setSearchError('Ошибка поиска');
      }
    } else {
      fetchCitizens();
    }
  };

  const filteredCitizens = citizens.filter(citizen =>
    citizen && citizen.name && citizen.name.toLowerCase().includes(searchValue.toLowerCase())
  );

  const handleScroll = () => {
    if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight) {
      fetchMoreCitizens();
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading, hasMore]);

  const fetchMoreCitizens = async () => {
    if (!hasMore) return;
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:3001/citizens', {
        params: { page: (citizens.length / 10) + 1, pageSize: 10 }
      });
      setCitizens(prevCitizens => [...prevCitizens, ...response.data.citizens]);
      if (response.data.citizens.length === 0) setHasMore(false);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching more data:', error);
      setLoading(false);
    }
  };

  return (
    <div ref={containerRef} className="flex flex-col justify-center items-center" style={{ marginTop: '2rem' }}>
      <div className="bg-white p-8 rounded-lg shadow-lg z-0">
        <input
          type="text"
          placeholder="Поиск по имени..."
          value={searchValue}
          onChange={handleSearchChange}
          className="mb-4 p-2 border border-gray-300 rounded-lg"
        />

        {searchError && <div className="text-red-500">{searchError}</div>}

        <ul role="list" className="grid gap-x-8 gap-y-1 sm:grid-cols-2 sm:gap-y-1 xl:col-span-2">
          {filteredCitizens.map(citizen => (
            <li
              key={citizen.id || `${citizen.name}-${citizen.email}`}
              className="mb-4 border border-gray-300 rounded-lg citizen-item"
              onClick={(event) => handleCitizenClick(event, citizen)}
            >
              <div className="flex items-center gap-x-6 py-4 h-48 px-4 ">
                <img alt="" src={citizen.imageUrl} className="h-24 w-24 rounded-full ml-4" />
                <div>
                  <h3 className="text-base font-semibold leading-7 tracking-tight text-gray-900">{citizen.name}</h3>
                  <p className="text-sm font-semibold leading-6 text-indigo-600">{citizen.email}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>

        {loading && <div>Загрузка дополнительных данных...</div>}
      </div>

      {selectedCitizen && (
        <div
          className="absolute bg-gray-800 text-white border-8  border-gray-300 rounded-lg shadow-lg py-4 px-4 widget"
          style={{ top: widgetTop, left: widgetLeft, transform: 'translate(-50%, -100%)' }}
        >
          <div className="bg-gray-800 text-white border-8 border-gray-300 rounded-lg shadow-lg relative gap-x-6 gap-y-12 py-4 px-4">
            <img alt="" src={selectedCitizen.imageUrl} className="rounded-md object-cover ml-4" />
            <div className="grid grid-cols-2 gap-4 p-2">
              <h2 className="text-xl font-bold rounded-lg">{selectedCitizen.name}</h2>
              <div className="relative flex-col p-2">
                <div className="w-full sm:w-1/2 md:w-1/4 p-2 border border-gray-800 rounded-md">
                  <div className="font-semibold">Email:</div>
                  <div>{selectedCitizen.email}</div>
                </div>
                <div className="w-full sm:w-1/2 md:w-1/4 p-2 border border-gray-800 rounded-md">
                  <div className="font-semibold">Статус:</div>
                  <div>{selectedCitizen.status}</div>
                </div>
                <div className="w-full sm:w-1/2 md:w-1/4 p-2 border border-gray-800 rounded-md">
                  <div className="font-semibold">Последний визит:</div>
                  <div>{selectedCitizen.lastSeen || 'N/A'}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CitizenList;
