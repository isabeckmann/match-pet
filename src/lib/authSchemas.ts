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

export type LoginData = z.infer<typeof loginSchema>;
export type SignupData = z.infer<typeof signupSchema>;
