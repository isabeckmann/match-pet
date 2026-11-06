import type { ReactNode } from "react";
import type { Pet } from "../types/pet";
import { HeartIcon, PawIcon, PinIcon } from "./icons";

const SIZES = { small: "Pequeno", medium: "Médio", large: "Grande" };

interface Props {
  pet: Pet;
  children?: ReactNode; // ações (Contato / Remover)
  onHeart?: () => void; // coração sobre a foto
  heartLabel?: string;
}

// Card horizontal: foto à esquerda, informações à direita
export default function PetCard({ pet, children, onHeart, heartLabel }: Props) {
  return (
    <article className="grid grid-cols-[minmax(0,2fr)_minmax(0,3fr)] gap-4 rounded-[1.75rem] bg-[#fffaf5]/95 p-3 shadow-[0_14px_34px_-18px_rgba(120,70,40,0.45)] sm:gap-5 sm:p-4">
      <div className="relative min-h-52">
        <img
          src={pet.photoUrl}
          alt={`${pet.species === "dog" ? "Cachorro" : "Gato"} da raça ${pet.breed}`}
          className="absolute inset-0 h-full w-full rounded-2xl object-cover"
          loading="lazy"
        />
        {onHeart && (
          <button
            type="button"
            onClick={onHeart}
            aria-label={heartLabel}
            className="absolute right-2 top-2 grid h-10 w-10 place-items-center rounded-full bg-white/45 text-white backdrop-blur-sm transition hover:bg-white/70 hover:text-coral"
          >
            <HeartIcon size={22} />
          </button>
        )}
      </div>

      <div className="flex min-w-0 flex-col justify-center gap-2.5 py-1 pr-1">
        <h2 className="truncate text-3xl font-bold leading-none">{pet.name}</h2>
        <p className="flex items-center gap-2">
          <PawIcon size={20} className="shrink-0" />
          <span className="truncate">
            {pet.breed} · {pet.ageYears} {pet.ageYears === 1 ? "ano" : "anos"} · {SIZES[pet.size]}
          </span>
        </p>
        <p className="flex items-center gap-2">
          <PinIcon className="shrink-0" />
          <span className="truncate">{pet.city}</span>
        </p>
        <ul className="flex flex-wrap gap-1.5" aria-label="Personalidade">
          {pet.temperament.map((t) => (
            <li key={t} className="rounded-full bg-[#bfe0d0] px-3 py-0.5 text-sm font-medium text-ink">{t}</li>
          ))}
        </ul>
        {children}
      </div>
    </article>
  );
}
