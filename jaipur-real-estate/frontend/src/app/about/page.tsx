import { Building, TrendingUp, Users, Award, MapPin, Star } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-secondary text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">About Jaipur Real Estate</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto">
            Discover why Jaipur is emerging as one of India's most promising real estate destinations
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Market Overview */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Market Overview</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Jaipur's real estate market has shown consistent growth with excellent investment opportunities
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <TrendingUp className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-2">15%</h3>
              <p className="text-gray-600">Annual Growth Rate</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <Building className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-2">₹4,500</h3>
              <p className="text-gray-600">Average Price per sq ft</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <Users className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-2">3.5M+</h3>
              <p className="text-gray-600">Population</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <Award className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-2">#3</h3>
              <p className="text-gray-600">Fastest Growing City</p>
            </div>
          </div>
        </section>

        {/* Why Jaipur */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Invest in Jaipur?</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="space-y-8">
                <div className="flex items-start space-x-4">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <Building className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Rapid Infrastructure Development</h3>
                    <p className="text-gray-600">Metro connectivity, ring roads, and modern amenities are transforming the city's landscape.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <TrendingUp className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Strong Economic Growth</h3>
                    <p className="text-gray-600">IT hubs, manufacturing sectors, and tourism industry driving economic expansion.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Strategic Location</h3>
                    <p className="text-gray-600">Close proximity to Delhi NCR with excellent connectivity via highways and railways.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <Star className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Cultural Heritage</h3>
                    <p className="text-gray-600">Rich history, vibrant culture, and UNESCO World Heritage sites attract global attention.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Key Investment Areas</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                  <span className="font-semibold">Mansarovar</span>
                  <span className="text-primary font-bold">₹4,200/sq ft</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                  <span className="font-semibold">Vaishali Nagar</span>
                  <span className="text-primary font-bold">₹5,800/sq ft</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                  <span className="font-semibold">Malviya Nagar</span>
                  <span className="text-primary font-bold">₹3,500/sq ft</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                  <span className="font-semibold">Jagatpura</span>
                  <span className="text-primary font-bold">₹2,800/sq ft</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Future Prospects */}
        <section className="bg-white rounded-lg shadow-md p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Future Prospects</h2>
            <p className="text-xl text-gray-600">Upcoming developments that will shape Jaipur's real estate landscape</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Building className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Metro Phase 2</h3>
              <p className="text-gray-600">Extended metro connectivity to major residential and commercial areas.</p>
            </div>

            <div className="text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Smart City Initiative</h3>
              <p className="text-gray-600">Digital infrastructure and smart governance improving quality of life.</p>
            </div>

            <div className="text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">IT Parks Expansion</h3>
              <p className="text-gray-600">New IT parks and business districts creating employment opportunities.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}