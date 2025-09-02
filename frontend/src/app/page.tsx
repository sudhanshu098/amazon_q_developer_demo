'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import PropertyCard from '@/components/PropertyCard';
import { getProperties } from '@/lib/storage';
import { Property } from '@/types';

export default function Home() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    setProperties(getProperties().slice(0, 6)); // Show only first 6 properties
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
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Find Your Dream Home in Jaipur
          </h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Discover the best properties in the Pink City. From luxury villas to affordable apartments, 
            we have something for everyone.
          </p>
          
          <form onSubmit={handleSearch} className="max-w-md mx-auto">
            <div className="flex">
              <input
                type="text"
                placeholder="Search by location, property type..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 px-4 py-3 rounded-l-lg text-gray-800 focus:outline-none"
              />
              <button 
                type="submit"
                className="bg-gray-800 text-white px-6 py-3 rounded-r-lg hover:bg-gray-700"
              >
                Search
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Featured Properties</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore our handpicked selection of premium properties in Jaipur's most sought-after locations.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {properties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
          
          <div className="text-center">
            <Link 
              href="/properties"
              className="inline-block bg-primary text-white px-8 py-3 rounded-lg hover:bg-primary/90 transition-colors"
            >
              View All Properties
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Jaipur */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Why Invest in Jaipur?</h2>
            <p className="text-gray-600">The Pink City offers incredible opportunities for property investment</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🏛️</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Rich Heritage</h3>
              <p className="text-gray-600">UNESCO World Heritage sites and royal palaces make Jaipur a cultural hub</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🚀</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Growing Economy</h3>
              <p className="text-gray-600">Rapid industrial growth and IT sector development driving property demand</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🌟</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Quality of Life</h3>
              <p className="text-gray-600">Perfect blend of modern amenities and traditional charm</p>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Locations */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Popular Locations</h2>
            <p className="text-gray-600">Explore properties in Jaipur's most desirable neighborhoods</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['Mansarovar', 'Vaishali Nagar', 'Malviya Nagar', 'Jagatpura'].map((location) => (
              <Link 
                key={location}
                href={`/properties?location=${location}`}
                className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow"
              >
                <h3 className="font-semibold text-gray-800">{location}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}