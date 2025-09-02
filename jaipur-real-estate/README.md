# Jaipur Real Estate Portal

A complete web application for an Online Real Estate Portal based in Jaipur, Rajasthan, built with Next.js (frontend) and Node.js (backend).

## Features

- **Modern UI/UX**: Responsive design with Tailwind CSS
- **Property Listings**: Browse properties with advanced filters
- **Property Details**: Detailed property pages with image galleries
- **User Authentication**: Login/Signup functionality
- **Add Properties**: Users can list their properties
- **Local Storage**: All data stored locally for demo purposes
- **Jaipur-Specific**: Focused on Jaipur locations and market

## Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Lucide React** - Icons

### Backend
- **Node.js 20+** - Runtime
- **Express.js** - Web framework
- **File-based storage** - JSON files for demo data

## Project Structure

```
jaipur-real-estate/
├── frontend/                 # Next.js frontend
│   ├── src/
│   │   ├── app/             # App Router pages
│   │   ├── components/      # Reusable components
│   │   ├── lib/            # Utility functions
│   │   └── types/          # TypeScript types
│   └── package.json
├── backend/                 # Node.js backend
│   ├── data/               # JSON data files
│   ├── server.js           # Express server
│   └── package.json
└── README.md
```

## Getting Started

### Prerequisites
- Node.js 20 or higher
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   cd jaipur-real-estate
   ```

2. **Install Frontend Dependencies**
   ```bash
   cd frontend
   npm install
   ```

3. **Install Backend Dependencies**
   ```bash
   cd ../backend
   npm install
   ```

### Running the Application

1. **Start the Backend Server**
   ```bash
   cd backend
   npm run dev
   ```
   The API server will run on `http://localhost:5000`

2. **Start the Frontend Development Server**
   ```bash
   cd frontend
   npm run dev
   ```
   The web application will run on `http://localhost:3000`

3. **Open your browser**
   Navigate to `http://localhost:3000` to view the application

## Pages & Features

### 🏠 Homepage
- Hero section with Jaipur-specific branding
- Featured properties showcase
- Statistics and market overview
- Search functionality

### 🏢 Properties Listing
- Grid/List view toggle
- Advanced filters (location, price, type, bedrooms)
- Search functionality
- Responsive property cards

### 🏡 Property Details
- Image gallery
- Detailed property information
- Contact agent section
- Location map placeholder

### ℹ️ About Jaipur Real Estate
- Market overview and statistics
- Investment opportunities
- Key locations and pricing
- Future prospects

### 📞 Contact Page
- Contact form with local storage
- Office information
- Interactive map placeholder
- Business hours

### 👤 Authentication
- Login/Signup pages
- Local storage authentication
- User session management

### ➕ Add Property
- Property listing form
- Feature selection
- Contact information
- Form validation

## Demo Data

The application comes with pre-populated dummy data including:

- **Properties**: 4 sample properties in different Jaipur locations
- **Locations**: Mansarovar, Vaishali Nagar, Malviya Nagar, Jagatpura
- **Property Types**: Apartments, Villas, Houses, Plots
- **Price Range**: ₹25L to ₹1.5Cr

## API Endpoints

### Properties
- `GET /api/properties` - Get all properties
- `GET /api/properties/:id` - Get property by ID
- `POST /api/properties` - Add new property

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Contact
- `POST /api/contact` - Submit contact form

### Health Check
- `GET /api/health` - API health status

## Local Storage Structure

### Frontend Storage
- `properties` - Property listings
- `currentUser` - Logged in user data
- `contactForms` - Contact form submissions

### Backend Storage
- `data/properties.json` - Property data
- `data/users.json` - User accounts
- `data/contacts.json` - Contact submissions

## Customization

### Adding New Locations
Update the locations array in:
- `frontend/src/app/properties/page.tsx`
- `frontend/src/app/add-property/page.tsx`

### Modifying Property Types
Update the propertyTypes array in:
- `frontend/src/types/index.ts`
- Property-related components

### Styling
- Colors: Modify `tailwind.config.ts`
- Components: Update `globals.css`

## Production Deployment

### Frontend Build
```bash
cd frontend
npm run build
npm start
```

### Backend Production
```bash
cd backend
npm start
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is for demonstration purposes. Feel free to use and modify as needed.

## Support

For questions or issues, please contact the development team or create an issue in the repository.

---

**Built with ❤️ for the Pink City - Jaipur**