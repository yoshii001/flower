import { CartItem, CheckoutForm } from '../types';
import { formatLKR } from './currency';

export const WHATSAPP_PHONE = '94701234567';
export const DELIVERY_FEE_LKR = 250;
export const SHOP_NAME = 'Bloomora';

export const generateWhatsAppMessage = (
  cart: CartItem[],
  form: CheckoutForm,
  subtotal: number,
  total: number
): string => {
  const itemsList = cart
    .map(
      (item) =>
        `${item.qty} x ${item.title} — ${formatLKR(item.priceLKR * item.qty)}`
    )
    .join('\n');

  const googleMapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    form.address
  )}`;

  let message = `${SHOP_NAME} Order\n`;
  message += `Customer: ${form.customerName}, ${form.phone}\n`;
  message += `Address: ${form.address}\n`;
  message += `Map: ${googleMapsLink}\n\n`;
  message += `Items:\n${itemsList}\n\n`;
  message += `Subtotal: ${formatLKR(subtotal)}\n`;
  message += `Delivery: ${formatLKR(DELIVERY_FEE_LKR)}\n`;
  message += `Total: ${formatLKR(total)}\n`;

  if (form.note) {
    message += `\nNote: ${form.note}\n`;
  }

  message += `\nPlease confirm available delivery slots. Thank you!`;

  return message;
};

export const generateWhatsAppLink = (message: string): string => {
  const encodedMessage = encodeURIComponent(message);
  return `https://api.whatsapp.com/send?phone=${WHATSAPP_PHONE}&text=${encodedMessage}`;
};
