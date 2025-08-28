const express = require('express');
const db = require('../config/database');
const auth = require('../middleware/auth');
const router = express.Router();

// Get all jobs
router.get('/', (req, res) => {
  const { search, location, jobType } = req.query;
  let query = `
    SELECT j.*, c.company_name, c.location as company_location 
    FROM jobs j 
    JOIN companies c ON j.company_id = c.id 
    WHERE j.status = 'active'
  `;
  const params = [];

  if (search) {
    query += ' AND (j.title LIKE ? OR j.description LIKE ?)';
    params.push(`%${search}%`, `%${search}%`);
  }
  if (location) {
    query += ' AND j.location LIKE ?';
    params.push(`%${location}%`);
  }
  if (jobType) {
    query += ' AND j.job_type = ?';
    params.push(jobType);
  }

  query += ' ORDER BY j.created_at DESC';

  db.query(query, params, (err, results) => {
    if (err) return res.status(500).json({ message: 'Database error' });
    res.json(results);
  });
});

// Get job by ID
router.get('/:id', (req, res) => {
  const query = `
    SELECT j.*, c.company_name, c.description as company_description, c.website 
    FROM jobs j 
    JOIN companies c ON j.company_id = c.id 
    WHERE j.id = ?
  `;
  
  db.query(query, [req.params.id], (err, results) => {
    if (err) return res.status(500).json({ message: 'Database error' });
    if (results.length === 0) return res.status(404).json({ message: 'Job not found' });
    res.json(results[0]);
  });
});

// Create job (employer only)
router.post('/', auth, (req, res) => {
  if (req.user.role !== 'employer') {
    return res.status(403).json({ message: 'Only employers can post jobs' });
  }

  const { title, description, requirements, salaryMin, salaryMax, location, jobType } = req.body;

  // Get company ID for the user
  db.query('SELECT id FROM companies WHERE user_id = ?', [req.user.userId], (err, results) => {
    if (err) return res.status(500).json({ message: 'Database error' });
    if (results.length === 0) return res.status(400).json({ message: 'Company not found' });

    const companyId = results[0].id;

    db.query(
      'INSERT INTO jobs (company_id, title, description, requirements, salary_min, salary_max, location, job_type) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [companyId, title, description, requirements, salaryMin, salaryMax, location, jobType],
      (err, result) => {
        if (err) return res.status(500).json({ message: 'Error creating job' });
        res.status(201).json({ message: 'Job created successfully', jobId: result.insertId });
      }
    );
  });
});

// Get employer's jobs
router.get('/employer/my-jobs', auth, (req, res) => {
  if (req.user.role !== 'employer') {
    return res.status(403).json({ message: 'Access denied' });
  }

  const query = `
    SELECT j.*, c.company_name,
    (SELECT COUNT(*) FROM applications WHERE job_id = j.id) as application_count
    FROM jobs j 
    JOIN companies c ON j.company_id = c.id 
    WHERE c.user_id = ?
    ORDER BY j.created_at DESC
  `;

  db.query(query, [req.user.userId], (err, results) => {
    if (err) return res.status(500).json({ message: 'Database error' });
    res.json(results);
  });
});

module.exports = router;