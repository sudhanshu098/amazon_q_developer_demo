import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-neutral-900 text-white relative overflow-hidden">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-900/20 via-transparent to-secondary-900/20"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div className="md:col-span-1">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center shadow-large">
                <span className="text-white font-bold text-xl">JR</span>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold gradient-text">Jaipur Realty</span>
                <span className="text-sm text-neutral-400 font-medium">Pink City Properties</span>
              </div>
            </div>
            <p className="text-neutral-300 leading-relaxed mb-6">
              Your trusted partner in finding the perfect property in the Pink City of Jaipur. 
              We bring you closer to your dream home with expert guidance and premium service.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-neutral-800 rounded-lg flex items-center justify-center hover:bg-primary-600 transition-colors duration-200">
                <span className="text-sm">📘</span>
              </a>
              <a href="#" className="w-10 h-10 bg-neutral-800 rounded-lg flex items-center justify-center hover:bg-primary-600 transition-colors duration-200">
                <span className="text-sm">📷</span>
              </a>
              <a href="#" className="w-10 h-10 bg-neutral-800 rounded-lg flex items-center justify-center hover:bg-primary-600 transition-colors duration-200">
                <span className="text-sm">🐦</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-white">Quick Links</h3>
            <div className="space-y-3">
              <Link href="/" className="block text-neutral-300 hover:text-primary-400 transition-colors duration-200 hover:translate-x-1 transform">
                Home
              </Link>
              <Link href="/properties" className="block text-neutral-300 hover:text-primary-400 transition-colors duration-200 hover:translate-x-1 transform">
                Properties
              </Link>
              <Link href="/about" className="block text-neutral-300 hover:text-primary-400 transition-colors duration-200 hover:translate-x-1 transform">
                About Jaipur
              </Link>
              <Link href="/contact" className="block text-neutral-300 hover:text-primary-400 transition-colors duration-200 hover:translate-x-1 transform">
                Contact
              </Link>
            </div>
          </div>

          {/* Popular Areas */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-white">Popular Areas</h3>
            <div className="space-y-3">
              <Link href="/properties?location=Mansarovar" className="block text-neutral-300 hover:text-secondary-400 transition-colors duration-200 hover:translate-x-1 transform">
                Mansarovar
              </Link>
              <Link href="/properties?location=Vaishali Nagar" className="block text-neutral-300 hover:text-secondary-400 transition-colors duration-200 hover:translate-x-1 transform">
                Vaishali Nagar
              </Link>
              <Link href="/properties?location=Malviya Nagar" className="block text-neutral-300 hover:text-secondary-400 transition-colors duration-200 hover:translate-x-1 transform">
                Malviya Nagar
              </Link>
              <Link href="/properties?location=Jagatpura" className="block text-neutral-300 hover:text-secondary-400 transition-colors duration-200 hover:translate-x-1 transform">
                Jagatpura
              </Link>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-white">Contact Info</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-sm">📍</span>
                </div>
                <div>
                  <p className="text-neutral-300 leading-relaxed">
                    Jaipur, Rajasthan, India<br />
                    Pink City - 302001
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-secondary rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-sm">📞</span>
                </div>
                <p className="text-neutral-300">+91-9876543210</p>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-accent rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-sm">✉️</span>
                </div>
                <p className="text-neutral-300">info@jaipurrealty.com</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-neutral-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-neutral-400 text-center md:text-left">
              &copy; 2024 Jaipur Realty. All rights reserved. Made with ❤️ in the Pink City.
            </p>
            <div className="flex space-x-6 text-sm">
              <Link href="/privacy" className="text-neutral-400 hover:text-primary-400 transition-colors duration-200">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-neutral-400 hover:text-primary-400 transition-colors duration-200">
                Terms of Service
              </Link>
              <Link href="/sitemap" className="text-neutral-400 hover:text-primary-400 transition-colors duration-200">
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}