import mongoose from 'mongoose';

const MenuItemSchema = new mongoose.Schema(
  {
    restaurantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Restaurant',
      required: true
    },
    name: {
      type: String,
      required: [true, 'Please provide item name'],
      trim: true
    },
    category: {
      type: String,
      required: true,
      enum: [
        'Signature Brews',
        'Starters & Wings',
        'Woodfired Pizzas',
        'Gourmet Burgers',
        'Mains & Combos',
        'Biryani Handis',
        'Desserts & Bakes',
        'Beverages'
      ],
      default: 'Signature Brews'
    },
    price: {
      type: Number,
      required: [true, 'Please provide price'],
      min: 0
    },
    description: {
      type: String,
      default: ''
    },
    image: {
      type: String,
      default: 'https://images.unsplash.com/photo-1535958636474-b021ee887b13?w=500&auto=format&fit=crop&q=80'
    },
    isVeg: {
      type: Boolean,
      default: true
    },
    isBeer: {
      type: Boolean,
      default: false
    },
    isBestseller: {
      type: Boolean,
      default: false
    },
    inStock: {
      type: Boolean,
      default: true
    },
    volumeOrPortion: {
      type: String,
      default: '500ml Growler'
    }
  },
  { timestamps: true }
);

const MenuItem = mongoose.model('MenuItem', MenuItemSchema);
export default MenuItem;
