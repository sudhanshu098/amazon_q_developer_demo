# Jaipur Real Estate Portal - Backend API

This is the backend API server for the Jaipur Real Estate Portal, built with Node.js and Express.js.

## Features

- **RESTful API** with Express.js
- **File-based Storage** using JSON files
- **CORS Support** for frontend integration
- **Error Handling** middleware
- **Data Validation** and filtering
- **Statistics API** for dashboard data

## Requirements

- **Node.js 20 or higher**
- **npm** package manager

## Installation

```bash
# Install dependencies
npm install

# Start development server (with nodemon)
npm run dev

# Start production server
npm start
```

## API Endpoints

### Health Check
- `GET /api/health` - Server health status

### Properties
- `GET /api/properties` - Get all properties
  - Query parameters: `search`, `location`, `type`, `minPrice`, `maxPrice`, `bedrooms`
- `GET /api/properties/:id` - Get property by ID
- `POST /api/properties` - Create new property
- `PUT /api/properties/:id` - Update property
- `DELETE /api/properties/:id` - Delete property

### Users
- `POST /api/users/register` - Register new user
- `POST /api/users/login` - User login

### Contact
- `POST /api/contact` - Submit contact form
- `GET /api/contacts` - Get all contact submissions

### Statistics
- `GET /api/stats` - Get application statistics

## Data Storage

The API uses JSON files for data persistence:

- `data/properties.json` - Property listings
- `data/users.json` - User accounts
- `data/contacts.json` - Contact form submissions

Files are automatically created on first run with dummy data.

## Server Configuration

- **Port**: 5000 (configurable via PORT environment variable)
- **CORS**: Enabled for all origins
- **Body Parser**: JSON and URL-encoded support
- **Error Handling**: Comprehensive error middleware

## Sample Data

The server initializes with sample Jaipur properties including:
- Luxury apartments in Mansarovar
- Villas in Vaishali Nagar
- Affordable flats in Malviya Nagar
- Residential plots in Jagatpura

## Development

```bash
# Start with auto-reload
npm run dev

# The server will restart automatically when files change
```

## Production Deployment

```bash
# Install production dependencies
npm install --production

# Start server
npm start
```

## API Testing

You can test the API endpoints using tools like:
- **Postman**
- **curl**
- **Browser** (for GET requests)

Example:
```bash
curl http://localhost:5000/api/health
curl http://localhost:5000/api/properties
```