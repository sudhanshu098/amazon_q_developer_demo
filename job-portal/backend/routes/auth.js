const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/database');
const { asyncHandler, createError, createAuthError, handleDatabaseError } = require('../utils/asyncHandler');
const { createValidationMiddleware, authValidationRules } = require('../utils/validation');
const router = express.Router();

// Register
router.post('/register', 
  createValidationMiddleware(authValidationRules.register),
  asyncHandler(async (req, res) => {
    const { email, password, name, role, phone, companyName, companyDescription } = req.body;

    try {
      // Check if user exists
      const existingUsers = await db.executeQuery('SELECT * FROM users WHERE email = ?', [email]);
      
      if (existingUsers.length > 0) {
        throw createError('User already exists', 400, 'USER_EXISTS');
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Use transaction for user creation and related records
      const queries = [
        {
          query: 'INSERT INTO users (email, password, name, role, phone) VALUES (?, ?, ?, ?, ?)',
          params: [email, hashedPassword, name, role, phone]
        }
      ];

      const results = await db.executeTransaction(queries);
      const userId = results[0].insertId;

      // Create additional records based on role
      const additionalQueries = [];

      if (role === 'employer' && companyName) {
        additionalQueries.push({
          query: 'INSERT INTO companies (user_id, company_name, description) VALUES (?, ?, ?)',
          params: [userId, companyName, companyDescription || '']
        });
      }

      if (role === 'jobseeker') {
        additionalQueries.push({
          query: 'INSERT INTO profiles (user_id) VALUES (?)',
          params: [userId]
        });
      }

      // Execute additional queries if any
      if (additionalQueries.length > 0) {
        try {
          await db.executeTransaction(additionalQueries);
        } catch (error) {
          console.error('Error creating additional records:', error.message);
          // Don't fail registration if additional records fail
        }
      }

      // Generate JWT token
      if (!process.env.JWT_SECRET) {
        throw createError('JWT configuration error', 500, 'JWT_CONFIG_ERROR');
      }

      const token = jwt.sign(
        { userId, role }, 
        process.env.JWT_SECRET, 
        { expiresIn: '24h' }
      );

      res.status(201).json({ 
        token, 
        user: { 
          id: userId, 
          email, 
          name, 
          role 
        },
        message: 'User registered successfully'
      });

    } catch (error) {
      if (error.code && error.status) {
        throw error; // Re-throw custom errors
      }
      throw handleDatabaseError(error);
    }
  })
);

// Login
router.post('/login',
  createValidationMiddleware(authValidationRules.login),
  asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    try {
      // Find user by email
      const users = await db.executeQuery('SELECT * FROM users WHERE email = ?', [email]);
      
      if (users.length === 0) {
        throw createAuthError('Invalid credentials');
      }

      const user = users[0];

      // Verify password
      const isMatch = await bcrypt.compare(password, user.password);
      
      if (!isMatch) {
        throw createAuthError('Invalid credentials');
      }

      // Generate JWT token
      if (!process.env.JWT_SECRET) {
        throw createError('JWT configuration error', 500, 'JWT_CONFIG_ERROR');
      }

      const token = jwt.sign(
        { userId: user.id, role: user.role }, 
        process.env.JWT_SECRET, 
        { expiresIn: '24h' }
      );

      res.json({ 
        token, 
        user: { 
          id: user.id, 
          email: user.email, 
          name: user.name, 
          role: user.role 
        },
        message: 'Login successful'
      });

    } catch (error) {
      if (error.code && error.status) {
        throw error; // Re-throw custom errors
      }
      throw handleDatabaseError(error);
    }
  })
);

// Get current user profile
router.get('/profile',
  require('../middleware/auth').auth,
  asyncHandler(async (req, res) => {
    try {
      const users = await db.executeQuery(
        'SELECT id, email, name, role, phone, created_at FROM users WHERE id = ?', 
        [req.user.userId]
      );

      if (users.length === 0) {
        throw createError('User not found', 404, 'USER_NOT_FOUND');
      }

      const user = users[0];

      // Get additional profile data based on role
      if (user.role === 'employer') {
        const companies = await db.executeQuery(
          'SELECT company_name, description, website, location FROM companies WHERE user_id = ?',
          [user.id]
        );
        
        if (companies.length > 0) {
          user.company = companies[0];
        }
      } else if (user.role === 'jobseeker') {
        const profiles = await db.executeQuery(
          'SELECT * FROM profiles WHERE user_id = ?',
          [user.id]
        );
        
        if (profiles.length > 0) {
          user.profile = profiles[0];
        }
      }

      res.json({
        user,
        message: 'Profile retrieved successfully'
      });

    } catch (error) {
      if (error.code && error.status) {
        throw error;
      }
      throw handleDatabaseError(error);
    }
  })
);

module.exports = router;