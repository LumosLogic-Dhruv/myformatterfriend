const express = require('express');
const cors = require('cors');
require('dotenv').config();

const documentRoutes = require('./routes/document.routes');

const app = express();

// Middleware - Proper CORS for Vercel-Render communication
app.use(
  cors({
    origin: [
      "https://formatterfriend.vercel.app",
      "https://formatterfriend-oykrppvyb-dhruv-sheres-projects.vercel.app",
      "http://localhost:5173"
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: false
  })
);

// Add request logging middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Root API route (test)
app.get('/api', (req, res) => {
  res.json({ 
    message: 'MyFormatterFriend API is running', 
    status: 'ok' 
  });
});

// Main routes
app.use('/api/document', documentRoutes);

// Health checks
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

app.get('/api/health', (req, res) => {
  res.status(200).json({ 
    status: 'ok', 
    message: 'API Health Check' 
  });
});

// Global error handler
app.use((error, req, res, next) => {
  console.error('Server error:', error);
  res.status(500).json({ 
    error: error.message || 'Internal server error' 
  });
});

module.exports = app;
