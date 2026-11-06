import { PawIcon } from "./icons";

const PAWS = [
  { x: "6%", y: "30%", s: 38, r: -12, c: "text-hill/70" },
  { x: "2%", y: "46%", s: 44, r: 12, c: "text-primary/60" },
  { x: "1%", y: "70%", s: 50, r: -8, c: "text-hill/70" },
  { x: "51%", y: "21%", s: 52, r: 8, c: "text-hill/60" },
  { x: "95%", y: "20%", s: 44, r: 14, c: "text-primary/50" },
  { x: "96%", y: "40%", s: 50, r: -12, c: "text-hill/70" },
  { x: "95%", y: "56%", s: 56, r: 10, c: "text-primary/60" },
  { x: "96%", y: "68%", s: 40, r: -6, c: "text-hill/60" },
];

// Fundo decorativo fixo da tela Meus Matches: pêssego com manchas e pegadas
export default function MatchesBackground() {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 -z-10 overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, #fff3ea 0%, var(--color-peach) 100%)",
      }}
    >
      <div className="absolute -left-24 top-12 h-72 w-72 rounded-full bg-[#fbd5b6]/60" />
      <div className="absolute -right-20 top-6 h-64 w-80 rounded-[50%] bg-[#fbd5b6]/60" />
      <div className="absolute -left-16 bottom-0 h-56 w-72 rounded-[50%] bg-hill/50" />
      <div className="absolute -right-20 bottom-[-3rem] h-64 w-80 rounded-[50%] bg-hill/60" />

      {PAWS.map((p, i) => (
        <span
          key={i}
          className="absolute"
          style={{ left: p.x, top: p.y, transform: `rotate(${p.r}deg)` }}
        >
          <PawIcon size={p.s} className={p.c} />
        </span>
      ))}
    </div>
  );
}
