import { z } from "zod";

export const OrderScheme = z.object({
  id: z.string().optional(),
  userId: z.string({ error: "Invalid order 'userId' value!" }),
  cartId: z.string().optional(),
  registerDate: z.string().optional() || z.date().optional(),
  address: z
    .string({ error: "Invalid order 'address' value!" })
    .min(2, "Order 'address' length muse be more then 4 symbols!")
    .max(400, "Order 'address' length muse be less then 400 symbols!")
    .optional(),
});

export type OrderModel = z.infer<typeof OrderScheme>;
