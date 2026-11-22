import TableBooking from '../../models/TableBooking.js';
import Restaurant from '../../models/Restaurant.js';

// @desc    Reserve a table at a brewery or restaurant
// @route   POST /api/buyer/tables
// @access  Private (Buyer)
export const bookTable = async (req, res, next) => {
  try {
    const {
      restaurantId,
      guestName,
      guestPhone,
      guestEmail,
      numGuests,
      bookingDate,
      specialRequests
    } = req.body;

    if (!restaurantId || !guestName || !guestPhone || !bookingDate) {
      return res.status(400).json({
        success: false,
        message: 'Please provide restaurant, guest name, phone, and booking date/time.'
      });
    }

    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) {
      return res.status(404).json({
        success: false,
        message: 'Restaurant not found'
      });
    }

    const bookingCode = `HB-TBL-${Math.floor(100000 + Math.random() * 900000)}`;

    const booking = await TableBooking.create({
      bookingCode,
      buyerId: req.user.id,
      restaurantId: restaurant._id,
      restaurantName: restaurant.name,
      guestName,
      guestPhone,
      guestEmail: guestEmail || req.user.email,
      numGuests: numGuests || '2 Guests',
      bookingDate,
      specialRequests: specialRequests || '',
      status: 'Confirmed'
    });

    res.status(201).json({
      success: true,
      message: 'Table reserved successfully! Complimentary brew flight reserved.',
      data: booking
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get buyer's table bookings
// @route   GET /api/buyer/tables
// @access  Private (Buyer)
export const getMyBookings = async (req, res, next) => {
  try {
    const bookings = await TableBooking.find({ buyerId: req.user.id }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: bookings.length,
      data: bookings
    });
  } catch (error) {
    next(error);
  }
};
