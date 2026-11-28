import Order from '../../models/Order.js';
import Restaurant from '../../models/Restaurant.js';

export const getSellerOrders = async (req, res, next) => {
  try {
    const restaurant = await Restaurant.findOne({ sellerId: req.user.id });
    if (!restaurant) {
      return res.status(404).json({
        success: false,
        message: 'Restaurant not found'
      });
    }

    const { status } = req.query;
    const query = { restaurantId: restaurant._id };
    if (status) query.orderStatus = status;

    const orders = await Order.find(query).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: orders.length,
      data: orders
    });
  } catch (error) {
    next(error);
  }
};

export const updateOrderStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const allowed = ['Accepted', 'Preparing', 'Out for Delivery', 'Delivered', 'Cancelled'];

    if (!allowed.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Invalid status. Must be one of: ${allowed.join(', ')}`
      });
    }

    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    order.orderStatus = status;
    await order.save();

    res.status(200).json({
      success: true,
      message: `Order status updated to '${status}'`,
      data: order
    });
  } catch (error) {
    next(error);
  }
};
