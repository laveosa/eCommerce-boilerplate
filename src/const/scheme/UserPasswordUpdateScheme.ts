import { z } from "zod";

export const UserPasswordUpdateScheme = z.object({
  id: z.number({ error: "Invalid user 'id' value!" }),
  name: z
    .string({ error: "Invalid user 'name' value!" })
    .min(2, "User 'name' length muse be more then 2 symbols!")
    .max(100, "User 'name' length muse be less then 100 symbols!"),
  confirmPassword: z
    .string({ error: "Invalid user 'confirmPassword' value!" })
    .min(2, "User 'confirmPassword' length muse be more then 2 symbols!")
    .max(100, "User 'confirmPassword' length muse be less then 100 symbols!")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      "Confirm password must contain at least one uppercase letter, one lowercase letter, and one number",
    ),
  newPassword: z
    .string({ error: "Invalid user 'newPassword' value!" })
    .min(2, "User 'newPassword' length muse be more then 2 symbols!")
    .max(100, "User 'newPassword' length muse be less then 100 symbols!")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      "New password must contain at least one uppercase letter, one lowercase letter, and one number",
    ),
});

export type UserPasswordUpdateModel = z.infer<typeof UserPasswordUpdateScheme>;
