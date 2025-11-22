import { ShoppingCart, Heart } from 'lucide-react';
import { useState } from 'react';

const products = [
  {
    id: 1,
    name: 'Crimson Dreams',
    price: 89.99,
    category: 'Romantic',
    description: 'Passionate red roses with eucalyptus',
    image: 'https://images.pexels.com/photos/1070850/pexels-photo-1070850.jpeg?auto=compress&cs=tinysrgb&w=600'
  },
  {
    id: 2,
    name: 'Spring Whisper',
    price: 64.99,
    category: 'Natural',
    description: 'Mixed seasonal wildflowers',
    image: 'https://images.pexels.com/photos/931177/pexels-photo-931177.jpeg?auto=compress&cs=tinysrgb&w=600'
  },
  {
    id: 3,
    name: 'Golden Sunrise',
    price: 74.99,
    category: 'Celebration',
    description: 'Bright yellow and orange blooms',
    image: 'https://images.pexels.com/photos/1325837/pexels-photo-1325837.jpeg?auto=compress&cs=tinysrgb&w=600'
  },
  {
    id: 4,
    name: 'Lavender Elegance',
    price: 99.99,
    category: 'Luxury',
    description: 'Premium purple orchids',
    image: 'https://images.pexels.com/photos/1164455/pexels-photo-1164455.jpeg?auto=compress&cs=tinysrgb&w=600'
  },
  {
    id: 5,
    name: 'Blushing Beauty',
    price: 79.99,
    category: 'Romantic',
    description: 'Soft pink peonies and roses',
    image: 'https://images.pexels.com/photos/931162/pexels-photo-931162.jpeg?auto=compress&cs=tinysrgb&w=600'
  },
  {
    id: 6,
    name: 'Garden Party',
    price: 69.99,
    category: 'Celebration',
    description: 'Colorful mixed bouquet',
    image: 'https://images.pexels.com/photos/1482537/pexels-photo-1482537.jpeg?auto=compress&cs=tinysrgb&w=600'
  }
];

export default function ProductGallery() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [favorites, setFavorites] = useState<number[]>([]);

  const categories = ['All', 'Romantic', 'Natural', 'Celebration', 'Luxury'];

  const filteredProducts = selectedCategory === 'All'
    ? products
    : products.filter(p => p.category === selectedCategory);

  const toggleFavorite = (id: number) => {
    setFavorites(prev =>
      prev.includes(id) ? prev.filter(fav => fav !== id) : [...prev, id]
    );
  };

  return (
    <section id="gallery" className="py-24 bg-gradient-to-b from-white to-rose-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-light text-gray-800 mb-4">
            Browse Our <span className="italic text-rose-500">Beautiful</span> Blooms
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto font-light">
            Each arrangement is carefully crafted by our expert florists
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full font-light transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-rose-500 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-rose-50 border border-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
            >
              <div className="relative overflow-hidden aspect-square">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <button
                  onClick={() => toggleFavorite(product.id)}
                  className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors duration-300 shadow-lg"
                >
                  <Heart
                    className={`w-5 h-5 ${
                      favorites.includes(product.id)
                        ? 'fill-rose-500 text-rose-500'
                        : 'text-gray-600'
                    } transition-colors`}
                  />
                </button>
                <div className="absolute bottom-4 left-4">
                  <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-light text-gray-700">
                    {product.category}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-light text-gray-800 mb-2">
                  {product.name}
                </h3>
                <p className="text-sm text-gray-600 font-light mb-4">
                  {product.description}
                </p>

                <div className="flex items-center justify-between">
                  <span className="text-2xl font-light text-rose-500">
                    ${product.price}
                  </span>
                  <button className="bg-rose-500 hover:bg-rose-600 text-white px-6 py-2 rounded-full flex items-center space-x-2 transition-colors duration-300 shadow-md hover:shadow-lg">
                    <ShoppingCart className="w-4 h-4" />
                    <span className="text-sm font-light">Add to Cart</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="bg-white hover:bg-gray-50 text-gray-800 px-8 py-4 rounded-full font-light text-lg transition-all duration-300 shadow-md hover:shadow-lg border border-gray-200">
            View All Products
          </button>
        </div>
      </div>
    </section>
  );
}
