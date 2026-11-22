import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';
import Restaurant from '../models/Restaurant.js';
import MenuItem from '../models/MenuItem.js';
import Order from '../models/Order.js';

dotenv.config();

const sampleBreweries = [
  {
    name: 'The Hoppy Keg Microbrewery',
    tagline: 'Authentic Craft Ales & Smoked Sliders',
    cuisines: ['Craft Beer', 'American', 'Continental', 'BBQ'],
    rating: 4.8,
    numReviews: 240,
    priceForTwo: 1400,
    deliveryTime: '25-30 min',
    distance: '1.8 km',
    image: 'https://images.unsplash.com/photo-1575037614876-c38a4d44f5b8?w=800&auto=format&fit=crop&q=80',
    coverImage: 'https://images.unsplash.com/photo-1518176258769-f227c798150e?w=1200&auto=format&fit=crop&q=80',
    hasBeer: true,
    isVeg: false,
    isDining: true,
    isNightlife: true,
    isExpress: true,
    hasHappyHour: true,
    isOpen: true,
    featuredDish: 'Belgian Witbier & Smoked Pulled Pork Slider',
    offer: 'FLAT 25% OFF with code HUNGRYBEER',
    address: 'Plot 42, 100ft Road, Connaught Place, New Delhi',
    phone: '+91 98765 43210',
    timings: '12:00 PM - 1:00 AM',
    tags: ['Fresh Brews', 'Live DJ', 'Outdoor Deck'],
    menu: [
      {
        name: 'Belgian Golden Witbier (500ml Growler)',
        category: 'Signature Brews',
        price: 360,
        description: 'Brewed with orange peel and coriander seeds. Crisp, citrusy and refreshing.',
        image: 'https://images.unsplash.com/photo-1608270119159-4d6d3713000b?w=500&auto=format&fit=crop&q=80',
        isVeg: true,
        isBeer: true,
        isBestseller: true
      },
      {
        name: 'Hoppy Sunset IPA (500ml Growler)',
        category: 'Signature Brews',
        price: 390,
        description: 'Double dry-hopped American India Pale Ale with tropical passionfruit notes.',
        image: 'https://images.unsplash.com/photo-1535958636474-b021ee887b13?w=500&auto=format&fit=crop&q=80',
        isVeg: true,
        isBeer: true,
        isBestseller: true
      },
      {
        name: 'Beer-Battered Buffalo Hot Wings',
        category: 'Starters & Wings',
        price: 340,
        description: 'Jumbo wings tossed in house spicy sriracha glaze with blue cheese dip.',
        image: 'https://images.unsplash.com/photo-1567620832903-9fc6debc209f?w=500&auto=format&fit=crop&q=80',
        isVeg: false,
        isBeer: false,
        isBestseller: true
      },
      {
        name: 'Truffle Cheddar Smashed Burger',
        category: 'Gourmet Burgers',
        price: 420,
        description: 'Double smashed lamb patty, molten aged cheddar, caramelized onions, black truffle aioli in brioche bun.',
        image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&auto=format&fit=crop&q=80',
        isVeg: false,
        isBeer: false,
        isBestseller: true
      }
    ]
  },
  {
    name: 'Brew & Crust Neapolitan Pizzeria',
    tagline: 'Artisanal Sourdough & German Lagers',
    cuisines: ['Woodfired Pizza', 'Italian', 'Craft Beer'],
    rating: 4.7,
    numReviews: 180,
    priceForTwo: 1100,
    deliveryTime: '20-25 min',
    distance: '2.1 km',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&auto=format&fit=crop&q=80',
    coverImage: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200&auto=format&fit=crop&q=80',
    hasBeer: true,
    isVeg: false,
    isDining: true,
    isNightlife: false,
    isExpress: true,
    hasHappyHour: false,
    isOpen: true,
    featuredDish: 'Burrata Truffle Pizza & German Dunkel',
    offer: 'Free Garlic Knots on ₹599+',
    address: 'Corner Lane 7, Bandra West, Mumbai',
    phone: '+91 98765 11223',
    timings: '11:30 AM - 11:30 PM',
    tags: ['Wood Fired', 'Italian Chefs', 'Craft Brews'],
    menu: [
      {
        name: 'Margherita D.O.P. Woodfired Pizza',
        category: 'Woodfired Pizzas',
        price: 450,
        description: 'San Marzano tomato base, Fior di Latte mozzarella, extra virgin olive oil, fresh basil.',
        image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=500&auto=format&fit=crop&q=80',
        isVeg: true,
        isBeer: false,
        isBestseller: true
      },
      {
        name: 'German Dunkel Dark Lager (Pint)',
        category: 'Signature Brews',
        price: 330,
        description: 'Malty, smooth roasted malt flavours with subtle caramel and cocoa notes.',
        image: 'https://images.unsplash.com/photo-1566633806327-68e152aaf26d?w=500&auto=format&fit=crop&q=80',
        isVeg: true,
        isBeer: true,
        isBestseller: false
      }
    ]
  }
];

const seedData = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/hungrybeer';
    await mongoose.connect(mongoUri);
    console.log('[Seed] Connected to MongoDB for seeding...');

    // Clear existing
    await User.deleteMany();
    await Restaurant.deleteMany();
    await MenuItem.deleteMany();
    await Order.deleteMany();

    // Create Demo Buyer
    const buyer = await User.create({
      name: 'Rohan Sharma (Buyer)',
      email: 'buyer@hungrybeer.com',
      password: 'password123',
      phone: '+91 98765 43210',
      role: 'buyer'
    });

    // Create Demo Seller
    const seller = await User.create({
      name: 'Vikram Mehta (Brewmaster & Seller)',
      email: 'seller@hungrybeer.com',
      password: 'password123',
      phone: '+91 98765 99999',
      role: 'seller'
    });

    console.log('[Seed] Created Demo Users:');
    console.log('       Buyer:  buyer@hungrybeer.com  / password123');
    console.log('       Seller: seller@hungrybeer.com / password123');

    // Create Restaurants & Menu Items
    for (const b of sampleBreweries) {
      const { menu, ...restData } = b;
      const restaurant = await Restaurant.create({
        ...restData,
        sellerId: seller._id
      });

      for (const item of menu) {
        await MenuItem.create({
          ...item,
          restaurantId: restaurant._id
        });
      }
    }

    console.log('[Seed] Created sample restaurants and craft brew menus.');
    console.log('[Seed] Database seeded successfully! 🍻');
    process.exit(0);
  } catch (error) {
    console.error(`[Seed Error] ${error.message}`);
    process.exit(1);
  }
};

seedData();
