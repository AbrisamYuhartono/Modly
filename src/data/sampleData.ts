import { ClothingItem, OutfitItem, MarketplaceItem, CommunityPost } from '../types';

export const sampleClothes: ClothingItem[] = [
  {
    id: '1',
    name: 'White Button-Down Shirt',
    category: 'tops',
    color: 'white',
    season: ['spring', 'summer', 'fall', 'winter'],
    image: 'https://images.pexels.com/photos/297933/pexels-photo-297933.jpeg',
    favorite: true,
  },
  {
    id: '2',
    name: 'Black Jeans',
    category: 'bottoms',
    color: 'black',
    season: ['spring', 'fall', 'winter'],
    image: 'https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg',
    favorite: false,
  },
  {
    id: '3',
    name: 'Floral Summer Dress',
    category: 'dresses',
    color: 'multicolor',
    pattern: 'floral',
    season: ['spring', 'summer'],
    image: 'https://images.pexels.com/photos/994523/pexels-photo-994523.jpeg',
    favorite: true,
  },
  {
    id: '4',
    name: 'Denim Jacket',
    category: 'outerwear',
    color: 'blue',
    season: ['spring', 'fall'],
    image: 'https://images.pexels.com/photos/1124468/pexels-photo-1124468.jpeg',
    favorite: false,
  },
  {
    id: '5',
    name: 'White Sneakers',
    category: 'shoes',
    color: 'white',
    season: ['spring', 'summer', 'fall'],
    image: 'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg',
    favorite: true,
  },
  {
    id: '6',
    name: 'Gold Hoop Earrings',
    category: 'accessories',
    color: 'gold',
    season: ['spring', 'summer', 'fall', 'winter'],
    image: 'https://images.pexels.com/photos/1413420/pexels-photo-1413420.jpeg',
    favorite: true,
  },
];

export const sampleOutfits: OutfitItem[] = [
  {
    id: '1',
    name: 'Casual Friday',
    clothes: [
      sampleClothes[0],
      sampleClothes[1],
      sampleClothes[4],
    ],
    occasion: 'Casual',
    season: ['spring', 'fall'],
    image: 'https://images.pexels.com/photos/794062/pexels-photo-794062.jpeg',
    favorite: true,
  },
  {
    id: '2',
    name: 'Summer Party',
    clothes: [
      sampleClothes[2],
      sampleClothes[4],
      sampleClothes[5],
    ],
    occasion: 'Party',
    season: ['summer'],
    image: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg',
    favorite: false,
  },
];

export const sampleMarketplace: MarketplaceItem[] = [
  {
    id: '1',
    name: 'Vintage Denim Jacket',
    description: 'Lightly worn vintage Levi\'s denim jacket, size M. Great condition!',
    category: 'outerwear',
    size: 'M',
    condition: 'good',
    price: 45,
    sellerName: 'Sophie',
    sellerRating: 4.8,
    images: [
      'https://images.pexels.com/photos/1385493/pexels-photo-1385493.jpeg',
      'https://images.pexels.com/photos/2523959/pexels-photo-2523959.jpeg'
    ],
    listedDate: '2023-09-15',
  },
  {
    id: '2',
    name: 'Black Leather Boots',
    description: 'Doc Martens black leather boots, barely worn, size 8.',
    category: 'shoes',
    size: '8',
    condition: 'like new',
    price: 85,
    sellerName: 'Amir',
    sellerRating: 4.5,
    images: [
      'https://images.pexels.com/photos/1308747/pexels-photo-1308747.jpeg',
      'https://images.pexels.com/photos/267242/pexels-photo-267242.jpeg'
    ],
    listedDate: '2023-10-02',
  },
  {
    id: '3',
    name: 'Silk Scarf',
    description: 'Beautiful vintage silk scarf, perfect condition.',
    category: 'accessories',
    size: 'One Size',
    condition: 'good',
    price: 25,
    sellerName: 'Layla',
    sellerRating: 4.9,
    images: [
      'https://images.pexels.com/photos/6214477/pexels-photo-6214477.jpeg',
      'https://images.pexels.com/photos/6046183/pexels-photo-6046183.jpeg'
    ],
    listedDate: '2023-10-05',
  },
];

