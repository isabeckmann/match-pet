import { useState } from "react";
import PetCard from "../components/PetCard";
import { friendlyError } from "../lib/http";
import { usePets } from "../hooks/usePets";
import { addMatch, matchedIds } from "../services/matchesService";

const btn = "rounded-full px-6 py-3 text-lg font-semibold";

export default function Discover() {
  const { pets, loading, error, retry } = usePets();
  const [seen, setSeen] = useState<string[]>(matchedIds());
  const [species, setSpecies] = useState("");
  const [msg, setMsg] = useState("");

  const queue = pets.filter((p) => !seen.includes(p.id) && (!species || p.species === species));
  const pet = queue[0];

  const pass = () => pet && setSeen([...seen, pet.id]);
  const match = async () => {
    if (!pet) return;
    try {
      await addMatch(pet);
      setSeen([...seen, pet.id]);
      setMsg(`Match com ${pet.name}! Veja em "Meus Matches".`);
    } catch (e) {
      setMsg(friendlyError(e));
    }
  };

  return (
    <section className="mx-auto max-w-md space-y-4 p-4">
      <h1 className="text-3xl font-bold">Descobrir</h1>
      <div>
        <label htmlFor="species" className="mr-2 font-medium">Espécie:</label>
        <select id="species" value={species} onChange={(e) => setSpecies(e.target.value)} className="rounded-lg border border-ink bg-white p-2">
          <option value="">Todas</option>
          <option value="dog">Cachorros</option>
          <option value="cat">Gatos</option>
        </select>
      </div>
      <p role="status" aria-live="polite" className="min-h-6 font-medium">{msg}</p>

      {loading && <p role="status">Carregando pets...</p>}
      {error && (
        <div role="alert" className="space-y-2 rounded-xl bg-white p-4">
          <p>{error}</p>
          <button onClick={retry} className={`${btn} bg-primary-dark text-white`}>Tentar novamente</button>
        </div>
      )}
      {!loading && !error && !pet && <p>Não há mais pets por aqui. Volte mais tarde!</p>}
      {pet && (
        <PetCard pet={pet}>
          <p>{pet.description.slice(0, 140)}</p>
          <div className="flex justify-center gap-4 pt-2">
            <button onClick={pass} className={`${btn} bg-emphasis text-ink`}>Passar</button>
            <button onClick={match} className={`${btn} bg-primary-dark text-white`}>Match ♥</button>
          </div>
        </PetCard>
      )}
    </section>
  );
}
