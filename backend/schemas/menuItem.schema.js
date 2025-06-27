import { z } from "zod";

export const createMenuItemSchema = z.object({
  body: z.object({
    name: z.string().min(1, "Name is required"),
    price: z.number({ invalid_type_error: "Price must be a number" }),
    // Add other fields as needed
  }),
});

export const updateMenuItemSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    price: z.number().optional(),
    // Add other fields as needed
  }),
});
