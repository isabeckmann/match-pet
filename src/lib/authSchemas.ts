import { z } from "zod";

export const loginSchema = z.object({
  email: z.email("Informe um e-mail válido."),
  password: z.string().min(6, "A senha tem no mínimo 6 caracteres."),
});

export const signupSchema = z
  .object({
    name: z.string().min(2, "Informe seu nome."),
    email: z.email("Informe um e-mail válido."),
    password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres."),
    confirm: z.string().min(1, "Confirme a senha."),
  })
  .refine((d) => d.password === d.confirm, { path: ["confirm"], message: "As senhas não conferem." });

const strongPassword = z
  .string()
  .min(8, "A senha deve ter no mínimo 8 caracteres.")
  .regex(/[A-Za-z]/, "Inclua pelo menos uma letra.")
  .regex(/\d/, "Inclua pelo menos um número.");

export const resetPasswordSchema = z
  .object({
    password: strongPassword,
    confirm: z.string().min(1, "Confirme a senha."),
  })
  .refine((d) => d.password === d.confirm, { path: ["confirm"], message: "As senhas não conferem." });

export const changePasswordSchema = z
  .object({
    current: z.string().min(1, "Informe sua senha atual."),
    password: strongPassword,
    confirm: z.string().min(1, "Confirme a nova senha."),
  })
  .refine((d) => d.password === d.confirm, { path: ["confirm"], message: "As senhas não conferem." })
  .refine((d) => d.password !== d.current, { path: ["password"], message: "A nova senha deve ser diferente da atual." });

export type ResetPasswordData = z.infer<typeof resetPasswordSchema>;
export type ChangePasswordData = z.infer<typeof changePasswordSchema>;
export type LoginData = z.infer<typeof loginSchema>;
export type SignupData = z.infer<typeof signupSchema>;
