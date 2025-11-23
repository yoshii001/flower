import { Truck, MapPin, Clock, Package, Shield, CreditCard } from 'lucide-react';
import { DELIVERY_FEE_LKR } from '../utils/whatsapp';
import { formatLKR } from '../utils/currency';

export const DeliveryInfo = () => {
  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full glass-card text-rose-600 font-semibold text-sm shadow-lg mb-4">
          <Truck className="w-4 h-4" />
          Delivery Information
        </div>
        <p className="text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto">
          We deliver fresh flowers across Sri Lanka with care and precision. Here's everything you
          need to know about our delivery service.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="glass-card p-6 rounded-2xl">
          <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mb-4">
            <MapPin className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-3">Delivery Areas</h3>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-center gap-2">
              <div className="w-2 h-2 bg-rose-500 rounded-full" />
              <span><strong>Colombo:</strong> Same-day delivery available</span>
            </li>
            <li className="flex items-center gap-2">
              <div className="w-2 h-2 bg-rose-500 rounded-full" />
              <span><strong>Gampaha:</strong> Same-day delivery available</span>
            </li>
            <li className="flex items-center gap-2">
              <div className="w-2 h-2 bg-rose-500 rounded-full" />
              <span><strong>Kandy:</strong> Next-day delivery</span>
            </li>
            <li className="flex items-center gap-2">
              <div className="w-2 h-2 bg-rose-500 rounded-full" />
              <span><strong>Galle:</strong> Next-day delivery</span>
            </li>
            <li className="flex items-center gap-2">
              <div className="w-2 h-2 bg-rose-500 rounded-full" />
              <span><strong>Other Areas:</strong> 2-3 business days</span>
            </li>
          </ul>
        </div>

        <div className="glass-card p-6 rounded-2xl">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mb-4">
            <Clock className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-3">Delivery Times</h3>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start gap-2">
              <div className="w-2 h-2 bg-rose-500 rounded-full mt-2 flex-shrink-0" />
              <span><strong>Morning Slot:</strong> 9:00 AM - 12:00 PM</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-2 h-2 bg-rose-500 rounded-full mt-2 flex-shrink-0" />
              <span><strong>Afternoon Slot:</strong> 12:00 PM - 3:00 PM</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-2 h-2 bg-rose-500 rounded-full mt-2 flex-shrink-0" />
              <span><strong>Evening Slot:</strong> 3:00 PM - 6:00 PM</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-2 h-2 bg-rose-500 rounded-full mt-2 flex-shrink-0" />
              <span><strong>Same-Day Cutoff:</strong> Orders before 2:00 PM</span>
            </li>
          </ul>
        </div>

        <div className="glass-card p-6 rounded-2xl">
          <div className="w-12 h-12 bg-gradient-to-br from-rose-500 to-pink-500 rounded-xl flex items-center justify-center mb-4">
            <CreditCard className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-3">Delivery Charges</h3>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start gap-2">
              <div className="w-2 h-2 bg-rose-500 rounded-full mt-2 flex-shrink-0" />
              <span><strong>Standard Delivery:</strong> {formatLKR(DELIVERY_FEE_LKR)}</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-2 h-2 bg-rose-500 rounded-full mt-2 flex-shrink-0" />
              <span><strong>Free Delivery:</strong> On orders over LKR 5,000</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-2 h-2 bg-rose-500 rounded-full mt-2 flex-shrink-0" />
              <span><strong>Express Delivery:</strong> Additional LKR 500 (within 2 hours)</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-2 h-2 bg-rose-500 rounded-full mt-2 flex-shrink-0" />
              <span><strong>Midnight Delivery:</strong> Additional LKR 1,000 (special occasions)</span>
            </li>
          </ul>
        </div>

        <div className="glass-card p-6 rounded-2xl">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-4">
            <Package className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-3">Packaging</h3>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start gap-2">
              <div className="w-2 h-2 bg-rose-500 rounded-full mt-2 flex-shrink-0" />
              <span>Premium eco-friendly wrapping materials</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-2 h-2 bg-rose-500 rounded-full mt-2 flex-shrink-0" />
              <span>Water tubes to keep flowers fresh during transit</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-2 h-2 bg-rose-500 rounded-full mt-2 flex-shrink-0" />
              <span>Protective outer packaging for safe transport</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-2 h-2 bg-rose-500 rounded-full mt-2 flex-shrink-0" />
              <span>Complimentary greeting card with your message</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="glass-card p-8 rounded-2xl bg-gradient-to-br from-rose-50 to-pink-50">
        <div className="flex items-center gap-3 mb-4">
          <Shield className="w-8 h-8 text-rose-500" />
          <h3 className="text-2xl font-bold text-gray-900">Delivery Guarantee</h3>
        </div>
        <ul className="space-y-3 text-gray-700">
          <li className="flex items-start gap-3">
            <div className="w-2 h-2 bg-rose-500 rounded-full mt-2 flex-shrink-0" />
            <span><strong>Freshness Guaranteed:</strong> All flowers are delivered fresh or we'll replace them for free</span>
          </li>
          <li className="flex items-start gap-3">
            <div className="w-2 h-2 bg-rose-500 rounded-full mt-2 flex-shrink-0" />
            <span><strong>On-Time Delivery:</strong> We commit to delivering within the selected time slot</span>
          </li>
          <li className="flex items-start gap-3">
            <div className="w-2 h-2 bg-rose-500 rounded-full mt-2 flex-shrink-0" />
            <span><strong>Safe Handling:</strong> Our delivery team is trained to handle flowers with care</span>
          </li>
          <li className="flex items-start gap-3">
            <div className="w-2 h-2 bg-rose-500 rounded-full mt-2 flex-shrink-0" />
            <span><strong>Contact-Free Option:</strong> Available upon request for your safety</span>
          </li>
          <li className="flex items-start gap-3">
            <div className="w-2 h-2 bg-rose-500 rounded-full mt-2 flex-shrink-0" />
            <span><strong>Photo Confirmation:</strong> We can send you a photo after delivery (on request)</span>
          </li>
        </ul>
      </div>

      <div className="glass-card p-6 rounded-2xl border-2 border-rose-200">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Important Notes</h3>
        <ul className="space-y-2 text-gray-700 text-sm">
          <li className="flex items-start gap-2">
            <span className="text-rose-500 font-bold">•</span>
            <span>Orders are confirmed via WhatsApp after checkout</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-rose-500 font-bold">•</span>
            <span>Delivery times may vary during peak seasons (Valentine's Day, Mother's Day)</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-rose-500 font-bold">•</span>
            <span>Please ensure someone is available to receive the delivery</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-rose-500 font-bold">•</span>
            <span>We'll contact you if there are any issues with the delivery address</span>
          </li>
        </ul>
      </div>
    </div>
  );
};
