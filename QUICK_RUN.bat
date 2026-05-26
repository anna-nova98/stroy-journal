@echo off
echo ============================================
echo ⚡ QUICK RUN - Construction Work Journal
echo ============================================
echo.
echo Самый простой способ запустить проект!
echo.

echo 🐳 Запускаем базу данных и backend...
docker-compose up -d postgres backend

echo.
echo ⏳ Ждем запуска сервисов (10 секунд)...
timeout /t 10 /nobreak

echo.
echo ✅ ГОТОВО! Проект запущен!
echo.
echo 🌐 Откройте в браузере: http://localhost:5000
echo.
echo 📊 На странице вы увидите:
echo - Статус backend и базы данных
echo - Ссылки на API endpoints
echo - Инструкции по запуску frontend
echo.
echo 🔧 API endpoints:
echo - http://localhost:5000/health (проверка работы)
echo - http://localhost:5000/api/work-logs (журнал работ)
echo - http://localhost:5000/api/work-types (виды работ)
echo.
echo 💡 Для запуска полного frontend:
echo 1. Откройте новую консоль
echo 2. Выполните: cd frontend
echo 3. Выполните: npm install
echo 4. Выполните: npm run dev
echo 5. Откройте: http://localhost:3000
echo.
echo 🛑 Для остановки: docker-compose down
echo.
echo 📁 GitHub: https://github.com/anna-nova98/stroy-journal
echo.
pause