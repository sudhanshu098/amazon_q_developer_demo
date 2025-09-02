import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">JR</span>
              </div>
              <span className="text-xl font-bold">Jaipur Realty</span>
            </div>
            <p className="text-gray-300">
              Your trusted partner in finding the perfect property in the Pink City of Jaipur.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <div className="space-y-2">
              <Link href="/" className="block text-gray-300 hover:text-white">Home</Link>
              <Link href="/properties" className="block text-gray-300 hover:text-white">Properties</Link>
              <Link href="/about" className="block text-gray-300 hover:text-white">About Jaipur</Link>
              <Link href="/contact" className="block text-gray-300 hover:text-white">Contact</Link>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Popular Areas</h3>
            <div className="space-y-2">
              <span className="block text-gray-300">Mansarovar</span>
              <span className="block text-gray-300">Vaishali Nagar</span>
              <span className="block text-gray-300">Malviya Nagar</span>
              <span className="block text-gray-300">Jagatpura</span>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <div className="space-y-2 text-gray-300">
              <p>📍 Jaipur, Rajasthan, India</p>
              <p>📞 +91-9876543210</p>
              <p>✉️ info@jaipurrealty.com</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
          <p>&copy; 2024 Jaipur Realty. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}