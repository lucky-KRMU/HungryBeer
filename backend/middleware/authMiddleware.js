import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// Protect routes - verify Bearer token
export const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Not authorized to access this route. Missing token.'
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'hungrybeer_secret_jwt_key_2026_super_secure');
    req.user = await User.findById(decoded.id).select('-password');
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'User no longer exists.'
      });
    }
    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: 'Token verification failed or expired.'
    });
  }
};

// Grant access to specific roles (e.g. 'seller', 'buyer', 'admin')
export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `Forbidden: User role '${req.user ? req.user.role : 'guest'}' is not authorized to access this route.`
      });
    }
    next();
  };
};
