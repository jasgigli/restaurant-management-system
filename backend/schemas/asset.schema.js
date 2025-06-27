import { z } from "zod";

export const createAssetSchema = z.object({
  body: z.object({
    name: z.string().min(1, "Name is required"),
    cost: z.number({ invalid_type_error: "Cost must be a number" }),
    // Add other fields as needed
  }),
});

export const updateAssetSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    cost: z.number().optional(),
    // Add other fields as needed
  }),
});
