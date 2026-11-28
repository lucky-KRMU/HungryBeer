import MenuItem from '../../models/MenuItem.js';
import Restaurant from '../../models/Restaurant.js';

export const getSellerMenu = async (req, res, next) => {
  try {
    const restaurant = await Restaurant.findOne({ sellerId: req.user.id });
    if (!restaurant) {
      return res.status(404).json({
        success: false,
        message: 'Please register your restaurant before managing menu items.'
      });
    }

    const items = await MenuItem.find({ restaurantId: restaurant._id }).sort({ category: 1, createdAt: -1 });

    res.status(200).json({
      success: true,
      count: items.length,
      data: items
    });
  } catch (error) {
    next(error);
  }
};

export const addMenuItem = async (req, res, next) => {
  try {
    const restaurant = await Restaurant.findOne({ sellerId: req.user.id });
    if (!restaurant) {
      return res.status(404).json({
        success: false,
        message: 'Restaurant not found'
      });
    }

    const { name, category, price, description, image, isVeg, isBeer, isBestseller, volumeOrPortion } = req.body;

    if (!name || price === undefined) {
      return res.status(400).json({
        success: false,
        message: 'Please provide item name and price'
      });
    }

    const item = await MenuItem.create({
      restaurantId: restaurant._id,
      name,
      category: category || 'Signature Brews',
      price: Number(price),
      description: description || '',
      image: image || (isBeer ? 'https://images.unsplash.com/photo-1535958636474-b021ee887b13?w=500' : 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500'),
      isVeg: isVeg !== undefined ? isVeg : true,
      isBeer: isBeer !== undefined ? isBeer : false,
      isBestseller: isBestseller !== undefined ? isBestseller : false,
      volumeOrPortion: volumeOrPortion || 'Standard Serving'
    });

    res.status(201).json({
      success: true,
      message: 'Item added to menu successfully',
      data: item
    });
  } catch (error) {
    next(error);
  }
};

export const updateMenuItem = async (req, res, next) => {
  try {
    const item = await MenuItem.findById(req.params.id);
    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Menu item not found'
      });
    }

    const updatedItem = await MenuItem.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      success: true,
      message: 'Menu item updated successfully',
      data: updatedItem
    });
  } catch (error) {
    next(error);
  }
};

export const deleteMenuItem = async (req, res, next) => {
  try {
    const item = await MenuItem.findById(req.params.id);
    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Menu item not found'
      });
    }

    await item.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Menu item deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

export const toggleItemStock = async (req, res, next) => {
  try {
    const item = await MenuItem.findById(req.params.id);
    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Menu item not found'
      });
    }

    item.inStock = !item.inStock;
    await item.save();

    res.status(200).json({
      success: true,
      message: `Item is now ${item.inStock ? 'IN STOCK' : 'OUT OF STOCK'}`,
      inStock: item.inStock
    });
  } catch (error) {
    next(error);
  }
};
