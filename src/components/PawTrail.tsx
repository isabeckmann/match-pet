import { PawIcon } from "./icons";

// Pegadas que aparecem em sequência, "deixadas" pelo card que sai para a esquerda
const STEPS = [
  { left: "78%", top: "28%" },
  { left: "60%", top: "55%" },
  { left: "42%", top: "34%" },
  { left: "26%", top: "58%" },
  { left: "10%", top: "38%" },
];

export default function PawTrail() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 motion-reduce:hidden"
    >
      {STEPS.map((s, i) => (
        <span
          key={i}
          className="anim-paw-step absolute text-primary/70"
          style={{
            left: s.left,
            top: s.top,
            animationDelay: `${i * 80}ms`,
            rotate: "-90deg",
          }}
        >
          <PawIcon size={42} />
        </span>
      ))}
    </div>
  );
}
