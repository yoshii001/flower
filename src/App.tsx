import { useState, useEffect } from 'react';
import { Product } from './types';
import { ModernHeader } from './components/ModernHeader';
import { ModernHero } from './components/ModernHero';
import { ModernFeatured } from './components/ModernFeatured';
import { ModernShop } from './components/ModernShop';
import { ProductDetail } from './components/ProductDetail';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutForm } from './components/CheckoutForm';
import { PetalRain } from './components/PetalRain';
import { ModernFooter } from './components/ModernFooter';
import { ARPreview } from './components/ARPreview';
import { BouquetBuilder } from './components/BouquetBuilder';
import { CartProvider } from './context/CartContext';
import { SeasonalThemeProvider } from './contexts/SeasonalThemeContext';
import { FavoritesProvider } from './contexts/FavoritesContext';
import { useMoodLighting } from './hooks/useMoodLighting';

type View = 'home' | 'shop' | 'favorites';

function AppContent() {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentView, setCurrentView] = useState<View>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [arProduct, setArProduct] = useState<Product | null>(null);
  const [isBouquetBuilderOpen, setIsBouquetBuilderOpen] = useState(false);
  const { colors } = useMoodLighting();

  useEffect(() => {
    fetch('/products.json')
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error('Failed to load products:', err));
  }, []);

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
  };

  const handleShopNowClick = () => {
    setCurrentView('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigate = (view: View) => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleDiscoverMore = () => {
    const featuredSection = document.querySelector('[data-featured-section]');
    if (featuredSection) {
      featuredSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen smooth-scroll transition-colors duration-1000" style={{
      background: `linear-gradient(to bottom, ${colors.glow}, rgba(255, 255, 255, 0.95))`
    }}>
        <PetalRain />

        <ModernHeader
          onCartClick={() => setIsCartOpen(true)}
          currentView={currentView}
          onNavigate={handleNavigate}
          onBouquetBuilderClick={() => setIsBouquetBuilderOpen(true)}
        />

        {currentView === 'home' && (
          <>
            <ModernHero
              onShopNowClick={handleShopNowClick}
              onDiscoverMore={handleDiscoverMore}
              onBouquetBuilderClick={() => setIsBouquetBuilderOpen(true)}
            />
            <ModernFeatured
              products={products}
              onProductClick={handleProductClick}
              onViewAll={handleShopNowClick}
            />
          </>
        )}

        {currentView === 'shop' && (
          <div className="pt-20">
            <ModernShop products={products} onProductClick={handleProductClick} />
          </div>
        )}

        {currentView === 'favorites' && (
          <div className="pt-20">
            <ModernShop
              products={products}
              onProductClick={handleProductClick}
              showFavoritesOnly={true}
            />
          </div>
        )}

        {selectedProduct && (
          <ProductDetail
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
            onARPreview={(product) => {
              setSelectedProduct(null);
              setArProduct(product);
            }}
          />
        )}

        {arProduct && (
          <ARPreview
            product={arProduct}
            onClose={() => setArProduct(null)}
          />
        )}

        <CartDrawer
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          onCheckout={handleCheckout}
        />

        {isCheckoutOpen && (
          <CheckoutForm onClose={() => setIsCheckoutOpen(false)} />
        )}

        {isBouquetBuilderOpen && (
          <BouquetBuilder onClose={() => setIsBouquetBuilderOpen(false)} />
        )}

        <ModernFooter />
    </div>
  );
}

function App() {
  return (
    <SeasonalThemeProvider>
      <FavoritesProvider>
        <CartProvider>
          <AppContent />
        </CartProvider>
      </FavoritesProvider>
    </SeasonalThemeProvider>
  );
}

export default App;
