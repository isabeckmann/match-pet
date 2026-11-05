import { useState } from "react";
import { useForm, type UseFormRegister } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Field from "../components/Field";
import { friendlyError } from "../lib/http";
import { petSchema, type PetFormData } from "../lib/schemas";
import { registerPet } from "../services/matchesService";
import PhotoUpload from "../components/PhotoUpload/PhotoUpload";
import DiscoverBackground from "../components/DiscoverBackground";

const input =
  "w-full min-h-11 rounded-lg border border-ink bg-white p-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink aria-[invalid=true]:border-red-700";
const group = "flex flex-col gap-4 rounded-2xl border border-ink/20 bg-white p-5";
const legend = "px-2 text-lg font-bold";

const SPECIES = [
  { value: "dog", label: "Cachorro" },
  { value: "cat", label: "Gato" },
];
const SIZES = [
  { value: "small", label: "Pequeno" },
  { value: "medium", label: "Médio" },
  { value: "large", label: "Grande" },
];
const GENDERS = [
  { value: "male", label: "Macho" },
  { value: "female", label: "Fêmea" },
];

const maskPhone = (v: string) => {
  const d = v.replace(/\D/g, "").slice(0, 11);
  if (d.length <= 2) return d;
  if (d.length <= 7) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
};

// Grupo de opções em "chips": mais rápido de tocar que um <select> quando há 2-3 opções.
function Chips({
  name, title, options, register, error, hint,
}: {
  name: "species" | "size" | "gender";
  title: string;
  options: { value: string; label: string }[];
  register: UseFormRegister<PetFormData>;
  error?: string;
  hint?: string;
}) {
  return (
    <fieldset aria-describedby={error ? `${name}-error` : undefined}>
      <legend className="mb-1 font-semibold">{title} *</legend>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => (
          <label key={o.value} className="relative">
            <input type="radio" value={o.value} {...register(name)} className="peer sr-only" />
            <span className="inline-flex min-h-11 cursor-pointer items-center rounded-full border border-ink px-4 font-semibold peer-checked:bg-ink peer-checked:text-white peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-ink">
              {o.label}
            </span>
          </label>
        ))}
      </div>
      {hint && <p className="mt-1 text-sm opacity-80">{hint}</p>}
      {error && (
        <p id={`${name}-error`} className="mt-1 text-sm font-semibold text-red-700">
          {error}
        </p>
      )}
    </fieldset>
  );
}

