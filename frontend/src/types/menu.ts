import { z } from 'zod';

export const menuItemSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(1),
  category: z.string().min(1),
  price: z.number().nonnegative(),
  StoreItems: z.array(z.object({
    id: z.number(),
    name: z.string(),
    MenuItemIngredient: z.object({
      quantity_used: z.number().nonnegative(),
    }),
  })).optional(),
});

export type MenuItem = z.infer<typeof menuItemSchema>;
