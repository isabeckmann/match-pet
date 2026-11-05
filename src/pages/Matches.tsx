import { useEffect, useState } from "react";
import MatchesBackground from "../components/MatchesBackground";
import MatchesMascots from "../components/MatchesMascots";
import Modal from "../components/Modal";
import PetCard from "../components/PetCard";
import { HeartIcon, SearchIcon, Sparks, TrashIcon, ChatIcon } from "../components/icons";
import { useAuth } from "../hooks/useAuth";
import { friendlyError } from "../lib/http";
import { getMatches, removeMatch } from "../services/matchesService";
import type { Match } from "../types/pet";

const btn = "inline-flex items-center justify-center gap-2 rounded-full px-5 py-2 font-semibold transition";
const contactBtn = `${btn} border-2 border-ink bg-white/70 text-ink hover:bg-white`;
// Texto branco sobre o vermelho escuro mantém o contraste AA
const removeBtn = `${btn} bg-primary-dark text-white shadow-sm hover:brightness-110`;

export default function Matches() {
  const { user } = useAuth();
  const uid = user?.uid;
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Match | null>(null);
  const [toRemove, setToRemove] = useState<Match | null>(null);

  useEffect(() => {
    if (!uid) return;
    getMatches(uid)
      .then(setMatches)
      .catch((e) => setError(friendlyError(e)))
      .finally(() => setLoading(false));
  }, [uid]);

  const confirmRemove = async () => {
    if (!toRemove || !uid) return;
    try {
      await removeMatch(uid, toRemove);
      setMatches(matches.filter((m) => m.id !== toRemove.id));
    } catch (e) {
      setError(friendlyError(e));
    }
    setToRemove(null);
  };

  const q = query.toLowerCase();
  const list = matches.filter((m) => m.name.toLowerCase().includes(q) || m.breed.toLowerCase().includes(q));

  return (
    <>
      <MatchesBackground />
      <section className="mx-auto max-w-6xl space-y-6 px-4 pb-16 pt-4">
        <div className="grid items-end gap-4 lg:grid-cols-[1fr_auto]">
          <div className="space-y-3">
            <div className="flex items-center gap-4">
              <span className="relative text-coral">
                <Sparks className="absolute -left-7 -top-2 h-9 w-9 -rotate-12" />
                <HeartIcon size={64} className="fill-white" />
              </span>
              <div>
                <h1 className="text-4xl font-bold leading-tight sm:text-5xl">Meus Matches</h1>
                <p className="flex items-center gap-2 text-lg text-ink/80">
                  Aqui estão seus pets favoritos! <HeartIcon size={22} className="fill-ink text-ink" />
                </p>
              </div>
            </div>

            <div className="relative max-w-xl">
              <label htmlFor="busca" className="sr-only">Buscar por nome ou raça</label>
              <SearchIcon size={22} className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-ink" />
              <input
                id="busca"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Buscar por nome ou raça..."
                className="w-full rounded-full border border-ink/20 bg-white/90 py-3.5 pl-14 pr-5 text-lg text-ink shadow-sm placeholder:text-ink/60"
              />
            </div>
          </div>
          <MatchesMascots className="hidden lg:block" />
        </div>

        {loading && <p role="status">Carregando...</p>}
        {error && <p role="alert" className="font-medium text-primary-dark">{error}</p>}
        {!loading && !list.length && <p className="rounded-2xl bg-white/80 p-4">Nenhum match encontrado.</p>}

        <div className="grid gap-5 lg:grid-cols-2">
          {list.map((m) => (
            <PetCard key={m.id} pet={m} onHeart={() => setToRemove(m)} heartLabel={`Remover ${m.name} dos matches`}>
              <div className="flex flex-wrap gap-3 pt-1">
                <button onClick={() => setSelected(m)} className={contactBtn}><ChatIcon size={20} /> Contato</button>
                <button onClick={() => setToRemove(m)} className={removeBtn}><TrashIcon size={20} /> Remover</button>
              </div>
            </PetCard>
          ))}
        </div>
      </section>

      <Modal open={!!selected} title={`Falar sobre ${selected?.name ?? ""}`} onClose={() => setSelected(null)}>
        <p>Responsável: {selected?.contactName}</p>
        <p>Telefone: {selected?.contactPhone}</p>
        <p>Cidade: {selected?.city}</p>
      </Modal>
      <Modal open={!!toRemove} title="Remover match?" onClose={() => setToRemove(null)}>
        <p>Deseja remover {toRemove?.name} dos seus matches?</p>
        <button onClick={confirmRemove} className={`${btn} mt-3 bg-emphasis text-ink`}>Sim, remover</button>
      </Modal>
    </>
  );
}
