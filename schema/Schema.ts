import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
  code: z.string().optional(),
});

export const resetSchema = z.object({
  email: z.string().email(),
});

export const RegisterSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, {
    message: "Minimum 6 characters.",
  }),
  name: z.string(),
});

export const newPasswordSchema = z.object({
  password: z.string().min(6, {
    message: "Minimum 6 characters.",
  }),
});

export const SettingsSchema = z.object({
  name: z.string().optional(),
});
