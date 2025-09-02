'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { MapPin, Bed, Bath, Square, Phone, Mail, ArrowLeft, Star } from 'lucide-react';
import Link from 'next/link';
import { getPropertyById } from '@/lib/storage';
import { Property } from '@/types';

export default function PropertyDetailPage() {
  const params = useParams();
  const [property, setProperty] = useState<Property | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (params?.id) {
      const prop = getPropertyById(params.id as string);
      setProperty(prop);
    }
  }, [params?.id]);

  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Property Not Found</h2>
          <Link href="/properties" className="btn-primary">
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link href="/properties" className="flex items-center text-primary hover:text-primary/80 mb-6">
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Properties
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
              <div className="relative h-96">
                <img
                  src={property.images[currentImageIndex] || '/api/placeholder/800/400'}
                  alt={property.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{property.title}</h1>
                  <div className="flex items-center text-gray-600 mb-2">
                    <MapPin className="h-5 w-5 mr-2" />
                    <span className="text-lg">{property.location}, Jaipur</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-primary">{formatPrice(property.price)}</div>
                  <div className="text-gray-600">₹{Math.round(property.price / property.area)} per sq ft</div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
                {property.bedrooms > 0 && (
                  <div className="text-center">
                    <Bed className="h-8 w-8 text-primary mx-auto mb-2" />
                    <div className="text-2xl font-bold text-gray-900">{property.bedrooms}</div>
                    <div className="text-gray-600">Bedrooms</div>
                  </div>
                )}
                {property.bathrooms > 0 && (
                  <div className="text-center">
                    <Bath className="h-8 w-8 text-primary mx-auto mb-2" />
                    <div className="text-2xl font-bold text-gray-900">{property.bathrooms}</div>
                    <div className="text-gray-600">Bathrooms</div>
                  </div>
                )}
                <div className="text-center">
                  <Square className="h-8 w-8 text-primary mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">{property.area}</div>
                  <div className="text-gray-600">Sq Ft</div>
                </div>
              </div>

              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-3">Description</h2>
                <p className="text-gray-600 leading-relaxed">{property.description}</p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">Features & Amenities</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {property.features.map((feature, index) => (
                    <div key={index} className="flex items-center">
                      <Star className="h-4 w-4 text-primary mr-2" />
                      <span className="text-gray-600">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Contact Agent</h2>
              
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-3 flex items-center justify-center">
                  <span className="text-2xl font-bold text-gray-600">
                    {property.contact.name.charAt(0)}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900">{property.contact.name}</h3>
                <p className="text-gray-600">Property Agent</p>
              </div>

              <div className="space-y-4 mb-6">
                <a
                  href={`tel:${property.contact.phone}`}
                  className="flex items-center justify-center space-x-2 btn-primary w-full"
                >
                  <Phone className="h-5 w-5" />
                  <span>Call Now</span>
                </a>
                
                <a
                  href={`mailto:${property.contact.email}`}
                  className="flex items-center justify-center space-x-2 btn-secondary w-full"
                >
                  <Mail className="h-5 w-5" />
                  <span>Send Email</span>
                </a>
              </div>

              <div className="border-t pt-4">
                <div className="text-sm text-gray-600 space-y-2">
                  <div className="flex items-center">
                    <Phone className="h-4 w-4 mr-2" />
                    <span>{property.contact.phone}</span>
                  </div>
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 mr-2" />
                    <span>{property.contact.email}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}