export interface UserProfile {
  id: string;
  name: string;
  email: string;
  skinTone: SkinTone;
  bodyShape: BodyShape;
  stylePreferences: StylePreference[];
  avatar?: string;
}

export type SkinTone = 
  | 'fair'
  | 'light'
  | 'medium'
  | 'olive'
  | 'tan'
  | 'deep'
  | 'dark';

export type BodyShape = 
  | 'rectangle'
  | 'triangle'
  | 'inverted-triangle'
  | 'hourglass'
  | 'apple'
  | 'pear';

export type StylePreference = 
  | 'casual'
  | 'formal'
  | 'bohemian'
  | 'vintage'
  | 'streetwear'
  | 'minimalist'
  | 'preppy'
  | 'athleisure'
  | 'hijab'
  | 'modest';

export type ClothingCategory = 
  | 'tops'
  | 'bottoms'
  | 'dresses'
  | 'outerwear'
  | 'shoes'
  | 'accessories'
  | 'hijab';

export interface ClothingItem {
  id: string;
  name: string;
  category: ClothingCategory;
  color: string;
  pattern?: string;
  season: ('spring' | 'summer' | 'fall' | 'winter')[];
  image: string;
  favorite: boolean;
}

export interface OutfitItem {
  id: string;
  name: string;
  clothes: ClothingItem[];
  occasion: string;
  season: ('spring' | 'summer' | 'fall' | 'winter')[];
  image?: string;
  favorite: boolean;
}

export interface MarketplaceItem {
  id: string;
  name: string;
  description: string;
  category: ClothingCategory;
  size: string;
  condition: 'new' | 'like new' | 'good' | 'fair';
  price: number;
  sellerName: string;
  sellerRating: number;
  images: string[];
  listedDate: string;
}

export interface Message {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: Date;
}

export interface CommunityPost {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  image: string;
  description: string;
  likes: number;
  comments: number;
  timestamp: Date;
  tags: string[];
}