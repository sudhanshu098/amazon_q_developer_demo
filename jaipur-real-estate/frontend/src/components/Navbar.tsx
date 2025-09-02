'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Menu, X, Home, Building, Phone, Info, User, LogOut } from 'lucide-react';
import { getCurrentUser, logout } from '@/lib/storage';
import { User as UserType } from '@/types';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<UserType | null>(null);

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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <Building className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold text-gray-900">Jaipur Realty</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="flex items-center space-x-1 text-gray-700 hover:text-primary">
              <Home className="h-4 w-4" />
              <span>Home</span>
            </Link>
            <Link href="/properties" className="flex items-center space-x-1 text-gray-700 hover:text-primary">
              <Building className="h-4 w-4" />
              <span>Properties</span>
            </Link>
            <Link href="/about" className="flex items-center space-x-1 text-gray-700 hover:text-primary">
              <Info className="h-4 w-4" />
              <span>About</span>
            </Link>
            <Link href="/contact" className="flex items-center space-x-1 text-gray-700 hover:text-primary">
              <Phone className="h-4 w-4" />
              <span>Contact</span>
            </Link>
            
            {user ? (
              <>
                <Link href="/add-property" className="flex items-center space-x-1 text-gray-700 hover:text-primary">
                  <Building className="h-4 w-4" />
                  <span>Add Property</span>
                </Link>
                <div className="flex items-center space-x-4">
                  <span className="text-gray-700">Welcome, {user.name}</span>
                  <button onClick={handleLogout} className="flex items-center space-x-1 text-gray-700 hover:text-primary">
                    <LogOut className="h-4 w-4" />
                    <span>Logout</span>
                  </button>
                </div>
              </>
            ) : (
              <Link href="/login" className="flex items-center space-x-1 btn-primary">
                <User className="h-4 w-4" />
                <span>Login</span>
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-700">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
              <Link href="/" className="block px-3 py-2 text-gray-700 hover:text-primary">Home</Link>
              <Link href="/properties" className="block px-3 py-2 text-gray-700 hover:text-primary">Properties</Link>
              <Link href="/about" className="block px-3 py-2 text-gray-700 hover:text-primary">About</Link>
              <Link href="/contact" className="block px-3 py-2 text-gray-700 hover:text-primary">Contact</Link>
              {user ? (
                <>
                  <Link href="/add-property" className="block px-3 py-2 text-gray-700 hover:text-primary">Add Property</Link>
                  <span className="block px-3 py-2 text-gray-700">Welcome, {user.name}</span>
                  <button onClick={handleLogout} className="block px-3 py-2 text-gray-700 hover:text-primary">Logout</button>
                </>
              ) : (
                <Link href="/login" className="block px-3 py-2 text-gray-700 hover:text-primary">Login</Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}