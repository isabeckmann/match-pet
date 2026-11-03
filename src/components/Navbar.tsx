import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { logout } from "../services/authService";

const links = [
  { to: "/", label: "Descobrir" },
  { to: "/matches", label: "Meus Matches" },
  { to: "/cadastrar", label: "Cadastrar pet" },
];

const cls = ({ isActive }: { isActive: boolean }) =>
  `border-b-4 px-1 py-1 font-medium text-ink ${isActive ? "border-primary font-bold" : "border-transparent hover:border-emphasis"}`;
const outline = "rounded-full border-2 border-ink px-4 py-1.5 font-medium text-ink hover:bg-cream";

export default function Navbar() {
  const { user } = useAuth();
  return (
    <header className="bg-white shadow-sm">
      <nav aria-label="Principal" className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3 p-4">
        <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-ink">
          <img src="/logo.svg" alt="" width="40" height="40" className="h-10 w-10" />
          Match Pet
        </Link>
        <ul className="flex flex-wrap items-center gap-4">
          {links.map((l) => (
            <li key={l.to}><NavLink to={l.to} className={cls} end={l.to === "/"}>{l.label}</NavLink></li>
          ))}
          {user ? (
            <li className="flex items-center gap-3">
              <span>Olá, {user.displayName ?? user.email}</span>
              <button onClick={logout} className={outline}>Sair</button>
            </li>
          ) : (
            <>
              <li><NavLink to="/login" className={cls}>Entrar</NavLink></li>
              <li><Link to="/criar-conta" className={outline}>Cadastrar-se</Link></li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}
