import 'dotenv/config';

import express from 'express';
import cors from 'cors';

import { connectDB } from './config/db.js';
import noteRoutes from './routes/noteRoutes.js';
import authRoutes from './routes/authRoutes.js';
import errorHandler from './middleware/errorMiddleware.js';

const PORT = process.env.PORT || 5000;

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// API health route
app.get('/api', (req, res) => {
  res.json({
    message: 'Welcome to MERN Note App API',
  });
});

// Authentication routes
app.use('/api/auth', authRoutes);

// Note routes
app.use('/api/notes', noteRoutes);

// Error handling middleware
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});