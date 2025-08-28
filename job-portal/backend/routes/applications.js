const express = require('express');
const db = require('../config/database');
const { auth } = require('../middleware/auth');
const { asyncHandler, createError, createAuthorizationError, createNotFoundError, handleDatabaseError } = require('../utils/asyncHandler');
const { createValidationMiddleware, applicationValidationRules } = require('../utils/validation');
const router = express.Router();

// Apply for job
router.post('/', 
  auth,
  createValidationMiddleware(applicationValidationRules.create),
  asyncHandler(async (req, res) => {
    if (req.user.role !== 'jobseeker') {
      throw createAuthorizationError('Only job seekers can apply for jobs');
    }

    const { jobId, coverLetter } = req.body;

    try {
      // Check if job exists and is active
      const jobs = await db.executeQuery('SELECT id, title FROM jobs WHERE id = ? AND status = ?', [jobId, 'active']);
      
      if (jobs.length === 0) {
        throw createNotFoundError('Active job');
      }

      // Check if already applied
      const existingApplications = await db.executeQuery(
        'SELECT id FROM applications WHERE job_id = ? AND user_id = ?',
        [jobId, req.user.userId]
      );

      if (existingApplications.length > 0) {
        throw createError('You have already applied for this job', 409, 'ALREADY_APPLIED');
      }

      // Create application
      const result = await db.executeQuery(
        'INSERT INTO applications (job_id, user_id, cover_letter, status) VALUES (?, ?, ?, ?)',
        [jobId, req.user.userId, coverLetter || null, 'pending']
      );

      res.status(201).json({ 
        message: 'Application submitted successfully',
        applicationId: result.insertId,
        application: {
          id: result.insertId,
          jobId: parseInt(jobId),
          jobTitle: jobs[0].title,
          coverLetter,
          status: 'pending',
          appliedAt: new Date().toISOString()
        }
      });

    } catch (error) {
      if (error.code && error.status) {
        throw error;
      }
      throw handleDatabaseError(error);
    }
  })
);

// Get user's applications
router.get('/my-applications', 
  auth,
  asyncHandler(async (req, res) => {
    if (req.user.role !== 'jobseeker') {
      throw createAuthorizationError('Access denied');
    }

    try {
      const { page = 1, limit = 10, status } = req.query;
      
      // Validate pagination
      const pageNum = parseInt(page);
      const limitNum = parseInt(limit);
      
      if (isNaN(pageNum) || pageNum < 1) {
        throw createError('Invalid page number', 400, 'INVALID_PAGE');
      }
      
      if (isNaN(limitNum) || limitNum < 1 || limitNum > 100) {
        throw createError('Invalid limit', 400, 'INVALID_LIMIT');
      }

      let query = `
        SELECT a.*, j.title, j.location, j.job_type, c.company_name
        FROM applications a
        JOIN jobs j ON a.job_id = j.id
        JOIN companies c ON j.company_id = c.id
        WHERE a.user_id = ?
      `;
      const params = [req.user.userId];

      // Add status filter if provided
      if (status && status.trim()) {
        const validStatuses = ['pending', 'reviewed', 'accepted', 'rejected'];
        if (!validStatuses.includes(status)) {
          throw createError('Invalid status', 400, 'INVALID_STATUS');
        }
        query += ' AND a.status = ?';
        params.push(status);
      }

      query += ' ORDER BY a.applied_at DESC LIMIT ? OFFSET ?';
      params.push(limitNum, (pageNum - 1) * limitNum);

      const applications = await db.executeQuery(query, params);

      // Get total count
      let countQuery = `
        SELECT COUNT(*) as total 
        FROM applications a
        JOIN jobs j ON a.job_id = j.id
        WHERE a.user_id = ?
      `;
      const countParams = [req.user.userId];

      if (status && status.trim()) {
        countQuery += ' AND a.status = ?';
        countParams.push(status);
      }

      const countResult = await db.executeQuery(countQuery, countParams);
      const total = countResult[0].total;

      res.json({
        applications,
        pagination: {
          page: pageNum,
          limit: limitNum,
          total,
          totalPages: Math.ceil(total / limitNum)
        },
        message: 'Applications retrieved successfully'
      });

    } catch (error) {
      if (error.code && error.status) {
        throw error;
      }
      throw handleDatabaseError(error);
    }
  })
);

