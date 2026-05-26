@echo off
echo ============================================
echo 🚀 Construction Work Journal - Complete Setup
echo ============================================
echo.
echo This script will set up and run the entire project.
echo.

echo Step 1: Checking Docker...
docker --version
if %errorlevel% neq 0 (
    echo ❌ Docker is not installed or not running.
    echo Please install Docker Desktop from: https://www.docker.com/products/docker-desktop/
    pause
    exit /b 1
)
echo ✅ Docker is available.
echo.

echo Step 2: Building backend...
echo This may take 2-3 minutes...
docker-compose build backend
if %errorlevel% neq 0 (
    echo ❌ Backend build failed.
    pause
    exit /b 1
)
echo ✅ Backend built successfully.
echo.

echo Step 3: Starting database and backend...
docker-compose up -d postgres backend
echo ✅ Services started.
echo.

echo Step 4: Waiting for services to initialize...
echo Please wait 15 seconds...
timeout /t 15 /nobreak
echo.

echo Step 5: Testing the backend...
echo Testing health endpoint...
curl http://localhost:5000/health
if %errorlevel% neq 0 (
    echo ⚠️ Could not connect to backend. It might still be starting.
    echo Let's check the logs...
    docker-compose logs backend --tail=20
    echo.
    echo Please wait another 30 seconds and try opening http://localhost:5000
) else (
    echo ✅ Backend is working!
)

echo.
echo ============================================
echo 🎉 SETUP COMPLETE!
echo ============================================
echo.
echo 🌐 Open in browser: http://localhost:5000
echo.
echo 📊 What you'll see:
echo - Project status page
echo - API health status
echo - Database connection status
echo - Instructions for frontend
echo.
echo 🔧 API Endpoints:
echo - Health: http://localhost:5000/health
echo - Work Logs: http://localhost:5000/api/work-logs
echo - Work Types: http://localhost:5000/api/work-types
echo.
echo 💡 To run the full frontend:
echo 1. Open NEW terminal window
echo 2. Run: cd frontend
echo 3. Run: npm install
echo 4. Run: npm run dev
echo 5. Open: http://localhost:3000
echo.
echo 🛑 To stop everything: docker-compose down
echo.
echo 📁 GitHub: https://github.com/anna-nova98/stroy-journal
echo.
pause