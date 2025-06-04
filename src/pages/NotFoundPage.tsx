import React from 'react';
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-purple-600 dark:text-purple-400">404</h1>
        <h2 className="mt-4 text-3xl font-serif font-bold text-gray-900 dark:text-white">Page not found</h2>
        <p className="mt-6 text-gray-600 dark:text-gray-400 max-w-md mx-auto">
          Sorry, we couldn't find the page you're looking for. Perhaps you've mistyped the URL or the page has been moved.
        </p>
        <div className="mt-10">
          <Link 
            to="/" 
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors duration-200"
          >
            <Home className="mr-2" size={20} />
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;