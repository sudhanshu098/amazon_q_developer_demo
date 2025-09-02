# Jaipur Real Estate Portal - Frontend

This is the frontend application for the Jaipur Real Estate Portal, built with Next.js 14, React 18, and TypeScript.

## Features

- **Modern UI/UX** with Tailwind CSS
- **Responsive Design** for all devices
- **Server-Side Rendering** with Next.js App Router
- **TypeScript** for type safety
- **Local Storage** for demo authentication and data persistence
- **Component-based Architecture** for maintainability

## Pages

1. **Homepage** (`/`) - Hero section, featured properties, Jaipur highlights
2. **Properties** (`/properties`) - Property listings with filters and search
3. **Property Details** (`/properties/[id]`) - Detailed property view with image gallery
4. **About Jaipur** (`/about`) - Market overview and investment information
5. **Contact** (`/contact`) - Contact form and business information
6. **Login** (`/login`) - User authentication (demo)
7. **Signup** (`/signup`) - User registration (demo)
8. **Add Property** (`/add-property`) - Property listing form (requires login)

## Components

- **Navbar** - Navigation with user authentication state
- **Footer** - Site information and links
- **PropertyCard** - Reusable property display component

## Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Environment

The application runs on `http://localhost:3000` by default.

## Data Storage

- Uses browser localStorage for demo purposes
- Property data, user authentication, and contact forms are stored locally
- Includes dummy data for Jaipur properties

## Styling

- **Tailwind CSS** for utility-first styling
- **Custom color scheme** with primary (red) and secondary (orange) colors
- **Responsive breakpoints** for mobile, tablet, and desktop
- **Modern design patterns** with cards, shadows, and smooth transitions