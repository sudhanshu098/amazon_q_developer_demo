# Jaipur Real Estate Portal

A complete web application for an Online Real Estate Portal based in Jaipur, Rajasthan, built with Next.js (frontend) and Node.js (backend).

## Features

### Frontend (Next.js)
- **Modern, Responsive UI** with Tailwind CSS
- **Homepage** with Jaipur-specific banner & property highlights
- **Property Listings** with grid/list view and advanced filters
- **Property Detail Pages** with image gallery and contact options
- **About Jaipur Real Estate** page with market insights
- **Contact Page** with form submission
- **User Authentication** (Login/Signup) using local storage
- **Add Property** functionality for logged-in users
- **Search & Filter** by location, price, property type, etc.
- **Responsive Design** for all devices

### Backend (Node.js)
- **RESTful API** with Express.js
- **File-based Storage** using JSON files (for demo purposes)
- **Property Management** CRUD operations
- **User Authentication** endpoints
- **Contact Form** handling
- **Statistics API** for dashboard data
- **CORS enabled** for frontend integration

### Property Data
- **Jaipur-specific locations**: Mansarovar, Vaishali Nagar, Malviya Nagar, Jagatpura
- **Property types**: Apartments, Houses, Villas, Plots
- **Comprehensive details**: Price, area, bedrooms, bathrooms, features
- **Contact information** for each property

## Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript, Tailwind CSS
- **Backend**: Node.js 20+, Express.js
- **Storage**: Local JSON files (localStorage for frontend, file system for backend)
- **Styling**: Tailwind CSS with custom color scheme
- **Icons**: Emoji-based icons for simplicity

## Project Structure

```
amazon_q_developer_demo/
├── frontend/                 # Next.js application
│   ├── src/
│   │   ├── app/             # App router pages
│   │   │   ├── page.tsx     # Homepage
│   │   │   ├── properties/  # Property listings & details
│   │   │   ├── about/       # About Jaipur page
│   │   │   ├── contact/     # Contact page
│   │   │   ├── login/       # Login page
│   │   │   ├── signup/      # Signup page
│   │   │   └── add-property/ # Add property page
│   │   ├── components/      # Reusable components
│   │   ├── lib/            # Utility functions
│   │   └── types/          # TypeScript interfaces
│   └── package.json
├── backend/                 # Node.js API server
│   ├── server.js           # Main server file
│   ├── data/               # JSON data storage (auto-created)
│   └── package.json
└── README.md
```

## Installation & Setup

### Prerequisites
- Node.js 20 or higher
- npm or yarn package manager

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The backend API will be available at `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend application will be available at `http://localhost:3000`

## API Endpoints

### Properties
- `GET /api/properties` - Get all properties (with optional filters)
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

## Usage Instructions

1. **Start both servers** (backend on port 5000, frontend on port 3000)
2. **Browse properties** on the homepage and properties page
3. **Create an account** using the signup page (demo - any email/password works)
4. **Login** to access additional features like adding properties
5. **Add new properties** using the "Add Property" page (requires login)
6. **Use filters** on the properties page to find specific properties
7. **View property details** by clicking on any property card
8. **Submit contact forms** on the contact page

## Demo Features

- **Local Storage Authentication**: No real backend authentication, uses browser localStorage
- **Dummy Data**: Pre-populated with sample Jaipur properties
- **File-based Storage**: Backend uses JSON files instead of a database
- **Placeholder Images**: Uses placeholder images for property photos
- **Responsive Design**: Works on desktop, tablet, and mobile devices

## Development Notes

- The application is designed for demonstration purposes
- All data is stored locally (localStorage for frontend, JSON files for backend)
- No real authentication or security measures implemented
- Images are placeholder URLs
- No real payment or booking functionality

## Future Enhancements

- Real database integration (MongoDB, PostgreSQL)
- Proper authentication with JWT tokens
- Image upload functionality
- Payment gateway integration
- Email notifications
- Advanced search with maps integration
- Property comparison features
- User dashboard and favorites

## License

This project is created for demonstration purposes.