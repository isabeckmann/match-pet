import { NavLink } from "react-router-dom";

const links = [
  { to: "/", label: "Descobrir" },
  { to: "/matches", label: "Meus Matches" },
  { to: "/cadastrar", label: "Cadastrar pet" },
];

export default function Navbar() {
  return (
    <header className="bg-white shadow-sm">
      <nav aria-label="Principal" className="mx-auto flex max-w-3xl flex-wrap items-center justify-between gap-2 p-4">
        <span className="text-2xl font-bold text-primary-dark">Match Pet</span>
        <ul className="flex flex-wrap gap-2">
          {links.map((l) => (
            <li key={l.to}>
              <NavLink
                to={l.to}
                className={({ isActive }) =>
                  `rounded-full px-4 py-2 font-medium ${isActive ? "bg-primary-dark text-white" : "text-ink hover:bg-emphasis"}`
                }
              >
                {l.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
