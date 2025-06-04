import React from 'react';
import { Instagram, Twitter, Facebook, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-gray-800 shadow-inner pt-8 pb-6 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <h3 className="text-xl font-serif font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
              Modly
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Personalized fashion recommendations powered by AI. Find your perfect style match today.
            </p>
            <div className="flex mt-4 space-x-4">
              <a href="#" className="text-gray-500 hover:text-purple-600 dark:text-gray-400 dark:hover:text-purple-400 transition-colors duration-200">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-purple-600 dark:text-gray-400 dark:hover:text-purple-400 transition-colors duration-200">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-purple-600 dark:text-gray-400 dark:hover:text-purple-400 transition-colors duration-200">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-purple-600 dark:text-gray-400 dark:hover:text-purple-400 transition-colors duration-200">
                <Mail size={20} />
              </a>
            </div>
          </div>
          
          <div className="w-1/2 md:w-1/4 mb-6 md:mb-0">
            <h5 className="text-gray-900 dark:text-gray-100 font-medium mb-4">Features</h5>
            <ul className="text-gray-600 dark:text-gray-400 text-sm space-y-2">
              <li><a href="#" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-200">Personal Style</a></li>
              <li><a href="#" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-200">Virtual Closet</a></li>
              <li><a href="#" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-200">AI Recommendations</a></li>
              <li><a href="#" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-200">Style Community</a></li>
            </ul>
          </div>
          
          <div className="w-1/2 md:w-1/4 mb-6 md:mb-0">
            <h5 className="text-gray-900 dark:text-gray-100 font-medium mb-4">Support</h5>
            <ul className="text-gray-600 dark:text-gray-400 text-sm space-y-2">
              <li><a href="#" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-200">Help Center</a></li>
              <li><a href="#" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-200">Contact Us</a></li>
              <li><a href="#" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-200">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-200">Terms of Service</a></li>
            </ul>
          </div>
          
          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <h5 className="text-gray-900 dark:text-gray-100 font-medium mb-4">Stay Updated</h5>
            <div className="flex flex-col sm:flex-row">
              <input 
                type="email" 
                placeholder="Your email" 
                className="px-4 py-2 rounded-md dark:bg-gray-700 text-sm border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-purple-500 focus:border-transparent mb-2 sm:mb-0 sm:mr-2"
              />
              <button className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-md text-sm hover:from-purple-700 hover:to-pink-600 transition-all duration-200">
                Subscribe
              </button>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-200 dark:border-gray-700 mt-8 pt-6">
          <p className="text-center text-gray-500 dark:text-gray-400 text-xs">
            © {new Date().getFullYear()} Modly. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;