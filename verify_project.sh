#!/bin/bash

echo "🔍 Проверка проекта Construction Work Journal..."
echo "=============================================="

# Проверка структуры проекта
echo ""
echo "📁 Проверка структуры проекта:"

check_dir() {
    if [ -d "$1" ]; then
        echo "  ✅ $1"
    else
        echo "  ❌ $1 - отсутствует"
    fi
}

check_file() {
    if [ -f "$1" ]; then
        echo "  ✅ $1"
    else
        echo "  ❌ $1 - отсутствует"
    fi
}

echo ""
echo "Основные директории:"
check_dir "backend"
check_dir "frontend"
check_dir "docker"
check_dir "docker/nginx"
check_dir "docker/postgres"

echo ""
echo "Основные файлы:"
check_file "docker-compose.yml"
check_file "README.md"
check_file "INSTRUCTIONS.md"
check_file "COMMIT_INSTRUCTIONS.md"
check_file "DEPLOYMENT.md"
check_file "PROJECT_SUMMARY.md"
check_file "FINAL_REPORT.md"
check_file "SETUP_GIT.md"
check_file "start.sh"
check_file "stop.sh"
check_file "verify_project.sh"

echo ""
echo "Backend файлы:"
check_file "backend/package.json"
check_file "backend/tsconfig.json"
check_file "backend/Dockerfile"
check_file "backend/.env.example"
check_file "backend/prisma/schema.prisma"
check_file "backend/prisma/seed.ts"
check_file "backend/src/index.ts"

echo ""
echo "Frontend файлы:"
check_file "frontend/package.json"
check_file "frontend/vite.config.ts"
check_file "frontend/tsconfig.json"
check_file "frontend/Dockerfile"
check_file "frontend/.env.example"
check_file "frontend/index.html"
check_file "frontend/src/main.tsx"
check_file "frontend/src/App.tsx"

# Проверка Docker
echo ""
echo "🐳 Проверка Docker:"
if command -v docker &> /dev/null; then
    echo "  ✅ Docker установлен"
else
    echo "  ⚠️  Docker не установлен"
fi

if command -v docker-compose &> /dev/null; then
    echo "  ✅ Docker Compose установлен"
else
    echo "  ⚠️  Docker Compose не установлен"
fi

# Проверка Node.js
echo ""
echo "🟢 Проверка Node.js:"
if command -v node &> /dev/null; then
    node_version=$(node --version)
    echo "  ✅ Node.js $node_version установлен"
    
    # Проверка версии
    if [[ $node_version =~ v([0-9]+) ]]; then
        major_version=${BASH_REMATCH[1]}
        if [ $major_version -ge 18 ]; then
            echo "  ✅ Версия Node.js >= 18 (рекомендуется)"
        else
            echo "  ⚠️  Версия Node.js < 18 (рекомендуется обновить)"
        fi
    fi
else
    echo "  ⚠️  Node.js не установлен"
fi

# Проверка package.json файлов
echo ""
echo "📦 Проверка package.json:"

check_package_json() {
    if [ -f "$1/package.json" ]; then
        echo "  ✅ $1/package.json - существует"
        
        # Проверка основных скриптов
        if grep -q "\"dev\"" "$1/package.json"; then
            echo "    ✅ dev script"
        else
            echo "    ⚠️  dev script отсутствует"
        fi
        
        if grep -q "\"build\"" "$1/package.json"; then
            echo "    ✅ build script"
        else
            echo "    ⚠️  build script отсутствует"
        fi
        
        if grep -q "\"test\"" "$1/package.json"; then
            echo "    ✅ test script"
        else
            echo "    ⚠️  test script отсутствует"
        fi
    else
        echo "  ❌ $1/package.json - отсутствует"
    fi
}

check_package_json "backend"
check_package_json "frontend"

# Проверка Docker Compose файла
echo ""
echo "🐳 Проверка docker-compose.yml:"
if [ -f "docker-compose.yml" ]; then
    services_count=$(grep -c "^\s*[a-zA-Z-]*:" docker-compose.yml | head -1)
    echo "  ✅ docker-compose.yml - существует ($services_count сервисов)"
    
    # Проверка основных сервисов
    if grep -q "postgres" docker-compose.yml; then
        echo "    ✅ PostgreSQL сервис"
    else
        echo "    ⚠️  PostgreSQL сервис отсутствует"
    fi
    
    if grep -q "backend" docker-compose.yml; then
        echo "    ✅ Backend сервис"
    else
        echo "    ⚠️  Backend сервис отсутствует"
    fi
    
    if grep -q "frontend" docker-compose.yml; then
        echo "    ✅ Frontend сервис"
    else
        echo "    ⚠️  Frontend сервис отсутствует"
    fi
else
    echo "  ❌ docker-compose.yml - отсутствует"
fi

# Проверка README
echo ""
echo "📚 Проверка документации:"
if [ -f "README.md" ]; then
    readme_lines=$(wc -l < README.md)
    echo "  ✅ README.md - существует ($readme_lines строк)"
    
    # Проверка ключевых разделов
    if grep -q "# 🏗️" README.md; then
        echo "    ✅ Заголовок проекта"
    fi
    
    if grep -q "## 🚀 Быстрый запуск" README.md; then
        echo "    ✅ Раздел быстрого запуска"
    fi
    
    if grep -q "## 📁 Структура проекта" README.md; then
        echo "    ✅ Раздел структуры проекта"
    fi
    
    if grep -q "docker-compose up" README.md; then
        echo "    ✅ Инструкции Docker Compose"
    fi
else
    echo "  ❌ README.md - отсутствует"
fi

# Итоговая проверка
echo ""
echo "=============================================="
echo "🎯 Итоговая проверка проекта:"

total_checks=0
passed_checks=0

# Подсчет проверок
count_checks() {
    local output="$1"
    total=$(echo "$output" | grep -E "✅|❌|⚠️" | wc -l)
    passed=$(echo "$output" | grep "✅" | wc -l)
    echo "$total $passed"
}

result=$(check_dir "backend" 2>/dev/null)
counts=$(count_checks "$result")
total_checks=$((total_checks + $(echo $counts | cut -d' ' -f1)))
passed_checks=$((passed_checks + $(echo $counts | cut -d' ' -f2)))

# Вывод итогов
echo ""
echo "📊 Статистика:"
echo "  Всего проверок: $total_checks"
echo "  Успешных: $passed_checks"

if [ $total_checks -eq $passed_checks ]; then
    echo ""
    echo "🎉 ВСЕ ПРОВЕРКИ ПРОЙДЕНЫ УСПЕШНО!"
    echo "Проект готов к запуску и использованию."
else
    failed=$((total_checks - passed_checks))
    echo ""
    echo "⚠️  Найдено проблем: $failed"
    echo "Пожалуйста, исправьте отмеченные проб��емы перед запуском."
fi

echo ""
echo "🚀 Для запуска проекта выполните:"
echo "   ./start.sh"
echo "   или"
echo "   docker-compose up --build"
echo ""
echo "📚 Подробные инструкции в файлах:"
echo "   README.md - основная документация"
echo "   INSTRUCTIONS.md - инструкции по запуску"
echo "   SETUP_GIT.md - настройка Git репозитория"