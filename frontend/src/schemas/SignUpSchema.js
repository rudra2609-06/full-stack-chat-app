import * as z from "zod";

export const signUpSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, "Name Should be Atleast 3 characters long")
    .max(10, "Name Should not exceed 10 characters"),

  email: z.string().min(1, "Email is required").email("Invalid email address"),

  password: z.string().min(6, "Password must be at least 6 characters"),
});
