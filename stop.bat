@echo off
echo 🛑 Остановка Construction Work Journal проекта...
echo.

REM Остановка контейнеров
docker-compose down

echo ✅ Контейнеры остановлены
echo.
echo 🗑️  Для полной очистки выполните:
echo    docker-compose down -v  # удалит volumes
echo    docker system prune -f  # очистит неиспользуемые ресурсы