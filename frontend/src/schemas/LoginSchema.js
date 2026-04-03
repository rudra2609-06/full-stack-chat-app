import * as z from "zod";

export const LoginSchema = z.object({
  email: z.string().min(1, "Required Email").email("Enter Valid Email"),

  password: z.string().min(6, "Password must be at least 6 characters"),
});
