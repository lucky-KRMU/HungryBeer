import Order from '../../models/Order.js';
import TableBooking from '../../models/TableBooking.js';
import Restaurant from '../../models/Restaurant.js';

// @desc    Get seller business analytics (Revenue, Orders, Bookings, Top Items)
// @route   GET /api/seller/analytics
// @access  Private (Seller)
export const getSellerAnalytics = async (req, res, next) => {
  try {
    const restaurant = await Restaurant.findOne({ sellerId: req.user.id });
    if (!restaurant) {
      return res.status(404).json({
        success: false,
        message: 'Restaurant not found'
      });
    }

    const orders = await Order.find({ restaurantId: restaurant._id });
    const tableBookings = await TableBooking.find({ restaurantId: restaurant._id });

    // Compute metrics
    const totalOrders = orders.length;
    const completedOrders = orders.filter(o => o.orderStatus === 'Delivered').length;
    const totalRevenue = orders
      .filter(o => o.orderStatus !== 'Cancelled')
      .reduce((acc, o) => acc + o.grandTotal, 0);

    const pendingOrders = orders.filter(o => ['Placed', 'Accepted', 'Preparing'].includes(o.orderStatus)).length;
    const totalBookings = tableBookings.length;

    // Top selling items
    const itemCounts = {};
    orders.forEach(order => {
      if (order.orderStatus !== 'Cancelled') {
        order.items.forEach(item => {
          if (!itemCounts[item.name]) {
            itemCounts[item.name] = { count: 0, revenue: 0, isBeer: item.isBeer };
          }
          itemCounts[item.name].count += item.quantity;
          itemCounts[item.name].revenue += item.price * item.quantity;
        });
      }
    });

    const topItems = Object.entries(itemCounts)
      .map(([name, data]) => ({ name, ...data }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    res.status(200).json({
      success: true,
      data: {
        restaurantName: restaurant.name,
        totalRevenue,
        totalOrders,
        completedOrders,
        pendingOrders,
        totalBookings,
        averageRating: restaurant.rating,
        numReviews: restaurant.numReviews,
        isOpen: restaurant.isOpen,
        topItems
      }
    });
  } catch (error) {
    next(error);
  }
};
