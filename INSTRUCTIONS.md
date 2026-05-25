# Инструкции по запуску проекта

## Быстрый запуск с Docker Compose

1. Убедитесь, что у вас установлены Docker и Docker Compose
2. В корне проекта выполните:
```bash
docker-compose up --build
```
3. Приложение будет доступно по адресам:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000
   - PostgreSQL: localhost:5432

## Локальная разработка

### Предварительные требования
- Node.js 18+
- PostgreSQL 15+
- npm или yarn

### Шаг 1: Настройка базы данных
```bash
# Создайте базу данных
createdb construction_journal

# Или используйте Docker для PostgreSQL
docker run --name construction-journal-db -e POSTGRES_PASSWORD=password -e POSTGRES_DB=construction_journal -p 5432:5432 -d postgres:15-alpine
```

### Шаг 2: Настройка Backend
```bash
cd backend

# Установите зависимости
npm install

# Настройте переменные окружения
cp .env.example .env
# Отредактируйте .env файл при необходимости

# Запустите миграции и сиды
npx prisma migrate dev
npx prisma db seed

# Запустите сервер в режиме разработки
npm run dev
```

### Шаг 3: Настройка Frontend
```bash
cd frontend

# Установите зависимости
npm install

# Запустите сервер разработки
npm run dev
```

## Команды для работы

### Backend
```bash
cd backend

# Запуск в режиме разработки
npm run dev

# Сборка
npm run build

# Запуск в production
npm start

# Тестирование
npm test

# Линтинг
npm run lint

# Форматирование кода
npm run format

# Работа с Prisma
npx prisma studio  # GUI для базы данных
npx prisma migrate dev  # Создание миграций
npx prisma db seed  # Заполнение тестовыми данными
```

### Frontend
```bash
cd frontend

# Запуск в режиме разработки
npm run dev

# Сборка
npm run build

# Предпросмотр сборки
npm run preview

# Тестирование
npm test

# Линтинг
npm run lint

# Форматирование кода
npm run format
```

## Структура API

### Журнал работ
- `GET /api/work-logs` - получить список записей
- `GET /api/work-logs?date=2024-01-15` - фильтрация по дате
- `GET /api/work-logs?workerName=Иванов` - поиск по ФИО
- `GET /api/work-logs/:id` - получить запись по ID
- `POST /api/work-logs` - создать запись
- `PUT /api/work-logs/:id` - обновить запись
- `DELETE /api/work-logs/:id` - удалить запись

### Виды работ
- `GET /api/work-types` - получить справочник видов работ
- `GET /api/work-types/:id` - получить вид работ по ID

## Тестовые данные

После запуска сидов база данных будет содержать:

### Виды работ
1. Кладка перегородок (м²)
2. Монтаж опалубки (м²)
3. Бетонирование (м³)
4. Армирование (т)
5. Кровельные работы (м²)
6. Отделочные работы (м²)
7. Электромонтаж (м)
8. Сантехнические работы (шт)
9. Остекление (м²)
10. Фасадные работы (м²)

### Примеры записей журнала
1. 15.01.2024 - Кладка перегородок - 24.5 м² - Иванов И.И.
2. 16.01.2024 - Монтаж опалубки - 120 м² - Петров П.П.
3. 17.01.2024 - Бетонирование - 45 м³ - Сидоров А.В.
4. 18.01.2024 - Армирование - 3.2 т - Кузнецова М.С.
5. 19.01.2024 - Кровельные работы - 280 м² - Васильев Д.А.

## Решение проблем

### Проблема: Не запускается PostgreSQL в Docker
```bash
# Остановите и удалите контейнер
docker stop construction-journal-db
docker rm construction-journal-db

# Запустите заново
docker-compose up postgres
```

### Проблема: Ошибки Prisma
```bash
cd backend
npx prisma generate
npx prisma migrate reset
```

### Проблема: CORS ошибки
Убедитесь, что в файле `.env` backend указан правильный `CORS_ORIGIN`:
```
CORS_ORIGIN=http://localhost:3000
```

### Проблема: Frontend не подключается к API
Проверьте переменную окружения в frontend:
```
VITE_API_URL=http://localhost:5000/api
```

## Деплой

### Сборка Docker образов
```bash
# Backend
cd backend
docker build -t construction-journal-backend .

# Frontend
cd frontend
docker build -t construction-journal-frontend .
```

### Запуск в production
```bash
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d
```

## Лицензия
MIT