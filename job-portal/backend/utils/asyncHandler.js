// Async error handling wrapper utility

/**
 * Wraps async route handlers to catch errors and pass them to Express error handler
 * @param {Function} fn - Async function to wrap
 * @returns {Function} - Express middleware function
 */
const asyncHandler = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

/**
 * Creates a standardized error object
 * @param {string} message - Error message
 * @param {number} statusCode - HTTP status code
 * @param {string} code - Error code for client identification
 * @returns {Error} - Standardized error object
 */
const createError = (message, statusCode = 500, code = 'INTERNAL_ERROR') => {
  const error = new Error(message);
  error.status = statusCode;
  error.code = code;
  return error;
};

/**
 * Database error handler - converts database errors to user-friendly messages
 * @param {Error} error - Database error
 * @returns {Error} - Standardized error
 */
const handleDatabaseError = (error) => {
  console.error('Database error:', {
    message: error.message,
    code: error.code,
    errno: error.errno,
    timestamp: new Date().toISOString()
  });

  // Handle specific MySQL error codes
  switch (error.code) {
    case 'ER_DUP_ENTRY':
      return createError('Duplicate entry - record already exists', 409, 'DUPLICATE_ENTRY');
    
    case 'ER_NO_REFERENCED_ROW_2':
      return createError('Referenced record does not exist', 400, 'INVALID_REFERENCE');
    
    case 'ER_ROW_IS_REFERENCED_2':
      return createError('Cannot delete - record is referenced by other data', 409, 'REFERENCE_CONSTRAINT');
    
    case 'ER_DATA_TOO_LONG':
      return createError('Data too long for field', 400, 'DATA_TOO_LONG');
    
    case 'ER_BAD_NULL_ERROR':
      return createError('Required field cannot be null', 400, 'REQUIRED_FIELD');
    
    case 'ECONNREFUSED':
    case 'ENOTFOUND':
    case 'ETIMEDOUT':
      return createError('Database connection error', 503, 'DATABASE_UNAVAILABLE');
    
    case 'ER_ACCESS_DENIED_ERROR':
      return createError('Database access denied', 503, 'DATABASE_ACCESS_DENIED');
    
    default:
      return createError('Database operation failed', 500, 'DATABASE_ERROR');
  }
};

/**
 * Authentication error handler
 * @param {string} message - Error message
 * @returns {Error} - Standardized auth error
 */
const createAuthError = (message = 'Authentication failed') => {
  return createError(message, 401, 'AUTH_ERROR');
};

/**
 * Authorization error handler
 * @param {string} message - Error message
 * @returns {Error} - Standardized authorization error
 */
const createAuthorizationError = (message = 'Access denied') => {
  return createError(message, 403, 'AUTHORIZATION_ERROR');
};

/**
 * Validation error handler
 * @param {string} message - Error message
 * @returns {Error} - Standardized validation error
 */
const createValidationError = (message) => {
  return createError(message, 400, 'VALIDATION_ERROR');
};

/**
 * Not found error handler
 * @param {string} resource - Resource name
 * @returns {Error} - Standardized not found error
 */
const createNotFoundError = (resource = 'Resource') => {
  return createError(`${resource} not found`, 404, 'NOT_FOUND');
};

/**
 * Wrapper for database operations with error handling
 * @param {Function} operation - Database operation function
 * @returns {Function} - Wrapped operation
 */
const withDatabaseErrorHandling = (operation) => {
  return async (...args) => {
    try {
      return await operation(...args);
    } catch (error) {
      throw handleDatabaseError(error);
    }
  };
};

/**
 * Safe JSON parsing with error handling
 * @param {string} jsonString - JSON string to parse
 * @param {any} defaultValue - Default value if parsing fails
 * @returns {any} - Parsed object or default value
 */
const safeJsonParse = (jsonString, defaultValue = null) => {
  try {
    return JSON.parse(jsonString);
  } catch (error) {
    console.warn('JSON parsing failed:', error.message);
    return defaultValue;
  }
};

/**
 * Sanitize user input to prevent XSS
 * @param {string} input - User input
 * @returns {string} - Sanitized input
 */
const sanitizeInput = (input) => {
  if (typeof input !== 'string') return input;
  
  return input
    .replace(/[<>]/g, '') // Remove < and > characters
    .trim(); // Remove leading/trailing whitespace
};

/**
 * Rate limiting error
 * @param {string} message - Error message
 * @returns {Error} - Rate limit error
 */
const createRateLimitError = (message = 'Too many requests') => {
  return createError(message, 429, 'RATE_LIMIT_EXCEEDED');
};

module.exports = {
  asyncHandler,
  createError,
  handleDatabaseError,
  createAuthError,
  createAuthorizationError,
  createValidationError,
  createNotFoundError,
  createRateLimitError,
  withDatabaseErrorHandling,
  safeJsonParse,
  sanitizeInput
};