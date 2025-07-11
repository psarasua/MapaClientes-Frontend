#!/bin/bash

echo "🔍 Railway Deployment Checker"
echo "================================="

# 1. Verificar Node.js
echo "📍 Node.js version: $(node --version)"
echo "📍 NPM version: $(npm --version)"

# 2. Verificar dependencias
echo ""
echo "📦 Installing dependencies..."
npm install

# 3. Ejecutar build
echo ""
echo "🔨 Building application..."
npm run build

# 4. Verificar que dist existe
echo ""
echo "📂 Checking dist directory..."
if [ -d "dist" ]; then
    echo "✅ dist directory exists"
    echo "📁 Contents:"
    ls -la dist/
    
    if [ -f "dist/index.html" ]; then
        echo "✅ index.html exists"
        echo "📄 Size: $(wc -c < dist/index.html) bytes"
    else
        echo "❌ index.html NOT found"
        exit 1
    fi
else
    echo "❌ dist directory NOT found"
    exit 1
fi

# 5. Verificar servidor
echo ""
echo "🚀 Testing server startup..."
timeout 10s node server.js &
SERVER_PID=$!
sleep 2

# 6. Verificar health endpoint
echo ""
echo "🏥 Testing health endpoint..."
if command -v curl &> /dev/null; then
    curl -f http://localhost:3000/health || echo "❌ Health check failed"
else
    echo "⚠️  curl not available, skipping health check"
fi

# Cleanup
kill $SERVER_PID 2>/dev/null || true

echo ""
echo "✅ Deployment check complete!"
