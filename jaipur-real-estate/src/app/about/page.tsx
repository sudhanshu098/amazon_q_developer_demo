import Image from 'next/image';
import { TrendingUp, Users, Award, MapPin, Building, Heart } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-pink-600 to-orange-500 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Real Estate in the Pink City
            </h1>
            <p className="text-xl max-w-3xl mx-auto">
              Discover why Jaipur is one of India's most promising real estate markets, 
              combining rich heritage with modern development opportunities.
            </p>
          </div>
        </div>
      </section>

      {/* Why Jaipur Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Invest in Jaipur?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Jaipur offers a unique blend of cultural heritage and modern infrastructure, 
              making it an ideal destination for real estate investment.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Growing Economy</h3>
              <p className="text-gray-600">
                Jaipur's economy is rapidly expanding with IT parks, manufacturing hubs, 
                and tourism driving consistent growth in property values.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Building className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Infrastructure Development</h3>
              <p className="text-gray-600">
                Metro connectivity, improved roads, and upcoming airport expansion 
                are boosting property demand across the city.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Quality of Life</h3>
              <p className="text-gray-600">
                Rich cultural heritage, excellent healthcare, educational institutions, 
                and a pleasant climate make Jaipur highly livable.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Market Overview */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Jaipur Real Estate Market Overview</h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-blue-100 p-2 rounded-full mr-4 mt-1">
                    <TrendingUp className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Steady Price Appreciation</h3>
                    <p className="text-gray-600">
                      Property prices have shown consistent growth of 8-12% annually over the past decade.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-green-100 p-2 rounded-full mr-4 mt-1">
                    <MapPin className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Prime Locations</h3>
                    <p className="text-gray-600">
                      Areas like Mansarovar, Vaishali Nagar, and Malviya Nagar offer excellent connectivity and amenities.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-purple-100 p-2 rounded-full mr-4 mt-1">
                    <Building className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Diverse Options</h3>
                    <p className="text-gray-600">
                      From affordable apartments to luxury villas, Jaipur offers properties for every budget and lifestyle.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-200 h-96 rounded-lg flex items-center justify-center">
              <div className="text-center text-gray-500">
                <Building className="h-16 w-16 mx-auto mb-4" />
                <p className="text-lg">Jaipur Skyline</p>
                <p className="text-sm">Modern development meets heritage architecture</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Areas */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Popular Residential Areas</h2>
            <p className="text-gray-600">
              Explore Jaipur's most sought-after neighborhoods for residential investment
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Mansarovar</h3>
              <p className="text-gray-600 mb-4">
                A well-planned residential area with excellent connectivity to major parts of the city. 
                Known for its wide roads, parks, and modern amenities.
              </p>
              <div className="text-sm text-blue-600 font-medium">
                Average Price: ₹4,000 - ₹8,000 per sq ft
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Vaishali Nagar</h3>
              <p className="text-gray-600 mb-4">
                Premium residential locality with upscale housing options. Close to shopping centers, 
                hospitals, and educational institutions.
              </p>
              <div className="text-sm text-blue-600 font-medium">
                Average Price: ₹6,000 - ₹12,000 per sq ft
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Malviya Nagar</h3>
              <p className="text-gray-600 mb-4">
                Established residential area with good infrastructure and connectivity. 
                Popular among families for its peaceful environment.
              </p>
              <div className="text-sm text-blue-600 font-medium">
                Average Price: ₹3,500 - ₹7,000 per sq ft
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Jagatpura</h3>
              <p className="text-gray-600 mb-4">
                Rapidly developing area with new residential projects. Great potential for 
                future appreciation with upcoming infrastructure projects.
              </p>
              <div className="text-sm text-blue-600 font-medium">
                Average Price: ₹2,500 - ₹5,000 per sq ft
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Market Statistics */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Jaipur Real Estate by Numbers</h2>
            <p className="text-blue-100">Key statistics that showcase Jaipur's real estate potential</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">3.5M+</div>
              <div className="text-blue-100">Population</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">15%</div>
              <div className="text-blue-100">Annual Growth Rate</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">₹5,500</div>
              <div className="text-blue-100">Avg. Price per sq ft</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">85%</div>
              <div className="text-blue-100">Occupancy Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Future Prospects */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Future Prospects</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Upcoming developments and infrastructure projects that will shape Jaipur's real estate future
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Building className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Metro Expansion</h3>
              <p className="text-gray-600">
                Phase 2 of Jaipur Metro will connect more areas, boosting property values along the route.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Smart City Initiative</h3>
              <p className="text-gray-600">
                Government's smart city project will enhance infrastructure and attract more investments.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">IT Hub Development</h3>
              <p className="text-gray-600">
                Growing IT sector will create employment opportunities and drive residential demand.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}