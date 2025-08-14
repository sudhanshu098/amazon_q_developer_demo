# Users CRUD + S3 Buckets API

A full-stack application with a Node.js/Express backend that provides CRUD operations for users (using Redis) and S3 bucket listing functionality.

## Features

- **User Management**: Complete CRUD operations for users
- **S3 Integration**: List S3 buckets from AWS ap-south-1 region
- **Redis Storage**: Fast in-memory data storage for users
- **Comprehensive Testing**: Jest test suite with high coverage
- **CORS Support**: Cross-origin resource sharing enabled

## API Endpoints

### Users
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `POST /api/users` - Create new user
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

### S3 Buckets
- `GET /api/buckets` - List all S3 buckets in ap-south-1 region

## Prerequisites

- Node.js (v14 or higher)
- Redis server
- AWS account with S3 access (for bucket listing)

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd <repository-name>
```

2. Install backend dependencies:
```bash
cd backend
npm install
```

3. Install frontend dependencies:
```bash
cd ../frontend
npm install
```

## Environment Variables

Create a `.env` file in the backend directory with the following variables (you can copy from `.env.example`):

### Required for S3 functionality:
```bash
# AWS Configuration
AWS_ACCESS_KEY_ID=your_aws_access_key_id
AWS_SECRET_ACCESS_KEY=your_aws_secret_access_key
AWS_REGION=ap-south-1

# Optional: If using AWS profiles or IAM roles, you can omit the above credentials
```

### Optional configuration:
```bash
# Server Configuration
PORT=5000

# Redis Configuration
REDIS_HOST=localhost
REDIS_PORT=6379
```

## AWS Credentials Setup

You can configure AWS credentials in several ways:

### Option 1: Environment Variables (Recommended for development)
```bash
export AWS_ACCESS_KEY_ID=your_access_key_id
export AWS_SECRET_ACCESS_KEY=your_secret_access_key
export AWS_REGION=ap-south-1
```

### Option 2: AWS Credentials File
Create `~/.aws/credentials`:
```ini
[default]
aws_access_key_id = your_access_key_id
aws_secret_access_key = your_secret_access_key
```

And `~/.aws/config`:
```ini
[default]
region = ap-south-1
```

### Option 3: IAM Roles (Recommended for production)
If running on EC2, use IAM roles with appropriate S3 permissions.

## Required AWS Permissions

Your AWS credentials need the following S3 permissions:
```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "s3:ListAllMyBuckets"
            ],
            "Resource": "*"
        }
    ]
}
```

## Running the Application

### Development Mode

1. Start Redis server:
```bash
redis-server
```

2. Start the backend server:
```bash
cd backend
npm run dev
```

3. Start the frontend (in a new terminal):
```bash
cd frontend
npm start
```

The backend will be available at `http://localhost:5000` and the frontend at `http://localhost:3000`.

### Production Mode

```bash
cd backend
npm start
```

## Testing

### Run all tests:
```bash
cd backend
npm test
```

### Run tests in watch mode:
```bash
npm run test:watch
```

### Test coverage:
Tests automatically generate coverage reports in the `backend/coverage/` directory.

## API Usage Examples

### Users API

#### Create a user:
```bash
curl -X POST http://localhost:5000/api/users \
  -H "Content-Type: application/json" \
  -d '{"name": "John Doe", "email": "john@example.com"}'
```

#### Get all users:
```bash
curl http://localhost:5000/api/users
```

#### Update a user:
```bash
curl -X PUT http://localhost:5000/api/users/1 \
  -H "Content-Type: application/json" \
  -d '{"name": "John Updated"}'
```

### S3 Buckets API

#### List S3 buckets:
```bash
curl http://localhost:5000/api/buckets
```

Response example:
```json
[
  {
    "Name": "my-bucket-1",
    "CreationDate": "2023-01-01T00:00:00.000Z"
  },
  {
    "Name": "my-bucket-2",
    "CreationDate": "2023-01-02T00:00:00.000Z"
  }
]
```

## Project Structure

```
.
├── backend/
│   ├── src/
│   │   └── s3Service.js          # S3 service implementation
│   ├── tests/
│   │   ├── setup.js              # Test setup and mocks
│   │   ├── users.test.js         # User API tests
│   │   ├── buckets.test.js       # S3 buckets API tests
│   │   ├── s3Service.test.js     # S3 service unit tests
│   │   └── edge-cases.test.js    # Edge case tests
│   ├── app.js                    # Express app configuration
│   ├── server.js                 # Server entry point
│   └── package.json              # Backend dependencies
├── frontend/
│   └── ...                       # Frontend files
└── README.md                     # This file
```

## Error Handling

The API includes comprehensive error handling:

- **400 Bad Request**: Invalid input data
- **404 Not Found**: Resource not found
- **500 Internal Server Error**: Server or AWS service errors

Example error response:
```json
{
  "error": "Failed to list S3 buckets: Access denied"
}
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Ensure all tests pass
6. Submit a pull request

## Troubleshooting

### Common Issues

1. **S3 Access Denied**: Ensure your AWS credentials have the required S3 permissions
2. **Redis Connection Error**: Make sure Redis server is running
3. **Port Already in Use**: Change the PORT environment variable

### Debug Mode

Set `NODE_ENV=development` for detailed error messages and logging.

## License

This project is licensed under the MIT License.