'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { getProperties } from '@/lib/storage';
import { Property } from '@/types';

export default function PropertyDetailPage() {
  const params = useParams();
  const [property, setProperty] = useState<Property | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showContactForm, setShowContactForm] = useState(false);

  useEffect(() => {
    if (params?.id) {
      const properties = getProperties();
      const found = properties.find(p => p.id === params.id);
      setProperty(found || null);
    }
  }, [params?.id]);

  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Property Not Found</h1>
          <Link href="/properties" className="text-primary hover:underline">
            Back to Properties
          </Link>
        </div>
      </div>
    );
  }

  const formatPrice = (price: number) => {
    if (price >= 10000000) {
      return `₹${(price / 10000000).toFixed(1)} Crore`;
    } else if (price >= 100000) {
      return `₹${(price / 100000).toFixed(1)} Lakh`;
    }
    return `₹${price.toLocaleString()}`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="mb-6">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-primary">Home</Link>
            <span>/</span>
            <Link href="/properties" className="hover:text-primary">Properties</Link>
            <span>/</span>
            <span className="text-gray-800">{property.title}</span>
          </div>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Image Gallery */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
              <div className="relative h-96">
                <img 
                  src={property.images[currentImageIndex] || 'https://picsum.photos/800/400?random=detail'} 
                  alt={property.title}
                  className="w-full h-full object-cover"
                />
                {property.images.length > 1 && (
                  <>
                    <button 
                      onClick={() => setCurrentImageIndex(prev => prev > 0 ? prev - 1 : property.images.length - 1)}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
                    >
                      ←
                    </button>
                    <button 
                      onClick={() => setCurrentImageIndex(prev => prev < property.images.length - 1 ? prev + 1 : 0)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
                    >
                      →
                    </button>
                  </>
                )}
              </div>
              
              {property.images.length > 1 && (
                <div className="flex space-x-2 p-4 overflow-x-auto">
                  {property.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
                        currentImageIndex === index ? 'border-primary' : 'border-gray-200'
                      }`}
                    >
                      <img src={image} alt={`View ${index + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Property Details */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-800 mb-2">{property.title}</h1>
                  <p className="text-gray-600 flex items-center">
                    📍 {property.location}
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-primary">{formatPrice(property.price)}</div>
                  <div className="text-gray-500">{property.area} sq ft</div>
                </div>
              </div>

              {property.bedrooms > 0 && (
                <div className="flex items-center space-x-6 mb-6 text-gray-600">
                  <span className="flex items-center">🛏️ {property.bedrooms} Bedrooms</span>
                  <span className="flex items-center">🚿 {property.bathrooms} Bathrooms</span>
                  <span className="flex items-center">📐 {property.area} sq ft</span>
                </div>
              )}

              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-3">Description</h2>
                <p className="text-gray-700 leading-relaxed">{property.description}</p>
              </div>

              {property.features.length > 0 && (
                <div className="mb-6">
                  <h2 className="text-xl font-semibold mb-3">Features & Amenities</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {property.features.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-2 text-gray-700">
                        <span className="text-green-500">✓</span>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Location Map Placeholder */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-3">Location</h2>
              <div className="h-64 bg-gray-200 rounded-lg flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <div className="text-4xl mb-2">🗺️</div>
                  <p>Map showing {property.location}, Jaipur</p>
                  <p className="text-sm mt-1">Interactive map would be integrated here</p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Contact Card */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">Contact Agent</h2>
              
              <div className="mb-4">
                <h3 className="font-semibold text-gray-800">{property.contact.name}</h3>
                <p className="text-gray-600 text-sm">Property Agent</p>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center space-x-3">
                  <span className="text-primary">📞</span>
                  <span className="text-gray-700">{property.contact.phone}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-primary">✉️</span>
                  <span className="text-gray-700">{property.contact.email}</span>
                </div>
              </div>

              <button 
                onClick={() => setShowContactForm(!showContactForm)}
                className="w-full bg-primary text-white py-3 rounded-lg hover:bg-primary/90 transition-colors mb-3"
              >
                Send Message
              </button>

              <a 
                href={`tel:${property.contact.phone}`}
                className="block w-full bg-green-500 text-white text-center py-3 rounded-lg hover:bg-green-600 transition-colors"
              >
                Call Now
              </a>

              {showContactForm && (
                <div className="mt-6 p-4 border rounded-lg">
                  <h3 className="font-semibold mb-3">Send a Message</h3>
                  <form className="space-y-3">
                    <input 
                      type="text" 
                      placeholder="Your Name"
                      className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <input 
                      type="email" 
                      placeholder="Your Email"
                      className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <input 
                      type="tel" 
                      placeholder="Your Phone"
                      className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <textarea 
                      placeholder="Your Message"
                      rows={3}
                      className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
                    ></textarea>
                    <button 
                      type="submit"
                      className="w-full bg-primary text-white py-2 rounded hover:bg-primary/90"
                    >
                      Send Message
                    </button>
                  </form>
                </div>
              )}
            </div>

            {/* Property Info */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Property Information</h2>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Property Type:</span>
                  <span className="font-medium capitalize">{property.type}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Area:</span>
                  <span className="font-medium">{property.area} sq ft</span>
                </div>
                {property.bedrooms > 0 && (
                  <>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Bedrooms:</span>
                      <span className="font-medium">{property.bedrooms}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Bathrooms:</span>
                      <span className="font-medium">{property.bathrooms}</span>
                    </div>
                  </>
                )}
                <div className="flex justify-between">
                  <span className="text-gray-600">Location:</span>
                  <span className="font-medium">{property.location}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Listed:</span>
                  <span className="font-medium">
                    {new Date(property.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}