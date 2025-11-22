export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
  description: string;
  featured?: boolean;
}

export const products: Product[] = [
  {
    id: 1,
    name: "Romantic Rose Bouquet",
    price: 89.99,
    category: "Roses",
    image: "https://images.pexels.com/photos/1458866/pexels-photo-1458866.jpeg?auto=compress&cs=tinysrgb&w=800",
    description: "A stunning arrangement of premium red roses, perfect for expressing deep love and affection.",
    featured: true,
  },
  {
    id: 2,
    name: "Pastel Dream Arrangement",
    price: 75.00,
    category: "Bouquets",
    image: "https://images.pexels.com/photos/1375857/pexels-photo-1375857.jpeg?auto=compress&cs=tinysrgb&w=800",
    description: "Soft pastel flowers creating a dreamy, romantic atmosphere.",
    featured: true,
  },
  {
    id: 3,
    name: "Elegant White Lilies",
    price: 95.00,
    category: "Bouquets",
    image: "https://images.pexels.com/photos/1408221/pexels-photo-1408221.jpeg?auto=compress&cs=tinysrgb&w=800",
    description: "Pure white lilies symbolizing elegance and sophistication.",
    featured: true,
  },
  {
    id: 4,
    name: "Sunshine Bouquet",
    price: 65.00,
    category: "Bouquets",
    image: "https://images.pexels.com/photos/1181534/pexels-photo-1181534.jpeg?auto=compress&cs=tinysrgb&w=800",
    description: "Bright yellow blooms to bring sunshine to any day.",
  },
  {
    id: 5,
    name: "Pink Rose Collection",
    price: 79.99,
    category: "Roses",
    image: "https://images.pexels.com/photos/1386604/pexels-photo-1386604.jpeg?auto=compress&cs=tinysrgb&w=800",
    description: "Delicate pink roses expressing grace and admiration.",
  },
  {
    id: 6,
    name: "Luxury Gift Box",
    price: 120.00,
    category: "Gifts",
    image: "https://images.pexels.com/photos/1415268/pexels-photo-1415268.jpeg?auto=compress&cs=tinysrgb&w=800",
    description: "Premium flower arrangement in an elegant gift box.",
    featured: true,
  },
  {
    id: 7,
    name: "Wedding Centerpiece",
    price: 150.00,
    category: "Decorations",
    image: "https://images.pexels.com/photos/169190/pexels-photo-169190.jpeg?auto=compress&cs=tinysrgb&w=800",
    description: "Sophisticated centerpiece perfect for weddings and special events.",
  },
  {
    id: 8,
    name: "Tropical Paradise",
    price: 98.00,
    category: "Bouquets",
    image: "https://images.pexels.com/photos/1624487/pexels-photo-1624487.jpeg?auto=compress&cs=tinysrgb&w=800",
    description: "Exotic tropical flowers bringing island vibes to your home.",
  },
  {
    id: 9,
    name: "Garden Fresh Mix",
    price: 72.00,
    category: "Bouquets",
    image: "https://images.pexels.com/photos/1458867/pexels-photo-1458867.jpeg?auto=compress&cs=tinysrgb&w=800",
    description: "A delightful mix of fresh garden flowers.",
  },
  {
    id: 10,
    name: "Premium Rose Box",
    price: 135.00,
    category: "Gifts",
    image: "https://images.pexels.com/photos/1878507/pexels-photo-1878507.jpeg?auto=compress&cs=tinysrgb&w=800",
    description: "Luxurious roses arranged in a designer gift box.",
  },
  {
    id: 11,
    name: "Spring Blossom",
    price: 68.00,
    category: "Bouquets",
    image: "https://images.pexels.com/photos/1166990/pexels-photo-1166990.jpeg?auto=compress&cs=tinysrgb&w=800",
    description: "Fresh spring flowers celebrating new beginnings.",
  },
  {
    id: 12,
    name: "Wedding Arch Decor",
    price: 250.00,
    category: "Decorations",
    image: "https://images.pexels.com/photos/2788488/pexels-photo-2788488.jpeg?auto=compress&cs=tinysrgb&w=800",
    description: "Stunning floral arrangement for wedding arches.",
  },
];

export const categories = ["All", "Roses", "Bouquets", "Gifts", "Decorations"];

export const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    text: "Absolutely stunning arrangements! The flowers were fresh and beautifully arranged. Will definitely order again!",
    rating: 5,
  },
  {
    id: 2,
    name: "Michael Chen",
    text: "Best flower shop in town. The attention to detail and quality is unmatched. Highly recommend!",
    rating: 5,
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    text: "The bouquet I ordered exceeded my expectations. Beautiful presentation and long-lasting flowers.",
    rating: 5,
  },
];
