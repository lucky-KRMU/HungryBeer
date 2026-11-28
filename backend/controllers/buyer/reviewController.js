import Review from '../../models/Review.js';
import Restaurant from '../../models/Restaurant.js';

export const addReview = async (req, res, next) => {
  try {
    const { restaurantId, rating, comment } = req.body;

    if (!restaurantId || !rating || !comment) {
      return res.status(400).json({
        success: false,
        message: 'Please provide restaurantId, rating, and comment.'
      });
    }

    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) {
      return res.status(404).json({
        success: false,
        message: 'Restaurant not found'
      });
    }

    const review = await Review.create({
      buyerId: req.user.id,
      buyerName: req.user.name,
      restaurantId,
      rating: Number(rating),
      comment
    });

    const allReviews = await Review.find({ restaurantId });
    const avgRating = (
      allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length
    ).toFixed(1);

    restaurant.rating = Number(avgRating);
    restaurant.numReviews = allReviews.length;
    await restaurant.save();

    res.status(201).json({
      success: true,
      message: 'Review posted successfully',
      data: review
    });
  } catch (error) {
    next(error);
  }
};

export const getRestaurantReviews = async (req, res, next) => {
  try {
    const reviews = await Review.find({ restaurantId: req.params.restaurantId }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: reviews.length,
      data: reviews
    });
  } catch (error) {
    next(error);
  }
};
