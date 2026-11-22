import Restaurant from '../../models/Restaurant.js';

// @desc    Get seller's restaurant profile
// @route   GET /api/seller/restaurant
// @access  Private (Seller)
export const getMyRestaurant = async (req, res, next) => {
  try {
    const restaurant = await Restaurant.findOne({ sellerId: req.user.id });
    if (!restaurant) {
      return res.status(404).json({
        success: false,
        message: 'No restaurant registered yet under this seller account.'
      });
    }

    res.status(200).json({
      success: true,
      data: restaurant
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create or update seller's restaurant profile
// @route   POST /api/seller/restaurant
// @access  Private (Seller)
export const createOrUpdateRestaurant = async (req, res, next) => {
  try {
    let restaurant = await Restaurant.findOne({ sellerId: req.user.id });

    if (restaurant) {
      // Update existing
      restaurant = await Restaurant.findOneAndUpdate(
        { sellerId: req.user.id },
        { ...req.body },
        { new: true, runValidators: true }
      );
      return res.status(200).json({
        success: true,
        message: 'Restaurant profile updated successfully',
        data: restaurant
      });
    }

    // Create new
    restaurant = await Restaurant.create({
      ...req.body,
      sellerId: req.user.id
    });

    res.status(201).json({
      success: true,
      message: 'Restaurant / Brewery created successfully',
      data: restaurant
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Toggle restaurant open/closed status for orders
// @route   PUT /api/seller/restaurant/toggle-status
// @access  Private (Seller)
export const toggleOpenStatus = async (req, res, next) => {
  try {
    const restaurant = await Restaurant.findOne({ sellerId: req.user.id });
    if (!restaurant) {
      return res.status(404).json({
        success: false,
        message: 'Restaurant not found'
      });
    }

    restaurant.isOpen = !restaurant.isOpen;
    await restaurant.save();

    res.status(200).json({
      success: true,
      message: `Restaurant is now ${restaurant.isOpen ? 'OPEN' : 'CLOSED'} for orders.`,
      isOpen: restaurant.isOpen
    });
  } catch (error) {
    next(error);
  }
};
