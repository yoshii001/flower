import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Sarah Mitchell',
    role: 'Wedding Client',
    content: 'Blossom Haven made our wedding day absolutely magical. Every arrangement was breathtaking, and the attention to detail was remarkable. Our guests are still talking about the beautiful flowers!',
    rating: 5,
    image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=200'
  },
  {
    name: 'Michael Chen',
    role: 'Corporate Client',
    content: 'We trust Blossom Haven for all our office events. Their contemporary designs and reliable service have made them our go-to florist. Professional, creative, and always on time.',
    rating: 5,
    image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=200'
  },
  {
    name: 'Emma Rodriguez',
    role: 'Regular Customer',
    content: 'I order flowers from Blossom Haven every month, and each bouquet is more stunning than the last. The quality is consistently exceptional, and the arrangements always bring joy to my home.',
    rating: 5,
    image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200'
  }
];

export default function Testimonials() {
  return (
    <section className="py-24 bg-gradient-to-b from-rose-50/30 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-light text-gray-800 mb-4">
            What Our <span className="italic text-rose-500">Customers</span> Say
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto font-light">
            Don't just take our word for it – hear from those who've experienced our floral artistry
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 relative"
            >
              <Quote className="absolute top-6 right-6 w-12 h-12 text-rose-100" />

              <div className="relative">
                <div className="flex items-center mb-6">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover mr-4 border-2 border-rose-100"
                  />
                  <div>
                    <h3 className="font-light text-lg text-gray-800">
                      {testimonial.name}
                    </h3>
                    <p className="text-sm text-gray-500 font-light">
                      {testimonial.role}
                    </p>
                  </div>
                </div>

                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 fill-rose-400 text-rose-400"
                    />
                  ))}
                </div>

                <p className="text-gray-600 font-light leading-relaxed">
                  "{testimonial.content}"
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-gradient-to-r from-rose-500 to-pink-500 rounded-3xl p-12 text-center text-white">
          <h3 className="text-3xl md:text-4xl font-light mb-4">
            Subscribe to Our Newsletter
          </h3>
          <p className="text-lg font-light mb-8 text-white/90">
            Get exclusive offers, floral care tips, and be the first to know about new collections
          </p>
          <div className="max-w-md mx-auto flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-4 rounded-full text-gray-800 font-light focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button className="bg-white text-rose-500 px-8 py-4 rounded-full font-light hover:bg-gray-50 transition-colors duration-300 shadow-lg">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
