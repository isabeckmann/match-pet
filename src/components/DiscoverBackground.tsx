import { PawIcon } from "./icons";

const PAWS = [
  { x: "22%", y: "20%", s: 64, r: -15, c: "text-hill/60" },
  { x: "7%", y: "32%", s: 44, r: 10, c: "text-primary/50" },
  { x: "80%", y: "24%", s: 56, r: 12, c: "text-primary/60" },
  { x: "93%", y: "44%", s: 46, r: -10, c: "text-hill/50" },
  { x: "17%", y: "82%", s: 52, r: -8, c: "text-hill/60" },
  { x: "87%", y: "84%", s: 52, r: 12, c: "text-hill/60" },
];

const stroke = {
  stroke: "#5a3a29",
  strokeWidth: 5,
  strokeLinecap: "round",
  fill: "none",
} as const;

export function Dog({ className }: { className: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 200 190" className={className}>
      <path
        d="M42 52c-26 4-38 40-30 78 3 14 22 16 30 4 10-16 10-48 0-82Z"
        fill="#c9854f"
      />
      <path
        d="M158 52c26 4 38 40 30 78-3 14-22 16-30 4-10-16-10-48 0-82Z"
        fill="#c9854f"
      />
      <circle cx="100" cy="92" r="64" fill="#fbe6cc" />
      <ellipse
        cx="62"
        cy="76"
        rx="26"
        ry="30"
        fill="#d79a62"
        transform="rotate(-20 62 76)"
      />
      <path d="M68 92q9-12 18 0M114 92q9-12 18 0" {...stroke} />
      <ellipse cx="100" cy="108" rx="12" ry="9" fill="#5a3a29" />
      <path d="M100 117v7M84 126q16 16 32 0" {...stroke} strokeWidth={4} />
      <path d="M93 131q7 22 14 0Z" fill="#f08a94" />
      <ellipse
        cx="62"
        cy="176"
        rx="22"
        ry="14"
        fill="#fbe6cc"
        stroke="#e3c9a6"
        strokeWidth="3"
      />
      <ellipse
        cx="138"
        cy="176"
        rx="22"
        ry="14"
        fill="#fbe6cc"
        stroke="#e3c9a6"
        strokeWidth="3"
      />
    </svg>
  );
}

export function Cat({ className }: { className: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 200 190" className={className}>
      <path d="M34 64 40 6 88 40Z" fill="#f0b98a" />
      <path d="M45 52 48 24 70 40Z" fill="#f4a3a8" />
      <path d="M166 64 160 6 112 40Z" fill="#f0b98a" />
      <path d="M155 52 152 24 130 40Z" fill="#f4a3a8" />
      <ellipse cx="100" cy="98" rx="68" ry="58" fill="#f6c89f" />
      <path
        d="M100 42c20 0 34 12 38 30-16 6-32 4-44-6 2-10 4-18 6-24Z"
        fill="#e9a875"
      />
      <ellipse cx="100" cy="118" rx="26" ry="18" fill="#fff1e2" />
      <path d="M62 100q10-12 20 0M118 100q10-12 20 0" {...stroke} />
      <path d="M94 108h12l-6 7Z" fill="#e58a8f" />
      <path
        d="M100 115q-6 10-14 6M100 115q6 10 14 6"
        {...stroke}
        strokeWidth={3}
      />
      <path
        d="M30 108l26 4M28 122l28-3M170 108l-26 4M172 122l-28-3"
        {...stroke}
        stroke="#b9886a"
        strokeWidth={2.5}
      />
      <ellipse
        cx="62"
        cy="176"
        rx="22"
        ry="14"
        fill="#fff1e2"
        stroke="#f0d9c0"
        strokeWidth="3"
      />
      <ellipse
        cx="138"
        cy="176"
        rx="22"
        ry="14"
        fill="#fff1e2"
        stroke="#f0d9c0"
        strokeWidth="3"
      />
    </svg>
  );
}

// Fundo decorativo fixo, atrás de todo o conteúdo da página
export default function DiscoverBackground() {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 -z-10 overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, var(--color-peach) 0%, #fde3cf 100%)",
      }}
    >
      <div className="absolute -left-16 top-24 h-64 w-64 rounded-full bg-[#fbd5b6]/60" />
      <div className="absolute -right-24 top-16 h-72 w-96 rounded-[50%] bg-[#fbd5b6]/70" />

      {PAWS.map((p, i) => (
        <span
          key={i}
          className="absolute"
          style={{ left: p.x, top: p.y, transform: `rotate(${p.r}deg)` }}
        >
          <PawIcon size={p.s} className={p.c} />
        </span>
      ))}

      <svg
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
        className="absolute inset-x-0 bottom-0 h-[34vh] w-full"
      >
        <path
          d="M0 150C180 70 380 90 560 170S900 250 1100 170 1350 90 1440 140V320H0Z"
          fill="var(--color-hill)"
        />
        <path
          d="M0 232C250 172 520 202 760 252S1200 272 1440 202V320H0Z"
          fill="#dbdfb2"
        />
      </svg>

      <Dog className="absolute bottom-[14vh] left-[2%] hidden w-40 lg:block xl:w-52" />
      <Cat className="absolute bottom-[14vh] right-[2%] hidden w-40 lg:block xl:w-52" />
    </div>
  );
}
