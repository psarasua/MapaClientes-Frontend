/* eslint-env node */
/* eslint-disable no-undef */
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

console.log('🚀 Starting server...');
console.log('📍 Port:', PORT);
console.log('📁 Directory:', __dirname);
console.log('🌍 NODE_ENV:', process.env.NODE_ENV);

// Verificar que la carpeta dist existe
const distPath = path.join(__dirname, 'dist');
console.log('📦 Checking dist directory:', distPath);

try {
  const distExists = fs.existsSync(distPath);
  console.log('📦 Dist exists:', distExists);
  
  if (distExists) {
    const distContents = fs.readdirSync(distPath);
    console.log('📦 Dist contents:', distContents);
    
    const indexExists = fs.existsSync(path.join(distPath, 'index.html'));
    console.log('📄 index.html exists:', indexExists);
  } else {
    console.error('❌ ERROR: dist directory does not exist!');
    console.log('📁 Current directory contents:', fs.readdirSync(__dirname));
  }
} catch (error) {
  console.error('❌ ERROR checking dist directory:', error);
}

// Middleware de logging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Health check endpoint
app.get('/health', (req, res) => {
  const healthInfo = {
    status: 'OK',
    timestamp: new Date().toISOString(),
    port: PORT,
    distExists: fs.existsSync(distPath),
    indexExists: fs.existsSync(path.join(distPath, 'index.html'))
  };
  console.log('🏥 Health check:', healthInfo);
  res.status(200).json(healthInfo);
});

// Servir archivos estáticos desde la carpeta dist
app.use(express.static(distPath, {
  setHeaders: (res, filePath) => {
    console.log('📁 Serving static file:', filePath);
  }
}));

// Manejar todas las rutas (para SPA)
app.get('*', (req, res) => {
  try {
    const indexPath = path.join(distPath, 'index.html');
    console.log('📄 Serving index.html from:', indexPath);
    
    if (!fs.existsSync(indexPath)) {
      console.error('❌ ERROR: index.html not found at:', indexPath);
      return res.status(404).send('index.html not found');
    }
    
    res.sendFile(indexPath);
  } catch (error) {
    console.error('❌ ERROR serving index.html:', error);
    res.status(500).send('Server Error: ' + error.message);
  }
});

// Manejo de errores
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error('💥 Server error:', err);
  res.status(500).send('Something went wrong! ' + err.message);
});

const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Server running on http://0.0.0.0:${PORT}`);
  console.log(`✅ Server started successfully at ${new Date().toISOString()}`);
  console.log(`🌐 Access URL: http://0.0.0.0:${PORT}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('🛑 SIGTERM received, shutting down gracefully');
  server.close(() => {
    console.log('🛑 Process terminated');
  });
});

process.on('SIGINT', () => {
  console.log('🛑 SIGINT received, shutting down gracefully');
  server.close(() => {
    console.log('🛑 Process terminated');
  });
});
