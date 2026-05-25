@echo off
echo Инициализация Git репозитория...
echo.

REM Проверка Git
where git >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ Git не установлен. Установите Git и повторите попытку.
    exit /b 1
)

REM Инициализируем репозиторий
git init

REM Добавляем все файлы
git add .

REM Создаем первый коммит
git commit -m "feat: initial project structure - Construction Work Journal"

REM Создаем ветку develop
git checkout -b develop

echo.
echo ✅ Git репозиторий инициализирован!
echo 📁 Структура проекта создана
echo 🚀 Для запуска проекта выполните: docker-compose up --build
echo.
echo 📚 Дополнительные инструкции:
echo    SETUP_GIT.md - настройка GitHub репозитория
echo    COMMIT_INSTRUCTIONS.md - работа с коммитами