export default function RegisterPet() {
  const [status, setStatus] = useState<{ ok: boolean; text: string } | null>(null);
  const [badPhoto, setBadPhoto] = useState("");
  const {
    register, handleSubmit, reset, watch, setValue,
    formState: { errors, isSubmitting },
  } = useForm<PetFormData>({ resolver: zodResolver(petSchema) });

  const v = watch();

  const props = (k: keyof PetFormData) => ({
    id: k,
    "aria-invalid": !!errors[k],
    "aria-describedby": errors[k] ? `${k}-error` : undefined,
    ...register(k),
  });

  const onSubmit = async (data: PetFormData) => {
    setStatus(null);
    try {
      const pet = await registerPet(data);
      setStatus({ ok: true, text: `${pet.name} foi cadastrado e já aparece em "Descobrir"!` });
      reset();
    } catch (e) {
      setStatus({ ok: false, text: friendlyError(e) });
    }
  };

  const speciesLabel = SPECIES.find((s) => s.value === v.species)?.label;
  const sizeLabel = SIZES.find((s) => s.value === v.size)?.label;
  const genderLabel = GENDERS.find((s) => s.value === v.gender)?.label;
  const age = v.ageYears !== undefined && String(v.ageYears) !== "" ? `${v.ageYears} ${Number(v.ageYears) === 1 ? "ano" : "anos"}` : "";
  const photoOk = !!v.photoUrl && badPhoto !== v.photoUrl;
  const cityState = [v.city, v.state].filter(Boolean).join(" · ");
  const meta = [speciesLabel, v.breed, age, sizeLabel, genderLabel, cityState].filter(Boolean).join(" · ");

  return (
    <>
      <DiscoverBackground />
      <section className="mx-auto grid max-w-5xl gap-8 p-4 lg:grid-cols-[minmax(0,34rem)_1fr]">
        <div>
          <h1 className="mb-2 text-3xl font-bold">Cadastrar pet para adoção</h1>
          <p className="mb-6">
            Quanto mais completo o perfil, mais fácil encontrar a família certa. Campos com * são obrigatórios.
          </p>

          <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-5">
            <fieldset className={group}>
              <legend className={legend}>Sobre o pet</legend>
              <Field id="name" label="Nome do pet" error={errors.name?.message}>
                <input {...props("name")} autoComplete="off" placeholder="Ex.: Pipoca" className={input} />
              </Field>
              <Chips name="species" title="Espécie" options={SPECIES} register={register} error={errors.species?.message} />
              <Field id="breed" label="Raça" error={errors.breed?.message}>
                <input {...props("breed")} autoComplete="off" placeholder='Sem raça definida? Escreva "SRD"' className={input} />
              </Field>
              <Field id="ageYears" label="Idade (anos)" error={errors.ageYears?.message}>
                <input {...props("ageYears")} inputMode="numeric" placeholder="Ex.: 3" className={input} />
              </Field>
              <Chips
                name="size" title="Porte" options={SIZES} register={register} error={errors.size?.message}
                hint="Pequeno: até 10 kg · Médio: 10 a 25 kg · Grande: acima de 25 kg."
              />
              <Chips
                name="gender" title="Sexo" options={GENDERS} register={register} error={errors.gender?.message}
              />
            </fieldset>

            <fieldset className={group}>
              <legend className={legend}>Foto e história</legend>
              <Field id="photoUrl" label="Foto do pet" error={errors.photoUrl?.message}>
                <PhotoUpload
                  onUpload={(url) => {
                    setValue("photoUrl", url, {
                      shouldValidate: true,
                      shouldDirty: true,
                    });

                    setBadPhoto("");
                  }}
                />
              </Field>
              <Field id="description" label="Descrição" error={errors.description?.message}>
                <textarea
                  {...props("description")} rows={4} className={input}
                  placeholder="Como é no dia a dia, como foi resgatado, que tipo de casa combina com ele…"
                />
              </Field>
              <p className="-mt-3 text-right text-sm opacity-80" aria-hidden="true">{v.description?.length ?? 0} caracteres</p>
            </fieldset>

            <fieldset className={group}>
              <legend className={legend}>Contato para adoção</legend>
              <Field id="contactName" label="Nome do responsável" error={errors.contactName?.message}>
                <input {...props("contactName")} autoComplete="name" className={input} />
              </Field>
              <Field id="contactPhone" label="Telefone" error={errors.contactPhone?.message}>
                <input
                  {...register("contactPhone", { onChange: (e) => (e.target.value = maskPhone(e.target.value)) })}
                  id="contactPhone" type="tel" inputMode="tel" autoComplete="tel" placeholder="(55) 99999-9999"
                  aria-invalid={!!errors.contactPhone}
                  aria-describedby={errors.contactPhone ? "contactPhone-error" : undefined}
                  className={input}
                />
              </Field>
            </fieldset>

            <fieldset className={group}>
              <legend className={legend}>Onde ele está</legend>
              <Field id="city" label="Cidade" error={errors.city?.message}>
                <input {...props("city")} autoComplete="address-level2" className={input} />
              </Field>
              <Field id="state" label="Estado" error={errors.state?.message}>
                <input {...props("state")} autoComplete="address-level1" className={input} />
              </Field>
            </fieldset>

            <button
              type="submit" disabled={isSubmitting}
              className="min-h-12 rounded-full bg-primary-dark px-6 py-3 text-lg font-semibold text-white disabled:opacity-60"
            >
              {isSubmitting ? "Enviando..." : "Cadastrar pet"}
            </button>

            <p
              role="status" aria-live="polite"
              className={status ? `rounded-lg p-3 font-semibold ${status.ok ? "bg-green-100 text-green-900" : "bg-red-100 text-red-900"}` : "sr-only"}
            >
              {status?.text}
            </p>
          </form>
        </div>

        {/* Prévia: mostra ao adotante como o card vai aparecer */}
        <aside aria-label="Prévia do anúncio" className="hidden self-start lg:sticky lg:top-24 lg:block">
          <h2 className="mb-2 font-semibold opacity-80">Assim os adotantes irão ver</h2>
          <div className="max-w-xs overflow-hidden rounded-2xl border border-ink/20 bg-white">
            <div className="grid aspect-[4/3] place-items-center bg-ink/5 text-6xl">
              {photoOk ? (
                <img
                  src={v.photoUrl} alt="" className="h-full w-full object-cover"
                  onError={() => setBadPhoto(v.photoUrl ?? "")}
                />
              ) : (
                <span aria-hidden="true">{v.species === "cat" ? "🐱" : v.species === "dog" ? "🐶" : "🐾"}</span>
              )}
            </div>
            <div className="p-4">
              <h3 className="text-2xl font-bold">{v.name?.trim() || "Nome do pet"}</h3>
              <p className="mt-1 opacity-80">{meta || "Espécie · raça · idade · porte · sexo · localização"}</p>
              {v.description && <p className="mt-3 text-sm">{v.description}</p>}
            </div>
          </div>
          {v.photoUrl && !photoOk && (
            <p className="mt-2 text-sm text-red-700">Não consegui carregar essa foto.</p>
          )}
        </aside>
        
      </section>
      </>
      );
}   

