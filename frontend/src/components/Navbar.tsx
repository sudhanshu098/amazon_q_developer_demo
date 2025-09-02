'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { getCurrentUser, logout } from '@/lib/storage';
import { User } from '@/types';

export default function Navbar() {
  const [user, setUser] = useState<User | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    setUser(getCurrentUser());
  }, []);

  const handleLogout = () => {
    logout();
    setUser(null);
    window.location.href = '/';
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">JR</span>
            </div>
            <span className="text-xl font-bold text-gray-800">Jaipur Realty</span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-primary">Home</Link>
            <Link href="/properties" className="text-gray-700 hover:text-primary">Properties</Link>
            <Link href="/about" className="text-gray-700 hover:text-primary">About Jaipur</Link>
            <Link href="/contact" className="text-gray-700 hover:text-primary">Contact</Link>
            
            {user ? (
              <div className="flex items-center space-x-4">
                <Link href="/add-property" className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90">
                  Add Property
                </Link>
                <span className="text-gray-700">Hi, {user.name}</span>
                <button onClick={handleLogout} className="text-gray-700 hover:text-primary">
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link href="/login" className="text-gray-700 hover:text-primary">Login</Link>
                <Link href="/signup" className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90">
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          <button 
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col space-y-4">
              <Link href="/" className="text-gray-700">Home</Link>
              <Link href="/properties" className="text-gray-700">Properties</Link>
              <Link href="/about" className="text-gray-700">About Jaipur</Link>
              <Link href="/contact" className="text-gray-700">Contact</Link>
              {user ? (
                <>
                  <Link href="/add-property" className="text-primary">Add Property</Link>
                  <button onClick={handleLogout} className="text-left text-gray-700">Logout</button>
                </>
              ) : (
                <>
                  <Link href="/login" className="text-gray-700">Login</Link>
                  <Link href="/signup" className="text-primary">Sign Up</Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}