# Custom Bouquet Builder Feature

## Overview

The Bouquet Builder allows customers to create personalized flower arrangements by dragging and dropping cartoon flower images onto a bush background canvas.

## Features

### 1. Drag-and-Drop Interface
- Drag flowers from the gallery panel onto the canvas
- Flowers can be positioned anywhere on the canvas
- Real-time visual feedback during dragging

### 2. Flower Gallery
- 11 different flower types with cartoon-style images
- Category filtering (All, Roses, Lilies, Orchids, etc.)
- Each flower displays its name and price in LKR
- Flowers include:
  - Alstroemeria (LKR 300)
  - Carnations (LKR 250)
  - Chrysanthemums (LKR 280)
  - Gerberas (LKR 320)
  - Jasmine (LKR 200)
  - Lilies (LKR 400)
  - Orchids (LKR 500)
  - Peonies (LKR 450)
  - Roses (LKR 350)
  - Sunflowers (LKR 330)
  - Tulips (LKR 380)

### 3. Flower Editing Controls
When a flower is selected, users can:
- **Adjust Size**: Scale from 50% to 200%
- **Rotate**: 0° to 360° rotation
- **Layer Order**: Bring to front or send to back
- **Delete**: Remove individual flowers
- **Visual Selection**: Selected flowers show a rose-colored ring

### 4. Canvas Features
- Background: Green bush/leaves image
- Unlimited flowers can be added
- Click any placed flower to select and edit
- Visual guide when canvas is empty

### 5. Pricing
- Real-time price calculation
- Shows total price based on all added flowers
- Displays flower count

### 6. Actions
- **Clear All**: Remove all flowers and start over
- **Download**: Save the bouquet as a PNG image
- **Add to Cart**: Add the custom bouquet as a cart item

## How to Use

### For Customers:

1. **Access the Builder**:
   - Click the purple palette icon in the header
   - Or click "Design Your Bouquet" button on the home page

2. **Create Your Bouquet**:
   - Browse flowers in the left gallery panel
   - Filter by category if needed
   - Drag a flower onto the canvas
   - Drop it where you want it positioned

3. **Edit Flowers**:
   - Click on any flower to select it
   - Use the right panel controls to:
     - Adjust size with slider or +/- buttons
     - Rotate using the rotation slider
     - Change layer order with front/back buttons
     - Delete with the trash icon

4. **Manage Your Design**:
   - View all added flowers in the "Your Flowers" list
   - Click any flower in the list to select and edit it
   - See the total price update in real-time

5. **Complete Your Order**:
   - Click "Download" to save your design as an image
   - Click "Add to Cart" to purchase the custom bouquet
   - The bouquet will be added as "Custom Bouquet" with total price

## Technical Details

### Files Created:
- `src/components/BouquetBuilder.tsx` - Main builder component
- `src/data/flowerTypes.ts` - Flower data and pricing
- `src/types/index.ts` - Updated with new interfaces

### Data Structures:

```typescript
interface FlowerType {
  id: string;
  name: string;
  category: string;
  imageUrl: string;
  priceLKR: number;
}

interface PlacedFlower {
  id: string;
  flowerId: string;
  flowerName: string;
  imageUrl: string;
  x: number;          // Position as percentage
  y: number;          // Position as percentage
  scale: number;      // 0.5 to 2.0
  rotation: number;   // 0 to 360 degrees
  zIndex: number;     // Layer order
}
```

### Integration Points:
- Header: New palette button to open builder
- Hero: "Design Your Bouquet" CTA button
- Cart: Custom bouquets added as regular cart items

## Responsive Design

- **Desktop**: Three-column layout (Gallery | Canvas | Controls)
- **Tablet**: Stacked layout with full-width sections
- **Mobile**: Optimized for touch interactions and smaller screens

## Future Enhancements (Optional)

While not currently implemented, the system could be extended with:
- Firebase integration for saving/loading designs
- User accounts to store multiple designs
- Social sharing of bouquet designs
- Preset templates for quick customization
- More flower varieties and seasonal offerings
- Background customization options
- Gift card/message integration

## Browser Compatibility

- Modern browsers (Chrome, Firefox, Safari, Edge)
- HTML5 Canvas support required
- Drag-and-drop API support required
- Touch-enabled devices supported

## Performance Notes

- Images are loaded on-demand
- Canvas rendering is optimized
- No external dependencies beyond React
- Minimal bundle size impact (~15KB gzipped)
