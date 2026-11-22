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

// Load env vars
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// API Directory & Health Check
app.get('/', (req, res) => {
  res.status(200).json({
    platform: 'HungryBeer MERN Backend',
    version: '1.0.0',
    architecture: 'MVC (Models, Views/JSON, Controllers)',
    status: 'ONLINE',
    timestamp: new Date().toISOString(),
    endpoints: {
      auth: {
        register: 'POST /api/auth/register',
        login: 'POST /api/auth/login',
        me: 'GET /api/auth/me',
        profile: 'PUT /api/auth/profile'
      },
      buyer: {
        browseRestaurants: 'GET /api/buyer/restaurants',
        restaurantDetails: 'GET /api/buyer/restaurants/:id',
        placeOrder: 'POST /api/buyer/orders',
        myOrders: 'GET /api/buyer/orders',
        orderTracking: 'GET /api/buyer/orders/:id',
        cancelOrder: 'PUT /api/buyer/orders/:id/cancel',
        reserveTable: 'POST /api/buyer/tables',
        myTableBookings: 'GET /api/buyer/tables',
        addReview: 'POST /api/buyer/reviews'
      },
      seller: {
        myRestaurant: 'GET /api/seller/restaurant',
        updateRestaurant: 'POST /api/seller/restaurant',
        toggleOpenStatus: 'PUT /api/seller/restaurant/toggle-status',
        getMenu: 'GET /api/seller/menu',
        addMenuItem: 'POST /api/seller/menu',
        updateMenuItem: 'PUT /api/seller/menu/:id',
        deleteMenuItem: 'DELETE /api/seller/menu/:id',
        toggleStock: 'PUT /api/seller/menu/:id/toggle-stock',
        incomingOrders: 'GET /api/seller/orders',
        updateOrderStatus: 'PUT /api/seller/orders/:id/status',
        tableReservations: 'GET /api/seller/tables',
        updateTableStatus: 'PUT /api/seller/tables/:id/status',
        businessAnalytics: 'GET /api/seller/analytics'
      }
    }
  });
});

// Database connection readiness check middleware for /api routes
app.use('/api', (req, res, next) => {
  if (mongoose.connection.readyState !== 1) {
    return res.status(503).json({
      success: false,
      message: 'Database is currently connecting or unavailable. Please try again shortly.',
      dbState: mongoose.connection.readyState
    });
  }
  next();
});

// Mount Routes
app.use('/api/auth', authRoutes);
app.use('/api/buyer', buyerRoutes);
app.use('/api/seller', sellerRoutes);

// Global Error Handler
app.use(errorHandler);

let currentPort = Number(process.env.PORT) || 5001;

const startServer = (port) => {
  const server = app
    .listen(port, () => {
      console.log(`🍺 [HungryBeer Backend] Server running in ${process.env.NODE_ENV || 'development'} mode on http://localhost:${port}`);
    })
    .on('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        console.warn(`⚠️ Port ${port} is in use by another process. Attempting port ${port + 1}...`);
        startServer(port + 1);
      } else {
        console.error(`[Server Error] ${err.message}`);
      }
    });

  return server;
};

const server = startServer(currentPort);

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error(`[Unhandled Rejection] ${err.message}`);
});

export default app;