export const sampleCommunityPosts: CommunityPost[] = [
  {
    id: '1',
    userId: '101',
    userName: 'Sophia',
    userAvatar: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg',
    image: 'https://images.pexels.com/photos/2681751/pexels-photo-2681751.jpeg',
    description: 'My favorite autumn outfit! 🍁 #fallvibes #cozy',
    likes: 24,
    comments: 3,
    timestamp: new Date('2023-10-01T12:30:00'),
    tags: ['fall', 'cozy', 'autumn'],
  },
  {
    id: '2',
    userId: '102',
    userName: 'Aisha',
    userAvatar: 'https://images.pexels.com/photos/1321909/pexels-photo-1321909.jpeg',
    image: 'https://images.pexels.com/photos/2043590/pexels-photo-2043590.jpeg',
    description: 'Today\'s hijab style 💕 Simple but elegant for work. #hijabstyle #workwear',
    likes: 32,
    comments: 5,
    timestamp: new Date('2023-10-03T09:15:00'),
    tags: ['hijab', 'workwear', 'modest'],
  },
  {
    id: '3',
    userId: '103',
    userName: 'Zack',
    userAvatar: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg',
    image: 'https://images.pexels.com/photos/2896853/pexels-photo-2896853.jpeg',
    description: 'Streetwear vibes today 🔥 #streetstyle #urban',
    likes: 18,
    comments: 2,
    timestamp: new Date('2023-10-04T16:45:00'),
    tags: ['streetwear', 'urban', 'casual'],
  },
];

export const sampleStyleChat = [
  {
    id: '1',
    sender: 'user',
    text: 'Hi, I have a light olive skin tone and I\'m not sure what colors look best on me. Any advice?',
    timestamp: new Date('2023-10-10T10:30:00'),
  },
  {
    id: '2',
    sender: 'assistant',
    text: 'Hello! For light olive skin tones, you\'ll look fantastic in jewel tones like emerald green, ruby red, and sapphire blue. Earth tones like terracotta, olive green, and mustard yellow will also complement your complexion beautifully. What kind of outfits are you planning?',
    timestamp: new Date('2023-10-10T10:31:00'),
  },
  {
    id: '3',
    sender: 'user',
    text: 'I need some ideas for business casual outfits for work.',
    timestamp: new Date('2023-10-10T10:32:00'),
  },
  {
    id: '4',
    sender: 'assistant',
    text: 'Great! For business casual with your skin tone, try:\n\n1. A burgundy or teal blouse with neutral slacks\n2. An emerald green sweater over a white button-down with navy pants\n3. A rust-colored blazer with cream top and dark jeans for casual days\n\nThese colors will bring warmth to your complexion while keeping it professional. Would you like to see some specific outfit combinations from our catalog?',
    timestamp: new Date('2023-10-10T10:33:00'),
  },
];

export const colorPalettes = {
  fair: ['#9C6D61', '#E8C5B0', '#6F9DB3', '#4A6670', '#C2185B', '#311B92'],
  light: ['#B76E79', '#CEAB93', '#5B8FA8', '#4E6E81', '#D81B60', '#4527A0'],
  medium: ['#C25E68', '#B88A6F', '#468FAF', '#304D63', '#E91E63', '#512DA8'],
  olive: ['#BF4055', '#A96E44', '#2E839F', '#1D3A50', '#F44336', '#5E35B1'],
  tan: ['#B32E49', '#9A5B30', '#167D8F', '#0A2B3F', '#EF5350', '#673AB7'],
  deep: ['#A31C3D', '#8B4A21', '#00697C', '#001F2D', '#EF9A9A', '#7E57C2'],
  dark: ['#94102F', '#7C3918', '#005F73', '#00131F', '#FFCDD2', '#9575CD'],
};