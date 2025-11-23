import { useState } from 'react';
import { Flower2, Heart, Instagram, Facebook, Mail, Phone, MapPin } from 'lucide-react';
import { InfoModal } from './InfoModal';
import { AboutUs } from './AboutUs';
import { DeliveryInfo } from './DeliveryInfo';
import { FAQs } from './FAQs';

type ModalContent = 'about' | 'delivery' | 'faqs' | null;

export const ModernFooter = () => {
  const [openModal, setOpenModal] = useState<ModalContent>(null);

  const handleLinkClick = (section: string) => {
    if (section === 'Shop') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (section === 'About Us') {
      setOpenModal('about');
    } else if (section === 'Delivery Info') {
      setOpenModal('delivery');
    } else if (section === 'FAQs') {
      setOpenModal('faqs');
    }
  };

  return (
    <>
      <footer className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-rose-950 to-gray-900 text-white py-12 sm:py-16 md:py-20">
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl blob-morph" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl blob-morph" style={{ animationDelay: '3s' }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 sm:gap-10 md:gap-12 mb-10 sm:mb-12 md:mb-16">
            <div className="md:col-span-1">
              <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                <Flower2 className="w-8 h-8 sm:w-10 sm:h-10 text-rose-400" />
                <span className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-rose-400 to-pink-400 bg-clip-text text-transparent">
                  Bloomora
                </span>
              </div>
              <p className="text-sm sm:text-base text-gray-300 leading-relaxed mb-4 sm:mb-6">
                Bringing the enchantment of nature's finest blooms to your doorstep across Sri Lanka.
              </p>
              <div className="flex gap-3">
                <a
                  href="#"
                  className="p-3 glass-card rounded-full text-rose-400 hover:text-white hover:bg-gradient-to-r hover:from-rose-500 hover:to-pink-500 transition-all duration-300 hover:scale-110"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="p-3 glass-card rounded-full text-rose-400 hover:text-white hover:bg-gradient-to-r hover:from-rose-500 hover:to-pink-500 transition-all duration-300 hover:scale-110"
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a
                  href="mailto:hello@bloomora.lk"
                  className="p-3 glass-card rounded-full text-rose-400 hover:text-white hover:bg-gradient-to-r hover:from-rose-500 hover:to-pink-500 transition-all duration-300 hover:scale-110"
                >
                  <Mail className="w-5 h-5" />
                </a>
              </div>
            </div>

            <div>
              <h4 className="font-bold text-base sm:text-lg mb-4 sm:mb-6 text-white">Quick Links</h4>
              <ul className="space-y-3">
                {['Shop', 'About Us', 'Delivery Info', 'FAQs'].map((item) => (
                  <li key={item}>
                    <button
                      onClick={() => handleLinkClick(item)}
                      className="text-gray-300 hover:text-rose-400 transition-colors flex items-center gap-2 group"
                    >
                      <span className="w-0 group-hover:w-2 h-0.5 bg-rose-400 transition-all duration-300" />
                      {item}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

          <div>
            <h4 className="font-bold text-base sm:text-lg mb-4 sm:mb-6 text-white">Contact Us</h4>
            <ul className="space-y-3 sm:space-y-4 text-sm sm:text-base text-gray-300">
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-rose-400 mt-0.5 flex-shrink-0" />
                <span>+94 70 123 4567</span>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-rose-400 mt-0.5 flex-shrink-0" />
                <span>hello@bloomora.lk</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-rose-400 mt-0.5 flex-shrink-0" />
                <span>Colombo, Sri Lanka</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-base sm:text-lg mb-4 sm:mb-6 text-white">Delivery Areas</h4>
            <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base text-gray-300">
              {['Colombo', 'Gampaha', 'Kandy', 'Galle', 'Surrounding Areas'].map((area) => (
                <li key={area} className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-rose-400 rounded-full" />
                  {area}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-6 sm:pt-8 border-t border-gray-800">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
            <p className="text-gray-400 text-sm flex items-center gap-2">
              Made with <Heart className="w-4 h-4 text-rose-400 fill-current" /> by Bloomora Team
            </p>
            <p className="text-gray-400 text-sm">
              &copy; {new Date().getFullYear()} Bloomora. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-gray-400 hover:text-rose-400 transition-colors text-sm">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-rose-400 transition-colors text-sm">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>

    <InfoModal
      isOpen={openModal === 'about'}
      onClose={() => setOpenModal(null)}
      title="About Bloomora"
    >
      <AboutUs />
    </InfoModal>

    <InfoModal
      isOpen={openModal === 'delivery'}
      onClose={() => setOpenModal(null)}
      title="Delivery Information"
    >
      <DeliveryInfo />
    </InfoModal>

    <InfoModal
      isOpen={openModal === 'faqs'}
      onClose={() => setOpenModal(null)}
      title="Frequently Asked Questions"
    >
      <FAQs />
    </InfoModal>
  </>
  );
};
