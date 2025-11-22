import { motion } from 'framer-motion';
import { Heart, Award, Users, Sparkles, Leaf, Truck } from 'lucide-react';

const About = () => {
  const values = [
    {
      icon: Heart,
      title: 'Passion for Flowers',
      description: 'Every arrangement is crafted with love and attention to detail',
    },
    {
      icon: Award,
      title: 'Premium Quality',
      description: 'We source only the freshest, highest-quality blooms',
    },
    {
      icon: Users,
      title: 'Customer First',
      description: 'Your satisfaction is our top priority',
    },
    {
      icon: Leaf,
      title: 'Sustainable',
      description: 'Eco-friendly practices in everything we do',
    },
    {
      icon: Sparkles,
      title: 'Creative Excellence',
      description: 'Unique designs that stand out from the ordinary',
    },
    {
      icon: Truck,
      title: 'Reliable Delivery',
      description: 'Fresh flowers delivered on time, every time',
    },
  ];

  return (
    <div className="min-h-screen pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-gray-800 mb-6">
            Our Story
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Where passion meets petals, and every bloom tells a story
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="https://images.pexels.com/photos/1070945/pexels-photo-1070945.jpeg?auto=compress&cs=tinysrgb&w=1200"
                alt="Florist at work"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-rose-100 rounded-3xl -z-10" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col justify-center space-y-6"
          >
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-800">
              Welcome to Blossom Haven
            </h2>
            <p className="text-gray-700 leading-relaxed text-lg">
              Founded in 2010, Blossom Haven began as a small neighborhood flower shop with
              a simple mission: to bring joy and beauty into people's lives through the art
              of floral design.
            </p>
            <p className="text-gray-700 leading-relaxed text-lg">
              Over the years, we've grown into a beloved boutique known for our creative
              arrangements, exceptional quality, and personalized service. Our team of
              passionate florists handpicks every bloom, ensuring that each arrangement
              exceeds your expectations.
            </p>
            <p className="text-gray-700 leading-relaxed text-lg">
              Today, we're proud to serve our community with the same dedication and love
              that inspired us from day one. Every flower we arrange carries our commitment
              to excellence and our passion for creating moments that matter.
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-800 text-center mb-12">
            Why Choose Us?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-rose-100 to-rose-200 rounded-2xl flex items-center justify-center mb-6">
                  <value.icon className="w-8 h-8 text-rose-600" />
                </div>
                <h3 className="text-xl font-serif font-semibold text-gray-800 mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-rose-500 to-rose-600 rounded-3xl p-12 text-center text-white"
        >
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
            Let's Create Something Beautiful Together
          </h2>
          <p className="text-rose-100 text-lg mb-8 max-w-2xl mx-auto">
            Whether it's a special occasion or just because, we're here to help you express
            your feelings through the language of flowers.
          </p>
          <motion.a
            href="/contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block bg-white text-rose-500 px-10 py-4 rounded-full font-semibold hover:bg-rose-50 transition-all duration-300 shadow-lg"
          >
            Get in Touch
          </motion.a>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
