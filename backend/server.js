import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import mongoose from 'mongoose';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import buyerRoutes from './routes/buyerRoutes.js';
import sellerRoutes from './routes/sellerRoutes.js';
import { errorHandler } from './middleware/errorHandler.js';

dotenv.config();
connectDB();

const app = express();

app.use(express.json());
app.use(cors());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.get('/', (req, res) => {
  res.status(200).json({
    name: 'HungryBeer Backend API',
    status: 'online',
    timestamp: new Date().toISOString()
  });
});

app.use('/api', (req, res, next) => {
  if (mongoose.connection.readyState !== 1) {
    return res.status(503).json({
      success: false,
      message: 'Database is currently connecting or unavailable',
      dbState: mongoose.connection.readyState
    });
  }
  next();
});

app.use('/api/auth', authRoutes);
app.use('/api/buyer', buyerRoutes);
app.use('/api/seller', sellerRoutes);

app.use(errorHandler);

const port = Number(process.env.PORT) || 5001;

const startServer = (p) => {
  const server = app
    .listen(p, () => {
      console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${p}`);
    })
    .on('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        console.warn(`Port ${p} is in use, retrying on port ${p + 1}`);
        startServer(p + 1);
      } else {
        console.error(`Server error: ${err.message}`);
      }
    });

  return server;
};

startServer(port);

process.on('unhandledRejection', (err) => {
  console.error(`Unhandled rejection: ${err.message}`);
});

export default app;
