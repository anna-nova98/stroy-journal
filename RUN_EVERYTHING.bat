@echo off
echo ============================================
echo 🚀 RUN EVERYTHING - Construction Work Journal
echo ============================================
echo.
echo This script starts the ENTIRE project with one command!
echo.
echo Step 1: Starting PostgreSQL database...
docker-compose up -d postgres
if %errorlevel% neq 0 (
    echo ❌ Failed to start database.
    pause
    exit /b 1
)
echo ✅ Database started.
echo.
echo Step 2: Starting backend...
echo Starting backend on http://localhost:5000
start cmd /k "cd backend && npm start"
echo.
echo Step 3: Starting frontend...
echo Starting frontend on http://localhost:3000
start cmd /k "cd frontend && npm install && npm run dev"
echo.
echo ============================================
echo 🎉 PROJECT STARTED SUCCESSFULLY!
echo ============================================
echo.
echo 🌐 Open in browser:
echo - Backend: http://localhost:5000
echo - Frontend: http://localhost:3000
echo.
echo ⏳ Please wait 30 seconds for everything to start...
echo The backend and frontend will open in separate windows.
echo.
echo 📊 Once running, you can:
echo 1. View work logs at: http://localhost:3000
echo 2. Test API at: http://localhost:5000/health
echo 3. Access API docs at: http://localhost:5000
echo.
echo 🛑 To stop everything:
echo 1. Close the backend and frontend terminal windows
echo 2. Run: docker-compose down
echo.
pause