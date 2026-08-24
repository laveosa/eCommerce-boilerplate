import { z } from "zod";

export const ProductScheme = z.object({
  id: z.number({ error: "Invalid product 'id' value!" }),
  title: z
    .string({ error: "Invalid product 'title' value!" })
    .min(2, "Product 'title' length muse be more then 2 symbols!")
    .max(100, "Product 'title' length muse be less then 100 symbols!"),
  imageUrl: z
    .string({ error: "Invalid product 'imageUrl' value!" })
    .max(400, "Product 'imageUrl' length muse be less then 400 symbols!"),
  description: z
    .string({ error: "Invalid product 'description' value!" })
    .min(2, "Product 'description' length muse be more then 2 symbols!")
    .max(600, "Product 'description' length muse be less then 600 symbols!"),
  price: z
    .number({ error: "Invalid product 'price' value!" })
    .nonnegative("Price cannot be negative!")
    .refine(
      (val) => Number.isInteger(Number((val * 100).toFixed(8))),
      "Price must have at most 2 decimal places (e.g., 0.00 or 12.99)!",
    ),
  quantity: z.number({ error: "Invalid product 'quantity' value!" }).optional(),
  inCart: z.boolean().optional(),
});

export type ProductModel = z.infer<typeof ProductScheme>;
