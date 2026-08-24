import { z } from "zod";

export const OrderScheme = z.object({
  id: z.number().optional(),
  userId: z.number({ error: "Invalid order 'userId' value!" }),
  cartId: z.number().optional(),
  registerDate: z.date().optional(),
  address: z
    .string({ error: "Invalid order 'address' value!" })
    .min(2, "Order 'address' length muse be more then 4 symbols!")
    .max(400, "Order 'address' length muse be less then 400 symbols!")
    .optional(),
});

export type OrderModel = z.infer<typeof OrderScheme>;
