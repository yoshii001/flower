import { Flower2, Instagram, Facebook, Twitter, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer id="contact" className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <Flower2 className="w-8 h-8 text-rose-400" strokeWidth={1.5} />
              <span className="text-2xl font-light tracking-wider text-white">
                Blossom Haven
              </span>
            </div>
            <p className="font-light leading-relaxed mb-6">
              Creating beautiful moments through the art of flowers. Every bloom tells a story,
              every arrangement speaks from the heart.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 hover:bg-rose-500 rounded-full flex items-center justify-center transition-colors duration-300"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 hover:bg-rose-500 rounded-full flex items-center justify-center transition-colors duration-300"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 hover:bg-rose-500 rounded-full flex items-center justify-center transition-colors duration-300"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-white text-lg font-light mb-6">Quick Links</h3>
            <ul className="space-y-3 font-light">
              <li>
                <a href="#home" className="hover:text-rose-400 transition-colors duration-300">
                  Home
                </a>
              </li>
              <li>
                <a href="#collections" className="hover:text-rose-400 transition-colors duration-300">
                  Collections
                </a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-rose-400 transition-colors duration-300">
                  Shop
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-rose-400 transition-colors duration-300">
                  Our Story
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-rose-400 transition-colors duration-300">
                  Blog
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white text-lg font-light mb-6">Services</h3>
            <ul className="space-y-3 font-light">
              <li>
                <a href="#" className="hover:text-rose-400 transition-colors duration-300">
                  Wedding Flowers
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-rose-400 transition-colors duration-300">
                  Corporate Events
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-rose-400 transition-colors duration-300">
                  Custom Arrangements
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-rose-400 transition-colors duration-300">
                  Subscription Service
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-rose-400 transition-colors duration-300">
                  Gift Cards
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white text-lg font-light mb-6">Contact Us</h3>
            <ul className="space-y-4 font-light">
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-rose-400 mt-1 flex-shrink-0" />
                <span>123 Flower Street, Garden District, NY 10001</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-rose-400 flex-shrink-0" />
                <span>(555) 123-4567</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-rose-400 flex-shrink-0" />
                <span>hello@blossomhaven.com</span>
              </li>
            </ul>
            <div className="mt-6">
              <p className="text-sm mb-2">Open Hours:</p>
              <p className="text-sm font-light">Mon - Sat: 9:00 AM - 7:00 PM</p>
              <p className="text-sm font-light">Sunday: 10:00 AM - 5:00 PM</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm font-light">
              © 2024 Blossom Haven. All rights reserved. Crafted with love.
            </p>
            <div className="flex space-x-6 text-sm font-light">
              <a href="#" className="hover:text-rose-400 transition-colors duration-300">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-rose-400 transition-colors duration-300">
                Terms of Service
              </a>
              <a href="#" className="hover:text-rose-400 transition-colors duration-300">
                Shipping Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
