import express from 'express';
import {
  getMyRestaurant,
  createOrUpdateRestaurant,
  toggleOpenStatus
} from '../controllers/seller/restaurantController.js';
import {
  getSellerMenu,
  addMenuItem,
  updateMenuItem,
  deleteMenuItem,
  toggleItemStock
} from '../controllers/seller/menuController.js';
import {
  getSellerOrders,
  updateOrderStatus
} from '../controllers/seller/orderController.js';
import {
  getSellerTableBookings,
  updateTableBookingStatus
} from '../controllers/seller/tableController.js';
import { getSellerAnalytics } from '../controllers/seller/analyticsController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect);
router.use(authorize('seller', 'admin'));

router.get('/restaurant', getMyRestaurant);
router.post('/restaurant', createOrUpdateRestaurant);
router.put('/restaurant/toggle-status', toggleOpenStatus);

router.get('/menu', getSellerMenu);
router.post('/menu', addMenuItem);
router.put('/menu/:id', updateMenuItem);
router.delete('/menu/:id', deleteMenuItem);
router.put('/menu/:id/toggle-stock', toggleItemStock);

router.get('/orders', getSellerOrders);
router.put('/orders/:id/status', updateOrderStatus);

router.get('/tables', getSellerTableBookings);
router.put('/tables/:id/status', updateTableBookingStatus);

router.get('/analytics', getSellerAnalytics);

export default router;
