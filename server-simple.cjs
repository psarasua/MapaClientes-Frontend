const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

console.log('🚀 Simple server starting...');
console.log('📍 Port:', PORT);

// Servir archivos estáticos
app.use(express.static('dist'));

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    port: PORT,
    timestamp: new Date().toISOString() 
  });
});

// SPA fallback
app.get('*', (req, res) => {
  res.sendFile(path.resolve('dist', 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Server running on port ${PORT}`);
});

module.exports = app;
