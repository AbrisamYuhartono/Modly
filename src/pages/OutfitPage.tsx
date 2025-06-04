import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { OutfitItem, ClothingItem } from '../types';
import { Plus, Filter, Heart, Layers, User, ArrowRight, Check, X } from 'lucide-react';

const OutfitPage: React.FC = () => {
  const { outfits, clothes, addOutfit, removeOutfit } = useAppContext();
  const [showAddModal, setShowAddModal] = useState(false);
  const [filterSeason, setFilterSeason] = useState<string | 'all'>('all');
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  
  const [newOutfit, setNewOutfit] = useState<Partial<OutfitItem>>({
    name: '',
    clothes: [],
    occasion: '',
    season: [],
    favorite: false,
  });
  
  const [selectedClothes, setSelectedClothes] = useState<string[]>([]);
  
  const seasons = [
    { value: 'all', label: 'All Seasons' },
    { value: 'spring', label: 'Spring' },
    { value: 'summer', label: 'Summer' },
    { value: 'fall', label: 'Fall' },
    { value: 'winter', label: 'Winter' },
  ];
  
  const occasions = [
    'Casual',
    'Work',
    'Formal',
    'Date Night',
    'Workout',
    'Party',
    'Beach',
    'Other',
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewOutfit({ ...newOutfit, [name]: value });
  };

  const handleSeasonToggle = (season: string) => {
    const currentSeasons = newOutfit.season || [];
    
    if (currentSeasons.includes(season as any)) {
      setNewOutfit({
        ...newOutfit,
        season: currentSeasons.filter(s => s !== season),
      });
    } else {
      setNewOutfit({
        ...newOutfit,
        season: [...currentSeasons, season],
      });
    }
  };

  const toggleClothingSelection = (id: string) => {
    if (selectedClothes.includes(id)) {
      setSelectedClothes(selectedClothes.filter(itemId => itemId !== id));
    } else {
      setSelectedClothes([...selectedClothes, id]);
    }
  };

  const handleAddOutfit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newOutfit.name || !newOutfit.occasion || newOutfit.season?.length === 0 || selectedClothes.length === 0) {
      alert('Please fill out all required fields and select at least one clothing item');
      return;
    }
    
    const selectedItems = clothes.filter(item => selectedClothes.includes(item.id));
    
    const outfitToAdd: OutfitItem = {
      id: crypto.randomUUID(),
      name: newOutfit.name,
      clothes: selectedItems,
      occasion: newOutfit.occasion || 'Casual',
      season: newOutfit.season as any[],
      image: selectedItems[0]?.image,
      favorite: Boolean(newOutfit.favorite),
    };
    
    addOutfit(outfitToAdd);
    setShowAddModal(false);
    setNewOutfit({
      name: '',
      clothes: [],
      occasion: '',
      season: [],
      favorite: false,
    });
    setSelectedClothes([]);
  };

  const toggleFavorite = (id: string) => {
    const outfit = outfits.find(outfit => outfit.id === id);
    if (outfit) {
      const updatedOutfit = { ...outfit, favorite: !outfit.favorite };
      removeOutfit(id);
      addOutfit(updatedOutfit);
    }
  };

  const filteredOutfits = outfits.filter((outfit) => {
    const matchesSeason = filterSeason === 'all' || outfit.season.includes(filterSeason as any);
    const matchesFavorite = showFavoritesOnly ? outfit.favorite : true;
    
    return matchesSeason && matchesFavorite;
  });

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-serif font-bold text-gray-900 dark:text-white mb-2">My Outfits</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Create and save outfit combinations from your closet items
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="mt-4 md:mt-0 px-4 py-2 bg-purple-600 text-white rounded-md shadow-sm hover:bg-purple-700 flex items-center transition-colors duration-200"
        >
          <Plus size={20} className="mr-2" /> Create Outfit
        </button>
      </div>
      
      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-6">
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
          <div className="w-full md:w-1/3">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Filter size={18} className="text-gray-400" />
              </div>
              <select
                value={filterSeason}
                onChange={(e) => setFilterSeason(e.target.value)}
                className="block w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:text-white appearance-none"
              >
                {seasons.map((season) => (
                  <option key={season.value} value={season.value}>
                    {season.label}
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
      
      {/* Outfits Grid */}
      {filteredOutfits.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredOutfits.map((outfit) => (
            <div 
              key={outfit.id} 
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200"
            >
              <div className="relative h-64 bg-gray-200 dark:bg-gray-700">
                {outfit.image ? (
                  <img 
                    src={outfit.image} 
                    alt={outfit.name} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-100 dark:bg-gray-700">
                    <Layers size={48} className="text-gray-400" />
                  </div>
                )}
                <button
                  onClick={() => toggleFavorite(outfit.id)}
                  className="absolute top-2 right-2 p-1.5 bg-white dark:bg-gray-800 rounded-full shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                >
                  <Heart 
                    size={20} 
                    className={`${outfit.favorite ? 'fill-red-500 text-red-500' : 'text-gray-400'}`}
                  />
                </button>
              </div>
              <div className="p-4">
                <h3 className="font-medium text-gray-900 dark:text-white mb-1">{outfit.name}</h3>
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-2">
                  <span>{outfit.occasion}</span>
                  <span className="mx-2">•</span>
                  <span>{outfit.season.join(', ')}</span>
                </div>
                <div className="flex items-center space-x-1 mb-3">
                  {outfit.clothes.slice(0, 4).map((item, index) => (
                    <div 
                      key={item.id} 
                      className="w-8 h-8 rounded-full overflow-hidden border border-gray-200 dark:border-gray-700"
                      style={{ marginLeft: index > 0 ? '-0.5rem' : 0, zIndex: 10 - index }}
                    >
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                  {outfit.clothes.length > 4 && (
                    <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-xs text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700" style={{ marginLeft: '-0.5rem' }}>
                      +{outfit.clothes.length - 4}
                    </div>
                  )}
                </div>
                <button className="w-full py-2 text-sm text-purple-600 dark:text-purple-400 border border-purple-600 dark:border-purple-400 rounded-md hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors duration-200">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 text-center">
          <Layers size={48} className="mx-auto text-gray-400 mb-4" />
          <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">No outfits created yet</h3>
          <p className="text-gray-500 dark:text-gray-400 mb-4">
            Create your first outfit by combining items from your closet.
          </p>
          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2 bg-purple-600 text-white rounded-md shadow-sm hover:bg-purple-700 inline-flex items-center transition-colors duration-200"
          >
            <Plus size={20} className="mr-2" /> Create Your First Outfit
          </button>
        </div>
      )}
      
      {/* Create Outfit Modal */}
      {showAddModal && (
        <div className="fixed inset-0 overflow-y-auto z-50 flex items-center justify-center">
          <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" onClick={() => setShowAddModal(false)}></div>
          <div className="relative bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-4xl w-full mx-4 z-10">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Create New Outfit</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="p-6">
              <form onSubmit={handleAddOutfit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Outfit Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={newOutfit.name || ''}
                        onChange={handleInputChange}
                        placeholder="e.g., Summer Casual"
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:text-white"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="occasion" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Occasion
                      </label>
                      <select
                        id="occasion"
                        name="occasion"
                        value={newOutfit.occasion || ''}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:text-white"
                        required
                      >
                        <option value="">Select an occasion</option>
                        {occasions.map((occasion) => (
                          <option key={occasion} value={occasion}>
                            {occasion}
                          </option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Seasons
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {seasons.filter(s => s.value !== 'all').map((season) => (
                          <button
                            key={season.value}
                            type="button"
                            onClick={() => handleSeasonToggle(season.value)}
                            className={`px-3 py-1 rounded-full text-sm font-medium ${
                              newOutfit.season?.includes(season.value as any)
                                ? 'bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-100'
                                : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100'
                            }`}
                          >
                            {season.label}
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="favorite"
                        name="favorite"
                        checked={Boolean(newOutfit.favorite)}
                        onChange={(e) => setNewOutfit({ ...newOutfit, favorite: e.target.checked })}
                        className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                      />
                      <label htmlFor="favorite" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                        Add to favorites
                      </label>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Select Items ({selectedClothes.length} selected)
                      </label>
                      <div className="border border-gray-300 dark:border-gray-600 rounded-md max-h-64 overflow-y-auto">
                        {clothes.length > 0 ? (
                          <div className="divide-y divide-gray-200 dark:divide-gray-700">
                            {clothes.map((item) => (
                              <div 
                                key={item.id} 
                                onClick={() => toggleClothingSelection(item.id)}
                                className={`flex items-center p-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 ${
                                  selectedClothes.includes(item.id) ? 'bg-purple-50 dark:bg-purple-900/30' : ''
                                }`}
                              >
                                <div className="flex-shrink-0 w-12 h-12 rounded-md overflow-hidden bg-gray-200 dark:bg-gray-700 mr-3">
                                  <img 
                                    src={item.image} 
                                    alt={item.name} 
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                                    {item.name}
                                  </p>
                                  <p className="text-xs text-gray-500 dark:text-gray-400">
                                    {item.category} • {item.color}
                                  </p>
                                </div>
                                <div className="flex-shrink-0">
                                  {selectedClothes.includes(item.id) ? (
                                    <Check size={20} className="text-purple-600 dark:text-purple-400" />
                                  ) : null}
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="p-4 text-center text-gray-500 dark:text-gray-400">
                            No items in your closet yet. Add items to your closet first.
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {selectedClothes.length > 0 && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Selected Items
                        </label>
                        <div className="flex flex-wrap gap-2">
                          {selectedClothes.map((id) => {
                            const item = clothes.find(c => c.id === id);
                            return item ? (
                              <div 
                                key={id}
                                className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-100"
                              >
                                <span className="max-w-[100px] truncate">{item.name}</span>
                                <button 
                                  type="button"
                                  onClick={() => toggleClothingSelection(id)}
                                  className="ml-1 text-purple-600 dark:text-purple-300 hover:text-purple-800 dark:hover:text-purple-100 focus:outline-none"
                                >
                                  <X size={14} />
                                </button>
                              </div>
                            ) : null;
                          })}
                        </div>
                      </div>
                    )}
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
                    Create Outfit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OutfitPage;