import 'dotenv/config';
import express from 'express';

import { connectDB } from './config/db.js';
import noteRoutes from './routes/noteRoutes.js';
import authRoutes from './routes/authRoutes.js';
import errorHandler from './middleware/errorMiddleware.js';

const PORT = process.env.PORT || 5000;

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to MERN Note App API',
  });
});

app.use('/api/notes', noteRoutes);
app.use('/api/auth', authRoutes);

// Error handling middleware
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});