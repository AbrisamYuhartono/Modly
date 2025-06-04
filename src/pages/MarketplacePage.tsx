import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { MarketplaceItem, ClothingCategory } from '../types';
import { Search, Filter, ShoppingBag, Star, Heart, Plus, ChevronDown, ChevronUp } from 'lucide-react';

const MarketplacePage: React.FC = () => {
  const { marketplace } = useAppContext();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ClothingCategory | 'all'>('all');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100]);
  const [sortBy, setSortBy] = useState<'newest' | 'price-low' | 'price-high' | 'popular'>('newest');
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [wishlist, setWishlist] = useState<string[]>([]);

  const categories: { value: ClothingCategory | 'all'; label: string }[] = [
    { value: 'all', label: 'All Categories' },
    { value: 'tops', label: 'Tops' },
    { value: 'bottoms', label: 'Bottoms' },
    { value: 'dresses', label: 'Dresses' },
    { value: 'outerwear', label: 'Outerwear' },
    { value: 'shoes', label: 'Shoes' },
    { value: 'accessories', label: 'Accessories' },
    { value: 'hijab', label: 'Hijabs' },
  ];

  const conditions = [
    { value: 'new', label: 'New with tags' },
    { value: 'like new', label: 'Like new' },
    { value: 'good', label: 'Good' },
    { value: 'fair', label: 'Fair' },
  ];

  const toggleWishlist = (id: string) => {
    if (wishlist.includes(id)) {
      setWishlist(wishlist.filter(itemId => itemId !== id));
    } else {
      setWishlist([...wishlist, id]);
    }
  };

  const filteredItems = marketplace.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesPrice = item.price >= priceRange[0] && item.price <= priceRange[1];
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesCategory && matchesPrice && matchesSearch;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'popular':
        return b.sellerRating - a.sellerRating;
      case 'newest':
      default:
        return new Date(b.listedDate).getTime() - new Date(a.listedDate).getTime();
    }
  });

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newValue = parseInt(e.target.value);
    const newRange = [...priceRange] as [number, number];
    newRange[index] = newValue;
    
    // Ensure min <= max
    if (index === 0 && newValue > newRange[1]) {
      newRange[1] = newValue;
    } else if (index === 1 && newValue < newRange[0]) {
      newRange[0] = newValue;
    }
    
    setPriceRange(newRange);
  };

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-serif font-bold text-gray-900 dark:text-white mb-2">Style Marketplace</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Discover and shop preloved fashion items that match your style
          </p>
        </div>
        <button className="mt-4 md:mt-0 px-4 py-2 bg-purple-600 text-white rounded-md shadow-sm hover:bg-purple-700 flex items-center transition-colors duration-200">
          <Plus size={20} className="mr-2" /> List an Item
        </button>
      </div>
      
      {/* Search and Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-6">
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mb-4">
          <div className="flex-1">
            <div className="relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={18} className="text-gray-400" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search marketplace"
                className="block w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:text-white"
              />
            </div>
          </div>
          
          <div className="w-full md:w-1/4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Filter size={18} className="text-gray-400" />
              </div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value as any)}
                className="block w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:text-white appearance-none"
              >
                {categories.map((category) => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="w-full md:w-1/4">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="block w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:text-white appearance-none"
            >
              <option value="newest">Newest First</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="popular">Most Popular</option>
            </select>
          </div>
        </div>
        
        <button
          onClick={() => setFiltersOpen(!filtersOpen)}
          className="flex items-center text-sm text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300 focus:outline-none transition-colors duration-200"
        >
          {filtersOpen ? (
            <>
              <ChevronUp size={16} className="mr-1" /> Hide advanced filters
            </>
          ) : (
            <>
              <ChevronDown size={16} className="mr-1" /> Show advanced filters
            </>
          )}
        </button>
        
        {filtersOpen && (
          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Price Range (${priceRange[0]} - ${priceRange[1]})
              </label>
              <div className="flex items-center space-x-4">
                <input
                  type="range"
                  min="0"
                  max="200"
                  value={priceRange[0]}
                  onChange={(e) => handlePriceChange(e, 0)}
                  className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
                />
                <input
                  type="range"
                  min="0"
                  max="200"
                  value={priceRange[1]}
                  onChange={(e) => handlePriceChange(e, 1)}
                  className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Condition
              </label>
              <div className="space-y-2">
                {conditions.map((condition) => (
                  <div key={condition.value} className="flex items-center">
                    <input
                      id={`condition-${condition.value}`}
                      type="checkbox"
                      className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                    />
                    <label htmlFor={`condition-${condition.value}`} className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                      {condition.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Size
              </label>
              <div className="grid grid-cols-4 gap-2">
                {['XS', 'S', 'M', 'L', 'XL', 'XXL', '1X', '2X'].map((size) => (
                  <button
                    key={size}
                    className="px-2 py-1 border border-gray-300 dark:border-gray-600 rounded text-sm text-gray-700 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-purple-900/30 hover:border-purple-500 transition-colors duration-200"
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Items Grid */}
      {filteredItems.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <div 
              key={item.id} 
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200"
            >
              <div className="relative h-64 bg-gray-200 dark:bg-gray-700">
                <img 
                  src={item.images[0]} 
                  alt={item.name} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2 flex space-x-2">
                  <button
                    onClick={() => toggleWishlist(item.id)}
                    className="p-1.5 bg-white dark:bg-gray-800 rounded-full shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                  >
                    <Heart 
                      size={20} 
                      className={`${wishlist.includes(item.id) ? 'fill-red-500 text-red-500' : 'text-gray-400'}`}
                    />
                  </button>
                </div>
                <div className="absolute bottom-2 left-2 bg-purple-600 text-white text-xs px-2 py-1 rounded-full">
                  {item.condition}
                </div>
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-medium text-gray-900 dark:text-white">{item.name}</h3>
                  <span className="font-bold text-gray-900 dark:text-white">${item.price}</span>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2 line-clamp-2">
                  {item.description}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm">
                    <div className="flex items-center text-yellow-400 mr-1">
                      <Star size={14} className="fill-yellow-400" />
                      <span className="ml-1 text-gray-700 dark:text-gray-300">{item.sellerRating}</span>
                    </div>
                    <span className="text-gray-500 dark:text-gray-400 text-xs">• {item.sellerName}</span>
                  </div>
                  <button className="text-purple-600 dark:text-purple-400 text-sm font-medium hover:text-purple-800 dark:hover:text-purple-300 transition-colors duration-200">
                    View
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 text-center">
          <ShoppingBag size={48} className="mx-auto text-gray-400 mb-4" />
          <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">No items found</h3>
          <p className="text-gray-500 dark:text-gray-400 mb-4">
            Try adjusting your filters or search for something else.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
              setPriceRange([0, 100]);
            }}
            className="px-4 py-2 bg-purple-600 text-white rounded-md shadow-sm hover:bg-purple-700 inline-flex items-center transition-colors duration-200"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default MarketplacePage;