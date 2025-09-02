export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-800 mb-6">Real Estate in Jaipur</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover why Jaipur, the Pink City of Rajasthan, is one of India's most promising 
            real estate markets with rich heritage, growing economy, and excellent investment opportunities.
          </p>
        </div>

        {/* Market Overview */}
        <section className="mb-16">
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Market Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">₹4,500</div>
                <div className="text-gray-600">Average Price per sq ft</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">15%</div>
                <div className="text-gray-600">Annual Growth Rate</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">3.5M</div>
                <div className="text-gray-600">Population</div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Invest in Jaipur */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Why Invest in Jaipur?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mr-4">
                  <span className="text-2xl">🏛️</span>
                </div>
                <h3 className="text-xl font-semibold">Rich Cultural Heritage</h3>
              </div>
              <p className="text-gray-600">
                UNESCO World Heritage sites including Amber Fort, City Palace, and Hawa Mahal 
                make Jaipur a major tourist destination, driving rental demand and property appreciation.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mr-4">
                  <span className="text-2xl">🚀</span>
                </div>
                <h3 className="text-xl font-semibold">Growing IT Sector</h3>
              </div>
              <p className="text-gray-600">
                Mahindra World City and other IT parks are attracting major companies, 
                creating employment opportunities and increasing housing demand.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mr-4">
                  <span className="text-2xl">🚄</span>
                </div>
                <h3 className="text-xl font-semibold">Excellent Connectivity</h3>
              </div>
              <p className="text-gray-600">
                Well-connected by air, rail, and road to Delhi and other major cities. 
                The upcoming metro rail project will further enhance connectivity.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mr-4">
                  <span className="text-2xl">💰</span>
                </div>
                <h3 className="text-xl font-semibold">Affordable Prices</h3>
              </div>
              <p className="text-gray-600">
                Compared to Delhi and Mumbai, Jaipur offers significantly lower property prices 
                with high potential for appreciation, making it ideal for first-time buyers and investors.
              </p>
            </div>
          </div>
        </section>

        {/* Popular Areas */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Popular Investment Areas</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                name: 'Mansarovar',
                description: 'Well-planned residential area with excellent infrastructure and connectivity.',
                avgPrice: '₹4,200/sq ft'
              },
              {
                name: 'Vaishali Nagar',
                description: 'Premium locality with luxury villas and modern amenities.',
                avgPrice: '₹5,800/sq ft'
              },
              {
                name: 'Malviya Nagar',
                description: 'Central location with metro connectivity and commercial hubs nearby.',
                avgPrice: '₹4,800/sq ft'
              },
              {
                name: 'Jagatpura',
                description: 'Emerging area with rapid development and affordable housing options.',
                avgPrice: '₹3,500/sq ft'
              }
            ].map((area, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold mb-2">{area.name}</h3>
                <p className="text-gray-600 text-sm mb-3">{area.description}</p>
                <div className="text-primary font-semibold">{area.avgPrice}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Investment Tips */}
        <section className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Investment Tips for Jaipur Real Estate</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4 text-primary">For First-Time Buyers</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Consider areas with upcoming metro connectivity</li>
                <li>• Look for properties near IT parks and commercial centers</li>
                <li>• Check for clear titles and approved building plans</li>
                <li>• Consider ready-to-move properties to avoid construction delays</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4 text-primary">For Investors</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Focus on rental yield potential in student and IT areas</li>
                <li>• Consider plots in developing areas for long-term appreciation</li>
                <li>• Diversify across different property types and locations</li>
                <li>• Monitor government infrastructure development plans</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}