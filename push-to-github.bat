@echo off
echo ============================================
echo 🚀 Push Construction Work Journal to GitHub
echo ============================================
echo.

echo 📋 Checking Git status...
git status

echo.
echo 🔍 Checking current branch...
git branch --show-current

echo.
echo 📝 Please follow these steps:
echo.
echo 1. Create a new repository on GitHub:
echo    - Go to https://github.com
echo    - Click "+" -> "New repository"
echo    - Name: construction-work-journal
echo    - Description: Construction Work Journal - React + Node.js + PostgreSQL
echo    - Public repository
echo    - DO NOT initialize with README, .gitignore, or license
echo.
echo 2. After creating, copy the repository URL
echo    It should look like: https://github.com/YOUR_USERNAME/construction-work-journal.git
echo.
echo 3. Enter the GitHub repository URL below:
set /p GITHUB_URL="Enter GitHub URL: "

if "%GITHUB_URL%"=="" (
    echo ❌ No URL provided. Exiting.
    pause
    exit /b 1
)

echo.
echo 🔗 Adding remote repository...
git remote add origin "%GITHUB_URL%"

echo.
echo 📤 Pushing main branch...
git checkout main
git push -u origin main

echo.
echo 📤 Pushing develop branch...
git checkout develop
git push -u origin develop

echo.
echo 📤 Pushing feature/structured-commits branch...
git push origin feature/structured-commits

echo.
echo ✅ Done! Your code is now on GitHub.
echo.
echo 🌐 Open your repository: %GITHUB_URL%
echo.
pause