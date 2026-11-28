import User from '../models/User.js';
import Restaurant from '../models/Restaurant.js';

// @desc    Register a new user (buyer or seller)
// @route   POST /api/auth/register
// @access  Public
export const registerUser = async (req, res, next) => {
  try {
    const { name, email, password, phone, role, restaurantName } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide name, email, and password.'
      });
    }

    if (role === 'seller' && (!restaurantName || !restaurantName.trim())) {
      return res.status(400).json({
        success: false,
        message: 'Please provide the name of your restaurant or brewery.'
      });
    }

    const userExists = await User.findOne({ email: email.toLowerCase() });
    if (userExists) {
      return res.status(400).json({
        success: false,
        message: 'An account with this email already exists.'
      });
    }

    const assignedRole = role === 'seller' ? 'seller' : 'buyer';
    const trimmedRestName = assignedRole === 'seller' && restaurantName ? restaurantName.trim() : '';

    const user = await User.create({
      name,
      email: email.toLowerCase(),
      password,
      phone: phone || '',
      role: assignedRole,
      restaurantName: trimmedRestName
    });

    // If seller, automatically initialize their Restaurant profile in MongoDB
    if (assignedRole === 'seller' && trimmedRestName) {
      try {
        await Restaurant.create({
          sellerId: user._id,
          name: trimmedRestName,
          tagline: 'Craft Brews & Gourmet Bites',
          cuisines: ['Craft Beer', 'American', 'Continental', 'Bar Food'],
          priceForTwo: 1200,
          hasBeer: true,
          isDining: true
        });
      } catch (restErr) {
        console.warn('Auto-create restaurant note:', restErr.message);
      }
    }

    const token = user.getSignedJwtToken();

    res.status(201).json({
      success: true,
      message: `Registered successfully as ${assignedRole}`,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        restaurantName: user.restaurantName || '',
        avatar: user.avatar
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Login user & get JWT token
// @route   POST /api/auth/login
// @access  Public
export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide an email and password'
      });
    }

    const user = await User.findOne({ email: email.toLowerCase() }).select('+password');
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials. User not found.'
      });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password.'
      });
    }

    const token = user.getSignedJwtToken();

    res.status(200).json({
      success: true,
      message: 'Logged in successfully',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        restaurantName: user.restaurantName || '',
        avatar: user.avatar
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get current user profile
// @route   GET /api/auth/me
// @access  Private
export const getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    res.status(200).json({
      success: true,
      user
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update current user profile
// @route   PUT /api/auth/profile
// @access  Private
export const updateProfile = async (req, res, next) => {
  try {
    const fieldsToUpdate = {};
    if (req.body.name) fieldsToUpdate.name = req.body.name;
    if (req.body.phone) fieldsToUpdate.phone = req.body.phone;
    if (req.body.address) fieldsToUpdate.address = req.body.address;
    if (req.body.avatar) fieldsToUpdate.avatar = req.body.avatar;

    const user = await User.findByIdAndUpdate(req.user.id, fieldsToUpdate, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      user
    });
  } catch (error) {
    next(error);
  }
};
