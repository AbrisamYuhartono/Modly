import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Palette, Shirt as Tshirt, MessageSquare, ShoppingBag } from 'lucide-react';

const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-purple-600 to-pink-500 py-20 px-4 sm:px-6 lg:px-8 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="font-serif text-4xl md:text-5xl font-bold mb-6 leading-tight">
                Fashion That Truly <span className="underline decoration-4 decoration-yellow-300">Fits You</span>
              </h1>
              <p className="text-lg md:text-xl mb-8 max-w-md">
                AI-powered fashion recommendations tailored to your skin tone, body shape, and personal style.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Link to="/profile" className="inline-block px-6 py-3 bg-white text-purple-600 font-medium rounded-lg shadow-md hover:bg-gray-100 transition-colors duration-200 text-center">
                  Get Started
                </Link>
                <Link to="/marketplace" className="inline-block px-6 py-3 bg-transparent border-2 border-white text-white font-medium rounded-lg hover:bg-white hover:text-purple-600 transition-colors duration-200 text-center">
                  Explore Marketplace
                </Link>
              </div>
            </div>
            <div className="md:w-1/2 relative animate-fadeIn">
              <div className="relative md:absolute md:top-0 md:right-0 w-full max-w-md mx-auto rounded-lg overflow-hidden shadow-2xl">
                <img 
                  src="https://images.pexels.com/photos/1037994/pexels-photo-1037994.jpeg" 
                  alt="Fashion model" 
                  className="w-full h-auto rounded-lg"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-purple-900/50 to-transparent"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 w-full overflow-hidden">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 1200 120" 
            preserveAspectRatio="none"
            className="w-full h-16 md:h-24 text-white dark:text-gray-900 fill-current"
          >
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
          </svg>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900 transition-colors duration-300">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-bold text-gray-900 dark:text-white mb-4">How Modly Works</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Our AI-powered platform personalizes fashion recommendations based on your unique characteristics and preferences.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-md transition-transform duration-300 hover:transform hover:scale-105">
              <div className="bg-purple-100 dark:bg-purple-900 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <Palette className="text-purple-600 dark:text-purple-300" size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Color Analysis</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Discover colors that complement your skin tone and enhance your natural beauty.
              </p>
              <Link to="/profile" className="text-purple-600 dark:text-purple-400 font-medium flex items-center hover:text-purple-700 dark:hover:text-purple-300 transition-colors duration-200">
                Try it now <ChevronRight size={16} className="ml-1" />
              </Link>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-md transition-transform duration-300 hover:transform hover:scale-105">
              <div className="bg-purple-100 dark:bg-purple-900 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <Tshirt className="text-purple-600 dark:text-purple-300" size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Virtual Closet</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Organize your wardrobe digitally and get outfit recommendations from your own clothes.
              </p>
              <Link to="/closet" className="text-purple-600 dark:text-purple-400 font-medium flex items-center hover:text-purple-700 dark:hover:text-purple-300 transition-colors duration-200">
                Create closet <ChevronRight size={16} className="ml-1" />
              </Link>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-md transition-transform duration-300 hover:transform hover:scale-105">
              <div className="bg-purple-100 dark:bg-purple-900 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <MessageSquare className="text-purple-600 dark:text-purple-300" size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Style Chat</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Get personalized fashion advice from our AI stylist for any occasion or question.
              </p>
              <Link to="/stylechat" className="text-purple-600 dark:text-purple-400 font-medium flex items-center hover:text-purple-700 dark:hover:text-purple-300 transition-colors duration-200">
                Chat now <ChevronRight size={16} className="ml-1" />
              </Link>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-md transition-transform duration-300 hover:transform hover:scale-105">
              <div className="bg-purple-100 dark:bg-purple-900 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <ShoppingBag className="text-purple-600 dark:text-purple-300" size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Preloved Market</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Buy and sell pre-loved fashion items that match your style preferences.
              </p>
              <Link to="/marketplace" className="text-purple-600 dark:text-purple-400 font-medium flex items-center hover:text-purple-700 dark:hover:text-purple-300 transition-colors duration-200">
                Browse items <ChevronRight size={16} className="ml-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-bold text-gray-900 dark:text-white mb-4">What Our Users Say</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <img 
                  src="https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg" 
                  alt="User" 
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white">Sarah J.</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Student</p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                "Modly helped me discover my seasonal color palette. Now I shop with confidence knowing what colors truly flatter me!"
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <img 
                  src="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg" 
                  alt="User" 
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white">Aisha K.</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Fashion Blogger</p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                "As a hijabi fashion enthusiast, I love how Modly recommends stylish modest outfits that work perfectly with my preferences."
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <img 
                  src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg" 
                  alt="User" 
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white">David T.</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Marketing Professional</p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                "The virtual closet feature saved me time and money. I can plan outfits for the week in minutes, and I haven't bought a 'mistake' purchase since!"
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-purple-600 to-pink-500 text-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-serif font-bold mb-6">Ready to Transform Your Wardrobe?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of fashion-conscious individuals who've discovered their personal style with Modly.
          </p>
          <Link to="/profile" className="inline-block px-8 py-4 bg-white text-purple-600 font-medium rounded-lg shadow-md hover:bg-gray-100 transition-colors duration-200">
            Get Started For Free
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;