import { z } from "zod";

import { ProductScheme } from "#src/const/scheme/ProductScheme.js";

export const CartScheme = z.object({
  id: z.number({ error: "Invalid cart 'id' value!" }),
  userId: z.number({ error: "Invalid cart 'userId' value!" }),
  registerDate: z.date().optional(),
  products: z.array(ProductScheme).optional(),
  totalItems: z.number().optional(),
  totalPrice: z.number().optional(),
});

export type CartModel = z.infer<typeof CartScheme>;
