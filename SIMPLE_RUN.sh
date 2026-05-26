#!/bin/bash

echo "============================================"
echo "🚀 SIMPLE RUN - Construction Work Journal"
echo "============================================"
echo ""
echo "This script runs the project in the simplest way possible."
echo ""

echo "Step 1: Start database and backend with Docker..."
echo ""
docker-compose up -d postgres backend
if [ $? -ne 0 ]; then
    echo "❌ Docker services failed to start."
    echo "Please make sure Docker is running."
    exit 1
fi

echo ""
echo "✅ Database and backend started."
echo "Waiting 10 seconds for services to initialize..."
sleep 10

echo ""
echo "Step 2: Test backend..."
curl -f http://localhost:5000/health
if [ $? -ne 0 ]; then
    echo "⚠️ Backend might still be starting. Checking logs..."
    docker-compose logs backend --tail=10
    echo ""
    echo "Please wait a bit longer and try opening http://localhost:5000"
else
    echo "✅ Backend is working!"
fi

echo ""
echo "Step 3: Run frontend locally (no Docker)..."
echo ""
echo "📋 INSTRUCTIONS for frontend:"
echo "1. Open a NEW terminal window"
echo "2. Run these commands:"
echo "   cd frontend"
echo "   npm install"
echo "   npm run dev"
echo "3. Open browser to: http://localhost:3000"
echo ""
echo "🌐 Backend is available at: http://localhost:5000"
echo "📊 API endpoints:"
echo "  - Health: http://localhost:5000/health"
echo "  - Work Logs: http://localhost:5000/api/work-logs"
echo "  - Work Types: http://localhost:5000/api/work-types"
echo ""
echo "🛑 To stop everything: docker-compose down"
echo ""