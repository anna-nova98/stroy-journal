# 🚀 Настройка Git репозитория

## Шаг 1: Инициализация локального репозитория

```bash
# Перейдите в корень проекта
cd construction-work-journal

# Инициализируйте Git репозиторий
git init

# Добавьте все файлы
git add .

# Создайте первый коммит
git commit -m "feat: initial project structure"

# Создайте ветку develop
git checkout -b develop
```

## Шаг 2: Создание репозитория на GitHub

1. **Зайдите на [GitHub](https://github.com)**
2. **Нажмите кнопку "+" в правом верхнем углу → "New repository"**
3. **Заполните форму:**
   - Repository name: `construction-work-journal`
   - Description: `Журнал работ на строительном объекте - React + Node.js + PostgreSQL`
   - Visibility: Public (рекомендуется) или Private
   - **ВАЖНО**: НЕ добавляйте README, .gitignore или license (они уже есть в проекте)

4. **Нажмите "Create repository"**

## Шаг 3: Привязка к удаленному репозиторию

```bash
# Добавьте удаленный репозиторий (замените YOUR_USERNAME на ваш)
git remote add origin https://github.com/YOUR_USERNAME/construction-work-journal.git

# Запушьте ветку main
git checkout main
git push -u origin main

# Запушьте ветку develop
git checkout develop
git push -u origin develop
```

## Шаг 4: Проверка настройки

```bash
# Проверьте удаленные репозитории
git remote -v

# Проверьте ветки
git branch -a

# Проверьте статус
git status
```

## Шаг 5: Рабочий процесс Git

### Создание feature ветки
```bash
# Перейдите на develop
git checkout develop

# Создайте feature ветку
git checkout -b feature/add-new-feature

# Работайте над фичей
# ... делайте изменения ...

# Добавьте изменения
git add .

# Создайте коммит
git commit -m "feat: add new feature description"

# Запушьте feature ветку
git push -u origin feature/add-new-feature
```

### Создание Pull Request
1. **Зайдите на GitHub в ваш репозиторий**
2. **Нажмите "Compare & pull request"**
3. **Заполните информацию:**
   - Title: Краткое описание изменений
   - Description: Подробное описание что было сделано
   - Reviewers: Укажите ревьюеров (если есть)
   - Assignees: Назначьте ответственного

4. **Нажмите "Create pull request"**

### Мердж Pull Request
1. **Дождитесь approval от ревьюеров**
2. **Нажмите "Merge pull request"**
3. **Выберите "Squash and merge" (рекомендуется)**
4. **Нажмите "Confirm merge"**
5. **Удалите feature ветку на GitHub**

### Локальное обновление
```bash
# Вернитесь на develop
git checkout develop

# Получите последние изменения
git pull origin develop

# Удалите локальную feature ветку
git branch -d feature/add-new-feature
```

## Шаг 6: Структура коммитов

### Формат сообщений коммитов
```
тип(область): краткое описание

Подробное описание (если нужно)

Closes #номер-issue
```

### Типы коммитов
- `feat:` - новая функциональность
- `fix:` - исправление бага
- `docs:` - изменения в документации
- `style:` - форматирование кода
- `refactor:` - рефакторинг кода
- `test:` - добавление или исправление тестов
- `chore:` - обновление зависимостей, настройка

### Примеры коммитов
```bash
# Новая функциональность
git commit -m "feat(work-log): add editing functionality with validation"

# Исправление бага
git commit -m "fix(api): correct date parsing in work log controller"

# Обновление документации
git commit -m "docs(readme): add deployment instructions"

# Рефакторинг
git commit -m "refactor(components): extract form validation to separate hook"

# Тесты
git commit -m "test(services): add unit tests for work log service"
```

## Шаг 7: Git Hooks (опционально)

### Pre-commit hook для линтинга
Создайте файл `.git/hooks/pre-commit`:
```bash
#!/bin/bash

echo "Running pre-commit checks..."

# Backend linting
cd backend
npm run lint
if [ $? -ne 0 ]; then
  echo "Backend linting failed"
  exit 1
fi

# Frontend linting
cd ../frontend
npm run lint
if [ $? -ne 0 ]; then
  echo "Frontend linting failed"
  exit 1
fi

echo "Pre-commit checks passed!"
```

Сделайте его исполняемым:
```bash
chmod +x .git/hooks/pre-commit
```

## Шаг 8: Полезные команды Git

### Просмотр истории
```bash
# Компактный просмотр
git log --oneline --graph --all

# Поиск по сообщениям
git log --grep="feat"

# Просмотр изменений файла
git log -p filename
```

### Работа с изменениями
```bash
# Просмотр изменений
git diff

# Просмотр staged изменений
git diff --staged

# Отмена изменений в файле
git checkout -- filename

# Отмена индексации файла
git reset HEAD filename
```

### Работа с ветками
```bash
# Список всех веток
git branch -a

# Удаление ветки
git branch -d branch-name

# Принудительное удаление
git branch -D branch-name

# Переименование ветки
git branch -m old-name new-name
```

### Работа с удаленным репозиторием
```bash
# Получение изменений
git fetch origin

# Обновление ветки
git pull origin branch-name

# Отправка изменений
git push origin branch-name

# Удаление удаленной ветки
git push origin --delete branch-name
```

## Шаг 9: Решение проблем

### Проблема: Отклоненные изменения
```bash
# Получите последние изменения
git fetch origin

# Перебазируйте ваши изменения
git rebase origin/develop

# Или сделайте merge
git merge origin/develop
```

### Проблема: Конфликты слияния
```bash
# Решите конфликты в файлах
# Затем добавьте файлы
git add .

# Продолжите rebase
git rebase --continue

# Или завершите merge
git commit
```

### Проблема: Потерянные коммиты
```bash
# Найдите потерянные коммиты
git reflog

# Восстановите коммит
git checkout commit-hash
```

## Шаг 10: Best Practices

### 1. Частые коммиты
- Делайте коммиты для каждой логической единицы работы
- Не накапливайте изменения

### 2. Осмысленные сообщения
- Используйте соглашение о коммитах
- Пишите на английском (рекомендуется)
- Опишите что и почему было изменено

### 3. Code review
- Всегда делайте review перед мерджем
- Используйте Pull Requests
- Принимайте конструктивную критику

### 4. Чистая история
- Используйте rebase для поддержания линейной истории
- Удаляйте мерженые feature ветки
- Следите за .gitignore

### 5. Тестирование
- Запускайте тесты перед коммитом
- Не коммитьте сломанные тесты
- Добавляйте тесты для новой функциональности

## 🎉 Поздравляем!

Ваш Git репозиторий настроен и готов к работе. Теперь вы можете:

1. **Разрабатывать новые функции** в feature ветках
2. **Создавать Pull Requests** для code review
3. **Деплоить изменения** через CI/CD
4. **Сотрудничать с командой** через GitHub

### Следующие шаги:
1. Настройте CI/CD (GitHub Actions, GitLab CI, etc.)
2. Добавьте issue templates
3. Настройте code owners
4. Добавьте защиту веток (branch protection)

**Удачи в разработке! 🚀**