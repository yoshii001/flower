import { useState, useEffect, useRef } from 'react';
import { ArrowRight, Heart } from 'lucide-react';

interface HeroProps {
  onShopNowClick: () => void;
}

const FloralSVG = ({ style }: { style: React.CSSProperties }) => (
  <svg
    width="120"
    height="120"
    viewBox="0 0 120 120"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={style}
    className="opacity-40"
  >
    <circle cx="60" cy="60" r="8" fill="#f472b6" />
    <circle cx="60" cy="30" r="6" fill="#fbcfe8" />
    <circle cx="85" cy="40" r="6" fill="#fbcfe8" />
    <circle cx="90" cy="65" r="6" fill="#fbcfe8" />
    <circle cx="85" cy="90" r="6" fill="#fbcfe8" />
    <circle cx="60" cy="100" r="6" fill="#fbcfe8" />
    <circle cx="35" cy="90" r="6" fill="#fbcfe8" />
    <circle cx="30" cy="65" r="6" fill="#fbcfe8" />
    <circle cx="35" cy="40" r="6" fill="#fbcfe8" />
  </svg>
);

export const Hero = ({ onShopNowClick }: HeroProps) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollPosition, setScrollPosition] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePosition({
          x: (e.clientX - rect.left) / rect.width - 0.5,
          y: (e.clientY - rect.top) / rect.height - 0.5,
        });
      }
    };

    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const parallaxOffset = {
    video: scrollPosition * 0.5,
    overlay: scrollPosition * 0.3,
    flowers: scrollPosition * 0.15,
  };

  const mouseParallax = {
    x: mousePosition.x * 20,
    y: mousePosition.y * 20,
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden parallax-container"
    >
      {/* Video Background Layer */}
      <div
        className="absolute inset-0"
        style={{
          transform: `translateY(${parallaxOffset.video}px)`,
        }}
      >
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="hero-video w-full h-full object-cover"
          poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 600'%3E%3Crect fill='%23fce7f3' width='1200' height='600'/%3E%3C/svg%3E"
        >
          <source
            src="data:video/mp4;base64,AAAAIGZ0eXBpc29tAAACAGlzb21pc28yYXZjMW1wNDEAAAAIZnJlZQAACKCQRQAA"
            type="video/mp4"
          />
        </video>

        {/* Fallback Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-rose-200 via-pink-100 to-red-100" />

        {/* Ken Burns Animation Overlay */}
        <div
          className="absolute inset-0 hero-video"
          style={{
            background:
              'radial-gradient(ellipse at 50% 50%, rgba(244, 63, 94, 0.1) 0%, rgba(244, 63, 94, 0.3) 100%)',
          }}
        />
      </div>

      {/* Mid-wash Pastel Overlay */}
      <div
        className="absolute inset-0 grain-overlay"
        style={{
          transform: `translateY(${parallaxOffset.overlay}px)`,
          background:
            'linear-gradient(135deg, rgba(244, 63, 94, 0.05) 0%, rgba(236, 72, 153, 0.05) 50%, rgba(244, 63, 94, 0.05) 100%)',
        }}
      />

      {/* Foreground Floral SVG Layer */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          transform: `translateY(${parallaxOffset.flowers}px) translateX(${mouseParallax.x}px) translateY(${mouseParallax.y}px)`,
        }}
      >
        <FloralSVG
          style={{
            position: 'absolute',
            top: '10%',
            left: '5%',
            animation: 'float 6s ease-in-out infinite',
          }}
        />
        <FloralSVG
          style={{
            position: 'absolute',
            top: '20%',
            right: '8%',
            animation: 'float 7s ease-in-out infinite 0.5s',
          }}
        />
        <FloralSVG
          style={{
            position: 'absolute',
            bottom: '15%',
            left: '10%',
            animation: 'float 8s ease-in-out infinite 1s',
          }}
        />
        <FloralSVG
          style={{
            position: 'absolute',
            bottom: '10%',
            right: '5%',
            animation: 'float 6.5s ease-in-out infinite 0.3s',
          }}
        />
      </div>

      {/* Vignette Effect */}
      <div className="absolute inset-0 vignette pointer-events-none" />

      {/* Content Layer */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Tagline */}
          <div className="hero-tagline mb-6">
            <span className="inline-block px-4 py-2 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-sm font-medium">
              ✨ Handpicked with Love
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="hero-tagline text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 drop-shadow-lg">
            Fresh Flowers
            <span className="block mt-3 bg-gradient-to-r from-rose-200 to-pink-200 bg-clip-text text-transparent">
              Delivered to Your Doorstep
            </span>
          </h1>

          {/* Description */}
          <p className="hero-tagline text-lg sm:text-xl text-white/90 mb-10 max-w-2xl mx-auto drop-shadow-md leading-relaxed">
            Handpicked bouquets crafted with love. Perfect for every occasion,
            delivered across Sri Lanka with the freshness guaranteed.
          </p>

          {/* CTA Buttons */}
          <div className="hero-cta flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={onShopNowClick}
              className="cta-button group relative px-8 py-4 bg-rose-500 text-white font-semibold rounded-lg flex items-center gap-2"
            >
              Shop Now
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>

            <button className="cta-button relative px-8 py-4 bg-white/20 backdrop-blur-md text-white font-semibold rounded-lg border border-white/30 hover:bg-white/30 flex items-center gap-2 transition-colors">
              <Heart className="w-5 h-5" />
              Explore Favorites
            </button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce pointer-events-none">
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
    </div>
  );
};
