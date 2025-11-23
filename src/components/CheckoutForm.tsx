import { useState } from 'react';
import { X, MapPin, Phone, User, MessageSquare } from 'lucide-react';
import { CheckoutForm as CheckoutFormType } from '../types';
import { useCart } from '../context/CartContext';
import { formatLKR } from '../utils/currency';
import {
  DELIVERY_FEE_LKR,
  generateWhatsAppMessage,
  generateWhatsAppLink,
} from '../utils/whatsapp';

interface CheckoutFormProps {
  onClose: () => void;
}

export const CheckoutForm = ({ onClose }: CheckoutFormProps) => {
  const { cart, subtotal, clearCart } = useCart();
  const total = subtotal + DELIVERY_FEE_LKR;

  const [formData, setFormData] = useState<CheckoutFormType>({
    customerName: '',
    phone: '',
    address: '',
    note: '',
  });

  const [errors, setErrors] = useState<Partial<CheckoutFormType>>({});

  const validatePhone = (phone: string): boolean => {
    const phoneRegex = /^0[0-9]{9}$/;
    return phoneRegex.test(phone);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: Partial<CheckoutFormType> = {};

    if (!formData.customerName.trim()) {
      newErrors.customerName = 'Name is required';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = 'Invalid phone number (format: 0771234567)';
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Delivery address is required';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const message = generateWhatsAppMessage(cart, formData, subtotal, total);
    const whatsappLink = generateWhatsAppLink(message);

    clearCart();
    window.open(whatsappLink, '_blank');
    onClose();
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof CheckoutFormType]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">Checkout</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="bg-rose-50 rounded-lg p-4 border border-rose-200">
            <h3 className="font-semibold text-gray-900 mb-3">Order Summary</h3>
            <div className="space-y-2 text-sm">
              {cart.map((item) => (
                <div key={item.id} className="flex justify-between">
                  <span className="text-gray-700">
                    {item.qty}x {item.title}
                  </span>
                  <span className="font-semibold">
                    {formatLKR(item.priceLKR * item.qty)}
                  </span>
                </div>
              ))}
              <div className="border-t border-rose-200 pt-2 mt-2">
                <div className="flex justify-between text-gray-700">
                  <span>Subtotal</span>
                  <span className="font-semibold">{formatLKR(subtotal)}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Delivery Fee</span>
                  <span className="font-semibold">
                    {formatLKR(DELIVERY_FEE_LKR)}
                  </span>
                </div>
                <div className="flex justify-between text-lg font-bold text-gray-900 mt-2">
                  <span>Total</span>
                  <span className="text-rose-500">{formatLKR(total)}</span>
                </div>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              <User className="w-4 h-4 inline mr-2" />
              Full Name
            </label>
            <input
              type="text"
              name="customerName"
              value={formData.customerName}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 ${
                errors.customerName ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="e.g., Ramesh Perera"
            />
            {errors.customerName && (
              <p className="text-red-500 text-sm mt-1">{errors.customerName}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              <Phone className="w-4 h-4 inline mr-2" />
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 ${
                errors.phone ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="0771234567"
            />
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              <MapPin className="w-4 h-4 inline mr-2" />
              Delivery Address
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 ${
                errors.address ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="23 Flower St, Colombo 03 (near ABC shop)"
            />
            {errors.address && (
              <p className="text-red-500 text-sm mt-1">{errors.address}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              <MessageSquare className="w-4 h-4 inline mr-2" />
              Additional Notes (Optional)
            </label>
            <textarea
              name="note"
              value={formData.note}
              onChange={handleChange}
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
              placeholder="e.g., Please deliver between 3pm-5pm"
            />
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-900">
              By clicking "Buy Now", you'll be redirected to WhatsApp to confirm
              your order with our team. We'll verify availability and delivery
              details.
            </p>
          </div>

          <button
            type="submit"
            className="w-full bg-rose-500 text-white py-4 rounded-lg font-semibold hover:bg-rose-600 transition-colors shadow-lg hover:shadow-xl text-lg"
          >
            Buy Now via WhatsApp
          </button>
        </form>
      </div>
    </div>
  );
};
