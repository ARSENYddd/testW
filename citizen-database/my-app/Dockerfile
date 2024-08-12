# Используем официальный образ Node.js для сборки
FROM node:18 AS build

# Устанавливаем рабочую директорию в контейнере
WORKDIR /app

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем остальные файлы в контейнер
COPY . .

# Сборка приложения
RUN npm run build

# Используем nginx для сервировки статических файлов
FROM nginx:stable-alpine

# Копируем сгенерированные файлы React-приложения в директорию nginx
COPY --from=build /app/build /usr/share/nginx/html

# Экспонируем порт
EXPOSE 80

# Запуск nginx
CMD ["nginx", "-g", "daemon off;"]
