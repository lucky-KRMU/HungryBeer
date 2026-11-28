import TableBooking from '../../models/TableBooking.js';
import Restaurant from '../../models/Restaurant.js';

export const getSellerTableBookings = async (req, res, next) => {
  try {
    const restaurant = await Restaurant.findOne({ sellerId: req.user.id });
    if (!restaurant) {
      return res.status(404).json({
        success: false,
        message: 'Restaurant not found'
      });
    }

    const bookings = await TableBooking.find({ restaurantId: restaurant._id }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: bookings.length,
      data: bookings
    });
  } catch (error) {
    next(error);
  }
};

export const updateTableBookingStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const allowed = ['Confirmed', 'Completed', 'Cancelled'];

    if (!allowed.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Invalid status. Must be one of: ${allowed.join(', ')}`
      });
    }

    const booking = await TableBooking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    booking.status = status;
    await booking.save();

    res.status(200).json({
      success: true,
      message: `Booking status updated to '${status}'`,
      data: booking
    });
  } catch (error) {
    next(error);
  }
};
