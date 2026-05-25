import 'express-async-errors';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { config } from './config';
import workLogRoutes from './routes/workLog.routes';
import workTypeRoutes from './routes/workType.routes';
import { errorHandler, notFoundHandler } from './middleware/error.middleware';

const app = express();

// Middleware
app.use(helmet());
app.use(cors({
  origin: config.corsOrigin,
  credentials: true,
}));
app.use(morgan(config.nodeEnv === 'development' ? 'dev' : 'combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from public directory
app.use(express.static('public'));

// Health check
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Serve main page
app.get('/', (_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

// API Routes
app.use('/api/work-logs', workLogRoutes);
app.use('/api/work-types', workTypeRoutes);

// Error handling
app.use(notFoundHandler);
app.use(errorHandler);

const startServer = async () => {
  try {
    app.listen(config.port, () => {
      console.log(`🚀 Server is running on port ${config.port}`);
      console.log(`📊 Environment: ${config.nodeEnv}`);
      console.log(`🌐 CORS Origin: ${config.corsOrigin}`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

startServer();

export default app;