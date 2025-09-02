export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  area: number;
  bedrooms: number;
  bathrooms: number;
  type: 'apartment' | 'house' | 'villa' | 'plot';
  images: string[];
  features: string[];
  contact: {
    name: string;
    phone: string;
    email: string;
  };
  createdAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
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