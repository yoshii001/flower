import { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

const faqs = [
  {
    category: 'Ordering',
    questions: [
      {
        q: 'How do I place an order?',
        a: 'Simply browse our collection, add items to your cart, proceed to checkout, and complete your order via WhatsApp. Our team will confirm your order and delivery details.'
      },
      {
        q: 'Can I customize my bouquet?',
        a: 'Yes! We offer custom arrangements. Add a note in the checkout form with your preferences, or contact us directly via WhatsApp for personalized consultation.'
      },
      {
        q: 'What payment methods do you accept?',
        a: 'We accept cash on delivery, bank transfers, and online payments. Payment details will be confirmed via WhatsApp after you place your order.'
      },
      {
        q: 'Can I order for same-day delivery?',
        a: 'Yes! Orders placed before 2:00 PM can be delivered the same day within Colombo and Gampaha areas, subject to availability.'
      }
    ]
  },
  {
    category: 'Delivery',
    questions: [
      {
        q: 'What areas do you deliver to?',
        a: 'We deliver across Sri Lanka. Same-day delivery is available in Colombo and Gampaha. Other areas may take 1-3 business days depending on location.'
      },
      {
        q: 'How much does delivery cost?',
        a: 'Standard delivery is LKR 250. Free delivery on orders over LKR 5,000. Express and midnight delivery options are available at additional charges.'
      },
      {
        q: 'Can I choose a specific delivery time?',
        a: 'Yes! We offer morning (9 AM-12 PM), afternoon (12 PM-3 PM), and evening (3 PM-6 PM) delivery slots. Let us know your preference in the checkout notes.'
      },
      {
        q: 'What if nobody is home during delivery?',
        a: 'Our delivery team will contact the recipient. If unavailable, we can leave the flowers in a safe location or reschedule delivery at no extra cost.'
      }
    ]
  },
  {
    category: 'Product Care',
    questions: [
      {
        q: 'How long will my flowers last?',
        a: 'With proper care, most flowers last 5-10 days. Orchids can last up to 14 days. We provide care instructions with every delivery.'
      },
      {
        q: 'How do I keep my flowers fresh?',
        a: 'Trim stems at an angle, change water daily, keep away from direct sunlight and heat, and remove wilted petals. Detailed care instructions are included with your delivery.'
      },
      {
        q: 'What if my flowers arrive damaged?',
        a: 'We have a 100% freshness guarantee. If flowers arrive damaged or wilted, contact us immediately with photos and we will replace them at no cost.'
      },
      {
        q: 'Are the flowers locally sourced?',
        a: 'We source from both local Sri Lankan growers and premium international suppliers to ensure the best quality and variety for our customers.'
      }
    ]
  },
  {
    category: 'Special Occasions',
    questions: [
      {
        q: 'Do you offer bouquets for weddings?',
        a: 'Yes! We specialize in wedding florals including bridal bouquets, centerpieces, and venue decorations. Contact us for a consultation and custom quote.'
      },
      {
        q: 'Can I send flowers as a surprise?',
        a: 'Absolutely! Just provide the recipient\'s delivery address and contact number. We can coordinate delivery without revealing the sender if requested.'
      },
      {
        q: 'Do you have seasonal or themed arrangements?',
        a: 'Yes! We offer seasonal themes including Valentine\'s Day, Christmas, and wedding collections with special arrangements and pricing.'
      },
      {
        q: 'Can I include a greeting card?',
        a: 'Yes! A complimentary greeting card is included with every order. Just add your message in the checkout notes and we\'ll handwrite it for you.'
      }
    ]
  },
  {
    category: 'Returns & Support',
    questions: [
      {
        q: 'What is your return policy?',
        a: 'Due to the perishable nature of flowers, we cannot accept returns. However, we guarantee freshness and will replace any flowers that don\'t meet our quality standards.'
      },
      {
        q: 'How do I contact customer support?',
        a: 'Contact us via WhatsApp at +94 70 123 4567, email at hello@bloomora.lk, or call us directly. We\'re available 24/7 to assist you.'
      },
      {
        q: 'Can I cancel or modify my order?',
        a: 'Yes, you can cancel or modify your order by contacting us via WhatsApp before the delivery is dispatched. Full refund available for cancellations made 24 hours before delivery.'
      },
      {
        q: 'Do you offer corporate or bulk orders?',
        a: 'Yes! We offer special rates for corporate events, bulk orders, and regular subscriptions. Contact us for a customized quote and service package.'
      }
    ]
  }
];

export const FAQs = () => {
  const [openItems, setOpenItems] = useState<{ [key: string]: boolean }>({});

  const toggleItem = (key: string) => {
    setOpenItems(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full glass-card text-rose-600 font-semibold text-sm shadow-lg mb-4">
          <HelpCircle className="w-4 h-4" />
          Frequently Asked Questions
        </div>
        <p className="text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto">
          Find answers to common questions about our flowers, delivery, and services. Can't find what
          you're looking for? Contact us directly!
        </p>
      </div>

      {faqs.map((section, sectionIndex) => (
        <div key={sectionIndex} className="space-y-4">
          <h3 className="text-2xl font-bold text-gradient mb-4">{section.category}</h3>
          <div className="space-y-3">
            {section.questions.map((item, itemIndex) => {
              const key = `${sectionIndex}-${itemIndex}`;
              const isOpen = openItems[key];

              return (
                <div
                  key={key}
                  className="glass-card rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-lg"
                >
                  <button
                    onClick={() => toggleItem(key)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-white/50 transition-colors"
                  >
                    <span className="font-semibold text-gray-900 pr-4">{item.q}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-rose-500 flex-shrink-0 transition-transform duration-300 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      isOpen ? 'max-h-96' : 'max-h-0'
                    }`}
                  >
                    <div className="px-6 pb-5 text-gray-700 leading-relaxed border-t border-gray-200 pt-4">
                      {item.a}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}

      <div className="glass-card p-8 rounded-2xl bg-gradient-to-br from-rose-50 to-pink-50 text-center">
        <h3 className="text-2xl font-bold text-gray-900 mb-4">Still Have Questions?</h3>
        <p className="text-gray-700 mb-6">
          Our customer service team is here to help you 24/7. Reach out via WhatsApp, email, or phone.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="https://wa.me/94701234567"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold rounded-full hover:shadow-xl transition-all hover:scale-105"
          >
            Chat on WhatsApp
          </a>
          <a
            href="mailto:hello@bloomora.lk"
            className="px-8 py-4 bg-gradient-to-r from-rose-500 to-pink-500 text-white font-bold rounded-full hover:shadow-xl transition-all hover:scale-105"
          >
            Email Us
          </a>
        </div>
      </div>
    </div>
  );
};
