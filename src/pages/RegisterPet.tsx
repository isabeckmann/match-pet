import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Field from "../components/Field";
import { friendlyError } from "../lib/http";
import { petSchema, type PetFormData } from "../lib/schemas";
import { registerPet } from "../services/matchesService";

const input = "rounded-lg border border-ink bg-white p-2";

export default function RegisterPet() {
  const [status, setStatus] = useState("");
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<PetFormData>({
    resolver: zodResolver(petSchema),
  });

  const props = (k: keyof PetFormData) => ({
    id: k,
    "aria-invalid": !!errors[k],
    "aria-describedby": errors[k] ? `${k}-error` : undefined,
    ...register(k),
  });

  const onSubmit = async (data: PetFormData) => {
    try {
      const pet = await registerPet(data);
      setStatus(`${pet.name} foi cadastrado e já aparece em "Descobrir"!`);
      reset();
    } catch (e) {
      setStatus(friendlyError(e));
    }
  };

  return (
    <section className="mx-auto max-w-md p-4">
      <h1 className="mb-4 text-3xl font-bold">Cadastrar pet para adoção</h1>
      <p className="mb-4">Campos com * são obrigatórios.</p>
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-4">
        <Field id="name" label="Nome do pet" error={errors.name?.message}><input {...props("name")} className={input} /></Field>
        <Field id="species" label="Espécie" error={errors.species?.message}>
          <select {...props("species")} defaultValue="" className={input}>
            <option value="" disabled>Selecione</option>
            <option value="dog">Cachorro</option>
            <option value="cat">Gato</option>
          </select>
        </Field>
        <Field id="breed" label="Raça" error={errors.breed?.message}><input {...props("breed")} className={input} /></Field>
        <Field id="ageYears" label="Idade (anos)" error={errors.ageYears?.message}><input {...props("ageYears")} inputMode="numeric" className={input} /></Field>
        <Field id="size" label="Porte" error={errors.size?.message}>
          <select {...props("size")} defaultValue="" className={input}>
            <option value="" disabled>Selecione</option>
            <option value="small">Pequeno</option>
            <option value="medium">Médio</option>
            <option value="large">Grande</option>
          </select>
        </Field>
        <Field id="description" label="Descrição" error={errors.description?.message}><textarea {...props("description")} rows={3} className={input} /></Field>
        <Field id="contactName" label="Nome do responsável" error={errors.contactName?.message}><input {...props("contactName")} className={input} /></Field>
        <Field id="contactPhone" label="Telefone" error={errors.contactPhone?.message}><input {...props("contactPhone")} type="tel" placeholder="(55) 99999-9999" className={input} /></Field>
        <Field id="photoUrl" label="URL da foto" error={errors.photoUrl?.message}><input {...props("photoUrl")} type="url" placeholder="https://..." className={input} /></Field>
        <button type="submit" disabled={isSubmitting} className="rounded-full bg-primary-dark px-6 py-3 text-lg font-semibold text-white disabled:opacity-60">
          {isSubmitting ? "Enviando..." : "Cadastrar"}
        </button>
        <p role="status" aria-live="polite" className="font-medium">{status}</p>
      </form>
    </section>
  );
}
