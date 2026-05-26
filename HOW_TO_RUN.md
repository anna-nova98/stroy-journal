# 🚀 How to Run the Construction Work Journal Project

## Quick Start (Windows)
1. **Open PowerShell or Command Prompt** in the project folder
2. **Run the all-in-one script**: `.\RUN_EVERYTHING.bat`
3. **Wait 30 seconds** for everything to start
4. **Open browser** to: http://localhost:3000

## Quick Start (Linux/Mac)
1. **Open Terminal** in the project folder
2. **Make script executable**: `chmod +x RUN_EVERYTHING.sh`
3. **Run the all-in-one script**: `./RUN_EVERYTHING.sh`
4. **Wait 30 seconds** for everything to start
5. **Open browser** to: http://localhost:3000

## Manual Setup (If scripts don't work)

### Step 1: Start Database
```bash
docker-compose up -d postgres
```

### Step 2: Start Backend
Open **Terminal 1**:
```bash
cd backend
npm install
npm run build
npm start
```
Backend runs on: http://localhost:5000

### Step 3: Start Frontend
Open **Terminal 2**:
```bash
cd frontend
npm install
npm run dev
```
Frontend runs on: http://localhost:3000

## What You'll See

### 🌐 Backend (http://localhost:5000)
- Health check: http://localhost:5000/health
- API documentation page
- Database connection status

### 🎨 Frontend (http://localhost:3000)
- Complete construction work journal interface
- Add, edit, delete work logs
- Filter by date and worker name
- Pagination and search functionality

## API Endpoints
- `GET /health` - Health check
- `GET /api/work-logs` - List all work logs
- `POST /api/work-logs` - Create new work log
- `GET /api/work-types` - List all work types

## Troubleshooting

### ❌ "Cannot find module" errors
If backend fails to start:
1. Make sure you ran `npm install` in backend folder
2. Run `npx prisma generate` in backend folder
3. Run `npm run build` again

### ❌ Frontend build fails
If frontend fails to build:
1. Make sure you're using Node.js 18+
2. Delete `frontend/node_modules` and `frontend/package-lock.json`
3. Run `npm install` again in frontend folder

### ❌ Database connection issues
1. Make sure Docker is running
2. Check if PostgreSQL container is running: `docker ps`
3. Restart database: `docker-compose restart postgres`

## Stopping the Project
1. **Close** the backend and frontend terminal windows
2. **Stop database**: `docker-compose down`

## Need Help?
- Check the logs: `docker-compose logs`
- Test backend: `curl http://localhost:5000/health`
- Test frontend: Open http://localhost:3000 in browser

## Project Structure
```
construction-work-journal/
├── backend/          # Node.js + Express API
├── frontend/         # React + TypeScript UI
├── docker/           # Docker configurations
├── RUN_EVERYTHING.bat  # Windows run script
├── RUN_EVERYTHING.sh   # Linux/Mac run script
└── docker-compose.yml  # Docker services
```

## Requirements
- Docker Desktop (for database)
- Node.js 18+
- npm or yarn