import { Property, User, ContactForm } from '@/types';

export const STORAGE_KEYS = {
  PROPERTIES: 'jaipur_properties',
  USERS: 'jaipur_users',
  CURRENT_USER: 'jaipur_current_user',
  CONTACTS: 'jaipur_contacts',
};

export const getFromStorage = <T>(key: string): T[] => {
  if (typeof window === 'undefined') return [];
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : [];
};

export const saveToStorage = <T>(key: string, data: T[]): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(key, JSON.stringify(data));
};

export const addToStorage = <T extends { id: string }>(key: string, item: T): void => {
  const items = getFromStorage<T>(key);
  items.push(item);
  saveToStorage(key, items);
};

export const updateInStorage = <T extends { id: string }>(key: string, id: string, updatedItem: T): void => {
  const items = getFromStorage<T>(key);
  const index = items.findIndex(item => item.id === id);
  if (index !== -1) {
    items[index] = updatedItem;
    saveToStorage(key, items);
  }
};

export const removeFromStorage = <T extends { id: string }>(key: string, id: string): void => {
  const items = getFromStorage<T>(key);
  const filteredItems = items.filter(item => item.id !== id);
  saveToStorage(key, filteredItems);
};

export const getCurrentUser = (): User | null => {
  if (typeof window === 'undefined') return null;
  const userData = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
  return userData ? JSON.parse(userData) : null;
};

export const setCurrentUser = (user: User | null): void => {
  if (typeof window === 'undefined') return;
  if (user) {
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
  } else {
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
  }
};