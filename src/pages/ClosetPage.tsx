import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { ClothingItem, ClothingCategory } from '../types';
import { Plus, Filter, Search, Heart, X, Upload } from 'lucide-react';

const ClosetPage: React.FC = () => {
  const { clothes, addClothingItem, removeClothingItem } = useAppContext();
  const [showAddModal, setShowAddModal] = useState(false);
  const [filterCategory, setFilterCategory] = useState<ClothingCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  
  const [newItem, setNewItem] = useState<Partial<ClothingItem>>({
    name: '',
    category: 'tops',
    color: '',
    season: [],
    image: '',
    favorite: false,
  });

  const categories: { value: ClothingCategory; label: string }[] = [
    { value: 'tops', label: 'Tops' },
    { value: 'bottoms', label: 'Bottoms' },
    { value: 'dresses', label: 'Dresses' },
    { value: 'outerwear', label: 'Outerwear' },
    { value: 'shoes', label: 'Shoes' },
    { value: 'accessories', label: 'Accessories' },
    { value: 'hijab', label: 'Hijabs' },
  ];

  const seasons = [
    { value: 'spring', label: 'Spring' },
    { value: 'summer', label: 'Summer' },
    { value: 'fall', label: 'Fall' },
    { value: 'winter', label: 'Winter' },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewItem({ ...newItem, [name]: value });
  };

  const handleSeasonToggle = (season: string) => {
    const currentSeasons = newItem.season || [];
    
    if (currentSeasons.includes(season as any)) {
      setNewItem({
        ...newItem,
        season: currentSeasons.filter(s => s !== season),
      });
    } else {
      setNewItem({
        ...newItem,
        season: [...currentSeasons, season],
      });
    }
  };

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newItem.name || !newItem.category || !newItem.color) {
      alert('Please fill out all required fields');
      return;
    }
    
    // If no image provided, use a placeholder
    if (!newItem.image) {
      newItem.image = 'https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg';
    }
    
    const itemToAdd: ClothingItem = {
      id: crypto.randomUUID(),
      name: newItem.name,
      category: newItem.category as ClothingCategory,
      color: newItem.color,
      pattern: newItem.pattern,
      season: newItem.season as any[],
      image: newItem.image,
      favorite: Boolean(newItem.favorite),
    };
    
    addClothingItem(itemToAdd);
    setShowAddModal(false);
    setNewItem({
      name: '',
      category: 'tops',
      color: '',
      season: [],
      image: '',
      favorite: false,
    });
  };

  const toggleFavorite = (id: string) => {
    const item = clothes.find(item => item.id === id);
    if (item) {
      const updatedItem = { ...item, favorite: !item.favorite };
      removeClothingItem(id);
      addClothingItem(updatedItem);
    }
  };

  const filteredClothes = clothes.filter((item) => {
    const matchesCategory = filterCategory === 'all' || item.category === filterCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         item.color.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFavorite = showFavoritesOnly ? item.favorite : true;
    
    return matchesCategory && matchesSearch && matchesFavorite;
  });

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-serif font-bold text-gray-900 dark:text-white mb-2">My Closet</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Organize your wardrobe and get personalized outfit recommendations
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="mt-4 md:mt-0 px-4 py-2 bg-purple-600 text-white rounded-md shadow-sm hover:bg-purple-700 flex items-center transition-colors duration-200"
        >
          <Plus size={20} className="mr-2" /> Add Item
        </button>
      </div>
      
      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-6">
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
          <div className="flex-1">
            <div className="relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={18} className="text-gray-400" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name or color"
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
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value as any)}
                className="block w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:text-white appearance-none"
              >
                <option value="all">All Categories</option>
                {categories.map((category) => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="flex items-center">
            <label htmlFor="favorites" className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                id="favorites"
                checked={showFavoritesOnly}
                onChange={() => setShowFavoritesOnly(!showFavoritesOnly)}
                className="sr-only"
              />
              <div className={`w-10 h-5 rounded-full transition-colors duration-200 ${
                showFavoritesOnly ? 'bg-purple-600' : 'bg-gray-300 dark:bg-gray-600'
              } relative`}>
                <div className={`absolute left-0.5 top-0.5 bg-white w-4 h-4 rounded-full transition-transform duration-200 transform ${
                  showFavoritesOnly ? 'translate-x-5' : 'translate-x-0'
                }`}></div>
              </div>
              <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Favorites only</span>
            </label>
          </div>
        </div>
      </div>
      
      {/* Clothing Grid */}
      {filteredClothes.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredClothes.map((item) => (
            <div 
              key={item.id} 
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200"
            >
              <div className="relative h-64 bg-gray-200 dark:bg-gray-700">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => toggleFavorite(item.id)}
                  className="absolute top-2 right-2 p-1.5 bg-white dark:bg-gray-800 rounded-full shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                >
                  <Heart 
                    size={20} 
                    className={`${item.favorite ? 'fill-red-500 text-red-500' : 'text-gray-400'}`}
                  />
                </button>
              </div>
              <div className="p-4">
                <h3 className="font-medium text-gray-900 dark:text-white mb-1">{item.name}</h3>
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                  <span className="capitalize">{item.category}</span>
                  <span className="mx-2">•</span>
                  <span className="capitalize">{item.color}</span>
                </div>
                {item.season && item.season.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-1">
                    {item.season.map((season) => (
                      <span 
                        key={season} 
                        className="inline-block px-2 py-0.5 text-xs rounded-full bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-100"
                      >
                        {season}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 text-center">
          <p className="text-gray-500 dark:text-gray-400 mb-4">
            {clothes.length === 0 
              ? "Your closet is empty! Add some items to get started."
              : "No items match your current filters."}
          </p>
          {clothes.length === 0 && (
            <button
              onClick={() => setShowAddModal(true)}
              className="px-4 py-2 bg-purple-600 text-white rounded-md shadow-sm hover:bg-purple-700 inline-flex items-center transition-colors duration-200"
            >
              <Plus size={20} className="mr-2" /> Add Your First Item
            </button>
          )}
        </div>
      )}
      
      {/* Add Item Modal */}
      {showAddModal && (
        <div className="fixed inset-0 overflow-y-auto z-50 flex items-center justify-center">
          <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" onClick={() => setShowAddModal(false)}></div>
          <div className="relative bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full mx-4 p-6 z-10">
            <button
              onClick={() => setShowAddModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
            >
              <X size={24} />
            </button>
            
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Add New Item</h3>
            
            <form onSubmit={handleAddItem}>
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={newItem.name || ''}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:text-white"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Category
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={newItem.category || ''}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:text-white"
                    required
                  >
                    {categories.map((category) => (
                      <option key={category.value} value={category.value}>
                        {category.label}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label htmlFor="color" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Color
                  </label>
                  <input
                    type="text"
                    id="color"
                    name="color"
                    value={newItem.color || ''}
                    onChange={handleInputChange}
                    placeholder="e.g., red, blue, black"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:text-white"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="pattern" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Pattern (optional)
                  </label>
                  <input
                    type="text"
                    id="pattern"
                    name="pattern"
                    value={newItem.pattern || ''}
                    onChange={handleInputChange}
                    placeholder="e.g., striped, floral, plaid"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Seasons
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {seasons.map((season) => (
                      <button
                        key={season.value}
                        type="button"
                        onClick={() => handleSeasonToggle(season.value)}
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          newItem.season?.includes(season.value as any)
                            ? 'bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-100'
                            : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100'
                        }`}
                      >
                        {season.label}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label htmlFor="image" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Image URL (optional)
                  </label>
                  <div className="flex">
                    <input
                      type="text"
                      id="image"
                      name="image"
                      value={newItem.image || ''}
                      onChange={handleInputChange}
                      placeholder="https://example.com/image.jpg"
                      className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-l-md shadow-sm focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:text-white"
                    />
                    <button
                      type="button"
                      className="px-4 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 border-l-0 rounded-r-md text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
                    >
                      <Upload size={20} />
                    </button>
                  </div>
                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                    Leave empty to use a placeholder image
                  </p>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="favorite"
                    name="favorite"
                    checked={Boolean(newItem.favorite)}
                    onChange={(e) => setNewItem({ ...newItem, favorite: e.target.checked })}
                    className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                  />
                  <label htmlFor="favorite" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                    Add to favorites
                  </label>
                </div>
              </div>
              
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm bg-purple-600 text-white rounded-md shadow-sm hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors duration-200"
                >
                  Add Item
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClosetPage;