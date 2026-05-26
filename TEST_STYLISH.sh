#!/bin/bash

echo "============================================"
echo "🎨 TEST STYLISH FRONTEND"
echo "============================================"
echo ""
echo "This script tests if the stylish frontend builds correctly."
echo ""

echo "Step 1: Check if backend is running..."
curl -f http://localhost:5000/health
if [ $? -ne 0 ]; then
    echo "⚠️ Backend is not running. Starting it..."
    gnome-terminal -- bash -c "cd backend && npm start; exec bash" 2>/dev/null || \
    xterm -e "cd backend && npm start" 2>/dev/null || \
    echo "Please start backend manually: cd backend && npm start"
    echo "Waiting 10 seconds for backend to start..."
    sleep 10
fi

echo ""
echo "Step 2: Install frontend dependencies..."
cd frontend
npm install
if [ $? -ne 0 ]; then
    echo "❌ npm install failed."
    exit 1
fi

echo ""
echo "Step 3: Build frontend to check for errors..."
npm run build
if [ $? -ne 0 ]; then
    echo "❌ Frontend build failed."
    echo ""
    echo "💡 Common issues:"
    echo "1. Delete node_modules and package-lock.json"
    echo "2. Run: npm install again"
    echo "3. Check TypeScript errors"
    exit 1
fi

echo ""
echo "✅ Frontend builds successfully!"
echo ""
echo "Step 4: Start the stylish frontend..."
echo "Starting on http://localhost:3000"
echo ""
npm run dev
echo ""
echo "🌐 Open browser to: http://localhost:3000"
echo ""
echo "🎨 You should see:"
echo "- Modern construction-themed design"
echo "- Gradient headers and cards"
echo "- Interactive hover effects"
echo "- Beautiful typography and spacing"
echo ""