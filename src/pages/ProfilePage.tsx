import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { SkinTone, BodyShape, StylePreference, UserProfile } from '../types';
import { Camera, Check, RefreshCw } from 'lucide-react';
import { colorPalettes } from '../data/sampleData';
import SkinToneAnalyzer from '../components/SkinToneAnalyzer';

const ProfilePage: React.FC = () => {
  const { userProfile, setUserProfile } = useAppContext();
  const navigate = useNavigate();
  
  const [formState, setFormState] = useState<Partial<UserProfile>>(
    userProfile || {
      id: crypto.randomUUID(),
      name: '',
      email: '',
      skinTone: 'medium' as SkinTone,
      bodyShape: 'rectangle' as BodyShape,
      stylePreferences: [] as StylePreference[],
    }
  );
  
  const [activeTab, setActiveTab] = useState('basic');
  const [showColorPalette, setShowColorPalette] = useState(false);

  const skinTones: { value: SkinTone; label: string; color: string }[] = [
    { value: 'fair', label: 'Fair', color: '#FDE9E0' },
    { value: 'light', label: 'Light', color: '#F5D5C0' },
    { value: 'medium', label: 'Medium', color: '#DBA889' },
    { value: 'olive', label: 'Olive', color: '#C99C67' },
    { value: 'tan', label: 'Tan', color: '#B67C50' },
    { value: 'deep', label: 'Deep', color: '#8D5A3B' },
    { value: 'dark', label: 'Dark', color: '#5C3C21' },
  ];
  
  const bodyShapes: { value: BodyShape; label: string; icon: string }[] = [
    { value: 'rectangle', label: 'Rectangle', icon: '▭' },
    { value: 'triangle', label: 'Triangle / Pear', icon: '▼' },
    { value: 'inverted-triangle', label: 'Inverted Triangle', icon: '▲' },
    { value: 'hourglass', label: 'Hourglass', icon: '⧗' },
    { value: 'apple', label: 'Apple / Round', icon: '⬭' },
    { value: 'pear', label: 'Pear', icon: '🍐' },
  ];
  
  const stylePreferences: { value: StylePreference; label: string }[] = [
    { value: 'casual', label: 'Casual' },
    { value: 'formal', label: 'Formal' },
    { value: 'bohemian', label: 'Bohemian' },
    { value: 'vintage', label: 'Vintage' },
    { value: 'streetwear', label: 'Streetwear' },
    { value: 'minimalist', label: 'Minimalist' },
    { value: 'preppy', label: 'Preppy' },
    { value: 'athleisure', label: 'Athleisure' },
    { value: 'hijab', label: 'Hijab' },
    { value: 'modest', label: 'Modest' },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
  };

  const handleSkinToneSelect = (tone: SkinTone) => {
    setFormState({ ...formState, skinTone: tone });
  };

  const handleBodyShapeSelect = (shape: BodyShape) => {
    setFormState({ ...formState, bodyShape: shape });
  };

  const handleStylePreferenceToggle = (style: StylePreference) => {
    let updatedPreferences: StylePreference[];
    
    if (formState.stylePreferences?.includes(style)) {
      updatedPreferences = formState.stylePreferences.filter(item => item !== style);
    } else {
      updatedPreferences = [...(formState.stylePreferences || []), style];
    }
    
    setFormState({ ...formState, stylePreferences: updatedPreferences });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formState.name || !formState.email || !formState.skinTone || !formState.bodyShape || !formState.stylePreferences?.length) {
      alert('Please fill out all required fields');
      return;
    }
    
    setUserProfile(formState as UserProfile);
    navigate('/closet');
  };

  const toggleColorPalette = () => {
    setShowColorPalette(!showColorPalette);
  };

  const handleSkinToneDetected = (tone: SkinTone) => {
    handleSkinToneSelect(tone);
  };

  return (
    <div className="max-w-4xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-serif font-bold text-gray-900 dark:text-white mb-4">Create Your Style Profile</h1>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Let's gather some information to personalize your fashion recommendations. The more we know about you, the better we can tailor our suggestions.
        </p>
      </div>
      
      {/* Profile Creation Form */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
        {/* Tabs */}
        <div className="flex border-b border-gray-200 dark:border-gray-700 mb-6">
          <button
            className={`py-2 px-4 font-medium text-sm ${
              activeTab === 'basic' 
                ? 'border-b-2 border-purple-500 text-purple-600 dark:text-purple-400' 
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
            onClick={() => setActiveTab('basic')}
          >
            Basic Info
          </button>
          <button
            className={`py-2 px-4 font-medium text-sm ${
              activeTab === 'body' 
                ? 'border-b-2 border-purple-500 text-purple-600 dark:text-purple-400' 
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
            onClick={() => setActiveTab('body')}
          >
            Body Profile
          </button>
          <button
            className={`py-2 px-4 font-medium text-sm ${
              activeTab === 'style' 
                ? 'border-b-2 border-purple-500 text-purple-600 dark:text-purple-400' 
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
            onClick={() => setActiveTab('style')}
          >
            Style Preferences
          </button>
        </div>
        
        <form onSubmit={handleSubmit}>
          {/* Basic Info */}
          {activeTab === 'basic' && (
            <div className="space-y-6">
              <div>
                <label htmlFor="name\" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formState.name || ''}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:text-white"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formState.email || ''}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:text-white"
                  required
                />
              </div>
              
              <div className="pt-4 flex justify-end">
                <button
                  type="button"
                  onClick={() => setActiveTab('body')}
                  className="px-6 py-2 bg-purple-600 text-white rounded-md shadow-sm hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors duration-200"
                >
                  Next
                </button>
              </div>
            </div>
          )}
          
          {/* Body Profile */}
          {activeTab === 'body' && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Skin Tone
                </label>
                <SkinToneAnalyzer onSkinToneDetected={handleSkinToneDetected} />
                <div className="flex flex-wrap gap-3 mt-4">
                  {skinTones.map((tone) => (
                    <div
                      key={tone.value}
                      onClick={() => handleSkinToneSelect(tone.value)}
                      className={`flex flex-col items-center cursor-pointer p-2 rounded-md transition-all duration-200 ${
                        formState.skinTone === tone.value 
                          ? 'ring-2 ring-purple-500 bg-purple-50 dark:bg-purple-900/30' 
                          : 'hover:bg-gray-50 dark:hover:bg-gray-700'
                      }`}
                    >
                      <div 
                        className="w-10 h-10 rounded-full mb-2 border border-gray-300 dark:border-gray-600" 
                        style={{ backgroundColor: tone.color }}
                      ></div>
                      <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                        {tone.label}
                      </span>
                    </div>
                  ))}
                </div>
                
                {formState.skinTone && (
                  <div className="mt-4">
                    <button
                      type="button"
                      onClick={toggleColorPalette}
                      className="inline-flex items-center text-sm text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300 transition-colors duration-200"
                    >
                      {showColorPalette ? 'Hide' : 'Show'} recommended color palette <RefreshCw size={14} className="ml-1" />
                    </button>
                    
                    {showColorPalette && (
                      <div className="mt-2 p-4 bg-gray-50 dark:bg-gray-700 rounded-md">
                        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Colors that complement your skin tone:
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {colorPalettes[formState.skinTone].map((color, index) => (
                            <div 
                              key={index}
                              className="w-8 h-8 rounded-full border border-gray-300 dark:border-gray-600" 
                              style={{ backgroundColor: color }}
                            ></div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
              
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Body Shape
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {bodyShapes.map((shape) => (
                    <div
                      key={shape.value}
                      onClick={() => handleBodyShapeSelect(shape.value)}
                      className={`flex items-center p-3 rounded-md border cursor-pointer transition-all duration-200 ${
                        formState.bodyShape === shape.value 
                          ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/30' 
                          : 'border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
                      }`}
                    >
                      <span className="text-xl mr-2">{shape.icon}</span>
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {shape.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="pt-4 flex justify-between">
                <button
                  type="button"
                  onClick={() => setActiveTab('basic')}
                  className="px-4 py-2 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors duration-200"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('style')}
                  className="px-6 py-2 bg-purple-600 text-white rounded-md shadow-sm hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors duration-200"
                >
                  Next
                </button>
              </div>
            </div>
          )}
          
          {/* Style Preferences */}
          {activeTab === 'style' && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Style Preferences (select all that apply)
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {stylePreferences.map((style) => (
                    <div
                      key={style.value}
                      onClick={() => handleStylePreferenceToggle(style.value)}
                      className={`flex items-center p-3 rounded-md border cursor-pointer transition-all duration-200 ${
                        formState.stylePreferences?.includes(style.value) 
                          ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/30' 
                          : 'border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
                      }`}
                    >
                      {formState.stylePreferences?.includes(style.value) && (
                        <Check size={16} className="text-purple-600 dark:text-purple-400 mr-2" />
                      )}
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {style.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Profile Photo (optional)
                </label>
                <div className="flex items-center">
                  <div className="w-20 h-20 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center overflow-hidden border border-gray-300 dark:border-gray-600">
                    {formState.avatar ? (
                      <img 
                        src={formState.avatar} 
                        alt="Profile" 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <Camera className="text-gray-400" size={24} />
                    )}
                  </div>
                  <button
                    type="button"
                    className="ml-4 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors duration-200"
                  >
                    Upload
                  </button>
                </div>
              </div>
              
              <div className="pt-4 flex justify-between">
                <button
                  type="button"
                  onClick={() => setActiveTab('body')}
                  className="px-4 py-2 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors duration-200"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-purple-600 text-white rounded-md shadow-sm hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors duration-200"
                >
                  Save Profile
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;