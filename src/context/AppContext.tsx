import React, { createContext, useContext, useState, ReactNode } from 'react';
import { OutfitItem, ClothingItem, UserProfile, MarketplaceItem } from '../types';
import { sampleClothes, sampleOutfits, sampleMarketplace } from '../data/sampleData';

interface AppContextType {
  userProfile: UserProfile | null;
  clothes: ClothingItem[];
  outfits: OutfitItem[];
  marketplace: MarketplaceItem[];
  darkMode: boolean;
  setUserProfile: (profile: UserProfile) => void;
  addClothingItem: (item: ClothingItem) => void;
  removeClothingItem: (id: string) => void;
  addOutfit: (outfit: OutfitItem) => void;
  removeOutfit: (id: string) => void;
  toggleDarkMode: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [clothes, setClothes] = useState<ClothingItem[]>(sampleClothes);
  const [outfits, setOutfits] = useState<OutfitItem[]>(sampleOutfits);
  const [marketplace, setMarketplace] = useState<MarketplaceItem[]>(sampleMarketplace);
  const [darkMode, setDarkMode] = useState<boolean>(false);

  const addClothingItem = (item: ClothingItem) => {
    setClothes([...clothes, item]);
  };

  const removeClothingItem = (id: string) => {
    setClothes(clothes.filter((item) => item.id !== id));
  };

  const addOutfit = (outfit: OutfitItem) => {
    setOutfits([...outfits, outfit]);
  };

  const removeOutfit = (id: string) => {
    setOutfits(outfits.filter((outfit) => outfit.id !== id));
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <AppContext.Provider
      value={{
        userProfile,
        clothes,
        outfits,
        marketplace,
        darkMode,
        setUserProfile,
        addClothingItem,
        removeClothingItem,
        addOutfit,
        removeOutfit,
        toggleDarkMode,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};