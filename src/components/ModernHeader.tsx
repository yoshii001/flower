import { ShoppingCart, Flower2, Home, Store, Heart, Palette } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useFavorites } from '../contexts/FavoritesContext';
import { MoodIndicator } from './MoodIndicator';
import { useEffect, useState } from 'react';

interface ModernHeaderProps {
  onCartClick: () => void;
  currentView: 'home' | 'shop' | 'favorites';
  onNavigate: (view: 'home' | 'shop' | 'favorites') => void;
  onBouquetBuilderClick: () => void;
}

export const ModernHeader = ({ onCartClick, currentView, onNavigate, onBouquetBuilderClick }: ModernHeaderProps) => {
  const { cartCount } = useCart();
  const { favoritesCount } = useFavorites();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'glass-card shadow-xl py-2 sm:py-3'
          : 'bg-transparent py-3 sm:py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
        <div className="flex items-center justify-between">
          <button
            onClick={() => onNavigate('home')}
            className="group flex items-center gap-2 sm:gap-3 transition-all duration-300 hover:scale-105"
          >
            <div className="relative">
              <Flower2 className="w-7 h-7 sm:w-8 md:w-10 sm:h-8 md:h-10 text-rose-500 group-hover:rotate-12 transition-transform duration-300" />
              <div className="absolute inset-0 bg-rose-500/20 blur-xl rounded-full scale-0 group-hover:scale-150 transition-transform duration-300" />
            </div>
            <span className="text-xl sm:text-2xl md:text-3xl font-bold text-gradient">Bloomora</span>
          </button>

          <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
            <div className="hidden lg:block">
              <MoodIndicator />
            </div>

            <nav className="flex gap-1 sm:gap-2">
              <button
                onClick={() => onNavigate('home')}
                className={`group flex items-center gap-1 sm:gap-2 px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 md:py-3 rounded-full font-bold text-xs sm:text-sm md:text-base transition-all duration-300 ${
                  currentView === 'home'
                    ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-lg scale-105'
                    : 'glass-card text-gray-700 hover:scale-105'
                }`}
              >
                <Home className={`w-4 h-4 sm:w-5 sm:h-5 ${currentView === 'home' ? 'scale-110' : 'group-hover:scale-110'} transition-transform`} />
                <span className="hidden sm:inline">Home</span>
              </button>
              <button
                onClick={() => onNavigate('shop')}
                className={`group flex items-center gap-1 sm:gap-2 px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 md:py-3 rounded-full font-bold text-xs sm:text-sm md:text-base transition-all duration-300 ${
                  currentView === 'shop'
                    ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-lg scale-105'
                    : 'glass-card text-gray-700 hover:scale-105'
                }`}
              >
                <Store className={`w-4 h-4 sm:w-5 sm:h-5 ${currentView === 'shop' ? 'scale-110' : 'group-hover:scale-110'} transition-transform`} />
                <span className="hidden sm:inline">Shop</span>
              </button>
            </nav>

            <button
              onClick={onBouquetBuilderClick}
              className="relative p-2 sm:p-2.5 md:p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-white hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-purple-500/50"
              title="Create Custom Bouquet"
            >
              <Palette className="w-5 h-5 sm:w-5.5 sm:h-5.5 md:w-6 md:h-6" />
            </button>

            <button
              onClick={() => onNavigate('favorites')}
              className="relative p-2 sm:p-2.5 md:p-3 glass-card rounded-full text-gray-700 hover:text-rose-500 hover:scale-110 transition-all duration-300 shadow-lg"
            >
              <Heart className={`w-5 h-5 sm:w-5.5 sm:h-5.5 md:w-6 md:h-6 ${currentView === 'favorites' ? 'fill-rose-500 text-rose-500' : ''}`} />
              {favoritesCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 sm:-top-1 sm:-right-1 bg-gradient-to-r from-rose-500 to-pink-500 text-white text-[10px] sm:text-xs font-bold rounded-full w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 flex items-center justify-center shadow-lg animate-pulse">
                  {favoritesCount > 9 ? '9+' : favoritesCount}
                </span>
              )}
            </button>

            <button
              onClick={onCartClick}
              className="relative p-2 sm:p-2.5 md:p-3 glass-card rounded-full text-gray-700 hover:text-rose-500 hover:scale-110 transition-all duration-300 shadow-lg"
            >
              <ShoppingCart className="w-5 h-5 sm:w-5.5 sm:h-5.5 md:w-6 md:h-6" />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 sm:-top-1 sm:-right-1 bg-gradient-to-r from-rose-500 to-pink-500 text-white text-[10px] sm:text-xs font-bold rounded-full w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 flex items-center justify-center shadow-lg animate-pulse">
                  {cartCount > 9 ? '9+' : cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
