import { z } from "zod";

export const UserScheme = z.object({
  id: z.string({ error: "Invalid user 'id' value!" }),
  name: z
    .string({ error: "Invalid user 'name' value!" })
    .min(2, "User 'name' length muse be more then 2 symbols!")
    .max(20, "User 'name' length muse be less then 20 symbols!"),
  email: z
    .string({ error: "Invalid user 'email' value!" })
    .min(2, "User 'email' length muse be more then 2 symbols!")
    .max(100, "User 'email' length muse be less then 100 symbols!"),
  password: z
    .string({ error: "Invalid user 'password' value!" })
    .min(2, "User 'password' length muse be more then 2 symbols!")
    .max(100, "User 'password' length muse be less then 100 symbols!")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      "Password must contain at least one uppercase letter, one lowercase letter, and one number",
    )
    .optional(),
});

export type UserModel = z.infer<typeof UserScheme>;
