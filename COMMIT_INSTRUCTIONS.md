# Инструкции по коммитам в GitHub

## Шаг 1: Инициализация Git репозитория

```bash
# Перейдите в корень проекта
cd construction-work-journal

# Инициализируйте Git репозиторий
git init

# Добавьте все файлы
git add .

# Создайте первый коммит
git commit -m "Initial commit: Construction Work Journal project"

# Создайте ветку develop
git checkout -b develop
```

## Шаг 2: Создание репозитория на GitHub

1. Зайдите на [GitHub](https://github.com)
2. Нажмите кнопку "New repository"
3. Заполните:
   - Repository name: `construction-work-journal`
   - Description: `Журнал работ на строительном объекте - React + Node.js + PostgreSQL`
   - Выберите "Public" или "Private"
   - НЕ добавляйте README, .gitignore или license (они уже есть)

## Шаг 3: Привязка к удаленному репозиторию

```bash
# Добавьте удаленный репозиторий
git remote add origin https://github.com/YOUR_USERNAME/construction-work-journal.git

# Запушьте изменения
git push -u origin main
git push -u origin develop
```

## Шаг 4: Структура коммитов

### Основные коммиты
1. **Initial commit** - базовая структура проекта
2. **Backend setup** - настройка серверной части
3. **Frontend setup** - настройка клиентской части
4. **Database schema** - схема базы данных
5. **API implementation** - реализация API endpoints
6. **UI components** - компоненты интерфейса
7. **Docker configuration** - конфигурация Docker
8. **Testing setup** - настройка тестов
9. **Documentation** - документация проекта

### Примеры коммитов
```bash
# Добавление функциональности
git add .
git commit -m "feat: add work log creation form with validation"

# Исправление багов
git add .
git commit -m "fix: correct date formatting in work log list"

# Обновление документации
git add .
git commit -m "docs: update README with deployment instructions"

# Рефакторинг
git add .
git commit -m "refactor: improve API error handling"

# Тесты
git add .
git commit -m "test: add unit tests for work log service"
```

## Шаг 5: Рабочий процесс Git

### Feature ветки
```bash
# Создание feature ветки
git checkout develop
git checkout -b feature/add-work-log-editing

# Работа над фичей
# ... делаем изменения ...

# Коммит изменений
git add .
git commit -m "feat: implement work log editing functionality"

# Возврат в develop и мердж
git checkout develop
git merge feature/add-work-log-editing

# Удаление feature ветки
git branch -d feature/add-work-log-editing
```

### Pull Request процесс
1. Создайте feature ветку от `develop`
2. Реализуйте функциональность
3. Создайте Pull Request на GitHub
4. Пройдите code review
5. Смерджите PR в `develop`
6. Удалите feature ветку

## Шаг 6: Деплой

### Production ветка
```bash
# Подготовка к релизу
git checkout develop
git checkout -b release/v1.0.0

# Тестирование и фиксы
# ... тестируем ...

# Мердж в main
git checkout main
git merge release/v1.0.0
git tag v1.0.0

# Пуш тегов
git push origin main --tags
git push origin v1.0.0
```

## Полезные команды

### Просмотр статуса
```bash
git status
git log --oneline --graph --all
```

### Отмена изменений
```bash
# Отмена изменений в файле
git checkout -- filename

# Отмена индексации
git reset HEAD filename

# Отмена последнего коммита
git reset --soft HEAD~1
```

### Работа с ветками
```bash
# Список веток
git branch -a

# Удаление ветки
git branch -d branch-name

# Принудительное удаление
git branch -D branch-name
```

## Best Practices

1. **Мелкие коммиты** - делайте коммиты для каждой логической единицы работы
2. **Осмысленные сообщения** - используйте формат: `тип: описание`
3. **Тестирование** - перед коммитом убедитесь, что тесты проходят
4. **Code review** - всегда делайте review кода перед мерджем
5. **Чистая история** - используйте rebase для поддержания чистой истории

## Типы коммитов
- `feat:` - новая функциональность
- `fix:` - исправление бага
- `docs:` - изменения в документации
- `style:` - форматирование, отсутствие изменений в коде
- `refactor:` - рефакторинг кода
- `test:` - добавление или исправление тестов
- `chore:` - обновление сборки, зависимостей и т.д.