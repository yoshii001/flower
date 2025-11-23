import { Product } from '../types';
import { ProductCard } from './ProductCard';

interface FeaturedProductsProps {
  products: Product[];
  onProductClick: (product: Product) => void;
  onViewAll: () => void;
}

export const FeaturedProducts = ({
  products,
  onProductClick,
  onViewAll,
}: FeaturedProductsProps) => {
  const featured = products.slice(0, 4);

  return (
    <div className="relative py-24 bg-gradient-to-b from-white via-rose-50/30 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-16">
          <div>
            <span className="inline-block px-3 py-1 rounded-full bg-rose-100 text-rose-700 text-xs font-semibold mb-4">
              CURATED COLLECTION
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-3">
              Featured Flowers
            </h2>
            <p className="text-lg text-gray-600 max-w-lg">
              Handpicked favorites from our collection, selected for their beauty
              and freshness
            </p>
          </div>
          <button
            onClick={onViewAll}
            className="cta-button relative px-6 py-3 bg-rose-500 text-white font-semibold rounded-lg hover:bg-rose-600 transition-all flex items-center gap-2"
          >
            View All
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map((product, index) => (
            <div
              key={product.id}
              style={{
                animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`,
              }}
            >
              <ProductCard
                product={product}
                onClick={() => onProductClick(product)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
