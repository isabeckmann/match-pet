import { z } from "zod";

export const petSchema = z.object({
  name: z.string().min(2, "Informe o nome do pet (mín. 2 letras)."),
  species: z.enum(["dog", "cat"], { message: "Escolha a espécie." }),
  breed: z.string().min(2, "Informe a raça."),
  ageYears: z.string().regex(/^\d{1,2}$/, "Informe a idade em anos (0 a 99)."),
  size: z.enum(["small", "medium", "large"], { message: "Escolha o porte." }),
  description: z.string().min(10, "Descreva o pet com pelo menos 10 caracteres."),
  contactName: z.string().min(2, "Informe o nome do responsável."),
  contactPhone: z
    .string()
    .regex(/^\(?\d{2}\)?\s?9?\d{4}-?\d{4}$/, "Telefone inválido. Ex.: (55) 99999-9999"),
  photoUrl: z.url("Informe uma URL de foto válida (https://...)."),
});
export type PetFormData = z.infer<typeof petSchema>;
