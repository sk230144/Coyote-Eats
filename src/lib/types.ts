export type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'Burgers' | 'Sandwiches' | 'Entrees' | 'Appetizers' | 'Sides' | 'Drinks';
  tags?: ('popular' | 'new' | 'spicy')[];
  imageId: string;
};

export type Review = {
  id: string;
  author: string;
  rating: number; // 1-5
  comment: string;
};

export type GalleryImage = {
  id: string;
  category: 'Food & Drink' | 'Vibe' | 'Menu';
  imageId: string;
  description: string;
};
