import { z } from "zod";

export const RegisterSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, {
    message: "Minimum 6 characters.",
  }),
  name: z.string(),
});