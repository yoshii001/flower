import { ShoppingCart, Flower2, Home, Store } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface HeaderProps {
  onCartClick: () => void;
  currentView: 'home' | 'shop';
  onNavigate: (view: 'home' | 'shop') => void;
}

export const Header = ({ onCartClick, currentView, onNavigate }: HeaderProps) => {
  const { cartCount } = useCart();

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
          >
            <Flower2 className="w-8 h-8 text-rose-500" />
            <span className="text-2xl font-bold text-gray-900">Bloomora</span>
          </button>

          <div className="flex items-center gap-4">
            <nav className="flex gap-2">
              <button
                onClick={() => onNavigate('home')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                  currentView === 'home'
                    ? 'bg-rose-500 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Home className="w-5 h-5" />
                <span className="hidden sm:inline">Home</span>
              </button>
              <button
                onClick={() => onNavigate('shop')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                  currentView === 'shop'
                    ? 'bg-rose-500 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Store className="w-5 h-5" />
                <span className="hidden sm:inline">Shop</span>
              </button>
            </nav>

            <button
              onClick={onCartClick}
              className="relative p-2 text-gray-700 hover:text-rose-500 transition-colors"
            >
              <ShoppingCart className="w-6 h-6" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
