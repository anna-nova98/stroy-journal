# Build stage
FROM node:18-alpine AS builder

WORKDIR /app

# Копируем package.json и package-lock.json
COPY package*.json ./
COPY prisma ./prisma/

# Устанавливаем все зависимости (включая dev для сборки)
RUN npm install

# Копируем исходный код
COPY . .

# Генерируем Prisma клиент
RUN npx prisma generate

# Собираем TypeScript
RUN npm run build

# Production stage
FROM node:18-alpine

WORKDIR /app

# Устанавливаем зависимости только для production
COPY package*.json ./
RUN npm install --only=production

# Копируем собранное приложение
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma

# Создаем пользователя без привилегий
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nodejs -u 1001

# Меняем владельца файлов
RUN chown -R nodejs:nodejs /app

USER nodejs

# Открываем порт
EXPOSE 5000

# Запускаем приложение
CMD ["node", "dist/index.js"]