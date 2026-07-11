import { z } from "zod";

export const adminLoginSchema = z.object({
  email: z.string().email("Введите корректный email"),
  password: z.string().min(6, "Пароль не менее 6 символов"),
  remember: z.boolean().optional().default(false),
});

export const adminForgotSchema = z.object({
  email: z.string().email("Введите корректный email"),
});

export const adminResetSchema = z.object({
  token: z.string().min(10),
  password: z.string().min(8, "Новый пароль не менее 8 символов"),
  confirmPassword: z.string().min(8),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Пароли не совпадают",
  path: ["confirmPassword"],
});

export type AdminLoginData = z.infer<typeof adminLoginSchema>;
export type AdminForgotData = z.infer<typeof adminForgotSchema>;
export type AdminResetData = z.infer<typeof adminResetSchema>;
