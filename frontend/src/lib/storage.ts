import { Property, User, ContactForm } from '@/types';

// Property storage functions
export const getProperties = (): Property[] => {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem('properties');
  return stored ? JSON.parse(stored) : getDummyProperties();
};

export const saveProperty = (property: Property): void => {
  const properties = getProperties();
  const existingIndex = properties.findIndex(p => p.id === property.id);
  
  if (existingIndex >= 0) {
    properties[existingIndex] = property;
  } else {
    properties.push(property);
  }
  
  localStorage.setItem('properties', JSON.stringify(properties));
};

export const deleteProperty = (id: string): void => {
  const properties = getProperties().filter(p => p.id !== id);
  localStorage.setItem('properties', JSON.stringify(properties));
};

// User storage functions
export const getCurrentUser = (): User | null => {
  if (typeof window === 'undefined') return null;
  const stored = localStorage.getItem('currentUser');
  return stored ? JSON.parse(stored) : null;
};

export const saveUser = (user: User): void => {
  localStorage.setItem('currentUser', JSON.stringify(user));
};

export const logout = (): void => {
  localStorage.removeItem('currentUser');
};

// Contact form storage
export const saveContactForm = (form: ContactForm): void => {
  const forms = getContactForms();
  forms.push(form);
  localStorage.setItem('contactForms', JSON.stringify(forms));
};

export const getContactForms = (): ContactForm[] => {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem('contactForms');
  return stored ? JSON.parse(stored) : [];
};

// Dummy data
const getDummyProperties = (): Property[] => [
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