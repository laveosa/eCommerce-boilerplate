import { z } from "zod";

export const ProductScheme = z.object({
  id: z.string({ message: "Invalid product 'id' value!" }).optional(),
  title: z
    .string({ message: "Invalid product 'title' value!" })
    .min(2, "Product 'title' length must be more than 2 symbols!")
    .max(100, "Product 'title' length must be less than 100 symbols!"),
  imageUrl: z
    .string({ message: "Invalid product 'imageUrl' value!" })
    .max(400, "Product 'imageUrl' length must be less than 400 symbols!")
    .optional(),
  description: z
    .string({ message: "Invalid product 'description' value!" })
    .min(2, "Product 'description' length must be more than 2 symbols!")
    .max(1200, "Product 'description' length must be less than 1200 symbols!"),
  price: z.coerce
    .number({ message: "Invalid product 'price' value!" })
    .nonnegative("Price cannot be negative!")
    .refine(
      (val) => Number.isInteger(Number((val * 100).toFixed(8))),
      "Price must have at most 2 decimal places (e.g., 0.00 or 12.99)!",
    ),
  quantity: z.coerce
    .number({ message: "Invalid product 'quantity' value!" })
    .optional(),
  inCart: z.boolean().optional(),
});
