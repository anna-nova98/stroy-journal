@echo off
echo 🔍 Проверка проекта Construction Work Journal...
echo ==============================================
echo.

echo 📁 Проверка структуры проекта:
echo.

REM Функция проверки директории
setlocal enabledelayedexpansion
set "total_checks=0"
set "passed_checks=0"

call :check_dir "backend"
call :check_dir "frontend"
call :check_dir "docker"
call :check_dir "docker\nginx"
call :check_dir "docker\postgres"

echo.
echo Основные файлы:
call :check_file "docker-compose.yml"
call :check_file "README.md"
call :check_file "INSTRUCTIONS.md"
call :check_file "COMMIT_INSTRUCTIONS.md"
call :check_file "DEPLOYMENT.md"
call :check_file "PROJECT_SUMMARY.md"
call :check_file "FINAL_REPORT.md"
call :check_file "SETUP_GIT.md"
call :check_file "start.bat"
call :check_file "stop.bat"
call :check_file "verify_project.bat"

echo.
echo Backend файлы:
call :check_file "backend\package.json"
call :check_file "backend\tsconfig.json"
call :check_file "backend\Dockerfile"
call :check_file "backend\.env.example"
call :check_file "backend\prisma\schema.prisma"
call :check_file "backend\prisma\seed.ts"
call :check_file "backend\src\index.ts"

echo.
echo Frontend файлы:
call :check_file "frontend\package.json"
call :check_file "frontend\vite.config.ts"
call :check_file "frontend\tsconfig.json"
call :check_file "frontend\Dockerfile"
call :check_file "frontend\.env.example"
call :check_file "frontend\index.html"
call :check_file "frontend\src\main.tsx"
call :check_file "frontend\src\App.tsx"

echo.
echo 🐳 Проверка Docker:
where docker >nul 2>nul
if %errorlevel% equ 0 (
    echo   ✅ Docker установлен
    set /a passed_checks+=1
) else (
    echo   ⚠️  Docker не установлен
)
set /a total_checks+=1

where docker-compose >nul 2>nul
if %errorlevel% equ 0 (
    echo   ✅ Docker Compose установлен
    set /a passed_checks+=1
) else (
    echo   ⚠️  Docker Compose не установлен
)
set /a total_checks+=1

echo.
echo ==============================================
echo 🎯 Итоговая проверка проекта:
echo.
echo 📊 Статистика:
echo   Всего проверок: !total_checks!
echo   Успешных: !passed_checks!
echo.

set /a failed=total_checks - passed_checks
if !failed! equ 0 (
    echo 🎉 ВСЕ ПРОВЕРКИ ПРОЙДЕНЫ УСПЕШНО!
    echo Проект готов к запуску и использованию.
) else (
    echo ⚠️  Найдено проблем: !failed!
    echo Пожалуйста, исправьте отмеченные проблемы перед запуском.
)

echo.
echo 🚀 Для запуска проекта выполните:
echo    start.bat
echo    или
echo    docker-compose up --build
echo.
echo 📚 Подробные инструкции в файлах:
echo    README.md - основная документация
echo    INSTRUCTIONS.md - инструкции по запуску
echo    SETUP_GIT.md - настройка Git репозитория
echo.

goto :eof

:check_dir
if exist "%~1\" (
    echo   ✅ %~1
    set /a passed_checks+=1
) else (
    echo   ❌ %~1 - отсутствует
)
set /a total_checks+=1
goto :eof

:check_file
if exist "%~1" (
    echo   ✅ %~1
    set /a passed_checks+=1
) else (
    echo   ❌ %~1 - отсутствует
)
set /a total_checks+=1
goto :eof