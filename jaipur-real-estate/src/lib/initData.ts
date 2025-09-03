import { User } from '@/types';
import { getFromStorage, saveToStorage, STORAGE_KEYS } from './storage';
import { dummyProperties } from '@/data/properties';

export const initializeData = () => {
  // Initialize properties if not exists
  const existingProperties = getFromStorage(STORAGE_KEYS.PROPERTIES);
  if (existingProperties.length === 0) {
    saveToStorage(STORAGE_KEYS.PROPERTIES, dummyProperties);
  }

  // Initialize demo user if not exists
  const existingUsers = getFromStorage<User>(STORAGE_KEYS.USERS);
  const demoUser = existingUsers.find(u => u.email === 'demo@example.com');
  
  if (!demoUser) {
    const demoUserData: User = {
      id: 'demo-user',
      name: 'Demo User',
      email: 'demo@example.com',
      phone: '+91 9876543210',
      password: 'demo123',
      createdAt: new Date().toISOString(),
    };
    
    const updatedUsers = [...existingUsers, demoUserData];
    saveToStorage(STORAGE_KEYS.USERS, updatedUsers);
  }
};