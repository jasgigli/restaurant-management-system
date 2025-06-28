import { z } from "zod";

export const createStoreItemSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  quantity: z.number().min(0, "Quantity must be non-negative"),
  unit: z.string().min(1, "Unit is required"),
  price: z.number().min(0, "Price must be non-negative"),
  category: z.string().min(1, "Category is required"),
  supplier: z.string().optional(),
  reorderLevel: z
    .number()
    .min(0, "Reorder level must be non-negative")
    .optional(),
});

export const updateStoreItemSchema = z.object({
  name: z.string().min(1, "Name is required").optional(),
  description: z.string().optional(),
  quantity: z.number().min(0, "Quantity must be non-negative").optional(),
  unit: z.string().min(1, "Unit is required").optional(),
  price: z.number().min(0, "Price must be non-negative").optional(),
  category: z.string().min(1, "Category is required").optional(),
  supplier: z.string().optional(),
  reorderLevel: z
    .number()
    .min(0, "Reorder level must be non-negative")
    .optional(),
});
