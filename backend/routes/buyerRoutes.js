import express from 'express';
import {
  getAllRestaurants,
  getRestaurantById
} from '../controllers/buyer/restaurantController.js';
import {
  createOrder,
  getMyOrders,
  getOrderById,
  cancelOrder
} from '../controllers/buyer/orderController.js';
import {
  bookTable,
  getMyBookings
} from '../controllers/buyer/tableController.js';
import {
  addReview,
  getRestaurantReviews
} from '../controllers/buyer/reviewController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/restaurants', getAllRestaurants);
router.get('/restaurants/:id', getRestaurantById);

router.get('/reviews/:restaurantId', getRestaurantReviews);
router.post('/reviews', protect, authorize('buyer', 'admin'), addReview);

router.post('/orders', protect, authorize('buyer', 'admin'), createOrder);
router.get('/orders', protect, authorize('buyer', 'admin'), getMyOrders);
router.get('/orders/:id', protect, authorize('buyer', 'admin'), getOrderById);
router.put('/orders/:id/cancel', protect, authorize('buyer', 'admin'), cancelOrder);

router.post('/tables', protect, authorize('buyer', 'admin'), bookTable);
router.get('/tables', protect, authorize('buyer', 'admin'), getMyBookings);

export default router;
