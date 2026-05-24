# ⚡ Быстрый старт

## 🚀 Запуск за 3 шага

### Шаг 1: Клонирование и переход
```bash
git clone <ваш-репозиторий>
cd construction-work-journal
```

### Шаг 2: Запуск через Docker
```bash
# Windows
start.bat

# Linux/Mac
./start.sh

# Или напрямую
docker-compose up --build
```

### Шаг 3: Открытие в браузере
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000/health

## 📋 Что внутри?

### 🏗️ Backend (Node.js + Express + TypeScript)
- **API endpoints**: 7 RESTful endpoints
- **База данных**: PostgreSQL с Prisma ORM
- **Валидация**: Zod схемы
- **Тестирование**: Jest + Supertest

### 🎨 Frontend (React + TypeScript)
- **Сборщик**: Vite
- **UI библиотека**: Material-UI
- **Управление состоянием**: React Query
- **Формы**: React Hook Form + Yup

### 🐳 Инфраструктура
- **Контейнеризация**: Docker
- **Оркестрация**: Docker Compose
- **Прокси**: Nginx
- **БД**: PostgreSQL 15

## 📊 Основные функции

### ✅ Обязательные
1. **Список работ** - таблица с фильтрацией по дате
2. **Добавление записи** - форма с валидацией
3. **Удаление записи** - с подтверждением
4. **Сохранение в БД** - PostgreSQL

### ✅ Дополнительные
1. **Редактирование записей** - полный CRUD
2. **Справочник видов работ** - выбор из списка
3. **Поиск** - по дате и исполнителю
4. **Адаптивный дизайн** - мобильная версия

## 🔧 Быстрые команды

### Запуск
```bash
# Полный запуск
docker-compose up --build

# Только база данных
docker-compose up postgres

# Только backend
docker-compose up backend

# Только frontend
docker-compose up frontend
```

### Остановка
```bash
# Остановка всех сервисов
docker-compose down

# Остановка с удалением volumes
docker-compose down -v
```

### Логи
```bash
# Просмотр всех логов
docker-compose logs -f

# Логи конкретного сервиса
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f postgres
```

## 🗄️ База данных

### Доступ к БД
- **Хост**: localhost:5432
- **База**: construction_journal
- **Пользователь**: postgres
- **Пароль**: password

### Миграции
```bash
cd backend
npx prisma migrate dev
npx prisma db seed
```

### Prisma Studio (GUI для БД)
```bash
cd backend
npx prisma studio
```
Откроется на http://localhost:5555

## 🧪 Тестирование

### Backend тесты
```bash
cd backend
npm test
```

### Frontend тесты
```bash
cd frontend
npm test
```

## 📚 Документация

### Основные файлы
- **README.md** - полное описание
- **INSTRUCTIONS.md** - подробные инструкции
- **DEPLOYMENT.md** - деплой в продакшен
- **SETUP_GIT.md** - настройка Git

### Быстрые ссылки
- **API документация**: в коде через JSDoc
- **Схема БД**: backend/prisma/schema.prisma
- **Тестовые данные**: backend/prisma/seed.ts

## 🔍 Поиск проблем

### Частые проблемы
1. **Порт занят** - измените порты в docker-compose.yml
2. **Ошибки БД** - выполните `docker-compose down -v` и перезапустите
3. **CORS ошибки** - проверьте CORS_ORIGIN в .env файле

### Проверка здоровья
```bash
# Проверка backend
curl http://localhost:5000/health

# Проверка frontend
откройте http://localhost:3000

# Проверка БД
docker-compose exec postgres pg_isready
```

## 🎯 Готовые данные

После запуска в базе будут:
- **10 видов работ** (кладка, монтаж, бетонирование и т.д.)
- **5 примеров записей** с разными датами и исполнителями

## 📱 Интерфейс

### Основные экраны
1. **Главная** - форма добавления + таблица
2. **Таблица** - список работ с пагинацией
3. **Формы** - добавление/редактирование
4. **Диалоги** - подтверждение действий

### Горячие клавиши
- **Enter** - отправка формы
- **Escape** - закрытие диалога
- **Tab** - переход между полями

## ⚡ Производительность

### Оптимизации
- **Пагинация** - загрузка по 10 записей
- **Кэширование** - React Query кэш
- **Индексы БД** - быстрый поиск по дате
- **Сжатие** - gzip через Nginx

## 🔒 Безопасность

### Реализовано
- **Валидация** на клиенте и сервере
- **CORS** ограничения
- **Защита от SQL инъекций**
- **Логирование** операций

## 🚀 Деплой

### Простой деплой
```bash
# Сборка образов
docker-compose build

# Запуск в production
docker-compose up -d
```

### Облачный деплой
- **Heroku**: готовые Procfile
- **AWS**: Docker образы
- **Vercel**: frontend деплой
- **Railway**: полный стек

## 📞 Поддержка

### Полезные команды
```bash
# Пересборка
docker-compose up --build --force-recreate

# Очистка
docker system prune -f

# Проверка
.\verify_project.bat
```

### Документация
- Все вопросы в README.md
- Проблемы - проверьте INSTRUCTIONS.md
- Деплой - смотрите DEPLOYMENT.md

---

**🎉 Проект готов к использованию! Запускайте и тестируйте!**