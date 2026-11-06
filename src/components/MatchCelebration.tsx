import { useEffect, useRef } from "react";
import type { Pet } from "../types/pet";
import { HeartIcon, PawIcon } from "./icons";

// Gerador determinístico: as partículas são sempre as mesmas (render puro)
const rnd = (n: number) => {
  const x = Math.sin(n * 9999) * 10000;
  return x - Math.floor(x);
};
const COLORS = [
  "text-primary",
  "text-primary-dark",
  "text-emphasis",
  "text-white",
];
const PARTICLES = Array.from({ length: 18 }, (_, i) => ({
  left: 4 + rnd(i + 1) * 92,
  size: 22 + rnd(i + 7) * 30,
  delay: rnd(i + 13) * 3.5,
  dur: 4.5 + rnd(i + 21) * 3.5,
  rot: (rnd(i + 31) - 0.5) * 80,
  paw: i % 3 === 0,
  color: COLORS[i % COLORS.length],
}));

interface Props {
  pet: Pet;
  onSee: () => void; // "Ver meu Match"
  onClose: () => void; // fechar e continuar descobrindo
}

// <dialog> nativo: prende o foco e fecha com Esc. Renderize só quando houver match.
export default function MatchCelebration({ pet, onSee, onClose }: Props) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const d = ref.current;
    if (d && !d.open) d.showModal();
  }, []);

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      aria-labelledby="match-title"
      aria-describedby="match-desc"
      className="fixed inset-0 m-0 h-dvh max-h-none w-dvw max-w-none overflow-hidden bg-transparent p-0 text-ink backdrop:bg-transparent"
    >
      <div className="anim-fade absolute inset-0 bg-primary/30 backdrop-blur-[2px]" />

      <div
        aria-hidden="true"
        className="absolute inset-0 overflow-hidden motion-reduce:hidden"
      >
        {PARTICLES.map((p, i) => (
          <span
            key={i}
            className={`anim-float absolute -bottom-16 ${p.color}`}
            style={
              {
                left: `${p.left}%`,
                "--dur": `${p.dur}s`,
                "--delay": `${p.delay}s`,
                "--rot": `${p.rot}deg`,
              } as React.CSSProperties
            }
          >
            {p.paw ? (
              <PawIcon size={p.size} />
            ) : (
              <HeartIcon size={p.size} className="fill-current" />
            )}
          </span>
        ))}
      </div>

      <div className="relative flex h-full items-center justify-center p-4">
        <div className="anim-panel w-full max-w-sm rounded-3xl bg-white p-8 text-center shadow-2xl">
          <div className="relative mx-auto mb-4 flex h-32 w-32 items-center justify-center">
            <span className="anim-ring absolute h-24 w-24 rounded-full bg-primary/40" />
            <div className="anim-pop">
              <HeartIcon
                size={112}
                className="anim-pulse fill-primary text-primary-dark"
              />
            </div>
          </div>
          <h2 id="match-title" className="text-4xl font-bold">
            É um Match! ❤️
          </h2>
          <p id="match-desc" className="mt-2 text-lg">
            Você e <strong>{pet.name}</strong> podem começar uma linda história
            juntos!
          </p>
          <button
            onClick={onSee}
            className="mt-6 w-full rounded-full bg-primary-dark px-6 py-3 text-lg font-semibold text-white"
          >
            Ver meu Match
          </button>
          <button
            onClick={onClose}
            className="mt-3 w-full rounded-full border-2 border-ink px-6 py-2.5 font-medium hover:bg-cream"
          >
            Continuar descobrindo
          </button>
        </div>
      </div>
    </dialog>
  );
}
