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
    <div className="bg-white rounded-2xl shadow-soft overflow-hidden hover:shadow-large transition-all duration-300 hover:-translate-y-2 border border-neutral-200/50 group">
      <div className="relative h-56 overflow-hidden">
        <img 
          src={property.images[0] || 'https://picsum.photos/400/300?random=default'} 
          alt={property.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
        <div className="absolute top-4 right-4 bg-gradient-primary text-white px-3 py-1.5 rounded-lg text-sm font-medium shadow-medium">
          {property.type.charAt(0).toUpperCase() + property.type.slice(1)}
        </div>
        <div className="absolute bottom-4 left-4 right-4">
          <div className="bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2">
            <p className="text-neutral-700 text-sm font-medium flex items-center">
              <span className="text-primary-600 mr-2">📍</span>
              {property.location}
            </p>
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold mb-3 text-neutral-800 line-clamp-2 group-hover:text-primary-600 transition-colors duration-200">
          {property.title}
        </h3>
        <p className="text-neutral-600 text-sm mb-4 line-clamp-2 leading-relaxed">
          {property.description}
        </p>
        
        <div className="flex justify-between items-center mb-4">
          <span className="text-2xl font-bold gradient-text">{formatPrice(property.price)}</span>
          <div className="bg-neutral-100 px-3 py-1 rounded-lg">
            <span className="text-neutral-600 text-sm font-medium">{property.area} sq ft</span>
          </div>
        </div>
        
        {property.bedrooms > 0 && (
          <div className="flex items-center space-x-6 text-sm text-neutral-600 mb-6">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center">
                <span className="text-primary-600">🛏️</span>
              </div>
              <span className="font-medium">{property.bedrooms} BHK</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-secondary-100 rounded-lg flex items-center justify-center">
                <span className="text-secondary-600">🚿</span>
              </div>
              <span className="font-medium">{property.bathrooms} Bath</span>
            </div>
          </div>
        )}
        
        <Link 
          href={`/properties/${property.id}`}
          className="block w-full bg-gradient-primary text-white text-center py-3 rounded-xl hover:shadow-large transition-all duration-200 font-semibold transform hover:scale-105 focus:scale-105 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}