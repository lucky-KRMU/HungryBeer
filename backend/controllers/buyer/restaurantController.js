import Restaurant from '../../models/Restaurant.js';
import MenuItem from '../../models/MenuItem.js';

export const getAllRestaurants = async (req, res, next) => {
  try {
    const {
      search,
      cuisine,
      tab,
      beerOnly,
      vegOnly,
      happyHourOnly,
      expressOnly,
      rating,
      sortBy
    } = req.query;

    const query = { isOpen: true };

    if (tab === 'dining') query.isDining = true;
    if (tab === 'nightlife') query.isNightlife = true;

    if (beerOnly === 'true') query.hasBeer = true;
    if (vegOnly === 'true') query.isVeg = true;
    if (happyHourOnly === 'true') query.hasHappyHour = true;
    if (expressOnly === 'true') query.isExpress = true;
    if (rating) query.rating = { $gte: Number(rating) };

    if (cuisine) {
      query.cuisines = { $regex: cuisine, $options: 'i' };
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { cuisines: { $regex: search, $options: 'i' } },
        { featuredDish: { $regex: search, $options: 'i' } },
        { address: { $regex: search, $options: 'i' } }
      ];
    }

    let sortOptions = { rating: -1, createdAt: -1 };
    if (sortBy === 'rating') sortOptions = { rating: -1 };
    if (sortBy === 'cost_asc') sortOptions = { priceForTwo: 1 };
    if (sortBy === 'cost_desc') sortOptions = { priceForTwo: -1 };

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
