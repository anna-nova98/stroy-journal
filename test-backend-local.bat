@echo off
echo ============================================
echo 🚀 Testing Backend Locally (No Docker)
echo ============================================
echo.

echo Step 1: Navigate to backend directory...
cd backend

echo Step 2: Install dependencies...
call npm install
if %errorlevel% neq 0 (
    echo ❌ npm install failed.
    pause
    exit /b 1
)

echo Step 3: Build TypeScript...
call npm run build
if %errorlevel% neq 0 (
    echo ❌ TypeScript build failed.
    pause
    exit /b 1
)

echo Step 4: Start the backend server...
echo Starting backend on http://localhost:5000
echo Press Ctrl+C to stop
echo.
call npm start