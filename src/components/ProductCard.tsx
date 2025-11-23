import { Product } from '../types';
import { formatLKR } from '../utils/currency';
import { Heart, ShoppingCart } from 'lucide-react';
import { useState } from 'react';

interface ProductCardProps {
  product: Product;
  onClick: () => void;
}

export const ProductCard = ({ product, onClick }: ProductCardProps) => {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <div
      onClick={onClick}
      className="group relative bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer"
    >
      {/* Image Container */}
      <div className="aspect-square overflow-hidden bg-gray-100 relative">
        <img
          src={product.images[0]}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />

        {/* Overlay on Hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
          <button
            onClick={(e) => {
              e.stopPropagation();
            }}
            className="w-full cta-button bg-white/90 backdrop-blur text-gray-900 font-semibold rounded-lg py-2 flex items-center justify-center gap-2 hover:bg-white"
          >
            <ShoppingCart className="w-5 h-5" />
            Quick View
          </button>
        </div>

        {/* Favorite Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsFavorite(!isFavorite);
          }}
          className="absolute top-4 right-4 p-2 rounded-full bg-white/90 backdrop-blur hover:bg-white transition-all z-10"
        >
          <Heart
            className={`w-5 h-5 transition-colors ${
              isFavorite ? 'fill-rose-500 text-rose-500' : 'text-gray-600'
            }`}
          />
        </button>

        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <span className="inline-block px-3 py-1 rounded-full bg-white/90 backdrop-blur text-rose-600 text-xs font-bold uppercase">
            {product.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-rose-600 transition-colors line-clamp-2">
          {product.title}
        </h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
          {product.description}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <span className="text-2xl font-bold bg-gradient-to-r from-rose-500 to-pink-500 bg-clip-text text-transparent">
            {formatLKR(product.priceLKR)}
          </span>
          <div className="text-sm text-gray-500">In stock</div>
        </div>
      </div>
    </div>
  );
};
