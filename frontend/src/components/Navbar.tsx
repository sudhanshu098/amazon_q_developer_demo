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
    <nav className="bg-white/95 backdrop-blur-md shadow-soft sticky top-0 z-50 border-b border-neutral-200/50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          {/* Logo Section */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center shadow-medium group-hover:shadow-large transition-all duration-300 group-hover:scale-110">
              <span className="text-white font-bold text-lg">JR</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold gradient-text">Jaipur Realty</span>
              <span className="text-xs text-neutral-500 font-medium">Pink City Properties</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <Link 
              href="/" 
              className="px-4 py-2 text-neutral-700 hover:text-primary-600 font-medium rounded-lg hover:bg-primary-50 transition-all duration-200"
            >
              Home
            </Link>
            <Link 
              href="/properties" 
              className="px-4 py-2 text-neutral-700 hover:text-primary-600 font-medium rounded-lg hover:bg-primary-50 transition-all duration-200"
            >
              Properties
            </Link>
            <Link 
              href="/about" 
              className="px-4 py-2 text-neutral-700 hover:text-primary-600 font-medium rounded-lg hover:bg-primary-50 transition-all duration-200"
            >
              About Jaipur
            </Link>
            <Link 
              href="/contact" 
              className="px-4 py-2 text-neutral-700 hover:text-primary-600 font-medium rounded-lg hover:bg-primary-50 transition-all duration-200"
            >
              Contact
            </Link>
            
            {user ? (
              <div className="flex items-center space-x-4 ml-6 pl-6 border-l border-neutral-200">
                <Link 
                  href="/add-property" 
                  className="bg-gradient-primary text-white px-6 py-2.5 rounded-lg font-medium shadow-medium hover:shadow-large transform hover:scale-105 transition-all duration-200"
                >
                  Add Property
                </Link>
                <div className="flex items-center space-x-3">
                  <div className="flex flex-col text-right">
                    <span className="text-sm font-medium text-neutral-700">Welcome back,</span>
                    <span className="text-sm text-primary-600 font-semibold">{user.name}</span>
                  </div>
                  <button 
                    onClick={handleLogout} 
                    className="px-4 py-2 text-neutral-600 hover:text-red-600 font-medium rounded-lg hover:bg-red-50 transition-all duration-200"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-3 ml-6 pl-6 border-l border-neutral-200">
                <Link 
                  href="/login" 
                  className="px-4 py-2 text-neutral-700 hover:text-primary-600 font-medium rounded-lg hover:bg-primary-50 transition-all duration-200"
                >
                  Login
                </Link>
                <Link 
                  href="/signup" 
                  className="bg-gradient-primary text-white px-6 py-2.5 rounded-lg font-medium shadow-medium hover:shadow-large transform hover:scale-105 transition-all duration-200"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 rounded-lg hover:bg-neutral-100 transition-colors duration-200"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg 
              className={`w-6 h-6 text-neutral-700 transition-transform duration-200 ${isMenuOpen ? 'rotate-90' : ''}`} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-6 border-t border-neutral-200/50 bg-white/95 backdrop-blur-md">
            <div className="flex flex-col space-y-3">
              <Link 
                href="/" 
                className="px-4 py-3 text-neutral-700 hover:text-primary-600 hover:bg-primary-50 rounded-lg font-medium transition-all duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                href="/properties" 
                className="px-4 py-3 text-neutral-700 hover:text-primary-600 hover:bg-primary-50 rounded-lg font-medium transition-all duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Properties
              </Link>
              <Link 
                href="/about" 
                className="px-4 py-3 text-neutral-700 hover:text-primary-600 hover:bg-primary-50 rounded-lg font-medium transition-all duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                About Jaipur
              </Link>
              <Link 
                href="/contact" 
                className="px-4 py-3 text-neutral-700 hover:text-primary-600 hover:bg-primary-50 rounded-lg font-medium transition-all duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              
              <div className="pt-4 border-t border-neutral-200/50">
                {user ? (
                  <>
                    <div className="px-4 py-2 mb-3">
                      <span className="text-sm text-neutral-600">Welcome back,</span>
                      <span className="block text-lg font-semibold text-primary-600">{user.name}</span>
                    </div>
                    <Link 
                      href="/add-property" 
                      className="block mx-4 mb-3 bg-gradient-primary text-white px-6 py-3 rounded-lg font-medium text-center shadow-medium"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Add Property
                    </Link>
                    <button 
                      onClick={() => {
                        handleLogout();
                        setIsMenuOpen(false);
                      }} 
                      className="w-full text-left px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg font-medium transition-all duration-200"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link 
                      href="/login" 
                      className="block px-4 py-3 text-neutral-700 hover:text-primary-600 hover:bg-primary-50 rounded-lg font-medium transition-all duration-200"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Login
                    </Link>
                    <Link 
                      href="/signup" 
                      className="block mx-4 mt-3 bg-gradient-primary text-white px-6 py-3 rounded-lg font-medium text-center shadow-medium"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Sign Up
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}