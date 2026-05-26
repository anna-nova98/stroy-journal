@echo off
echo ============================================
echo 🚀 START PROJECT - Construction Work Journal
echo ============================================
echo.
echo This script starts EVERYTHING with one command!
echo.

echo Step 1: Starting PostgreSQL database...
docker-compose up -d postgres
if %errorlevel% neq 0 (
    echo ❌ Failed to start database.
    echo Please make sure Docker Desktop is running.
    pause
    exit /b 1
)
echo ✅ Database started.
echo Waiting 5 seconds for database to initialize...
timeout /t 5 /nobreak
echo.

echo Step 2: Setting up backend environment...
echo Creating .env file for backend...
(
echo # Database
echo DATABASE_URL="postgresql://postgres:password@localhost:5432/construction_journal"
echo.
echo # Server
echo PORT=5000
echo NODE_ENV=development
echo.
echo # CORS
echo CORS_ORIGIN="http://localhost:3000"
echo.
echo # Logging
echo LOG_LEVEL="info"
) > backend\.env
echo ✅ Environment file created.
echo.

echo Step 3: Starting backend...
echo Starting backend on http://localhost:5000
start cmd /k "cd backend && npm start"
echo ✅ Backend started (check new window).
echo.

echo Step 4: Starting frontend...
echo Starting frontend on http://localhost:3000
start cmd /k "cd frontend && npm run dev"
echo ✅ Frontend started (check new window).
echo.

echo ============================================
echo 🎉 PROJECT STARTED SUCCESSFULLY!
echo ============================================
echo.
echo ⏳ Please wait 30 seconds for everything to start...
echo.
echo 🌐 Open in browser:
echo - Frontend (main app): http://localhost:3000
echo - Backend (API): http://localhost:5000
echo.
echo 📊 What you'll see:
echo 1. Frontend: Complete construction work journal
echo 2. Backend: API documentation page
echo.
echo 🛑 To stop everything:
echo 1. Close the backend and frontend terminal windows
echo 2. Run: docker-compose down
echo.
echo 💡 Troubleshooting:
echo - If you see errors, wait 30 seconds and refresh
echo - Check that both terminal windows are running
echo - Make sure Docker Desktop is running
echo.
pause