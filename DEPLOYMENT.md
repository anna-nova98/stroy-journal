# Инструкции по деплою

## Варианты деплоя

### 1. Docker Compose (рекомендуется для продакшена)

```bash
# Сборка и запуск
docker-compose up --build -d

# Проверка статуса
docker-compose ps

# Просмотр логов
docker-compose logs -f
```

### 2. Kubernetes

```yaml
# deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: construction-journal
spec:
  replicas: 3
  selector:
    matchLabels:
      app: construction-journal
  template:
    metadata:
      labels:
        app: construction-journal
    spec:
      containers:
      - name: backend
        image: construction-journal-backend:latest
        ports:
        - containerPort: 5000
        env:
        - name: DATABASE_URL
          valueFrom:
            secretKeyRef:
              name: db-secret
              key: url
      - name: frontend
        image: construction-journal-frontend:latest
        ports:
        - containerPort: 3000
```

### 3. Облачные провайдеры

#### AWS (Elastic Beanstalk)
```bash
# Упаковка приложения
zip -r construction-journal.zip . -x "node_modules/*" ".git/*"

# Деплой
eb init construction-journal
eb create construction-journal-env
eb deploy
```

#### Heroku
```bash
# Создание приложений
heroku create construction-journal-backend
heroku create construction-journal-frontend

# Деплой backend
cd backend
heroku git:remote -a construction-journal-backend
git push heroku main

# Деплой frontend
cd frontend
heroku git:remote -a construction-journal-frontend
git push heroku main
```

## Конфигурация продакшена

### Environment Variables

#### Backend (.env.production)
```env
DATABASE_URL=postgresql://user:password@host:5432/construction_journal
PORT=5000
NODE_ENV=production
CORS_ORIGIN=https://your-domain.com
LOG_LEVEL=warn
```

#### Frontend (.env.production)
```env
VITE_API_URL=https://api.your-domain.com/api
VITE_NODE_ENV=production
```

### База данных

#### Миграции в продакшене
```bash
cd backend
npx prisma migrate deploy
npx prisma db seed
```

#### Резервное копирование
```bash
# Экспорт данных
pg_dump construction_journal > backup.sql

# Импорт данных
psql construction_journal < backup.sql
```

## Мониторинг и логирование

### Логи
```bash
# Docker логи
docker-compose logs -f backend
docker-compose logs -f frontend

# Файловые логи
tail -f logs/backend.log
tail -f logs/frontend.log
```

### Мониторинг
- **Prometheus + Grafana** - метрики приложения
- **Sentry** - отслеживание ошибок
- **Logstash + Elasticsearch** - централизованное логирование

## Безопасность

### SSL/TLS
```nginx
# Nginx конфигурация
server {
    listen 443 ssl;
    server_name your-domain.com;
    
    ssl_certificate /etc/ssl/certs/your-domain.crt;
    ssl_certificate_key /etc/ssl/private/your-domain.key;
    
    # ... остальная конфигурация
}
```

### Защита API
- **Rate limiting** - ограничение запросов
- **API ключи** - аутентификация запросов
- **CORS** - ограничение доменов

## Масштабирование

### Горизонтальное масштабирование
```bash
# Увеличение количества реплик
docker-compose up --scale backend=3 --scale frontend=2 -d

# Балансировка нагрузки
# Используйте Nginx или HAProxy
```

### Вертикальное масштабирование
```dockerfile
# Dockerfile с оптимизациями
FROM node:18-alpine AS builder
# ... этапы сборки

FROM node:18-alpine
# ... этапы production
```

## Резервное копирование

### Автоматическое резервное копирование
```bash
#!/bin/bash
# backup.sh
DATE=$(date +%Y%m%d_%H%M%S)
pg_dump construction_journal > /backups/construction_journal_$DATE.sql
find /backups -name "*.sql" -mtime +7 -delete
```

### Восстановление
```bash
# Восстановление из backup
psql construction_journal < backup.sql

# Проверка целостности
pg_restore --list backup.sql
```

## Обновление

### Zero-downtime деплой
```bash
# Синий-зеленый деплоймент
# 1. Запуск новой версии
docker-compose -f docker-compose.new.yml up -d

# 2. Переключение трафика
# 3. Остановка старой версии
docker-compose down
```

### Откат изменений
```bash
# Откат к предыдущей версии
git checkout previous-commit
docker-compose up --build -d
```

## Производительность

### Оптимизации
- **Кэширование** - Redis для частых запросов
- **CDN** - для статических файлов
- **Сжатие** - gzip для API ответов
- **Индексы БД** - оптимизация запросов

### Нагрузочное тестирование
```bash
# Использование k6
k6 run load-test.js

# Использование Apache Bench
ab -n 1000 -c 100 https://api.your-domain.com/api/work-logs
```

## Поддержка

### Health checks
```bash
# Проверка здоровья
curl https://api.your-domain.com/health

# Проверка БД
curl https://api.your-domain.com/health/db
```

### Алертинг
- **Мониторинг uptime** - UptimeRobot или Pingdom
- **Оповещения** - Slack, Email, SMS
- **Метрики** - CPU, память, дисковое пространство

## Стоимость

### Оценка стоимости (месяц)
- **VPS/Cloud** - $10-50
- **База данных** - $5-20
- **Доменное имя** - $10-15
- **SSL сертификат** - $0-100
- **Мониторинг** - $0-50

### Бесплатные опции
- **Heroku** - бесплатный тариф
- **Vercel** - деплой frontend
- **Supabase** - база данных
- **Let's Encrypt** - SSL сертификаты