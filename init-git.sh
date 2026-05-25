#!/bin/bash

# Инициализация Git репозитория
echo "Инициализация Git репозитория..."

# Инициализируем репозиторий
git init

# Добавляем все файлы
git add .

# Создаем первый коммит
git commit -m "Initial commit: Construction Work Journal project"

# Создаем ветку develop
git checkout -b develop

echo "✅ Git репозиторий инициализирован!"
echo "📁 Структура проекта создана"
echo "🚀 Для запуска проекта выполните: docker-compose up --build"