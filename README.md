# Bloomora - Flower Shop Web App

A beautiful, responsive flower shop web application built with React, TypeScript, and Tailwind CSS. Features a complete shopping cart system with WhatsApp integration for order processing.

## Features

- **Responsive Design**: Mobile-first design that works perfectly on all devices
- **Product Gallery**: Browse through a curated collection of fresh flowers
- **Shopping Cart**: Add items, adjust quantities, and view totals in real-time
- **WhatsApp Checkout**: Complete orders directly through WhatsApp with auto-generated messages
- **Local Storage**: Cart persists across page refreshes
- **Price Display**: All prices in Sri Lankan Rupees (LKR) with proper formatting
- **Category Filters**: Filter products by category
- **Sort Options**: Sort by price or featured items

## Tech Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Data**: Mock JSON (no database required)

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Build for production:
   ```bash
   npm run build
   ```

## Configuration

### Change WhatsApp Phone Number

Edit `src/utils/whatsapp.ts`:

```typescript
export const WHATSAPP_PHONE = '94701234567'; // Change to your number
```

**Important**: Use international format without '+' (e.g., 94XXXXXXXXX for Sri Lanka)

### Change Delivery Fee

Edit `src/utils/whatsapp.ts`:

```typescript
export const DELIVERY_FEE_LKR = 250; // Change to your delivery fee in LKR
```

### Change Shop Name

Edit `src/utils/whatsapp.ts`:

```typescript
export const SHOP_NAME = 'Bloomora'; // Change to your shop name
```

### Update Products

Edit `public/products.json` to add, remove, or modify products. Each product needs:

```json
{
  "id": "unique-id",
  "title": "Product Name",
  "description": "Product description",
  "priceLKR": 1800,
  "category": "category-name",
  "images": ["image-url-1", "image-url-2"]
}
```

## WhatsApp Integration

When a customer clicks "Buy Now", the app:

1. Validates customer information (name, phone, address)
2. Generates a formatted message with:
   - Shop name
   - Customer details
   - Complete order list with quantities and prices
   - Subtotal, delivery fee, and total
   - Google Maps link for the delivery address
   - Optional customer notes
3. URL-encodes the message
4. Opens WhatsApp with the pre-filled message

### Example WhatsApp Message Format

```
Bloomora Order
Customer: Ramesh Perera, 0771234567
Address: 23 Flower St, Colombo 03 (near ABC shop)
Map: https://www.google.com/maps/search/?api=1&query=...

Items:
1 x Red Rose Bouquet — LKR 1,800.00
2 x Mixed Seasonal Bouquet — LKR 3,600.00

Subtotal: LKR 5,400.00
Delivery: LKR 250.00
Total: LKR 5,650.00

Note: Please deliver between 3pm-5pm.

Please confirm available delivery slots. Thank you!
```

### Testing WhatsApp Link

To test the WhatsApp integration without placing an order:

1. Add items to cart
2. Proceed to checkout
3. Fill in the form with test data
4. Click "Buy Now via WhatsApp"
5. The generated link will open in a new tab

## Project Structure

```
src/
├── components/
│   ├── Header.tsx              # Navigation header with cart icon
│   ├── Hero.tsx                # Landing page hero section
│   ├── FeaturedProducts.tsx    # Featured products display
│   ├── Shop.tsx                # Product grid with filters
│   ├── ProductCard.tsx         # Individual product card
│   ├── ProductDetail.tsx       # Product detail modal
│   ├── CartDrawer.tsx          # Shopping cart sidebar
│   └── CheckoutForm.tsx        # Checkout form with validation
├── context/
│   └── CartContext.tsx         # Cart state management
├── types/
│   └── index.ts                # TypeScript interfaces
├── utils/
│   ├── currency.ts             # LKR formatting utility
│   └── whatsapp.ts             # WhatsApp message generation
├── App.tsx                     # Main app component
└── main.tsx                    # App entry point

public/
└── products.json               # Product data
```

## Features in Detail

### Cart Management
- Add/remove items
- Adjust quantities with +/- buttons
- View per-item subtotals
- Persistent storage using localStorage
- Real-time total calculation

### Checkout Process
1. View order summary
2. Enter customer details:
   - Full name (required)
   - Phone number (required, validates Sri Lankan format: 0XXXXXXXXX)
   - Delivery address (required)
   - Additional notes (optional)
3. See final total with delivery fee
4. Complete order via WhatsApp

### Price Formatting
All prices are displayed in LKR using Intl.NumberFormat:
- Format: `LKR 1,800.00`
- Proper thousand separators
- Two decimal places
- Consistent across the app

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)
- Responsive breakpoints: 640px, 768px, 1024px, 1280px

## Accessibility

- Semantic HTML
- Keyboard navigation support
- Focus indicators
- Screen reader friendly
- Respects `prefers-reduced-motion`

## License

MIT

## Support

For questions or support, contact: hello@bloomora.lk
