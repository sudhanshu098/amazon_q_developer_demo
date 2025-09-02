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
    images: ['https://picsum.photos/400/300?random=1', 'https://picsum.photos/400/300?random=2'],
    features: ['Parking', 'Lift', 'Security', 'Garden'],
    contact: { name: 'Rajesh Sharma', phone: '+91-9876543210', email: 'rajesh@example.com' },
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
    images: ['https://picsum.photos/400/300?random=3', 'https://picsum.photos/400/300?random=4'],
    features: ['Garden', 'Parking', 'Swimming Pool', 'Security'],
    contact: { name: 'Priya Agarwal', phone: '+91-9876543211', email: 'priya@example.com' },
    createdAt: new Date().toISOString()
  },
  {
    id: '3',
    title: '2BHK Flat in Malviya Nagar',
    description: 'Affordable 2BHK flat near metro station in Malviya Nagar.',
    price: 4500000,
    location: 'Malviya Nagar',
    area: 800,
    bedrooms: 2,
    bathrooms: 1,
    type: 'apartment',
    images: ['https://picsum.photos/400/300?random=5', 'https://picsum.photos/400/300?random=6'],
    features: ['Metro Nearby', 'Parking', 'Lift'],
    contact: { name: 'Amit Kumar', phone: '+91-9876543212', email: 'amit@example.com' },
    createdAt: new Date().toISOString()
  },
  {
    id: '4',
    title: 'Residential Plot in Jagatpura',
    description: '1000 sq ft residential plot in developing Jagatpura area.',
    price: 2500000,
    location: 'Jagatpura',
    area: 1000,
    bedrooms: 0,
    bathrooms: 0,
    type: 'plot',
    images: ['https://picsum.photos/400/300?random=7'],
    features: ['Corner Plot', 'Clear Title', 'Road Facing'],
    contact: { name: 'Sunita Jain', phone: '+91-9876543213', email: 'sunita@example.com' },
    createdAt: new Date().toISOString()
  }
];

// Helper functions
const readJsonFile = async (filePath) => {
  try {
    return await fs.readJson(filePath);
  } catch (error) {
    console.error(`Error reading ${filePath}:`, error);
    return [];
  }
};

const writeJsonFile = async (filePath, data) => {
  try {
    await fs.writeJson(filePath, data, { spaces: 2 });
    return true;
  } catch (error) {
    console.error(`Error writing ${filePath}:`, error);
    return false;
  }
};

// Routes

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Jaipur Real Estate API is running' });
});

// Properties routes
app.get('/api/properties', async (req, res) => {
  try {
    const properties = await readJsonFile(PROPERTIES_FILE);
    const { search, location, type, minPrice, maxPrice, bedrooms } = req.query;
    
    let filtered = properties;
    
    if (search) {
      const searchLower = search.toLowerCase();
      filtered = filtered.filter(p => 
        p.title.toLowerCase().includes(searchLower) ||
        p.location.toLowerCase().includes(searchLower) ||
        p.description.toLowerCase().includes(searchLower)
      );
    }
    
    if (location) {
      filtered = filtered.filter(p => p.location === location);
    }
    
    if (type) {
      filtered = filtered.filter(p => p.type === type);
    }
    
    if (minPrice) {
      filtered = filtered.filter(p => p.price >= parseInt(minPrice));
    }
    
    if (maxPrice) {
      filtered = filtered.filter(p => p.price <= parseInt(maxPrice));
    }
    
    if (bedrooms) {
      filtered = filtered.filter(p => p.bedrooms === parseInt(bedrooms));
    }
    
    res.json(filtered);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch properties' });
  }
});

app.get('/api/properties/:id', async (req, res) => {
  try {
    const properties = await readJsonFile(PROPERTIES_FILE);
    const property = properties.find(p => p.id === req.params.id);
    
    if (!property) {
      return res.status(404).json({ error: 'Property not found' });
    }
    
    res.json(property);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch property' });
  }
});

