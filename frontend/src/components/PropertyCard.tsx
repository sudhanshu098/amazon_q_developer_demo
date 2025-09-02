import Link from 'next/link';
import { Property } from '@/types';

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
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative h-48">
        <img 
          src={property.images[0] || 'https://picsum.photos/400/300?random=default'} 
          alt={property.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 right-2 bg-primary text-white px-2 py-1 rounded text-sm">
          {property.type.charAt(0).toUpperCase() + property.type.slice(1)}
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2 line-clamp-2">{property.title}</h3>
        <p className="text-gray-600 text-sm mb-2">📍 {property.location}</p>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{property.description}</p>
        
        <div className="flex justify-between items-center mb-3">
          <span className="text-2xl font-bold text-primary">{formatPrice(property.price)}</span>
          <span className="text-gray-500 text-sm">{property.area} sq ft</span>
        </div>
        
        {property.bedrooms > 0 && (
          <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
            <span>🛏️ {property.bedrooms} BHK</span>
            <span>🚿 {property.bathrooms} Bath</span>
          </div>
        )}
        
        <Link 
          href={`/properties/${property.id}`}
          className="block w-full bg-primary text-white text-center py-2 rounded-lg hover:bg-primary/90 transition-colors"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}