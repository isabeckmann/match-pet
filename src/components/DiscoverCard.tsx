import type { ReactNode } from "react";
import type { Pet } from "../types/pet";
import { CakeIcon, HeartIcon, PawIcon, PinIcon, Sparks } from "./icons";

const SIZES = { small: "Pequeno", medium: "Médio", large: "Grande" };

// Card da tela Descobrir. Versão compacta: cabe na tela sem precisar rolar em notebooks.
export default function DiscoverCard({
  pet,
  children,
}: {
  pet: Pet;
  children?: ReactNode;
}) {
  return (
    <article className="relative grid gap-4 rounded-[1.75rem] bg-[#fff5ec] p-4 text-left shadow-[0_24px_50px_-24px_rgba(120,70,40,0.5)] sm:p-5 md:grid-cols-[5fr_6fr] md:items-center md:gap-6">
      <div className="relative mx-2 mt-2 md:mx-0">
        <img
          src={pet.photoUrl}
          alt={`${pet.species === "dog" ? "Cachorro" : "Gato"} da raça ${pet.breed}`}
          className="aspect-[16/10] w-full -rotate-3 rounded-2xl border-8 border-white object-cover shadow-lg md:aspect-[4/3]"
        />
        <HeartIcon
          size={36}
          className="absolute -left-3 -top-4 fill-white text-coral"
        />
        <Sparks className="absolute -left-8 -top-8 h-7 w-7 rotate-[50deg] text-coral" />
      </div>

      <div className="relative space-y-2">
        <PawIcon size={30} className="absolute right-0 top-0 text-hill" />
        <h2 className="pr-10 text-3xl font-bold sm:text-4xl">{pet.name}</h2>

        <ul
          aria-label="Informações"
          className="flex flex-wrap gap-x-4 gap-y-1.5 text-base"
        >
          <li className="flex items-center gap-2">
            <CakeIcon /> {pet.ageYears} {pet.ageYears === 1 ? "ano" : "anos"}
          </li>
          <li className="flex items-center gap-2">
            <PawIcon size={20} /> {SIZES[pet.size]}
          </li>
          <li className="flex items-center gap-2">
            <PinIcon /> {pet.city}
          </li>
        </ul>

        <ul aria-label="Personalidade" className="flex flex-wrap gap-1.5">
          {pet.temperament.map((t) => (
            <li
              key={t}
              className="rounded-full bg-sage px-3 py-1 text-sm font-medium"
            >
              {t}
            </li>
          ))}
        </ul>

        <p className="line-clamp-3 text-base leading-snug">{pet.description}</p>
        {children}
      </div>
    </article>
  );
}
