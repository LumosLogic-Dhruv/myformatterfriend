const express = require('express');
const cors = require('cors');
require('dotenv').config();

const documentRoutes = require('./routes/document.routes');

const app = express();

// Middleware
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://myformatterfriendvercel.vercel.app"
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Add root API route for testing
app.get('/api', (req, res) => {
  res.json({ message: 'MyFormatterFriend API is running', status: 'ok' });
});

// Routes
app.use('/api/document', documentRoutes);

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'API Health Check' });
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('Server error:', error);
  res.status(500).json({ error: error.message || 'Internal server error' });
});

module.exports = app;
