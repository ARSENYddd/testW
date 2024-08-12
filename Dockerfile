# Используем официальный образ Node.js
FROM node:18

# Устанавливаем рабочую директорию в контейнере
WORKDIR /app

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем остальные файлы в контейнер
COPY . .

# Устанавливаем переменные окружения (если есть)
# ENV NODE_ENV=production

# Указываем порт, который будет слушать приложение
EXPOSE 3001

# Команда для запуска приложения
CMD ["node", "server.js"]
