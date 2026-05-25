@echo off
echo ============================================
echo 🚀 Start Construction Work Journal
echo ============================================
echo.
echo This script starts the project in a simple way.
echo.

echo 📦 Checking Docker images...
docker images | findstr construction-work-journal-backend
if %errorlevel% neq 0 (
    echo ❌ Backend image not found. Building...
    docker-compose build backend
) else (
    echo ✅ Backend image found.
)

echo.
echo 🐳 Starting services (without frontend build)...
docker-compose up -d postgres backend

echo.
echo ⏳ Waiting for services to start...
timeout /t 10 /nobreak

echo.
echo ✅ Services are running!
echo.
echo 🌐 Access points:
echo - Backend API: http://localhost:5000
echo - Health check: http://localhost:5000/health
echo - PostgreSQL: localhost:5432
echo.
echo 📝 To run the frontend (choose one option):
echo.
echo Option 1: Run frontend locally (recommended for testing):
echo 1. Open new terminal
echo 2. cd frontend
echo 3. npm install
echo 4. npm run dev
echo 5. Open http://localhost:3000
echo.
echo Option 2: Use the pre-built frontend files:
echo 1. Open browser
echo 2. Go to: http://localhost:5000 (backend will serve a simple page)
echo.
echo 🔧 To check if backend is working:
echo curl http://localhost:5000/health
echo.
echo 🛑 To stop services:
echo docker-compose down
echo.
pause