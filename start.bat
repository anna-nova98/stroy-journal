@echo off
echo 🚀 Запуск Construction Work Journal проекта...
echo.

REM Проверка Docker
where docker >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ Docker не установлен. Установите Docker и повторите попытку.
    exit /b 1
)

where docker-compose >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ Docker Compose не установлен. Установите Docker Compose и повторите попытку.
    exit /b 1
)

echo ✅ Docker и Docker Compose установлены

REM Сборка и запуск
echo 📦 Сборка Docker образов...
docker-compose build

echo 🚀 Запуск контейнеров...
docker-compose up -d

echo ⏳ Ожидание запуска сервисов...
timeout /t 10 /nobreak >nul

REM Проверка статуса
echo 🔍 Проверка статуса сервисов...
docker-compose ps

echo.
echo 🎉 Проект успешно запущен!
echo.
echo 🌐 Доступные сервисы:
echo    Frontend:  http://localhost:3000
echo    Backend:   http://localhost:5000
echo    API Docs:  http://localhost:5000/health
echo.
echo 📊 База данных:
echo    PostgreSQL: localhost:5432
echo    Database:   construction_journal
echo    Username:   postgres
echo    Password:   password
echo.
echo 🛑 Для остановки выполните: docker-compose down
echo 📝 Логи: docker-compose logs -f