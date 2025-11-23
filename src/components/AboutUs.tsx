import { Heart, Flower2, Truck, Award, Users, Sparkles } from 'lucide-react';

export const AboutUs = () => {
  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full glass-card text-rose-600 font-semibold text-sm shadow-lg mb-4">
          <Sparkles className="w-4 h-4" />
          Our Story
        </div>
        <p className="text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto">
          Welcome to Bloomora, where every petal tells a story and every bouquet is crafted with love.
          We are Sri Lanka's premier online flower delivery service, bringing nature's finest creations
          to your doorstep since 2020.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="glass-card p-6 rounded-2xl">
          <div className="w-12 h-12 bg-gradient-to-br from-rose-500 to-pink-500 rounded-xl flex items-center justify-center mb-4">
            <Heart className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-3">Our Mission</h3>
          <p className="text-gray-700 leading-relaxed">
            To spread joy and beauty through fresh, handpicked flowers while providing exceptional
            service that makes every occasion memorable. We believe flowers have the power to express
            emotions that words cannot.
          </p>
        </div>

        <div className="glass-card p-6 rounded-2xl">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mb-4">
            <Flower2 className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-3">Fresh & Quality</h3>
          <p className="text-gray-700 leading-relaxed">
            We source our flowers directly from trusted local and international growers, ensuring
            every bloom is fresh, vibrant, and long-lasting. Our expert florists carefully select
            and arrange each bouquet.
          </p>
        </div>

        <div className="glass-card p-6 rounded-2xl">
          <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mb-4">
            <Truck className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-3">Reliable Delivery</h3>
          <p className="text-gray-700 leading-relaxed">
            Same-day delivery available across Colombo and surrounding areas. We handle each
            arrangement with care, ensuring your flowers arrive in perfect condition, ready to
            brighten someone's day.
          </p>
        </div>

        <div className="glass-card p-6 rounded-2xl">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-4">
            <Award className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-3">Award-Winning Service</h3>
          <p className="text-gray-700 leading-relaxed">
            Recognized as one of Sri Lanka's top flower delivery services, with over 500 happy
            customers and countless memorable moments created. Your satisfaction is our priority.
          </p>
        </div>
      </div>

      <div className="glass-card p-8 rounded-2xl bg-gradient-to-br from-rose-50 to-pink-50">
        <div className="flex items-center gap-3 mb-4">
          <Users className="w-8 h-8 text-rose-500" />
          <h3 className="text-2xl font-bold text-gray-900">Why Choose Bloomora?</h3>
        </div>
        <ul className="space-y-3 text-gray-700">
          <li className="flex items-start gap-3">
            <div className="w-2 h-2 bg-rose-500 rounded-full mt-2 flex-shrink-0" />
            <span><strong>100% Freshness Guarantee:</strong> We stand behind the quality of every flower</span>
          </li>
          <li className="flex items-start gap-3">
            <div className="w-2 h-2 bg-rose-500 rounded-full mt-2 flex-shrink-0" />
            <span><strong>Expert Florists:</strong> Trained professionals who create stunning arrangements</span>
          </li>
          <li className="flex items-start gap-3">
            <div className="w-2 h-2 bg-rose-500 rounded-full mt-2 flex-shrink-0" />
            <span><strong>Same-Day Delivery:</strong> Order by 2 PM for same-day delivery in Colombo</span>
          </li>
          <li className="flex items-start gap-3">
            <div className="w-2 h-2 bg-rose-500 rounded-full mt-2 flex-shrink-0" />
            <span><strong>Eco-Friendly Packaging:</strong> Beautiful and sustainable wrapping materials</span>
          </li>
          <li className="flex items-start gap-3">
            <div className="w-2 h-2 bg-rose-500 rounded-full mt-2 flex-shrink-0" />
            <span><strong>Personalized Service:</strong> Custom arrangements and special requests welcome</span>
          </li>
          <li className="flex items-start gap-3">
            <div className="w-2 h-2 bg-rose-500 rounded-full mt-2 flex-shrink-0" />
            <span><strong>24/7 Support:</strong> Always here to help with your flower needs</span>
          </li>
        </ul>
      </div>

      <div className="text-center">
        <p className="text-gray-600 italic">
          "At Bloomora, we don't just deliver flowers - we deliver emotions, memories, and moments of pure joy."
        </p>
      </div>
    </div>
  );
};
