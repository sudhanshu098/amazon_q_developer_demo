'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, MapPin, Building, Users, Star } from 'lucide-react';
import PropertyCard from '@/components/PropertyCard';
import { getProperties } from '@/lib/storage';
import { Property } from '@/types';

export default function HomePage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    setProperties(getProperties().slice(0, 4)); // Show only first 4 properties
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      window.location.href = `/properties?search=${encodeURIComponent(searchTerm)}`;
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary to-secondary text-white py-20">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Find Your Dream Home in <span className="text-yellow-300">Jaipur</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Discover premium properties in the Pink City. From luxury apartments to spacious villas.
          </p>
          
          {/* Search Bar */}
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
            <div className="flex bg-white rounded-lg overflow-hidden shadow-lg">
              <input
                type="text"
                placeholder="Search by location, property type..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 px-6 py-4 text-gray-900 focus:outline-none"
              />
              <button type="submit" className="bg-primary hover:bg-primary/90 px-8 py-4 transition-colors">
                <Search className="h-5 w-5" />
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <Building className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-3xl font-bold text-gray-900 mb-2">500+</h3>
              <p className="text-gray-600">Properties Listed</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <Users className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-3xl font-bold text-gray-900 mb-2">1000+</h3>
              <p className="text-gray-600">Happy Customers</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <MapPin className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-3xl font-bold text-gray-900 mb-2">15+</h3>
              <p className="text-gray-600">Prime Locations</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <Star className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-3xl font-bold text-gray-900 mb-2">4.8</h3>
              <p className="text-gray-600">Average Rating</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Featured Properties
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover handpicked premium properties in Jaipur's most sought-after locations
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {properties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
          
          <div className="text-center">
            <Link href="/properties" className="btn-primary">
              View All Properties
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Jaipur */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Invest in Jaipur?
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Building className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Growing Infrastructure</h3>
              <p className="text-gray-600">Rapid development with metro, highways, and modern amenities.</p>
            </div>
            <div className="text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Prime Locations</h3>
              <p className="text-gray-600">Strategic locations with excellent connectivity and growth potential.</p>
            </div>
            <div className="text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Cultural Heritage</h3>
              <p className="text-gray-600">Rich history and culture making it a desirable place to live.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}