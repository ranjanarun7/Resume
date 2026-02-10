#!/bin/bash
# Quick Start Checklist for AI Resume Screening App

echo "🚀 AI Resume Screening - Quick Start"
echo "===================================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js not found. Please install Node.js from https://nodejs.org"
    exit 1
fi

echo "✅ Node.js version: $(node --version)"
echo ""

# Navigate to backend and install dependencies
echo "📦 Installing backend dependencies..."
cd backend
if [ ! -d "node_modules" ]; then
    npm install
else
    echo "✅ Backend dependencies already installed"
fi

echo ""
echo "🔑 Checking environment variables..."
if grep -q "your_gemini_api_key" .env; then
    echo "⚠️  WARNING: .env still has placeholder API key!"
    echo "   📝 Update backend/.env with your actual GEMINI_API_KEY"
    echo "   Get it from: https://ai.google.dev/"
else
    echo "✅ GEMINI_API_KEY appears to be set"
fi

echo ""
echo "✅ Backend setup complete!"
echo ""

# Navigate to frontend and install dependencies
echo "📦 Installing frontend dependencies..."
cd ../frontend
if [ ! -d "node_modules" ]; then
    npm install
else
    echo "✅ Frontend dependencies already installed"
fi

echo ""
echo "✅ Frontend setup complete!"
echo ""

echo "🎯 Ready to start!"
echo "=================="
echo ""
echo "In Terminal 1 (Backend):"
echo "  cd backend"
echo "  node server.js"
echo ""
echo "In Terminal 2 (Frontend):"
echo "  cd frontend"
echo "  npm run dev"
echo ""
echo "Then open: http://localhost:5173"
echo ""
