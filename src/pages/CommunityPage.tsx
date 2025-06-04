import React, { useState } from 'react';
import { Heart, MessageCircle, Share2, MoreHorizontal, Bookmark, Filter, TrendingUp, Clock, ThumbsUp } from 'lucide-react';
import { sampleCommunityPosts } from '../data/sampleData';

const CommunityPage: React.FC = () => {
  const [posts, setPosts] = useState(sampleCommunityPosts);
  const [activeTab, setActiveTab] = useState<'trending' | 'recent' | 'following'>('trending');
  const [likedPosts, setLikedPosts] = useState<string[]>([]);
  const [savedPosts, setSavedPosts] = useState<string[]>([]);
  const [filterTag, setFilterTag] = useState<string | null>(null);

  const handleLike = (postId: string) => {
    const updatedLikes = [...likedPosts];
    const postIndex = posts.findIndex(post => post.id === postId);
    
    if (postIndex === -1) return;
    
    if (likedPosts.includes(postId)) {
      // Unlike
      const updatedPosts = [...posts];
      updatedPosts[postIndex] = {
        ...updatedPosts[postIndex],
        likes: updatedPosts[postIndex].likes - 1
      };
      setPosts(updatedPosts);
      setLikedPosts(updatedLikes.filter(id => id !== postId));
    } else {
      // Like
      const updatedPosts = [...posts];
      updatedPosts[postIndex] = {
        ...updatedPosts[postIndex],
        likes: updatedPosts[postIndex].likes + 1
      };
      setPosts(updatedPosts);
      updatedLikes.push(postId);
      setLikedPosts(updatedLikes);
    }
  };

  const handleSave = (postId: string) => {
    if (savedPosts.includes(postId)) {
      setSavedPosts(savedPosts.filter(id => id !== postId));
    } else {
      setSavedPosts([...savedPosts, postId]);
    }
  };

  const formatDate = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - new Date(date).getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);
    
    if (diffMins < 1) return 'just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    
    return new Date(date).toLocaleDateString();
  };

  const filteredPosts = filterTag 
    ? posts.filter(post => post.tags.includes(filterTag))
    : posts;

  const sortedPosts = [...filteredPosts].sort((a, b) => {
    if (activeTab === 'trending') {
      return b.likes - a.likes;
    } else if (activeTab === 'recent') {
      return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
    }
    return 0;
  });

  const popularTags = Array.from(
    new Set(posts.flatMap(post => post.tags))
  ).slice(0, 8);

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-serif font-bold text-gray-900 dark:text-white mb-2">Community</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Connect with others and share your fashion inspiration
          </p>
        </div>
        <button className="mt-4 md:mt-0 px-4 py-2 bg-purple-600 text-white rounded-md shadow-sm hover:bg-purple-700 flex items-center transition-colors duration-200">
          Create Post
        </button>
      </div>
      
      {/* Filters and Tabs */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-6">
        <div className="flex flex-wrap justify-between items-center">
          <div className="flex space-x-6">
            <button
              onClick={() => setActiveTab('trending')}
              className={`flex items-center py-2 px-1 text-sm font-medium border-b-2 transition-colors duration-200 ${
                activeTab === 'trending' 
                  ? 'text-purple-600 dark:text-purple-400 border-purple-600 dark:border-purple-400' 
                  : 'text-gray-500 dark:text-gray-400 border-transparent hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              <TrendingUp size={18} className="mr-1" />
              Trending
            </button>
            <button
              onClick={() => setActiveTab('recent')}
              className={`flex items-center py-2 px-1 text-sm font-medium border-b-2 transition-colors duration-200 ${
                activeTab === 'recent' 
                  ? 'text-purple-600 dark:text-purple-400 border-purple-600 dark:border-purple-400' 
                  : 'text-gray-500 dark:text-gray-400 border-transparent hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              <Clock size={18} className="mr-1" />
              Recent
            </button>
            <button
              onClick={() => setActiveTab('following')}
              className={`flex items-center py-2 px-1 text-sm font-medium border-b-2 transition-colors duration-200 ${
                activeTab === 'following' 
                  ? 'text-purple-600 dark:text-purple-400 border-purple-600 dark:border-purple-400' 
                  : 'text-gray-500 dark:text-gray-400 border-transparent hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              <ThumbsUp size={18} className="mr-1" />
              Following
            </button>
          </div>
          <div className="mt-3 sm:mt-0">
            <div className="relative">
              <select
                value={filterTag || ''}
                onChange={(e) => setFilterTag(e.target.value || null)}
                className="pl-10 pr-4 py-2 text-sm bg-gray-100 dark:bg-gray-700 border-0 rounded-md focus:ring-2 focus:ring-purple-500 appearance-none"
              >
                <option value="">All Tags</option>
                {popularTags.map((tag) => (
                  <option key={tag} value={tag}>#{tag}</option>
                ))}
              </select>
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Filter size={16} className="text-gray-400" />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Posts Feed */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedPosts.map((post) => (
          <div key={post.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200">
            <div className="p-4 flex items-center">
              <img 
                src={post.userAvatar} 
                alt={post.userName} 
                className="w-10 h-10 rounded-full object-cover mr-3"
              />
              <div className="flex-1">
                <p className="font-medium text-gray-900 dark:text-white">{post.userName}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{formatDate(post.timestamp)}</p>
              </div>
              <button className="p-1 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 rounded-full">
                <MoreHorizontal size={20} />
              </button>
            </div>
            <img 
              src={post.image} 
              alt="Outfit" 
              className="w-full aspect-square object-cover"
            />
            <div className="p-4">
              <div className="flex justify-between items-center mb-3">
                <div className="flex space-x-3">
                  <button 
                    onClick={() => handleLike(post.id)}
                    className="flex items-center text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors duration-200"
                  >
                    <Heart size={20} className={likedPosts.includes(post.id) ? 'fill-red-500 text-red-500' : ''} />
                    <span className="ml-1 text-sm">{post.likes}</span>
                  </button>
                  <button className="flex items-center text-gray-500 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-200">
                    <MessageCircle size={20} />
                    <span className="ml-1 text-sm">{post.comments}</span>
                  </button>
                  <button className="flex items-center text-gray-500 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-200">
                    <Share2 size={20} />
                  </button>
                </div>
                <button 
                  onClick={() => handleSave(post.id)}
                  className={`text-gray-500 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-200 ${
                    savedPosts.includes(post.id) ? 'text-purple-600 dark:text-purple-400' : ''
                  }`}
                >
                  <Bookmark size={20} className={savedPosts.includes(post.id) ? 'fill-purple-600 dark:fill-purple-400' : ''} />
                </button>
              </div>
              <p className="text-gray-800 dark:text-gray-200 text-sm mb-2">{post.description}</p>
              <div className="flex flex-wrap gap-1">
                {post.tags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setFilterTag(tag)}
                    className="inline-block px-2 py-0.5 text-xs rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 hover:bg-purple-200 dark:hover:bg-purple-900/50 transition-colors duration-200"
                  >
                    #{tag}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommunityPage;