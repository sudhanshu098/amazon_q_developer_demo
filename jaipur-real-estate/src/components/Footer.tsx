import Link from 'next/link';
import { Home, Phone, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Home className="h-8 w-8 text-blue-400" />
              <span className="text-xl font-bold">Jaipur Realty</span>
            </div>
            <p className="text-gray-300 mb-4">
              Your trusted partner in finding the perfect property in the Pink City. 
              We specialize in residential and commercial real estate across Jaipur.
            </p>
            <div className="flex items-center space-x-2 text-gray-300">
              <MapPin className="h-5 w-5" />
              <span>Jaipur, Rajasthan, India</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-300 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/properties" className="text-gray-300 hover:text-white transition-colors">
                  Properties
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-300 hover:text-white transition-colors">
                  About Jaipur
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2 text-gray-300">
                <Phone className="h-4 w-4" />
                <span>+91 141-1234567</span>
              </li>
              <li className="flex items-center space-x-2 text-gray-300">
                <Mail className="h-4 w-4" />
                <span>info@jaipurrealty.com</span>
              </li>
            </ul>
            
            <div className="mt-6">
              <h4 className="font-semibold mb-2">Popular Areas</h4>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>Mansarovar</li>
                <li>Vaishali Nagar</li>
                <li>Malviya Nagar</li>
                <li>Jagatpura</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-300">
          <p>&copy; 2024 Jaipur Realty. All rights reserved. Built for demonstration purposes.</p>
        </div>
      </div>
    </footer>
  );
}