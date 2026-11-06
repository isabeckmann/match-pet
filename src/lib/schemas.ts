import { z } from "zod";

export const petSchema = z.object({
  name: z.string().min(2, "Informe o nome do pet (mín. 2 letras)."),
  species: z.enum(["dog", "cat"], { message: "Escolha a espécie." }),
  breed: z.string().min(2, "Informe a raça."),
  gender: z.enum(["male", "female"], { message: "Escolha o sexo." }),
  city: z.string().min(2, "Informe a cidade."),
  state: z.string().min(2, "Informe o estado."),
  ageYears: z.string().regex(/^\d{1,2}$/, "Informe a idade em anos (0 a 99)."),
  size: z.enum(["small", "medium", "large"], { message: "Escolha o porte." }),
  description: z
    .string()
    .min(10, "Descreva o pet com pelo menos 10 caracteres."),
  contactName: z.string().min(2, "Informe o nome do responsável."),
  contactPhone: z
    .string()
    .regex(
      /^\(?\d{2}\)?\s?9?\d{4}-?\d{4}$/,
      "Telefone inválido. Ex.: (55) 99999-9999",
    ),
  photoUrl: z.url(
    'Envie uma foto do pet: escolha o arquivo e toque em "Enviar foto".',
  ),
  temperament: z
    .array(z.string().trim().min(1))
    .max(5, "Adicione no máximo 5 características.")
    .optional(),
});
export type PetFormData = z.infer<typeof petSchema>;
