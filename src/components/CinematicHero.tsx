import { ArrowRight, Sparkles } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

export default function CinematicHero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        setMousePosition({
          x: (e.clientX - rect.left - rect.width / 2) / rect.width,
          y: (e.clientY - rect.top - rect.height / 2) / rect.height,
        });
      }
    };

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section
      ref={heroRef}
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      <div
        className="absolute inset-0 z-0"
        style={{
          transform: `translateY(${scrollY * 0.5}px)`,
        }}
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover animate-ken-burns"
        >
          <source src="https://cdn.coverr.co/videos/coverr-pink-flower-field-6274/1080p.mp4" type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-gradient-to-br from-rose-100/40 via-pink-50/30 to-orange-100/40 backdrop-blur-[2px]"></div>
        <div className="absolute inset-0 vignette"></div>
        <div className="absolute inset-0 grain-overlay"></div>
      </div>

      <div
        className="absolute inset-0 z-10 pointer-events-none opacity-20"
        style={{
          transform: `translate(${mousePosition.x * 20}px, ${mousePosition.y * 20}px) translateY(${scrollY * 0.3}px)`,
        }}
      >
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <g opacity="0.6">
            <path d="M150,100 Q160,80 170,100 Q180,120 170,140 Q160,160 150,140 Q140,120 150,100" fill="#fb7185" className="flower-petal"/>
            <circle cx="160" cy="120" r="8" fill="#fda4af"/>
          </g>
          <g opacity="0.5" transform="translate(300, 200)">
            <path d="M0,0 Q10,-20 20,0 Q30,20 20,40 Q10,60 0,40 Q-10,20 0,0" fill="#fdba74" className="flower-petal"/>
            <circle cx="10" cy="20" r="6" fill="#fed7aa"/>
          </g>
          <g opacity="0.4" transform="translate(800, 150)">
            <path d="M0,0 Q15,-25 30,0 Q45,25 30,50 Q15,75 0,50 Q-15,25 0,0" fill="#f9a8d4" className="flower-petal"/>
            <circle cx="15" cy="25" r="10" fill="#fbcfe8"/>
          </g>
          <g opacity="0.6" transform="translate(1200, 400)">
            <path d="M0,0 Q12,-22 24,0 Q36,22 24,44 Q12,66 0,44 Q-12,22 0,0" fill="#fca5a5" className="flower-petal"/>
            <circle cx="12" cy="22" r="8" fill="#fecaca"/>
          </g>
        </svg>
      </div>

      <div
        className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center"
        style={{
          transform: `translateY(${scrollY * 0.15}px)`,
        }}
      >
        <div
          className="inline-flex items-center space-x-2 glass-card px-4 py-2 rounded-full mb-8 shadow-lg border border-white/30"
          style={{
            transform: `translateX(${mousePosition.x * -5}px)`,
          }}
        >
          <Sparkles className="w-4 h-4 text-rose-600" />
          <span className="text-sm text-gray-800 font-light">Freshly Handpicked Daily</span>
        </div>

        <h1 className="text-5xl md:text-7xl lg:text-8xl font-light text-gray-900 mb-6 tracking-tight drop-shadow-lg">
          Where Every Bloom
          <br />
          <span className="text-rose-600 font-extralight italic">Tells a Story</span>
        </h1>

        <p className="text-lg md:text-xl text-gray-800 max-w-2xl mx-auto mb-12 font-light leading-relaxed drop-shadow-md">
          Experience the art of floral design with our curated collection of premium flowers.
          Each arrangement is crafted to evoke emotions and create lasting memories.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            className="group gold-gradient text-white px-8 py-4 rounded-full font-light text-lg transition-all duration-300 shadow-xl hover:shadow-2xl flex items-center space-x-2 hover:scale-105"
            style={{
              transform: `translateY(${mousePosition.y * -3}px)`,
            }}
          >
            <span>Explore Collections</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          <button
            className="glass-card text-gray-900 px-8 py-4 rounded-full font-light text-lg transition-all duration-300 shadow-xl hover:shadow-2xl border border-white/30 hover:scale-105"
            style={{
              transform: `translateY(${mousePosition.y * 3}px)`,
            }}
          >
            Custom Arrangements
          </button>
        </div>

        <div className="mt-20 grid grid-cols-3 gap-8 max-w-3xl mx-auto">
          <div className="text-center glass-card p-6 rounded-2xl border border-white/30 hover:scale-105 transition-transform duration-300">
            <div className="text-3xl md:text-4xl font-light gold-text mb-2">500+</div>
            <div className="text-sm text-gray-800 font-light">Happy Customers</div>
          </div>
          <div className="text-center glass-card p-6 rounded-2xl border border-white/30 hover:scale-105 transition-transform duration-300">
            <div className="text-3xl md:text-4xl font-light gold-text mb-2">100%</div>
            <div className="text-sm text-gray-800 font-light">Fresh Guarantee</div>
          </div>
          <div className="text-center glass-card p-6 rounded-2xl border border-white/30 hover:scale-105 transition-transform duration-300">
            <div className="text-3xl md:text-4xl font-light gold-text mb-2">24/7</div>
            <div className="text-sm text-gray-800 font-light">Delivery Service</div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent z-30"></div>
    </section>
  );
}
