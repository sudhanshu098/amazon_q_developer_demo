const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs-extra');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve placeholder images
app.get('/api/placeholder/:width/:height', (req, res) => {
  const { width, height } = req.params;
  res.redirect(`https://via.placeholder.com/${width}x${height}/4F46E5/FFFFFF?text=Property+Image`);
});

// Data storage paths
const DATA_DIR = path.join(__dirname, 'data');
const PROPERTIES_FILE = path.join(DATA_DIR, 'properties.json');
const USERS_FILE = path.join(DATA_DIR, 'users.json');
const CONTACTS_FILE = path.join(DATA_DIR, 'contacts.json');

// Ensure data directory and files exist
const initializeData = async () => {
  try {
    await fs.ensureDir(DATA_DIR);
    
    if (!await fs.pathExists(PROPERTIES_FILE)) {
      await fs.writeJson(PROPERTIES_FILE, getDummyProperties());
    }
    
    if (!await fs.pathExists(USERS_FILE)) {
      await fs.writeJson(USERS_FILE, []);
    }
    
    if (!await fs.pathExists(CONTACTS_FILE)) {
      await fs.writeJson(CONTACTS_FILE, []);
    }
  } catch (error) {
    console.error('Error initializing data:', error);
  }
};

// Dummy properties data
const getDummyProperties = () => [
  {
    id: '1',
    title: '3BHK Luxury Apartment in Mansarovar',
    description: 'Beautiful 3BHK apartment with modern amenities in prime Mansarovar location.',
    price: 8500000,
    location: 'Mansarovar',
    area: 1200,
    bedrooms: 3,
    bathrooms: 2,
    type: 'apartment',
    images: ['https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&h=400&fit=crop'],
    features: ['Parking', 'Lift', 'Security', 'Garden'],
    contact: { name: 'Rajesh Sharma', phone: '+91 98765 43210', email: 'rajesh@example.com' },
    createdAt: new Date().toISOString()
  },
  {
    id: '2',
    title: '4BHK Villa in Vaishali Nagar',
    description: 'Spacious villa with garden and parking in peaceful Vaishali Nagar.',
    price: 15000000,
    location: 'Vaishali Nagar',
    area: 2000,
    bedrooms: 4,
    bathrooms: 3,
    type: 'villa',
    images: ['https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&h=400&fit=crop'],
    features: ['Garden', 'Parking', 'Swimming Pool', 'Security'],
    contact: { name: 'Priya Agarwal', phone: '+91 87654 32109', email: 'priya@example.com' },
    createdAt: new Date().toISOString()
  },
  {
    id: '3',
    title: '2BHK Flat in Malviya Nagar',
    description: 'Affordable 2BHK flat perfect for small families in Malviya Nagar.',
    price: 4500000,
    location: 'Malviya Nagar',
    area: 800,
    bedrooms: 2,
    bathrooms: 1,
    type: 'apartment',
    images: ['https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&h=400&fit=crop'],
    features: ['Parking', 'Lift', 'Security'],
    contact: { name: 'Amit Kumar', phone: '+91 76543 21098', email: 'amit@example.com' },
    createdAt: new Date().toISOString()
  },
  {
    id: '4',
    title: 'Residential Plot in Jagatpura',
    description: '1000 sq ft residential plot in developing area of Jagatpura.',
    price: 2500000,
    location: 'Jagatpura',
    area: 1000,
    bedrooms: 0,
    bathrooms: 0,
    type: 'plot',
    images: ['https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&h=400&fit=crop'],
    features: ['Corner Plot', 'Clear Title', 'Road Facing'],
    contact: { name: 'Sunita Jain', phone: '+91 65432 10987', email: 'sunita@example.com' },
    createdAt: new Date().toISOString()
  }
];

// Routes

// Get all properties
app.get('/api/properties', async (req, res) => {
  try {
    const properties = await fs.readJson(PROPERTIES_FILE);
    res.json(properties);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch properties' });
  }
});

// Get property by ID
app.get('/api/properties/:id', async (req, res) => {
  try {
    const properties = await fs.readJson(PROPERTIES_FILE);
    const property = properties.find(p => p.id === req.params.id);
    
    if (!property) {
      return res.status(404).json({ error: 'Property not found' });
    }
    
    res.json(property);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch property' });
  }
});

// Add new property
app.post('/api/properties', async (req, res) => {
  try {
    const properties = await fs.readJson(PROPERTIES_FILE);
    const newProperty = {
      id: Date.now().toString(),
      ...req.body,
      createdAt: new Date().toISOString()
    };
    
    properties.push(newProperty);
    await fs.writeJson(PROPERTIES_FILE, properties);
    
    res.status(201).json(newProperty);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add property' });
  }
});

// User registration
app.post('/api/auth/register', async (req, res) => {
  try {
    const users = await fs.readJson(USERS_FILE);
    const { name, email, phone, password } = req.body;
    
    // Check if user already exists
    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }
    
    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      phone,
      password, // In production, this should be hashed
      createdAt: new Date().toISOString()
    };
    
    users.push(newUser);
    await fs.writeJson(USERS_FILE, users);
    
    // Don't send password back
    const { password: _, ...userResponse } = newUser;
    res.status(201).json(userResponse);
  } catch (error) {
    res.status(500).json({ error: 'Failed to register user' });
  }
});

// User login
app.post('/api/auth/login', async (req, res) => {
  try {
    const users = await fs.readJson(USERS_FILE);
    const { email, password } = req.body;
    
    const user = users.find(u => u.email === email && u.password === password);
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    // Don't send password back
    const { password: _, ...userResponse } = user;
    res.json(userResponse);
  } catch (error) {
    res.status(500).json({ error: 'Failed to login' });
  }
});

// Contact form submission
app.post('/api/contact', async (req, res) => {
  try {
    const contacts = await fs.readJson(CONTACTS_FILE);
    const newContact = {
      id: Date.now().toString(),
      ...req.body,
      createdAt: new Date().toISOString()
    };
    
    contacts.push(newContact);
    await fs.writeJson(CONTACTS_FILE, contacts);
    
    res.status(201).json({ message: 'Contact form submitted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to submit contact form' });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Jaipur Real Estate API is running' });
});

// Serve static files (for production)
app.use(express.static(path.join(__dirname, '../frontend/build')));

// Catch all handler for frontend routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Initialize data and start server
initializeData().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Jaipur Real Estate API server running on port ${PORT}`);
    console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
  });
});

module.exports = app;