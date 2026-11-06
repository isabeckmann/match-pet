import { useEffect, useRef, useState, type ReactNode } from "react";

export type Dir = "left" | "right";

interface Props {
  children: ReactNode;
  exit: Dir | null; // direção da saída (vem dos botões ou do arrasto)
  onSwipe: (d: Dir) => void; // pediu para sair (arrasto passou do limite)
  onExited: (d: Dir) => void; // animação de saída terminou
}

const THRESHOLD = 100; // px de arrasto para confirmar
const DURATION = 300; // ms

export default function SwipeCard({
  children,
  exit,
  onSwipe,
  onExited,
}: Props) {
  const [dx, setDx] = useState(0);
  const [dragging, setDragging] = useState(false);
  const startX = useRef(0);

  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    if (!exit) return;
    const t = setTimeout(() => onExited(exit), reduced ? 0 : DURATION);
    return () => clearTimeout(t);
  }, [exit, onExited, reduced]);

  const x = exit ? (exit === "right" ? 600 : -600) : dx;
  const progress = Math.min(Math.abs(x) / THRESHOLD, 1);

  const down = (e: React.PointerEvent<HTMLDivElement>) => {
    if (exit || (e.target as HTMLElement).closest("button")) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    startX.current = e.clientX;
    setDragging(true);
  };
  const move = (e: React.PointerEvent<HTMLDivElement>) => {
    if (dragging) setDx(e.clientX - startX.current);
  };
  const up = () => {
    if (!dragging) return;
    setDragging(false);
    if (Math.abs(dx) > THRESHOLD) onSwipe(dx > 0 ? "right" : "left");
    else setDx(0);
  };

  return (
    <div
      onPointerDown={down}
      onPointerMove={move}
      onPointerUp={up}
      onPointerCancel={up}
      className="anim-card-enter relative cursor-grab select-none active:cursor-grabbing [&_img]:pointer-events-none"
      style={{
        touchAction: "pan-y",
        transform: `translateX(${x}px) rotate(${reduced ? 0 : exit ? (exit === "right" ? 12 : -8) : x / 20}deg) scale(${exit === "left" ? 0.88 : 1})`,
        opacity: exit ? 0 : 1,
        transition:
          dragging || reduced
            ? "none"
            : `transform ${DURATION}ms ease-out, opacity ${DURATION}ms`,
      }}
    >
      {children}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-4 top-4 -rotate-12 rounded-xl border-4 border-green-700 bg-white/80 px-3 py-1 text-2xl font-extrabold text-green-700"
        style={{ opacity: x > 0 ? progress : 0 }}
      >
        MATCH ♥
      </span>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute right-4 top-4 rotate-12 rounded-xl border-4 border-ink bg-white/80 px-3 py-1 text-2xl font-extrabold text-ink"
        style={{ opacity: x < 0 ? progress : 0 }}
      >
        PASSAR
      </span>
    </div>
  );
}
