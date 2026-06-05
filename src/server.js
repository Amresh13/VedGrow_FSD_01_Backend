import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import env from './config/env.js';
import connectDB from './config/db.js';
import categoryRoutes from './routes/categoryRoutes.js';
import tagRoutes from './routes/tagRoutes.js';
import authRoutes from './routes/authRoutes.js';
import blogRoutes from './routes/blogRoutes.js';
import dashboardRoutes from './routes/dashboardRoutes.js';
import upload from './middleware/uploadMiddleware.js';
import { protect } from './middleware/authMiddleware.js';
import rateLimit from 'express-rate-limit';

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();

// Security headers
app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }));

// CORS
app.use(cors({ origin: env.clientUrl, credentials: true }));

// Logging
if (env.nodeEnv === 'development') {
  app.use(morgan('dev'));
}

// Body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files - uploads
app.use('/uploads', express.static(resolve(__dirname, '../uploads')));

// Health check
app.get('/api/v1/health', (_req, res) => {
  res.json({ success: true, message: 'Blog CMS API is running' });
});

// Rate limiting for auth routes
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { success: false, message: 'Too many requests, please try again later' },
});

// Routes
app.use('/api/v1/auth', authLimiter, authRoutes);
app.use('/api/v1/categories', categoryRoutes);
app.use('/api/v1/tags', tagRoutes);
app.use('/api/v1/blogs', blogRoutes);
app.use('/api/v1/dashboard', dashboardRoutes);

// Image upload
app.post('/api/v1/upload', protect, (req, res, next) => {
  upload.single('image')(req, res, (err) => {
    if (err) {
      return res.status(400).json({ success: false, message: err.message });
    }
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No file uploaded' });
    }
    const url = `/uploads/${req.file.filename}`;
    res.json({ success: true, data: { url } });
  });
});

// 404 handler
app.use((_req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

// Global error handler
app.use((err, _req, res, _next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal server error',
  });
});

// Start server
const start = async () => {
  await connectDB();
  app.listen(env.port, () => {
    console.log(`Server running on port ${env.port} in ${env.nodeEnv} mode`);
  });
};

start();
