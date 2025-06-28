export interface MenuItem {
  id: number;
  name: string;
  description?: string;
  price: number;
  category: string;
  image?: string;
  isAvailable: boolean;
  ingredients?: MenuItemIngredient[];
  createdAt: string;
  updatedAt: string;
}

export interface MenuItemIngredient {
  id: number;
  menuItemId: number;
  ingredientId: number;
  quantity: number;
  unit: string;
  ingredient?: Ingredient;
}

export interface Ingredient {
  id: number;
  name: string;
  description?: string;
  unit: string;
  price: number;
  stock: number;
  category: string;
  supplier?: string;
  reorderLevel: number;
  createdAt: string;
  updatedAt: string;
}

export interface MenuCategory {
  id: number;
  name: string;
  description?: string;
  image?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}
