import type { ReactNode } from "react";

const paw = "<ellipse cx='0' cy='14' rx='13' ry='11'/><ellipse cx='-17' cy='-4' rx='5.5' ry='7.5'/><ellipse cx='-6' cy='-14' rx='5.5' ry='7.5'/><ellipse cx='6' cy='-14' rx='5.5' ry='7.5'/><ellipse cx='17' cy='-4' rx='5.5' ry='7.5'/>";
const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'><g fill='#FF6F5E' fill-opacity='0.14'><g transform='translate(50 50) rotate(-20)'>${paw}</g><g transform='translate(170 160) rotate(25) scale(.8)'>${paw}</g></g></svg>`;
const bg = `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;

export default function AuthLayout({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4 py-8" style={{ backgroundImage: bg }}>
      <section className="w-full max-w-md space-y-5 rounded-3xl bg-white p-6 shadow-xl sm:p-8">
        <h1 className="text-3xl font-bold">{title}</h1>
        {children}
      </section>
    </div>
  );
}
