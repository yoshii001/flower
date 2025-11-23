import { useState, useEffect, useRef } from 'react';
import { Sparkles, ArrowRight, Palette } from 'lucide-react';
import { useSeasonalTheme } from '../contexts/SeasonalThemeContext';

interface ModernHeroProps {
  onShopNowClick: () => void;
  onDiscoverMore: () => void;
  onBouquetBuilderClick?: () => void;
}

export const ModernHero = ({ onShopNowClick, onDiscoverMore, onBouquetBuilderClick }: ModernHeroProps) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLDivElement>(null);
  const { config } = useSeasonalTheme();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        setMousePosition({
          x: (e.clientX - rect.left - rect.width / 2) / 20,
          y: (e.clientY - rect.top - rect.height / 2) / 20,
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div ref={heroRef} className="relative overflow-hidden gradient-bg pt-24 sm:pt-32 pb-12 sm:pb-20">
      <div className="absolute inset-0">
        <div
          className="absolute top-20 left-10 w-64 h-64 sm:w-96 sm:h-96 bg-rose-300/30 rounded-full blur-3xl blob-morph"
          style={{
            transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
          }}
        />
        <div
          className="absolute bottom-20 right-10 w-64 h-64 sm:w-96 sm:h-96 bg-pink-300/30 rounded-full blur-3xl blob-morph"
          style={{
            transform: `translate(${-mousePosition.x}px, ${-mousePosition.y}px)`,
            animationDelay: '2s',
          }}
        />
        <div
          className="absolute top-1/2 left-1/2 w-64 h-64 sm:w-96 sm:h-96 bg-red-200/20 rounded-full blur-3xl blob-morph"
          style={{
            transform: `translate(-50%, -50%) translate(${mousePosition.x * 1.5}px, ${mousePosition.y * 1.5}px)`,
            animationDelay: '4s',
          }}
        />
      </div>

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute sparkle"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 min-h-[70vh] sm:min-h-[80vh] flex items-center justify-center px-4 sm:px-6">
        <div className="max-w-5xl mx-auto text-center">
          <div
            className="inline-block mb-4 sm:mb-6 bloom-in"
            style={{ animationDelay: '0.2s' }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 sm:px-6 sm:py-3 rounded-full glass-card text-rose-600 font-semibold text-xs sm:text-sm shadow-lg">
              <Sparkles className="w-3 h-3 sm:w-4 sm:h-4" />
              {config.tagline}
            </span>
          </div>

          <h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-bold mb-6 sm:mb-8 bloom-in px-2 leading-tight"
            style={{ animationDelay: '0.4s' }}
          >
            <span className="block text-gradient">{config.heroText}</span>
          </h1>

          <p
            className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-gray-700 mb-8 sm:mb-12 max-w-3xl mx-auto leading-relaxed bloom-in px-2"
            style={{ animationDelay: '0.6s' }}
          >
            Step into an enchanting world where every petal tells a story.
            Experience the magic of nature's finest creations, delivered with love.
          </p>

          <div
            className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-stretch sm:items-center bloom-in px-2"
            style={{ animationDelay: '0.8s' }}
          >
            <button
              onClick={onShopNowClick}
              className={`w-full sm:w-auto group relative px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 bg-gradient-to-r ${config.colors.primary} text-white font-bold text-sm sm:text-base md:text-lg rounded-full overflow-hidden shadow-2xl hover:shadow-rose-500/50 transition-all duration-300 hover:scale-105`}
            >
              <span className="relative z-10 flex items-center justify-center gap-2 sm:gap-3">
                Explore Collection
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 group-hover:translate-x-2 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-rose-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>

            {onBouquetBuilderClick && (
              <button
                onClick={onBouquetBuilderClick}
                className="w-full sm:w-auto group px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold text-sm sm:text-base md:text-lg rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
              >
                <span className="flex items-center justify-center gap-2 sm:gap-3">
                  <Palette className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 group-hover:rotate-12 transition-transform" />
                  Design Your Bouquet
                </span>
              </button>
            )}

            <button
              onClick={onDiscoverMore}
              className="w-full sm:w-auto group px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 glass-card text-gray-800 font-bold text-sm sm:text-base md:text-lg rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
            >
              <span className="flex items-center justify-center gap-2 sm:gap-3">
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 group-hover:rotate-12 transition-transform" />
                Discover More
              </span>
            </button>
          </div>

          <div className="mt-10 sm:mt-16 md:mt-20 grid grid-cols-3 gap-2 sm:gap-4 md:gap-6 lg:gap-8 max-w-2xl mx-auto px-2">
            {[
              { number: '500+', label: 'Happy Customers' },
              { number: '100%', label: 'Fresh Guarantee' },
              { number: '24/7', label: 'Support' },
            ].map((stat, i) => (
              <div
                key={i}
                className="bloom-in glass-card p-3 sm:p-4 md:p-6 rounded-xl sm:rounded-2xl"
                style={{ animationDelay: `${1 + i * 0.1}s` }}
              >
                <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-gradient mb-1 sm:mb-2">{stat.number}</div>
                <div className="text-xs sm:text-sm text-gray-700 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="relative z-10 flex justify-center py-4 sm:py-8">
        <div className="animate-bounce">
          <div className="w-5 h-8 sm:w-6 sm:h-10 border-2 border-gray-400 rounded-full flex items-start justify-center p-1.5 sm:p-2">
            <div className="w-1 h-1.5 sm:h-2 bg-gray-400 rounded-full animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
};
