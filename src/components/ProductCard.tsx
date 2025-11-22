import { motion } from 'framer-motion';
import { ShoppingCart } from 'lucide-react';
import { Product } from '../data/products';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { useState } from 'react';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsAdding(true);
    addToCart(product);
    setTimeout(() => setIsAdding(false), 600);
  };

  return (
    <Link to={`/product/${product.id}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        whileHover={{ y: -8 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 group"
      >
        <div className="relative overflow-hidden aspect-square">
          <motion.img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.4 }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          <motion.button
            onClick={handleAddToCart}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`absolute bottom-4 right-4 p-3 rounded-full shadow-lg transition-all duration-300 ${
              isAdding
                ? 'bg-green-500 text-white'
                : 'bg-white text-rose-500 hover:bg-rose-500 hover:text-white'
            }`}
          >
            <motion.div
              animate={isAdding ? { rotate: 360, scale: [1, 1.2, 1] } : {}}
              transition={{ duration: 0.6 }}
            >
              <ShoppingCart className="w-5 h-5" />
            </motion.div>
          </motion.button>

          {product.featured && (
            <div className="absolute top-4 left-4 bg-rose-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
              Featured
            </div>
          )}
        </div>

        <div className="p-5">
          <div className="text-xs text-rose-500 font-semibold uppercase tracking-wider mb-2">
            {product.category}
          </div>
          <h3 className="font-serif text-lg font-semibold text-gray-800 mb-2 line-clamp-1">
            {product.name}
          </h3>
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {product.description}
          </p>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-rose-600">
              ${product.price.toFixed(2)}
            </span>
            <span className="text-xs text-gray-500 font-medium">
              Free Delivery
            </span>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

export default ProductCard;
