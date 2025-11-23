# New Features Added to Bloomora

## 1. Augmented Reality (AR) Preview

View bouquets in your real room using your device camera!

### How to Use:
1. Click on any product to view details
2. Click the "Try AR Preview" button
3. Allow camera access when prompted
4. Drag to reposition the bouquet in your space
5. Use the size slider to adjust the scale
6. Capture screenshots to save your preview

### Features:
- Real-time camera feed
- Drag-and-drop positioning
- Size adjustment slider
- Screenshot capture
- Product overlay with shadows
- Reset position option

### Technical Details:
- Uses WebRTC `getUserMedia` API for camera access
- Canvas rendering for overlay composition
- Mouse/touch drag controls for positioning
- Automatic shadow rendering for realistic placement

---

## 2. Mood Lighting Based on Time of Day

The website automatically adjusts its ambient lighting to match the time of day!

### Time-Based Themes:
- **Morning (5 AM - 12 PM)**: Warm amber and orange tones
- **Afternoon (12 PM - 5 PM)**: Cool blue and cyan tones
- **Evening (5 PM - 9 PM)**: Rose and pink sunset colors
- **Night (9 PM - 5 AM)**: Deep slate and indigo night sky

### Features:
- Smooth gradient transitions between themes
- Automatic detection every minute
- Mood indicator badge in header
- Background color transitions
- Creates an "alive" feeling for flowers

### Technical Details:
- Custom React hook `useMoodLighting`
- Updates every 60 seconds
- Smooth CSS transitions (1 second duration)
- No page refresh required

---

## 3. Seasonal Themes

Switch between seasonal themes for special occasions!

### Available Themes:

#### Default - All Seasons
- Classic rose and pink colors
- General purpose floral theme

#### Valentine's Day (Auto-activates Feb 1-14)
- Deep red and rose colors
- "Love Blooms Here" hero text
- Red petal rain
- Romantic atmosphere

#### Christmas (Auto-activates Dec 1-26)
- Green and red festive colors
- "Festive Floral Magic" hero text
- Green, red, and white petals
- Holiday cheer

#### Weddings
- Soft pink and purple pastels
- "Your Perfect Day, Perfectly Bloomed" hero text
- Elegant white and pink petals
- Sophisticated romantic feel

### Features:
- Automatic seasonal detection
- Manual theme selector in shop page
- Dynamic petal colors
- Custom hero text per theme
- Theme-specific color palettes
- Smooth transitions between themes

### Technical Details:
- React Context for global theme state
- Automatic date-based detection
- Manual override option
- Persists across page navigation
- Updates all themed components

---

## How to Access Features:

### AR Preview:
1. Browse to any product
2. Click "Try AR Preview" button in product details
3. Grant camera permissions

### Mood Lighting:
- Automatic! Just visit the site at different times
- View current mood in header badge

### Seasonal Themes:
- Automatic based on date
- Manual selector in Shop page (left sidebar)
- Click any theme to switch instantly

---

## Browser Compatibility:

### AR Preview:
- Chrome/Edge: Full support
- Safari: Requires iOS 11+ or macOS High Sierra+
- Firefox: Full support
- Requires HTTPS in production

### Mood Lighting:
- All modern browsers
- No special requirements

### Seasonal Themes:
- All modern browsers
- Works everywhere React works

---

## Privacy & Permissions:

### Camera Access (AR Preview):
- Only used locally in browser
- No data sent to servers
- No recording or storage
- Can be revoked anytime in browser settings
- Only activates when AR Preview is clicked

---

## Performance Notes:

- AR Preview: Uses hardware acceleration via Canvas
- Mood Lighting: Minimal performance impact (runs every 60s)
- Seasonal Themes: No performance impact (pure CSS transitions)
- All features are optional and don't affect core shopping functionality
