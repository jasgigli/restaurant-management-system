import { z } from "zod";

export const createSaleSchema = z.object({
  body: z.object({
    items: z
      .array(
        z.object({
          menuItemId: z.number({
            invalid_type_error: "Menu Item ID must be a number",
          }),
          quantity: z.number().min(1, "Quantity must be at least 1"),
        })
      )
      .min(1, "At least one item is required for a sale."),
    // Add other sale fields as needed
  }),
});

export const updateSaleSchema = z.object({
  body: z.object({
    items: z
      .array(
        z.object({
          menuItemId: z.number({
            invalid_type_error: "Menu Item ID must be a number",
          }),
          quantity: z.number().min(1, "Quantity must be at least 1"),
        })
      )
      .min(1, "At least one item is required for a sale.")
      .optional(),
    // Add other sale fields as needed
  }),
});
