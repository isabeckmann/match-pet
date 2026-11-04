import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { logout } from "../services/authService";
import { CalendarIcon, HeartIcon, LogoutIcon, SearchIcon, UserIcon } from "./icons";

const links = [
  { to: "/", label: "Descobrir", Icon: SearchIcon },
  { to: "/matches", label: "Meus Matches", Icon: HeartIcon },
  { to: "/cadastrar", label: "Cadastrar pet", Icon: CalendarIcon },
];

// Texto escuro sobre o coral mantém o contraste AA (mesma decisão do btnPrimary)
const cls = ({ isActive }: { isActive: boolean }) =>
  `flex items-center gap-2 rounded-full px-4 py-2 font-medium transition ${
    isActive ? "bg-primary font-bold text-[#14281c] shadow-sm" : "text-ink hover:bg-white/70"
  }`;
const outline = "flex items-center gap-2 rounded-full border-2 border-ink px-4 py-1.5 font-medium text-ink hover:bg-white/70";

export default function Navbar() {
  const { user } = useAuth();
  return (
    <header>
      <nav aria-label="Principal" className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 p-4">
        <Link to="/" className="flex items-center gap-2 text-3xl font-bold text-ink">
          <img src="/logo.svg" alt="" width="44" height="44" className="h-11 w-11" />
          <span>Match <span className="text-primary-dark">Pet</span></span>
        </Link>
        <ul className="flex flex-wrap items-center gap-2 sm:gap-3">
          {links.map(({ to, label, Icon }) => (
            <li key={to}>
              <NavLink to={to} className={cls} end={to === "/"}><Icon /> {label}</NavLink>
            </li>
          ))}
          {user ? (
            <li className="flex items-center gap-3">
              <span className="flex items-center gap-2"><UserIcon /> Olá, {user.displayName ?? user.email}</span>
              <button onClick={logout} className={outline}><LogoutIcon /> Sair</button>
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
