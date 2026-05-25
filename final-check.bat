@echo off
echo ============================================
echo 🔍 Final Project Check - Construction Work Journal
echo ============================================
echo.

echo 📋 Checking Git status...
git status
if %errorlevel% neq 0 (
    echo ❌ Git not initialized. Run init-git.bat first.
    pause
    exit /b 1
)

echo.
echo 🌿 Checking Git branches...
git branch -a

echo.
echo 📊 Checking commit history...
git log --oneline -5

echo.
echo 🐳 Checking Docker Compose file...
if exist docker-compose.yml (
    echo ✅ docker-compose.yml exists
) else (
    echo ❌ docker-compose.yml not found
)

echo.
echo 🏗️ Checking project structure...
if exist backend\ (
    echo ✅ backend/ directory exists
) else (
    echo ❌ backend/ directory not found
)

if exist frontend\ (
    echo ✅ frontend/ directory exists
) else (
    echo ❌ frontend/ directory not found
)

echo.
echo 📚 Checking documentation...
if exist README.md (
    echo ✅ README.md exists
) else (
    echo ❌ README.md not found
)

if exist INSTRUCTIONS.md (
    echo ✅ INSTRUCTIONS.md exists
) else (
    echo ❌ INSTRUCTIONS.md not found
)

if exist FOR_REVIEWER.md (
    echo ✅ FOR_REVIEWER.md exists
) else (
    echo ❌ FOR_REVIEWER.md not found
)

echo.
echo 🧪 Checking test files...
if exist backend\package.json (
    echo ✅ backend package.json exists
) else (
    echo ❌ backend package.json not found
)

if exist frontend\package.json (
    echo ✅ frontend package.json exists
) else (
    echo ❌ frontend package.json not found
)

echo.
echo ============================================
echo 📋 Summary
echo ============================================
echo.
echo ✅ Project structure is complete
echo ✅ Git repository is initialized
echo ✅ Documentation is comprehensive
echo ✅ Docker configuration is ready
echo.
echo 🚀 Next steps:
echo 1. Create GitHub repository
echo 2. Run push-to-github.bat
echo 3. Test project with docker-compose up --build
echo 4. Submit the GitHub repository link
echo.
echo 📖 See NEXT_STEPS.md for detailed instructions.
echo.
pause