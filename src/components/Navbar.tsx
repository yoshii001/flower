import { ShoppingCart, Menu, X, Flower2 } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed w-full glass-card border-b border-white/30 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center space-x-2">
            <Flower2 className="w-8 h-8 text-rose-500" strokeWidth={1.5} />
            <span className="text-2xl font-light tracking-wider text-gray-800">
              Blossom Haven
            </span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <a href="#home" className="text-gray-700 hover:text-rose-500 transition-colors duration-300 font-light">
              Home
            </a>
            <a href="#collections" className="text-gray-700 hover:text-rose-500 transition-colors duration-300 font-light">
              Collections
            </a>
            <a href="#gallery" className="text-gray-700 hover:text-rose-500 transition-colors duration-300 font-light">
              Shop
            </a>
            <a href="#about" className="text-gray-700 hover:text-rose-500 transition-colors duration-300 font-light">
              Our Story
            </a>
            <a href="#contact" className="text-gray-700 hover:text-rose-500 transition-colors duration-300 font-light">
              Contact
            </a>
            <button className="relative p-2 glass-card rounded-full transition-all duration-300 hover:scale-110 border border-white/30">
              <ShoppingCart className="w-6 h-6 text-gray-700" strokeWidth={1.5} />
              <span className="absolute -top-1 -right-1 rose-gold-gradient text-white text-xs w-5 h-5 rounded-full flex items-center justify-center shadow-lg">
                0
              </span>
            </button>
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 hover:bg-rose-50 rounded-lg transition-colors"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-gray-700" />
            ) : (
              <Menu className="w-6 h-6 text-gray-700" />
            )}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden glass-card border-t border-white/30">
          <div className="px-4 py-4 space-y-3">
            <a href="#home" className="block py-2 text-gray-700 hover:text-rose-500 transition-colors font-light">
              Home
            </a>
            <a href="#collections" className="block py-2 text-gray-700 hover:text-rose-500 transition-colors font-light">
              Collections
            </a>
            <a href="#gallery" className="block py-2 text-gray-700 hover:text-rose-500 transition-colors font-light">
              Shop
            </a>
            <a href="#about" className="block py-2 text-gray-700 hover:text-rose-500 transition-colors font-light">
              Our Story
            </a>
            <a href="#contact" className="block py-2 text-gray-700 hover:text-rose-500 transition-colors font-light">
              Contact
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
