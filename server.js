const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001;

// Загрузка данных из JSON файла
const citizensData = require('./citizensData.json');

// Используем CORS middleware для разрешения запросов с фронтенда
app.use(cors());

// Middleware для обработки JSON запросов
app.use(express.json());

// Маршрут для получения граждан с пагинацией
app.get('/citizens', (req, res) => {
    const page = parseInt(req.query.page, 10) || 1;
    const pageSize = parseInt(req.query.pageSize, 10) || 10;
  
    // Определяем начало и конец страницы
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
  
    const paginatedCitizens = citizensData.slice(startIndex, endIndex);
  
    res.json({
      citizens: paginatedCitizens,
      page,
      totalPages: Math.ceil(citizensData.length / pageSize),
    });
  });

// Маршрут для поиска граждан по имени
app.get('/search-citizens', (req, res) => {
  const searchQuery = (req.query.search || '').toLowerCase().trim();

  // Проверка на валидность параметра поиска
  if (!searchQuery) {
    return res.status(400).json({ error: 'Invalid search query' });
  }

  // Фильтрация данных на сервере
  const filteredCitizens = citizensData.filter(citizen =>
    citizen.name.toLowerCase().includes(searchQuery)
  );

  res.json(filteredCitizens);
});

// Запуск сервера
app.listen(port, () => {
  console.log(`Сервер запущен на http://localhost:${port}`);
});
