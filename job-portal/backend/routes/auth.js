const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/database');
const router = express.Router();

// Register
router.post('/register', async (req, res) => {
  const { email, password, name, role, phone, companyName, companyDescription } = req.body;

  try {
    // Check if user exists
    db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
      if (err) return res.status(500).json({ message: 'Database error' });
      if (results.length > 0) return res.status(400).json({ message: 'User already exists' });

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create user
      db.query(
        'INSERT INTO users (email, password, name, role, phone) VALUES (?, ?, ?, ?, ?)',
        [email, hashedPassword, name, role, phone],
        (err, result) => {
          if (err) return res.status(500).json({ message: 'Error creating user' });

          const userId = result.insertId;

          // If employer, create company
          if (role === 'employer' && companyName) {
            db.query(
              'INSERT INTO companies (user_id, company_name, description) VALUES (?, ?, ?)',
              [userId, companyName, companyDescription || ''],
              (err) => {
                if (err) console.log('Error creating company:', err);
              }
            );
          }

          // Create profile for job seekers
          if (role === 'jobseeker') {
            db.query(
              'INSERT INTO profiles (user_id) VALUES (?)',
              [userId],
              (err) => {
                if (err) console.log('Error creating profile:', err);
              }
            );
          }

          const token = jwt.sign({ userId, role }, process.env.JWT_SECRET, { expiresIn: '24h' });
          res.status(201).json({ token, user: { id: userId, email, name, role } });
        }
      );
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Login
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
    if (err) return res.status(500).json({ message: 'Database error' });
    if (results.length === 0) return res.status(400).json({ message: 'Invalid credentials' });

    const user = results[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ userId: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '24h' });
    res.json({ token, user: { id: user.id, email: user.email, name: user.name, role: user.role } });
  });
});

module.exports = router;