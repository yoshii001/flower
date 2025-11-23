import { useState, useMemo } from 'react';
import { Product } from '../types';
import { ModernProductCard } from './ModernProductCard';
import { ScrollReveal } from './ScrollReveal';
import { SeasonalThemeSelector } from './SeasonalThemeSelector';
import { useFavorites } from '../contexts/FavoritesContext';
import { Sliders, TrendingUp, Flower2 } from 'lucide-react';

interface ModernShopProps {
  products: Product[];
  onProductClick: (product: Product) => void;
  showFavoritesOnly?: boolean;
}

export const ModernShop = ({ products, onProductClick, showFavoritesOnly = false }: ModernShopProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('featured');
  const { favorites } = useFavorites();

  const categories = useMemo(() => {
    const cats = new Set(products.map((p) => p.category));
    return ['all', ...Array.from(cats)];
  }, [products]);

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = showFavoritesOnly
      ? products.filter((p) => favorites.includes(p.id))
      : selectedCategory === 'all'
      ? products
      : products.filter((p) => p.category === selectedCategory);

    if (sortBy === 'price-low') {
      filtered = [...filtered].sort((a, b) => a.priceLKR - b.priceLKR);
    } else if (sortBy === 'price-high') {
      filtered = [...filtered].sort((a, b) => b.priceLKR - a.priceLKR);
    }

    return filtered;
  }, [products, selectedCategory, sortBy, showFavoritesOnly, favorites]);

  return (
    <div className="min-h-screen gradient-bg py-12 sm:py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
        <div className="text-center mb-10 sm:mb-12 md:mb-16 bloom-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 sm:px-6 sm:py-3 rounded-full glass-card text-rose-600 font-semibold text-xs sm:text-sm shadow-lg mb-4 sm:mb-6">
            <Flower2 className="w-3 h-3 sm:w-4 sm:h-4" />
            Handpicked Collection
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4 px-2">
            <span className="text-gradient">{showFavoritesOnly ? 'Your Favorites' : 'Enchanting Blooms'}</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-700 max-w-2xl mx-auto px-4">
            {showFavoritesOnly ? 'Your handpicked collection of beloved blooms' : 'Discover our curated selection of nature\'s finest masterpieces'}
          </p>
        </div>

        {!showFavoritesOnly && (
          <div className="flex flex-col gap-4 sm:gap-6 mb-8 sm:mb-10 md:mb-12">
            <div className="w-full lg:hidden">
              <SeasonalThemeSelector />
            </div>

            <div className="flex flex-col lg:flex-row gap-4 sm:gap-6">
              <div className="hidden lg:block lg:w-64 flex-shrink-0">
                <SeasonalThemeSelector />
              </div>

              <div className="flex-1 glass-card rounded-xl sm:rounded-2xl p-3 sm:p-4">
                <label className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm font-bold text-gray-900 mb-3">
                  <Sliders className="w-4 h-4 sm:w-5 sm:h-5 text-rose-500" />
                  Filter by Category
                </label>
                <div className="flex flex-wrap gap-2">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-3 py-1.5 sm:px-4 md:px-6 sm:py-2 md:py-2.5 rounded-full font-semibold text-xs sm:text-sm transition-all duration-300 ${
                        selectedCategory === cat
                          ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-lg scale-105'
                          : 'bg-white/50 text-gray-700 hover:bg-white hover:shadow-md'
                      }`}
                    >
                      {cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              <div className="glass-card rounded-xl sm:rounded-2xl p-3 sm:p-4 lg:w-64 flex-shrink-0">
                <label className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm font-bold text-gray-900 mb-3">
                  <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-rose-500" />
                  Sort By
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-3 py-2 sm:px-4 sm:py-2.5 rounded-lg sm:rounded-xl border-2 border-white/50 bg-white/50 backdrop-blur-sm focus:outline-none focus:border-rose-500 font-semibold text-gray-700 text-xs sm:text-sm cursor-pointer transition-all"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {filteredAndSortedProducts.length === 0 ? (
          <div className="text-center py-12 sm:py-16 md:py-20">
            <div className="inline-block p-6 sm:p-8 glass-card rounded-2xl sm:rounded-3xl">
              <Flower2 className="w-12 h-12 sm:w-16 sm:h-16 text-gray-400 mx-auto mb-3 sm:mb-4" />
              <p className="text-lg sm:text-xl text-gray-600 font-semibold px-4">
                {showFavoritesOnly ? 'No favorites yet. Start adding some!' : 'No blooms found in this category'}
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            {filteredAndSortedProducts.map((product, index) => (
              <ScrollReveal key={product.id} delay={index * 50}>
                <ModernProductCard
                  product={product}
                  onClick={() => onProductClick(product)}
                />
              </ScrollReveal>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
