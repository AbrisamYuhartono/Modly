import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import ClosetPage from './pages/ClosetPage';
import OutfitPage from './pages/OutfitPage';
import StyleChatPage from './pages/StyleChatPage';
import MarketplacePage from './pages/MarketplacePage';
import CommunityPage from './pages/CommunityPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <AppProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="closet" element={<ClosetPage />} />
            <Route path="outfits" element={<OutfitPage />} />
            <Route path="stylechat" element={<StyleChatPage />} />
            <Route path="marketplace" element={<MarketplacePage />} />
            <Route path="community" element={<CommunityPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Router>
    </AppProvider>
  );
}

export default App;