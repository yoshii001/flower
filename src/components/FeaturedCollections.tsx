import { Heart, Gift, Sparkles, Leaf } from 'lucide-react';

const collections = [
  {
    icon: Heart,
    title: 'Romantic',
    description: 'Express your deepest feelings with our passionate red roses and elegant arrangements',
    color: 'rose',
    bgGradient: 'from-rose-100 to-pink-100',
    iconColor: 'text-rose-500',
    hoverColor: 'hover:border-rose-300'
  },
  {
    icon: Gift,
    title: 'Celebration',
    description: 'Make every moment special with vibrant bouquets designed for joy and festivities',
    color: 'amber',
    bgGradient: 'from-amber-100 to-orange-100',
    iconColor: 'text-amber-500',
    hoverColor: 'hover:border-amber-300'
  },
  {
    icon: Sparkles,
    title: 'Luxury',
    description: 'Premium exotic flowers and sophisticated designs for the distinguished taste',
    color: 'purple',
    bgGradient: 'from-violet-100 to-purple-100',
    iconColor: 'text-violet-500',
    hoverColor: 'hover:border-violet-300'
  },
  {
    icon: Leaf,
    title: 'Natural',
    description: 'Embrace organic beauty with wildflowers and sustainable arrangements',
    color: 'emerald',
    bgGradient: 'from-emerald-100 to-green-100',
    iconColor: 'text-emerald-500',
    hoverColor: 'hover:border-emerald-300'
  }
];

export default function FeaturedCollections() {
  return (
    <section id="collections" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-light text-gray-800 mb-4">
            Our <span className="italic text-rose-500">Signature</span> Collections
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto font-light">
            Discover curated collections designed to capture every emotion and occasion
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {collections.map((collection, index) => {
            const Icon = collection.icon;
            return (
              <div
                key={index}
                className={`group relative bg-gradient-to-br ${collection.bgGradient} rounded-3xl p-8 border-2 border-transparent ${collection.hoverColor} transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 cursor-pointer`}
              >
                <div className="mb-6">
                  <div className={`w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className={`w-8 h-8 ${collection.iconColor}`} strokeWidth={1.5} />
                  </div>
                </div>

                <h3 className="text-2xl font-light text-gray-800 mb-3">
                  {collection.title}
                </h3>

                <p className="text-gray-600 font-light leading-relaxed">
                  {collection.description}
                </p>

                <div className="mt-6 flex items-center text-sm font-light text-gray-700 group-hover:text-gray-900 transition-colors">
                  <span>Explore Collection</span>
                  <svg
                    className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform duration-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