app.post('/api/properties', async (req, res) => {
  try {
    const properties = await readJsonFile(PROPERTIES_FILE);
    const newProperty = {
      id: Date.now().toString(),
      ...req.body,
      createdAt: new Date().toISOString()
    };
    
    properties.push(newProperty);
    
    if (await writeJsonFile(PROPERTIES_FILE, properties)) {
      res.status(201).json(newProperty);
    } else {
      res.status(500).json({ error: 'Failed to save property' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to create property' });
  }
});

app.put('/api/properties/:id', async (req, res) => {
  try {
    const properties = await readJsonFile(PROPERTIES_FILE);
    const index = properties.findIndex(p => p.id === req.params.id);
    
    if (index === -1) {
      return res.status(404).json({ error: 'Property not found' });
    }
    
    properties[index] = { ...properties[index], ...req.body };
    
    if (await writeJsonFile(PROPERTIES_FILE, properties)) {
      res.json(properties[index]);
    } else {
      res.status(500).json({ error: 'Failed to update property' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to update property' });
  }
});

app.delete('/api/properties/:id', async (req, res) => {
  try {
    const properties = await readJsonFile(PROPERTIES_FILE);
    const filtered = properties.filter(p => p.id !== req.params.id);
    
    if (filtered.length === properties.length) {
      return res.status(404).json({ error: 'Property not found' });
    }
    
    if (await writeJsonFile(PROPERTIES_FILE, filtered)) {
      res.json({ message: 'Property deleted successfully' });
    } else {
      res.status(500).json({ error: 'Failed to delete property' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete property' });
  }
});

// Users routes
app.post('/api/users/register', async (req, res) => {
  try {
    const users = await readJsonFile(USERS_FILE);
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
      password, // In real app, this should be hashed
      createdAt: new Date().toISOString()
    };
    
    users.push(newUser);
    
    if (await writeJsonFile(USERS_FILE, users)) {
      // Don't send password back
      const { password: _, ...userResponse } = newUser;
      res.status(201).json(userResponse);
    } else {
      res.status(500).json({ error: 'Failed to register user' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to register user' });
  }
});

app.post('/api/users/login', async (req, res) => {
  try {
    const users = await readJsonFile(USERS_FILE);
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

// Contact form routes
app.post('/api/contact', async (req, res) => {
  try {
    const contacts = await readJsonFile(CONTACTS_FILE);
    const newContact = {
      id: Date.now().toString(),
      ...req.body,
      createdAt: new Date().toISOString()
    };
    
    contacts.push(newContact);
    
    if (await writeJsonFile(CONTACTS_FILE, contacts)) {
      res.status(201).json(newContact);
    } else {
      res.status(500).json({ error: 'Failed to save contact form' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to submit contact form' });
  }
});

app.get('/api/contacts', async (req, res) => {
  try {
    const contacts = await readJsonFile(CONTACTS_FILE);
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch contacts' });
  }
});

// Statistics route
app.get('/api/stats', async (req, res) => {
  try {
    const properties = await readJsonFile(PROPERTIES_FILE);
    const users = await readJsonFile(USERS_FILE);
    const contacts = await readJsonFile(CONTACTS_FILE);
    
    const stats = {
      totalProperties: properties.length,
      totalUsers: users.length,
      totalContacts: contacts.length,
      propertiesByType: {
        apartment: properties.filter(p => p.type === 'apartment').length,
        house: properties.filter(p => p.type === 'house').length,
        villa: properties.filter(p => p.type === 'villa').length,
        plot: properties.filter(p => p.type === 'plot').length
      },
      propertiesByLocation: properties.reduce((acc, p) => {
        acc[p.location] = (acc[p.location] || 0) + 1;
        return acc;
      }, {}),
      averagePrice: properties.length > 0 
        ? Math.round(properties.reduce((sum, p) => sum + p.price, 0) / properties.length)
        : 0
    };
    
    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch statistics' });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Initialize data and start server
initializeData().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Jaipur Real Estate API server running on port ${PORT}`);
    console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
    console.log(`🏠 Properties API: http://localhost:${PORT}/api/properties`);
  });
}).catch(error => {
  console.error('Failed to initialize server:', error);
  process.exit(1);
});