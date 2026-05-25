#!/bin/bash

echo "============================================"
echo "🚀 Run Construction Work Journal (Backend Only)"
echo "============================================"
echo ""
echo "This script runs only the backend and database services."
echo "Frontend can be run separately in development mode."
echo ""

echo "📦 Starting PostgreSQL and Backend..."
docker-compose up postgres backend

echo ""
echo "✅ Backend is running!"
echo ""
echo "🌐 Access points:"
echo "- Backend API: http://localhost:5000"
echo "- Health check: http://localhost:5000/health"
echo "- PostgreSQL: localhost:5432"
echo ""
echo "📝 To run frontend separately:"
echo "1. Open new terminal"
echo "2. cd frontend"
echo "3. npm install"
echo "4. npm run dev"
echo ""
echo "🎯 Frontend will be available at: http://localhost:3000"
echo ""