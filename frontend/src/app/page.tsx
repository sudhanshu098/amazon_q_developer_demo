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
      <section className="relative bg-gradient-hero text-white py-24 overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
            Find Your Dream Home in{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-neutral-200">
              Jaipur
            </span>
          </h1>
          <p className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto leading-relaxed text-white/90">
            Discover the best properties in the Pink City. From luxury villas to affordable apartments, 
            we have something for everyone in Rajasthan's royal capital.
          </p>
          
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-0">
              <input
                type="text"
                placeholder="Search by location, property type, or price range..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 px-6 py-4 rounded-xl sm:rounded-r-none text-neutral-800 placeholder-neutral-500 focus:outline-none focus:ring-4 focus:ring-white/30 shadow-large text-lg"
              />
              <button 
                type="submit"
                className="bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-xl sm:rounded-l-none hover:bg-white/30 transition-all duration-200 font-semibold text-lg shadow-large hover:shadow-xl border border-white/20"
              >
                Search Properties
              </button>
            </div>
          </form>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-white/80">Properties Listed</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">50+</div>
              <div className="text-white/80">Areas Covered</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">1000+</div>
              <div className="text-white/80">Happy Customers</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-20 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-neutral-800 mb-6">
              Featured <span className="gradient-text">Properties</span>
            </h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto leading-relaxed">
              Explore our handpicked selection of premium properties in Jaipur's most sought-after locations.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {properties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
          
          <div className="text-center">
            <Link 
              href="/properties"
              className="inline-flex items-center bg-gradient-primary text-white px-8 py-4 rounded-xl hover:shadow-large transition-all duration-200 transform hover:scale-105 font-semibold text-lg"
            >
              View All Properties
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Jaipur */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-neutral-800 mb-6">
              Why Invest in <span className="gradient-text">Jaipur?</span>
            </h2>
            <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
              The Pink City offers incredible opportunities for property investment with its rich heritage and growing economy
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-medium group-hover:shadow-large transition-all duration-300 group-hover:scale-110">
                <span className="text-3xl">🏛️</span>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-neutral-800">Rich Heritage</h3>
              <p className="text-neutral-600 leading-relaxed">
                UNESCO World Heritage sites and royal palaces make Jaipur a cultural hub with timeless appeal
              </p>
            </div>
            
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-secondary rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-medium group-hover:shadow-large transition-all duration-300 group-hover:scale-110">
                <span className="text-3xl">🚀</span>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-neutral-800">Growing Economy</h3>
              <p className="text-neutral-600 leading-relaxed">
                Rapid industrial growth and IT sector development driving property demand and value appreciation
              </p>
            </div>
            
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-accent rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-medium group-hover:shadow-large transition-all duration-300 group-hover:scale-110">
                <span className="text-3xl">🌟</span>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-neutral-800">Quality of Life</h3>
              <p className="text-neutral-600 leading-relaxed">
                Perfect blend of modern amenities and traditional charm offering exceptional living standards
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Locations */}
      <section className="py-20 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-neutral-800 mb-6">
              Popular <span className="gradient-text">Locations</span>
            </h2>
            <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
              Explore properties in Jaipur's most desirable neighborhoods with excellent connectivity and amenities
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {['Mansarovar', 'Vaishali Nagar', 'Malviya Nagar', 'Jagatpura'].map((location) => (
              <Link 
                key={location}
                href={`/properties?location=${location}`}
                className="group bg-white p-8 rounded-2xl shadow-soft hover:shadow-large transition-all duration-300 text-center hover:-translate-y-2 border border-neutral-200/50"
              >
                <div className="w-16 h-16 bg-gradient-primary rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl">📍</span>
                </div>
                <h3 className="text-xl font-bold text-neutral-800 mb-2">{location}</h3>
                <p className="text-neutral-600 text-sm">Premium Properties Available</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}