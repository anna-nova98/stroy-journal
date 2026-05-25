#!/bin/bash

echo "🛑 Остановка Construction Work Journal проекта..."

# Остановка контейнеров
docker-compose down

echo "✅ Контейнеры остановлены"
echo ""
echo "🗑️  Для полной очистки выполните:"
echo "   docker-compose down -v  # удалит volumes"
echo "   docker system prune -f  # очистит неиспользуемые ресурсы"