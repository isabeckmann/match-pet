import { useEffect, useState } from "react";
import Modal from "../components/Modal";
import PetCard from "../components/PetCard";
import { friendlyError } from "../lib/http";
import { getMatches, removeMatch } from "../services/matchesService";
import type { Match } from "../types/pet";

const btn = "rounded-full px-5 py-2 font-medium";

export default function Matches() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Match | null>(null);
  const [toRemove, setToRemove] = useState<Match | null>(null);

  useEffect(() => {
    getMatches()
      .then(setMatches)
      .catch((e) => setError(friendlyError(e)))
      .finally(() => setLoading(false));
  }, []);

  const confirmRemove = async () => {
    if (!toRemove) return;
    try {
      await removeMatch(toRemove);
      setMatches(matches.filter((m) => m.id !== toRemove.id));
    } catch (e) {
      setError(friendlyError(e));
    }
    setToRemove(null);
  };

  const q = query.toLowerCase();
  const list = matches.filter((m) => m.name.toLowerCase().includes(q) || m.breed.toLowerCase().includes(q));

  return (
    <section className="mx-auto max-w-3xl space-y-4 p-4">
      <h1 className="text-3xl font-bold">Meus Matches</h1>
      <div>
        <label htmlFor="busca" className="mr-2 font-medium">Buscar por nome ou raça:</label>
        <input id="busca" type="search" value={query} onChange={(e) => setQuery(e.target.value)} className="rounded-lg border border-ink bg-white p-2" />
      </div>
      {loading && <p role="status">Carregando...</p>}
      {error && <p role="alert" className="font-medium text-primary-dark">{error}</p>}
      {!loading && !list.length && <p>Nenhum match encontrado.</p>}
      <div className="grid gap-4 sm:grid-cols-2">
        {list.map((m) => (
          <PetCard key={m.id} pet={m}>
            <div className="flex gap-2 pt-2">
              <button onClick={() => setSelected(m)} className={`${btn} bg-emphasis text-ink`}>Contato</button>
              <button onClick={() => setToRemove(m)} className={`${btn} bg-primary-dark text-white`}>Remover</button>
            </div>
          </PetCard>
        ))}
      </div>

      <Modal open={!!selected} title={`Falar sobre ${selected?.name ?? ""}`} onClose={() => setSelected(null)}>
        <p>Responsável: {selected?.contactName}</p>
        <p>Telefone: {selected?.contactPhone}</p>
        <p>Cidade: {selected?.city}</p>
      </Modal>
      <Modal open={!!toRemove} title="Remover match?" onClose={() => setToRemove(null)}>
        <p>Deseja remover {toRemove?.name} dos seus matches?</p>
        <button onClick={confirmRemove} className={`${btn} mt-3 bg-emphasis text-ink`}>Sim, remover</button>
      </Modal>
    </section>
  );
}
