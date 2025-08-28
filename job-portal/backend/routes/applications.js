const express = require('express');
const db = require('../config/database');
const auth = require('../middleware/auth');
const router = express.Router();

// Apply for job
router.post('/', auth, (req, res) => {
  if (req.user.role !== 'jobseeker') {
    return res.status(403).json({ message: 'Only job seekers can apply' });
  }

  const { jobId, coverLetter } = req.body;

  // Check if already applied
  db.query(
    'SELECT * FROM applications WHERE job_id = ? AND user_id = ?',
    [jobId, req.user.userId],
    (err, results) => {
      if (err) return res.status(500).json({ message: 'Database error' });
      if (results.length > 0) return res.status(400).json({ message: 'Already applied for this job' });

      // Create application
      db.query(
        'INSERT INTO applications (job_id, user_id, cover_letter) VALUES (?, ?, ?)',
        [jobId, req.user.userId, coverLetter],
        (err, result) => {
          if (err) return res.status(500).json({ message: 'Error submitting application' });
          res.status(201).json({ message: 'Application submitted successfully' });
        }
      );
    }
  );
});

// Get user's applications
router.get('/my-applications', auth, (req, res) => {
  if (req.user.role !== 'jobseeker') {
    return res.status(403).json({ message: 'Access denied' });
  }

  const query = `
    SELECT a.*, j.title, j.location, c.company_name
    FROM applications a
    JOIN jobs j ON a.job_id = j.id
    JOIN companies c ON j.company_id = c.id
    WHERE a.user_id = ?
    ORDER BY a.applied_at DESC
  `;

  db.query(query, [req.user.userId], (err, results) => {
    if (err) return res.status(500).json({ message: 'Database error' });
    res.json(results);
  });
});

// Get applications for employer's jobs
router.get('/job/:jobId', auth, (req, res) => {
  if (req.user.role !== 'employer') {
    return res.status(403).json({ message: 'Access denied' });
  }

  // Verify job belongs to employer
  const verifyQuery = `
    SELECT j.id FROM jobs j 
    JOIN companies c ON j.company_id = c.id 
    WHERE j.id = ? AND c.user_id = ?
  `;

  db.query(verifyQuery, [req.params.jobId, req.user.userId], (err, results) => {
    if (err) return res.status(500).json({ message: 'Database error' });
    if (results.length === 0) return res.status(403).json({ message: 'Unauthorized' });

    const query = `
      SELECT a.*, u.name, u.email, u.phone
      FROM applications a
      JOIN users u ON a.user_id = u.id
      WHERE a.job_id = ?
      ORDER BY a.applied_at DESC
    `;

    db.query(query, [req.params.jobId], (err, results) => {
      if (err) return res.status(500).json({ message: 'Database error' });
      res.json(results);
    });
  });
});

// Update application status
router.put('/:id/status', auth, (req, res) => {
  if (req.user.role !== 'employer') {
    return res.status(403).json({ message: 'Access denied' });
  }

  const { status } = req.body;
  const applicationId = req.params.id;

  // Verify application belongs to employer's job
  const verifyQuery = `
    SELECT a.id FROM applications a
    JOIN jobs j ON a.job_id = j.id
    JOIN companies c ON j.company_id = c.id
    WHERE a.id = ? AND c.user_id = ?
  `;

  db.query(verifyQuery, [applicationId, req.user.userId], (err, results) => {
    if (err) return res.status(500).json({ message: 'Database error' });
    if (results.length === 0) return res.status(403).json({ message: 'Unauthorized' });

    db.query(
      'UPDATE applications SET status = ? WHERE id = ?',
      [status, applicationId],
      (err) => {
        if (err) return res.status(500).json({ message: 'Error updating status' });
        res.json({ message: 'Application status updated' });
      }
    );
  });
});

module.exports = router;