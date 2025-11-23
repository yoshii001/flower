export interface Product {
  id: string;
  title: string;
  description: string;
  priceLKR: number;
  category: string;
  images: string[];
  badge?: 'just-arrived' | 'best-seller' | 'limited';
  size?: string;
  bouquetType?: string;
  scent?: 'strong' | 'mild' | 'none';
  freshness?: string;
}

export interface CartItem {
  id: string;
  title: string;
  priceLKR: number;
  qty: number;
  image: string;
}

export interface CheckoutForm {
  customerName: string;
  phone: string;
  address: string;
  note?: string;
}

export interface FlowerType {
  id: string;
  name: string;
  category: string;
  imageUrl: string;
  priceLKR: number;
}

export interface PlacedFlower {
  id: string;
  flowerId: string;
  flowerName: string;
  imageUrl: string;
  x: number;
  y: number;
  scale: number;
  rotation: number;
  zIndex: number;
}

export interface CustomBouquet {
  id: string;
  userId?: string;
  flowers: PlacedFlower[];
  createdAt: Date;
  totalPrice: number;
}
