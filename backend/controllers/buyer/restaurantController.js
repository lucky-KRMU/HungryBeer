import Restaurant from '../../models/Restaurant.js';
import MenuItem from '../../models/MenuItem.js';

// @desc    Browse & search restaurants with filtering & sorting
// @route   GET /api/buyer/restaurants
// @access  Public
export const getAllRestaurants = async (req, res, next) => {
  try {
    const {
      search,
      cuisine,
      tab, // 'delivery', 'dining', 'nightlife'
      beerOnly,
      vegOnly,
      happyHourOnly,
      expressOnly,
      rating,
      sortBy
    } = req.query;

    const query = { isOpen: true };

    // Tab filtering
    if (tab === 'dining') query.isDining = true;
    if (tab === 'nightlife') query.isNightlife = true;

    // Feature toggles
    if (beerOnly === 'true') query.hasBeer = true;
    if (vegOnly === 'true') query.isVeg = true;
    if (happyHourOnly === 'true') query.hasHappyHour = true;
    if (expressOnly === 'true') query.isExpress = true;
    if (rating) query.rating = { $gte: Number(rating) };

    // Cuisine filtering
    if (cuisine) {
      query.cuisines = { $regex: cuisine, $options: 'i' };
    }

    // Text search in name or cuisines
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { cuisines: { $regex: search, $options: 'i' } },
        { featuredDish: { $regex: search, $options: 'i' } },
        { address: { $regex: search, $options: 'i' } }
      ];
    }

    // Sorting
    let sortOptions = {};
    if (sortBy === 'rating') sortOptions = { rating: -1 };
    else if (sortBy === 'cost_asc') sortOptions = { priceForTwo: 1 };
    else if (sortBy === 'cost_desc') sortOptions = { priceForTwo: -1 };
    else sortOptions = { rating: -1, createdAt: -1 }; // default popularity

    const restaurants = await Restaurant.find(query).sort(sortOptions);

    res.status(200).json({
      success: true,
      count: restaurants.length,
      data: restaurants
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single restaurant profile + full menu
// @route   GET /api/buyer/restaurants/:id
// @access  Public
export const getRestaurantById = async (req, res, next) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant) {
      return res.status(404).json({
        success: false,
        message: 'Restaurant/Brewery not found'
      });
    }

    const menu = await MenuItem.find({
      restaurantId: restaurant._id,
      inStock: true
    }).sort({ category: 1, isBestseller: -1 });

    res.status(200).json({
      success: true,
      data: {
        ...restaurant.toObject(),
        menu
      }
    });
  } catch (error) {
    next(error);
  }
};
