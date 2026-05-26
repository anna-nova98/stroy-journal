#!/bin/bash

echo "============================================"
echo "🚀 START PROJECT - Construction Work Journal"
echo "============================================"
echo ""
echo "This script starts EVERYTHING with one command!"
echo ""

echo "Step 1: Starting PostgreSQL database..."
docker-compose up -d postgres
if [ $? -ne 0 ]; then
    echo "❌ Failed to start database."
    echo "Please make sure Docker is running."
    exit 1
fi
echo "✅ Database started."
echo "Waiting 5 seconds for database to initialize..."
sleep 5
echo ""

echo "Step 2: Setting up backend environment..."
echo "Creating .env file for backend..."
cat > backend/.env << EOF
# Database
DATABASE_URL="postgresql://postgres:password@localhost:5432/construction_journal"

# Server
PORT=5000
NODE_ENV=development

# CORS
CORS_ORIGIN="http://localhost:3000"

# Logging
LOG_LEVEL="info"
EOF
echo "✅ Environment file created."
echo ""

echo "Step 3: Starting backend..."
echo "Starting backend on http://localhost:5000"
gnome-terminal -- bash -c "cd backend && npm start; exec bash" 2>/dev/null || \
xterm -e "cd backend && npm start" 2>/dev/null || \
echo "Please open a new terminal and run: cd backend && npm start"
echo "✅ Backend started."
echo ""

echo "Step 4: Starting frontend..."
echo "Starting frontend on http://localhost:3000"
gnome-terminal -- bash -c "cd frontend && npm run dev; exec bash" 2>/dev/null || \
xterm -e "cd frontend && npm run dev" 2>/dev/null || \
echo "Please open a new terminal and run: cd frontend && npm run dev"
echo "✅ Frontend started."
echo ""

echo "============================================"
echo "🎉 PROJECT STARTED SUCCESSFULLY!"
echo "============================================"
echo ""
echo "⏳ Please wait 30 seconds for everything to start..."
echo ""
echo "🌐 Open in browser:"
echo "- Frontend (main app): http://localhost:3000"
echo "- Backend (API): http://localhost:5000"
echo ""
echo "📊 What you'll see:"
echo "1. Frontend: Complete construction work journal"
echo "2. Backend: API documentation page"
echo ""
echo "🛑 To stop everything:"
echo "1. Close the backend and frontend terminal windows"
echo "2. Run: docker-compose down"
echo ""
echo "💡 Troubleshooting:"
echo "- If you see errors, wait 30 seconds and refresh"
echo "- Check that both terminal windows are running"
echo "- Make sure Docker is running"
echo ""