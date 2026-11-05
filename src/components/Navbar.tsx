import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import UserMenu from "./UserMenu";

const links = [
  { to: "/", label: "Descobrir" },
  { to: "/matches", label: "Meus Matches" },
  { to: "/cadastrar", label: "Cadastrar Pet" },
];

const linkCls = ({ isActive }: { isActive: boolean }) =>
  `relative inline-flex min-h-11 items-center px-1 font-medium text-ink transition hover:text-primary-dark ${
    isActive ? "font-bold after:absolute after:inset-x-0 after:bottom-1.5 after:h-0.5 after:rounded-full after:bg-primary-dark" : ""
  }`;
const outline =
  "inline-flex min-h-11 items-center rounded-full border-2 border-ink px-4 font-medium text-ink hover:bg-white/70";

export default function Navbar() {
  const { user, loading } = useAuth();
  return (
    <header className="bg-cream/70 backdrop-blur-sm">
      <nav aria-label="Principal" className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-4 gap-y-1 px-4 py-2">
        <div className="flex-1">
          <Link to="/" className="inline-flex items-center gap-2 text-2xl font-bold text-ink">
            <img src="/logo.svg" alt="" width="40" height="40" className="h-10 w-10" />
            <span>Match <span className="text-primary-dark">Pet</span></span>
          </Link>
        </div>

        {user && (
          <ul className="order-last flex w-full justify-center gap-5 sm:order-none sm:w-auto sm:gap-8">
            {links.map(({ to, label }) => (
              <li key={to}>
                <NavLink to={to} end={to === "/"} className={linkCls}>{label}</NavLink>
              </li>
            ))}
          </ul>
        )}

        <div className="flex flex-1 items-center justify-end gap-2">
          {loading ? null : user ? (
            <UserMenu user={user} />
          ) : (
            <>
              <NavLink to="/login" className={linkCls}>Entrar</NavLink>
              <Link to="/criar-conta" className={outline}>Cadastrar-se</Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
