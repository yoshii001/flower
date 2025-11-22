import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Minus, Plus, ShoppingCart, Heart, Truck, Shield, Award } from 'lucide-react';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import { useState } from 'react';
import ProductCard from '../components/ProductCard';

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);

  const product = products.find((p) => p.id === Number(id));

  if (!product) {
    return (
      <div className="min-h-screen pt-28 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-serif font-bold text-gray-800 mb-4">
            Product not found
          </h2>
          <Link to="/shop" className="text-rose-500 hover:text-rose-600">
            Back to Shop
          </Link>
        </div>
      </div>
    );
  }

  const suggestedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    setIsAdding(true);
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    setTimeout(() => setIsAdding(false), 800);
  };

  const features = [
    { icon: Truck, text: 'Free Delivery on orders over $50' },
    { icon: Shield, text: '100% Fresh Guarantee' },
    { icon: Award, text: 'Handcrafted by Expert Florists' },
  ];

  return (
    <div className="min-h-screen pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8"
        >
          <Link
            to="/shop"
            className="inline-flex items-center space-x-2 text-gray-600 hover:text-rose-500 transition-colors duration-300"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Shop</span>
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl sticky top-28">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {product.featured && (
                <div className="absolute top-6 left-6 bg-rose-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                  Featured
                </div>
              )}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div>
              <div className="text-sm text-rose-500 font-semibold uppercase tracking-wider mb-2">
                {product.category}
              </div>
              <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-800 mb-4">
                {product.name}
              </h1>
              <div className="flex items-baseline space-x-4 mb-6">
                <span className="text-5xl font-bold text-rose-600">
                  ${product.price.toFixed(2)}
                </span>
                <span className="text-gray-500 line-through text-xl">
                  ${(product.price * 1.3).toFixed(2)}
                </span>
              </div>
            </div>

            <div className="border-t border-b border-gray-200 py-6">
              <p className="text-gray-700 leading-relaxed text-lg">
                {product.description}
              </p>
            </div>

            <div className="space-y-4">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center space-x-3 text-gray-700"
                >
                  <div className="w-10 h-10 bg-rose-50 rounded-full flex items-center justify-center">
                    <feature.icon className="w-5 h-5 text-rose-500" />
                  </div>
                  <span>{feature.text}</span>
                </motion.div>
              ))}
            </div>

            <div className="bg-rose-50 rounded-2xl p-6 space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Quantity
                </label>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-12 h-12 bg-white rounded-full flex items-center justify-center hover:bg-rose-500 hover:text-white transition-colors duration-300 shadow-md"
                  >
                    <Minus className="w-5 h-5" />
                  </button>
                  <span className="text-2xl font-bold text-gray-800 min-w-[3rem] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-12 h-12 bg-white rounded-full flex items-center justify-center hover:bg-rose-500 hover:text-white transition-colors duration-300 shadow-md"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="flex space-x-4">
                <motion.button
                  onClick={handleAddToCart}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`flex-1 py-4 rounded-full font-semibold text-lg flex items-center justify-center space-x-2 transition-all duration-300 shadow-lg ${
                    isAdding
                      ? 'bg-green-500 text-white'
                      : 'bg-rose-500 text-white hover:bg-rose-600'
                  }`}
                >
                  <ShoppingCart className="w-5 h-5" />
                  <span>{isAdding ? 'Added!' : 'Add to Cart'}</span>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-14 h-14 bg-white rounded-full flex items-center justify-center text-rose-500 hover:bg-rose-500 hover:text-white transition-all duration-300 shadow-lg"
                >
                  <Heart className="w-6 h-6" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>

        {suggestedProducts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-20"
          >
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-800 mb-8 text-center">
              You May Also Like
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {suggestedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
