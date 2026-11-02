import type { ReactNode } from "react";
import type { Pet } from "../types/pet";
import Tag from "./Tag";

const SIZES = { small: "Pequeno", medium: "Médio", large: "Grande" };

export default function PetCard({ pet, children }: { pet: Pet; children?: ReactNode }) {
  return (
    <article className="overflow-hidden rounded-3xl bg-white shadow-md">
      <img src={pet.photoUrl} alt={`${pet.species === "dog" ? "Cachorro" : "Gato"} da raça ${pet.breed}`} className="h-72 w-full object-cover" loading="lazy" />
      <div className="space-y-2 p-4">
        <h3 className="text-2xl font-bold">{pet.name}</h3>
        <p>{pet.breed} · {pet.ageYears} {pet.ageYears === 1 ? "ano" : "anos"} · {SIZES[pet.size]} · {pet.city}</p>
        <ul className="flex flex-wrap gap-2" aria-label="Personalidade">
          {pet.temperament.map((t) => <li key={t}><Tag>{t}</Tag></li>)}
        </ul>
        {children}
      </div>
    </article>
  );
}
