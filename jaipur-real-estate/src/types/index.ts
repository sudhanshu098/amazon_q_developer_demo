export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  area: string;
  bedrooms: number;
  bathrooms: number;
  propertyType: 'apartment' | 'house' | 'villa' | 'plot';
  images: string[];
  amenities: string[];
  contactPhone: string;
  contactEmail: string;
  ownerName: string;
  isAvailable: boolean;
  createdAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  password: string;
  createdAt: string;
}

export interface ContactForm {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  createdAt: string;
}

export interface FilterOptions {
  location: string;
  propertyType: string;
  minPrice: number;
  maxPrice: number;
  bedrooms: number;
}