import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import UserMenu from "./UserMenu";

const links = [
  { to: "/", label: "Descobrir" },
  { to: "/matches", label: "Meus Matches" },
  { to: "/cadastrar", label: "Cadastrar Pet" },
];

const linkCls = ({ isActive }: { isActive: boolean }) =>
  `relative inline-flex min-h-11 items-center whitespace-nowrap px-1 font-medium text-ink transition hover:text-primary-dark ${
    isActive ? "font-bold after:absolute after:inset-x-0 after:bottom-1.5 after:h-0.5 after:rounded-full after:bg-primary-dark" : ""
  }`;
const outline =
  "inline-flex min-h-11 items-center whitespace-nowrap rounded-full border-2 border-ink px-3 font-medium text-ink hover:bg-white/70 sm:px-4";

export default function Navbar() {
  const { user, loading } = useAuth();
  return (
    <header className="sticky top-0 z-50 bg-cream/90 backdrop-blur">
      <nav aria-label="Principal" className="mx-auto flex max-w-6xl items-center gap-2 px-3 py-2 sm:gap-4 sm:px-4">
        {/* No celular os dois lados têm o tamanho do conteúdo; a partir de sm dividem o espaço (links ao centro) */}
        <div className="shrink-0 sm:flex-1">
          <Link to="/" className="inline-flex items-center gap-2 whitespace-nowrap text-xl font-bold text-ink sm:text-2xl">
            <img src="/logo.svg" alt="" width="40" height="40" className="h-9 w-9 sm:h-10 sm:w-10" />
            {/* em telas muito estreitas (< 360px) só o ícone aparece; o nome continua para leitores de tela */}
            <span className="max-[359px]:sr-only">Match <span className="text-primary-dark">Pet</span></span>
          </Link>
        </div>

        {user && (
          <ul className="hidden gap-8 sm:flex">
            {links.map(({ to, label }) => (
              <li key={to}>
                <NavLink to={to} end={to === "/"} className={linkCls}>{label}</NavLink>
              </li>
            ))}
          </ul>
        )}

        <div className="ml-auto flex items-center justify-end gap-1 sm:flex-1 sm:gap-2">
          {loading ? null : user ? (
            <UserMenu user={user} links={links} />
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
