#!/bin/bash

echo "============================================"
echo "✅ VERIFY STYLISH FRONTEND"
echo "============================================"
echo ""
echo "This script verifies the stylish frontend works correctly."
echo ""

echo "Step 1: Check backend is running..."
curl -f http://localhost:5000/health
if [ $? -ne 0 ]; then
    echo "⚠️ Backend not running. Please start it first:"
    echo "1. Open terminal"
    echo "2. Run: cd backend"
    echo "3. Run: npm start"
    echo ""
    echo "Then run this script again."
    exit 1
fi

echo ""
echo "✅ Backend is running!"
echo ""

echo "Step 2: Start the stylish frontend..."
echo "Starting on http://localhost:3000"
echo ""
cd frontend
npm run dev
echo ""
echo "🌐 Open browser to: http://localhost:3000"
echo ""
echo "🎨 You should see:"
echo "- Modern construction-themed design with gradients"
echo "- Professional header with construction icon"
echo "- 4 interactive stats cards"
echo "- Beautiful two-column layout"
echo "- Stylish form with icons"
echo "- Professional table with hover effects"
echo ""
echo "💡 If you see errors:"
echo "1. Make sure backend is running on http://localhost:5000"
echo "2. Check console for any errors"
echo "3. Refresh the page"
echo ""