import mongoose from 'mongoose';

const RestaurantSchema = new mongoose.Schema(
  {
    sellerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    name: {
      type: String,
      required: [true, 'Please provide a restaurant/brewery name'],
      trim: true
    },
    tagline: {
      type: String,
      default: 'Craft Brews & Gourmet Bites'
    },
    cuisines: {
      type: [String],
      required: true,
      default: ['Craft Beer', 'American', 'Continental']
    },
    rating: {
      type: Number,
      default: 4.5,
      min: 1,
      max: 5
    },
    numReviews: {
      type: Number,
      default: 0
    },
    priceForTwo: {
      type: Number,
      required: true,
      default: 1200
    },
    deliveryTime: {
      type: String,
      default: '25-30 min'
    },
    distance: {
      type: String,
      default: '2.5 km'
    },
    image: {
      type: String,
      default: 'https://images.unsplash.com/photo-1575037614876-c38a4d44f5b8?w=800&auto=format&fit=crop&q=80'
    },
    coverImage: {
      type: String,
      default: 'https://images.unsplash.com/photo-1518176258769-f227c798150e?w=1200&auto=format&fit=crop&q=80'
    },
    hasBeer: {
      type: Boolean,
      default: true
    },
    isVeg: {
      type: Boolean,
      default: false
    },
    isDining: {
      type: Boolean,
      default: true
    },
    isNightlife: {
      type: Boolean,
      default: false
    },
    isExpress: {
      type: Boolean,
      default: true
    },
    hasHappyHour: {
      type: Boolean,
      default: false
    },
    isOpen: {
      type: Boolean,
      default: true
    },
    featuredDish: {
      type: String,
      default: 'Chef Special Brew & Smashed Burger'
    },
    offer: {
      type: String,
      default: 'FLAT 25% OFF with code HUNGRYBEER'
    },
    address: {
      type: String,
      required: true,
      default: 'Connaught Place, New Delhi'
    },
    phone: {
      type: String,
      default: '+91 98765 00000'
    },
    timings: {
      type: String,
      default: '12:00 PM - 1:00 AM'
    },
    tags: {
      type: [String],
      default: ['Craft Brews', 'Draft Beer', 'Outdoor Seating']
    }
  },
  { timestamps: true }
);

const Restaurant = mongoose.model('Restaurant', RestaurantSchema);
export default Restaurant;
