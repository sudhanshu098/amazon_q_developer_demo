const express = require('express');
const db = require('../config/database');
const { auth } = require('../middleware/auth');
const { asyncHandler, createError, createAuthorizationError, createNotFoundError, handleDatabaseError } = require('../utils/asyncHandler');
const { createValidationMiddleware, jobValidationRules } = require('../utils/validation');
const router = express.Router();

// Get all jobs
router.get('/', asyncHandler(async (req, res) => {
  try {
    const { search, location, jobType, page = 1, limit = 10 } = req.query;
    
    // Validate pagination parameters
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    
    if (isNaN(pageNum) || pageNum < 1) {
      throw createError('Invalid page number', 400, 'INVALID_PAGE');
    }
    
    if (isNaN(limitNum) || limitNum < 1 || limitNum > 100) {
      throw createError('Invalid limit (must be between 1 and 100)', 400, 'INVALID_LIMIT');
    }
    
    let query = `
      SELECT j.*, c.company_name, c.location as company_location 
      FROM jobs j 
      JOIN companies c ON j.company_id = c.id 
      WHERE j.status = 'active'
    `;
    const params = [];

    // Add search filters
    if (search && search.trim()) {
      query += ' AND (j.title LIKE ? OR j.description LIKE ?)';
      const searchTerm = `%${search.trim()}%`;
      params.push(searchTerm, searchTerm);
    }
    
    if (location && location.trim()) {
      query += ' AND j.location LIKE ?';
      params.push(`%${location.trim()}%`);
    }
    
    if (jobType && jobType.trim()) {
      // Validate job type
      const validJobTypes = ['full-time', 'part-time', 'contract', 'internship', 'remote'];
      if (!validJobTypes.includes(jobType)) {
        throw createError('Invalid job type', 400, 'INVALID_JOB_TYPE');
      }
      query += ' AND j.job_type = ?';
      params.push(jobType);
    }

    // Add pagination
    query += ' ORDER BY j.created_at DESC LIMIT ? OFFSET ?';
    params.push(limitNum, (pageNum - 1) * limitNum);

    const jobs = await db.executeQuery(query, params);

    // Get total count for pagination
    let countQuery = `
      SELECT COUNT(*) as total 
      FROM jobs j 
      JOIN companies c ON j.company_id = c.id 
      WHERE j.status = 'active'
    `;
    const countParams = [];

    if (search && search.trim()) {
      countQuery += ' AND (j.title LIKE ? OR j.description LIKE ?)';
      const searchTerm = `%${search.trim()}%`;
      countParams.push(searchTerm, searchTerm);
    }
    
    if (location && location.trim()) {
      countQuery += ' AND j.location LIKE ?';
      countParams.push(`%${location.trim()}%`);
    }
    
    if (jobType && jobType.trim()) {
      countQuery += ' AND j.job_type = ?';
      countParams.push(jobType);
    }

    const countResult = await db.executeQuery(countQuery, countParams);
    const total = countResult[0].total;

    res.json({
      jobs,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        totalPages: Math.ceil(total / limitNum)
      },
      message: 'Jobs retrieved successfully'
    });

  } catch (error) {
    if (error.code && error.status) {
      throw error;
    }
    throw handleDatabaseError(error);
  }
}));

// Get job by ID
router.get('/:id', 
  createValidationMiddleware(jobValidationRules.getById),
  asyncHandler(async (req, res) => {
    try {
      const query = `
        SELECT j.*, c.company_name, c.description as company_description, c.website, c.location as company_location
        FROM jobs j 
        JOIN companies c ON j.company_id = c.id 
        WHERE j.id = ?
      `;
      
      const jobs = await db.executeQuery(query, [req.params.id]);
      
      if (jobs.length === 0) {
        throw createNotFoundError('Job');
      }

      res.json({
        job: jobs[0],
        message: 'Job retrieved successfully'
      });

    } catch (error) {
      if (error.code && error.status) {
        throw error;
      }
      throw handleDatabaseError(error);
    }
  })
);

// Create job (employer only)
router.post('/', 
  auth,
  createValidationMiddleware(jobValidationRules.create),
  asyncHandler(async (req, res) => {
    if (req.user.role !== 'employer') {
      throw createAuthorizationError('Only employers can post jobs');
    }

    const { title, description, requirements, salaryMin, salaryMax, location, jobType } = req.body;

    try {
      // Get company ID for the user
      const companies = await db.executeQuery('SELECT id FROM companies WHERE user_id = ?', [req.user.userId]);
      
      if (companies.length === 0) {
        throw createError('Company profile not found. Please complete your company profile first.', 400, 'COMPANY_NOT_FOUND');
      }

      const companyId = companies[0].id;

      const result = await db.executeQuery(
        'INSERT INTO jobs (company_id, title, description, requirements, salary_min, salary_max, location, job_type) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        [companyId, title, description, requirements || null, salaryMin || null, salaryMax || null, location, jobType]
      );

      res.status(201).json({ 
        message: 'Job created successfully', 
        jobId: result.insertId,
        job: {
          id: result.insertId,
          title,
          description,
          requirements,
          salaryMin,
          salaryMax,
          location,
          jobType
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

// Get employer's jobs
router.get('/employer/my-jobs', 
  auth,
  asyncHandler(async (req, res) => {
    if (req.user.role !== 'employer') {
      throw createAuthorizationError('Access denied');
    }

    try {
      const { page = 1, limit = 10, status = 'active' } = req.query;
      
      // Validate pagination
      const pageNum = parseInt(page);
      const limitNum = parseInt(limit);
      
      if (isNaN(pageNum) || pageNum < 1) {
        throw createError('Invalid page number', 400, 'INVALID_PAGE');
      }
      
      if (isNaN(limitNum) || limitNum < 1 || limitNum > 100) {
        throw createError('Invalid limit', 400, 'INVALID_LIMIT');
      }

      // Validate status
      const validStatuses = ['active', 'inactive', 'deleted'];
      if (!validStatuses.includes(status)) {
        throw createError('Invalid status', 400, 'INVALID_STATUS');
      }

      const query = `
        SELECT j.*, c.company_name,
        (SELECT COUNT(*) FROM applications WHERE job_id = j.id) as application_count
        FROM jobs j 
        JOIN companies c ON j.company_id = c.id 
        WHERE c.user_id = ? AND j.status = ?
        ORDER BY j.created_at DESC
        LIMIT ? OFFSET ?
      `;

      const jobs = await db.executeQuery(query, [req.user.userId, status, limitNum, (pageNum - 1) * limitNum]);

      // Get total count
      const countResult = await db.executeQuery(
        'SELECT COUNT(*) as total FROM jobs j JOIN companies c ON j.company_id = c.id WHERE c.user_id = ? AND j.status = ?',
        [req.user.userId, status]
      );
      
      const total = countResult[0].total;

      res.json({
        jobs,
        pagination: {
          page: pageNum,
          limit: limitNum,
          total,
          totalPages: Math.ceil(total / limitNum)
        },
        message: 'Jobs retrieved successfully'
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