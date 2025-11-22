import { ArrowRight, Sparkles } from 'lucide-react';

export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      <div className="absolute inset-0 bg-gradient-to-br from-rose-50 via-pink-50 to-orange-50"></div>

      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-rose-300 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-orange-200 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
        <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full mb-8 shadow-sm">
          <Sparkles className="w-4 h-4 text-rose-500" />
          <span className="text-sm text-gray-600 font-light">Freshly Handpicked Daily</span>
        </div>

        <h1 className="text-5xl md:text-7xl lg:text-8xl font-light text-gray-800 mb-6 tracking-tight">
          Where Every Bloom
          <br />
          <span className="text-rose-500 font-extralight italic">Tells a Story</span>
        </h1>

        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-12 font-light leading-relaxed">
          Experience the art of floral design with our curated collection of premium flowers.
          Each arrangement is crafted to evoke emotions and create lasting memories.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button className="group bg-rose-500 hover:bg-rose-600 text-white px-8 py-4 rounded-full font-light text-lg transition-all duration-300 shadow-lg hover:shadow-xl flex items-center space-x-2">
            <span>Explore Collections</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          <button className="bg-white hover:bg-gray-50 text-gray-800 px-8 py-4 rounded-full font-light text-lg transition-all duration-300 shadow-md hover:shadow-lg border border-gray-200">
            Custom Arrangements
          </button>
        </div>

        <div className="mt-20 grid grid-cols-3 gap-8 max-w-3xl mx-auto">
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-light text-rose-500 mb-2">500+</div>
            <div className="text-sm text-gray-600 font-light">Happy Customers</div>
          </div>
          <div className="text-center border-x border-gray-200">
            <div className="text-3xl md:text-4xl font-light text-rose-500 mb-2">100%</div>
            <div className="text-sm text-gray-600 font-light">Fresh Guarantee</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-light text-rose-500 mb-2">24/7</div>
            <div className="text-sm text-gray-600 font-light">Delivery Service</div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent"></div>
    </section>
  );
}
