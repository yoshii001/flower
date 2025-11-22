import { Award, Truck, Heart, Users } from 'lucide-react';

const features = [
  {
    icon: Award,
    title: 'Premium Quality',
    description: 'Hand-selected flowers from the finest growers worldwide'
  },
  {
    icon: Truck,
    title: 'Fast Delivery',
    description: 'Same-day delivery available for all local orders'
  },
  {
    icon: Heart,
    title: 'Made with Love',
    description: 'Each arrangement crafted with passion and attention to detail'
  },
  {
    icon: Users,
    title: 'Expert Florists',
    description: 'Our team brings decades of floral design experience'
  }
];

export default function Story() {
  return (
    <section id="about" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-light text-gray-800 mb-6">
              Our <span className="italic text-rose-500">Passion</span> for Flowers
            </h2>
            <p className="text-lg text-gray-600 font-light leading-relaxed mb-6">
              Founded in the heart of the city, Blossom Haven began with a simple belief:
              flowers have the power to transform moments into memories. For over a decade,
              we've been connecting people through the universal language of flowers.
            </p>
            <p className="text-lg text-gray-600 font-light leading-relaxed mb-8">
              Every stem we choose, every petal we arrange, is selected with care to ensure
              your special moments are celebrated with the freshest, most beautiful blooms.
              We don't just sell flowers – we craft emotions.
            </p>
            <button className="bg-rose-500 hover:bg-rose-600 text-white px-8 py-4 rounded-full font-light text-lg transition-all duration-300 shadow-lg hover:shadow-xl">
              Learn More About Us
            </button>
          </div>

          <div className="relative">
            <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="https://images.pexels.com/photos/1458603/pexels-photo-1458603.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Florist at work"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-gradient-to-br from-rose-400 to-pink-400 rounded-3xl -z-10"></div>
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-gradient-to-br from-orange-300 to-rose-300 rounded-3xl -z-10"></div>
          </div>
        </div>

        <div className="mt-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="text-center p-6 rounded-2xl hover:bg-rose-50 transition-all duration-300"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-rose-100 to-pink-100 rounded-2xl mb-4">
                  <Icon className="w-8 h-8 text-rose-500" strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-light text-gray-800 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 font-light leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
