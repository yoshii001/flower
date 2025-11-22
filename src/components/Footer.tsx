import { Link } from 'react-router-dom';
import { Flower2, Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Twitter, href: '#', label: 'Twitter' },
  ];

  return (
    <footer className="bg-gradient-to-b from-rose-50 to-cream-100 border-t border-rose-100 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <Flower2 className="w-8 h-8 text-rose-500" />
              <span className="text-xl font-serif font-bold text-rose-600">
                Blossom Haven
              </span>
            </Link>
            <p className="text-gray-600 text-sm leading-relaxed">
              Where Every Flower Tells a Story. Premium floral arrangements crafted with love and care.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-rose-500 hover:bg-rose-500 hover:text-white transition-colors duration-300 shadow-md"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-serif font-semibold text-lg text-gray-800 mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {['Home', 'Shop', 'About', 'Contact'].map((item) => (
                <li key={item}>
                  <Link
                    to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                    className="text-gray-600 hover:text-rose-500 transition-colors duration-300 text-sm"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-serif font-semibold text-lg text-gray-800 mb-4">Categories</h3>
            <ul className="space-y-2">
              {['Roses', 'Bouquets', 'Gifts', 'Decorations'].map((category) => (
                <li key={category}>
                  <Link
                    to="/shop"
                    className="text-gray-600 hover:text-rose-500 transition-colors duration-300 text-sm"
                  >
                    {category}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-serif font-semibold text-lg text-gray-800 mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3 text-gray-600 text-sm">
                <MapPin className="w-5 h-5 text-rose-500 flex-shrink-0 mt-0.5" />
                <span>123 Garden Street, Floral District, CA 90210</span>
              </li>
              <li className="flex items-center space-x-3 text-gray-600 text-sm">
                <Phone className="w-5 h-5 text-rose-500 flex-shrink-0" />
                <span>(555) 123-4567</span>
              </li>
              <li className="flex items-center space-x-3 text-gray-600 text-sm">
                <Mail className="w-5 h-5 text-rose-500 flex-shrink-0" />
                <span>hello@blossomhaven.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-rose-200 pt-8 mt-8 text-center">
          <p className="text-gray-600 text-sm">
            © {currentYear} Blossom Haven. All rights reserved. Crafted with love.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
