import { z } from "zod";

export const AuthScheme = z.object({
  name: z.string().optional(),
  email: z
    .email({ error: "Invalid auth 'email' value!" })
    .min(4, "Email length must be more then '4' symbols")
    .max(100, "Email length must be less then '100' symbols"),
  password: z
    .string({ error: "Invalid auth 'password' value!" })
    .min(1, "Password cannot be empty!")
    .min(4, "Password must be at least 4 characters")
    .max(100, "Password must not exceed 100 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      "Password must contain at least one uppercase letter, one lowercase letter, and one number",
    )
    .optional(),
});

export type AuthModel = z.infer<typeof AuthScheme>;
