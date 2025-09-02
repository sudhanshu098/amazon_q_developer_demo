# Quick Setup Guide - Jaipur Real Estate Portal

## 🚀 Quick Start (Recommended)

### Option 1: Using the Startup Script (Windows)
```bash
# Navigate to the project directory
cd jaipur-real-estate

# Run the startup script
start.bat
```

This will automatically:
- Install all dependencies
- Start the backend server on port 5000
- Start the frontend server on port 3000
- Open both in separate command windows

### Option 2: Manual Setup

1. **Install Dependencies**
   ```bash
   # Install frontend dependencies
   cd frontend
   npm install

   # Install backend dependencies
   cd ../backend
   npm install
   ```

2. **Start Backend Server**
   ```bash
   cd backend
   npm run dev
   ```
   Backend will run on: `http://localhost:5000`

3. **Start Frontend Server** (in a new terminal)
   ```bash
   cd frontend
   npm run dev
   ```
   Frontend will run on: `http://localhost:3000`

## 🌐 Access the Application

Once both servers are running:
- **Main Application**: http://localhost:3000
- **API Health Check**: http://localhost:5000/api/health

## 📱 Demo Features to Test

### 1. Browse Properties
- Visit the homepage
- Click "Properties" in navigation
- Use filters (location, price, type)
- Switch between grid/list view

### 2. View Property Details
- Click on any property card
- View detailed information
- See contact details

### 3. User Authentication
- Click "Login" in navigation
- Use demo credentials:
  - Email: `demo@example.com`
  - Password: `demo123`
- Or create a new account via "Sign up"

### 4. Add New Property
- Login first
- Click "Add Property" in navigation
- Fill out the form
- Submit to see it in listings

### 5. Contact Form
- Visit "Contact" page
- Fill out and submit the form
- Data is stored locally

## 🏠 Jaipur Locations Featured

- **Mansarovar** - Premium residential area
- **Vaishali Nagar** - Upscale locality
- **Malviya Nagar** - Central location
- **Jagatpura** - Developing area
- **C-Scheme** - Commercial hub
- **Bani Park** - Heritage area

## 🛠 Troubleshooting

### Port Already in Use
If you get port errors:
- Backend (5000): Change PORT in `backend/server.js`
- Frontend (3000): Next.js will automatically suggest port 3001

### Dependencies Issues
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Node.js Version
Ensure you're using Node.js 20 or higher:
```bash
node --version
```

## 📊 Data Storage

All data is stored locally:
- **Frontend**: Browser localStorage
- **Backend**: JSON files in `backend/data/`

## 🎨 Customization

### Colors & Branding
- Edit `frontend/tailwind.config.ts`
- Modify `frontend/src/app/globals.css`

### Add New Locations
- Update arrays in property-related components
- Add to dummy data in `backend/server.js`

### Property Types
- Modify `frontend/src/types/index.ts`
- Update forms and filters accordingly

## 📞 Support

If you encounter any issues:
1. Check that both servers are running
2. Verify Node.js version (20+)
3. Clear browser cache and localStorage
4. Restart both servers

---

**Enjoy exploring the Jaipur Real Estate Portal! 🏰**