// Get applications for employer's jobs
router.get('/job/:jobId', 
  auth,
  createValidationMiddleware(applicationValidationRules.getByJobId),
  asyncHandler(async (req, res) => {
    if (req.user.role !== 'employer') {
      throw createAuthorizationError('Access denied');
    }

    const jobId = req.params.jobId;

    try {
      // Verify job belongs to employer
      const verifyQuery = `
        SELECT j.id, j.title FROM jobs j 
        JOIN companies c ON j.company_id = c.id 
        WHERE j.id = ? AND c.user_id = ?
      `;

      const jobs = await db.executeQuery(verifyQuery, [jobId, req.user.userId]);
      
      if (jobs.length === 0) {
        throw createAuthorizationError('You can only view applications for your own jobs');
      }

      const { page = 1, limit = 10, status } = req.query;
      
      // Validate pagination
      const pageNum = parseInt(page);
      const limitNum = parseInt(limit);
      
      if (isNaN(pageNum) || pageNum < 1) {
        throw createError('Invalid page number', 400, 'INVALID_PAGE');
      }
      
      if (isNaN(limitNum) || limitNum < 1 || limitNum > 100) {
        throw createError('Invalid limit', 400, 'INVALID_LIMIT');
      }

      let query = `
        SELECT a.*, u.name, u.email, u.phone
        FROM applications a
        JOIN users u ON a.user_id = u.id
        WHERE a.job_id = ?
      `;
      const params = [jobId];

      // Add status filter if provided
      if (status && status.trim()) {
        const validStatuses = ['pending', 'reviewed', 'accepted', 'rejected'];
        if (!validStatuses.includes(status)) {
          throw createError('Invalid status', 400, 'INVALID_STATUS');
        }
        query += ' AND a.status = ?';
        params.push(status);
      }

      query += ' ORDER BY a.applied_at DESC LIMIT ? OFFSET ?';
      params.push(limitNum, (pageNum - 1) * limitNum);

      const applications = await db.executeQuery(query, params);

      // Get total count
      let countQuery = 'SELECT COUNT(*) as total FROM applications WHERE job_id = ?';
      const countParams = [jobId];

      if (status && status.trim()) {
        countQuery += ' AND status = ?';
        countParams.push(status);
      }

      const countResult = await db.executeQuery(countQuery, countParams);
      const total = countResult[0].total;

      res.json({
        applications,
        jobTitle: jobs[0].title,
        pagination: {
          page: pageNum,
          limit: limitNum,
          total,
          totalPages: Math.ceil(total / limitNum)
        },
        message: 'Applications retrieved successfully'
      });

    } catch (error) {
      if (error.code && error.status) {
        throw error;
      }
      throw handleDatabaseError(error);
    }
  })
);

// Update application status
router.put('/:id/status', 
  auth,
  createValidationMiddleware(applicationValidationRules.updateStatus),
  asyncHandler(async (req, res) => {
    if (req.user.role !== 'employer') {
      throw createAuthorizationError('Only employers can update application status');
    }

    const { status } = req.body;
    const applicationId = req.params.id;

    try {
      // Verify application belongs to employer's job
      const verifyQuery = `
        SELECT a.id, a.status as current_status, j.title, u.name as applicant_name
        FROM applications a
        JOIN jobs j ON a.job_id = j.id
        JOIN companies c ON j.company_id = c.id
        JOIN users u ON a.user_id = u.id
        WHERE a.id = ? AND c.user_id = ?
      `;

      const applications = await db.executeQuery(verifyQuery, [applicationId, req.user.userId]);
      
      if (applications.length === 0) {
        throw createAuthorizationError('You can only update applications for your own jobs');
      }

      const application = applications[0];

      // Check if status is actually changing
      if (application.current_status === status) {
        return res.json({
          message: 'Application status is already set to ' + status,
          applicationId: parseInt(applicationId),
          status
        });
      }

      // Update application status
      await db.executeQuery(
        'UPDATE applications SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
        [status, applicationId]
      );

      res.json({ 
        message: 'Application status updated successfully',
        applicationId: parseInt(applicationId),
        jobTitle: application.title,
        applicantName: application.applicant_name,
        previousStatus: application.current_status,
        newStatus: status
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