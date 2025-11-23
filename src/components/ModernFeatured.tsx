import { Product } from '../types';
import { ModernProductCard } from './ModernProductCard';
import { ArrowRight, Star } from 'lucide-react';

interface ModernFeaturedProps {
  products: Product[];
  onProductClick: (product: Product) => void;
  onViewAll: () => void;
}

export const ModernFeatured = ({
  products,
  onProductClick,
  onViewAll,
}: ModernFeaturedProps) => {
  const featured = products.slice(0, 4);

  return (
    <div className="relative py-12 sm:py-16 md:py-20 lg:py-24 overflow-hidden" data-featured-section>
      <div className="absolute inset-0 bg-gradient-to-b from-pink-50/50 via-white to-rose-50/50" />

      <div className="absolute top-10 sm:top-20 left-5 sm:left-10 w-64 h-64 sm:w-96 sm:h-96 bg-rose-200/20 rounded-full blur-3xl blob-morph" />
      <div className="absolute bottom-10 sm:bottom-20 right-5 sm:right-10 w-64 h-64 sm:w-96 sm:h-96 bg-pink-200/20 rounded-full blur-3xl blob-morph" style={{ animationDelay: '3s' }} />

      <div className="relative max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
        <div className="text-center mb-10 sm:mb-12 md:mb-16 bloom-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 sm:px-6 sm:py-3 rounded-full glass-card text-rose-600 font-semibold text-xs sm:text-sm shadow-lg mb-4 sm:mb-6">
            <Star className="w-3 h-3 sm:w-4 sm:h-4 fill-current" />
            Curated for You
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 px-2">
            <span className="text-gray-800">Featured </span>
            <span className="text-gradient">Favorites</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed px-4">
            Handpicked selections from our enchanting garden, each bloom telling its own beautiful story
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 mb-10 sm:mb-12 md:mb-16">
          {featured.map((product, index) => (
            <div
              key={product.id}
              className="bloom-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <ModernProductCard
                product={product}
                onClick={() => onProductClick(product)}
              />
            </div>
          ))}
        </div>

        <div className="text-center bloom-in" style={{ animationDelay: '0.5s' }}>
          <button
            onClick={onViewAll}
            className="group inline-flex items-center gap-2 sm:gap-3 px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 bg-gradient-to-r from-rose-500 to-pink-500 text-white font-bold text-sm sm:text-base md:text-lg rounded-full shadow-2xl hover:shadow-rose-500/50 transition-all duration-300 hover:scale-105"
          >
            <span>Explore Full Collection</span>
            <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-2 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};
