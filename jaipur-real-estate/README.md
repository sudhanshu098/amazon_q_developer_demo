# Jaipur Real Estate Portal

A modern, responsive real estate portal built with Next.js, specifically designed for properties in Jaipur, Rajasthan. This application demonstrates a complete real estate platform with property listings, user authentication, and property management features.

## Features

### 🏠 Property Management
- **Property Listings**: Browse properties with advanced filtering options
- **Property Details**: Detailed property pages with image galleries
- **Add Properties**: Authenticated users can add new properties
- **Search & Filter**: Search by location, price, property type, and more

### 🔐 User Authentication
- **User Registration**: Sign up with email and password
- **User Login**: Secure authentication system
- **Demo Account**: Pre-configured demo user for testing

### 🎨 Modern UI/UX
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Clean Interface**: Modern card-based layout with intuitive navigation
- **Interactive Elements**: Hover effects, smooth transitions, and loading states

### 📍 Jaipur-Specific Features
- **Local Areas**: Properties in Mansarovar, Vaishali Nagar, Malviya Nagar, Jagatpura
- **Market Information**: Detailed information about Jaipur's real estate market
- **Cultural Context**: Pink City themed design and content

## Tech Stack

- **Frontend**: Next.js 14 with TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Storage**: Local Storage (for demonstration)
- **Forms**: React Hook Form with Zod validation

## Getting Started

### Prerequisites
- Node.js 20 or higher
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd jaipur-real-estate
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Demo Credentials

For testing purposes, use these demo credentials:
- **Email**: demo@example.com
- **Password**: demo123

## Project Structure

```
src/
├── app/                    # Next.js app router pages
│   ├── about/             # About Jaipur page
│   ├── add-property/      # Add property page
│   ├── contact/           # Contact page
│   ├── login/             # Login page
│   ├── properties/        # Properties listing and detail pages
│   └── signup/            # Signup page
├── components/            # Reusable React components
│   ├── DataInitializer.tsx
│   ├── Footer.tsx
│   ├── Navbar.tsx
│   └── PropertyCard.tsx
├── data/                  # Static data and dummy content
│   └── properties.ts
├── lib/                   # Utility functions
│   ├── initData.ts
│   └── storage.ts
└── types/                 # TypeScript type definitions
    └── index.ts
```

## Pages Overview

### 🏡 Homepage
- Hero section with search functionality
- Featured properties showcase
- Popular locations in Jaipur
- Statistics and call-to-action sections

### 🔍 Properties Listing
- Grid and list view options
- Advanced filtering (location, price, type, bedrooms)
- Search functionality
- Responsive property cards

### 📋 Property Details
- Image gallery with navigation
- Comprehensive property information
- Owner contact details
- Location map placeholder

### ℹ️ About Jaipur
- Real estate market overview
- Investment opportunities
- Popular residential areas
- Future development prospects

### 📞 Contact Page
- Contact form with local storage
- Business information
- Office location details
- Quick contact options

### 🔐 Authentication
- User registration and login
- Form validation
- Session management with local storage

### ➕ Add Property
- Comprehensive property addition form
- Amenities management
- Form validation
- User authentication required

## Data Storage

This application uses **Local Storage** for demonstration purposes:
- **Properties**: Stored in `jaipur_properties`
- **Users**: Stored in `jaipur_users`
- **Current User**: Stored in `jaipur_current_user`
- **Contact Forms**: Stored in `jaipur_contacts`

## Dummy Data

The application comes pre-loaded with:
- 6 sample properties across different Jaipur locations
- 1 demo user account
- Various property types (apartments, houses, villas, plots)

## Responsive Design

The application is fully responsive and optimized for:
- **Desktop**: Full-featured experience with sidebar layouts
- **Tablet**: Adapted grid layouts and navigation
- **Mobile**: Collapsible navigation and stacked layouts

## Future Enhancements

Potential improvements for a production version:
- Real database integration (PostgreSQL, MongoDB)
- Image upload functionality
- Real-time chat system
- Payment gateway integration
- Advanced search with map integration
- Email notifications
- Admin dashboard
- Property comparison feature
- Wishlist functionality

## Contributing

This is a demonstration project. For production use, consider:
1. Implementing proper backend API
2. Adding comprehensive testing
3. Setting up CI/CD pipeline
4. Implementing proper security measures
5. Adding performance optimizations

## License

This project is created for demonstration purposes.

---

**Built with ❤️ for the Pink City of Jaipur**