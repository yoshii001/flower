# WhatsApp Integration Example

This document shows how the WhatsApp message is generated and provides a testing example.

## How It Works

The app generates a WhatsApp deep link using the format:
```
https://api.whatsapp.com/send?phone={PHONE}&text={ENCODED_MESSAGE}
```

## Configuration (src/utils/whatsapp.ts)

```typescript
export const WHATSAPP_PHONE = '94701234567';  // Change this to your number
export const DELIVERY_FEE_LKR = 250;           // Change delivery fee
export const SHOP_NAME = 'Bloomora';           // Change shop name
```

## Example Order

### Input Data:
- **Customer**: Ramesh Perera
- **Phone**: 0771234567
- **Address**: 23 Flower St, Colombo 03 (near ABC shop)
- **Note**: Please deliver between 3pm-5pm
- **Items**:
  - 1x Red Rose Bouquet @ LKR 1,800.00
  - 2x Mixed Seasonal Bouquet @ LKR 1,800.00 each

### Generated Message (before URL encoding):

```
Bloomora Order
Customer: Ramesh Perera, 0771234567
Address: 23 Flower St, Colombo 03 (near ABC shop)
Map: https://www.google.com/maps/search/?api=1&query=23%20Flower%20St%2C%20Colombo%2003%20(near%20ABC%20shop)

Items:
1 x Red Rose Bouquet — LKR 1,800.00
2 x Mixed Seasonal Bouquet — LKR 3,600.00

Subtotal: LKR 5,400.00
Delivery: LKR 250.00
Total: LKR 5,650.00

Note: Please deliver between 3pm-5pm.

Please confirm available delivery slots. Thank you!
```

### Generated WhatsApp Link:

```
https://api.whatsapp.com/send?phone=94701234567&text=Bloomora%20Order%0ACustomer%3A%20Ramesh%20Perera%2C%200771234567%0AAddress%3A%2023%20Flower%20St%2C%20Colombo%2003%20(near%20ABC%20shop)%0AMap%3A%20https%3A%2F%2Fwww.google.com%2Fmaps%2Fsearch%2F%3Fapi%3D1%26query%3D23%2520Flower%2520St%252C%2520Colombo%252003%2520(near%2520ABC%2520shop)%0A%0AItems%3A%0A1%20x%20Red%20Rose%20Bouquet%20%E2%80%94%20LKR%201%2C800.00%0A2%20x%20Mixed%20Seasonal%20Bouquet%20%E2%80%94%20LKR%203%2C600.00%0A%0ASubtotal%3A%20LKR%205%2C400.00%0ADelivery%3A%20LKR%20250.00%0ATotal%3A%20LKR%205%2C650.00%0A%0ANote%3A%20Please%20deliver%20between%203pm-5pm.%0A%0APlease%20confirm%20available%20delivery%20slots.%20Thank%20you!
```

## URL Encoding Rules

The `encodeURIComponent()` function converts:
- Spaces → `%20`
- Newlines (`\n`) → `%0A`
- Commas → `%2C`
- Colons → `%3A`
- Slashes → `%2F`
- Question marks → `%3F`
- Ampersands → `%26`
- Em dashes (—) → `%E2%80%94`

## Testing Steps

1. **Set Your Phone Number**: Update `WHATSAPP_PHONE` in `src/utils/whatsapp.ts`
   ```typescript
   export const WHATSAPP_PHONE = '94771234567'; // Your WhatsApp number
   ```

2. **Run the App**:
   ```bash
   npm run dev
   ```

3. **Test the Flow**:
   - Add products to cart
   - Click cart icon
   - Click "Proceed to Checkout"
   - Fill in form with test data:
     - Name: Test User
     - Phone: 0771234567 (must match format: 0XXXXXXXXX)
     - Address: Test Address, Colombo
     - Note: Test order
   - Click "Buy Now via WhatsApp"
   - WhatsApp web/app will open with pre-filled message

4. **Verify**:
   - Check that message is properly formatted
   - Verify all items are listed
   - Confirm prices are correct
   - Check that totals add up
   - Verify Google Maps link is included

## Phone Number Format

**Important**: The phone number must be in international format WITHOUT the '+' sign.

### Examples:
- ✅ Correct: `94771234567` (Sri Lanka)
- ❌ Wrong: `+94771234567`
- ❌ Wrong: `0771234567`

### Sri Lanka Format:
- Country code: `94`
- Remove leading `0` from local number
- Example: `077 123 4567` → `94771234567`

## Customer Phone Validation

The checkout form validates customer phone numbers to match Sri Lankan format:
- Pattern: `0[0-9]{9}` (starts with 0, followed by 9 digits)
- Examples:
  - ✅ `0771234567`
  - ✅ `0112345678`
  - ❌ `771234567` (missing leading 0)
  - ❌ `077123456` (too short)

## Google Maps Integration

The message includes a Google Maps search link for the delivery address:
```
https://www.google.com/maps/search/?api=1&query={URL_ENCODED_ADDRESS}
```

This allows the recipient to:
- View the delivery location on Google Maps
- Get directions to the address
- Verify the location before confirming delivery

## Customization

You can customize the message template in `src/utils/whatsapp.ts`:

```typescript
export const generateWhatsAppMessage = (
  cart: CartItem[],
  form: CheckoutForm,
  subtotal: number,
  total: number
): string => {
  // Modify this function to change message format
  // Keep in mind that newlines are represented as \n
  // and will be converted to %0A in the URL
}
```

## Troubleshooting

### Issue: WhatsApp doesn't open
- **Solution**: Check that `WHATSAPP_PHONE` is in correct format (without '+')
- **Solution**: Ensure WhatsApp is installed on the device
- **Solution**: Try WhatsApp Web if mobile app isn't available

### Issue: Message is garbled
- **Solution**: Make sure `encodeURIComponent()` is being used
- **Solution**: Check for special characters in product names or addresses

### Issue: Phone validation fails
- **Solution**: Ensure phone format is `0XXXXXXXXX` (10 digits starting with 0)
- **Solution**: Update validation regex in `CheckoutForm.tsx` if needed for other countries

## Production Checklist

Before deploying:

- [ ] Update `WHATSAPP_PHONE` to your business number
- [ ] Set appropriate `DELIVERY_FEE_LKR`
- [ ] Update `SHOP_NAME` to your business name
- [ ] Test with real WhatsApp number
- [ ] Verify message formatting on mobile devices
- [ ] Test Google Maps links work correctly
- [ ] Confirm pricing calculations are correct
- [ ] Update contact information in footer
- [ ] Update products in `public/products.json`
