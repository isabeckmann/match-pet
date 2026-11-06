import { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import type { User } from "firebase/auth";
import { logout } from "../services/authService";
import { ChevronDownIcon, LogoutIcon } from "./icons";

const item =
  "flex min-h-11 w-full items-center gap-3 rounded-xl px-3 text-left font-medium text-ink hover:bg-sage/60";

// Menu da conta: botão com a inicial do usuário que abre um painel (padrão "disclosure").
// Em telas pequenas (< sm) o painel também traz os links de navegação do site.
export default function UserMenu({ user, links }: { user: User; links: { to: string; label: string }[] }) {
  const [open, setOpen] = useState(false);
  const wrap = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const name = user.displayName ?? user.email ?? "Minha conta";
  const initial = name.trim().charAt(0).toUpperCase();

  useEffect(() => {
    if (!open) return;
    const outside = (e: Event) => {
      if (!wrap.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        trigger.current?.focus();
      }
    };
    document.addEventListener("mousedown", outside);
    document.addEventListener("focusin", outside); // Tab para fora fecha o menu
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", outside);
      document.removeEventListener("focusin", outside);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={wrap} className="relative">
      <button
        ref={trigger}
        type="button"
        aria-expanded={open}
        aria-controls="user-menu"
        aria-label="Menu"
        onClick={() => setOpen((o) => !o)}
        className="flex h-11 items-center gap-1 rounded-full p-1 pr-2 text-ink hover:bg-white/70"
      >
        <span aria-hidden="true" className="flex h-9 w-9 items-center justify-center rounded-full bg-sage font-bold">
          {initial}
        </span>
        <ChevronDownIcon size={18} className={`transition ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div id="user-menu" className="absolute right-0 z-20 mt-2 w-64 rounded-2xl border border-ink/10 bg-white p-2 shadow-xl">
          <div className="border-b border-ink/10 px-3 pb-2 pt-1">
            <p className="truncate font-bold">{user.displayName ?? "Minha conta"}</p>
            {user.email && <p className="truncate text-sm">{user.email}</p>}
          </div>
          <ul className="mt-2 flex flex-col gap-1 border-b border-ink/10 pb-2 sm:hidden">
            {links.map(({ to, label }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  end={to === "/"}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) => `${item} ${isActive ? "bg-sage font-bold" : ""}`}
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
          <ul className="mt-2 flex flex-col gap-1">
            <li>
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  logout();
                }}
                className={item}
              >
                <LogoutIcon /> Sair
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
