// Input validation utilities

const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validatePassword = (password) => {
  // At least 6 characters
  return password && password.length >= 6;
};

const validatePhone = (phone) => {
  // Basic phone validation - digits, spaces, dashes, parentheses
  const phoneRegex = /^[\d\s\-\(\)\+]+$/;
  return phone && phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 10;
};

const validateRole = (role) => {
  return ['jobseeker', 'employer'].includes(role);
};

const validateJobType = (jobType) => {
  return ['full-time', 'part-time', 'contract', 'internship', 'remote'].includes(jobType);
};

const validateApplicationStatus = (status) => {
  return ['pending', 'reviewed', 'accepted', 'rejected'].includes(status);
};

const validateRequired = (value, fieldName) => {
  if (value === undefined || value === null || value === '') {
    throw new Error(`${fieldName} is required`);
  }
  return true;
};

const validateString = (value, fieldName, minLength = 1, maxLength = 1000) => {
  if (typeof value !== 'string') {
    throw new Error(`${fieldName} must be a string`);
  }
  if (value.length < minLength) {
    throw new Error(`${fieldName} must be at least ${minLength} characters long`);
  }
  if (value.length > maxLength) {
    throw new Error(`${fieldName} must be no more than ${maxLength} characters long`);
  }
  return true;
};

const validateNumber = (value, fieldName, min = 0, max = Number.MAX_SAFE_INTEGER) => {
  const num = Number(value);
  if (isNaN(num)) {
    throw new Error(`${fieldName} must be a valid number`);
  }
  if (num < min) {
    throw new Error(`${fieldName} must be at least ${min}`);
  }
  if (num > max) {
    throw new Error(`${fieldName} must be no more than ${max}`);
  }
  return true;
};

const validateId = (id, fieldName = 'ID') => {
  const numId = parseInt(id);
  if (isNaN(numId) || numId <= 0) {
    throw new Error(`${fieldName} must be a positive integer`);
  }
  return true;
};

// Validation middleware factory
const createValidationMiddleware = (validationRules) => {
  return (req, res, next) => {
    try {
      for (const rule of validationRules) {
        rule(req);
      }
      next();
    } catch (error) {
      res.status(400).json({
        error: 'Validation error',
        message: error.message,
        timestamp: new Date().toISOString()
      });
    }
  };
};

// Common validation rules
const authValidationRules = {
  register: [
    (req) => {
      const { email, password, name, role, phone } = req.body;
      
      validateRequired(email, 'Email');
      validateRequired(password, 'Password');
      validateRequired(name, 'Name');
      validateRequired(role, 'Role');
      
      if (!validateEmail(email)) {
        throw new Error('Invalid email format');
      }
      
      if (!validatePassword(password)) {
        throw new Error('Password must be at least 6 characters long');
      }
      
      validateString(name, 'Name', 2, 100);
      
      if (!validateRole(role)) {
        throw new Error('Role must be either "jobseeker" or "employer"');
      }
      
      if (phone && !validatePhone(phone)) {
        throw new Error('Invalid phone number format');
      }
      
      // Additional validation for employers
      if (role === 'employer') {
        const { companyName } = req.body;
        if (companyName) {
          validateString(companyName, 'Company name', 2, 200);
        }
      }
    }
  ],
  
  login: [
    (req) => {
      const { email, password } = req.body;
      
      validateRequired(email, 'Email');
      validateRequired(password, 'Password');
      
      if (!validateEmail(email)) {
        throw new Error('Invalid email format');
      }
    }
  ]
};

const jobValidationRules = {
  create: [
    (req) => {
      const { title, description, requirements, salaryMin, salaryMax, location, jobType } = req.body;
      
      validateRequired(title, 'Job title');
      validateRequired(description, 'Job description');
      validateRequired(location, 'Location');
      validateRequired(jobType, 'Job type');
      
      validateString(title, 'Job title', 3, 200);
      validateString(description, 'Job description', 10, 5000);
      validateString(location, 'Location', 2, 200);
      
      if (!validateJobType(jobType)) {
        throw new Error('Invalid job type');
      }
      
      if (requirements) {
        validateString(requirements, 'Requirements', 0, 3000);
      }
      
      if (salaryMin !== undefined) {
        validateNumber(salaryMin, 'Minimum salary', 0, 10000000);
      }
      
      if (salaryMax !== undefined) {
        validateNumber(salaryMax, 'Maximum salary', 0, 10000000);
        
        if (salaryMin !== undefined && salaryMax < salaryMin) {
          throw new Error('Maximum salary must be greater than or equal to minimum salary');
        }
      }
    }
  ],
  
  getById: [
    (req) => {
      validateId(req.params.id, 'Job ID');
    }
  ]
};

const applicationValidationRules = {
  create: [
    (req) => {
      const { jobId, coverLetter } = req.body;
      
      validateRequired(jobId, 'Job ID');
      validateId(jobId, 'Job ID');
      
      if (coverLetter) {
        validateString(coverLetter, 'Cover letter', 0, 2000);
      }
    }
  ],
  
  updateStatus: [
    (req) => {
      const { status } = req.body;
      
      validateRequired(status, 'Status');
      
      if (!validateApplicationStatus(status)) {
        throw new Error('Invalid application status');
      }
      
      validateId(req.params.id, 'Application ID');
    }
  ],
  
  getByJobId: [
    (req) => {
      validateId(req.params.jobId, 'Job ID');
    }
  ]
};

module.exports = {
  validateEmail,
  validatePassword,
  validatePhone,
  validateRole,
  validateJobType,
  validateApplicationStatus,
  validateRequired,
  validateString,
  validateNumber,
  validateId,
  createValidationMiddleware,
  authValidationRules,
  jobValidationRules,
  applicationValidationRules
};