#!/bin/bash

echo "🚀 Starting deployment process..."

# Verificar que Node.js está instalado
echo "📦 Node version: $(node --version)"
echo "📦 NPM version: $(npm --version)"

# Instalar dependencias
echo "📦 Installing dependencies..."
npm install

# Construir la aplicación
echo "🔨 Building application..."
npm run build

# Verificar que dist existe
if [ -d "dist" ]; then
    echo "✅ Build successful - dist directory exists"
    ls -la dist/
else
    echo "❌ Build failed - dist directory not found"
    exit 1
fi

# Iniciar el servidor
echo "🚀 Starting server..."
node server.js
