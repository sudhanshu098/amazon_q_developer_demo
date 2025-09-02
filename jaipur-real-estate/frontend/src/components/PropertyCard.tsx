import Link from 'next/link';
import { Property } from '@/types';
import { MapPin, Bed, Bath, Square } from 'lucide-react';

interface PropertyCardProps {
  property: Property;
}

export default function PropertyCard({ property }: PropertyCardProps) {
  const formatPrice = (price: number) => {
    if (price >= 10000000) {
      return `₹${(price / 10000000).toFixed(1)} Cr`;
    } else if (price >= 100000) {
      return `₹${(price / 100000).toFixed(1)} L`;
    }
    return `₹${price.toLocaleString()}`;
  };

  return (
    <div className="card overflow-hidden">
      <div className="relative h-48 bg-gray-200">
        <img 
          src={property.images[0] || '/api/placeholder/400/300'} 
          alt={property.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 right-2 bg-primary text-white px-2 py-1 rounded text-sm font-semibold">
          {formatPrice(property.price)}
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2 line-clamp-2">{property.title}</h3>
        
        <div className="flex items-center text-gray-600 mb-2">
          <MapPin className="h-4 w-4 mr-1" />
          <span className="text-sm">{property.location}</span>
        </div>
        
        <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
          {property.bedrooms > 0 && (
            <div className="flex items-center">
              <Bed className="h-4 w-4 mr-1" />
              <span>{property.bedrooms} Bed</span>
            </div>
          )}
          {property.bathrooms > 0 && (
            <div className="flex items-center">
              <Bath className="h-4 w-4 mr-1" />
              <span>{property.bathrooms} Bath</span>
            </div>
          )}
          <div className="flex items-center">
            <Square className="h-4 w-4 mr-1" />
            <span>{property.area} sq ft</span>
          </div>
        </div>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{property.description}</p>
        
        <Link href={`/property/${property.id}`} className="btn-primary w-full text-center block">
          View Details
        </Link>
      </div>
    </div>
  );
}