import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import DiscoverBackground from "../components/DiscoverBackground";
import DiscoverCard from "../components/DiscoverCard";
import MatchCelebration from "../components/MatchCelebration";
import PawTrail from "../components/PawTrail";
import { ChevronDownIcon, HeartIcon, PawIcon, Sparks } from "../components/icons";
import SwipeCard, { type Dir } from "../components/SwipeCard";
import { useAuth } from "../hooks/useAuth";
import { friendlyError } from "../lib/http";
import { usePets } from "../hooks/usePets";
import { addMatch, getMatches, matchedIds } from "../services/matchesService";
import type { Pet } from "../types/pet";

const btn = "rounded-full px-6 py-3 text-lg font-semibold";
const panel = "mx-auto max-w-md space-y-2 rounded-2xl bg-white/90 p-4 text-left shadow";

export default function Discover() {
  const { pets, loading, error, retry } = usePets();
  const { user } = useAuth();
  const uid = user?.uid ?? "";
  const [seen, setSeen] = useState<string[]>(() => matchedIds(uid));
  const [species, setSpecies] = useState("");
  const [msg, setMsg] = useState("");
  const [exit, setExit] = useState<Dir | null>(null);
  const [attempt, setAttempt] = useState(0); // remonta o card se o match falhar
  const [trail, setTrail] = useState(0); // dispara as pegadas ao passar
  const [celebrate, setCelebrate] = useState<Pet | null>(null);
  const navigate = useNavigate();
  const timer = useRef<number | undefined>(undefined);

  // traz do servidor os matches deste usuário (vale também em outro dispositivo)
  useEffect(() => {
    if (!uid) return;
    getMatches(uid).then((m) => setSeen((s) => [...new Set([...s, ...m.map((x) => x.id)])])).catch(() => {});
  }, [uid]);

  const queue = pets.filter((p) => !seen.includes(p.id) && (!species || p.species === species));
  const pet = queue[0];

  // mensagem discreta, some sozinha (não é modal)
  const flash = (text: string, ms = 2800) => {
    window.clearTimeout(timer.current);
    setMsg(text);
    timer.current = window.setTimeout(() => setMsg(""), ms);
  };

  const swipe = (d: Dir) => {
    if (exit) return;
    if (d === "left") setTrail((t) => t + 1);
    setExit(d);
  };

  // chamado quando a animação de saída termina
  const finish = async (d: Dir) => {
    if (!pet) return;
    if (d === "left") {
      setSeen([...seen, pet.id]);
      if (queue.length > 1) flash("Vamos conhecer outro amiguinho! 🐾");
    } else {
      try {
        await addMatch(uid, pet);
        setSeen([...seen, pet.id]);
        setCelebrate(pet);
      } catch (e) {
        flash(friendlyError(e), 6000);
        setAttempt((a) => a + 1); // card volta ao centro
      }
    }
    setExit(null);
  };

  return (
    <>
      <DiscoverBackground />
      <section className="mx-auto max-w-4xl space-y-5 px-4 pb-40 pt-4 text-center">
        <h1 className="relative inline-block text-3xl font-bold leading-tight sm:text-5xl">
          Encontre seu <br />
          <span className="text-coral">novo melhor amigo!</span>
          <Sparks className="absolute -left-14 top-1/2 hidden -translate-y-1/2 text-ink sm:block" />
          <Sparks className="absolute -right-14 top-1/2 hidden -translate-y-1/2 -scale-x-100 text-ink sm:block" />
        </h1>
        <p className="flex items-center justify-center gap-2 text-lg">
          Adote. Cuide. Faça a diferença. <HeartIcon className="text-coral" />
        </p>

        <div className="inline-flex items-center gap-2 rounded-full border border-ink/25 bg-white/80 py-2 pl-4 pr-3 shadow-sm">
          <PawIcon size={22} />
          <label htmlFor="species" className="font-medium">Espécie:</label>
          <div className="relative">
            <select
              id="species"
              value={species}
              onChange={(e) => setSpecies(e.target.value)}
              className="appearance-none bg-transparent pr-6 font-bold"
            >
              <option value="">Todas</option>
              <option value="dog">Cachorros</option>
              <option value="cat">Gatos</option>
            </select>
            <ChevronDownIcon size={18} className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2" />
          </div>
        </div>

        <p role="status" aria-live="polite" className="min-h-6 font-medium">{msg}</p>

        {loading && <p role="status" className={panel}>Carregando pets...</p>}
        {error && (
          <div role="alert" className={panel}>
            <p>{error}</p>
            <button onClick={retry} className={`${btn} bg-primary-dark text-white`}>Tentar novamente</button>
          </div>
        )}
        {!loading && !error && !pet && <p className={panel}>Não há mais pets por aqui. Volte mais tarde!</p>}

        {pet && (
          <div className="relative">
            {trail > 0 && <PawTrail key={trail} />}
            <SwipeCard key={`${pet.id}-${attempt}`} exit={exit} onSwipe={swipe} onExited={finish}>
              <DiscoverCard pet={pet}>
                <div className="flex gap-3 pt-2">
                  <button onClick={() => swipe("left")} disabled={!!exit} className={`${btn} bg-emphasis text-ink`}>Passar</button>
                  <button onClick={() => swipe("right")} disabled={!!exit} className={`${btn} bg-primary-dark text-white`}>Match ♥</button>
                </div>
              </DiscoverCard>
            </SwipeCard>
          </div>
        )}
      </section>

      {celebrate && (
        <MatchCelebration pet={celebrate} onSee={() => navigate("/matches")} onClose={() => setCelebrate(null)} />
      )}
    </>
  );
}
