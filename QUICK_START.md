# 🏠 Jaipur Real Estate Portal - Quick Start Guide

## 🚀 Getting Started (2 Minutes Setup)

### Option 1: Automated Setup (Recommended)
```bash
# Windows
start.bat

# Linux/Mac
bash start.sh
```

### Option 2: Manual Setup
```bash
# Terminal 1 - Backend
cd backend
npm install
npm run dev

# Terminal 2 - Frontend  
cd frontend
npm install
npm run dev
```

## 🌐 Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **API Health**: http://localhost:5000/api/health

## 🎯 Demo Features to Try

### 1. Browse Properties
- Visit the homepage to see featured properties
- Go to Properties page for full listings
- Use filters (location, price, type, bedrooms)
- Search for specific properties

### 2. User Authentication (Demo)
- Click "Sign Up" to create an account (any email/password works)
- Login with your created credentials
- Access becomes available to "Add Property" feature

### 3. Add New Property
- Login first (required)
- Click "Add Property" in navigation
- Fill out the comprehensive form
- Submit to see your property in listings

### 4. Property Details
- Click any property card to view details
- Browse image gallery (placeholder images)
- View contact information
- See property features and amenities

### 5. Contact & About Pages
- Submit contact form (stored locally)
- Read about Jaipur real estate market
- View investment tips and popular areas

## 📱 Responsive Design

The application works perfectly on:
- 🖥️ Desktop computers
- 📱 Mobile phones  
- 📟 Tablets

## 🏙️ Jaipur Locations Featured

- **Mansarovar** - Well-planned residential area
- **Vaishali Nagar** - Premium luxury locality
- **Malviya Nagar** - Central location with metro
- **Jagatpura** - Emerging affordable area

## 🔧 Technical Stack

- **Frontend**: Next.js 14 + React 18 + TypeScript + Tailwind CSS
- **Backend**: Node.js 20 + Express.js
- **Storage**: Local JSON files (demo purposes)
- **Authentication**: Browser localStorage (demo)

## 📊 Sample Data Included

- 4 pre-loaded properties across different Jaipur locations
- Various property types (apartments, villas, houses, plots)
- Price range from ₹25L to ₹1.5Cr
- Complete property details with features

## 🛠️ Development Commands

```bash
# Frontend
npm run dev      # Development server
npm run build    # Production build
npm run start    # Production server
npm run lint     # Code linting

# Backend  
npm run dev      # Development with auto-reload
npm start        # Production server
```

## 📁 Project Structure

```
amazon_q_developer_demo/
├── 🎨 frontend/          # Next.js React app
│   ├── src/app/          # Pages (App Router)
│   ├── src/components/   # Reusable components
│   ├── src/lib/         # Utilities & storage
│   └── src/types/       # TypeScript definitions
├── 🔧 backend/          # Node.js API server
│   ├── server.js        # Main server file
│   └── data/           # JSON storage (auto-created)
└── 📚 Documentation    # README files
```

## 🎉 What You Can Do

✅ Browse and search properties  
✅ Filter by location, price, type  
✅ View detailed property information  
✅ Create user accounts (demo)  
✅ Add new property listings  
✅ Submit contact forms  
✅ Responsive mobile experience  
✅ Learn about Jaipur real estate market  

## 🔍 Troubleshooting

**Port already in use?**
```bash
# Kill processes on ports 3000 and 5000
npx kill-port 3000 5000
```

**Dependencies issues?**
```bash
# Clean install
rm -rf node_modules package-lock.json
npm install
```

**Verification check:**
```bash
node setup-check.js
```

## 🎯 Perfect For

- 🎓 Learning Next.js and React
- 💼 Portfolio projects
- 🏗️ Real estate application templates
- 📚 Full-stack development examples
- 🎨 UI/UX design references

---

**Enjoy exploring the Pink City's real estate market! 🏰✨**