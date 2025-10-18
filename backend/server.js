import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import path from 'path';
import categoryRoutes from './routes/categories.js';
import subjectRoutes from './routes/subjects.js';
import courseRoutes from './routes/courses.js';
import chatRouter from './routes/chat.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Security middleware
app.use(helmet());

// Rate limiting (relaxed to avoid accidental throttling during dev)
const limiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: process.env.RATE_LIMIT_MAX ? Number(process.env.RATE_LIMIT_MAX) : 10000,
  standardHeaders: true,
  legacyHeaders: false
});
app.use('/api/', limiter);

// CORS configuration (allow common dev origins)
const allowedOrigins = process.env.FRONTEND_URL
  ? [process.env.FRONTEND_URL]
  : ['http://localhost:5173', 'http://localhost:8080', 'http://localhost:3000'];
app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Static uploads for serving PDFs and assets
const uploadsPath = path.join(process.cwd(), 'uploads');
app.use('/uploads', express.static(uploadsPath));

// (no static uploads)

// Compression middleware
app.use(compression());

// Logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// MongoDB connection (keepAlive to avoid intermittent disconnects)
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/tn-learning-hub', {
  serverSelectionTimeoutMS: 10000,
  socketTimeoutMS: 45000,
  family: 4
})
.then(() => {
  console.log('✅ Connected to MongoDB');
})
.catch((error) => {
  console.error('❌ MongoDB connection error:', error);
  process.exit(1);
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'Scholar mate API is running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// API routes
const API_VERSION = process.env.API_VERSION || 'v1';
app.use(`/api/${API_VERSION}/categories`, categoryRoutes);
app.use(`/api/${API_VERSION}/subjects`, subjectRoutes);
app.use(`/api/${API_VERSION}/courses`, courseRoutes);
app.use(`/api/${API_VERSION}/chat`, chatRouter);

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Welcome to Scholar mate API',
    version: API_VERSION,
    endpoints: {
      categories: `/api/${API_VERSION}/categories`,
      subjects: `/api/${API_VERSION}/subjects`,
      courses: `/api/${API_VERSION}/courses`,
      health: '/health'
    }
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'API endpoint not found',
    availableEndpoints: [
      `GET /api/${API_VERSION}/categories`,
      `GET /api/${API_VERSION}/subjects`,
      `GET /api/${API_VERSION}/courses`,
      'GET /health'
    ]
  });
});

// Global error handler
app.use((error, req, res, next) => {
  console.error('Global error handler:', error);
  
  res.status(error.status || 500).json({
    success: false,
    message: error.message || 'Internal server error',
    ...(process.env.NODE_ENV === 'development' && { stack: error.stack })
  });
});

// Start server with automatic port fallback if in use
const startServer = (initialPort, attemptsLeft = 10) => {
  const server = app.listen(initialPort, () => {
    console.log(`🚀 Server running on port ${initialPort}`);
    console.log(`📚 Scholar mate API v${API_VERSION}`);
    console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`🔗 Frontend URL: ${process.env.FRONTEND_URL || 'http://localhost:8080'}`);
  });

  server.on('error', (error) => {
    if (error && error.code === 'EADDRINUSE' && attemptsLeft > 0) {
      const nextPort = initialPort + 1;
      console.warn(`⚠️  Port ${initialPort} in use. Trying ${nextPort}... (${attemptsLeft - 1} retries left)`);
      startServer(nextPort, attemptsLeft - 1);
    } else {
      console.error('❌ Failed to start server:', error);
      process.exit(1);
    }
  });
};

startServer(Number(PORT));

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received. Shutting down gracefully...');
  mongoose.connection.close(() => {
    console.log('MongoDB connection closed.');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('SIGINT received. Shutting down gracefully...');
  mongoose.connection.close(() => {
    console.log('MongoDB connection closed.');
    process.exit(0);
  });
});

export default app;
