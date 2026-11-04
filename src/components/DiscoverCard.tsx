    import type { ReactNode } from "react";
    import type { Pet } from "../types/pet";
    import { CakeIcon, HeartIcon, PawIcon, PinIcon, Sparks } from "./icons";

    const SIZES = { small: "Pequeno", medium: "Médio", large: "Grande" };

    export default function DiscoverCard({ pet, children }: { pet: Pet; children?: ReactNode }) {
    return (
        <article className="relative grid gap-6 rounded-[2rem] bg-[#fff5ec] p-5 text-left shadow-[0_24px_50px_-24px_rgba(120,70,40,0.5)] sm:p-7 md:grid-cols-[5fr_6fr] md:items-center md:gap-8">
        <div className="relative mx-2 mt-3 md:mx-0">
            <img
            src={pet.photoUrl}
            alt={`${pet.species === "dog" ? "Cachorro" : "Gato"} da raça ${pet.breed}`}
            className="aspect-[4/3] w-full -rotate-3 rounded-3xl border-[10px] border-white object-cover shadow-lg"
            />
            <HeartIcon size={44} className="absolute -left-3 -top-5 fill-white text-coral" />
            <Sparks className="absolute -left-9 -top-9 h-8 w-8 rotate-[50deg] text-coral" />
        </div>

        <div className="relative space-y-3">
            <PawIcon size={38} className="absolute right-0 top-0 text-hill" />
            <h2 className="pr-12 text-5xl font-bold sm:text-6xl">{pet.name}</h2>

            <ul aria-label="Informações" className="flex flex-wrap gap-x-5 gap-y-2 text-lg">
            <li className="flex items-center gap-2"><CakeIcon /> {pet.ageYears} {pet.ageYears === 1 ? "ano" : "anos"}</li>
            <li className="flex items-center gap-2"><PawIcon size={20} /> {SIZES[pet.size]}</li>
            <li className="flex items-center gap-2"><PinIcon /> {pet.city}</li>
            </ul>

            <ul aria-label="Personalidade" className="flex flex-wrap gap-2">
            {pet.temperament.map((t) => (
                <li key={t} className="rounded-full bg-sage px-4 py-1.5 font-medium">{t}</li>
            ))}
            </ul>

            <p className="line-clamp-4 text-lg leading-snug">{pet.description}</p>
            {children}
        </div>
        </article>
    );
    }
