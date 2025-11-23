import { Product } from '../types';
import { formatLKR } from '../utils/currency';
import { Heart, ShoppingBag, Sparkles, Award, TrendingUp, Flower, Wind } from 'lucide-react';
import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useFavorites } from '../contexts/FavoritesContext';

interface ModernProductCardProps {
  product: Product;
  onClick: () => void;
}

const getBadgeConfig = (badge?: string) => {
  switch (badge) {
    case 'just-arrived':
      return { icon: Sparkles, text: 'Just Arrived', color: 'from-emerald-500 to-teal-500' };
    case 'best-seller':
      return { icon: Award, text: 'Best Seller', color: 'from-amber-500 to-orange-500' };
    case 'limited':
      return { icon: TrendingUp, text: 'Limited', color: 'from-rose-500 to-pink-500' };
    default:
      return null;
  }
};

const getScentIcon = (scent?: string) => {
  if (scent === 'strong' || scent === 'mild') {
    return <Wind className="w-4 h-4" />;
  }
  return null;
};

export const ModernProductCard = ({ product, onClick }: ModernProductCardProps) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const { addToCart } = useCart();
  const { isFavorite, addToFavorites, removeFromFavorites } = useFavorites();
  const productIsFavorite = isFavorite(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart({
      id: product.id,
      title: product.title,
      priceLKR: product.priceLKR,
      image: product.images[0],
    });
  };

  const badgeConfig = getBadgeConfig(product.badge);

  return (
    <div
      onClick={onClick}
      className="group relative glass-card rounded-3xl overflow-hidden cursor-pointer transition-all duration-500 hover:shadow-2xl hover:-translate-y-3"
      style={{
        background: 'linear-gradient(145deg, rgba(255,255,255,0.9) 0%, rgba(255,250,250,0.9) 100%)',
      }}
    >
      {badgeConfig && (
        <div className="absolute top-4 left-4 z-20">
          <span className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-gradient-to-r ${badgeConfig.color} text-white text-xs font-bold uppercase shadow-lg backdrop-blur-sm animate-pulse`}>
            <badgeConfig.icon className="w-3.5 h-3.5" />
            {badgeConfig.text}
          </span>
        </div>
      )}

      <div className="absolute top-4 right-4 z-20 flex flex-col gap-2">
        <button
          onClick={(e) => {
            e.stopPropagation();
            if (productIsFavorite) {
              removeFromFavorites(product.id);
            } else {
              addToFavorites(product.id);
            }
          }}
          className="p-3 rounded-full bg-white/90 backdrop-blur-sm shadow-lg hover:bg-white transition-all hover:scale-110 duration-300"
        >
          <Heart
            className={`w-5 h-5 transition-all duration-300 ${
              productIsFavorite ? 'fill-rose-500 text-rose-500 scale-110' : 'text-gray-600'
            }`}
          />
        </button>

        <button
          onClick={handleAddToCart}
          className="p-3 rounded-full bg-gradient-to-br from-rose-500 to-pink-500 text-white shadow-lg hover:shadow-xl transition-all hover:scale-110 opacity-0 group-hover:opacity-100 duration-300"
        >
          <ShoppingBag className="w-5 h-5" />
        </button>
      </div>

      <div className="relative aspect-square overflow-hidden">
        {!isImageLoaded && (
          <div className="absolute inset-0 bg-gradient-to-br from-rose-100 to-pink-100 animate-pulse" />
        )}
        <img
          src={product.images[0]}
          alt={product.title}
          onLoad={() => setIsImageLoaded(true)}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-125 group-hover:rotate-2"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <div className="absolute inset-0 bg-gradient-to-br from-rose-500/10 via-transparent to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-1/2 p-6 bg-gradient-to-t from-white via-white/95 to-transparent backdrop-blur-md transform translate-y-2 group-hover:translate-y-0 transition-all duration-500">
        <div className="mb-3">
          <div className="flex items-center gap-2 mb-2">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-rose-50 text-rose-600 text-xs font-bold uppercase">
              <Flower className="w-3 h-3" />
              {product.category}
            </span>
            {product.size && (
              <span className="px-2.5 py-1 rounded-full bg-gray-100 text-gray-700 text-xs font-semibold">
                {product.size}
              </span>
            )}
            {getScentIcon(product.scent) && (
              <span className="px-2.5 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-semibold inline-flex items-center gap-1">
                {getScentIcon(product.scent)}
                {product.scent === 'strong' ? 'Fragrant' : 'Subtle Scent'}
              </span>
            )}
          </div>

          <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1 group-hover:text-rose-600 transition-colors duration-300">
            {product.title}
          </h3>

          {product.bouquetType && (
            <p className="text-sm text-gray-600 mb-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
              {product.bouquetType}
            </p>
          )}

          <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {product.description}
          </p>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-gray-200/50">
          <div>
            <div className="text-xs text-gray-500 mb-1">Starting from</div>
            <div className="text-2xl font-bold text-gradient">
              {formatLKR(product.priceLKR)}
            </div>
          </div>
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 text-white text-sm font-semibold shadow-lg">
              View Details
              <Sparkles className="w-4 h-4" />
            </span>
          </div>
        </div>
      </div>

      <div className="shimmer-effect absolute inset-0 pointer-events-none" />
    </div>
  );
};
