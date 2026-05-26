# 🚀 Simple Instructions to Run the Project

## For Windows Users:
1. **Double-click** `START_PROJECT.bat`
2. **Wait 30 seconds** for everything to start
3. **Open browser** to: http://localhost:3000

## For Linux/Mac Users:
1. **Open Terminal** in the project folder
2. **Run**: `chmod +x START_PROJECT.sh`
3. **Run**: `./START_PROJECT.sh`
4. **Wait 30 seconds** for everything to start
5. **Open browser** to: http://localhost:3000

## What Happens:
- ✅ PostgreSQL database starts in Docker
- ✅ Backend API starts on http://localhost:5000
- ✅ Frontend app starts on http://localhost:3000
- ✅ Database connection is automatically configured

## If Something Doesn't Work:

### 1. Check Docker is Running
- Open Docker Desktop (Windows/Mac)
- Or run: `docker --version` in terminal

### 2. Manual Steps (if script fails):
```bash
# Step 1: Start database
docker-compose up -d postgres

# Step 2: Start backend (in Terminal 1)
cd backend
npm install
npm start

# Step 3: Start frontend (in Terminal 2)
cd frontend
npm install
npm run dev
```

### 3. Common Issues:
- **Port 5000 in use**: Kill process using port 5000
- **Port 3000 in use**: Kill process using port 3000
- **Database errors**: Wait 30 seconds, database needs time to start

## Project URLs:
- **Frontend App**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **API Health Check**: http://localhost:5000/health

## To Stop Everything:
1. Close the backend and frontend terminal windows
2. Run: `docker-compose down`

## Need Help?
The project includes all dependencies and configurations. Just run the script and wait 30 seconds!