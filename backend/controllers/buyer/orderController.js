import Order from '../../models/Order.js';
import Restaurant from '../../models/Restaurant.js';

// @desc    Create / Place a new order
// @route   POST /api/buyer/orders
// @access  Private (Buyer)
export const createOrder = async (req, res, next) => {
  try {
    const {
      restaurantId,
      items,
      deliveryAddress,
      deliveryNote,
      appliedCoupon,
      paymentMethod
    } = req.body;

    if (!restaurantId || !items || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Please provide restaurant and at least one item.'
      });
    }

    if (!deliveryAddress) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid delivery address.'
      });
    }

    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) {
      return res.status(404).json({
        success: false,
        message: 'Restaurant not found'
      });
    }

    // Calculate item total
    const itemTotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    // Delivery fee (free over ₹400)
    const deliveryFee = itemTotal >= 400 ? 0 : 40;
    const packagingFee = 10;
    const taxes = Math.round(itemTotal * 0.05);

    // Calculate coupon discount
    let discount = 0;
    if (appliedCoupon === 'HUNGRYBEER' && itemTotal >= 399) {
      discount = Math.min(Math.round(itemTotal * 0.25), 200);
    } else if (appliedCoupon === 'CHEERS50' && itemTotal >= 299) {
      discount = 50;
    } else if (appliedCoupon === 'FIRSTBREW' && itemTotal >= 499) {
      discount = Math.min(Math.round(itemTotal * 0.3), 200);
    } else if (appliedCoupon === 'PARTYPACK' && itemTotal >= 1000) {
      discount = 250;
    }

    const grandTotal = Math.max(0, itemTotal + deliveryFee + packagingFee + taxes - discount);
    const orderId = `HB-${Math.floor(100000 + Math.random() * 900000)}`;

    const order = await Order.create({
      orderId,
      buyerId: req.user.id,
      sellerId: restaurant.sellerId,
      restaurantId: restaurant._id,
      restaurantName: restaurant.name,
      items,
      itemTotal,
      deliveryFee,
      packagingFee,
      taxes,
      discount,
      grandTotal,
      appliedCoupon: appliedCoupon || '',
      deliveryAddress,
      deliveryNote: deliveryNote || '',
      orderStatus: 'Placed',
      paymentMethod: paymentMethod || 'UPI',
      paymentStatus: 'Completed'
    });

    res.status(201).json({
      success: true,
      message: 'Order placed successfully! The kitchen is preparing your feast.',
      data: order
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get buyer's past and active orders
// @route   GET /api/buyer/orders
// @access  Private (Buyer)
export const getMyOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ buyerId: req.user.id }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: orders.length,
      data: orders
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single order details with live tracking step
// @route   GET /api/buyer/orders/:id
// @access  Private (Buyer)
export const getOrderById = async (req, res, next) => {
  try {
    const order = await Order.findOne({
      _id: req.params.id,
      buyerId: req.user.id
    });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    res.status(200).json({
      success: true,
      data: order
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Cancel order (if still Placed)
// @route   PUT /api/buyer/orders/:id/cancel
// @access  Private (Buyer)
export const cancelOrder = async (req, res, next) => {
  try {
    const order = await Order.findOne({
      _id: req.params.id,
      buyerId: req.user.id
    });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    if (order.orderStatus !== 'Placed') {
      return res.status(400).json({
        success: false,
        message: `Order cannot be cancelled in '${order.orderStatus}' status.`
      });
    }

    order.orderStatus = 'Cancelled';
    await order.save();

    res.status(200).json({
      success: true,
      message: 'Order cancelled successfully',
      data: order
    });
  } catch (error) {
    next(error);
  }
};
