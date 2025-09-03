'use client';

import { useEffect } from 'react';
import { initializeData } from '@/lib/initData';

export default function DataInitializer() {
  useEffect(() => {
    initializeData();
  }, []);

  return null;
}