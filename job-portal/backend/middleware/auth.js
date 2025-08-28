const jwt = require('jsonwebtoken');
const { createAuthError } = require('../utils/asyncHandler');

const auth = (req, res, next) => {
  try {
    // Check if JWT_SECRET is configured
    if (!process.env.JWT_SECRET) {
      console.error('JWT_SECRET environment variable is not configured');
      return res.status(500).json({ 
        error: 'Server configuration error',
        message: 'Authentication service is not properly configured',
        timestamp: new Date().toISOString()
      });
    }

    // Get token from header
    const authHeader = req.header('Authorization');
    
    if (!authHeader) {
      return res.status(401).json({ 
        error: 'Authentication required',
        message: 'No authorization header provided',
        timestamp: new Date().toISOString()
      });
    }

    // Check if header starts with 'Bearer '
    if (!authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ 
        error: 'Invalid authorization format',
        message: 'Authorization header must start with "Bearer "',
        timestamp: new Date().toISOString()
      });
    }

    const token = authHeader.replace('Bearer ', '');
    
    if (!token || token.trim() === '') {
      return res.status(401).json({ 
        error: 'Authentication required',
        message: 'No token provided',
        timestamp: new Date().toISOString()
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Validate decoded token structure
    if (!decoded.userId || !decoded.role) {
      return res.status(401).json({ 
        error: 'Invalid token',
        message: 'Token does not contain required user information',
        timestamp: new Date().toISOString()
      });
    }

    // Validate role
    const validRoles = ['jobseeker', 'employer'];
    if (!validRoles.includes(decoded.role)) {
      return res.status(401).json({ 
        error: 'Invalid token',
        message: 'Token contains invalid role information',
        timestamp: new Date().toISOString()
      });
    }

    // Add user info to request
    req.user = {
      userId: decoded.userId,
      role: decoded.role
    };
    
    next();
    
  } catch (error) {
    console.error('Authentication error:', {
      error: error.message,
      name: error.name,
      timestamp: new Date().toISOString()
    });

    // Handle specific JWT errors
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ 
        error: 'Token expired',
        message: 'Your session has expired. Please log in again.',
        timestamp: new Date().toISOString()
      });
    }
    
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ 
        error: 'Invalid token',
        message: 'The provided token is invalid',
        timestamp: new Date().toISOString()
      });
    }
    
    if (error.name === 'NotBeforeError') {
      return res.status(401).json({ 
        error: 'Token not active',
        message: 'Token is not active yet',
        timestamp: new Date().toISOString()
      });
    }

    // Generic error response
    res.status(401).json({ 
      error: 'Authentication failed',
      message: 'Token verification failed',
      timestamp: new Date().toISOString()
    });
  }
};

// Optional auth middleware - doesn't fail if no token provided
const optionalAuth = (req, res, next) => {
  const authHeader = req.header('Authorization');
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    // No token provided, continue without authentication
    req.user = null;
    return next();
  }

  // Token provided, validate it
  auth(req, res, next);
};

// Role-based authorization middleware factory
const requireRole = (roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ 
        error: 'Authentication required',
        message: 'You must be logged in to access this resource',
        timestamp: new Date().toISOString()
      });
    }

    const allowedRoles = Array.isArray(roles) ? roles : [roles];
    
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ 
        error: 'Access denied',
        message: `This resource requires one of the following roles: ${allowedRoles.join(', ')}`,
        timestamp: new Date().toISOString()
      });
    }

    next();
  };
};

module.exports = {
  auth,
  optionalAuth,
  requireRole
};