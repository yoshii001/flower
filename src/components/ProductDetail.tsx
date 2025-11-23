import { useState, useEffect } from 'react';
import { X, ShoppingCart, ChevronLeft, ChevronRight, ZoomIn, Minus, Plus, Truck, Droplet, Package, Award, Flower, Wind, Camera } from 'lucide-react';
import { Product } from '../types';
import { formatLKR } from '../utils/currency';
import { useCart } from '../context/CartContext';

interface ProductDetailProps {
  product: Product;
  onClose: () => void;
  onARPreview?: (product: Product) => void;
}

export const ProductDetail = ({ product, onClose, onARPreview }: ProductDetailProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 50, y: 50 });
  const [isMobile, setIsMobile] = useState(false);
  const { addToCart } = useCart();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart({
        id: product.id,
        title: product.title,
        priceLKR: product.priceLKR,
        image: product.images[0],
      });
    }
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === product.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? product.images.length - 1 : prev - 1
    );
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isZoomed || isMobile) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPosition({ x, y });
  };

  const handleMouseEnter = () => {
    if (!isMobile) {
      setIsZoomed(true);
    }
  };

  const handleMouseLeave = () => {
    if (!isMobile) {
      setIsZoomed(false);
    }
  };

  return (
    <>
      <div
        className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-300"
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
      >
        <div className="bg-white rounded-2xl sm:rounded-3xl max-w-6xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-in slide-in-from-bottom-4 duration-500">
          <div className="sticky top-0 bg-white/95 backdrop-blur-md border-b px-4 sm:px-6 md:px-8 py-3 sm:py-4 md:py-5 flex items-center justify-between z-10 rounded-t-2xl sm:rounded-t-3xl">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gradient">Product Details</h2>
            <button
              onClick={onClose}
              className="p-2.5 hover:bg-gray-100 rounded-full transition-all hover:scale-110 duration-300"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="p-4 sm:p-6 md:p-8">
            <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 md:gap-12">
              <div className="space-y-4">
                <div
                  className="relative aspect-square bg-gradient-to-br from-rose-50 to-pink-50 rounded-2xl overflow-hidden shadow-lg group"
                  onMouseMove={handleMouseMove}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <img
                    src={product.images[currentImageIndex]}
                    alt={product.title}
                    className={`w-full h-full object-cover transition-transform duration-500 ${
                      isZoomed && !isMobile ? 'scale-150' : 'scale-100'
                    }`}
                    style={isZoomed && !isMobile ? {
                      transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`
                    } : {}}
                  />

                  <div className={`absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 transition-opacity duration-300 ${!isMobile ? 'group-hover:opacity-100' : ''}`} />

                  {product.images.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-white/95 backdrop-blur-sm p-2 sm:p-3 rounded-full hover:bg-white transition-all shadow-lg hover:scale-110 duration-300"
                      >
                        <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-white/95 backdrop-blur-sm p-2 sm:p-3 rounded-full hover:bg-white transition-all shadow-lg hover:scale-110 duration-300"
                      >
                        <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
                      </button>
                    </>
                  )}

                  <button
                    onClick={() => setIsLightboxOpen(true)}
                    className={`absolute bottom-4 right-4 bg-white/95 backdrop-blur-sm p-3 rounded-full hover:bg-white transition-all shadow-lg hover:scale-110 duration-300 ${isMobile ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}
                  >
                    <ZoomIn className="w-5 h-5" />
                  </button>

                  {isZoomed && !isMobile && (
                    <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
                      <span className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                        <ZoomIn className="w-4 h-4" />
                        Hover to zoom
                      </span>
                    </div>
                  )}
                </div>

                {product.images.length > 1 && (
                  <div className="flex gap-2 sm:gap-3 overflow-x-auto pb-2 snap-x snap-mandatory">
                    {product.images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-lg sm:rounded-xl overflow-hidden border-2 sm:border-3 transition-all duration-300 snap-center ${
                          index === currentImageIndex
                            ? 'border-rose-500 shadow-lg scale-105'
                            : 'border-gray-200 hover:border-rose-300 active:scale-95'
                        }`}
                      >
                        <img
                          src={image}
                          alt={`${product.title} ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}

                <div className="grid grid-cols-3 gap-2 sm:gap-3 md:gap-4 p-3 sm:p-4 md:p-6 glass-card rounded-xl sm:rounded-2xl">
                  <div className="text-center">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-rose-500 to-pink-500 rounded-lg sm:rounded-xl flex items-center justify-center mx-auto mb-2 sm:mb-3 shadow-lg">
                      <Droplet className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                    <div className="text-[10px] sm:text-xs font-semibold text-gray-500 mb-1">Freshness</div>
                    <div className="text-xs sm:text-sm font-bold text-gray-900">{product.freshness || '3-5 Days'}</div>
                  </div>
                  <div className="text-center">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg sm:rounded-xl flex items-center justify-center mx-auto mb-2 sm:mb-3 shadow-lg">
                      <Package className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                    <div className="text-[10px] sm:text-xs font-semibold text-gray-500 mb-1">Size</div>
                    <div className="text-xs sm:text-sm font-bold text-gray-900">{product.size || 'Medium'}</div>
                  </div>
                  <div className="text-center">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg sm:rounded-xl flex items-center justify-center mx-auto mb-2 sm:mb-3 shadow-lg">
                      <Wind className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                    <div className="text-[10px] sm:text-xs font-semibold text-gray-500 mb-1">Scent</div>
                    <div className="text-xs sm:text-sm font-bold text-gray-900 capitalize">{product.scent || 'Mild'}</div>
                  </div>
                </div>
              </div>

              <div className="space-y-4 sm:space-y-6">
                <div>
                  <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                    <span className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-rose-50 text-rose-600 text-xs sm:text-sm font-bold uppercase">
                      <Flower className="w-3 h-3 sm:w-4 sm:h-4" />
                      {product.category}
                    </span>
                    {product.badge && (
                      <span className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs sm:text-sm font-bold uppercase shadow-lg">
                        <Award className="w-3 h-3 sm:w-4 sm:h-4" />
                        {product.badge === 'best-seller' && 'Best Seller'}
                        {product.badge === 'just-arrived' && 'New Arrival'}
                        {product.badge === 'limited' && 'Limited Edition'}
                      </span>
                    )}
                  </div>

                  <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4 leading-tight">
                    {product.title}
                  </h1>

                  {product.bouquetType && (
                    <p className="text-base sm:text-lg text-gray-600 mb-3 sm:mb-4 font-medium">
                      {product.bouquetType}
                    </p>
                  )}

                  <div className="flex flex-wrap items-baseline gap-3 sm:gap-4 mb-4 sm:mb-6">
                    <span className="text-3xl sm:text-4xl font-bold text-gradient">
                      {formatLKR(product.priceLKR)}
                    </span>
                    <span className="text-xs sm:text-sm text-gray-500">per arrangement</span>
                  </div>

                  <p className="text-gray-700 text-base sm:text-lg leading-relaxed mb-6 sm:mb-8">
                    {product.description}
                  </p>
                </div>

                <div className="glass-card p-4 sm:p-6 rounded-xl sm:rounded-2xl space-y-4 sm:space-y-6">
                  <div>
                    <label className="block text-xs sm:text-sm font-bold text-gray-900 mb-2 sm:mb-3">
                      Quantity
                    </label>
                    <div className="flex items-center gap-3 sm:gap-4">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="p-2.5 sm:p-3 bg-gray-100 rounded-lg sm:rounded-xl hover:bg-gray-200 active:scale-95 transition-all"
                      >
                        <Minus className="w-4 h-4 sm:w-5 sm:h-5" />
                      </button>
                      <span className="text-xl sm:text-2xl font-bold text-gray-900 min-w-[2.5rem] sm:min-w-[3rem] text-center">
                        {quantity}
                      </span>
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="p-2.5 sm:p-3 bg-gray-100 rounded-lg sm:rounded-xl hover:bg-gray-200 active:scale-95 transition-all"
                      >
                        <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
                      </button>
                    </div>
                  </div>

                  <div className="pt-3 sm:pt-4 border-t border-gray-200">
                    <div className="flex items-center justify-between mb-3 sm:mb-4">
                      <span className="text-sm sm:text-base text-gray-700 font-semibold">Total:</span>
                      <span className="text-2xl sm:text-3xl font-bold text-gradient">
                        {formatLKR(product.priceLKR * quantity)}
                      </span>
                    </div>

                    <div className="space-y-2.5 sm:space-y-3">
                      <button
                        onClick={handleAddToCart}
                        className="w-full bg-gradient-to-r from-rose-500 to-pink-500 text-white py-4 sm:py-5 rounded-xl font-bold text-base sm:text-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 sm:gap-3 shadow-lg active:scale-95 sm:hover:scale-105 duration-300"
                      >
                        <ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6" />
                        Add {quantity} to Cart
                      </button>

                      {onARPreview && (
                        <button
                          onClick={() => onARPreview(product)}
                          className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-3.5 sm:py-4 rounded-xl font-semibold text-sm sm:text-base hover:shadow-xl transition-all flex items-center justify-center gap-2 sm:gap-3 shadow-lg active:scale-95 sm:hover:scale-105 duration-300"
                        >
                          <Camera className="w-4 h-4 sm:w-5 sm:h-5" />
                          Try AR Preview
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                <div className="glass-card p-4 sm:p-6 rounded-xl sm:rounded-2xl space-y-3 sm:space-y-4">
                  <h3 className="font-bold text-gray-900 text-base sm:text-lg flex items-center gap-2">
                    <Truck className="w-4 h-4 sm:w-5 sm:h-5 text-rose-500" />
                    Delivery Information
                  </h3>
                  <ul className="space-y-2.5 sm:space-y-3 text-sm sm:text-base text-gray-700">
                    <li className="flex items-start gap-2.5 sm:gap-3">
                      <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-rose-500 rounded-full mt-1.5 sm:mt-2 flex-shrink-0" />
                      <span>Free delivery on orders over LKR 5,000</span>
                    </li>
                    <li className="flex items-start gap-2.5 sm:gap-3">
                      <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-rose-500 rounded-full mt-1.5 sm:mt-2 flex-shrink-0" />
                      <span>Same-day delivery available in Colombo</span>
                    </li>
                    <li className="flex items-start gap-2.5 sm:gap-3">
                      <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-rose-500 rounded-full mt-1.5 sm:mt-2 flex-shrink-0" />
                      <span>Fresh flowers guaranteed with {product.freshness || '3-5 days'} vase life</span>
                    </li>
                    <li className="flex items-start gap-2.5 sm:gap-3">
                      <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-rose-500 rounded-full mt-1.5 sm:mt-2 flex-shrink-0" />
                      <span>Complete your order via WhatsApp for personalized service</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isLightboxOpen && (
        <div
          className="fixed inset-0 z-[60] bg-black/95 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-300"
          onClick={() => setIsLightboxOpen(false)}
        >
          <button
            onClick={() => setIsLightboxOpen(false)}
            className="absolute top-8 right-8 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-all z-10"
          >
            <X className="w-8 h-8 text-white" />
          </button>

          <div className="relative max-w-7xl w-full h-full flex items-center justify-center">
            <img
              src={product.images[currentImageIndex]}
              alt={product.title}
              className="max-w-full max-h-full object-contain rounded-2xl shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />

            {product.images.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    prevImage();
                  }}
                  className="absolute left-8 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm p-4 rounded-full hover:bg-white/30 transition-all shadow-lg"
                >
                  <ChevronLeft className="w-8 h-8 text-white" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    nextImage();
                  }}
                  className="absolute right-8 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm p-4 rounded-full hover:bg-white/30 transition-all shadow-lg"
                >
                  <ChevronRight className="w-8 h-8 text-white" />
                </button>
              </>
            )}
          </div>

          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
            {product.images.map((_, index) => (
              <button
                key={index}
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentImageIndex(index);
                }}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentImageIndex
                    ? 'bg-white w-8'
                    : 'bg-white/40 hover:bg-white/60'
                }`}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
};
