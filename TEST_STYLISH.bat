@echo off
echo ============================================
echo 🎨 TEST STYLISH FRONTEND
echo ============================================
echo.
echo This script tests if the stylish frontend builds correctly.
echo.

echo Step 1: Check if backend is running...
curl http://localhost:5000/health
if %errorlevel% neq 0 (
    echo ⚠️ Backend is not running. Starting it...
    start cmd /k "cd backend && npm start"
    echo Waiting 10 seconds for backend to start...
    timeout /t 10 /nobreak
)

echo.
echo Step 2: Install frontend dependencies...
cd frontend
call npm install
if %errorlevel% neq 0 (
    echo ❌ npm install failed.
    pause
    exit /b 1
)

echo.
echo Step 3: Build frontend to check for errors...
call npm run build
if %errorlevel% neq 0 (
    echo ❌ Frontend build failed.
    echo.
    echo 💡 Common issues:
    echo 1. Delete node_modules and package-lock.json
    echo 2. Run: npm install again
    echo 3. Check TypeScript errors
    pause
    exit /b 1
)

echo.
echo ✅ Frontend builds successfully!
echo.
echo Step 4: Start the stylish frontend...
echo Starting on http://localhost:3000
echo.
call npm run dev
echo.
echo 🌐 Open browser to: http://localhost:3000
echo.
echo 🎨 You should see:
echo - Modern construction-themed design
echo - Gradient headers and cards
echo - Interactive hover effects
echo - Beautiful typography and spacing
echo.
pause