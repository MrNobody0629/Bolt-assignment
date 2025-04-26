const express = require('express');
const config = require('./config/config');

// Initialize app
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Log requests in development
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// Root route
app.get('/health', (req, res) => {
  res.send('Bolt server is up and running');
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    message: 'Internal Server Error',
    error: config.nodeEnv === 'development' ? err.message : {}
  });
});

// Start server
app.listen(config.port, () => {
  console.log(`Server running in ${config.nodeEnv} mode on port ${config.port}`);
});