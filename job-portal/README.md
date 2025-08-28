# Job Portal Application

A complete job portal application with React frontend, Node.js backend, and MySQL database.

## Features

### For Job Seekers
- User registration and login
- Browse and search jobs with filters
- View detailed job descriptions
- Apply for jobs with cover letters
- Track application status
- Dashboard to manage applications

### For Employers
- Company registration
- Post job listings with detailed requirements
- Manage job postings
- View and manage applications
- Update application status (pending, reviewed, accepted, rejected)
- Dashboard to track all job postings

## Tech Stack
- **Frontend**: React.js, React Router, Axios
- **Backend**: Node.js, Express.js, JWT Authentication
- **Database**: MySQL
- **Security**: bcrypt for password hashing, JWT for authentication

## Project Structure
```
job-portal/
├── backend/
│   ├── config/
│   │   └── database.js
│   ├── middleware/
│   │   └── auth.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── jobs.js
│   │   └── applications.js
│   ├── database/
│   │   └── schema.sql
│   ├── .env
│   ├── package.json
│   └── server.js
└── frontend/
    ├── public/
    │   └── index.html
    ├── src/
    │   ├── components/
    │   │   └── Navbar.js
    │   ├── pages/
    │   │   ├── Home.js
    │   │   ├── Login.js
    │   │   ├── Register.js
    │   │   ├── Jobs.js
    │   │   ├── JobDetail.js
    │   │   ├── PostJob.js
    │   │   ├── MyJobs.js
    │   │   └── Applications.js
    │   ├── services/
    │   │   └── api.js
    │   ├── App.js
    │   └── index.js
    └── package.json
```

## Setup Instructions

### 1. Database Setup
1. Install MySQL and create a database named `job_portal`
2. Run the SQL schema:
```bash
mysql -u root -p job_portal < backend/database/schema.sql
```

### 2. Backend Setup
```bash
cd backend
npm install
# Update .env file with your database credentials
npm start
```
The backend will run on http://localhost:5000

### 3. Frontend Setup
```bash
cd frontend
npm install
npm start
```
The frontend will run on http://localhost:3000

## Environment Variables
Update `backend/.env` with your configuration:
```
PORT=5000
DB_HOST=localhost
DB_USER=your_mysql_username
DB_PASSWORD=your_mysql_password
DB_NAME=job_portal
JWT_SECRET=your_secret_key
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Jobs
- `GET /api/jobs` - Get all jobs (with search/filter)
- `GET /api/jobs/:id` - Get job by ID
- `POST /api/jobs` - Create job (employer only)
- `GET /api/jobs/employer/my-jobs` - Get employer's jobs

### Applications
- `POST /api/applications` - Apply for job
- `GET /api/applications/my-applications` - Get user's applications
- `GET /api/applications/job/:jobId` - Get job applications (employer)
- `PUT /api/applications/:id/status` - Update application status

## Usage

1. **Job Seekers**:
   - Register as a job seeker
   - Browse and search for jobs
   - Apply for jobs with cover letters
   - Track application status

2. **Employers**:
   - Register as an employer with company details
   - Post job listings
   - Manage applications
   - Update application status

## Database Schema

The application uses 5 main tables:
- `users` - User accounts (job seekers and employers)
- `companies` - Company information for employers
- `jobs` - Job postings
- `applications` - Job applications
- `profiles` - User profiles for job seekers

## Security Features
- Password hashing with bcrypt
- JWT token authentication
- Protected routes for authenticated users
- Role-based access control
- Input validation and sanitization